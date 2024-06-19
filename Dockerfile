FROM node:20.12-alpine
WORKDIR /app/
COPY ./package.json ./
RUN npm install -g npm@latest
RUN npm install
COPY --chmod=777 . .
RUN npx prisma generate
