import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  input: (page: Page, index?: number) => {
    const base = page.getByRole('textbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  inputMask: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="InputMask"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify InputMask basic example', {
    tag: [TAG.PRIORITY_HIGH, '@input-mask'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/inputmask.tsx', 'en');

    await locators.input(page).waitFor({ state: 'visible' });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focused state', async () => {
      await locators.input(page).focus();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify InputMask Aliases example', {
    tag: [TAG.PRIORITY_HIGH, '@input-mask'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/aliases.tsx', 'en');

    await locators.input(page).waitFor({ state: 'visible' });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify InputMask Pipe example', {
    tag: [TAG.PRIORITY_HIGH, '@input-mask'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/pipe.tsx', 'en');

    await locators.input(page).first().waitFor({ state: 'visible' });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify card number filled state', async () => {
      await locators.input(page, 0).fill('123');
      await expect(page).toHaveScreenshot();
    });
  });
});
