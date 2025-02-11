# your_project/celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Установите настройки Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = Celery('core')

# Используйте строку конфигурации для Celery
app.config_from_object('django.conf:settings', namespace='CELERY')

# Автономно регистрировать задачи из всех установленных приложений Django
app.autodiscover_tasks()
