FROM node:16 AS builder
WORKDIR /var/build/user
COPY package.json yarn.lock .
RUN yarn install

FROM node:16-alpine
RUN mkdir -p /var/www/user
WORKDIR /var/www/user
ADD . /var/www/user
COPY --from=builder /var/build/user .
CMD yarn start:dev