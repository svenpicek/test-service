FROM node:17-alpine

WORKDIR /app
EXPOSE 80

COPY . .

RUN npm i

ENTRYPOINT [ "node", "index.js" ]