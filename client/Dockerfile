FROM node:18-alpine3.17 as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

CMD ["npm" , "run" , "preview"]

EXPOSE 8081
