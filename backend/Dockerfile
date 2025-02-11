FROM python:3.11.4-slim-buster

WORKDIR /app

# Отключаем кеширование pyc-файлов и буферизацию
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH=/app

# Копируем только requirements.txt на этом этапе
COPY requirements.txt /app/requirements.txt

# Устанавливаем зависимости
RUN pip3 install --no-cache-dir -r /app/requirements.txt

# Копируем остальной проект
COPY . .

# Дополнительные настройки
ENV DJANGO_SETTINGS_MODULE core.settings
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Выполняем сборку статических файлов
RUN python manage.py collectstatic --noinput

