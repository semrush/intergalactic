import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  buttonText: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button.Text"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  buttonAddon: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button.Addon"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },

};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesPrimary = [
    // base
    { use: 'primary', color: undefined, size: undefined, active: false, disabled: false, hintPlacement: 'top' },
    { use: 'secondary', color: undefined, size: 100, active: false, disabled: false, hintPlacement: 'bottom' },
    { use: undefined, color: 'text-critical', size: 500, active: false, disabled: false, hintPlacement: 'bottom' },

    // active
    { use: 'primary', color: undefined, size: undefined, active: true, disabled: false, hintPlacement: 'top' },
    { use: 'secondary', color: undefined, size: 100, active: true, disabled: false, hintPlacement: 'bottom' },
    { use: undefined, color: 'text-critical', size: 500, active: true, disabled: false, hintPlacement: 'bottom' },

    // disabled
    { use: 'primary', color: undefined, size: undefined, active: false, disabled: true, hintPlacement: 'top' },
    { use: 'secondary', color: undefined, size: 100, active: false, disabled: true, hintPlacement: 'bottom' },
    { use: undefined, color: 'text-critical', size: 500, active: false, disabled: true, hintPlacement: 'bottom' },

  ];

  variablesPrimary.forEach((item) => {
    test(`Verify Base example size=${item.size} use=${item.use} color=${item.color} disabled=${item.disabled} active=${item.active}`, {
      tag: [`${TAG.PRIORITY_HIGH},
        @button,
        @button-link,
         @base-components,
         @icon`],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-link/button-link-base.tsx', 'en', item);

      await page.keyboard.press('Tab');
      const count = await locators.button(page).count();

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await locators.button(page).nth(4).hover();
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.disabled) {
        await test.step(`Verify attributes for disabled`, async () => {
          await expect(page).toHaveScreenshot();

          for (let i = 0; i < count; i++) {
            await expect(locators.button(page).nth(i)).toHaveAttribute('tabindex', '0');
          }
        });
      }
    });

    test(`Verify Addon only example size=${item.size} use=${item.use} color=${item.color} disabled=${item.disabled} active=${item.active} hintPlacement=${item.hintPlacement}`, {
      tag: [`${TAG.PRIORITY_HIGH},
        @button,
         @button-link,
         @base-components,
         @icon`],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-link/button-link-icon-only.tsx', 'en', item);

      const count = await locators.button(page).count();

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await page.getByText('ButtonLink Addon').waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await locators.button(page).nth(1).hover();
          await page.getByLabel('addonLeft').waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.disabled) {
        await test.step(`Verify attributes for disabled`, async () => {
          await expect(page).toHaveScreenshot();

          for (let i = 0; i < count; i++) {
            await expect(locators.button(page).nth(i)).toHaveAttribute('tabindex', '0');
          }
        });
      }
    });
  });
});
