import random
import string
from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class District(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class UserProfile(AbstractUser):
    ROLE_CHOICES = (
        ('confectioner', 'Кондитер'),
        ('courier', 'Курьер'),
    )

    status = models.BooleanField(default=False)
    address = models.CharField(max_length=255, null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    district = models.ForeignKey(District, on_delete=models.CASCADE, null=True, blank=True)
    fullname = models.CharField(max_length=255)
    phone_number = PhoneNumberField(null=False, blank=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    telegram_token = models.CharField(max_length=255, unique=True, blank=True)  # Поле уникальное
    telegram_user_id = models.CharField(max_length=255, null=True, blank=True)
    username = models.CharField(max_length=150, blank=True, null=True, unique=True)  # Делаем поле username необязательным
    def __str__(self):
        return self.fullname

    def save(self, *args, **kwargs):
        if not self.telegram_token:  # Генерируем токен только если он не задан
            self.telegram_token = self.generate_unique_telegram_token()
        super().save(*args, **kwargs)

    def generate_unique_telegram_token(self):
        while True:
            token = ''.join(random.choices(string.ascii_letters + string.digits, k=9))
            if not UserProfile.objects.filter(telegram_token=token).exists():  # Проверяем уникальность
                return token




class Cookie(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='cookies/', null=True, blank=True)
    compressed_image = models.ImageField(upload_to='cookies/compressed/', null=True, blank=True)  # Сжатое изображение

    def __str__(self):
        return self.name


class Box(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    box_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Стоимость самой коробки
    image = models.ImageField(upload_to='boxes/')
    cookies = models.ManyToManyField(Cookie, related_name='boxes', blank=True)  # Связь с печеньем


    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новый'),
        ('issued', 'Оформлен'),
        ('crafting', 'Крафтится'),
        ('crafted', 'Скрафчен'),
        ('picking_up', 'Забирается'),
        ('delivering', 'Доставляется'),
        ('delivered', 'Доставлен'),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    confectioner = models.ForeignKey(UserProfile, related_name='orders_created', on_delete=models.CASCADE, null=True, blank=True)
    courier = models.ForeignKey(UserProfile, related_name='orders_delivered', on_delete=models.CASCADE, null=True, blank=True)
    crafting_time = models.DurationField(null=True, blank=True)
    delivery_time = models.DurationField(null=True, blank=True)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = PhoneNumberField(null=False, blank=False)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.JSONField()
    google_maps_link = models.URLField(max_length=255, blank=True, null=True)  # Ссылка на Google Maps или Яндекс

    def __str__(self):
        return self.name


class Franchising(models.Model):
    name = models.CharField(max_length=255)
    phone = PhoneNumberField(null=False, blank=False)
    email = models.EmailField()
    country = models.CharField(max_length=255)

    def __str__(self):
        return self.name
