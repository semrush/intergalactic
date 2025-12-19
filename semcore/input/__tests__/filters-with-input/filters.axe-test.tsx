import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @input`, () => {
  test('Dynamic search', async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-search/docs/examples/dynamic_search.tsx', 'en');

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

  test('Search By button', async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-search/docs/examples/search-by-button.tsx', 'en');

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

  test('Search With select', async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-search/docs/examples/search-with-select.tsx', 'en');

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
