import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(` @tooltip ${TAG.ACCESSIBILITY}`, () => {
  test('Default summary example', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/summary/docs/examples/default-summary-example.tsx', 'en');

    await page.waitForTimeout(3500);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Summary with error', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-error.tsx', 'en');

    await page.waitForTimeout(3500);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Summary with minitrend', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-minitrend.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
