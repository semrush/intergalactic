FROM mcr.microsoft.com/playwright:v1.58.0-jammy

WORKDIR /work/

ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin

COPY . .

RUN npm install --global pnpm@10.11.1
RUN pnpm install --ignore-scripts
RUN npx playwright install --with-deps
