FROM node:16-alpine

LABEL org.opencontainers.image.authors="matt@ottoinfo.com"

RUN mkdir -p /data/src
WORKDIR /data/src
COPY . .

EXPOSE 3000 9229

RUN yarn
CMD yarn start
