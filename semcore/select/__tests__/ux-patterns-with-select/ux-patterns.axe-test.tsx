import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@select ${TAG.ACCESSIBILITY}`, () => {
  test('Combobox', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx', 'en');

    await test.step('Default state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Opened combobox', async () => {
      await page.keyboard.press('Tab');
      await page.getByRole('option').first().waitFor({ state: 'visible' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('AutoSuggest', async ({ page }) => {
    const autoSuggestExample = 'stories/patterns/ux-patterns/auto-suggest/tests/examples/autosuggest_test.tsx';

    await loadPage(page, autoSuggestExample, 'en');

    await test.step('Default state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Initial dropdown', async () => {
      await page.keyboard.press('Tab');
      await page.getByText('Start typing to see options').waitFor({ state: 'visible' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Opened autosuggest with typed input', async () => {
      await page.keyboard.type('a');
      await page.getByText('persian').waitFor({ state: 'visible' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Loading autosuggest', async () => {
      await loadPage(page, autoSuggestExample, 'en', { suggestionsSource: 'async', asyncDelay: 500 });
      await page.keyboard.press('Tab');
      await page.keyboard.type('per');
      await page.getByText('Loading...').waitFor({ state: 'visible' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Closed state after selecting an option', async () => {
      await loadPage(page, autoSuggestExample, 'en');
      await page.keyboard.press('Tab');
      await page.keyboard.type('per');
      await page.getByRole('option').first().waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'hidden' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('InputPhone', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/input-phone/docs/examples/known_country_and_number_format.tsx', 'en');

    await test.step('Default state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Opened select', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });
});
