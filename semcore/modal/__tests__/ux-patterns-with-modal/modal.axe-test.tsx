import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@modal ${TAG.ACCESSIBILITY}`, () => {
  test('Confirmation modal', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/confirmation-modal-dialog/docs/examples/confirmation-modal-example.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
