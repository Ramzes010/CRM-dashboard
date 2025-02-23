from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from picheni.models import Cookie, Box, Order, Franchising, UserProfile, District

# Register your models here.
admin.site.register(Cookie)
admin.site.register(Box)
admin.site.register(Order)
admin.site.register(District)
admin.site.register(Franchising)
class CustomUserAdmin(UserAdmin):
    list_display = ('fullname', 'phone_number', 'role', 'status', 'is_active', 'is_staff')
    
    fieldsets = (
        (None, {
            'fields': ('fullname', 'phone_number', 'address', 'role', 'district', 'status', 'avatar', 'telegram_token'),
        }),
        ('Права доступа', {
            'fields': ('is_active', 'is_staff', 'is_superuser'),
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('fullname', 'phone_number', 'address', 'password1', 'password2', 'role', 'district', 'status', 'is_staff', 'is_superuser'),
        }),
    )
    model = UserProfile

admin.site.register(UserProfile, CustomUserAdmin)