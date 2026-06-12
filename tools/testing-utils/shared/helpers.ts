import type { Page } from 'playwright';

import { e2eStandToHtml } from '../e2e-stand';

export async function loadPage(page: Page, id: string, lang: string, props = {}) {
  // const htmlContent = await e2eStandToHtml(examplePath, lang, props);
  // await page.setContent(htmlContent);

  await page.goto(`/iframe.html?viewMode=story&id=${id}`);
}
