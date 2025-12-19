import { e2eStandToHtml } from '../e2e-stand';

export async function loadPage(page: any, examplePath: string, lang: string, props = {}) {
  const htmlContent = await e2eStandToHtml(examplePath, lang, props);
  await page.setContent(htmlContent);

  //  React rendering to complete
  await page.waitForSelector('#root > *', { state: 'attached', timeout: 5000 });

  //  fonts to be loaded
  await page.evaluate(() => document.fonts.ready);

  // DOM to stabilize with animation frames
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      }),
  );
}
