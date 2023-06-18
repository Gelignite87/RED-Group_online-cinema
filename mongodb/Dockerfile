# Используем официальный образ MongoDB
FROM mongo:6.0.6
# Копируем кастомный конфигурационный файл внутрь контейнера
COPY conf/mongod.conf.orig /etc
# Открываем порт, на котором будет доступна MongoDB
EXPOSE 27017
# Команда, выполняемая при запуске контейнера
# CMD ["mongod","--config","/etc/mongod.conf.orig"]