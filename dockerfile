FROM node:12-alpine as builder

WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . ./app
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
