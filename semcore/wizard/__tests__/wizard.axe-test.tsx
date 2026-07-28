import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  button: (page: Page, name?: string, index?: number): Locator => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

test.describe(`@wizard ${TAG.ACCESSIBILITY}`, () => {
  test('Base example', async ({ page }) => {
    await loadPage(page, 'stories/components/wizard/docs/examples/basic_example.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Base example in small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await loadPage(page, 'stories/components/wizard/docs/examples/basic_example.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Custom Step', async ({ page }) => {
    await loadPage(page, 'stories/components/wizard/docs/examples/custom_step.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Close').waitFor({ state: 'visible' });
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
