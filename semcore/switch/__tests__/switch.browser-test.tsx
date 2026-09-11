import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  value: (page: Page) => page.locator('[data-ui-name="Switch.Value"]'),
  addon: (page: Page) => page.locator('[data-ui-name="Switch.Addon"]'),

};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variables = [
    { size: 'm', theme: 'info', checked: false, defaultChecked: undefined },
    { size: 'l', theme: 'success', checked: false, defaultChecked: undefined },
    { size: 'xl', theme: 'dark-violet', checked: false, defaultChecked: undefined },
    { size: 'm', theme: 'info', checked: true, defaultChecked: undefined },
    { size: 'l', theme: 'success', checked: undefined, defaultChecked: true },
    { size: 'xl', theme: 'dark-violet', checked: true, defaultChecked: undefined },

  ];
  variables.forEach((item) => {
    test(`Verify active Switch with size= ${item.size} theme= ${item.theme} and checked = ${item.checked} and defaultChecked = ${item.defaultChecked} `, {
      tag: [TAG.PRIORITY_HIGH,
        '@switch'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/switch/docs/examples/basic_example.tsx', 'en', item);

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      const switch1 = page.locator('[data-ui-name="Box"]');
      await expect(switch1.first()).toHaveCSS('margin-right', '8px');
    });
  });

  const variablesDisabled = [
    { size: 'm', theme: 'info', checked: false, defaultChecked: undefined, disabled: true },
    { size: 'l', theme: 'success', checked: false, defaultChecked: undefined, disabled: true },
    { size: 'xl', theme: 'dark-violet', checked: false, defaultChecked: undefined, disabled: true },
    { size: 'm', theme: 'info', checked: true, defaultChecked: undefined, disabled: true },
    { size: 'l', theme: 'success', checked: undefined, defaultChecked: true, disabled: true },
    { size: 'xl', theme: 'dark-violet', checked: true, defaultChecked: undefined, disabled: true },

  ];
  variablesDisabled.forEach((item) => {
    test(`Verify Disabled Switch with size= ${item.size} theme= ${item.theme} and checked = ${item.checked} and defaultChecked = ${item.defaultChecked} `, {
      tag: [TAG.PRIORITY_HIGH,
        '@switch'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/switch/docs/examples/basic_example.tsx', 'en', item);
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesActiveWithIcon = [
    { size: 'l', theme: 'success', disabled: false },
    { size: 'xl', theme: 'info', disabled: false },
    { size: 'xl', theme: 'dark-violet', disabled: false },

  ];
  variablesActiveWithIcon.forEach((item) => {
    test(`Verify Active with icons  with size= ${item.size} theme= ${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@switch'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/switch/docs/examples/basic_example_with_icon.tsx', 'en', item);

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesDisabledWithIcon = [
    { size: 'l', theme: 'success', disabled: true },
    { size: 'xl', theme: 'info', disabled: true },
  ];
  variablesDisabledWithIcon.forEach((item) => {
    test(`Verify Disabled with icons  with size= ${item.size} theme= ${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@switch'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/switch/docs/examples/basic_example_with_icon.tsx', 'en', item);

      await expect(page).toHaveScreenshot();
    });
  });

  const variablesLongTextActive = [
    { size: 'm', theme: 'success', disabled: false },
    { size: 'l', theme: 'blanchedalmond', disabled: false },
    { size: 'xl', theme: 'info', disabled: false },
  ];
  variablesLongTextActive.forEach((item) => {
    test(`Verify Active with long text with size= ${item.size} theme= ${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@switch'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/switch/tests/examples/long-text-addon.tsx', 'en', item);

      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesLongTextDisabled = [
    { size: 'm', theme: 'success', disabled: true, checked: false },
    { size: 'l', theme: 'blanchedalmond', disabled: true, checked: true },
    { size: 'xl', theme: 'info', disabled: true, checked: true },
  ];
  variablesLongTextDisabled.forEach((item) => {
    test(`Verify Disabled with long text with size= ${item.size} theme= ${item.theme}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@switch'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/switch/tests/examples/long-text-addon.tsx', 'en', item);
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom addon', {
    tag: [TAG.PRIORITY_HIGH,
      '@switch'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/switch/tests/examples/custom-icon-on-toggle.tsx', 'en');

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify basic switch changes state by mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@switch'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/switch/docs/examples/basic_example.tsx', 'en');

    await test.step('Verify changes state by click on the toggle', async () => {
      await expect(locators.value(page)).toHaveAttribute('type', 'checkbox');
      await expect(locators.value(page)).toHaveAttribute('role', 'switch');
      await expect(locators.value(page)).toHaveAttribute('checked');
      await expect(locators.value(page)).toBeChecked();

      await page.locator('[data-ui-name="Box"]').first().click();
      await expect(locators.value(page)).not.toBeChecked();
    });

    await test.step('Verify changes state by click on the addon', async () => {
      await locators.addon(page).click();
      await expect(locators.value(page)).toBeChecked();
    });
  });

  test('Verify basic switch changes state by keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@switch'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/switch/docs/examples/basic_example.tsx', 'en');

    await test.step('Verify changes state by Space', async () => {
      await expect(locators.value(page)).toBeChecked();
      await page.keyboard.press('Tab');
      await expect(locators.value(page)).toBeFocused();
      await page.keyboard.press('Space');
      await expect(locators.value(page)).not.toBeChecked();
    });

    await test.step('Verify changes state by Enter', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.value(page)).toBeFocused();
      await expect(locators.value(page)).toBeChecked();
    });

    await test.step('Verify not changes state by Arrows and ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.value(page)).toBeFocused();
      await expect(locators.value(page)).toBeChecked();
      await page.keyboard.press('ArrowUp');
      await expect(locators.value(page)).toBeFocused();
      await expect(locators.value(page)).toBeChecked();
    });
  });

  test('Verify switch with external label changes state by mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@switch',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/switch/docs/examples/external_label.tsx', 'en');

    await test.step('Verify changes state by click on the toggle', async () => {
      await expect(locators.value(page)).toBeChecked();
      await page.locator('[data-ui-name="Box"]').first().click();
      await expect(locators.value(page)).not.toBeChecked();
    });

    await test.step('Verify changes state by click on the addon', async () => {
      await page.locator('[data-ui-name="Text"]').click();
      await expect(locators.value(page)).toBeChecked();
    });
  });
});
