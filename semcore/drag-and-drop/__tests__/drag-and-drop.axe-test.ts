import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @drag-and-drop`, () => {
  test('With cards', async ({ page }) => {
    await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_cards.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('With dropdown menu', async ({ page }) => {
    await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
