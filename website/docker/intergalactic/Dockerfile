# docker build -f docker/intergalactic/Dockerfile -t website .
# docker run -p 3000:3000 website

FROM node:12

WORKDIR /app

# for cached node_modules
COPY package.json ./
COPY yarn.lock ./
#COPY node_modules ./node_modules
RUN yarn install --production --silent --non-interactive --frozen-lockfile

# for cached server
COPY dist ./dist
COPY server ./server
#COPY schema.gql ./schema.gql
#COPY nest-cli.json ./nest-cli.json
#COPY tsconfig.json ./tsconfig.json
#COPY tsconfig.build.json ./tsconfig.build.json
#RUN yarn build:server

# for cached docs
COPY docs ./docs

# for cached client
COPY client/dist ./client/dist
#COPY webpack.config.js ./webpack.config.js
#RUN yarn build:client

# for cached interface
COPY ts.json ./ts.json
#COPY processingTS.js ./processingTS.js
#RUN yarn build:interface

#RUN yarn build:server & yarn build:client & yarn build:interface

EXPOSE 3000
CMD NODE_ENV=production node ./dist/main.js