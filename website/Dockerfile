# ###
# Dev instance start:
# docker build -t intergalactic-site . &&  docker rm intergalactic-site ; docker run -p 8080:8080 --name intergalactic-site intergalactic-site
# ###

FROM node:16-alpine AS builder

WORKDIR /app

COPY ./ ./

RUN yarn install --silent --non-interactive --frozen-lockfile
RUN yarn build:icons
RUN yarn --cwd website install --silent --non-interactive --frozen-lockfile
RUN yarn --cwd website build

FROM nginx:alpine

WORKDIR /app

COPY ./website/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/website/dist ./static

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
