import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { checkBorderColor, locators } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    { size: 'm', active: false, empty: false, placeholder: 'Placeholder', disabled: false },
    { size: 'l', active: true, empty: false, placeholder: undefined, disabled: false },

    // Disabled
    { size: 'l', active: true, empty: false, placeholder: 'Placeholder', disabled: true },
    { size: 'm', active: false, empty: false, placeholder: undefined, disabled: true },

  ];

  variables.forEach((item) => {
    test(`Verify Base case size=${item.size} disabled=${item.disabled} active=${item.active} empty=${item.empty} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger',
        '@filter-trigger',
        '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/filter-trigger/base.tsx', 'en', item);

      const buttons = await locators.button(page).all();
      if (!item.disabled) {
        await test.step('Normal/Active styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(0, 109, 202)');
            await expect(button).toHaveAttribute('tabindex', '0');
          }

          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
          }
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }
    });

    test(`Verify With addons case size=${item.size} disabled=${item.disabled}  active=${item.active} empty=${item.empty} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger',
        '@filter-trigger',
        '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/filter-trigger/with-addons.tsx', 'en', item);

      const buttons = await locators.button(page).all();
      if (!item.disabled) {
        await test.step('Normal/Active styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(0, 109, 202)');
            await expect(button).toHaveAttribute('tabindex', '0');
          }

          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`with-addonssize:${item.size}-disabled:${item.disabled}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
          }
          await expect(page).toHaveScreenshot(`with-addonssize:${item.size}-disabled:${item.disabled}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }
    });

    test(`Verify Filter Trigger for Select size=${item.size} disabled=${item.disabled}  active=${item.active} empty=${item.empty} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger',
        '@filter-trigger',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/filter-trigger/select.tsx', 'en', item);

      const buttons = await locators.trigger(page);
      if (!item.disabled) {
        await test.step('Normal/Active styles', async () => {
          if (!item.active) {
            await checkBorderColor(page, buttons.nth(0), 'rgb(196, 199, 207)');
          }

          if (item.active) {
            await checkBorderColor(page, buttons.nth(0), 'rgb(0, 109, 202)');
          }

          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`select-size:${item.size}-disabled:${item.disabled}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          await expect(buttons.nth(0)).toHaveAttribute('tabindex', '0');
          await expect(page).toHaveScreenshot(`select-size:${item.size}-disabled:${item.disabled}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }
    });
  });

  test('Verify ellipsis in Filter trigger and few tags', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-trigger',
      '@filter-trigger',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/advanced/examples/filter-trigger-ellipsis.tsx', 'en');
    await page.waitForTimeout(200);

    await locators.trigger(page).nth(1).hover();
    await page.locator(`[data-ui-name="Hint"]`).waitFor({ state: 'visible' });
    await page.waitForFunction(
      () => {
        const el = document.querySelector('[data-ui-name="Hint"]');
        return el && getComputedStyle(el).opacity === '1';
      },
    );
    await expect(page).toHaveScreenshot();
  });

  test('Verify Counter on trigger', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-trigger',
      '@filter-trigger',
      '@dropdown',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/advanced/examples/filter-trigger_with_counter.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.dialog(page).waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Enter');
    }
    await page.keyboard.press('Escape');
    await locators.dialog(page).waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Hint on Close button', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-trigger',
      '@filter-trigger',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/tests/examples/filter-trigger/base.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await locators.hint(page).waitFor({ state: 'visible' });
    await page.waitForFunction(
      () => {
        const el = document.querySelector('[data-ui-name="Hint"]');
        return el && getComputedStyle(el).opacity === '1';
      },
    );
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(locators.hint(page)).toHaveCount(1);
    await expect(locators.hint(page)).toHaveText('Clear text');
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Filter Trigger with select', () => {
    test('Verify Filter Triger for select by keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@base-trigger',
        '@filter-trigger',
        '@select',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/docs/filter-trigger/examples/usage_with_select.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');

      await locators.options(page, 'Blue').waitFor({ state: 'visible' });
      await expect(locators.options(page, 'Blue')).toHaveClass(/highlighted/);
      await page.keyboard.press('Escape');
      await locators.options(page, 'Blue').waitFor({ state: 'hidden' });

      await expect(page.getByLabel('Color')).toBeFocused();
      await page.keyboard.press('Space');
      await locators.options(page, 'Blue').waitFor({ state: 'visible' });

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await locators.options(page, 'Blue').waitFor({ state: 'hidden' });

      await expect(locators.trigger(page)).toHaveAttribute('value', 'Green');
      await expect(locators.trigger(page)).toBeFocused();

      await expect(locators.clearButton(page)).toBeVisible();
      await expect(locators.clearButton(page)).not.toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.clearButton(page)).toBeFocused();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      await page.keyboard.press('Enter');
      await expect(locators.clearButton(page)).not.toBeVisible();

      await expect(locators.trigger(page)).toBeFocused();
    });

    test('Verify Filter Triger for select by mouse AND keyboards interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@base-trigger',
        '@filter-trigger',
        '@select',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/docs/filter-trigger/examples/usage_with_select.tsx', 'en');

      locators.trigger(page).click();
      await locators.options(page, 'Blue').waitFor({ state: 'visible' });

      await expect(locators.options(page, 'Blue')).not.toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(locators.options(page, 'Gray')).toHaveClass(/highlighted/);

      await page.keyboard.press('Enter');
      await locators.options(page, 'Blue').waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveAttribute('value', 'Gray');

      await expect(locators.clearButton(page)).toBeVisible();
      await expect(locators.clearButton(page)).not.toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.clearButton(page)).toBeFocused();
    });

    test('Verify Filter Triger for select by mouse interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@base-trigger',
        '@filter-trigger',
        '@select',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/docs/filter-trigger/examples/usage_with_select.tsx', 'en');
      locators.trigger(page).click();

      await locators.options(page, 'Blue').waitFor({ state: 'visible' });
      await expect(locators.options(page, 'Blue')).not.toHaveClass(/highlighted/);
      locators.trigger(page).click();
      await locators.options(page, 'Blue').waitFor({ state: 'hidden' });

      locators.trigger(page).click();
      await locators.options(page, 'Blue').waitFor({ state: 'visible' });

      await locators.options(page, 'Green').click();
      await locators.options(page, 'Green').waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveAttribute('value', 'Green');

      await expect(locators.clearButton(page)).toBeVisible();
      await expect(locators.clearButton(page)).not.toBeFocused();

      await locators.clearButton(page).click();

      await expect(locators.clearButton(page)).not.toBeVisible();
      await expect(locators.trigger(page)).not.toHaveAttribute('value', 'Green');
    });
  });

  test.describe('Controlled filter trigger (triggerRef)', () => {
    test('Verify keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@base-trigger',
        '@filter-trigger',
        '@select',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/docs/filter-trigger/examples/programmatic_focus.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await locators.options(page, 'Option 0').waitFor({ state: 'visible' });
      await expect(locators.options(page, 'Option 0')).toHaveClass(/highlighted/);
      await page.keyboard.press('Escape');
      await locators.options(page, 'Option 0').waitFor({ state: 'hidden' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.options(page, 'Option 0').waitFor({ state: 'visible' });

      await page.keyboard.press('Space');
      await locators.options(page, 'Option 0').waitFor({ state: 'hidden' });

      await expect(locators.trigger(page)).toHaveAttribute('value', 'Option 0');
      await expect(locators.trigger(page)).toBeFocused();

      await expect(locators.clearButton(page)).toBeVisible();
      await expect(locators.clearButton(page)).not.toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.clearButton(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.clearButton(page)).not.toBeVisible();
      await expect(locators.trigger(page)).toBeFocused();
    });

    test('Verify mouse interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@base-trigger',
        '@filter-trigger',
        '@select',
        '@button',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/docs/filter-trigger/examples/programmatic_focus.tsx', 'en');

      const button = page.getByRole('button', { name: 'Focus the filter trigger' });
      await button.click();

      await locators.options(page, 'Option 0').waitFor({ state: 'visible' });

      await expect(locators.options(page, 'Option 0')).not.toHaveClass(/highlighted/);
      await button.click();
      await locators.options(page, 'Option 0').waitFor({ state: 'hidden' });

      await button.click();
      await locators.options(page, 'Option 0').waitFor({ state: 'visible' });

      await locators.trigger(page).click();
      await locators.options(page, 'Option 0').waitFor({ state: 'hidden' });

      await button.click();
      await locators.options(page, 'Option 0').waitFor({ state: 'visible' });
      await locators.options(page, 'Option 3').click();
      await locators.options(page, 'Option 0').waitFor({ state: 'hidden' });

      await expect(locators.trigger(page)).toHaveAttribute('value', 'Option 3');

      await expect(locators.clearButton(page)).toBeVisible();
      await expect(locators.clearButton(page)).not.toBeFocused();

      await locators.clearButton(page).click();

      await expect(locators.clearButton(page)).not.toBeVisible();
      await expect(locators.trigger(page)).not.toHaveAttribute('value', 'Option 3');
    });
  });

  test.describe('Counter and On-Clear', () => {
    test('Verify focus and keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@dropdown'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/advanced/examples/filter-trigger_with_counter.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Enter');
      }
      await expect(page.locator('[data-ui-name="FilterTrigger.Counter"]')).toHaveText('10');
      await page.keyboard.press('Escape');
      await locators.dialog(page).waitFor({ state: 'hidden' });

      await expect(locators.trigger(page)).toBeFocused();
      await expect(locators.clearButton(page)).toBeVisible();
      await expect(locators.clearButton(page)).not.toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.clearButton(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.clearButton(page)).not.toBeVisible();
      await expect(locators.trigger(page)).toBeFocused();
      await expect(page.locator('[data-ui-name="FilterTrigger.Counter"]')).not.toBeVisible();
    });

    test('Verify mouse interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@dropdown'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/advanced/examples/filter-trigger_with_counter.tsx', 'en');

      const addFilter = page.getByRole('button', { name: 'Add a filter' });
      await locators.trigger(page).click();
      await locators.dialog(page).waitFor({ state: 'visible' });

      for (let i = 0; i < 10; i++) {
        await addFilter.click();
      }
      await expect(page.locator('[data-ui-name="FilterTrigger.Counter"]')).toHaveText('10');
      await locators.trigger(page).click();

      await expect(locators.trigger(page)).toBeVisible();
      await expect(locators.clearButton(page)).toBeVisible();
      await locators.clearButton(page).click();

      await expect(page.locator('[data-ui-name="FilterTrigger.Counter"]')).not.toBeVisible();
    });

    test('Verify Accessible name focus and keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@base-trigger',
        '@filter-trigger',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/docs/filter-trigger/examples/accessible_name.tsx', 'en');

      await locators.trigger(page).nth(1).click();
      await locators.options(page).first().waitFor({ state: 'visible' });

      await locators.options(page).first().click();
      await locators.options(page).nth(1).click();
      await locators.options(page).nth(2).click();
      const button = page.getByRole('combobox', { name: 'Material' });

      await expect(button).toHaveAttribute('value', 'Glass,Metal,Paper');
      await expect(button.locator('[data-ui-name="FilterTrigger.Text"]')).toContainText(
        '3 selected',
      );

      const textSpan = button.locator('[data-ui-name="FilterTrigger.Text"] span');
      await expect(textSpan).toHaveAttribute('aria-hidden', 'true');

      await locators.clearButton(page).click();
      await expect(button.locator('[data-ui-name="FilterTrigger.Text"]')).not.toContainText(
        '3 selected',
      );
    });
  });
});
