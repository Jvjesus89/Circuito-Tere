FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY gateway.js .

ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000

CMD ["node", "gateway.js"]
