FROM nginx:stable-alpine
RUN apk add --no-cache bash
RUN apk add --no-cache python2 g++ make
RUN apk add --update npm yarn

WORKDIR /app

COPY ./docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

COPY ./server ./server
COPY ./dist ./dist 

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --production --silent --non-interactive --frozen-lockfile

COPY ./nginx.conf /etc/nginx/nginx.conf
RUN cat /etc/nginx/nginx.conf | sed "s/%PACKAGE_VERSION%/$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[ \",]//g')/g" > /etc/nginx/nginx.conf
RUN cat /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["./docker-entrypoint.sh"]
