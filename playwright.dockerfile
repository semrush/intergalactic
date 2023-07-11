FROM mcr.microsoft.com/playwright:v1.35.0-jammy

WORKDIR /work/

ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin

COPY . .

RUN npm install --global pnpm@7
RUN pnpm install --ignore-scripts 
RUN npx playwright install

ENV PLAYWRIGHT_ARGS=

CMD pnpm playwright test --config playwright.browser.config.ts $PLAYWRIGHT_ARGS