import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';

test.describe('Input tag', () => {
  test('Select for tag filtering', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

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
    const standPath = 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Wrapping email in tag', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe('UX pattern - Input tags and Select', () => {
  test('Input tags and select', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/inputtags-and-select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
