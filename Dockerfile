FROM node:6-alpine

ADD . /app

WORKDIR /app

RUN npm install -p

ENV PORT 4000

EXPOSE 4000

CMD bin/server
