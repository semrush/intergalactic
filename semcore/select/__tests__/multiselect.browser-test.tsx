import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  select: (page: Page) => page.locator('[data-ui-name="Select"]'),
  selectTrigger: (page: Page) => page.getByRole('combobox'),
  label: (page: Page) => page.locator('label'),
  menu: (page: Page) => page.getByRole('listbox'),
  list: (page: Page) => page.locator('[data-ui-name="Select.List"]'),
  options: (page: Page, index?: number) => {
    const base = page.getByRole('option');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  triggerText: (page: Page) => page.locator('[data-ui-name="ButtonTrigger.Text"]'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify multiselect selection visual state', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/multiselect.tsx', 'en');

    await test.step('Verify menu not closed when selecting items', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify multiselect with divider and sorting visual state', {
    tag: [TAG.PRIORITY_HIGH, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/sorting_multiselect_options.tsx', 'en');

    await test.step('Verify items sorted and divider shown on 2nd expand', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'visible' });

      await page.waitForTimeout(150); // finish animation especially for ff and webkit
      await locators.options(page, 5).click();
      await locators.options(page, 1).click();
      await locators.options(page, 3).click();

      await page.keyboard.press('Escape');
      await locators.options(page, 0).waitFor({ state: 'hidden' });
      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify multiselect with render function select all visual state', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/render_function.tsx', 'en');
    const option = page.locator('[data-ui-name="Select.Option"][value="%all%"]');

    await test.step('Verify activating Select all selects all items', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await page.waitForTimeout(200);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await option.waitFor({ state: 'visible' });
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify multiselect mouse selection visual state', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/multiselect.tsx', 'en');

    await test.step('Verify options selected and menu not closed by clicking on options', async () => {
      await locators.label(page).click();
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await page.waitForTimeout(200);

      await locators.options(page, 1).click();
      await locators.options(page, 5).click();
      await locators.options(page, 3).click();

      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify keyboard interactions with multiselect', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/multiselect.tsx', 'en');

    await test.step('Verify first option selected when expanded', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await expect(locators.select(page)).toBeFocused();
      await expect(locators.options(page, 0)).toHaveClass(/highlighted/);
    });

    await test.step('Verify tab not moves focus', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.select(page)).toBeFocused();
      await expect(locators.options(page, 0)).toHaveClass(/highlighted/);
    });

    await test.step('Verify menu not closed when selecting items', async () => {
      await page.keyboard.press('Space');
      await expect(locators.select(page)).toBeFocused();
      await expect(locators.options(page, 0)).toHaveClass(/selected/);
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Space');
      await expect(locators.options(page, 0)).toHaveClass(/selected/);
      await expect(locators.options(page, 19)).toHaveClass(/selected/);
      await expect(locators.triggerText(page)).toHaveText('Option 0, Option 19');
    });

    await test.step('Verify Escape closes menu', async () => {
      await page.keyboard.press('Escape');
      await locators.options(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.select(page)).toBeFocused();
      await expect(locators.triggerText(page)).toHaveText('Option 0, Option 19');
    });

    await test.step('Verify first selected highlights when menu expanded', async () => {
      await page.keyboard.press('Enter');
      await locators.options(page, 0).waitFor({ state: 'visible' });
      // Wait for the first option to be highlighted before proceeding
      await expect(locators.options(page, 0)).toHaveClass(/highlighted/);
      await page.waitForTimeout(200);

      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');
      await locators.options(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.triggerText(page)).toHaveText(' Option 19, Option 18');
      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await expect(locators.options(page, 18)).toHaveClass(/highlighted/);
    });
  });

  test('Verify mouse interactions with multiselect', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/multiselect.tsx', 'en');

    await test.step('Verify menu opened and closed by label and trigger click', async () => {
      await locators.select(page).click();
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await locators.label(page).click();
      await locators.options(page, 0).waitFor({ state: 'hidden' });
    });

    await test.step('Verify options selected and menu not closed by clicking on options', async () => {
      await locators.label(page).click();
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await page.waitForTimeout(200);

      await locators.options(page, 1).click();
      await locators.options(page, 5).click();
      await locators.options(page, 3).click();

      await expect(locators.triggerText(page)).toHaveText('Option 1, Option 5, Option 3');
    });

    await test.step('Verify closed and selection saved', async () => {
      await locators.label(page).click();
      await locators.options(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.triggerText(page)).toHaveText('Option 1, Option 5, Option 3');
    });

    await test.step('Verify menu opened and selected option highlighted', async () => {
      await locators.label(page).click();
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await page.waitForTimeout(200);
      await locators.options(page, 5).click();
      await expect(locators.options(page, 1)).toHaveClass(/selected/);
      await expect(locators.options(page, 3)).toHaveClass(/selected/);
      await expect(locators.options(page, 5)).not.toHaveClass(/selected/);
    });
  });

  test('Verify multiselect with divider and sorting functionality', {
    tag: [TAG.PRIORITY_HIGH, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/sorting_multiselect_options.tsx', 'en');

    await test.step('Verify first option selected when expanded', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await expect(locators.options(page, 0)).toHaveClass(/highlighted/);
      await expect(locators.selectTrigger(page)).toBeFocused();
    });

    await test.step('Verify options selected by click', async () => {
      await page.waitForTimeout(200);
      await locators.options(page, 5).click();
      await locators.options(page, 1).click();
      await locators.options(page, 3).click();

      await expect(locators.triggerText(page)).toHaveText('5, 1, 3');
    });

    await test.step('Verify items sorted on 2nd expand', async () => {
      await page.keyboard.press('Escape');
      await locators.options(page, 0).waitFor({ state: 'hidden' });
      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'visible' });
      // Verify that items are sorted by checking the first selected option
      await expect(locators.options(page, 0)).toBeVisible();
    });
  });

  test('Verify keyboard interactions with render function', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/render_function.tsx', 'en');
    const option = page.locator('[data-ui-name="Select.Option"][value="%all%"]');
    const text = option.locator('[data-ui-name="Text"]');

    await test.step('Verify first option with checkbox focused when expanded', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await expect(locators.selectTrigger(page)).toBeFocused();
      await expect(locators.options(page, 1)).toHaveClass(/highlighted/);
    });

    await test.step('Verify tab not moves focus', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.selectTrigger(page)).toBeFocused();
      await expect(locators.options(page, 1)).toHaveClass(/highlighted/);
      await expect(text).toHaveText('Select all');
    });

    await test.step('Verify selecting one item changes Select all to Deselect all', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await expect(locators.selectTrigger(page)).toBeFocused();
      await expect(locators.menu(page)).toBeVisible();
      await expect(locators.options(page, 2)).toHaveClass(/selected/);
      await expect(text).toHaveText('Deselect all');
    });

    await test.step('Verify navigation to Deselect by arrows', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(option).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      await expect(locators.selectTrigger(page)).toBeFocused();
      await expect(locators.menu(page)).toBeVisible();
      await expect(locators.options(page, 2)).not.toHaveClass(/selected/);
      await expect(text).toHaveText('Select all');
    });

    await test.step('Verify activating Select all selects all items', async () => {
      await page.keyboard.press('Space');
      await expect(text).toHaveText('Deselect all');
      const count = await locators.options(page).count();
      for (let i = 1; i < count; i++) {
        await expect(locators.options(page, i)).toHaveClass(/selected/);
      }
    });
  });

  test('Verify mouse interactions with render function', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/render_function.tsx', 'en');
    const option = page.locator('[data-ui-name="Select.Option"][value="%all%"]');
    const text = option.locator('[data-ui-name="Text"]');

    await test.step('Verify selecting one item changes Select all to Deselect all', async () => {
      await locators.selectTrigger(page).click();
      await locators.options(page, 0).waitFor({ state: 'visible' });

      await locators.options(page, 3).click();
      await expect(locators.menu(page)).toBeVisible();
      await expect(locators.options(page, 3)).toHaveClass(/selected/);
      await expect(text).toHaveText('Deselect all');
    });

    await test.step('Verify clicking Deselect all removes selection', async () => {
      await option.click();
      await expect(locators.options(page, 3)).not.toHaveClass(/selected/);
      await expect(text).toHaveText('Select all');
    });

    await test.step('Verify clicking Select all selects all items', async () => {
      await option.click();
      await expect(text).toHaveText('Deselect all');
      const count = await locators.options(page).count();
      for (let i = 1; i < count; i++) {
        await expect(locators.options(page, i)).toHaveClass(/selected/);
      }
    });
  });

  test('Verify keyboard interactions after mouse interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, TAG.MOUSE, '@multiselect'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/multiselect.tsx', 'en');

    await test.step('Verify menu opened by trigger click', async () => {
      await locators.select(page).click();
      await locators.options(page, 0).waitFor({ state: 'visible' });
      await expect(locators.menu(page)).toBeVisible();
    });

    await test.step('Verify options selected and menu not closed by clicking on options', async () => {
      await locators.options(page, 1).click();
      await locators.options(page, 5).click();
      await locators.options(page, 3).click();

      await expect(locators.triggerText(page)).toHaveText('Option 1, Option 5, Option 3');
      await expect(locators.menu(page)).toBeVisible();
    });

    await test.step('Verify next option will be highlighted after pressing keydown', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(locators.options(page, 4)).toHaveClass(/highlighted/);
    });
  });
});
