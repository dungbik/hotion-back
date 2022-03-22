FROM node:16 AS builder
WORKDIR /var/build/file
COPY package.json yarn.lock .
RUN yarn install

FROM node:16-alpine
RUN mkdir -p /var/www/file
WORKDIR /var/www/file
ADD . /var/www/file
COPY --from=builder /var/build/file .
CMD yarn start:dev