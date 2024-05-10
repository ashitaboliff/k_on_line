FROM node:20.12-alpine
WORKDIR /app/
COPY ./package.json ./
RUN npm install
