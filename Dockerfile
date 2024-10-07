FROM node:22-alpine
WORKDIR /app/
COPY ./package.json ./package-lock.json* ./
RUN npm install
COPY --chmod=777 . .
RUN npm run generate