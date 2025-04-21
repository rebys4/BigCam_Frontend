# 1) Сборка React‑приложения
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# 2) Финальный образ: nginx + Node.js + ваш server.js
FROM node:18-alpine AS production

# Устанавливаем nginx
RUN apk add --no-cache nginx

# Рабочая директория для вашего сервера
WORKDIR /app

# Копируем зависимости сервера и устанавливаем их
COPY package*.json ./
RUN npm install --production

# Копируем серверный скрипт
COPY server.js ./

# Копируем собранные статики в папку nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем nginx‑конфигурацию (если нужна кастомная)
# COPY nginx.conf /etc/nginx/nginx.conf

# Копируем наш entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Открываем порт 80
EXPOSE 80

# Запускаем сначала server.js, потом nginx
ENTRYPOINT ["/entrypoint.sh"]