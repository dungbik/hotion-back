FROM node:16-alpine
RUN mkdir -p /var/www/file
WORKDIR /var/www/file
ADD . /var/www/file
RUN yarn install
CMD yarn start:dev