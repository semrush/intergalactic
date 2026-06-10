import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  slider: (page: Page) => page.locator('[data-ui-name="Slider"]'),
  bar: (page: Page) => page.locator('[data-ui-name="Slider.Bar"]'),
  knob: (page: Page) => page.locator('[data-ui-name="Slider.Knob"]'),
  options: (page: Page) => page.locator('[data-ui-name="Slider.Options"]'),
  item: (page: Page, value?: string) => {
    const base = page.locator('div[data-ui-name="Slider.Item"]');
    return value ? base.filter({ has: page.locator(`[value="${value}"]`) }) : base;
  },
  hiddenInput: (page: Page) => page.locator('input[type="hidden"]'),
  inputNumberValue: (page: Page) => page.locator('[data-ui-name="InputNumber.Value"]'),
  visibleInput: (page: Page) => page.locator('input[data-ui-name="Box"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Base states and styles', () => {
    const sliderVariables = [
      // Basic combinations with defaultValue variations
      { defaultValue: 0, min: 0, max: 100, step: 1, disabled: false, showKnob: true, showBar: true },
      { defaultValue: 50, min: 0, max: 100, step: 1, disabled: false, showKnob: true, showBar: true },
      { defaultValue: 100, min: 0, max: 100, step: 1, disabled: false, showKnob: true, showBar: true },

      // Test with disabled state
      { defaultValue: 50, min: 0, max: 100, step: 1, disabled: true, showKnob: true, showBar: true },

      // Test without knob
      { defaultValue: 50, min: 0, max: 100, step: 1, disabled: false, showKnob: false, showBar: true },

      // Test without bar
      { defaultValue: 50, min: 0, max: 100, step: 1, disabled: false, showKnob: true, showBar: false },

      // Test without both knob and bar
      { defaultValue: 50, min: 0, max: 100, step: 1, disabled: false, showKnob: false, showBar: false },

      // Test with different ranges
      { defaultValue: 25, min: 10, max: 50, step: 5, disabled: false, showKnob: true, showBar: true },
      { defaultValue: 500, min: 0, max: 1000, step: 10, disabled: false, showKnob: true, showBar: true },

      // Test disabled with different configurations
      { defaultValue: 75, min: 0, max: 100, step: 1, disabled: true, showKnob: false, showBar: true },
      { defaultValue: 25, min: 0, max: 100, step: 1, disabled: true, showKnob: true, showBar: false },
    ];

    sliderVariables.forEach((item) => {
      test(`Verify Slider defaultValue ${item.defaultValue}, min ${item.min}, max ${item.max}, step ${item.step}, disabled ${item.disabled}, showKnob ${item.showKnob}, showBar ${item.showBar}`, {
        tag: [TAG.PRIORITY_HIGH, '@slider'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/slider/tests/examples/basic_usage.tsx', 'en', item);

        const slider = locators.slider(page);
        const knob = locators.knob(page);

        await test.step('Verify default state', async () => {
          await expect(page).toHaveScreenshot();
        });

        if (!item.disabled && item.showKnob) {
          await test.step('Verify hover state on knob', async () => {
            await knob.hover();
            await expect(page).toHaveScreenshot();
          });

          await test.step('Verify focus state', async () => {
            await page.keyboard.press('Tab');
            await expect(slider).toBeFocused();
            await expect(page).toHaveScreenshot();
          });
        }
      });
    });
  });

  test('Verify slider between options by keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@slider'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/slider/docs/examples/customized_options_view.tsx', 'en');

    const slider = locators.slider(page);
    const knob = locators.knob(page);

    await test.step('Focus slider and verify hover state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await expect(slider).toBeFocused();
      await knob.hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify slider with input validation states', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@slider'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/slider/docs/examples/numeric_slider.tsx', 'en');

    const bar = locators.bar(page);
    const inputValue = locators.inputNumberValue(page);

    await expect(bar).toHaveCount(1);

    await test.step('Verify invalid state with value below min', async () => {
      await inputValue.fill('0');
      await expect(inputValue).toHaveAttribute('aria-invalid', 'true');
      await page.getByRole('tooltip').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify keyboard navigation between options', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@slider'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/slider/docs/examples/customized_options_view.tsx', 'en');

    const slider = locators.slider(page);
    const bar = locators.bar(page);
    const input = locators.hiddenInput(page);

    await expect(bar).toHaveCount(1);

    await test.step('Focus slider', async () => {
      await page.keyboard.press('Tab');
      await expect(slider).toBeFocused();
    });

    await test.step('Navigate right with ArrowRight', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(input).toHaveValue('big');
      await expect(slider).toHaveAttribute('aria-valuenow', '3');
    });

    await test.step('Navigate down with ArrowDown', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(input).toHaveValue('small');
      await expect(slider).toHaveAttribute('aria-valuenow', '1');
    });

    await test.step('Navigate up with ArrowUp', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(input).toHaveValue('medium');
      await expect(slider).toHaveAttribute('aria-valuenow', '2');
    });

    await test.step('Navigate to start with Home', async () => {
      await page.keyboard.press('Home');
      await expect(slider).toHaveAttribute('aria-valuenow', '1');
    });

    await test.step('Navigate to end with End', async () => {
      await page.keyboard.press('End');
      await expect(slider).toHaveAttribute('aria-valuenow', '3');
    });
  });

  test('Verify slider with input by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@slider'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/slider/docs/examples/numeric_slider.tsx', 'en');

    const slider = locators.slider(page);
    const bar = locators.bar(page);
    const input = locators.visibleInput(page);
    const inputValue = locators.inputNumberValue(page);

    await expect(bar).toHaveCount(1);

    await test.step('Fill input with invalid value below min', async () => {
      await inputValue.fill('0');
      await expect(input).toHaveValue('0');
      await expect(slider).toHaveAttribute('aria-valuenow', '0');
      await expect(inputValue).toHaveAttribute('aria-invalid', 'true');
    });

    await test.step('Fill input with valid value at min', async () => {
      await inputValue.fill('10');
      await expect(input).toHaveValue('10');
      await expect(slider).toHaveAttribute('aria-valuenow', '10');
      await expect(inputValue).toHaveAttribute('aria-invalid', 'false');
    });

    await test.step('Fill input with invalid value above max', async () => {
      await inputValue.fill('900');
      await expect(input).toHaveValue('900');
      await expect(slider).toHaveAttribute('aria-valuenow', '900');
      await expect(inputValue).toHaveAttribute('aria-invalid', 'true');
    });
  });

  test('Verify slider with input by keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@slider'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/slider/docs/examples/numeric_slider.tsx', 'en');

    const slider = locators.slider(page);
    const bar = locators.bar(page);
    const input = locators.visibleInput(page);
    const inputValue = locators.inputNumberValue(page);

    await expect(bar).toHaveCount(1);

    await test.step('Navigate and increment slider value', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await expect(input).toHaveValue('52');
      await expect(slider).toHaveAttribute('aria-valuenow', '52');
      await expect(inputValue).toHaveValue('52');
    });

    await test.step('Focus input and increment value', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowUp');
      await expect(input).toHaveValue('53');
      await expect(slider).toHaveAttribute('aria-valuenow', '53');
      await expect(inputValue).toHaveValue('53');
      await expect(inputValue).toHaveAttribute('aria-invalid', 'false');
    });

    await test.step('Fill invalid value and verify slider clamps to min', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
      await inputValue.fill('0');
      await expect(inputValue).toHaveAttribute('aria-invalid', 'true');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('ArrowRight');
      await expect(input).toHaveValue('10');
      await expect(slider).toHaveAttribute('aria-valuenow', '10');
      await expect(inputValue).toHaveValue('10');
    });

    await test.step('Fill invalid value and verify slider clamps to max', async () => {
      await page.keyboard.press('Tab');
      await inputValue.fill('110');
      await expect(inputValue).toHaveAttribute('aria-invalid', 'true');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('ArrowLeft');
      await expect(input).toHaveValue('100');
      await expect(slider).toHaveAttribute('aria-valuenow', '100');
      await expect(inputValue).toHaveValue('100');
      await expect(inputValue).toHaveAttribute('aria-invalid', 'false');
    });
  });
});
