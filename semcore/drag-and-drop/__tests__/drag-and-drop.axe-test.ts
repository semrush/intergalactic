import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('DnD', () => {
  test('With cards', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_cards.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('With dropdown menu', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
