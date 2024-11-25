FROM node:20-alpine AS builder

WORKDIR /app

COPY ./ ./
COPY .git/ ./.git/

RUN apk add git
RUN npm install --global pnpm@8.11.0
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm --filter utils run build
RUN pnpm --filter core run build
RUN pnpm build:icons
RUN pnpm build:illustration
RUN pnpm storybook:build

FROM nginx:alpine

WORKDIR /app

COPY ./stories/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/storybook-static ./static

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
