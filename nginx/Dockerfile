# Используем официальный образ Nginx
FROM nginx
# Копируем кастомный конфигурационный файл внутрь контейнера
# COPY cert.pem /etc/fdasite.ru/cert.pem
COPY chain.pem /etc/fdasite.ru/chain.pem
COPY privkey.pem /etc/fdasite.ru/privkey.pem
COPY fullchain.pem /etc/fdasite.ru/fullchain.pem
COPY nginx.conf /etc/nginx/nginx.conf