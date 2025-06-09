import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Bubble chart', () => {
  test('Verify bubble base example renders and tooltip works', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bubble-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const items = page.locator('[data-ui-name="Bubble.Circle"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bubbles attributes', async () => {
      const count = await items.count();

      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        await expect(item).toHaveAttribute('aria-hidden', 'true');
        await expect(item).toHaveAttribute('value', 'value');
      }
    });

    await test.step('Verify tooltip on hover', async () => {
      await items.nth(0).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify bubble chart implementation renders and tooltip works', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bubble-chart/bubble-chart.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]');
    const items = page.locator('[data-ui-name="Bubble.Circle"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bubbles attributes', async () => {
      const count = await items.count();

      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        await expect(item).toHaveAttribute('aria-hidden', 'true');
        await expect(item).toHaveAttribute('value', 'value');
      }
    });

    await test.step('Verify tooltip shown by hover', async () => {
      await items.nth(0).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify color customization', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bubble-chart/color-customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify items when one legend item is unchecked', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bubble-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const label = await page.locator('label[data-ui-name="Checkbox"]').first();
    const item = await page.locator('g').first();

    await expect(label, `The ${label} is unchecked`).toBeChecked();
    await expect(item, `The ${item} is hidden`).toBeVisible();

    await label.click();

    await expect(label, `The ${label} is still checked`).not.toBeChecked();
    await expect(item, `The ${item} is still visible`).toHaveCSS('display', 'none');

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify items when all legend items are unchecked', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bubble-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const labels = await page.locator('label[data-ui-name="Checkbox"]').all();
    const items = await page.locator('g').all();

    labels.forEach(async (label) => {
      await expect(label, `The ${label} is unchecked`).toBeChecked();
    });

    items.forEach(async (item) => {
      await expect(item, `The ${item} is hidden`).toBeVisible();
    });

    for (const label of labels) {
      await label.click();
    }

    for (const label of labels) {
      await expect(label, `The ${label} is still checked`).not.toBeChecked();
    }

    for (const item of items) {
      await expect(item, `The ${items} is still visible`).toHaveCSS('display', 'none');
    }

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify patterns', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bubble-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const getPatternId = (index: number) => `ui-kit-ra-${index}-pattern`;
    const labelsCount = await page.locator('label[data-ui-name="Checkbox"]').count();

    for (let i = 0; i < labelsCount; i++) {
      const patternId = getPatternId(i);
      const pattern = await page.$(`pattern[id=${patternId}]`);

      expect(pattern, `Pattern ${i} is not visibile.`).toBeTruthy();
    }

    await page.screenshot();
    await expect(page).toHaveScreenshot();
  });
});
