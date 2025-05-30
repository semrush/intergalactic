import playwright from 'playwright';
import fs from 'node:fs/promises';
import path from 'path';

export async function mockIllustrationsRequest(page: playwright.Page) {
  await page.route(
    'https://static.semrush.com/intergalactic/illustrations/**/*.svg',
    async (route) => {
      const illustrationName = route.request().url().split('/').pop()!;

      const svg = await fs.readFile(
        path.resolve(process.cwd(), 'semcore', 'illustration', 'svg', illustrationName),
        'utf-8',
      );

      await route.fulfill({ body: svg, contentType: 'image/svg+xml' });
    },
  );
}
