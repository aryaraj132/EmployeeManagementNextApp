FROM node:18-alpine3.14 AS build

RUN mkdir /app

COPY ./package.json ./app

WORKDIR /app

RUN npm install --legacy-peer-deps

WORKDIR /

COPY . ./app

WORKDIR /app

EXPOSE 3000

RUN npm run script

RUN npm run build

CMD [ "npm", "run", "start" ]