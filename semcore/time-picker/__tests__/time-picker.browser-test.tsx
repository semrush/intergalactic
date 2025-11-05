import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  timeBoxes: (page: Page) => page.getByRole('combobox'),
  timePickerGroup: (page: Page) => page.getByRole('group'),
  options: (page: Page) => page.getByRole('option'),
  button: (page: Page, text?: string) => page.getByRole('button', { name: text }),
  label: (page: Page, text: string) => page.locator('label', { hasText: text }),

};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesStatesAndSizes = [
    { state: 'normal', size: 'm', is12Hour: true },
    { state: 'valid', size: 'm', is12Hour: false },
    { state: 'invalid', size: 'm', is12Hour: true },
    { state: 'normal', size: 'l', is12Hour: false },
    { state: 'valid', size: 'l', is12Hour: true },
    { state: 'invalid', size: 'l', is12Hour: false },
  ];

  variablesStatesAndSizes.forEach((item) => {
    test(`Verify TimePicker with is12Hour=${item.is12Hour} state= ${item.state} size= ${item.size}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@time-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/time-picker/tests/examples/different_cases.tsx', 'en', item);

      const optionH = page.getByRole('option');

      await test.step('Verify boxes margins', async () => {
        const classAttr = await locators.timePickerGroup(page).first().getAttribute('class');

        if (classAttr?.includes('_size_m_')) {
          for (let i = 0; i < 2; i++) {
            await expect(locators.timeBoxes(page).nth(i)).toHaveCSS('margin-left', '8px');
            await expect(locators.timeBoxes(page).nth(i)).toHaveCSS('margin-right', '8px');
          }
        } else if (classAttr?.includes('_size_l_')) {
          await expect(locators.timeBoxes(page).nth(0)).toHaveCSS('margin-left', '12px');
          await expect(locators.timeBoxes(page).nth(0)).toHaveCSS('margin-right', '8px');
          await expect(locators.timeBoxes(page).nth(1)).toHaveCSS('margin-left', '8px');
          await expect(locators.timeBoxes(page).nth(1)).toHaveCSS('margin-right', '12px');
        }
      },
      );

      await test.step('Verify Not focused styles', async () => {
        await expect(page).toHaveScreenshot();
      });
      await test.step('Verify format focused styles', async () => {
        await page.keyboard.press('Tab');
        await optionH.first().waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify format focused styles', async () => {
        await page.keyboard.press('Enter');
        await optionH.first().waitFor({ state: 'hidden' });

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify pm to am', async () => {
        await page.keyboard.press('Enter');
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const variablesDisabledStatesSizes = [
    { disabled: true, readOnly: undefined, state: 'normal', size: 'm', is12Hour: true },
    { disabled: undefined, readOnly: true, state: 'valid', size: 'm', is12Hour: false },
    { disabled: true, readOnly: undefined, state: 'invalid', size: 'm', is12Hour: true },
    { disabled: undefined, readOnly: true, state: 'normal', size: 'l', is12Hour: false },
    { disabled: true, readOnly: undefined, state: 'valid', size: 'l', is12Hour: true },
    { disabled: undefined, readOnly: true, state: 'invalid', size: 'l', is12Hour: false },
  ];
  variablesDisabledStatesSizes.forEach((item) => {
    test(`Verify disabled TimePicker with state= ${item.state} size= ${item.size} is12Hour=${item.is12Hour}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@time-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/time-picker/tests/examples/different_cases.tsx', 'en', item);
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesValueandDefaultValue = [
    { value: '12:32', defaultValue: undefined, is12Hour: true },
    { value: '12:44', defaultValue: undefined, is12Hour: false },
    { value: undefined, defaultValue: '08:19', is12Hour: true },
    { value: undefined, defaultValue: '23:59', is12Hour: false },
  ];
  variablesValueandDefaultValue.forEach((item) => {
    test(`Verify TimePicker with value= ${item.value} defaultValue= ${item.defaultValue} is12Hour=${item.is12Hour}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@time-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/time-picker/tests/examples/different_cases.tsx', 'en', item);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify hours and minutes listboxes with and without step ', {
    tag: [TAG.PRIORITY_HIGH,
      '@time-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/time-picker/tests/examples/different_cases.tsx', 'en');

    const option = page.getByRole('option');

    await test.step('Verify hours and minutes without step', async () => {
      await locators.timeBoxes(page).nth(0).click();
      await option.first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Escape');
      await option.first().waitFor({ state: 'hidden' });

      await locators.timeBoxes(page).nth(1).click();
      await option.first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Escape');
      await option.first().waitFor({ state: 'hidden' });
    });

    await test.step('Verify hours and minutes with step', async () => {
      await locators.timeBoxes(page).nth(4).click();
      await option.first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Escape');
      await option.first().waitFor({ state: 'hidden' });

      await locators.timeBoxes(page).nth(5).click();
      await option.first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Escape');
      await option.first().waitFor({ state: 'hidden' });
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify expanded Time Picker with format keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@time-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/time-picker/docs/examples/expanded_access_to_all_the_components.tsx', 'en');

    const separator = page.locator('[data-ui-name="TimePicker.Separator"]');

    await test.step('Verify attributes in empty state', async () => {
      const count = await locators.timeBoxes(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.timeBoxes(page).nth(i)).toHaveAttribute('aria-invalid', 'false');
        await expect(locators.timeBoxes(page).nth(i)).toHaveAttribute('placeholder', '00');
        await expect(locators.timeBoxes(page).nth(i)).toHaveAttribute('aria-haspopup', 'listbox');
        await expect(locators.timeBoxes(page).nth(i)).toHaveAttribute('aria-expanded', 'false');
        await expect(locators.timeBoxes(page).nth(i)).toHaveAttribute('aria-autocomplete', 'list');
        await expect(locators.timeBoxes(page).nth(i)).toHaveAttribute('aria-disabled', 'false');
        await expect(locators.timeBoxes(page).nth(i)).toHaveAttribute('inputmode', 'numeric');
      }
      await expect(separator).toHaveAttribute('aria-hidden', 'true');
    });

    await test.step('Verify focus on the input with Hours and options expanded by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.timeBoxes(page).nth(0)).toBeFocused();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(0)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(0)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Arrows switch between options and it is possible select the option', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.timeBoxes(page).nth(0)).toHaveValue('12');
    });

    await test.step('Verify Arrows expand option list again', async () => {
      await page.keyboard.press('ArrowDown');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(0)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(0)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Escape closes list of options', async () => {
      await page.keyboard.press('Escape');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.timeBoxes(page).nth(0)).toHaveAttribute('aria-expanded', 'false');
      await expect(locators.timeBoxes(page).nth(0)).not.toHaveAttribute('aria-controls');
      await expect(locators.timeBoxes(page).nth(0)).toHaveValue('12');
    });

    await test.step('Verify Focus on the input with Minutes and options expanded by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.timeBoxes(page).nth(1)).toBeFocused();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(1)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(1)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Arrows switch between options and it is possible to select the option', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.timeBoxes(page).nth(1)).toHaveValue('01');
    });

    await test.step('Verify Enter expand option list again', async () => {
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(1)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(1)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Escape closes hours list', async () => {
      await page.keyboard.press('Escape');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.timeBoxes(page).nth(1)).toHaveAttribute('aria-expanded', 'false');
      await expect(locators.timeBoxes(page).nth(1)).not.toHaveAttribute('aria-controls');
      await expect(locators.timeBoxes(page).nth(1)).toHaveValue('01');
    });

    await test.step('Verify Tab moves focus to the Format', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page)).toBeFocused();
      await expect(locators.button(page)).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Format can be changed by keyboard', async () => {
      await page.keyboard.press('Space');

      const formatButton = page.locator('[data-ui-name="TimePicker.Format"] span');
      const formatValue = (await formatButton.textContent())?.trim();

      expect(formatValue).toBe('PM');
    });

    await test.step('Verify Shift Tab moves to the prev focusable element', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.timeBoxes(page).nth(1)).toBeFocused();
    });
  });

  test('Verify Time Picker expanded with format mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@time-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/time-picker/docs/examples/expanded_access_to_all_the_components.tsx', 'en');

    await test.step('Verify Hours expanded by Click on the input', async () => {
      await locators.timeBoxes(page).nth(0).click();
      await expect(locators.timeBoxes(page).nth(0)).toBeFocused();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(0)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(0)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify it is possible to select the option', async () => {
      await locators.options(page).nth(1).click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.timeBoxes(page).nth(0)).toHaveValue('02');
    });

    await test.step('Verify Hours expanded again by second Click on the input', async () => {
      await locators.timeBoxes(page).nth(0).click();
      await expect(locators.timeBoxes(page).nth(0)).toBeFocused();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(0)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(0)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Minues list opened and Hours closed by click on Minutes', async () => {
      await locators.timeBoxes(page).nth(1).click();
      await page.getByRole('option', { name: '00' }).nth(0).waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(1)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(1)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify clicking on the options selects it', async () => {
      await locators.options(page).nth(1).click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.timeBoxes(page).nth(1)).toHaveValue('01');
    });

    await test.step('Verify format can be changed by clcik on it', async () => {
      await locators.timeBoxes(page).nth(1).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await locators.button(page).click();
      const formatButton = page.locator('[data-ui-name="TimePicker.Format"] span');
      const formatValue = (await formatButton.textContent())?.trim();

      expect(formatValue).toBe('PM');
    });
  });

  test('Verify Time Picker base with format keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@time-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/time-picker/tests/examples/different_cases.tsx', 'en', { is12Hour: true });

    const box = page.locator('[data-testid="regular"]');
    const format = box.getByRole('button');

    await test.step('Verify Focus on the input and list with Hours expanded by Tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.getByRole('option', { name: '01' }).nth(0).waitFor({ state: 'visible' });

      await expect(locators.timeBoxes(page).nth(2)).toBeFocused();
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Arrows switch between options and it is possible to select the option', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');

      await expect(locators.timeBoxes(page).nth(2)).toHaveValue('12');
    });

    await test.step('Verify Arrows expand option list again', async () => {
      await page.keyboard.press('ArrowDown');
      await page.getByRole('option', { name: '12' }).nth(0).waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Escape closes list', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-expanded', 'false');
      await expect(locators.timeBoxes(page).nth(2)).not.toHaveAttribute('aria-controls');
      await expect(locators.timeBoxes(page).nth(2)).toHaveValue('12');
    });

    await test.step('Verify Focus on the input with Minutes and list options expanded by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.timeBoxes(page).nth(3)).toBeFocused();
      await expect(locators.timeBoxes(page).nth(3)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(3)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Arrows switch between options and it is possible select the option', async () => {
      await page.keyboard.press('ArrowDown');
      await page.getByRole('option', { name: '01' }).nth(0).waitFor({ state: 'visible' });
      await page.keyboard.press('Enter');
      await expect(locators.timeBoxes(page).nth(3)).toHaveValue('01');
    });

    await test.step('Verify Enter expand option list again', async () => {
      await page.keyboard.press('Enter');
      await page.getByRole('option', { name: '01' }).nth(0).waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(3)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(3)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Tab moves focus to the Format', async () => {
      await page.keyboard.press('Tab');
      await expect(format).toBeFocused();
      await expect(format).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify Format can be changed by keyboard', async () => {
      await page.keyboard.press('Space');

      const formatButton = page.locator('[data-ui-name="TimePicker.Format"] span');
      const formatValue = (await formatButton.nth(1).textContent())?.trim();

      expect(formatValue).toBe('PM');
    });

    await test.step('Verify Shift Tab moves to the prev focusable element', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.timeBoxes(page).nth(3)).toBeFocused();
    });
  });

  test('Verify Time Picker base without format keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@time-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/time-picker/tests/examples/different_cases.tsx', 'en', { is12Hour: false });

    await test.step('Verify Focus on the input with Hours and options list expanded by Tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.getByRole('option', { name: '01' }).nth(0).waitFor({ state: 'visible' });

      await expect(locators.timeBoxes(page).nth(2)).toBeFocused();
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Arrows switch between options and it is possible to select the option', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');

      await expect(locators.timeBoxes(page).nth(2)).toHaveValue('23');
    });

    await test.step('Verify Arrows expand option list again', async () => {
      await page.keyboard.press('ArrowDown');
      await page.getByRole('option', { name: '23' }).nth(0).waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Escape closes list', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.timeBoxes(page).nth(2)).toHaveAttribute('aria-expanded', 'false');
      await expect(locators.timeBoxes(page).nth(2)).not.toHaveAttribute('aria-controls');
      await expect(locators.timeBoxes(page).nth(2)).toHaveValue('23');
    });

    await test.step('Verify Focus on the input with Minutes and options list expanded by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.timeBoxes(page).nth(3)).toBeFocused();
      await expect(locators.timeBoxes(page).nth(3)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(3)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Arrows switch between options and it is possible to select the option', async () => {
      await page.keyboard.press('ArrowDown');
      await page.getByRole('option', { name: '01' }).nth(0).waitFor({ state: 'visible' });
      await page.keyboard.press('Enter');
      await expect(locators.timeBoxes(page).nth(3)).toHaveValue('01');
    });

    await test.step('Verify Enter expand option list again', async () => {
      await page.keyboard.press('Enter');
      await page.getByRole('option', { name: '01' }).nth(0).waitFor({ state: 'visible' });
      await expect(locators.timeBoxes(page).nth(3)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.timeBoxes(page).nth(3)).toHaveAttribute('aria-controls');
    });

    await test.step('Verify Shift Tab moves to the prev focusable element', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.timeBoxes(page).nth(2)).toBeFocused();
    });
  });
});
