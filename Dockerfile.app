FROM node:22-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run create-db && npm run start:dev"]
