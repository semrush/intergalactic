import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  textarea: (page: Page) => page.locator('[data-ui-name="Textarea"]'),
  label: (page: Page) => page.locator('label'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variables = [
    { size: 'm', state: 'normal', autoFocus: false, readOnly: false, resize: undefined, disabled: false, minRows: 1, maxRows: 5, value: undefined, defaultValue: undefined, placeholder: 'Type something...' },
    { size: 'l', state: 'normal', autoFocus: false, readOnly: false, resize: 'none', disabled: false, minRows: 2, maxRows: 2, value: undefined, defaultValue: 'Default Value', placeholder: undefined },
    { size: 'm', state: 'normal', autoFocus: true, readOnly: false, resize: 'horizontal', disabled: false, minRows: 0, maxRows: 4, value: 'Some Value', defaultValue: undefined, placeholder: 'Type something...' },
    { size: 'l', state: 'normal', autoFocus: true, readOnly: false, resize: 'none', disabled: false, minRows: undefined, maxRows: undefined, value: undefined, defaultValue: undefined, placeholder: undefined },
    { size: 'm', state: 'normal', autoFocus: true, readOnly: true, resize: undefined, disabled: false, minRows: 1, maxRows: 3, value: undefined, defaultValue: 'Default Value', placeholder: 'Type something...' },
    { size: 'l', state: 'invalid', autoFocus: true, readOnly: false, resize: 'horizontal', disabled: false, minRows: 3, maxRows: 10, value: undefined, defaultValue: undefined, placeholder: undefined },
    { size: 'm', state: 'normal', autoFocus: false, readOnly: false, resize: 'vertical', disabled: false, minRows: 2, maxRows: 5, value: undefined, defaultValue: 'Default Value', placeholder: undefined },
    { size: 'm', state: 'invalid', autoFocus: false, readOnly: false, resize: undefined, disabled: false, minRows: 5, maxRows: 5, value: undefined, defaultValue: undefined, placeholder: 'Type something...' },
    { size: 'l', state: 'normal', autoFocus: false, readOnly: true, resize: undefined, disabled: false, minRows: undefined, maxRows: undefined, value: undefined, defaultValue: undefined, placeholder: 'Type something...' },
    { size: 'm', state: 'normal', autoFocus: false, readOnly: false, resize: 'none', disabled: true, minRows: 1, maxRows: 4, value: undefined, defaultValue: 'Default Value', placeholder: undefined },
    { size: 'm', state: 'valid', autoFocus: true, readOnly: false, resize: 'vertical', disabled: true, minRows: 1, maxRows: 10, value: undefined, defaultValue: undefined, placeholder: 'Type something...' },
    { size: 'l', state: 'normal', autoFocus: false, readOnly: false, resize: 'horizontal', disabled: true, minRows: undefined, maxRows: undefined, value: undefined, defaultValue: undefined, placeholder: undefined },
    { size: 'l', state: 'valid', autoFocus: false, readOnly: false, resize: 'none', disabled: false, minRows: 2, maxRows: 6, value: 'Some Value', defaultValue: undefined, placeholder: 'Type something...' },
    { size: 'm', state: 'normal', autoFocus: true, readOnly: false, resize: 'both', disabled: false, minRows: 3, maxRows: 3, value: undefined, defaultValue: undefined, placeholder: undefined },
  ];
  const longText =
    'Zoom in on product categories to understand how each site segment drives \nconversions.\nSecond row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row';
  variables.forEach((item) => {
    test(`Verify Textarea with size = ${item.size}  state = ${item.state} autoFocus = ${item.autoFocus}  readOnly = ${item.readOnly} resize = ${item.resize} disabled = ${item.disabled} minRows = ${item.minRows} maxRows = ${item.maxRows} value = ${item.value} defaultValue = ${item.defaultValue} and placeholder = ${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@textarea',
        '@base-components',
        '@typography',
        '@flex-box'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/textarea/docs/examples/textarea_with_auto_height.tsx', 'en', item);

      await expect(page).toHaveScreenshot();

      const isControlled = item.value !== undefined;
      const readOnlyStep = !item.disabled && item.readOnly ? test.step : test.step.skip;
      const typingStep = !item.disabled && !item.readOnly ? test.step : test.step.skip;

      await readOnlyStep('Verify readOnly textarea after click', async () => {
        await locators.textarea(page).click();
        if (!item.autoFocus) {
          await expect(page).toHaveScreenshot();
        }
      });

      await typingStep('Verify textarea after typing long text', async () => {
        await locators.textarea(page).click();
        await page.keyboard.type(longText, { delay: 10 });
        if (isControlled) {
          await expect(locators.textarea(page)).toHaveValue(item.value!);
        }
        if (!isControlled || !item.autoFocus) {
          await expect(page).toHaveScreenshot();
        }
      });
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify textarea mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@textarea',
      '@base-components',
      '@typography',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/textarea/docs/examples/textarea_with_auto_height.tsx', 'en');

    await expect(locators.textarea(page)).not.toBeFocused();

    await locators.label(page).click();
    await expect(locators.textarea(page)).toBeFocused();

    await expect(locators.label(page)).toHaveAttribute('for', 'autoscalable-textarea');
    await expect(locators.textarea(page)).toHaveAttribute('id', 'autoscalable-textarea');
  });

  test('Verify textarea keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@textarea',
      '@base-components',
      '@typography',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/textarea/docs/examples/textarea_with_auto_height.tsx', 'en');
    const getNumberOfLines = () => locators.textarea(page).evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const lineHeight = parseFloat(computed.lineHeight);

      return Math.round(el.scrollHeight / lineHeight);
    });

    await test.step('Verify textarea focused when pressing TAB', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.textarea(page)).toBeFocused();
    });

    await test.step('Verify amount of lines updates when entering text', async () => {
      await page.keyboard.type(
        'Zoom in on product categories to understand how each site segment drives \nconversions.\nSecond row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row',
        { delay: 10 },
      );

      await expect.poll(getNumberOfLines).toBe(11);
    });

    await test.step('Verify amount of lines updates when removing all text', async () => {
      await page.keyboard.press('ControlOrMeta+A');
      await page.keyboard.press('Backspace');

      await expect.poll(getNumberOfLines).toBe(2);
    });
  });
});
