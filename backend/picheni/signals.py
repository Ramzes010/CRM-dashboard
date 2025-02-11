from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.cache import cache
from picheni.models import Box, Order


@receiver(post_save, sender=Box)
def set_total_price_on_create(sender, instance, created, **kwargs):
    if created:  # Если объект был создан
        instance.total_price = instance.box_price
        instance.save()

