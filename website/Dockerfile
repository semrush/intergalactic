# ###
# Dev instance start:
# > call from project root
### docker build -t intergalactic-site -f website/Dockerfile . &&  docker rm intergalactic-site ; docker run -p 8080:8080 --name intergalactic-site intergalactic-site
# ###

FROM node:16-alpine AS builder

WORKDIR /app

COPY ./ ./

RUN npm install --global pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm build:icons
RUN pnpm build:illustration
RUN pnpm --filter intergalactic-documentation run build

FROM nginx:alpine

WORKDIR /app

COPY ./website/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/website/dist ./static

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
