#берем за основу Image node:18, если его нет локально идет скачивание с hub.docker.com
FROM node:18
#контекст внутри container
WORKDIR /application
# Копирование package.json и package-lock.json
COPY package.json .
# Установка зависимостей
RUN yarn
# Копирование исходного кода приложения
COPY . .
# Сборка приложения
# RUN yarn build
# Указание порта, на котором будет работать приложение
EXPOSE 3200
# Запуск приложения
CMD yarn build && yarn start
# CMD yarn dev