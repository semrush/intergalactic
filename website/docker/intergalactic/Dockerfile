# docker build -f docker/intergalactic/Dockerfile -t website .
# docker run -p 3000:3000 website

FROM node:14

WORKDIR /app

# for cached node_modules
COPY package.json ./
COPY pnpm-lock.yaml ./
#COPY node_modules ./node_modules
RUN pnpm install --silent  --frozen-lockfile

# for cached server
COPY dist ./dist
COPY server ./server
#COPY schema.gql ./schema.gql
#COPY nest-cli.json ./nest-cli.json
#COPY tsconfig.json ./tsconfig.json
#COPY tsconfig.build.json ./tsconfig.build.json
#RUN pnpm build:server

# for cached docs
COPY docs ./docs

# for cached client
COPY client/dist ./client/dist
#COPY webpack.config.js ./webpack.config.js
#RUN pnpm build:client

# for cached interface
COPY ts.json ./ts.json
COPY .env ./.env
#COPY processingTS.js ./processingTS.js
#RUN pnpm build:interface

#RUN pnpm build:server & pnpm build:client & pnpm build:interface

EXPOSE 3000
CMD NODE_ENV=production node ./dist/main.js
