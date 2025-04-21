# ------------------------
# 1) Сборка React‑приложения
# ------------------------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ------------------------
# 2) Финальный образ на Debian (Ubuntu‑style)
# ------------------------
FROM node:18-bullseye-slim AS production

# Устанавливаем nginx
RUN apt-get update && \
    apt-get install -y --no-install-recommends nginx && \
    rm -rf /var/lib/apt/lists/*

# Создаём директорию для приложения
WORKDIR /app

# Копируем production‑зависимости (server.js и его package.json)
COPY package*.json ./
RUN npm ci --only=production

# Копируем server.js
COPY server.js ./

# Копируем собранную статику из предыдущего шага
COPY --from=build /app/build /usr/share/nginx/html

# Копируем и делаем исполняемым entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Открываем порт 80
EXPOSE 3000

# Точка входа запускает одновременно Node и nginx
ENTRYPOINT ["/entrypoint.sh"]