# ###
# Dev instance start:
# docker build -t intergalactic-site . &&  docker rm intergalactic-site ; docker run -p 8080:8080 --name intergalactic-site intergalactic-site
# ###

FROM nginx:latest
# // uncomment 3 lines below to enable api server
# RUN apt-get update;
# RUN apt-get install -y npm;
# RUN npm install -g yarn;

WORKDIR /app

# // uncomment 4 lines below to enable api server
# COPY ./docker-entrypoint.sh ./docker-entrypoint.sh
# RUN chmod +x ./docker-entrypoint.sh
# COPY ./server ./server
# RUN cd ./server && yarn install --production --silent --non-interactive --frozen-lockfile

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./package.json ./package.json
RUN cat /etc/nginx/nginx.conf | sed "s/%PACKAGE_VERSION%/$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[ \",]//g')/g" > /etc/nginx/nginx.conf
RUN cat /etc/nginx/nginx.conf

EXPOSE 8080

# // uncomment 1 line below to enable api server
# CMD ["./docker-entrypoint.sh"]