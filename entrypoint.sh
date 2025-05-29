#!/bin/sh
set -e

# Запускаем сервер в фоне
node /app/server.js &

# Заменяем текущий процесс на nginx в фореграунде
exec nginx -g 'daemon off;'