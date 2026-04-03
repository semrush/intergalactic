import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  select: (page: Page) => page.locator('[data-ui-name="Select"]'),
  selectTrigger: (page: Page) => page.getByRole('combobox'),
  label: (page: Page) => page.locator('label'),
  popper: (page: Page) => page.locator('[data-ui-name="Select.Popper"]'),
  menu: (page: Page) => page.getByRole('listbox'),
  list: (page: Page) => page.locator('[data-ui-name="Select.List"]'),
  options: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('option', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, name?: string) => page.getByRole('button', { name }),
  triggerText: (page: Page) => page.locator('[data-ui-name="ButtonTrigger.Text"]'),
  optionContent: (page: Page) => page.locator('[data-ui-name="Select.Option.Content"]'),
  optionHint: (page: Page) => page.locator('[data-ui-name="Select.Option.Hint"]'),
  group: (page: Page) => page.locator('[data-ui-name="Select.Group"]'),
  inputSearch: (page: Page) => page.locator('[data-ui-name="Select.InputSearch"]'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const pairwiseVariables = [
    // Test basic states with/without label
    { description: 'size M, normal state, with label', size: 'm', disabled: false, state: 'normal', showLabel: true, showLeftAddon: false, showRightAddon: false },
    { description: 'size L, valid state, left icon addon', size: 'l', disabled: false, state: 'valid', showLabel: false, showLeftAddon: true, leftAddonContent: 'icon', showRightAddon: false },
    { description: 'size M, invalid state, with label, right badge addon', size: 'm', disabled: false, state: 'invalid', showLabel: true, showLeftAddon: false, showRightAddon: true, rightAddonContent: 'badge' },
    { description: 'size L, disabled, left badge addon', size: 'l', disabled: true, state: 'normal', showLabel: false, showLeftAddon: true, leftAddonContent: 'badge', showRightAddon: false },
    // Test addon combinations with/without label
    { description: 'size M, with label, left text + right icon addons', size: 'm', disabled: false, state: 'normal', showLabel: true, showLeftAddon: true, leftAddonContent: 'text', showRightAddon: true, rightAddonContent: 'icon' },
    { description: 'size L, valid state, left icon + right text addons', size: 'l', disabled: false, state: 'valid', showLabel: false, showLeftAddon: true, leftAddonContent: 'icon', showRightAddon: true, rightAddonContent: 'text' },
    // Test with trigger text and label variations
    { description: 'size M, left badge addon, with trigger text', size: 'm', disabled: false, state: 'normal', showLabel: false, showLeftAddon: true, leftAddonContent: 'badge', showRightAddon: false, showTriggerText: true },
    { description: 'size L, invalid state, custom label, right icon addon, with trigger text', size: 'l', disabled: false, state: 'invalid', showLabel: true, labelText: 'Custom Label', showRightAddon: true, rightAddonContent: 'icon', showTriggerText: true },
  ];

  pairwiseVariables.forEach((props) => {
    test(`Verify select basic props and addons: ${props.description}`, {
      tag: [TAG.PRIORITY_HIGH, '@select', '@badge'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/select/tests/examples/basic_props_and_trigger_addons.tsx', 'en', props);

      if (!props.disabled) {
        await page.keyboard.press('Tab');
        await locators.selectTrigger(page).hover();
        await expect(page).toHaveScreenshot();

        await locators.selectTrigger(page).click();
        await locators.options(page).first().waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      } else {
        await expect(page).toHaveScreenshot();
      }
    });
  });

  const optionsConfigVariables = [
    // Test checkbox variations
    { description: 'size M, option2 checkbox, option3 no checkbox', size: 'm', state: 'normal', showLabel: true, option2ShowCheckbox: true, option2CheckboxIndeterminate: false, option3ShowCheckbox: false, showGroup: false },
    { description: 'size L, valid state, option3 indeterminate checkbox', size: 'l', state: 'valid', showLabel: false, option2ShowCheckbox: false, option3ShowCheckbox: true, option3CheckboxIndeterminate: true, showGroup: false },
    // Test with groups
    { description: 'size M, invalid state, with label, options with checkboxes, with group', size: 'm', state: 'invalid', showLabel: true, option2ShowCheckbox: true, option3ShowCheckbox: true, showGroup: true },
    { description: 'size L, with group and custom subtitle', size: 'l', state: 'normal', showLabel: false, option2ShowCheckbox: false, option3ShowCheckbox: false, showGroup: true, groupSubTitle: 'Custom subtitle' },
    // Test disabled states
    { description: 'size M, with label, option1 disabled, options with checkboxes', size: 'm', state: 'normal', showLabel: true, option1Disabled: true, option2ShowCheckbox: true, option3ShowCheckbox: true, option3CheckboxIndeterminate: false, showGroup: false },
    { description: 'size L, valid state, all disabled, with checkboxes and group', size: 'l', state: 'valid', showLabel: false, disabledAll: true, option2ShowCheckbox: true, option3ShowCheckbox: true, showGroup: true },
    // Test selected states
    { description: 'size M, invalid state, with label, option1 and option2 selected with checkbox', size: 'm', state: 'invalid', showLabel: true, option1Selected: true, option2ShowCheckbox: true, option2Selected: true, showGroup: false },
    { description: 'size L, option3 selected with indeterminate checkbox and group', size: 'l', state: 'normal', showLabel: false, option3Selected: true, option3ShowCheckbox: true, option3CheckboxIndeterminate: true, showGroup: true },
  ];

  optionsConfigVariables.forEach((props) => {
    test(`Verify select options: ${props.description}`, {
      tag: [TAG.PRIORITY_HIGH, '@select', '@checkbox'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/select/tests/examples/options_checkbox_group_and_hint.tsx', 'en', props);

      await locators.selectTrigger(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });

      // Hover over option with hint if it exists
      if (props.option3ShowCheckbox !== false && !props.disabledAll) {
        await locators.options(page).nth(2).hover();
      }
      await expect(page).toHaveScreenshot();
    });
  });

  const subcomponentsConfigVariables = [
    // Test trigger size and state variations
    { description: 'trigger M normal, list M, no search', triggerSize: 'm', triggerState: 'normal', triggerDisabled: false, triggerLoading: false, listSize: 'm', showInputSearch: false },
    { description: 'trigger L valid, list L, with search', triggerSize: 'l', triggerState: 'valid', triggerDisabled: false, triggerLoading: false, listSize: 'l', showInputSearch: true },
    // Test trigger disabled and loading states
    { description: 'trigger M invalid loading, list M, no search', triggerSize: 'm', triggerState: 'invalid', triggerDisabled: false, triggerLoading: true, listSize: 'm', showInputSearch: false },
    { description: 'trigger L disabled, list L, with search', triggerSize: 'l', triggerState: 'normal', triggerDisabled: true, triggerLoading: false, listSize: 'l', showInputSearch: true },
    // Test list size variations
    { description: 'trigger M, list L maxH 150, with search', triggerSize: 'm', triggerState: 'normal', triggerDisabled: false, triggerLoading: false, listSize: 'l', listMaxH: 150, showInputSearch: true },
    { description: 'trigger L valid, list M maxH 300, no search', triggerSize: 'l', triggerState: 'valid', triggerDisabled: false, triggerLoading: false, listSize: 'm', listMaxH: 300, showInputSearch: false },
    // Test InputSearch with different states
    { description: 'trigger M invalid, list M, search with custom placeholder', triggerSize: 'm', triggerState: 'invalid', triggerDisabled: false, triggerLoading: false, listSize: 'm', showInputSearch: true, inputSearchPlaceholder: 'Custom placeholder' },
    { description: 'trigger L loading, list L, no search, 10 options', triggerSize: 'l', triggerState: 'normal', triggerDisabled: false, triggerLoading: true, listSize: 'l', showInputSearch: false, optionCount: 10 },
  ];

  subcomponentsConfigVariables.forEach((props) => {
    test(`Verify select subcomponents: ${props.description}`, {
      tag: [TAG.PRIORITY_HIGH, '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/select/tests/examples/subcomponents_trigger_popper_list_search.tsx', 'en', props);

      // Test opened state if not disabled
      if (!props.triggerDisabled && !props.triggerLoading) {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.options(page).first().waitFor({ state: 'visible' });

        // If InputSearch is shown, interact with it
        if (props.showInputSearch) {
          await expect(locators.inputSearch(page)).toBeVisible();
          const input = page.locator('input');
          await input.fill('Option 1');
        }

        await expect(page).toHaveScreenshot();
      } else {
        await expect(page).toHaveScreenshot();
      }
    });
  });

  test('Verify select with Search nothing found state', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/options_filtering.tsx', 'en');
    await locators.selectTrigger(page).click();
    await locators.options(page).first().waitFor({ state: 'visible' });
    await page.keyboard.type('test');
    await expect(page.locator('text="Nothing found"')).toBeVisible();
    await expect(page).toHaveScreenshot();
  });

  test('Verify select with notice without focusable elements', {
    tag: [TAG.PRIORITY_MEDIUM, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/dropdownmenu_customization.tsx', 'en');

    await locators.label(page).click();
    await expect(locators.list(page)).toBeVisible();
    await locators.options(page).first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify sticky groups mouse scroll', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/sticky_groups.tsx', 'en');

    await page.locator('[data-ui-name="Select.Trigger"]').click();
    await locators.options(page).first().waitFor({ state: 'visible' });

    await locators.options(page).first().hover();
    await page.mouse.wheel(0, 2000);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify sticky groups keyboard scroll', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/sticky_groups.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.options(page).first().waitFor({ state: 'visible' });

    await expect(locators.inputSearch(page)).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(locators.options(page).nth(1)).not.toHaveClass(/highlighted/);

    for (let i = 0; i < 14; i++) {
      await page.keyboard.press('ArrowDown');
    }
    await expect(locators.options(page).nth(14)).toHaveClass(/highlighted/);

    await page.keyboard.press('Enter');
    await expect(locators.options(page).nth(14)).not.toBeVisible();

    await page.keyboard.press('Enter');
    await locators.options(page).nth(14).waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify trigger customization mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/trigger_customization.tsx', 'en');

    await test.step('Verify menu opens and hides by click on label or button trigger', async () => {
      await locators.label(page).first().click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await locators.select(page).first().click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).first()).toHaveAttribute('id', 'button-trigger-select');
    });

    await test.step('Verify option selected and shown on button trigger', async () => {
      await locators.label(page).first().click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await locators.options(page).first().click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).first()).toHaveAttribute('value', '0');
      await expect(locators.triggerText(page).first()).toHaveText(/Option 0/);
    });

    await test.step('Verify menu opens and hides by click on link trigger or label', async () => {
      await locators.label(page).nth(1).click();
      await locators.options(page).first().waitFor({ state: 'visible' });

      await expect(locators.menu(page)).toBeVisible();
      await locators.select(page).nth(1).click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).nth(1)).toHaveAttribute('id', 'link-trigger-select');
    });

    await test.step('Verify option selected and shown on link trigger', async () => {
      await locators.label(page).nth(1).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await locators.options(page).nth(3).click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).nth(1)).toHaveAttribute('value', '3');
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]')).toHaveText(/Option 3/);
    });
  });

  test('Verify trigger customization keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/trigger_customization.tsx', 'en');

    await test.step('Verify button trigger keyboard interactions', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.select(page).first()).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).first()).toHaveAttribute('value', '2');
      await expect(locators.triggerText(page).first()).toHaveText(/Option 2/);
    });

    await test.step('Verify link trigger keyboard interactions', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.select(page).nth(1)).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).nth(1)).toHaveAttribute('value', '1');
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]')).toHaveText(/Option 1/);
    });
  });

  test('Verify basic usage mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify menu opens and hides by label click', async () => {
      await locators.label(page).click();
      await locators.options(page, undefined, 0).waitFor({ state: 'visible' });
      await expect(locators.menu(page)).toBeVisible();
      await locators.label(page).click();
      await locators.options(page, undefined, 0).waitFor({ state: 'hidden' });
    });

    await test.step('Verify menu opens and hides by trigger click', async () => {
      await locators.select(page).click();
      await locators.options(page, undefined, 0).waitFor({ state: 'visible' });
      await locators.select(page).click();
      await locators.options(page, undefined, 0).waitFor({ state: 'hidden' });
      await expect(locators.menu(page)).not.toBeVisible();
    });

    await test.step('Verify menu opens and hides by option click', async () => {
      await locators.select(page).click();
      await locators.options(page, undefined, 0).waitFor({ state: 'visible' });
      await locators.options(page).nth(2).click();
      await expect(locators.menu(page)).not.toBeVisible();
      await expect(locators.select(page)).toHaveAttribute('value', '2');
      await expect(locators.triggerText(page)).toHaveText(/Option 2/);
    });

    await test.step('Verify menu when option was selected by mouse and keyboard interactions', async () => {
      await locators.select(page).click();
      await locators.options(page, 'Option 2', 0).waitFor({ state: 'visible', timeout: 500 });
      await expect(locators.options(page, 'Option 2')).toHaveClass(/selected/);
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(locators.options(page, 'Option 4')).toHaveClass(/highlighted/);
      await page.keyboard.press('Enter');
      await locators.options(page, undefined, 0).waitFor({ state: 'hidden' });
      await expect(locators.select(page)).toHaveAttribute('value', '4');
      await expect(locators.triggerText(page)).toHaveText(/Option 4/);
    });
  });

  test('Verify basic usage keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify opens by space', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.select(page)).toBeFocused();
      await page.keyboard.press('Space');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Escape');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page)).toBeFocused();
    });

    await test.step('Verify 1st item highlighted when interacting by mouse and the by keyboard', async () => {
      await locators.select(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);
      await page.keyboard.press('Escape');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page)).toBeFocused();
    });

    await test.step('Verify opens by Enter', async () => {
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Escape');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page)).toBeFocused();
    });

    await test.step('Verify opens by ArrowDown', async () => {
      await page.keyboard.press('ArrowDown');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Escape');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page)).toBeFocused();
    });

    await test.step('Verify opens by ArrowUp', async () => {
      await page.keyboard.press('ArrowUp');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify Arrows navigation in menu', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowLeft');
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowDown');
      await expect(locators.options(page).nth(1)).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowUp');
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);
    });

    await test.step('Verify enter selects item and closes menu', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page)).toHaveAttribute('value', '1');
      await expect(locators.triggerText(page)).toHaveText(/Option 1/);
    });
  });

  test('Verify custom selected label', {
    tag: [TAG.PRIORITY_MEDIUM, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/custom_selected_label.tsx', 'en');

    await test.step('Verify custom label text shown on trigger', async () => {
      await locators.select(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await locators.options(page).nth(2).click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page)).toHaveAttribute('value', '2');
      await expect(locators.triggerText(page)).toHaveText(/Label 2/);
    });
  });

  test('Verify Controlled Mode mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/controlled_and_uncontrolled_modes.tsx', 'en');

    await test.step('Verify Uncontrolled not changes when selecting Controlled option', async () => {
      await locators.label(page).first().click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await locators.options(page).nth(2).click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).first()).toHaveAttribute('value', '2');
      await expect(locators.triggerText(page).first()).toHaveText(/Option 2/);
      await expect(locators.select(page).nth(1)).toHaveAttribute('value', '0');
      await expect(locators.triggerText(page).nth(1)).toHaveText(/Option 0/);
    });

    await test.step('Verify Controlled  changes when selecting Uncontrolled option', async () => {
      await locators.select(page).nth(1).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await locators.options(page).nth(5).click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).first()).toHaveAttribute('value', '5');
      await expect(locators.triggerText(page).first()).toHaveText(/Option 5/);
      await expect(locators.select(page).nth(1)).toHaveAttribute('value', '5');
      await expect(locators.triggerText(page).nth(1)).toHaveText(/Option 5/);
    });
  });

  test('Verify Controlled Mode keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/controlled_and_uncontrolled_modes.tsx', 'en');

    await test.step('Verify Uncontrolled not changes when selecting Controlled option', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.select(page).first()).toBeFocused();
      await page.keyboard.press('Space');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).first()).toHaveAttribute('value', '2');
      await expect(locators.triggerText(page).first()).toHaveText(/Option 2/);
      await expect(locators.select(page).nth(1)).toHaveAttribute('value', '0');
      await expect(locators.triggerText(page).nth(1)).toHaveText(/Option 0/);
    });

    await test.step('Verify Controlled  changes when selecting Uncontrolled option', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.select(page).nth(1)).toBeFocused();
      await page.keyboard.press('Space');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.select(page).first()).toHaveAttribute('value', '4');
      await expect(locators.triggerText(page).first()).toHaveText(/Option 4/);
      await expect(locators.select(page).nth(1)).toHaveAttribute('value', '4');
      await expect(locators.triggerText(page).nth(1)).toHaveText(/Option 4/);
    });
  });

  test('Verify keyboard interactions when select with Search', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/options_filtering.tsx', 'en');
    const inputLocaltor = await page.locator('input');
    const clear = page.locator('[data-ui-name="InputSearch.Clear"]');

    await test.step('Verify input focused when menu expanded', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(inputLocaltor).toBeFocused();
    });

    await test.step('Verify arrowLeft and Right not move focus', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(inputLocaltor).toBeFocused();
      await page.keyboard.press('ArrowLeft');
      await expect(inputLocaltor).toBeFocused();
    });

    await test.step('Verify escape closes menu', async () => {
      await page.keyboard.press('Escape');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(inputLocaltor).toHaveCount(0);
    });

    await test.step('Verify Arrow Down opens menu and input Focused', async () => {
      await page.keyboard.press('ArrowDown');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(inputLocaltor).toBeFocused();
      await page.keyboard.press('Escape');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(inputLocaltor).toHaveCount(0);
    });

    await test.step('Verify Arrow Up opens menu and input Focused', async () => {
      await page.keyboard.press('ArrowUp');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(inputLocaltor).toBeFocused();
      await page.keyboard.press('Escape');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(inputLocaltor).toHaveCount(0);
    });

    await test.step('Verify tab switch focus to input', async () => {
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(inputLocaltor).toBeFocused();
      await expect(locators.selectTrigger(page)).not.toBeFocused();
      await page.keyboard.press('ArrowUp');
    });

    await test.step('Verify option selected and menu closed', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.selectTrigger(page)).toBeFocused();
      await expect(inputLocaltor).toHaveCount(0);
      await expect(locators.selectTrigger(page)).toHaveAttribute('value', 'Pear');
      await expect(locators.triggerText(page)).toHaveText(/Pear/);
    });

    await test.step('Verify nothing found state', async () => {
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.keyboard.type('test');
      await expect(page.locator('text="Nothing found"')).toBeVisible();
      await expect(locators.options(page)).toHaveCount(0);
      await expect(clear).toBeVisible();
    });

    await test.step('Verify focus swicthes between X and input by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(clear).toBeFocused();
    });

    await test.step('Verify clear value by pressing X', async () => {
      await page.keyboard.press('Enter');
      await expect(inputLocaltor).not.toHaveValue('test');
      await expect(inputLocaltor).toBeFocused();
    });

    await test.step('Verify searched items can be selected', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Tab');
      await page.keyboard.type('appl');
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });

      await expect(locators.selectTrigger(page)).toHaveAttribute('value', 'Apple');
      await expect(locators.triggerText(page)).toHaveText(/Apple/);
    });
  });

  test('Verify mouse interactions when select with Search', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/options_filtering.tsx', 'en');
    const inputLocaltor = await page.locator('input');
    const clear = page.locator('[data-ui-name="InputSearch.Clear"]');

    await test.step('Verify input focused when menu expanded', async () => {
      await locators.selectTrigger(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(inputLocaltor).toBeFocused();
    });

    await test.step('Verify closed by click on label', async () => {
      await locators.label(page).click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(inputLocaltor).toHaveCount(0);
    });

    await test.step('Verify closed by click on trigger', async () => {
      await locators.selectTrigger(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(inputLocaltor).toBeFocused();
      await locators.selectTrigger(page).click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(inputLocaltor).toHaveCount(0);
    });

    await test.step('Verify nothing found state', async () => {
      await locators.label(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.keyboard.type('test');
      await expect(page.locator('text="Nothing found"')).toBeVisible();
      await expect(locators.options(page)).toHaveCount(0);
      await expect(clear).toBeVisible();
    });

    await test.step('Verify clear value by pressing X', async () => {
      await expect(inputLocaltor).toHaveValue('test');
      await clear.click();
      await expect(inputLocaltor).not.toHaveValue('test');
    });

    await test.step('Verify searched items can be selected', async () => {
      await page.keyboard.type('appl');
      await locators.options(page).first().click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.selectTrigger(page)).toHaveAttribute('value', 'Apple');
      await expect(locators.triggerText(page)).toHaveText(/Apple/);
    });
  });

  test('Verify advances filtering control custom behavior', {
    tag: [TAG.PRIORITY_MEDIUM, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/advanced_filtering_control.tsx', 'en');

    await test.step('Verify searched items can be selected and shown', async () => {
      await locators.label(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.keyboard.type('appl');
      await locators.options(page).first().click();
      await locators.options(page).first().waitFor({ state: 'hidden' });

      await expect(locators.selectTrigger(page)).toHaveAttribute('value', 'Apple');
      await expect(locators.triggerText(page)).toHaveText(/Apple/);
    });
  });

  const interactionVariables = [
    { interaction: 'hover' },
    { interaction: 'focus' },
    { interaction: 'click' },
  ];

  interactionVariables.forEach((item) => {
    test(`Verify select with interaction = ${item.interaction}`, {
      tag: [TAG.PRIORITY_HIGH, '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/select/tests/examples/basic_props_and_trigger_addons.tsx', 'en', item);

      await test.step('Verify menu interaction by tab', async () => {
        await page.keyboard.press('Tab');
        if (item.interaction !== 'click') {
          await expect(locators.options(page).first()).toBeVisible(); // expands when interaction is focus
          await page.keyboard.press('Escape');
          await expect(locators.options(page).first()).not.toBeVisible();
        } else {
          await expect(locators.options(page).first()).not.toBeVisible(); // not expands when interaction is hover or click
        }
      });

      await test.step('Verify menu interaction by hover', async () => {
        await locators.selectTrigger(page).hover();
        if (item.interaction === 'hover') {
          await expect(locators.options(page).first()).toBeVisible(); // expands when interaction is hover
          await page.mouse.move(0, 0);
          await expect(locators.options(page).first()).not.toBeVisible();
        } else {
          await expect(locators.options(page).first()).not.toBeVisible(); // not expands when interaction is focus or click
        }
      });

      await test.step('Verify menu interaction by click', async () => {
        await locators.selectTrigger(page).click();
        await expect(locators.options(page).first()).toBeVisible(); // always expands on click

        if (item.interaction === 'hover') {
          await page.mouse.move(0, 0);
          await expect(locators.options(page).first()).not.toBeVisible(); // closes on mouse leave when interaction is hover
        } else {
          await page.mouse.move(0, 0);
          await expect(locators.options(page).first()).toBeVisible(); // stays open on mouse leave when interaction is focus or click
          await page.keyboard.press('Escape');
          await expect(locators.options(page).first()).not.toBeVisible();
        }
      });
    });
  });

  test('Verify that select could be focused programmatically', {
    tag: [TAG.PRIORITY_MEDIUM, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/tests/examples/programmatically_focus.tsx', 'en');
    await locators.button(page, 'Set focus').click();
    await expect(locators.selectTrigger(page)).toBeFocused();
  });
});
