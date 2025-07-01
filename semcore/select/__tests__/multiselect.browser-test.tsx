import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { browser } from 'globals';

export function getSelectLocators(page: Page): {
  select: Locator;
  selectTrigger: Locator;
  label: Locator;
  menu: Locator;
  list: Locator;
  options: Locator;
  triggerText: Locator;
} {
  return {
    select: page.locator('[data-ui-name="Select"]'),
    selectTrigger: page.locator('[data-ui-name="Select.Trigger"]'),
    label: page.locator('[data-ui-name="Text"]'),
    menu: page.locator('[data-ui-name="Select.Menu"]'),
    list: page.locator('[data-ui-name="Select.List"]'),
    options: page.locator('[data-ui-name="Select.Option"]'),
    triggerText: page.locator('[data-ui-name="ButtonTrigger.Text"]'),
  };
}

test.describe('Options filtering', () => {
  test('Verify keyboard interactions with multiselect', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/multiselect.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const { select, menu, options, triggerText } = getSelectLocators(page);

    await test.step('Verify first option selected when expanded', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await options.first().waitFor();
      await expect(select).toBeFocused();
      await expect(options.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify tab not moves focus', async () => {
      await page.keyboard.press('Tab');
      await expect(select).toBeFocused();
      await expect(options.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify menu not closed when selecting items', async () => {
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
      await expect(select).toBeFocused();
      await expect(options.first()).toHaveClass(/selected/);
      await expect(menu).toBeVisible();
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Space');
      await expect(options.first()).toHaveClass(/selected/);
      await expect(options.nth(19)).toHaveClass(/selected/);
      await expect(menu).toBeVisible();
      await expect(triggerText).toHaveText('Option 0, Option 19');
    });

    await test.step('Verify Escape closes menu', async () => {
      await page.keyboard.press('Escape');
      await expect(select).toBeFocused();
      await expect(menu).not.toBeVisible();
      await expect(triggerText).toHaveText('Option 0, Option 19');
    });

    await test.step('Verify first selected highlights when menu expanded', async () => {
      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');
      await expect(triggerText).toHaveText(' Option 19, Option 18');
      await page.keyboard.press('Space');
      await new Promise((resolve) => setTimeout(resolve, 300));

      await expect(options.nth(18)).toHaveClass(/highlighted/);
    });
  });

  test('Verify mouse interactions with multiselect', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/multiselect.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const { select, label, menu, options, triggerText, list, selectTrigger } =
      getSelectLocators(page);

    await test.step('Verify menu opened and closed by label and trigger click', async () => {
      await select.click();
      await options.first().waitFor();
      await expect(menu).toBeVisible();
      await label.click();
      await expect(options.first()).not.toBeVisible();
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify options selected and menu not closed by clicking on options', async () => {
      await label.click();
      await new Promise((resolve) => setTimeout(resolve, 500));

      await options.nth(1).click();
      await options.nth(5).click();
      await options.nth(3).click();

      await expect(triggerText).toHaveText('Option 1, Option 5, Option 3');

      await expect(menu).toBeVisible();
    });

    await test.step('Verify closed and selection saved', async () => {
      await label.click();
      await expect(triggerText).toHaveText('Option 1, Option 5, Option 3');
    });

    await test.step('Verify menu opened and selected option highlighted', async () => {
      await label.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      await options.nth(5).click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      await expect(options.nth(1)).toHaveClass(/selected/);
      await expect(options.nth(3)).toHaveClass(/selected/);
      await expect(options.nth(5)).not.toHaveClass(/selected/);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify multiselect with divider and sorting in menu', async ({ page, browserName }) => {
    const standPath = 'stories/components/select/docs/examples/sorting_multiselect_options.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const { selectTrigger, menu, options, triggerText } = getSelectLocators(page);

    await test.step('Verify first option selected when expanded', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await menu.waitFor({ state: 'visible' });
      await expect(selectTrigger).toBeFocused();
      await expect(options.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify options selected by click', async () => {
      if (browserName === 'firefox') {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      await options.nth(5).click();
      await options.nth(1).click();
      await options.nth(3).click();

      await expect(triggerText).toHaveText('5, 1, 3');
    });

    await test.step('Verify items sorted and divider whoen on 2nd expand', async () => {
      await page.keyboard.press('Escape');
      await menu.waitFor({ state: 'hidden' });
      await page.keyboard.press('Space');
      await menu.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify keyboard interactions with render function', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/render_function.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const { selectTrigger, menu, options } = getSelectLocators(page);

    const option = page.locator('[data-ui-name="Select.Option"][value="%all%"]');
    const text = option.locator('[data-ui-name="Text"]');

    await test.step('Verify first option with checkbox focused when expanded', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await options.first().waitFor();
      await expect(selectTrigger).toBeFocused();
      await expect(options.nth(1)).toHaveClass(/highlighted/);
    });

    await test.step('Verify tab not moves focus', async () => {
      await page.keyboard.press('Tab');
      await expect(selectTrigger).toBeFocused();
      await expect(options.nth(1)).toHaveClass(/highlighted/);
      await expect(text).toHaveText('Select all');
    });

    await test.step('Verify selecting one item changes Select all to Deselect all', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await expect(selectTrigger).toBeFocused();
      await expect(menu).toBeVisible();
      await expect(options.nth(2)).toHaveClass(/selected/);
      await expect(text).toHaveText('Deselect all');
    });

    await test.step('Verify navigation to Deselect by arrows', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(option).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      await expect(selectTrigger).toBeFocused();
      await expect(menu).toBeVisible();
      await expect(options.nth(2)).not.toHaveClass(/selected/);
      await expect(text).toHaveText('Select all');
    });

    await test.step('Verify activating Select all selects all items', async () => {
      await page.keyboard.press('Space');
      await expect(text).toHaveText('Deselect all');
      const count = await options.count();
      for (let i = 1; i < count; i++) {
        await expect(options.nth(i)).toHaveClass(/selected/);
      }
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify mouse interactions with render function', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/render_function.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const { selectTrigger, menu, options, triggerText } = getSelectLocators(page);

    const option = page.locator('[data-ui-name="Select.Option"][value="%all%"]');
    const text = option.locator('[data-ui-name="Text"]');

    await test.step('Verify selecting one item changes Select all to Deselect all', async () => {
      await selectTrigger.click();
      await options.nth(3).click();
      await expect(menu).toBeVisible();
      await expect(options.nth(3)).toHaveClass(/selected/);
      await expect(text).toHaveText('Deselect all');
    });

    await test.step('Verify clicking Deselect all dropd selection', async () => {
      await option.click();
      await expect(options.nth(3)).not.toHaveClass(/selected/);
      await expect(text).toHaveText('Select all');
    });

    await test.step('Verify clicking Select all selects all items', async () => {
      await option.click();
      await expect(text).toHaveText('Deselect all');
      const count = await options.count();
      for (let i = 1; i < count; i++) {
        await expect(options.nth(i)).toHaveClass(/selected/);
      }
    });
  });

  test('Verify keyboard interactions after mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/multiselect.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const { select, label, menu, options, triggerText, list, selectTrigger } =
            getSelectLocators(page);

    await test.step('Verify menu opened by trigger click', async () => {
      await select.click();
      await options.first().waitFor();
      await expect(menu).toBeVisible();
    });

    await test.step('Verify options selected and menu not closed by clicking on options', async () => {
      await options.nth(1).click();
      await options.nth(5).click();
      await options.nth(3).click();

      await expect(triggerText).toHaveText('Option 1, Option 5, Option 3');

      await expect(menu).toBeVisible();
    });

    await test.step('Verify next option will be highlighted after pressing keydown', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(options.nth(4)).toHaveClass(/highlighted/);
    });
  });
});
