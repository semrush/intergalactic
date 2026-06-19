import { platform } from 'os';

import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  menuItems: (page: Page, index?: number) => {
    const base = page.getByRole('menuitemcheckbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  inlineInput: (page: Page) => page.locator('[data-ui-name="InlineInput"]'),
  addon: (page: Page) => page.locator('[data-ui-name="InlineInput.Addon"]'),
  value: (page: Page) => page.locator('[data-ui-name="InlineInput.Value"]'),
  valueNumber: (page: Page) => page.locator('[data-ui-name="InlineInput.NumberValue"]'),

};

// Matches the CSS fallback colors after the test bundle normalizes them.
const cssVarColorFallbacks: Record<string, string> = {
  '--intergalactic-bg-primary-neutral': 'oklch(1 0 0)',
};

const getCssVarColor = async (page: Page, varName: string) => {
  return page.evaluate(({ name, fallback }) => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = fallback ? `var(${name}, ${fallback})` : `var(${name})`;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  }, { name: varName, fallback: cssVarColorFallbacks[varName] });
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesActive = [
    { disabled: false, loading: false, state: 'normal', defaultValue: 'Joe John', placeholder: 'Placeholder' },
    { disabled: false, loading: false, state: 'valid', defaultValue: null, placeholder: 'Placeholder' },
    { disabled: false, loading: false, state: 'invalid', defaultValue: 'Joe John', placeholder: null },
  ];
  variablesActive.forEach((item) => {
    test(`Verify active state=${item.state}  default-value = ${item.defaultValue} placeholder = ${item.placeholder} styles and focus`, {
      tag: [TAG.PRIORITY_HIGH,
        '@inline-input',
        '@input-number'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/inline-input/tests/examples/styles.tsx', 'en', item);

      const flex = page.locator('[data-testid="default"]');
      const value = flex.locator('[data-ui-name="InlineInput.Value"]');
      const confirm = flex.locator('[data-ui-name="InlineInput.ConfirmControl"]');
      const cancel = flex.locator('[data-ui-name="InlineInput.CancelControl"]');

      await expect(value.first()).toHaveCSS('padding', '0px 4px');
      await expect(confirm.first()).toHaveCSS('padding', '0px 4px');
      await expect(cancel.first()).toHaveCSS('padding', '0px 4px');

      await expect(page).toHaveScreenshot();
    });
  });

  const variablesDisabled = [
    { disabled: true, loading: false, state: 'normal', defaultValue: 'Joe John', placeholder: 'Placeholder' },
    { disabled: true, loading: false, state: 'valid', defaultValue: null, placeholder: 'Placeholder' },
    { disabled: true, loading: false, state: 'invalid', defaultValue: 'Joe John', placeholder: null },
  ];
  variablesDisabled.forEach((item) => {
    test(`Verify disabled state=${item.state}  default-value = ${item.defaultValue} placeholder = ${item.placeholder} styles and focus`, {
      tag: [TAG.PRIORITY_HIGH,
        '@inline-input',
        '@input-number'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/inline-input/tests/examples/styles.tsx', 'en', item);

      const flex = page.locator('[data-testid="addons"]');
      const value = flex.locator('[data-ui-name="InlineInput.Value"]');
      const confirm = flex.locator('[data-ui-name="InlineInput.ConfirmControl"]');
      const cancel = flex.locator('[data-ui-name="InlineInput.CancelControl"]');
      const addon = flex.locator('[data-ui-name="InlineInput.Addon"]');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await expect(value.first()).toHaveCSS('padding', '0px 4px');
      await expect(confirm.first()).toHaveCSS('padding', '0px 4px');
      await expect(cancel.first()).toHaveCSS('padding', '0px 4px');
      await expect(addon.first()).toHaveCSS('padding', '0px 4px');
    });
  });

  const variablesLoading = [
    { disabled: false, loading: true, state: 'normal', defaultValue: 'Joe John', placeholder: 'Placeholder' },
    { disabled: false, loading: true, state: 'valid', defaultValue: null, placeholder: 'Placeholder' },
    { disabled: false, loading: true, state: 'invalid', defaultValue: 'Joe John', placeholder: null },
  ];
  variablesLoading.forEach((item) => {
    test(`Verify loading state=${item.state}  default-value = ${item.defaultValue} placeholder = ${item.placeholder} styles and focus`, {
      tag: [TAG.PRIORITY_HIGH,
        '@inline-input',
        '@input-number'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/inline-input/tests/examples/styles.tsx', 'en', item);
      const bgPrimary = await getCssVarColor(page, '--intergalactic-bg-primary-neutral');

      const flex = await page.locator('[data-testid="no-controls"]');
      const value = flex.locator('[data-ui-name="InlineInput.Value"]');
      const input = flex.locator('[data-ui-name="InlineInput"]');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await expect(value.first()).toHaveCSS('padding', '0px 4px');
      await expect(input.first()).toHaveCSS('align-items', 'center');
      await expect(input.first()).toHaveCSS('vertical-align', 'middle');
      await expect(input.first()).toHaveCSS('padding', '1px');
      await expect(input.first()).toHaveCSS('background-color', bgPrimary);
    });
  });

  test('Verify custom icon and text', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/tests/examples/with-custom-text.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.waitForSelector('text="For love"');
    await expect(page).toHaveScreenshot();

    await page.locator('[data-ui-name="InlineInput.CancelControl"]').hover();
    await page.waitForSelector('text="DRAIN THE SWAMP!"');

    await expect(page).toHaveScreenshot();
  });

  test('Verify Basic usage mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/basic_usage.tsx', 'en');

    const inlineInput = page.locator('[data-ui-name="InlineInput"]');
    const addon = page.locator('[data-ui-name="InlineInput.Addon"]');
    const value = page.locator('[data-ui-name="InlineInput.Value"]');

    const save = inlineInput.locator('[data-ui-name="InlineInput.ConfirmControl"]');

    await test.step('Verify Hint shown on Hover and Focus is on Input', async () => {
      await expect(value).toHaveAttribute('value', 'John Doe');

      await addon.click();
      await save.hover();
      await page.waitForSelector('text="Save"');

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Basic usage keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/basic_usage.tsx', 'en');

    const inlineInput = page.locator('[data-ui-name="InlineInput"]');
    const addon = page.locator('[data-ui-name="InlineInput.Addon"]');
    const value = page.locator('[data-ui-name="InlineInput.Value"]');

    const save = inlineInput.getByLabel('Save');
    const cancel = inlineInput.getByLabel('Cancel');

    await test.step('Verify input focues when pressing Tab', async () => {
      await expect(value).toHaveAttribute('value', 'John Doe');

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify addons focused and Hint shown when pressing Tab', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Save"');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Inheriting text size', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@inline-input',
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/inheriting_text_size.tsx', 'en');

    const inlineEditView = page.locator('[data-ui-name="InlineEdit.View"]');
    const value = page.locator('[data-ui-name="InlineInput.Value"]');
    const spinLocator = page.locator('[data-ui-name="Spin"]');

    await test.step('Verify view when activating inline input', async () => {
      await expect(locators.inlineInput(page)).toHaveCount(0);
      await inlineEditView.click();
      await expect(value).toBeFocused();
      await expect(locators.inlineInput(page)).toHaveCount(1);

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.type('Once upon a time in a distant galaxy far, far away, there existed a legendary creature known as the Intergalactic Whale.');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify size changes according to entered content', async () => {
      await page.keyboard.press('Enter');
      await expect(value).not.toBeFocused();
      await expect(spinLocator).toBeVisible({ timeout: 1500 });
      await inlineEditView.click();

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Number-only input keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@inline-input',
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/number-only_input.tsx', 'en');

    const value = page.locator('[data-ui-name="InlineInput.NumberValue"]');

    const save = locators.inlineInput(page).getByLabel('Save');

    await test.step('Verify input focues when pressing Tab and hint shown on Hover', async () => {
      await expect(value).toHaveAttribute('value', '100');
      await page.keyboard.press('Tab');
      await save.hover();
      await page.waitForSelector('text="Save"');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify addons focused when pressing Tab', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Save"');
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
  test('Verify onBlurBehavior by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/tests/examples/on-blur-behavior-test.tsx', 'en');

    const confirm = page.locator('[data-testid="onBlurBehavior-confirm"]');
    const cancel = page.locator('[data-testid="onBlurBehavior-cancel"]');
    const none = page.locator('[data-testid="onBlurBehavior-none"]');

    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });

    await test.step('Verify onBlurBehavior-confirm', async () => {
      await confirm.click();
      await cancel.click();
      await page.waitForTimeout(100);

      const confirmLogs = logs.filter((log) => log.includes('Confirm'));
      expect(confirmLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });

    await test.step('Verify onBlurBehavior-cancel', async () => {
      await confirm.click();

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });

    await test.step('Verify onBlurBehavior-none', async () => {
      await none.click();
      await confirm.click();

      await page.waitForTimeout(100);

      const confirmLogs = logs.filter((log) => log.includes('Confirm'));
      expect(confirmLogs.length).toBe(2);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });
  });

  test('Verify onBlurBehavior by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/tests/examples/on-blur-behavior-test.tsx', 'en');

    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });

    await test.step('Verify onBlurBehavior-cancel', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });

    await test.step('Verify onBlurBehavior-confirm', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.waitForTimeout(100);

      const confirmLogs = logs.filter((log) => log.includes('Confirm'));
      expect(confirmLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });

    await test.step('Verify onBlurBehavior-none', async () => {
      await page.keyboard.press('Shift+Tab');

      await page.waitForTimeout(100);

      const confirmLogs = logs.filter((log) => log.includes('Confirm'));
      expect(confirmLogs.length).toBe(1);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });
  });

  test('Verify Confirm and Cancel and onChange activate by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/tests/examples/on-blur-behavior-test.tsx', 'en');

    const confirm = page.locator('[data-testid="onBlurBehavior-confirm"]');
    const save = confirm.locator('[data-ui-name="InlineInput.ConfirmControl"]');
    const cancel = confirm.locator('[data-ui-name="InlineInput.CancelControl"]');

    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });

    await test.step('Verify onChange activates when entering new', async () => {
      await confirm.click();

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.type('Test');

      await page.waitForTimeout(100);

      const onCahngeLogs = logs.filter((log) => log.includes('Change'));
      expect(onCahngeLogs.length).toBe(4);
    });

    await test.step('Verify event sent on Save', async () => {
      await save.click();

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Confirm'));
      expect(cancelLogs.length).toBe(1);
    });

    await test.step('Verify event sent on Save', async () => {
      await cancel.click();

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);
    });
  });

  test('Verify Confirm and Cancel and onChange activate by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/tests/examples/on-blur-behavior-test.tsx', 'en');

    const confirm = page.locator('[data-testid="onBlurBehavior-confirm"]');

    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });

    await test.step('Verify onChange activates when removinf data', async () => {
      await page.keyboard.press('Tab');

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.press('Backspace');

      await page.waitForTimeout(100);

      const onCahngeLogs = logs.filter((log) => log.includes('Change'));
      expect(onCahngeLogs.length).toBe(1);
    });

    await test.step('Verify onChange activates when entering data', async () => {
      await page.keyboard.type('Test');

      await page.waitForTimeout(100);

      const onCahngeLogs = logs.filter((log) => log.includes('Change'));
      expect(onCahngeLogs.length).toBe(5);
    });

    await test.step('Verify event sent on Enter', async () => {
      await page.keyboard.press('Enter');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Confirm'));
      expect(cancelLogs.length).toBe(1);
    });

    await test.step('Verify event sent on Escape', async () => {
      await page.keyboard.press('Escape');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Confirm'));
      expect(cancelLogs.length).toBe(1);
    });

    await test.step('Verify event sent on Save', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Confirm'));
      expect(cancelLogs.length).toBe(2);
    });

    await test.step('Verify event sent on Cancel', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(2);
    });
  });

  test('Verify Basic usage mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/basic_usage.tsx', 'en');

    const save = locators.inlineInput(page).locator('[data-ui-name="InlineInput.ConfirmControl"]');

    await test.step('Verify input focuses when clicking on addon', async () => {
      await expect(locators.value(page)).toHaveAttribute('value', 'John Doe');
      await locators.addon(page).click();
      await expect(locators.value(page)).toBeFocused();
    });

    await test.step('Verify focuse removes when clicking on button', async () => {
      await save.click();
      await expect(locators.value(page)).not.toBeFocused();
    });

    await test.step('Verify focused when clicking on value', async () => {
      await locators.value(page).click();
      await expect(locators.value(page)).toBeFocused();

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.type('Test');
      await expect(locators.value(page)).toHaveAttribute('value', 'Test');
    });
  });

  test('Verify Basic usage keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/basic_usage.tsx', 'en');

    const save = locators.inlineInput(page).getByLabel('Save');
    const cancel = locators.inlineInput(page).getByLabel('Cancel');

    await test.step('Verify input focues when pressing Tab', async () => {
      await expect(locators.value(page)).toHaveAttribute('value', 'John Doe');

      await page.keyboard.press('Tab');
      await expect(locators.value(page)).toBeFocused();
    });

    await test.step('Verify stay focused when clicking on Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.value(page)).toBeFocused();
    });

    await test.step('Verify stay focused when clicking on Arrows', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.value(page)).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await expect(locators.value(page)).toBeFocused();
    });

    await test.step('Verify entering value', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.type('Test');
      await expect(locators.value(page)).toHaveAttribute('value', ' TestJohn Doe');
    });

    await test.step('Verify addons focused when pressing Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.value(page)).not.toBeFocused();
      await expect(save).toBeFocused();
      await page.waitForSelector('text="Save"');
      await page.keyboard.press('Tab');
      await expect(locators.value(page)).not.toBeFocused();
      await expect(save).not.toBeFocused();
      await expect(cancel).toBeFocused();
      await page.waitForSelector('text="Cancel"');

      await page.keyboard.press('Shift+Tab');
      await page.waitForSelector('text="Save"');
      await save.hover();
      await expect(locators.value(page)).not.toBeFocused();
      await expect(save).toBeFocused();
    });
  });

  test('Verify Number-only input mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@inline-input',
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/number-only_input.tsx', 'en');

    const save = locators.inlineInput(page).locator('[data-ui-name="InlineInput.ConfirmControl"]');
    const increment = page.locator('[aria-label="increment"]');
    const decrement = page.locator('[aria-label="decrement"]');

    await test.step('Verify input focues when clicking on addon', async () => {
      await expect(locators.valueNumber(page)).toHaveAttribute('value', '100');
      await locators.addon(page).click();
      await expect(locators.valueNumber(page)).toBeFocused();
    });

    await test.step('Verify focus moved when clicking on button', async () => {
      await save.click();
      await expect(locators.valueNumber(page)).not.toBeFocused();
    });

    await test.step('Verify focused when clicking on value and impossible to enter text', async () => {
      await locators.valueNumber(page).click();
      await expect(locators.valueNumber(page)).toBeFocused();

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.type('Test');
      await expect(locators.valueNumber(page)).toHaveAttribute('value', '100');
    });

    await test.step('Verify input number attributes', async () => {
      await expect(locators.valueNumber(page)).toHaveAttribute('type', 'text');
      await expect(locators.valueNumber(page)).toHaveAttribute('autocomplete', 'off');
      await expect(locators.valueNumber(page)).toHaveAttribute('inputmode', 'numeric');
      await expect(locators.valueNumber(page)).toHaveAttribute('step', '1');
    });

    await test.step('Verify value changes when clicking on controls', async () => {
      await save.click();

      await increment.click();
      await expect(locators.valueNumber(page)).toBeFocused();

      await increment.click();
      await increment.click();
      await expect(locators.valueNumber(page)).toHaveAttribute('value', '103');

      await decrement.click();
      await expect(locators.valueNumber(page)).toHaveAttribute('value', '102');
    });
  });

  test('Verify Number-only input keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@inline-input',
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/number-only_input.tsx', 'en');

    const save = locators.inlineInput(page).getByLabel('Save');

    await test.step('Verify input focues when pressing Tab', async () => {
      await expect(locators.valueNumber(page)).toHaveAttribute('value', '100');

      await page.keyboard.press('Tab');
      await expect(locators.valueNumber(page)).toBeFocused();
    });

    await test.step('Verify focused when clicking on Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.valueNumber(page)).toBeFocused();
    });

    await test.step('Verify value and focus when clicking on Arrows', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.valueNumber(page)).toHaveAttribute('value', '100');
      await expect(locators.valueNumber(page)).toBeFocused();
      await page.keyboard.press('ArrowLeft');
      await expect(locators.valueNumber(page)).toHaveAttribute('value', '100');
      await expect(locators.valueNumber(page)).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(locators.valueNumber(page)).toBeFocused();
      await expect(locators.valueNumber(page)).toHaveAttribute('value', '103');
      await page.keyboard.press('ArrowDown');
      await expect(locators.valueNumber(page)).toBeFocused();
      await expect(locators.valueNumber(page)).toHaveAttribute('value', '102');
    });

    await test.step('Verify addons focused when pressing Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.valueNumber(page)).not.toBeFocused();
      await expect(save).toBeFocused();
      await page.waitForSelector('text="Save"');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.valueNumber(page)).toBeFocused();
    });
  });

  test('Verify that elements are focusable when disabled = false', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/basic_usage.tsx', 'en');

    const input = page.locator('[data-ui-name="InlineInput.Value"]');
    const confirmControl = page.locator('[data-ui-name="InlineInput.ConfirmControl"] button');
    const cancelControl = page.locator('[data-ui-name="InlineInput.CancelControl"] button');

    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();
    await expect(confirmControl).not.toBeFocused();
    await expect(cancelControl).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(input).not.toBeFocused();
    await expect(confirmControl).toBeFocused();
    await expect(cancelControl).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(input).not.toBeFocused();
    await expect(confirmControl).not.toBeFocused();
    await expect(cancelControl).toBeFocused();
  });

  test('Verify that elements aren\'t focusable when disabled = true', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@inline-input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/basic_usage.tsx', 'en', { disabled: true });

    const input = page.locator('[data-ui-name="InlineInput.Value"]');
    const confirmControl = page.locator('[data-ui-name="InlineInput.ConfirmControl"] button');
    const cancelControl = page.locator('[data-ui-name="InlineInput.CancelControl"] button');

    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Tab');
      await expect(input).not.toBeFocused();
      await expect(confirmControl).not.toBeFocused();
      await expect(cancelControl).not.toBeFocused();
    }

    await input.click({ force: true });
    await expect(input).not.toBeFocused();
  });
});
