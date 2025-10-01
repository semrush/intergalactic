import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Filter search', () => {
  test('Dynamic search', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-search/docs/examples/dynamic_search.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('init check', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('after some text', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('test');
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
  test('By button', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-search/docs/examples/search-by-button.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('init check', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('after some text', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('test');
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
  test('With select', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-search/docs/examples/search-with-select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('init check', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('after some text', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('test');
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});
