FROM node:16 AS builder
WORKDIR /var/build/auth
COPY package.json yarn.lock .
RUN yarn install

FROM node:16-alpine
RUN mkdir -p /var/www/auth
WORKDIR /var/www/auth
ADD . /var/www/auth
COPY --from=builder /var/build/auth .
CMD yarn start:dev