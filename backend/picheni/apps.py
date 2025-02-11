from django.apps import AppConfig


class PicheniConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'picheni'
    def ready(self):
        # Импортируем сигналы, чтобы они зарегистрировались
        import picheni.signals