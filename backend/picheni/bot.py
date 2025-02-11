import os
import django
django.setup()
from telebot import TeleBot
from telebot.types import Message
from asgiref.sync import sync_to_async
from picheni.models import UserProfile

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")


# Токен вашего бота
BOT_TOKEN = "7892120999:AAH1ASl-RMlLO7wTijxV9pspCgBrtLJiGDc"

# Инициализация бота
bot = TeleBot(BOT_TOKEN)

# Обработчик команды /start
@bot.message_handler(commands=["start"])
def start_command(message: Message):
    command_parts = message.text.split(maxsplit=1)

    if len(command_parts) != 2:
        bot.reply_to(message, "Используйте команду в формате: /start <telegram_token>")
        return

    telegram_token = command_parts[1]

    try:
        # Используем sync_to_async для работы с ORM
        user_profile = UserProfile.objects.get(telegram_token=telegram_token)
        user_profile.telegram_user_id = message.from_user.id
        user_profile.save()
        bot.reply_to(message, f"Вы успешно зарегистрировались в телеграм! Ваш ID: {message.from_user.id}")
    except UserProfile.DoesNotExist:
        bot.reply_to(message, "Пользователь с таким токеном не найден.")
    except Exception as e:
        bot.reply_to(message, f"Ошибка: {str(e)}")

def send_message_new_order(telegram_user_id, order_data):
    """
    Функция отправки сообщения о новом заказе.
    """
    try:
        bot.send_message(
            chat_id=telegram_user_id,
            text=(
                f"В вашем районе новый заказ!\n\n"
                f"#{order_data['id']}, {order_data['created_at']}\n"
                f"Район: {order_data['district_name']}\n"
                f"Заказ: (еще не сделано)\n\n"
                f"Клиент: {order_data['name']}\n"
                f"Адрес: {order_data['address']}\n"
                f"Номер: {order_data['phone']}\n\n"
                f"Примите заказ на сайте: https://picheni.com/orders/{order_data['id']}"
            )
        )
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")

def send_message_crafted_status(telegram_user_id, order_data):
    """
    Функция отправки сообщения о готовности заказа.
    """
    message_text = (
        f"Ваш заказ {order_data.id} готов.\n"
        f"Курьер еще не найден.\n\n"
        f"Время крафта: {order_data.crafting_time}\n"
        f"Адрес для забора: {order_data.address}\n"
        f"Подробнее о заказе: https://picheni.com/orders/{order_data.id}"
    )
    try:
        bot.send_message(chat_id=telegram_user_id, text=message_text)
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")

# Основная функция запуска бота
def main():
    print("Бот запускается...")
    bot.polling(none_stop=True)

# Запуск бота, если файл вызывается напрямую
if __name__ == "__main__":
    main()
