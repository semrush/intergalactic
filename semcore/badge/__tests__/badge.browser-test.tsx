import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';

/* =====================================================
 Visual Core — @visual-core
 Basic visual states and styles
===================================================== */
test.describe('@visual-core @badge', () => {
  const variables = [
    { bg: undefined, color: undefined },
    { bg: 'cyan', color: undefined },
    { bg: undefined, color: 'text-primary' },
    { bg: 'mist', color: 'gray20' },
    { bg: 'red', color: 'text-primary-invert' },
    { bg: 'orange', color: 'green' },
    { bg: 'green', color: 'white' },
    { bg: 'white', color: 'text-primary' },
  ];

  variables.forEach((item) => {
    test(`Verify bg=${item.bg} and color=${item.color}`, async ({ page }) => {
      await loadPage(page, 'stories/components/badge/tests/examples/badge-bg-colors.tsx', 'en', item);
      await expect(page.locator('[data-ui-name="Badge"]')).toHaveScreenshot();
    });
  });
});

/* =====================================================
 Visual Extended — @visual-extended
 Custom styles, special examples
===================================================== */
test.describe('@visual-extended @badge', () => {
  const variables = [
    { bg: undefined, color: undefined, w: 100, h: 20 },
    { bg: 'cyan', color: undefined, m: 4 },
    { bg: undefined, color: 'text-primary', h: 30, pt: 3 },
  ];

  variables.forEach((item) => {
    test(`Verify bg=${item.bg} and color=${item.color} with w=${item.w} h=${item.h} m=${item.m} pt =${item.p}`, async ({ page }) => {
      await loadPage(page, 'stories/components/badge/tests/examples/badge-bg-colors.tsx', 'en', item);
      await expect(page.locator('[data-ui-name="Badge"]')).toHaveScreenshot();
    });
  });
});

/* =====================================================
 Functional Core — @functional-core
 Mouse and keyboard interactions with base/common examples, base props functionality, aria attributes
===================================================== */
test.describe('@fucntional-core @badge', () => {
  test('Verify no aria-hidden and not focused by keyboard', async ({ page }) => {
    const standPath = 'stories/components/badge/docs/examples/badge_main_types.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const badges = page.locator('[data-ui-name="Badge"]');
    const count = await badges.count();

    for (let i = 0; i < count; i++) {
      await expect(badges.nth(i)).not.toHaveAttribute('aria-hidden');
    }

    await page.keyboard.press('Tab');
    await expect(badges.first()).not.toBeFocused();
  });
});
