import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  input: (page: Page) => page.getByRole('textbox'),
};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesInputNumber = [
    { size: 'm', state: 'normal', locale: 'en', showControls: true, value: 1234.56, placeholder: undefined },
    { size: 'l', state: 'invalid', locale: 'pl', showControls: false, value: 9876.54, placeholder: undefined },
    { size: 'l', state: 'valid', locale: 'de', showControls: true, value: 1000, placeholder: undefined },
    { size: 'm', state: 'valid', locale: 'en', showControls: false, value: undefined, placeholder: 'Enter a value' },
    { size: 'l', state: 'invalid', locale: 'pl', showControls: true, value: undefined, placeholder: 'Type something' },
    { size: 'm', state: 'normal', locale: 'de', showControls: false, value: 2500, placeholder: undefined },
  ];
  variablesInputNumber.forEach((item) => {
    test(`Verify active Input Number with state= ${item.state} size=${item.size} locale=${item.locale} showControls=${item.showControls} value=${item.value} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@input-number'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input-number/tests/examples/basic_example.tsx', 'en', item);

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
    test(`Verify Input Number with Addon and state= ${item.state} size=${item.size} disabledValue=${item.disabledValue} locale=${item.locale} showControls=${item.showControls} value=${item.value} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@input-number'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input-number/tests/examples/basic_example_addon.tsx', 'en', item);

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
    test(`Verify not active Input Number with state= ${item.state} size=${item.size} disabledValue=${item.disabledValue} readOnly=${item.readOnly} showControls=${item.showControls} value=${item.value} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@input-number'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input-number/tests/examples/basic_example.tsx', 'en', item);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom appearance', {
    tag: [TAG.PRIORITY_HIGH,
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-number/docs/examples/appearance_customization.tsx', 'en');

    await test.step('Verify increase and descrease buttons focus and hover', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Decrease by 10"');
      await page.locator('[data-ui-name="Button"]').nth(1).hover();
      await page.waitForSelector('text="Increase by 10"');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Focus in the input and changes value by keyboard', async () => {
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

  test('Verify range of values appearance', {
    tag: [TAG.PRIORITY_HIGH,
      '@input-number',
      '@base-components'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-number/docs/examples/range_of_values.tsx', 'en');

    await page.locator('label').first().click();
    await page.keyboard.type('7');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  const variablesInputNumber = [
    { min: undefined, max: undefined, step: undefined },
    { min: undefined, max: undefined, step: 5 },
    { min: undefined, max: 3, step: undefined },
    { min: 2, max: undefined, step: 2 },
    { min: -3, max: 3, step: 1.5 },
    { min: 0, max: 1, step: 0.01 },
  ];
  variablesInputNumber.forEach((item) => {
    test(`Verify Base example interactions with min= ${item.min} max=${item.max} step=${item.step} `, {
      tag: [TAG.PRIORITY_HIGH,
        '@input-number'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input-number/tests/examples/basic_example.tsx', 'en', item);

      const [_, decimals] = item.step?.toString().split('.') ?? [];
      const stepPrecision = decimals?.length ?? 0;

      const controls = page.locator('[data-ui-name="InputNumber.Controls"]');

      const minAttr = await locators.input(page).getAttribute('min');
      const maxAttr = await locators.input(page).getAttribute('max');
      const stepAttr = await locators.input(page).getAttribute('step');

      const minValue = minAttr !== null ? Number(minAttr) : undefined;
      const maxValue = maxAttr !== null ? Number(maxAttr) : undefined;
      const stepValue = stepAttr !== null ? Number(stepAttr) : undefined;

      await test.step('Verify InputNumber attributes', async () => {
        await expect(locators.input(page)).toHaveAttribute('aria-invalid', 'false');
        await expect(locators.input(page)).toHaveAttribute('autocomplete', 'off');
        const expectedInputMode = stepValue !== undefined && !Number.isInteger(stepValue) ? 'decimal' : 'numeric';
        await expect(locators.input(page)).toHaveAttribute('inputmode', expectedInputMode);
        await expect(controls).toHaveAttribute('aria-hidden', 'true');
      });

      await test.step('Verify InputNumber focused by tab', async () => {
        await page.keyboard.press('Tab');
        await locators.input(page).fill('');
        await expect(locators.input(page)).toBeFocused();
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

        await expect(locators.input(page)).toHaveValue(String(expectedValue));
        await expect(locators.input(page)).toBeFocused();
      });

      await test.step('Verify value increases entering value and respects max', async () => {
        await locators.input(page).fill('90000');

        const currentValueAttr = await locators.input(page).inputValue();
        const numericValue = Number(currentValueAttr.replace(/,/g, ''));

        let expectedValue;

        if (maxValue !== undefined) {
          expectedValue = numericValue > maxValue ? maxValue : numericValue;
        } else {
          expectedValue = numericValue;
        }

        if (stepPrecision) {
          expectedValue = expectedValue.toFixed(stepPrecision);
        }

        await page.locator('label').click();
        await expect(locators.input(page)).toHaveValue(expectedValue.toLocaleString());
        await expect(locators.input(page)).toBeFocused();
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

        // A zero result is displayed without a fractional part, mirroring the component's getDisplayValue.
        if (stepPrecision && expectedValue !== 0) {
          expectedValue = expectedValue.toFixed(stepPrecision);
        }

        await expect(locators.input(page)).toHaveValue(String(expectedValue));
        await expect(locators.input(page)).toBeFocused();
      });

      await test.step('Verify value decreases by entering value and respects min', async () => {
        await locators.input(page).fill('-90000');

        const currentValueAttr = await locators.input(page).inputValue();
        const numericValue = Number(currentValueAttr.replace(/,/g, ''));

        let expectedValue;

        if (minValue !== undefined) {
          expectedValue = numericValue < minValue ? minValue : numericValue;
        } else {
          expectedValue = numericValue;
        }

        // A zero result is displayed without a fractional part, mirroring the component's getDisplayValue.
        if (stepPrecision && expectedValue !== 0) {
          expectedValue = expectedValue.toFixed(stepPrecision);
        }

        await page.locator('label').click();
        await expect(locators.input(page)).toHaveValue(expectedValue.toLocaleString());
        await expect(locators.input(page)).toBeFocused();
      });

      await test.step('Verify zero value', async () => {
        await locators.input(page).fill('0');
        await locators.input(page).fill('0');
        await locators.input(page).fill('9');
        await expect(locators.input(page)).toHaveAttribute('value', '9');
      });
    });
  });

  test('Verify keyboard interactions with custom appearance', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-number/docs/examples/appearance_customization.tsx', 'en');

    await test.step('Verify descrease values by min button activation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page).first()).toBeFocused();
      await page.keyboard.press('Space');
      await expect(locators.input(page)).toHaveValue('-10');
      await page.keyboard.press('Enter');
      await expect(locators.input(page)).toHaveValue('-20');
    });

    await test.step('Verify change values by keyboard arrows when input is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await expect(locators.input(page)).toHaveValue('-30');
      await page.keyboard.press('ArrowUp');
      await expect(locators.input(page)).toHaveValue('-20');
    });

    await test.step('Verify increase values by max button activation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page).nth(1)).toBeFocused();
      await page.keyboard.press('Space');
      await expect(locators.input(page)).toHaveValue('-10');
      await page.keyboard.press('Enter');
      await expect(locators.input(page)).toHaveValue('0');
    });

    await test.step('Verify Shift+Tab navigation', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page).nth(0)).toBeFocused();
    });
  });

  test('Verify mouse interactions with custom appearance', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-number/docs/examples/appearance_customization.tsx', 'en');

    await test.step('Verify descrease values by min button activation', async () => {
      await locators.button(page).first().click();
      await expect(locators.input(page)).toHaveValue('-10');
    });

    await test.step('Verify increase values by max button activation', async () => {
      await locators.button(page).nth(1).click();
      await expect(locators.input(page)).toHaveValue('0');
    });

    await test.step('Verify focus on input by click on it', async () => {
      await locators.input(page).click();
      await expect(locators.input(page)).toBeFocused();
      await page.keyboard.type('890');
      await expect(locators.input(page)).toHaveValue('890');
    });
  });

  test('Verify input range keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-number/docs/examples/range_of_values.tsx', 'en');

    await test.step('Verify descrease values by min button activation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page).first()).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await expect(locators.input(page).first()).toHaveValue('7');
      await page.keyboard.type('9');
    });

    await test.step('Verify change values by keyboard arrows when input is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page).nth(1)).toBeFocused();
      await expect(locators.input(page).first()).toHaveValue('8');
      await expect(locators.input(page).nth(1)).toHaveValue('79');
    });
  });
});
