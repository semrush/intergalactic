# ###
# Dev instance start:
# > call from project root
### docker build -t intergalactic-site -f website/Dockerfile . &&  docker rm intergalactic-site ; docker run -p 8080:8080 --name intergalactic-site intergalactic-site
# ###

FROM node:16-alpine AS builder

WORKDIR /app

COPY ./ ./

RUN apk add git
RUN npm install --global pnpm@7
RUN pnpm install --frozen-lockfile --ignore-scripts 
RUN pnpm --filter core run build
RUN pnpm --filter utils run build
RUN pnpm build:icons
RUN pnpm build:illustration
RUN NODE_OPTIONS=--max-old-space-size=32768 pnpm --filter intergalactic-documentation run docs:build

FROM nginx:alpine

WORKDIR /app

COPY ./website/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/website/docs2/.vitepress/dist ./static

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
