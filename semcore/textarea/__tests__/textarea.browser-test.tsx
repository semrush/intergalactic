import { platform } from 'os';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
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
  variables.forEach((item) => {
    test(`Verify Textarea with size = ${item.size}  state = ${item.state} autoFocus = ${item.autoFocus}  readOnly = ${item.readOnly} resize = ${item.resize} disabled = ${item.disabled} minRows = ${item.minRows} maxRows = ${item.maxRows} value = ${item.value} defaultValue = ${item.defaultValue} and placeholder = ${item.placeholder}`, async ({ page }) => {
      const standPath = 'stories/components/textarea/docs/examples/textarea_with_auto_height.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();

      const textarea = page.locator('[data-ui-name="Textarea"]');
      const isDisabled = await textarea.getAttribute('disabled');
      const isReadOnly = await textarea.getAttribute('readOnly');

      if (isDisabled !== null) {
        return;
      }
      if (isReadOnly !== null) {
        await textarea.click();
        await expect(page).toHaveScreenshot();
        return;
      } else {
        await textarea.click();
        const text =
          'Zoom in on product categories to understand how each site segment drives \nconversions.\nSecond row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row';
        await page.keyboard.type(text, { delay: 10 });
        await expect(page).toHaveScreenshot();
      }
    });
  });
});

test.describe('Functional', () => {
  test('Verify textarea mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/textarea/docs/examples/textarea_with_auto_height.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const textarea = await page.locator('[data-ui-name="Textarea"]');
    const label = page.locator('label');
    await expect(textarea).not.toBeFocused();

    await label.click();
    await expect(textarea).toBeFocused();

    const forValue = await label.getAttribute('for');
    const idValue = await textarea.getAttribute('id');

    expect(forValue).not.toBeNull();
    expect(idValue).not.toBeNull();
    expect(forValue).toBe(idValue);
  });

  test('Verify textarea keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/textarea/docs/examples/textarea_with_auto_height.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const textarea = await page.locator('[data-ui-name="Textarea"]');
    const label = page.locator('label');
    await test.step('Verify textarea focused when perssing TAB', async () => {
      await page.keyboard.press('Tab');
      await expect(textarea).toBeFocused();
    });

    await test.step('Verify ampunf of lines update when enetring text', async () => {
      const text =
        'Zoom in on product categories to understand how each site segment drives \nconversions.\nSecond row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row';
      await page.keyboard.type(text, { delay: 10 });

      const { scrollHeight, lineHeight } = await textarea.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        const lh = parseFloat(computed.lineHeight);
        return {
          scrollHeight: el.scrollHeight,
          lineHeight: lh,
        };
      });

      const numberOfLines = Math.round(scrollHeight / lineHeight);

      expect(numberOfLines).toBe(11);
    });

    await test.step('Verify ampunf of lines update when removing all text', async () => {
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.press('Backspace');

      const { scrollHeight, lineHeight } = await textarea.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        const lh = parseFloat(computed.lineHeight);
        return {
          scrollHeight: el.scrollHeight,
          lineHeight: lh,
        };
      });

      const numberOfLines = Math.round(scrollHeight / lineHeight);
      expect(numberOfLines).toBe(2);
    });
  });
});
