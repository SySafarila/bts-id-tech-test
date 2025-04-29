FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV APP_PORT=3000

RUN npm install --omit=dev

EXPOSE 3000

ENTRYPOINT [ "node", "./dist/index.js" ]