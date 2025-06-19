import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Informer', () => {
  test('Basic', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/informer/docs/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
