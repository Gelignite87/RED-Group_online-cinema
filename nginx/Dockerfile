# Используем официальный образ Nginx
FROM nginx
# Копируем кастомный конфигурационный файл внутрь контейнера
COPY cert1.pem /etc/letsencrypt/archive/fdasite.ru/cert1.pem
COPY chain1.pem /etc/letsencrypt/archive/fdasite.ru/chain1.pem
COPY privkey1.pem /etc/letsencrypt/archive/fdasite.ru/privkey1.pem
COPY fullchain1.pem /etc/letsencrypt/archive/fdasite.ru/fullchain1.pem
COPY nginx.conf /etc/nginx/nginx.conf