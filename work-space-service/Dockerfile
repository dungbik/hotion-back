FROM node:16 AS builder
WORKDIR /var/build/work-space
COPY package.json yarn.lock .
RUN yarn install

FROM node:16-alpine
RUN mkdir -p /var/www/work-space
WORKDIR /var/www/work-space
COPY --from=builder /var/build/work-space .
COPY tsconfig.build.json tsconfig.json nest-cli.json .env /var/www/work-space
CMD yarn start:dev