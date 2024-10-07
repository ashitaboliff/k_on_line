FROM node:20.12-alpine
WORKDIR /app/
COPY ./package.json ./package-lock.json* ./
RUN npm install
COPY --chmod=777 . .
RUN ln -s /app/node_modules ./node_modules
RUN npm run db:push