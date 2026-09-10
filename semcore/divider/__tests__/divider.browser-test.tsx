import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  input: (page: Page) => page.getByRole('textbox'),
  hint: (page: Page, text: string) => page.getByText(text),

  addon: (page: Page) => page.locator('[data-ui-name="Input.Addon"]'),
};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesActive = [
    // horizontal
    { orientation: 'horizontal', use: 'primary', theme: 'default', w: 100, h: undefined },
    { orientation: 'horizontal', use: 'primary', theme: 'invert', w: undefined, h: undefined },
    { orientation: 'horizontal', use: 'secondary', theme: 'default', w: 100, h: undefined },
    { orientation: 'horizontal', use: 'secondary', theme: 'invert', w: undefined, h: undefined },
    { orientation: 'horizontal', use: 'secondary', theme: 'border-warning-active', w: undefined, h: undefined },

    // vertical
    { orientation: 'vertical', use: 'primary', theme: 'default', w: undefined, h: 100 },
    { orientation: 'vertical', use: 'primary', theme: 'invert', w: undefined, h: 150 },
    { orientation: 'vertical', use: 'secondary', theme: 'default', w: undefined, h: 50 },
    { orientation: 'vertical', use: 'secondary', theme: 'invert', w: undefined, h: 200 },
    { orientation: 'vertical', use: 'secondary', theme: 'border-warning-active', w: undefined, h: undefined },

  ];
  variablesActive.forEach((item) => {
    test(`Verify divider with orientation=${item.orientation} use=${item.use} theme=${item.theme} w=${item.w} h=${item.h}}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/divider/tests/examples/divider-styles.tsx', 'en', item);
      const flex = page.locator('[data-testid="wrap"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await expect(page).toHaveScreenshot({ clip: screenshotsClip, scale: 'device' });
      const divider = page.getByRole('separator');

      if (item.orientation == 'horizontal') {
        await expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
      }
      if (item.orientation == 'vertical') {
        await expect(divider).toHaveAttribute('aria-orientation', 'vertical');
      }
    });
  });

  test('Verify renders in the middle of the content', {
    tag: [TAG.PRIORITY_HIGH,
      '@divider',
      '@base-components'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/divider/tests/examples/render-in-center.tsx', 'en');
    await expect(page).toHaveScreenshot();
  });

  test.describe('Complex examples', () => {
    test('Verify horizontal divider renders in complex examples', {
      tag: [TAG.PRIORITY_HIGH,
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/patterns/ux-patterns/summary/docs/examples/default-summary-example.tsx', 'en');
      await expect(page).toHaveScreenshot();
    });

    test('Verify vertical divider renders in complex examples', {
      tag: [TAG.PRIORITY_HIGH,
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-minitrend.tsx', 'en');
      await expect(page).toHaveScreenshot();
    });
  });
});
