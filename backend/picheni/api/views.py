import os
import base64
import pickle
import logging
from datetime import timedelta, datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

# Third-party imports
from dotenv import load_dotenv
from django.db.models import Q, Avg
from django.utils import timezone
from django_filters import rest_framework as filters
from rest_framework import status, viewsets, generics
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, APIException
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Async imports
import asyncio
from asgiref.sync import async_to_sync

# Local imports
from picheni.models import (
    Cookie,
    Box,
    Order,
    Franchising,
    UserProfile,
    District,
)
from picheni.api.serializers import (
    CookieSerializer,
    BoxSerializer,
    OrderSerializer,
    FranchisingSerializer,
    UserProfileSerializer,
    DistrictSerializer,
    LoginSerializer,
    UserStatisticsSerializer,
    OrderStatisticsSerializer,
    MyDashboardSerializer
)
from picheni.bot import bot, send_message_new_order, send_message_crafted_status
from picheni import tasks

# Environment variables
load_dotenv()

# Logging setup
logger = logging.getLogger(__name__)

# Async loop setup for Django + asyncio compatibility
if not asyncio.get_event_loop_policy().get_event_loop():
    asyncio.set_event_loop(asyncio.new_event_loop())


class AdminOnlyMixin:
    """Mixin to require admin permissions for POST requests."""
    
    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = []
        return super().get_permissions()


# ===================== ViewSets and Views =====================

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        """
        Определяем разрешения для разных действий:
        - Для создания пользователей разрешаем только администратору.
        - Для других действий (например, просмотр) разрешаем всем аутентифицированным.
        """
        if self.action == 'create':
            return [IsAdminUser()]  # Только администратор может создавать пользователей
        return super().get_permissions()

    def get_queryset(self):
        """
        Фильтрация запросов. Пользователь может видеть только свой профиль,
        а администратор — все профили.
        """
        if self.request.user.is_staff:
            return UserProfile.objects.all()  # Администратор может видеть все профили
        return UserProfile.objects.filter(id=self.request.user.id)  # Пользователь видит только свой профиль

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_profile(self, request):
        """
        Получить данные текущего пользователя по пути /api/profiles/my-profile/
        """
        try:
            user_profile = UserProfile.objects.get(id=request.user.id)  # Используем id текущего пользователя
            serializer = self.get_serializer(user_profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"detail": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def regenerate_telegram_token(self, request, pk=None):
        """
        Регенерация токена Telegram только для администратора.
        """
        if not request.user.is_staff:
            return Response({"detail": "Only admins can regenerate the token."}, status=status.HTTP_403_FORBIDDEN)

        user = self.get_object()  # Получаем объект пользователя по pk
        if user.telegram_user_id:  # Проверяем, зарегистрирован ли пользователь в телеграм
            try:
                async_to_sync(bot.send_message)(
                        chat_id=user.telegram_user_id,
                        text="Ваш токен был изменён. Вы были выкинуты из аккаунта. Пожалуйста, зарегистрируйтесь снова."
                    )
            except Exception as e:
                print(f"Ошибка при отправке сообщения: {e}")

        # Генерация нового токена
        user.telegram_token = user.generate_unique_telegram_token()
        user.telegram_user_id = None  # Удаляем ID пользователя Telegram
        user.save()

        return Response({"telegram_token": user.telegram_token}, status=status.HTTP_200_OK)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Логика для логина: валидирует данные и возвращает токен.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Логика для логаута: удаляет токен из текущего запроса.
        """
        try:
            token = request.auth
            if token:
                token.delete()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"detail": "Logout failed."}, status=status.HTTP_400_BAD_REQUEST)


# ===================== Pagination =====================

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class StatisticsViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]  # Доступ для всех аутентифицированных пользователей
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'role', openapi.IN_QUERY, description="Роль пользователя", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'start_date', openapi.IN_QUERY, description="Начальная дата (формат: YYYY-MM-DD)", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'end_date', openapi.IN_QUERY, description="Конечная дата (формат: YYYY-MM-DD)", type=openapi.TYPE_STRING
            ),
        ],
        responses={200: OrderStatisticsSerializer()},
    )
    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def dashboard(self, request):
        """Статистика для администраторов"""
        role = request.GET.get('role')
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')

        # Преобразование дат
        start_date, end_date = self.parse_dates(start_date, end_date)

        # Фильтрация пользователей
        user_filter = {'role': role} if role else {}
        users = UserProfile.objects.filter(**user_filter).exclude(is_superuser=True)

        # Инициализация статистики
        statistics_data = {
            'total_orders': 0,
            'total_income': 0,
            'average_income': "0.00",
            'average_crafting_time': "0:00:00",
            'average_delivery_time': "0:00:00",
            'sales_count': {},  # Общий подсчет продаж
            'flavor_count': {},  # Общий подсчет вкусов
        }
        team_performance = []

        # Подгружаем справочные данные для оптимизации
        all_boxes = dict(Box.objects.values_list('id', 'name'))
        all_cookies = dict(Cookie.objects.values_list('id', 'name'))

        # Множество уникальных заказов
        unique_order_ids = set()

        # Получаем все заказы в указанном диапазоне времени
        orders = Order.objects.filter(
            status='delivered',
            created_at__gte=start_date if start_date else timezone.datetime.min,
            created_at__lte=end_date if end_date else timezone.datetime.max,
        )

        statistics_data['total_orders'] = orders.count()
        statistics_data['total_income'] = sum(order.content.get('total_price', 0) for order in orders)

        avg_crafting_time = orders.aggregate(Avg('crafting_time'))['crafting_time__avg']
        avg_delivery_time = orders.aggregate(Avg('delivery_time'))['delivery_time__avg']

        statistics_data['average_crafting_time'] = self.format_timedelta(avg_crafting_time)
        statistics_data['average_delivery_time'] = self.format_timedelta(avg_delivery_time)
        # Подсчет продаж и вкусов по всем заказам
        for order in orders:
            unique_key = order.id  # Уникальная пара "заказ"
            if unique_key not in unique_order_ids:
                unique_order_ids.add(unique_key)

                # Подсчет продаж коробок и вкусов
                boxes = order.content.get('cart', {}).get('boxes', [])
                for box in boxes:
                    box_id = box.get('box_id')
                    quantity = box.get('quantity', 0)
                    if box_id:
                        # Используем ID коробки вместо имени
                        statistics_data['sales_count'][box_id] = statistics_data['sales_count'].get(box_id, 0) + quantity

                        for cookie_id in box.get('cookies', []):
                            # Используем ID вкуса вместо имени
                            statistics_data['flavor_count'][cookie_id] = statistics_data['flavor_count'].get(cookie_id, 0) + quantity

        # Рассчитать общую статистику
        statistics_data['average_income'] = "{:.2f}".format(
            statistics_data['total_income'] / statistics_data['total_orders']
        ) if statistics_data['total_orders'] else "0.00"

        # Добавляем статистику по каждому пользователю в team_performance
        for user in users:
            user_stats = self.calculate_user_statistics(user, start_date, end_date, all_boxes, all_cookies, unique_order_ids)
            team_performance.append(user_stats['user_performance'])

        # Пагинация
        paginator = CustomPagination()
        paginated_team_performance = paginator.paginate_queryset(team_performance, request)

        response_data = {
            **statistics_data,
            'team_performance': paginated_team_performance,
            'count': len(team_performance),
            'next': paginator.get_next_link(),
            'previous': paginator.get_previous_link(),
        }

        serializer = OrderStatisticsSerializer(response_data)

        return Response(serializer.data)
    @swagger_auto_schema(
    responses={200: MyDashboardSerializer()},
    )
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_dashboard(self, request):
        """Статистика для обычного пользователя (для его собственных заказов)"""
        user = request.user

        # Фильтруем заказы по пользователю
        completed_orders = Order.objects.filter(
            Q(confectioner=user) | Q(courier=user),
            status='delivered'
        )

        # Количество завершенных заказов
        completed_orders_count = completed_orders.count()

        if completed_orders_count == 0:
            return Response({
                'completed_orders_count': 0,
                'average_crafting_time': None,
                'average_delivery_time': None,
                'total_earned': 0.0,
                'completed_orders': []
            })

        # Инициализация переменных для расчета статистики
        total_crafting_time = timedelta()
        total_delivery_time = timedelta()
        total_earned = 0.0
        completed_order_details = []

        for order in completed_orders:
            total_crafting_time += order.crafting_time or timedelta()
            total_delivery_time += order.delivery_time or timedelta()
            total_earned += order.content.get('total_price', 0)

            completed_order_details.append({
                'order_id': order.id,
                'crafting_time': str(order.crafting_time),
                'delivery_time': str(order.delivery_time),
                'district': str(order.district),
                'earned': order.content.get('total_price', 0),
                'delivery_address': order.address,
            })

        average_crafting_time = total_crafting_time / completed_orders_count if completed_orders_count else timedelta()
        average_delivery_time = total_delivery_time / completed_orders_count if completed_orders_count else timedelta()

        statistics_data = {
            'completed_orders_count': completed_orders_count,
            'average_crafting_time': str(average_crafting_time),
            'average_delivery_time': str(average_delivery_time),
            'total_earned': str(total_earned),
            'completed_orders': completed_order_details
        }

        serializer = MyDashboardSerializer(statistics_data)

        return Response(serializer.data)
    @swagger_auto_schema(
    manual_parameters=[
        openapi.Parameter(
            'user_id', openapi.IN_QUERY, description="ID пользователя", type=openapi.TYPE_INTEGER, required=True
        ),
        openapi.Parameter(
            'start_date', openapi.IN_QUERY, description="Начальная дата (формат: YYYY-MM-DD)", type=openapi.TYPE_STRING, required=False
        ),
        openapi.Parameter(
            'end_date', openapi.IN_QUERY, description="Конечная дата (формат: YYYY-MM-DD)", type=openapi.TYPE_STRING, required=False
        ),
    ],
    responses={200: UserStatisticsSerializer()},
    )

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def user_dashboard(self, request):
        user_id = request.GET.get('user_id')

        if not user_id:
            return Response({"detail": "user_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            target_user = UserProfile.objects.get(id=user_id)
        except UserProfile.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')

        all_boxes = dict(Box.objects.values_list('id', 'name'))
        all_cookies = dict(Cookie.objects.values_list('id', 'name'))

        unique_order_ids = set()

        user_statistics = self.calculate_user_statistics(target_user, start_date, end_date, all_boxes, all_cookies, unique_order_ids)

        serializer = UserStatisticsSerializer(user_statistics)

        return Response(serializer.data)

    def calculate_user_statistics(self, user, start_date=None, end_date=None, all_boxes=None, all_cookies=None, unique_order_ids=None):
        """Вычисление статистики для пользователя."""
        user_orders = Order.objects.filter(
            Q(confectioner=user) | Q(courier=user),
            status='delivered'
        )
        
        if start_date:
            user_orders = user_orders.filter(created_at__gte=start_date)
        if end_date:
            user_orders = user_orders.filter(created_at__lte=end_date)

        user_order_count = 0
        user_income = 0
        user_sales_count = {}
        user_flavor_count = {}

        for order in user_orders:
            unique_key = (order.id, user.id)
            if unique_key not in unique_order_ids:
                unique_order_ids.add(unique_key)
                user_order_count += 1
                user_income += order.content.get('total_price', 0)

                boxes = order.content.get('cart', {}).get('boxes', [])
                for box in boxes:
                    box_id = box.get('box_id')
                    quantity = box.get('quantity', 0)
                    if box_id:
                        # Используем ID коробки вместо имени
                        user_sales_count[box_id] = user_sales_count.get(box_id, 0) + quantity

                        for cookie_id in box.get('cookies', []):
                            # Используем ID вкуса вместо имени
                            user_flavor_count[cookie_id] = user_flavor_count.get(cookie_id, 0) + quantity

        avg_crafting_time = (
            user_orders.aggregate(Avg('crafting_time'))['crafting_time__avg'] if user.role == 'confectioner' else None
        )
        avg_delivery_time = (
            user_orders.aggregate(Avg('delivery_time'))['delivery_time__avg'] if user.role == 'courier' else None
        )

        return {
            'user_order_count': user_order_count,
            'user_income': user_income,
            'sales_count': user_sales_count,
            'flavor_count': user_flavor_count,
            'user_performance': {
                'district': str(user.district),
                'fullname': user.fullname,
                'role': user.role,
                'order_count': user_order_count,
                'average_crafting_time': str(avg_crafting_time or "0:00:00"),
                'average_delivery_time': str(avg_delivery_time or "0:00:00"),
            },
        }
    def format_timedelta(self, td):
        """Форматирование timedelta в строку"""
        if td is None:
            return "0:00:00"
        total_seconds = int(td.total_seconds())
        hours, remainder = divmod(total_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        return f"{hours}:{minutes:02}:{seconds:02}"
    @staticmethod
    def parse_dates(start_date, end_date):
        """Парсинг и валидация дат."""
        try:
            if start_date:
                start_date = timezone.datetime.strptime(start_date, '%Y-%m-%d')
            if end_date:
                end_date = timezone.datetime.strptime(end_date, '%Y-%m-%d') + timedelta(days=1) - timedelta(seconds=1)
        except ValueError:
            start_date = end_date = None
        return start_date, end_date

class WorkersFilter(filters.FilterSet):
    status = filters.BooleanFilter(required=False)
    district = filters.ModelChoiceFilter(queryset=District.objects.all(), required=False)
    role = filters.ChoiceFilter(choices=UserProfile.ROLE_CHOICES, required=False)

    class Meta:
        model = UserProfile
        fields = ['status', 'district', 'role']

class WorkersList(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = UserProfile.objects.exclude(is_staff=True)  # Не включая admin'ов
        filterset = WorkersFilter(request.GET, queryset=queryset)
        
        # Проверяем фильтр на валидность
        if not filterset.is_valid():
            return Response(filterset.errors, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = filterset.qs

        # Пагинация
        paginator = CustomPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = UserProfileSerializer(paginated_queryset, many=True)

        return paginator.get_paginated_response(serializer.data)


class CookieViewSet(AdminOnlyMixin, viewsets.ViewSet):
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'box_id', openapi.IN_QUERY, description="Ид коробки", type=openapi.TYPE_STRING
            ),
        ],
        responses={200: CookieSerializer()},
    )
    @action(detail=False, methods=['get'])
    def get_cookies(self, request):
        box_id = request.query_params.get('box_id')
        
        if not box_id:
            return Response({'error': 'box_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            box = Box.objects.get(id=box_id)
            cookies = box.cookies.all()
            serializer = CookieSerializer(cookies, many=True)
            return Response(serializer.data)
        except Box.DoesNotExist:
            return Response({'error': 'Box not found'}, status=status.HTTP_404_NOT_FOUND)


class BoxViewSet(AdminOnlyMixin, viewsets.ModelViewSet):
    serializer_class = BoxSerializer
    queryset = Box.objects.all()


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['district']
    pagination_class = CustomPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all().order_by('-created_at')
        return Order.objects.exclude(status='new').order_by('-created_at')

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_orders(self, request):
        """
        Получить заказы текущего пользователя (кондитер или курьер).
        Путь: /api/orders/my-orders/
        """
        user = self.request.user
        queryset = Order.objects.filter(
            Q(confectioner=user) | Q(courier=user)
        ).order_by('-created_at')  # Сортировка по дате
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        # Получаем пользователей с ролью 'confectioner'
        confectioners = UserProfile.objects.filter(role='confectioner')  
        for confectioner in confectioners:
            if confectioner.telegram_user_id:  # Проверяем, зарегистрирован ли пользователь в Telegram
                try:
                    # Преобразуем асинхронную задачу в синхронную
                    async_to_sync(send_message_new_order)(confectioner.telegram_user_id, serializer.data)
                except Exception as e:
                    print(f"Ошибка при отправке сообщения: {e}")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        previous_status = instance.status  # Сохраняем текущий статус перед обновлением

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        order_data = OrderSerializer(serializer.instance).data
        confectioner = UserProfile.objects.get(id=serializer.instance.confectioner.id)
        # Проверяем, изменился ли статус
        if previous_status != serializer.instance.status:
            new_status = serializer.instance.status
            try:
                if new_status == 'issued':
                    confectioners = UserProfile.objects.filter(role='confectioner')  
                    for confectioner in confectioners:
                        if confectioner.telegram_user_id:
                            tasks.send_message_new_order.delay(confectioner.telegram_user_id, order_data)

                if new_status == 'crafting':
                    couriers = UserProfile.objects.filter(role='courier', telegram_user_id__isnull=False)
                    for courier in couriers:
                        if courier.telegram_user_id:
                            tasks.send_message_crafting_status.delay(courier.telegram_user_id, order_data)
                
                elif new_status == 'crafted':
                    tasks.send_message_crafted_confectioner_status.delay(
                        serializer.instance.confectioner.telegram_user_id, order_data
                    )
                    couriers = UserProfile.objects.filter(role='courier', telegram_user_id__isnull=False)
                    for courier in couriers:
                        tasks.send_message_crafted_courier_status.delay(
                            courier.telegram_user_id, order_data
                        )
                
                elif new_status == 'picking_up' and serializer.instance.confectioner:
                    tasks.send_message_picking_up_status.delay(
                        serializer.instance.confectioner.telegram_user_id, order_data
                    )
                
                elif new_status == 'delivering' and serializer.instance.confectioner:
                    tasks.send_message_delivering_status.delay(
                        serializer.instance.confectioner.telegram_user_id, order_data
                    )
                
                elif new_status == 'delivered' and serializer.instance.courier:
                    tasks.send_message_delivered_status.delay(
                        serializer.instance.courier.telegram_user_id, order_data
                    )
            except Exception as e:
                print(f"Ошибка при обработке статуса {new_status}: {e}")

        return Response(serializer.data)


class DistrictViewSet(viewsets.ModelViewSet):
    """
    ViewSet для работы с районами. Только администраторы могут изменять или удалять районы.
    """
    queryset = District.objects.all()
    serializer_class = DistrictSerializer
    permission_classes = [IsAuthenticated]  # Доступ только для аутентифицированных пользователей

    def get_permissions(self):
        """
        Зависит от действия:
        - Для чтения доступен всем аутентифицированным пользователям.
        - Для изменения или удаления требуется доступ только для администраторов.
        """
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAdminUser]  # Только администраторы могут изменять или удалять
        return super().get_permissions()

class FranchisingViewSet(viewsets.ModelViewSet):
    """
    ViewSet для создания франшизных заявок.
    После создания заявки отправляется сообщение в бот.
    """
    serializer_class = FranchisingSerializer
    queryset = Franchising.objects.all()

    def create(self, request, *args, **kwargs):
        """
        Создает новую заявку франшизы, отправляет информацию в бот и email.
        """
        serializer = self.get_serializer(data=request.data)
        try:
            # Валидируем и сохраняем заявку
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        except Exception as e:
            logger.error(f"Ошибка при создании заявки: {e}")
            return Response({"error": "Ошибка при создании заявки"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Получаем объект заявки
        proposal = serializer.instance

        # Генерируем сообщение для бота
        message_to_admin = self._generate_proposal_message_admin(proposal)
        message_to_buyer = self._generate_proposal_message_buyer(proposal)

        # Отправляем сообщение в бот
        try:
            self._send_message_to_bot(message_to_admin)
        except Exception as e:
            logger.error(f"Ошибка отправки сообщения в бот: {e}")

        # Отправляем email
        try:
            self.send_email_to_admin(
                sender='info@picheni.com',
                recipient='aliev@picheni.com',
                subject=f'Новая заявка на франшизу ({datetime.now().strftime("%Y-%m-%d")})',
                body=f"Добрый день!\n\n{message_to_admin}!"
            )
        except Exception as e:
            logger.error(f"Ошибка отправки email admin: {e}")
        
        # Отправляем email
        try:
            self.send_email_to_buyer(
                sender='info@picheni.com',
                recipient=f'{proposal.email}',
                subject=f'Ваша заявка на франшизу Picheni успешно отправлена!',
                body=f"{message_to_buyer}!",
                image_path="picheni/logo_for_gmail.png"
            )
        except Exception as e:
            logger.error(f"Ошибка отправки email admin: {e}")

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def _generate_proposal_message_admin(self, proposal):
        """
        Формирует сообщение о новой заявке франшизы для отправки в бот и email.
        """
        return (
            f"Поступила новая заявка на франшизу. Вот информация о клиенте:\n"
            f" • Имя клиента: {proposal.name}\n"
            f" • Контактный телефон: {proposal.phone}\n"
            f" • Email: {proposal.email}\n"
            f" • Страна/Город: {proposal.country}\n"
            f" • Дата и время подачи заявки: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
            f"Что делать дальше?\n"
            f" 1. Свяжитесь с клиентом для уточнения дополнительных деталей.\n"
            f" 2. Проверьте, доступен ли регион для франшизы.\n"
            f" 3. Присвойте заявке статус: «В работе», «Отклонена» или «На уточнении».\n\n"
            f"Важное примечание\n"
            f"Заявка автоматизировано добавлена в систему для отслеживания. Если вам нужна помощь, свяжитесь с нашей командой поддержки: info@picheni.com.\n\n"
            f"Спасибо!\n"
        f"С уважением, система обработки заявок Picheni."
            
        )
    
    def _generate_proposal_message_buyer(self, proposal):
        return f"""
            <p>Good day, {proposal.name}!</p>
            <p>Thank you for applying to open a Picheni franchise! We appreciate your interest in our brand and the opportunity to collaborate.</p>
            <p><strong>What’s next?</strong><br>
            Our manager will contact you shortly using the provided contact details to:</p>
            <ul>
                <li>Discuss the details of your application;</li>
                <li>Answer any questions you may have;</li>
                <li>Explain the next steps toward successfully launching your Picheni location.</li>
            </ul>
            <p><strong>Why choose Picheni?</strong><br>
            We offer a unique franchise format that combines:</p>
            <ul>
                <li>The aesthetics of warmth and comfort, reflected in every detail;</li>
                <li>Full partner support at every stage — from launch to scaling.</li>
            </ul>
            <p>If you have any questions, feel free to email us at info@picheni.com</p>
            <p>Thank you for choosing Picheni! We look forward to starting our partnership.</p>
            <p>With warmth and care,<br>
            The Picheni Team</p>
            <img src="cid:footer_image" alt="Picheni Footer" class="footer-image">
        """

    def _send_message_to_bot(self, message):
        """
        Отправляет сообщение в Telegram-бот.
        """
        try:
            chat_id = os.getenv('CHAT_ID_ZAYAVI')
            if not chat_id:
                raise ValueError("CHAT_ID_ZAYAVI не настроен")
            bot.send_message(chat_id, message)
        except Exception as e:
            logger.error(f"Ошибка отправки сообщения в Telegram: {e}")
            raise APIException("Не удалось отправить сообщение в бот.")

    def send_email_to_admin(self, sender, recipient, subject, body):
        """
        Отправка письма через Gmail API.
        """
        token_path = 'picheni/token.pickle'

        # Загружаем токен
        with open(token_path, 'rb') as token_file:
            credentials = pickle.load(token_file)

        # Проверяем и обновляем токен, если истек
        if not credentials or not credentials.valid:
            if credentials and credentials.expired and credentials.refresh_token:
                credentials.refresh(Request())
            else:
                raise AuthenticationFailed("Invalid credentials. Please authorize the app again.")

        # Создаем Gmail API сервис
        try:
            service = build('gmail', 'v1', credentials=credentials)
        except Exception as e:
            logger.error(f"Ошибка инициализации Gmail API: {e}")
            raise APIException("Не удалось инициализировать Gmail API.")

        # Формируем MIME-сообщение
        message = MIMEText(body)
        message['to'] = recipient
        message['from'] = sender
        message['subject'] = subject

        # Кодируем сообщение в Base64
        raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

        # Отправляем письмо
        try:
            result = service.users().messages().send(userId='me', body={'raw': raw_message}).execute()
            return result
        except Exception as e:
            logger.error(f"Ошибка отправки email: {e}")
            raise APIException("Не удалось отправить письмо.")
        
    def send_email_to_buyer(self, sender, recipient, subject, body, image_path=None):
        """
        Отправка письма через Gmail API с текстом и вложением фотографии.
        """
        token_path = 'picheni/token.pickle'

        # Загружаем токен
        with open(token_path, 'rb') as token_file:
            credentials = pickle.load(token_file)

        # Проверяем и обновляем токен, если истек
        if not credentials or not credentials.valid:
            if credentials and credentials.expired and credentials.refresh_token:
                credentials.refresh(Request())
            else:
                raise Exception("Invalid credentials. Please authorize the app again.")

        # Создаем Gmail API сервис
        try:
            service = build('gmail', 'v1', credentials=credentials)
        except Exception as e:
            raise Exception(f"Не удалось инициализировать Gmail API: {e}")

        # Создаем MIME-сообщение
        message = MIMEMultipart()
        message['to'] = recipient
        message['from'] = sender
        message['subject'] = subject

        # Добавляем текст в письмо
        text_part = MIMEText(body, 'html')
        message.attach(text_part)

        # Добавляем вложение с фото
        if image_path:
            with open("picheni/logo_for_gmail.png", "rb") as img_file:
                image = MIMEImage(img_file.read())
                image.add_header('Content-ID', '<footer_image>')
                message.attach(image)

        # Кодируем сообщение в Base64
        raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

        # Отправляем письмо
        try:
            result = service.users().messages().send(userId='me', body={'raw': raw_message}).execute()
            return result
        except Exception as e:
            raise Exception(f"Ошибка отправки email: {e}")