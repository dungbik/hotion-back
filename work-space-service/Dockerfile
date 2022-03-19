FROM node:16-alpine
RUN mkdir -p /var/www/work-space
WORKDIR /var/www/work-space
ADD . /var/www/work-space
RUN yarn install
CMD yarn start:dev