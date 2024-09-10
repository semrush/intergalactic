FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /work/

ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin

COPY . .

RUN npm install --global pnpm@8.11.0
RUN pnpm install --ignore-scripts
RUN npx playwright install
