import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { a } from 'vitest/dist/chunks/suite.d.FvehnV49';

test.describe('Filter include-exclude', () => {
  test('Basic', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-include-exclude/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
