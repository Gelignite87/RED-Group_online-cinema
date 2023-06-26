# Используем официальный образ Nginx
FROM nginx
# Копируем кастомный конфигурационный файл внутрь контейнера
# COPY cert.pem /etc/letsencrypt/live/fdasite.ru/cert.pem
COPY chain.pem /etc/letsencrypt/archive/fdasite.ru/chain.pem
COPY privkey.pem /etc/letsencrypt/archive/fdasite.ru/privkey.pem
COPY fullchain.pem /etc/letsencrypt/archive/fdasite.ru/fullchain.pem
COPY nginx.conf /etc/nginx/nginx.conf