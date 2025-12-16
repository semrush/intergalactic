import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @input-tags`, () => {
  test('Select for tag filtering', async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx', 'en');

    await test.step('Init state', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Open select', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Select item', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
  test('Entering and editing tags', async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Wrapping email in tag', async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
