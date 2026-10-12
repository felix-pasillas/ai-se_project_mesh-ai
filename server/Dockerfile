# Stage 1: build the TypeScript code
FROM node:20-alpine AS backend

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY ./ ./
RUN npm run build

# Stage 2: lean production image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=backend /app/dist ./dist
RUN mkdir -p uploads

EXPOSE 3000

CMD ["node", "dist/index.js"]