FROM node:16-alpine
RUN mkdir -p /var/www/user
WORKDIR /var/www/user
ADD . /var/www/user
RUN yarn install
CMD yarn start:dev