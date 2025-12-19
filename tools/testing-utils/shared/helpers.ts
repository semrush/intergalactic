import { e2eStandToHtml } from '../e2e-stand';

export async function loadPage(page: any, examplePath: string, lang: string, props = {}) {
  const htmlContent = await e2eStandToHtml(examplePath, lang, props);
  await page.setContent(htmlContent);
}
