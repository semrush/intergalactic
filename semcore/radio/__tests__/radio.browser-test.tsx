import type { Page } from '@playwright/test';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

const locators = {
  radios: (page: Page) => page.getByRole('radio'),
  textLabel: (page: Page, text: string) => page.locator('label', { hasText: text }),
  status: (page: Page) => page.getByRole('status'),
  radioGroup: (page: Page) => page.getByRole('group'),
  radioText: (page: Page, text: string) => page.locator('label[data-ui-name="Radio.Text"]', { hasText: text }),
  options: (page: Page) => page.getByRole('option'),
  selectTrigger: (page: Page) => page.getByRole('combobox'),
  button: (page: Page, text: string) => page.locator('button', { hasText: text }),
};

test.describe('Visual - Radio with group', () => {
  test('Verify styles for m size', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/radiogroup_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const radios = page.locator('[data-ui-name="Radio"]');
    const count = await radios.count();

    for (let i = 0; i < count; i++) {
      const radio = radios.nth(i);
      const mark = radio.locator('[data-ui-name="Value.RadioMark"]');
      const labelText = radio.locator('[data-ui-name="Radio.Text"]');

      const radioMarginBottom = await radio.evaluate((el) => getComputedStyle(el).marginBottom);
      expect(radioMarginBottom).toBe('12px');
      const markWidth = await mark.evaluate((el) => getComputedStyle(el).width);
      const markHeight = await mark.evaluate((el) => getComputedStyle(el).height);
      expect(markWidth).toBe('16px');
      expect(markHeight).toBe('16px');

      const styles = await labelText.evaluate((el) => {
        const s = getComputedStyle(el);
        return { fontSize: s.fontSize, marginleft: s.marginLeft };
      });

      expect(styles.fontSize).toBe('14px');
      expect(styles.marginleft).toBe('8px');
    }
  });

  test('Verify styles for l size', async ({ page }) => {
    const standPath = 'stories/components/radio/tests/examples/radiogroup_example_L.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const radios = page.locator('[data-ui-name="Radio"]');
    const count = await radios.count();

    for (let i = 0; i < count; i++) {
      const radio = radios.nth(i);
      const mark = radio.locator('[data-ui-name="Value.RadioMark"]');
      const labelText = radio.locator('span[data-ui-name="Radio.Text"]');

      const radioMarginBottom = await radio.evaluate((el) => getComputedStyle(el).marginBottom);
      expect(radioMarginBottom).toBe('12px');
      const markWidth = await mark.evaluate((el) => getComputedStyle(el).width);
      const markHeight = await mark.evaluate((el) => getComputedStyle(el).height);
      expect(markWidth).toBe('20px');
      expect(markHeight).toBe('20px');

      const styles = await labelText.evaluate((el) => {
        const s = getComputedStyle(el);
        return { fontSize: s.fontSize, marginleft: s.marginLeft };
      });

      expect(styles.fontSize).toBe('16px');
      expect(styles.marginleft).toBe('8px');
    }
  });

  test('Verify all states and sizes', async ({ page }) => {
    const standPath = 'stories/components/radio/tests/examples/radiogroup_different_states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Radio Group example', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/radiogroup_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify checking works by clicking on checkmart', async () => {
      page.locator('label').filter({ hasText: 'Beagle' }).locator('div').click();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify keyboard interactions work after mouse', async () => {
      page.locator('[data-ui-name="Value.RadioMark"]').nth(1).click();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      page.locator('label').filter({ hasText: 'Labrador Retriever' }).locator('div').hover();
      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Functional - Radio with group', () => {
  test('Verify roles and attributes for radio with group', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/radiogroup_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(locators.radioGroup(page)).toHaveAttribute('role', 'group');
    await expect(locators.radioGroup(page)).toHaveAttribute('name', 'radio');
    await expect(locators.radioGroup(page)).toHaveAttribute('aria-labelledby', 'radioGroup');
    await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');

    const count = await locators.radios(page).count();

    for (let i = 0; i < count; i++) {
      const radio = locators.radios(page).nth(i);
      const mark = page.locator('[data-ui-name="Value.RadioMark"]').nth(i);
      await expect(radio).toHaveAttribute('type', 'radio');
      await expect(radio).toHaveAttribute('name', 'radio');
      await expect(radio).toHaveAttribute('aria-invalid', 'false');

      const value = await radio.getAttribute('value');
      if (value === '1') {
        await expect(radio).toBeChecked();
      } else {
        await expect(radio).not.toBeChecked();
      }

      await expect(mark).toHaveAttribute('aria-hidden', 'true');
    }
  });

  test('Verify mouse interactions for radio with group', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/radiogroup_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify pre checked value works', async () => {
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page).first()).toBeChecked();
    });

    await test.step('Verify checking works by clicking on checkmart', async () => {
      page.locator('label').filter({ hasText: 'Beagle' }).locator('div').click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
      await expect(locators.radios(page).nth(2)).toBeChecked();
    });

    await test.step('Verify checking works by clicking on checkmart', async () => {
      page.locator('[data-ui-name="Radio.Text"]').nth(1).click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
      await expect(locators.radios(page).nth(1)).toBeChecked();
    });

    await test.step('Verify keyboard interactions work after mouse', async () => {
      await page.keyboard.press('ArrowDown');

      await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
      await expect(locators.radios(page).nth(2)).toBeChecked();
      await expect(locators.radios(page).nth(2)).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page).first()).toBeChecked();
      await expect(locators.radios(page).first()).toBeFocused();
    });
  });

  test('Verify keyboard interactions for radio with group', async ({ page, browserName }) => {
    const standPath = 'stories/components/radio/tests/examples/radiogroup_example_L.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page).first()).toBeChecked();
      await expect(locators.radios(page).first()).toBeFocused();
    });

    if (browserName !== 'webkit') {
      await test.step('Verify focus and selection changes by Up/Down arrows', async () => {
        await page.keyboard.press('ArrowUp');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
        await expect(locators.radios(page).nth(2)).toBeChecked();
        await expect(locators.radios(page).nth(2)).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
        await expect(locators.radios(page).nth(1)).toBeChecked();
        await expect(locators.radios(page).nth(1)).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
        await expect(locators.radios(page).first()).toBeChecked();
        await expect(locators.radios(page).first()).toBeFocused();
      });

      await test.step('Verify focus and selection changes by Left/Right arrows', async () => {
        await page.keyboard.press('ArrowLeft');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
        await expect(locators.radios(page).nth(2)).toBeChecked();
        await expect(locators.radios(page).nth(2)).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
        await expect(locators.radios(page).nth(1)).toBeChecked();
        await expect(locators.radios(page).nth(1)).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
        await expect(locators.radios(page).first()).toBeChecked();
        await expect(locators.radios(page).first()).toBeFocused();
      });
    } else {
      await test.step('Verify focus and selection changes by Up/Down arrows', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
        await expect(locators.radios(page).nth(2)).toBeChecked();
        await expect(locators.radios(page).nth(2)).toBeFocused();
      });

      await test.step('Verify focus and selection changes by Left/Right arrows', async () => {
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowLeft');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
        await expect(locators.radios(page).first()).toBeChecked();
        await expect(locators.radios(page).first()).toBeFocused();
      });
    }
  });

  test('Verify actions when interactive element in text', async ({ page, browserName }) => {
    const standPath = 'stories/components/radio/tests/examples/radiogroup_example_with_link.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page).first()).toBeChecked();
      await expect(locators.radios(page).first()).toBeFocused();
    });

    await test.step('Verify tab focuses next interactive element', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(page.locator('[data-testid="link1"]')).toBeFocused();
    });

    await test.step('Verify tab focuses next interactive element', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page).first()).toBeChecked();
      await expect(page.locator('[data-testid="link2"]')).toBeFocused();
    });

    await test.step('Verify shift+tab focuses radio', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page).first()).toBeChecked();
      await expect(locators.radios(page).first()).toBeFocused();
    });
  });
});

test.describe('Visual - Radio with Additional input props', () => {
  test('Verify styles for m size', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/additional_props_for_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const radios = page.locator('[data-ui-name="Radio"]');
    const count = await radios.count();

    for (let i = 0; i < count; i++) {
      const radio = radios.nth(i);
      const mark = radio.locator('[data-ui-name="Value.RadioMark"]');
      const labelText = radio.locator('span[data-ui-name="Radio.Text"]');

      const radioMarginBottom = await radio.evaluate((el) => getComputedStyle(el).marginBottom);
      expect(radioMarginBottom).toBe('12px');
      const markWidth = await mark.evaluate((el) => getComputedStyle(el).width);
      const markHeight = await mark.evaluate((el) => getComputedStyle(el).height);
      expect(markWidth).toBe('16px');
      expect(markHeight).toBe('16px');

      const styles = await labelText.evaluate((el) => {
        const s = getComputedStyle(el);
        return { fontSize: s.fontSize, marginleft: s.marginLeft };
      });
      // Например, ожидаем 14px и какой-то цвет
      expect(styles.fontSize).toBe('14px');
      expect(styles.marginleft).toBe('8px');
    }
  });

  test('Verify styles for l size', async ({ page }) => {
    const standPath = 'stories/components/radio/tests/examples/additional_props_for_input_L.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const radios = page.locator('[data-ui-name="Radio"]');
    const count = await radios.count();

    for (let i = 0; i < count; i++) {
      const radio = radios.nth(i);
      const input = radio.locator('input[data-ui-name="Radio.Value"]');
      const mark = radio.locator('[data-ui-name="Value.RadioMark"]');
      const labelText = radio.locator('span[data-ui-name="Radio.Text"]');

      const radioMarginBottom = await radio.evaluate((el) => getComputedStyle(el).marginBottom);
      expect(radioMarginBottom).toBe('12px');
      const markWidth = await mark.evaluate((el) => getComputedStyle(el).width);
      const markHeight = await mark.evaluate((el) => getComputedStyle(el).height);
      expect(markWidth).toBe('20px');
      expect(markHeight).toBe('20px');

      if (i === 2) await expect(input).toHaveAttribute('aria-invalid', 'true');
      const styles = await labelText.evaluate((el) => {
        const s = getComputedStyle(el);
        return { fontSize: s.fontSize, marginleft: s.marginLeft };
      });
      expect(styles.fontSize).toBe('16px');
      expect(styles.marginleft).toBe('8px');
    }
  });

  test('Verify all states and sizes', async ({ page }) => {
    const standPath = 'stories/components/radio/tests/examples/checked-and-focused-states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Verify Additional props in input example', async ({ page, browserName }) => {
    const standPath = 'stories/components/radio/tests/examples/additional_props_for_input_L.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Functional - Radio with Additional input props', () => {
  test('Verify roles and attributes for radio with Additional input props', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/additional_props_for_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const count = await locators.radios(page).count();

    for (let i = 0; i < count; i++) {
      const radio = locators.radios(page).nth(i);
      const mark = page.locator('[data-ui-name="Value.RadioMark"]').nth(i);

      await expect(radio).toHaveAttribute('aria-invalid', 'false');
      await expect(radio).toHaveAttribute('name', 'radio');

      await expect(radio).not.toBeChecked();

      await expect(mark).toHaveAttribute('aria-hidden', 'true');
    }
  });

  test('Verify mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/radio/docs/examples/additional_props_for_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify pre checked value works', async () => {
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page).first()).not.toBeChecked();
    });

    await test.step('Verify checking works by clicking on checkmart', async () => {
      page.locator('label').filter({ hasText: 'Second value' }).locator('div').click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
      await expect(locators.radios(page).nth(1)).toBeChecked();
    });

    await test.step('Verify checking works by clicking on radio text', async () => {
      page.locator('[data-ui-name="Radio.Text"]').first().click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page).nth(0)).toBeChecked();
    });

    await test.step('Verify keyboard interactions work after mouse', async () => {
      if (browserName === 'firefox') {
        // BUG!
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
      } else await page.keyboard.press('ArrowDown');

      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');

      await expect(locators.radios(page).nth(1)).toBeChecked();
      await expect(locators.radios(page).nth(1)).toBeFocused();
    });
  });

  test('Verify keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/radio/tests/examples/additional_props_for_input_L.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page).first()).not.toBeChecked();
      await expect(locators.radios(page).first()).toBeFocused();
    });

    if (browserName !== 'firefox') {
      await test.step('Verify focus and selection changes by Up/Down arrows', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
        await expect(locators.radios(page).nth(2)).toBeChecked();
        await expect(locators.radios(page).nth(2)).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
        await expect(locators.radios(page).nth(1)).toBeChecked();
        await expect(locators.radios(page).nth(1)).toBeFocused();
      });

      await test.step('Verify focus and selection changes by Left/Right arrows', async () => {
        await page.keyboard.press('ArrowRight');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
        await expect(locators.radios(page).nth(2)).toBeChecked();
        await expect(locators.radios(page).nth(2)).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
        await expect(locators.radios(page).nth(1)).toBeChecked();
        await expect(locators.radios(page).nth(1)).toBeFocused();
      });
    } else {
      await test.step('Verify focus and selection changes in Firefox', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
        await expect(locators.radios(page).nth(1)).not.toBeChecked();
        await expect(locators.radios(page).nth(1)).toBeFocused();

        await page.keyboard.press('Enter');
        await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
        await expect(locators.radios(page).nth(1)).not.toBeChecked();
        await expect(locators.radios(page).nth(1)).toBeFocused();

        await page.keyboard.press('Space');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
        await expect(locators.radios(page).nth(1)).toBeChecked();
        await expect(locators.radios(page).nth(1)).toBeFocused();
      });
    }
  });

  test('Verify actions when interactive element in text', async ({ page, browserName }) => {
    const standPath =
      'stories/components/radio/tests/examples/additional_props_for_input_tooltip.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page).first()).not.toBeChecked();
      await expect(locators.radios(page).first()).toBeFocused();
    });

    await test.step('Verify tab focuses next interactive element', async () => {
      if (browserName === 'firefox') {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
      } else await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
      await expect(locators.radios(page).first()).not.toBeChecked();
      await expect(locators.radios(page).nth(2)).not.toBeChecked();
      await expect(locators.radios(page).nth(2)).not.toBeFocused();
    });

    await test.step('Verify enter activates interactive element not not checks radio ', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page).nth(2)).not.toBeChecked();
      await expect(locators.radios(page).nth(2)).not.toBeFocused();

      await page.keyboard.press('Escape');
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
      await expect(locators.radios(page).nth(2)).not.toBeChecked();
    });
  });
});

test.describe('Vusual - Radio and Select pattern', () => {
  test('Verify Radio and Select Ux pattern', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/radio-and-select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await locators.options(page).first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional - Radio and Select pattern', () => {
  test('Verify Radio and Select UX pattern keyboard interactions', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/radio-and-select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(locators.radioGroup(page)).toHaveAttribute('value', 'all');
    await page.keyboard.press('Tab');
    await expect(locators.radios(page).first()).toBeFocused();
    await expect(locators.radios(page).first()).toHaveAttribute('checked');

    await page.keyboard.press('Tab');
    await expect(locators.selectTrigger(page)).toBeFocused();
    await page.keyboard.press('Space');
    await page.getByText('500').waitFor({ state: 'visible' });
    await expect(locators.options(page).first()).toHaveClass(/highlighted/);

    await page.keyboard.press('ArrowDown');
    await expect(locators.options(page).nth(1)).toHaveClass(/highlighted/);

    await page.keyboard.press('Space');
    await locators.options(page).first().waitFor({ state: 'hidden' });

    await expect(locators.selectTrigger(page)).toHaveAttribute('value', '500');
    await expect(locators.radioGroup(page)).toHaveAttribute('value', 'first');
    await expect(locators.radios(page).nth(2)).toBeChecked();
    await page.keyboard.press('Shift+Tab');
    await expect(locators.radios(page).nth(2)).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(locators.button(page, 'Export')).toBeFocused();
  });

  test('Verify Radio and Select UX pattern mouse interactions', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/radio-and-select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(locators.radioGroup(page)).toHaveAttribute('value', 'all');
    await expect(locators.radios(page).first()).toHaveAttribute('checked');

    await locators.selectTrigger(page).click();
    await page.getByText('500').waitFor({ state: 'visible' });
    await expect(locators.options(page).first()).toHaveClass(/selected/);

    await locators.options(page).nth(1).click();

    await locators.options(page).first().waitFor({ state: 'hidden' });

    await expect(locators.selectTrigger(page)).toHaveAttribute('value', '500');
    await expect(locators.radioGroup(page)).toHaveAttribute('value', 'first');
    await expect(locators.radios(page).nth(2)).toBeChecked();
  });
});
