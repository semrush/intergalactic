import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @input`, () => {
  test('Login form', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/default-log-in-form.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Input phone - Unknown country and number format', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/input-phone/docs/examples/unknown_country_and_number_format.tsx', 'en');

    await test.step('init check', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('after some text', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('123');
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });

  test('Input phone - Known country and Unknown number format', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/input-phone/docs/examples/known_country_but_the_number_format_is_unknown.tsx', 'en');

    await test.step('init check', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('after some text', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('123');
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});
