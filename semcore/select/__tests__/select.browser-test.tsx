import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';

export function getSelectLocators(page: Page): {
  select: Locator;
  selectTrigger: Locator;
  label: Locator;
  popper: Locator;
  menu: Locator;
  list: Locator;
  options: Locator;
  triggerText: Locator;
} {
  return {
    select: page.locator('[data-ui-name="Select"]'),
    selectTrigger: page.locator('[data-ui-name="Select.Trigger"]'),
    label: page.locator('[data-ui-name="Text"]'),
    popper: page.locator('[data-ui-name="Select.Popper"]'),
    menu: page.locator('[data-ui-name="Select.Menu"]'),
    list: page.locator('[data-ui-name="Select.List"]'),
    options: page.locator('[data-ui-name="Select.Option"]'),
    triggerText: page.locator('[data-ui-name="ButtonTrigger.Text"]'),
  };
}

test.describe('Trigger and menu options', () => {
  test('Verify select trigger states and styles', async ({ page }) => {
    const standPath = 'stories/components/select/tests/examples/trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.locator('[data-testid="normal-m"]').click();
    await page.locator('[data-testid="normal-l"]').hover();

    for (let i = 0; i < 15; i++) await page.keyboard.press('Tab');

    await expect(page).toHaveScreenshot();
  });

  test('Verify select List item states', async ({ page }) => {
    const standPath = 'stories/components/select/tests/examples/options.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { menu, options, selectTrigger, popper } = getSelectLocators(page);

    const content = page.locator('[data-ui-name="Select.Option.Content"]');
    const optionHint = page.locator('[data-ui-name="Select.Option.Hint"]');
    const group = page.locator('[data-ui-name="Select.Group"]');

    await test.step('Verify trigger and poppper attributes', async () => {
      await expect(selectTrigger).toHaveAttribute('type', 'button');
      await expect(selectTrigger).toHaveAttribute('tabindex', '0');
      await expect(selectTrigger).toHaveAttribute('role', 'combobox');
      await expect(selectTrigger).toHaveAttribute('aria-expanded', 'false');
      await expect(selectTrigger).toHaveAttribute('aria-haspopup', 'listbox');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(selectTrigger).toHaveAttribute('aria-expanded', 'true');
      await expect(selectTrigger).toHaveAttribute('aria-controls');
      await expect(selectTrigger).toHaveAttribute('aria-activedescendant');
    });

    await test.step('Verify menu attributes', async () => {
      await expect(menu).toHaveAttribute('role', 'listbox');
      await expect(menu).toHaveAttribute('aria-label', 'Option types');
    });

    await test.step('Verify regular option attributes', async () => {
      const option1 = options.first();
      await expect(option1).toHaveAttribute('aria-selected', 'false');
      await expect(option1).toHaveAttribute('aria-disabled', 'false');
    });

    await test.step('Verify disabled option attributes', async () => {
      const optionDisabled = options.nth(1);
      await expect(optionDisabled).toHaveAttribute('aria-selected', 'false');
      await expect(optionDisabled).toHaveAttribute('aria-disabled', 'true');
    });

    await test.step('Verify selected option attributes', async () => {
      const optionSelected = options.nth(2);
      await expect(optionSelected).toHaveAttribute('aria-selected', 'true');
      await expect(optionSelected).toHaveAttribute('aria-disabled', 'false');
    });

    await test.step('Verify option content attributes', async () => {
      const content1 = content.first();
      await expect(content1).toHaveAttribute('aria-describedby');
    });

    await test.step('Verify option hint attributes', async () => {
      await expect(optionHint).toHaveAttribute('aria-hidden', 'true');
    });

    await test.step('Verify group attributes', async () => {
      await expect(group).toHaveAttribute('role', 'group');
      await expect(group).toHaveAttribute('aria-labelledby');
      await expect(group).toHaveAttribute('aria-describedby');
    });

    await test.step('Verify options styles', async () => {
      await options.nth(0).hover();
      await expect(page).toHaveScreenshot();
      await options.nth(2).hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify trigger customization mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/trigger_customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { select, label, menu, options, triggerText } = getSelectLocators(page);

    await test.step('Verify menu opens and hides by click on label or button trigger', async () => {
      await label.first().click();
      await expect(menu).toBeVisible();
      await select.first().click();
      await expect(select.first()).toHaveAttribute('id', 'button-trigger-select');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify option selected and shown on button trigger', async () => {
      await label.first().click();
      await expect(menu).toBeVisible();
      await options.first().click();
      await expect(menu).not.toBeVisible();
      await expect(select.first()).toHaveAttribute('value', '0');
      await expect(triggerText.first()).toHaveText(/Option 0/);
    });

    await test.step('Verify menu opens and hides by click on link trigger or label', async () => {
      await label.nth(1).click();
      await expect(menu).toBeVisible();
      await select.nth(1).click();
      await expect(select.nth(1)).toHaveAttribute('id', 'link-trigger-select');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify option selected and shown on link trigger', async () => {
      await label.nth(1).click();
      await expect(menu).toBeVisible();
      await options.nth(3).click();
      await expect(menu).not.toBeVisible();
      await expect(select.nth(1)).toHaveAttribute('value', '3');
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]')).toHaveText(/Option 3/);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify trigger customization keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/trigger_customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { select, menu, triggerText } = getSelectLocators(page);

    await test.step('Verify button trigger keyboard interactions', async () => {
      await page.keyboard.press('Tab');
      await expect(select.first()).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(menu).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await expect(menu).not.toBeVisible();
      await expect(select.first()).toHaveAttribute('value', '2');
      await expect(triggerText.first()).toHaveText(/Option 2/);
    });

    await test.step('Verify link trigger keyboard interactions', async () => {
      await page.keyboard.press('Tab');
      await expect(select.nth(1)).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(menu).toBeVisible();
      await select.nth(1).hover();
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await expect(menu).not.toBeVisible();
      await expect(select.first()).toHaveAttribute('value', '2');
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]')).toHaveText(/Option 2/);
    });
  });

  test('Verify select with notice without focusable elements', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/dropdownmenu_customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { select, label, list, options, triggerText } = getSelectLocators(page);

    await label.click();
    await expect(list).toBeVisible();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(page).toHaveScreenshot();
  });

  test('Verify select menu with reload actions by mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { popper } = getSelectLocators(page);

    await page.locator('[data-ui-name="FilterTrigger.TriggerButton"]').click();
    await new Promise((resolve) => setTimeout(resolve, 300));
    await expect(popper).toBeVisible();
    await expect(page).toHaveScreenshot();
  });

  test('Verify select menu with reload actions by keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { popper } = getSelectLocators(page);
    const buttonLink = page.locator('[data-ui-name="ButtonLink"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(popper).toBeVisible();
    await buttonLink.waitFor();
    await page.keyboard.press('Tab');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Basic select', () => {
  test('Verify basic usage mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { select, label, menu, options, triggerText } = getSelectLocators(page);

    await test.step('Verify menu opens and hides by label click', async () => {
      await label.click();
      await expect(menu).toBeVisible();
      await label.click();
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify menu opens and hides by trigger click', async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await select.click();
      await expect(menu).toBeVisible();
      await select.click();
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify menu opens and hides by option click', async () => {
      await select.click();
      await expect(menu).toBeVisible();
      await options.nth(2).click();
      await expect(menu).not.toBeVisible();
      await expect(select).toHaveAttribute('value', '2');
      await expect(triggerText).toHaveText(/Option 2/);
    });

    await test.step('Verify menu when option was selected by mouse and keyboard interactions', async () => {
      await select.click();
      await new Promise((resolve) => setTimeout(resolve, 500));

      await expect(menu).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(menu).not.toBeVisible();
      await expect(select).toHaveAttribute('value', '3');
      await expect(triggerText).toHaveText(/Option 3/);
    });
  });

  test('Verify basic usage keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { select, menu, options, triggerText } = getSelectLocators(page);

    await test.step('Verify opens by space', async () => {
      await page.keyboard.press('Tab');
      await expect(select).toBeFocused();
      await page.keyboard.press('Space');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify 1st item highlighted when interacting by mouse and the by keyboard', async () => {
      await select.click();
      await page.keyboard.press('ArrowDown');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);
      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify opens by Enter', async () => {
      await page.keyboard.press('Enter');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify opens by ArrowDown', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify opens by ArrowUp', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify Arrows navigation in menu', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(options.nth(0)).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowLeft');
      await expect(options.nth(0)).toHaveClass(/highlighted/);

      await page.keyboard.press('ArrowDown');
      await expect(options.nth(1)).toHaveClass(/highlighted/);
    });

    await test.step('Verify Tab not removed focus outside menu', async () => {
      await page.keyboard.press('Tab');
      await expect(options.nth(1)).toHaveClass(/highlighted/);
    });

    await test.step('Verify space selects item and closes menu', async () => {
      await page.keyboard.press('Space');
      await expect(menu).not.toBeVisible();
      await expect(select).toHaveAttribute('value', '1');
      await expect(triggerText).toHaveText(/Option 1/);
      await expect(select).toBeFocused();
    });

    await test.step('Verify enter selects item and closes menu', async () => {
      await page.keyboard.press('Space');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(menu).not.toBeVisible();
      await expect(select).toHaveAttribute('value', '2');
      await expect(triggerText).toHaveText(/Option 2/);
      await expect(select).toBeFocused();
    });

    await test.step('Verify escape closes menu and not changes value', async () => {
      await page.keyboard.press('Space');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
      await expect(select).toHaveAttribute('value', '2');
      await expect(triggerText).toHaveText(/Option 2/);
      await expect(select).toBeFocused();
    });
  });

  test('Verify custom selected label mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/custom_selected_label.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { select, label, menu, options, triggerText } = getSelectLocators(page);

    await test.step('Verify menu opens and hides by label click', async () => {
      await label.click();
      await expect(menu).toBeVisible();
      await label.click();
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify menu opens and hides by trigger click', async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await select.click();
      await expect(menu).toBeVisible();
      await select.click();
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify menu opens and hides by option click', async () => {
      await select.click();
      await expect(menu).toBeVisible();
      await options.nth(2).click();
      await expect(menu).not.toBeVisible();
      await expect(select).toHaveAttribute('value', '2');
      await expect(triggerText).toHaveText(/Label 2/);
    });

    await test.step('Verify menu when option was selected by mouse and keyboard interactions', async () => {
      await select.click();
      await new Promise((resolve) => setTimeout(resolve, 500));

      await expect(menu).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(menu).not.toBeVisible();
      await expect(select).toHaveAttribute('value', '3');
      await expect(triggerText).toHaveText(/Label 3/);
    });
  });

  test('Verify custom selected label keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/custom_selected_label.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { select, menu, options, triggerText } = getSelectLocators(page);

    await test.step('Verify opens by space', async () => {
      await page.keyboard.press('Tab');
      await expect(select).toBeFocused();
      await page.keyboard.press('Space');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify opens by Enter', async () => {
      await page.keyboard.press('Enter');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify opens by ArrowDown', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify opens by ArrowUp', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(menu).toBeVisible();
      await expect(options.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify Arrows navigation in menu', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(options.first()).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowLeft');
      await expect(options.first()).toHaveClass(/highlighted/);

      await page.keyboard.press('ArrowDown');
      await expect(options.nth(1)).toHaveClass(/highlighted/);
    });

    await test.step('Verify Tab not removed focus outside menu', async () => {
      await page.keyboard.press('Tab');
      await expect(options.nth(1)).toHaveClass(/highlighted/);
    });

    await test.step('Verify space selects item and closes menu', async () => {
      await page.keyboard.press('Space');
      await expect(menu).not.toBeVisible();
      await expect(select).toHaveAttribute('value', '1');
      await expect(triggerText).toHaveText(/Label 1/);
      await expect(select).toBeFocused();
    });

    await test.step('Verify enter selects item and closes menu', async () => {
      await page.keyboard.press('Space');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(menu).not.toBeVisible();
      await expect(select).toHaveAttribute('value', '2');
      await expect(triggerText).toHaveText(/Label 2/);
      await expect(select).toBeFocused();
    });
  });

  test('Verify Controlled Mode mouse interactions', async ({ page }) => {
    const standPath =
      'stories/components/select/docs/examples/controlled_and_uncontrolled_modes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { select, label, menu, options, triggerText } = getSelectLocators(page);

    await test.step('Verify Uncontrolled not changes when selecting Controlled option', async () => {
      await label.first().click();
      await expect(menu).toBeVisible();
      await options.nth(2).click();
      await expect(menu).not.toBeVisible();
      await expect(select.first()).toHaveAttribute('value', '2');
      await expect(triggerText.first()).toHaveText(/Option 2/);
      await expect(select.nth(1)).toHaveAttribute('value', '0');
      await expect(triggerText.nth(1)).toHaveText(/Option 0/);
    });

    await test.step('Verify Controlled  changes when selecting Uncontrolled option', async () => {
      await select.nth(1).click();
      await expect(menu).toBeVisible();
      await options.nth(5).click();
      await expect(menu).not.toBeVisible();
      await expect(select.first()).toHaveAttribute('value', '5');
      await expect(triggerText.first()).toHaveText(/Option 5/);
      await expect(select.nth(1)).toHaveAttribute('value', '5');
      await expect(triggerText.nth(1)).toHaveText(/Option 5/);
    });
  });

  test('Verify Controlled Mode keyboard interactions', async ({ page }) => {
    const standPath =
      'stories/components/select/docs/examples/controlled_and_uncontrolled_modes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const { select, label, menu, options, triggerText } = getSelectLocators(page);

    await test.step('Verify Uncontrolled not changes when selecting Controlled option', async () => {
      await page.keyboard.press('Tab');
      await expect(select.first()).toBeFocused();
      await page.keyboard.press('Space');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(menu).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await expect(menu).not.toBeVisible();
      await expect(select.first()).toHaveAttribute('value', '2');
      await expect(triggerText.first()).toHaveText(/Option 2/);
      await expect(select.nth(1)).toHaveAttribute('value', '0');
      await expect(triggerText.nth(1)).toHaveText(/Option 0/);
    });

    await test.step('Verify Controlled  changes when selecting Uncontrolled option', async () => {
      await page.keyboard.press('Tab');
      await expect(select.nth(1)).toBeFocused();
      await page.keyboard.press('Space');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(menu).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await expect(menu).not.toBeVisible();
      await expect(select.first()).toHaveAttribute('value', '4');
      await expect(triggerText.first()).toHaveText(/Option 4/);
      await expect(select.nth(1)).toHaveAttribute('value', '4');
      await expect(triggerText.nth(1)).toHaveText(/Option 4/);
    });
  });
});

test.describe('Options filtering', () => {
  test('Verify keyboard interactions when select with Search', async ({ page, browserName }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocaltor = await page.locator('input');
    const { select, label, menu, options, triggerText, list, selectTrigger } =
      getSelectLocators(page);

    await test.step('Verify input focused when menu expanded', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForSelector('input');

      await expect(inputLocaltor).toBeFocused();

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify arrowLeft and Right not move focus', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(inputLocaltor).toBeFocused();
      await page.keyboard.press('ArrowLeft');
      await expect(inputLocaltor).toBeFocused();
    });

    await test.step('Verify escape closes menu', async () => {
      await page.keyboard.press('Escape');
      await expect(inputLocaltor).toHaveCount(0);
    });

    await test.step('Verify Arrow Down opens menu and input Focused', async () => {
      await page.keyboard.press('ArrowDown');
      await page.waitForSelector('input');
      await expect(inputLocaltor).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(inputLocaltor).toHaveCount(0);
    });

    await test.step('Verify Arrow Up opens menu and input Focused', async () => {
      await page.keyboard.press('ArrowUp');
      await page.waitForSelector('input');
      await expect(inputLocaltor).toBeFocused();
    });

    await test.step('Verify Arrows switch focus from input to the option', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(inputLocaltor).not.toBeFocused();
      await expect(options.first()).toHaveClass(/highlighted/);
      await expect(selectTrigger).toBeFocused();
      await page.keyboard.press('ArrowUp');
    });

    await test.step('Verify tab switch focus to input', async () => {
      await page.keyboard.press('Tab');
      await expect(inputLocaltor).toBeFocused();
      await expect(selectTrigger).not.toBeFocused();
      await page.keyboard.press('ArrowUp');
    });

    await test.step('Verify option selected and menu closed', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await expect(selectTrigger).toBeFocused();
      await expect(inputLocaltor).toHaveCount(0);
      await expect(selectTrigger).toHaveAttribute('value', 'Peach');
      await expect(triggerText).toHaveText(/Peach/);
    });

    await test.step('Verify nothing found state', async () => {
      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await page.keyboard.type('test');
      await expect(page).toHaveScreenshot();
    });

    const hint = page.locator('[data-ui-name="InputSearch.Clear"]');
    await test.step('Verify hint by focus X in search', async () => {
      await page.keyboard.press('Tab');
      await expect(hint).toBeFocused();
      await new Promise((resolve) => setTimeout(resolve, 500));

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus swicthes between X and input by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(inputLocaltor).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(hint).toBeFocused();
    });

    await test.step('Verify clear value by pressing X', async () => {
      await expect(inputLocaltor).toHaveValue('test');
      await page.keyboard.press('Enter');
      await expect(inputLocaltor).not.toHaveValue('test');
    });

    await test.step('Verify searched items can be selected', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Tab');
      await page.keyboard.type('appl');
      await page.keyboard.press('ArrowDown');

      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Enter');
      await expect(selectTrigger).toHaveAttribute('value', 'Apple');
      await expect(triggerText).toHaveText(/Apple/);
    });
  });

  test('Verify mouse interactions when select with Search', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocaltor = await page.locator('input');
    const { popper, label, options, triggerText, selectTrigger } = getSelectLocators(page);

    await test.step('Verify input focused when menu expanded', async () => {
      await selectTrigger.click();
      await page.waitForSelector('input');
      await expect(inputLocaltor).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify closed by click on label', async () => {
      await label.click();
      await expect(inputLocaltor).toHaveCount(0);
    });

    await test.step('Verify option selected by mouse click', async () => {
      await label.click();
      await page.waitForSelector('input');
      await options.nth(2).click();
      await expect(inputLocaltor).toHaveCount(0);
      await expect(selectTrigger).toHaveAttribute('value', 'Blueberry');
      await expect(triggerText).toHaveText(/Blueberry/);
    });

    await test.step('Verify menu opened and selected option highlighted', async () => {
      await label.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(page).toHaveScreenshot();
      await expect(popper).toHaveAttribute('role', 'dialog');
      await expect(popper).toHaveAttribute('tabindex', '-1');
      await expect(popper).toHaveAttribute('aria-label', 'Fruits with search');
    });

    const hint = page.locator('[data-ui-name="InputSearch.Clear"]');

    await test.step('Verify hint on hover X', async () => {
      await page.keyboard.type('test');

      await hint.hover();
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Input search and Clear attributes', async () => {
      await expect(inputLocaltor).toHaveAttribute('type', 'text');
      await expect(inputLocaltor).toHaveAttribute('aria-invalid', 'false');
      await expect(inputLocaltor).toHaveAttribute('aria-label', 'Search');
      await expect(inputLocaltor).toHaveAttribute('aria-describedby');
      await expect(hint).toHaveAttribute('type', 'button');
      await expect(hint).toHaveAttribute('aria-hidden', 'false');
      await expect(hint).toHaveAttribute('aria-label', 'Clear search field');
    });

    await test.step('Verify clear value by pressing X', async () => {
      await expect(inputLocaltor).toHaveValue('test');
      await hint.click();
      await expect(inputLocaltor).not.toHaveValue('test');
    });

    await test.step('Verify searched items can be selected', async () => {
      await page.keyboard.type('appl');
      await options.first().click();
      await expect(selectTrigger).toHaveAttribute('value', 'Apple');
      await expect(triggerText).toHaveText(/Apple/);
    });
  });

  test('Verify advances filterring control base actions', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/advanced_filtering_control.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocaltor = await page.locator('input');
    const { label, options, triggerText, list, selectTrigger } = getSelectLocators(page);

    await test.step('Verify input focused when menu expanded', async () => {
      await selectTrigger.click();
      await page.waitForSelector('input');
      await expect(inputLocaltor).toBeFocused();
    });

    await test.step('Verify closed by click on label', async () => {
      await label.click();
      await expect(inputLocaltor).toHaveCount(0);
    });

    await test.step('Verify searched items can be selected', async () => {
      await label.click();
      await page.waitForSelector('input');
      await page.keyboard.type('appl');
      await options.first().click();

      await expect(selectTrigger).toHaveAttribute('value', 'Apple');
      await expect(triggerText).toHaveText(/Apple/);
    });

    const hint = page.locator('[data-ui-name="InputSearch.Clear"]');

    await test.step('Verify hint on hover X', async () => {
      await label.click();
      await page.waitForSelector('input');

      await hint.hover();
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Input search and Clear attributes', async () => {
      await expect(inputLocaltor).toHaveAttribute('type', 'text');
      await expect(inputLocaltor).toHaveAttribute('aria-invalid', 'false');
      await expect(inputLocaltor).toHaveAttribute('aria-label', 'Search');
      await expect(inputLocaltor).toHaveAttribute('aria-describedby');
      await expect(hint).toHaveAttribute('type', 'button');
      await expect(hint).toHaveAttribute('aria-hidden', 'false');
      await expect(hint).toHaveAttribute('aria-label', 'Clear search field');
    });
  });
});

test.describe('Focus interaction', () => {
  test('Verify mouse interactions when trigger has focus interaction', async ({ page }) => {
    const standPath = 'stories/components/select/tests/examples/focus_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const { select, menu } = getSelectLocators(page);

    await select.click();
    await expect(menu).toBeVisible();
    await select.click();
    await expect(menu).toBeVisible();
  });

  test('Verify keyboard interactions when trigger has focus interaction', async ({ page }) => {
    const standPath = 'stories/components/select/tests/examples/focus_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const { menu } = getSelectLocators(page);

    await page.keyboard.press('Tab');
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await page.keyboard.press('Space');
    await expect(menu).toBeVisible();
  });

  test('Verify that select could be focused programmatically', async ({ page }) => {
    const standPath = 'stories/components/select/tests/examples/programmatically_focus.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const setFocusButton = page.getByRole('button', { name: 'Set focus' });

    await setFocusButton.click();

    const errorTooltip = page.getByText('Some error message');
    await errorTooltip.waitFor();

    await expect(errorTooltip).toBeVisible();
  });
});
