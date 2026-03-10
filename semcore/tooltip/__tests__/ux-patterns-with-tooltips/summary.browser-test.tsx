import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  link: (page: Page, index?: number) => {
    const base = page.getByRole('link');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dialog: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  hint: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Hint"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  loading: (page: Page, index?: number) => {
    const base = page.getByLabel('Loading…');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(TAG.VISUAL, () => {
  test('Verify Default summary', {
    tag: [TAG.PRIORITY_HIGH, '@tooltip', '@skeleton', '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/summary/docs/examples/default-summary-example.tsx', 'en');

    const link = locators.link(page);
    const descriptionTooltip = locators.dialog(page);

    await test.step('Verify focus on tooltip trigger and link hover', async () => {
      await locators.loading(page, 1).waitFor({ state: 'hidden' });

      await page.keyboard.press('Tab');
      await link.nth(1).hover();

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Description tooltip opened', async () => {
      await page.keyboard.press('Space');
      await descriptionTooltip.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify loading state', async () => {
      await page.keyboard.press('Escape');
      await descriptionTooltip.waitFor({ state: 'hidden' });
      await locators.button(page, 3).click();
      await locators.loading(page, 1).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Summary with error', {
    tag: [TAG.PRIORITY_HIGH, '@tooltip', '@skeleton', '@base-components', '@hint', '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-error.tsx', 'en');

    const button = locators.button(page);
    const descriptionTooltip = locators.dialog(page);
    const image = page.locator('[data-ui-name="Warning"]');

    await test.step('Verify focus on tooltip trigger and link hover', async () => {
      await page.keyboard.press('Tab');
      await button.nth(1).hover();

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Description tooltip and Hint opened', async () => {
      await page.keyboard.press('Space');
      await descriptionTooltip.waitFor({ state: 'visible' });

      const box = await image.nth(2).boundingBox();

      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Summary with minitrends', {
    tag: [TAG.PRIORITY_HIGH, '@tooltip', '@skeleton', '@link', '@mini-chart'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-minitrend.tsx', 'en');

    const link = locators.link(page);
    const descriptionTooltip = locators.dialog(page);

    await test.step('Verify focus on tooltip trigger and link hover', async () => {
      await page.keyboard.press('Tab');
      await link.nth(1).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Description tooltip and Hint opened', async () => {
      await locators.button(page, 1).click();
      await descriptionTooltip.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });
});
