# Stage 1: build the React app
FROM node:20-alpine AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY ./ ./
RUN npm run build

# Stage 2: serve the built files with Caddy
FROM caddy:alpine

COPY --from=frontend /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80