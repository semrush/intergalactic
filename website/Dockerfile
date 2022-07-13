# ###
# Dev instance start:
# docker build -t intergalactic-site . &&  docker rm intergalactic-site ; docker run -p 8080:8080 --name intergalactic-site intergalactic-site
# ###

FROM nginx:stable-alpine
RUN apk add --no-cache bash
RUN apk add --no-cache python3 g++ make
RUN apk add --update npm yarn

WORKDIR /app

COPY ./docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

COPY ./server ./server
COPY ./dist ./dist

COPY ./server/package.json ./package.json
COPY ./server/yarn.lock ./yarn.lock
RUN yarn install --production --silent --immutable --immutable-cache

COPY ./dist /app/static

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["./docker-entrypoint.sh"]
