FROM mcr.microsoft.com/playwright:v1.35.0-jammy

WORKDIR /work/

ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin

COPY . .

RUN npm install --global pnpm
RUN pnpm install --ignore-scripts 
RUN npx playwright install
