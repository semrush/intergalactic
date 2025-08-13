import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variablesInputNumber = [
    { size: 'm', state: 'normal', locale: 'en', showControls: true, value: 1234.56, placeholder: undefined },
    { size: 'l', state: 'invalid', locale: 'pl', showControls: false, value: 9876.54, placeholder: undefined },
    { size: 'l', state: 'valid', locale: 'de', showControls: true, value: 1000, placeholder: undefined },
    { size: 'm', state: 'valid', locale: 'en', showControls: false, value: undefined, placeholder: 'Enter a value' },
    { size: 'l', state: 'invalid', locale: 'pl', showControls: true, value: undefined, placeholder: 'Type something' },
    { size: 'm', state: 'normal', locale: 'de', showControls: false, value: 2500, placeholder: undefined },
  ];
  variablesInputNumber.forEach((item) => {
    test(`Verify active Input Number state= ${item.state} size=${item.size} locale=${item.locale} showControls=${item.showControls} value=${item.value} placeholder=${item.placeholder}`, async ({ page }) => {
      const standPath = 'stories/components/input-number/tests/examples/basic_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesInputNumberAddon = [
    { size: 'm', state: 'normal', locale: 'en', disabledValue: false, showControls: true, value: 1234.56, placeholder: undefined },
    { size: 'l', state: 'invalid', locale: 'pl', disabledValue: true, showControls: false, value: 9876.54, placeholder: undefined },
    { size: 'l', state: 'valid', locale: 'de', disabledValue: false, showControls: true, value: undefined, placeholder: 'Enter a value' },
    { size: 'm', state: 'normal', locale: 'en', disabledValue: true, showControls: true, value: 1234.56, placeholder: undefined },

  ];
  variablesInputNumberAddon.forEach((item) => {
    test(`Verify Input Number with Addon state= ${item.state} size=${item.size} disabledValue:${item.disabledValue} locale=${item.locale} showControls=${item.showControls} value=${item.value} placeholder=${item.placeholder}`, async ({ page }) => {
      const standPath = 'stories/components/input-number/tests/examples/basic_example_addon.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });

  const variablesInputdisabledValueStates = [
    { size: 'm', state: 'normal', disabledValue: true, readOnly: undefined, showControls: true, value: undefined, placeholder: 'Enter a value' },
    { size: 'l', state: 'invalid', disabledValue: true, readOnly: undefined, value: 9876.54, placeholder: undefined },
    { size: 'l', state: 'valid', disabledValue: true, readOnly: undefined, value: 1000, placeholder: undefined },
    { size: 'm', state: 'valid', disabledValue: undefined, readOnly: true, showControls: true, value: undefined, placeholder: 'Enter a value' },
    { size: 'l', state: 'invalid', disabledValue: undefined, readOnly: true, value: undefined, placeholder: 'Type something' },
    { size: 'm', state: 'normal', disabledValue: undefined, readOnly: true, value: 2500, placeholder: undefined },
  ];
  variablesInputdisabledValueStates.forEach((item) => {
    test(`Verify not active Input Number state= ${item.state} size=${item.size} disabledValue=${item.disabledValue} readOnly=${item.readOnly} showControls=${item.showControls} value=${item.value} placeholder=${item.placeholder}`, async ({ page }) => {
      const standPath = 'stories/components/input-number/tests/examples/basic_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom appearance', async ({ page }) => {
    const standPath = 'stories/components/input-number/docs/examples/appearance_customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('Verify increase and descrease buttons focus and hover', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Decrease by 10"');
      await page.locator('[data-ui-name="Button"]').nth(1).hover();
      await page.waitForSelector('text="Increase by 10"');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Focus in the input and changed value by keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Focus in the input long value in the input', async () => {
      await page.keyboard.type('78743826');
      await page.getByRole('button').nth(1).click();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify range of values appearance', async ({ page }) => {
    const standPath = 'stories/components/input-number/docs/examples/range_of_values.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.locator('label').first().click();
    await page.keyboard.type('7');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional tests', () => {
  const variablesInputNumber = [
    { min: undefined, max: undefined, step: undefined },
    { min: undefined, max: undefined, step: 5 },
    { min: undefined, max: 3, step: undefined },
    { min: 2, max: undefined, step: 2 },
    { min: -3, max: 3, step: 1.5 },
  ];
  variablesInputNumber.forEach((item) => {
    test(`Verify Base example interactions with min= ${item.min} max=${item.max} step=${item.step} `, async ({ page }) => {
      const standPath = 'stories/components/input-number/tests/examples/basic_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const input = page.getByRole('textbox');
      const controls = page.locator('[data-ui-name="InputNumber.Controls"]');

      const minAttr = await input.getAttribute('min');
      const maxAttr = await input.getAttribute('max');
      const stepAttr = await input.getAttribute('step');

      const minValue = minAttr !== null ? Number(minAttr) : undefined;
      const maxValue = maxAttr !== null ? Number(maxAttr) : undefined;
      const stepValue = stepAttr !== null ? Number(stepAttr) : undefined;

      await test.step('Verify InputNumber attributes', async () => {
        await expect(input).toHaveAttribute('aria-invalid', 'false');
        await expect(input).toHaveAttribute('autocomplete', 'off');
        const expectedInputMode = stepValue !== undefined && !Number.isInteger(stepValue) ? 'decimal' : 'numeric';
        await expect(input).toHaveAttribute('inputmode', expectedInputMode);
        await expect(controls).toHaveAttribute('aria-hidden', 'true');
        const buttons = controls.locator('button');
        await expect(buttons.first()).toHaveAttribute('tabindex', '-1');
      });

      await test.step('Verify InputNumber focused by tab', async () => {
        await page.keyboard.press('Tab');
        await input.fill('');
        await expect(input).toBeFocused();
      });

      await test.step('Verify value increases to step by ArrowUp and respects max', async () => {
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('ArrowUp');

        const increment = (stepValue ?? 1) * 3;
        let expectedValue;

        if (maxValue !== undefined) {
          expectedValue = (minValue ?? 0) + increment;
          if (expectedValue > maxValue) expectedValue = maxValue;
        } else {
          expectedValue = (minValue ?? 0) + increment;
        }

        await expect(input).toHaveValue(String(expectedValue));
        await expect(input).toBeFocused();
      });

      await test.step('Verify value increases entering value and respects max', async () => {
        await input.fill('90000');

        const currentValueAttr = await input.inputValue();
        const numericValue = Number(currentValueAttr.replace(/,/g, ''));

        let expectedValue;

        if (maxValue !== undefined) {
          expectedValue = numericValue > maxValue ? maxValue : numericValue;
        } else {
          expectedValue = numericValue;
        }
        await page.locator('label').click();
        await expect(input).toHaveValue((expectedValue).toLocaleString());
        await expect(input).toBeFocused();
      });

      await test.step('Verify value decreases to step by ArrowDown and respects min', async () => {
        await page.fill('input[data-ui-name="InputNumber.Value"]', '0');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        const decrement = (stepValue ?? 1) * 6;
        let expectedValue;

        if (minValue !== undefined) {
          expectedValue = 0 - decrement;
          if (expectedValue < minValue) expectedValue = minValue;
        } else {
          expectedValue = 0 - decrement;
        }

        await expect(input).toHaveValue(String(expectedValue));
        await expect(input).toBeFocused();
      });

      await test.step('Verify value decreases by entering value and respects min', async () => {
        await input.fill('-90000');

        const currentValueAttr = await input.inputValue();
        const numericValue = Number(currentValueAttr.replace(/,/g, ''));

        let expectedValue;

        if (minValue !== undefined) {
          expectedValue = numericValue < minValue ? minValue : numericValue;
        } else {
          expectedValue = numericValue;
        }

        await page.locator('label').click();
        await expect(input).toHaveValue(expectedValue.toLocaleString());
        await expect(input).toBeFocused();
      });

      await test.step('Verify zero value', async () => {
        await page.fill('input[data-ui-name="InputNumber.Value"]', '0');
        await input.fill('');

        await input.fill('9');
        await expect(input).toHaveAttribute('value', '9');
      });
    });
  });

  test('Verify keyboard interactions with custom appearance', async ({ page }) => {
    const standPath = 'stories/components/input-number/docs/examples/appearance_customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const buttons = page.getByRole('button');
    const input = page.getByRole('textbox');

    await test.step('Verify descrease values by min button activation', async () => {
      await page.keyboard.press('Tab');
      await expect(buttons.first()).toBeFocused();
      await page.keyboard.press('Space');
      await expect(input).toHaveValue('-10');
      await page.keyboard.press('Enter');
      await expect(input).toHaveValue('-20');
    });

    await test.step('Verify change values by keyboard arrows when input is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await expect(input).toHaveValue('-30');
      await page.keyboard.press('ArrowUp');
      await expect(input).toHaveValue('-20');
    });

    await test.step('Verify increase values by max button activation', async () => {
      await page.keyboard.press('Tab');
      await expect(buttons.nth(1)).toBeFocused();
      await page.keyboard.press('Space');
      await expect(input).toHaveValue('-10');
      await page.keyboard.press('Enter');
      await expect(input).toHaveValue('0');
    });

    await test.step('Verify Shift+Tab navigation', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(buttons.nth(0)).toBeFocused();
    });
  });

  test('Verify mouse interactions with custom appearance', async ({ page }) => {
    const standPath = 'stories/components/input-number/docs/examples/appearance_customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const buttons = page.getByRole('button');
    const input = page.getByRole('textbox');

    await test.step('Verify descrease values by min button activation', async () => {
      await buttons.first().click();
      await expect(input).toHaveValue('-10');
    });

    await test.step('Verify increase values by max button activation', async () => {
      await buttons.nth(1).click();
      await expect(input).toHaveValue('0');
    });

    await test.step('Verify focus on input by click on it', async () => {
      await input.click();
      await expect(input).toBeFocused();
      await page.keyboard.type('890');
      await expect(input).toHaveValue('890');
    });
  });

  test('Verify input range interactions', async ({ page }) => {
    const standPath = 'stories/components/input-number/docs/examples/range_of_values.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const buttons = page.getByRole('button');
    const input = page.getByRole('textbox');

    await test.step('Verify descrease values by min button activation', async () => {
      await page.keyboard.press('Tab');
      await expect(input.first()).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await expect(input.first()).toHaveValue('7');
      await page.keyboard.type('9');
    });

    await test.step('Verify change values by keyboard arrows when input is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(input.nth(1)).toBeFocused();
      await expect(input.first()).toHaveValue('8');
      await expect(input.nth(1)).toHaveValue('79');
    });
  });
});
