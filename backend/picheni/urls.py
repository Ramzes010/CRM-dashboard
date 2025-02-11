from django.urls import path, include
from rest_framework.routers import DefaultRouter
from picheni.api.views import CookieViewSet, BoxViewSet, OrderViewSet, FranchisingViewSet, DistrictViewSet, WorkersList, LoginView, UserProfileViewSet, LogoutView, StatisticsViewSet

router = DefaultRouter()
router.register(r'boxes', BoxViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'cookies', CookieViewSet, basename='cookies')
router.register(r'franchisers', FranchisingViewSet)
router.register(r'districts', DistrictViewSet)
router.register(r'profiles', UserProfileViewSet, basename='userprofile')
router.register(r'dashboard', StatisticsViewSet, basename='statistics')
urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('workers/', WorkersList.as_view(), name='workers'),
]
