FROM node:11-alpine

LABEL maintainer="alfred.see@intellihr.co"

EXPOSE 3000

WORKDIR /var/task

ADD yarn.lock package.json ./

RUN yarn

ADD . .
