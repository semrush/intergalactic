import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('InlineEdit', () => {
  test('Confirming', async ({ page }) => {
    const standPath = 'website/docs/components/inline-edit/examples/header.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const randomText = Math.random().toString().substring(2);

    await page.click('[data-ui-name="InlineEdit"]');
    await page.keyboard.press('Meta+A');
    await page.type('input', randomText);
    await page.click('[data-ui-name="InlineInput.ConfirmControl"]');

    const spinLocator = await page.locator('[data-ui-name="Spin"]');
    await expect(spinLocator).toHaveCount(0);

    const textContent = await (await page.locator('[data-ui-name="InlineEdit"]')).textContent();
    await expect(textContent?.trim()).toBe(randomText?.trim());
  });
  test('Cancelling', async ({ page }) => {
    const standPath = 'website/docs/components/inline-edit/examples/header.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const randomText = Math.random().toString().substring(2);
    const initialText = await (await page.locator('[data-ui-name="InlineEdit"]')).textContent();

    await page.click('[data-ui-name="InlineEdit"]');
    await page.type('input', randomText);
    await page.click('[data-ui-name="InlineInput.CancelControl"]');

    const spinLocator = await page.locator('[data-ui-name="Spin"]');
    await expect(spinLocator).toHaveCount(0);

    const textContent = await (await page.locator('[data-ui-name="InlineEdit"]')).textContent();
    await expect(textContent?.replace(/ SaveCancel$/, '')).toBe(initialText?.trim());
  });
  test('Cancelling after page scrolling', async ({ page }) => {
    const standPath = 'website/docs/components/inline-edit/examples/header.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    const newLines = Array(100)
      .fill(0)
      .map(() => '<br/>')
      .join('');
    await page.setContent(newLines + htmlContent);

    await page.mouse.wheel(0, 10_000);

    const randomText = Math.random().toString().substring(2);
    const initialText = await (await page.locator('[data-ui-name="InlineEdit"]')).textContent();

    await page.click('[data-ui-name="InlineEdit"]');
    await page.type('input', randomText);
    await page.click('[data-ui-name="InlineInput.CancelControl"]');

    const spinLocator = await page.locator('[data-ui-name="Spin"]');
    await expect(spinLocator).toHaveCount(0);

    const textContent = await (await page.locator('[data-ui-name="InlineEdit"]')).textContent();
    await expect(textContent?.replace(/\s+SaveCancel$/, '')).toBe(initialText?.trim());
  });
});
