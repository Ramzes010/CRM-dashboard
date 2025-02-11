from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from django.utils.timezone import localtime
from phonenumbers import (
    parse,
    is_valid_number,
    format_number,
    PhoneNumber,
    PhoneNumberFormat,
    NumberParseException,
)
from picheni.models import (
    Cookie, 
    Box, 
    Order, 
    Franchising, 
    UserProfile, 
    District
)


# ===================== Mixin =====================

class PhoneNumberMixin:
    def validate_phone(self, value):
        # Убедитесь, что value это строка
        if isinstance(value, PhoneNumber):
            value = str(value)
        
        if not value:
            raise serializers.ValidationError('Номер телефона не может быть пустым.')

        # Normalize phone number formats for Turkey and Russia
        if value.startswith('0'):
            value = '+90' + value[1:]  # Turkey
        elif value.startswith('8'):
            value = '+7' + value[1:]  # Russia

        try:
            parsed_phone = parse(value, None)
            if not is_valid_number(parsed_phone):
                raise serializers.ValidationError('Номер телефона некорректен.')
            return format_number(parsed_phone, PhoneNumberFormat.E164)
        except NumberParseException as e:
            raise serializers.ValidationError(f'Ошибка при разборе номера телефона: {e}')


# ===================== Serializers =====================

class UserProfileSerializer(PhoneNumberMixin, serializers.ModelSerializer):
    phone_number = PhoneNumberField(required=True)
    class Meta:
        model = UserProfile
        fields = ['id', 'fullname', 'phone_number', 'address', 'role', 'district', 'avatar', 'username', 'status', 'password', 'telegram_token', 'telegram_user_id']

    def validate_phone_number(self, value):
        """
        Дополнительная валидация номера телефона.
        """
        if not value:
            raise serializers.ValidationError("Номер телефона не может быть пустым.")
        
        # Если вы хотите выполнить проверку на валидность, используйте is_valid(), если это поле PhoneNumberField
        if not value.is_valid():
            raise serializers.ValidationError("Номер телефона невалидный.")
        
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user_profile = UserProfile(**validated_data)
        
        if password:
            user_profile.set_password(password)

        user_profile.save()
        return user_profile

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)  # Hash the new password
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        password = attrs.get('password')
        try:
            user = UserProfile.objects.get(phone_number=phone_number)
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("Пользователь с таким номером телефона не найден.")

        # Check if passwords match
        if not user.check_password(password):
            raise serializers.ValidationError("Неверный пароль.")

        attrs['user'] = user
        return attrs


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name']


class CookieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cookie
        fields = ['id', 'name', 'description', 'image', 'compressed_image', 'price']


class BoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Box
        fields = ['id', 'name', 'description', 'image', 'box_price', 'cookies']


class OrderSerializer(PhoneNumberMixin, serializers.ModelSerializer):
    phone = PhoneNumberField(required=True)
    district_name = serializers.CharField(source='district.name', read_only=True)  # Добавляем поле district_name
    created_at = serializers.SerializerMethodField()
    crafting_time = serializers.DurationField(required=False)
    delivery_time = serializers.DurationField(required=False)

    class Meta:
        model = Order
        fields = ['id', 'status', 'confectioner', 'courier', 'crafting_time', 'delivery_time', 
                  'district', 'district_name', 'name', 'address', 'phone', 'email', 'created_at', 'content']
        
    def validate_phone_number(self, value):
        """
        Дополнительная валидация номера телефона.
        """
        if not value:
            raise serializers.ValidationError("Номер телефона не может быть пустым.")
        
        # Если вы хотите выполнить проверку на валидность, используйте is_valid(), если это поле PhoneNumberField
        if not value.is_valid():
            raise serializers.ValidationError("Номер телефона невалидный.")
        
        return value

    def get_created_at(self, obj):
        # Используем obj['created_at'], так как это словарь, а не объект модели
        created_at = obj.get('created_at') if isinstance(obj, dict) else obj.created_at
        return localtime(created_at).strftime('%d.%m.%Y %H:%M')


class UserPerformanceSerializer(serializers.Serializer):
    district = serializers.CharField()
    fullname = serializers.CharField()
    role = serializers.CharField()
    order_count = serializers.IntegerField()
    average_crafting_time = serializers.CharField()  # String representation of time
    average_delivery_time = serializers.CharField()  # String representation of time


class OrderStatisticsSerializer(serializers.Serializer):
    total_orders = serializers.IntegerField()
    total_income = serializers.FloatField()
    average_income = serializers.CharField()  # String representation, e.g. "0.00"
    average_crafting_time = serializers.CharField()  # String representation of time
    average_delivery_time = serializers.CharField()  # String representation of time
    sales_count = serializers.DictField(child=serializers.IntegerField())
    flavor_count = serializers.DictField(child=serializers.IntegerField())
    
    team_performance = UserPerformanceSerializer(many=True)  # List of user performance statistics
    count = serializers.IntegerField()  # Total number of team members
    next = serializers.CharField(allow_blank=True)  # Pagination link for next page
    previous = serializers.CharField(allow_blank=True)  # Pagination link for previous page


class CompletedOrderSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    crafting_time = serializers.CharField()  # String representation of time
    delivery_time = serializers.CharField()  # String representation of time
    district = serializers.CharField()
    earned = serializers.FloatField()
    delivery_address = serializers.CharField()


class MyDashboardSerializer(serializers.Serializer):
    completed_orders_count = serializers.IntegerField()
    average_crafting_time = serializers.CharField()  # String representation of time
    average_delivery_time = serializers.CharField()  # String representation of time
    total_earned = serializers.FloatField()
    completed_orders = CompletedOrderSerializer(many=True)


class UserStatisticsSerializer(serializers.Serializer):
    user_order_count = serializers.IntegerField()
    user_income = serializers.FloatField()
    sales_count = serializers.DictField(child=serializers.IntegerField())
    flavor_count = serializers.DictField(child=serializers.IntegerField())
    user_performance = serializers.DictField(child=serializers.CharField())


class UserPerformanceSerializer(serializers.Serializer):
    district = serializers.CharField()
    fullname = serializers.CharField()
    role = serializers.CharField()
    order_count = serializers.IntegerField()
    average_crafting_time = serializers.CharField()  # String representation of time
    average_delivery_time = serializers.CharField()  # String representation of time


class OrderStatisticsSerializer(serializers.Serializer):
    total_orders = serializers.IntegerField()
    total_income = serializers.FloatField()
    average_income = serializers.CharField()  # String representation, e.g. "0.00"
    average_crafting_time = serializers.CharField()  # String representation of time
    average_delivery_time = serializers.CharField()  # String representation of time
    sales_count = serializers.DictField(child=serializers.IntegerField())
    flavor_count = serializers.DictField(child=serializers.IntegerField())
    
    team_performance = UserPerformanceSerializer(many=True)  # List of user performance statistics
    count = serializers.IntegerField()  # Total number of team members
    next = serializers.CharField(allow_blank=True)  # Pagination link for next page
    previous = serializers.CharField(allow_blank=True)  # Pagination link for previous page


class CompletedOrderSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    crafting_time = serializers.CharField()  # String representation of time
    delivery_time = serializers.CharField()  # String representation of time
    district = serializers.CharField()
    earned = serializers.FloatField()
    delivery_address = serializers.CharField()


class MyDashboardSerializer(serializers.Serializer):
    completed_orders_count = serializers.IntegerField()
    average_crafting_time = serializers.CharField()  # String representation of time
    average_delivery_time = serializers.CharField()  # String representation of time
    total_earned = serializers.FloatField()
    completed_orders = CompletedOrderSerializer(many=True)


class UserStatisticsSerializer(serializers.Serializer):
    user_order_count = serializers.IntegerField()
    user_income = serializers.FloatField()
    sales_count = serializers.DictField(child=serializers.IntegerField())
    flavor_count = serializers.DictField(child=serializers.IntegerField())
    user_performance = serializers.DictField(child=serializers.CharField())


class FranchisingSerializer(PhoneNumberMixin, serializers.ModelSerializer):
    phone = PhoneNumberField(required=True)
    class Meta:
        model = Franchising
        fields = ['id', 'name', 'phone', 'email', 'country']
