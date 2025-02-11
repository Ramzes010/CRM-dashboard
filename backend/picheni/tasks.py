from celery import shared_task
from picheni.api.serializers import OrderSerializer  
from picheni.bot import bot

@shared_task
def send_message_new_order(telegram_user_id, order_data):
    try:
        order_data = OrderSerializer(order_data).data  # Сериализуем данные заказа
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
                f"Примите заказ на сайте:\nhttps://picheni.com/orders/{order_data['id']}"
            )
        )
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")

@shared_task
def send_message_crafting_status(telegram_user_id, order_data):
    order_data = OrderSerializer(order_data).data  # Сериализуем данные заказа
    message_text = (
        f"Заказ {order_data['id']} крафтится кондитером, вы можете принять его заранее\n\n"
        f"#{order_data['id']}, {order_data['created_at']}\n"
        f"Кондитер: {order_data['confectioner']['fullname']}\n"
        f"Номер кондитера: {order_data['confectioner']['phone_number']}\n"
        f"Адрес для забора: {order_data['confectioner']['address']}\n"
        f"Принять заказ:\nhttps://picheni.com/orders/{order_data['id']}"
    )
    try:
        bot.send_message(chat_id=telegram_user_id, text=message_text)
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")

@shared_task
def send_message_crafted_confectioner_status(telegram_user_id, order_data):
    order_data = OrderSerializer(order_data).data  # Сериализуем данные заказа
    message_text = (
        f"Ваш заказ {order_data['id']} готов.\n"
        f"Курьер еще не найден.\n\n"
        f"Время крафта: {order_data['crafting_time']}\n"
        f"Адрес для забора: {order_data['confectioner']['address']}\n"
        f"Подробнее о заказе:\nhttps://picheni.com/orders/{order_data['id']}"
    )
    try:
        bot.send_message(chat_id=telegram_user_id, text=message_text)
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")

@shared_task
def send_message_crafted_courier_status(telegram_user_id, order_data):
    order_data = OrderSerializer(order_data).data  # Сериализуем данные заказа
    message_text = (
        f"Заказ {order_data['id']} готов к забору.\n"
        f"Кондитер: {order_data['confectioner']['fullname']}\n"
        f"Номер кондитера: {order_data['confectioner']['phone_number']}\n"
        f"Адрес для забора: {order_data['confectioner']['address']}\n\n"
        f"Клиент: {order_data['name']}\n"
        f"Номер клиента: {order_data['phone']}\n"
        f"Адрес доставки: {order_data['address']}\n\n"
        f"Подтвердить забор:\nhttps://picheni.com/orders/{order_data['id']}"
    )
    try:
        bot.send_message(chat_id=telegram_user_id, text=message_text)
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")

@shared_task
def send_message_picking_up_status(telegram_user_id, order_data):
    order_data = OrderSerializer(order_data).data  # Сериализуем данные заказа
    message_text = (
        f"Ваш заказ {order_data['id']} готов.\n"
        f"Курьер скоро заберет его.\n\n"
        f"Время крафта: {order_data['crafting_time']}\n"
        f"Адрес для забора: {order_data['confectioner']['address']}\n"
        f"Курьер: {order_data['courier']['fullname']}\n"
        f"Номер курьера: {order_data['courier']['phone_number']}\n"
        f"Подтвердить передачу заказа:\nhttps://picheni.com/orders/{order_data['id']}"
    )
    try:
        bot.send_message(chat_id=telegram_user_id, text=message_text)
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")

@shared_task
def send_message_delivering_status(telegram_user_id, order_data):
    order_data = OrderSerializer(order_data).data  # Сериализуем данные заказа
    message_text = (
        f"Курьер {order_data['courier']['fullname']} забрал ваш заказ #{order_data['id']}.\n"
        f"Время крафта: {order_data['crafting_time']}\n"
    )
    try:
        bot.send_message(chat_id=telegram_user_id, text=message_text)
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")

@shared_task
def send_message_delivered_status(telegram_user_id, order_data):
    order_data = OrderSerializer(order_data).data  # Сериализуем данные заказа
    message_text = (
        f"Заказ #{order_data['id']} доставлен.\n"
        f"Доставлен: {order_data['delivery_time']}\n"
    )
    try:
        bot.send_message(chat_id=telegram_user_id, text=message_text)
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")
