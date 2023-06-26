# Используем официальный образ Nginx
FROM nginx
# Копируем кастомный конфигурационный файл внутрь контейнера
COPY fullchain1.pem /etc/letsencrypt/archive/fdasite.ru/fullchain1.pem
COPY privkey1.pem /etc/letsencrypt/archive/fdasite.ru/privkey1.pem
COPY nginx.conf /etc/nginx/nginx.conf