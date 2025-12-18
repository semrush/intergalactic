import { e2eStandToHtml } from '../e2e-stand';

export async function loadPage(page: any, examplePath: string, lang: string, props = {}) {
  const htmlContent = await e2eStandToHtml(examplePath, lang, props);

  // wait for network to be idle
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle',
  });

  //  React rendering to complete
  await page.waitForSelector('#root > *', { state: 'attached', timeout: 5000 });

  //  fonts to be loaded
  await page.evaluate(() => document.fonts.ready);

  // images to be loaded
  await page.evaluate(() => {
    return Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            }),
        ),
    );
  });

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
