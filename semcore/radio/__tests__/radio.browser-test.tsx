import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Radio with group', () => {
  test('Verify roles and attributes for radio with group', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/radiogroup_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const radioGroup = page.locator('[data-ui-name="RadioGroup"]');
    await expect(radioGroup).toHaveAttribute('role', 'group');
    await expect(radioGroup).toHaveAttribute('name', 'radio');
    await expect(radioGroup).toHaveAttribute('aria-labelledby', 'radioGroup');
    await expect(radioGroup).toHaveAttribute('value', '1');

    const radios = page.locator('[data-ui-name="Radio"]');
    const count = await radios.count();

    for (let i = 0; i < count; i++) {
      const radio = radios.nth(i);
      const input = radio.locator('input[data-ui-name="Radio.Value"]');
      const mark = radio.locator('[data-ui-name="Value.RadioMark"]');
      await expect(input).toHaveAttribute('type', 'radio');
      await expect(input).toHaveAttribute('name', 'radio');
      await expect(input).toHaveAttribute('aria-invalid', 'false');

      const value = await input.getAttribute('value');
      if (value === '1') {
        await expect(input).toBeChecked();
      } else {
        await expect(input).not.toBeChecked();
      }

      await expect(mark).toHaveAttribute('aria-hidden', 'true');
    }
  });

  test('Verify styles for m size', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/radiogroup_example.tsx';
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

  test('Verify all states and sizes: normal, invalid, disabled, checked etc', async ({ page }) => {
    const standPath = 'stories/components/radio/tests/examples/radiogroup_different_states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/radiogroup_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const radioGroup = page.locator('[data-ui-name="RadioGroup"]');
    const radios = page.locator('[data-ui-name="Radio"]');

    await test.step('Verify pre checked value works', async () => {
      await expect(radioGroup).toHaveAttribute('value', '1');
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]').first()).toBeChecked();
    });

    await test.step('Verify checking works by clicking on checkmart', async () => {
      page.locator('label').filter({ hasText: 'Beagle' }).locator('div').click();
      await expect(radioGroup).toHaveAttribute('value', '3');
      await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify checking works by clicking on checkmart', async () => {
      radios.nth(1).locator('[data-ui-name="Radio.Text"]').click();
      await expect(radioGroup).toHaveAttribute('value', '2');
      await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
    });

    await test.step('Verify keyboard interactions work after mouse', async () => {
      await page.keyboard.press('ArrowDown');

      await expect(radioGroup).toHaveAttribute('value', '3');
      await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
      await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(radioGroup).toHaveAttribute('value', '1');
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeChecked();
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeFocused();
      page.locator('label').filter({ hasText: 'Labrador Retriever' }).locator('div').hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/radio/tests/examples/radiogroup_example_L.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const radioGroup = page.locator('[data-ui-name="RadioGroup"]');
    const radios = page.locator('[data-ui-name="Radio"]');

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(radioGroup).toHaveAttribute('value', '1');
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeChecked();
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeFocused();
    });

    if (browserName !== 'webkit') {
      await test.step('Verify focus and selection changes by Up/Down arrows', async () => {
        await page.keyboard.press('ArrowUp');
        await expect(radioGroup).toHaveAttribute('value', '3');
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(radioGroup).toHaveAttribute('value', '2');
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(radioGroup).toHaveAttribute('value', '1');
        await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeFocused();
      });

      await test.step('Verify focus and selection changes by Left/Right arrows', async () => {
        await page.keyboard.press('ArrowLeft');
        await expect(radioGroup).toHaveAttribute('value', '3');
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(radioGroup).toHaveAttribute('value', '2');
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await expect(radioGroup).toHaveAttribute('value', '1');
        await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeFocused();
      });
    } else {
      await test.step('Verify focus and selection changes by Up/Down arrows', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(radioGroup).toHaveAttribute('value', '3');
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeFocused();
      });

      await test.step('Verify focus and selection changes by Left/Right arrows', async () => {
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowLeft');
        await expect(radioGroup).toHaveAttribute('value', '1');
        await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeFocused();
      });
    }
  });

  test('Verify actions when interactive element in text', async ({ page, browserName }) => {
    const standPath = 'stories/components/radio/tests/examples/radiogroup_example_with_link.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const radioGroup = page.locator('[data-ui-name="RadioGroup"]');
    const radios = page.locator('[data-ui-name="Radio"]');

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(radioGroup).toHaveAttribute('value', '1');
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeChecked();
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeFocused();
    });

    await test.step('Verify tab focuses next interactive element', async () => {
      await page.keyboard.press('Tab');
      await expect(radioGroup).toHaveAttribute('value', '1');
      await expect(page.locator('[data-testid="link1"]')).toBeFocused();
    });

    await test.step('Verify tab focuses next interactive element', async () => {
      await page.keyboard.press('Tab');
      await expect(radioGroup).toHaveAttribute('value', '1');
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeChecked();
      await expect(page.locator('[data-testid="link2"]')).toBeFocused();
    });

    await test.step('Verify shift+tab focuses radio', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(radioGroup).toHaveAttribute('value', '1');
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeChecked();
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeFocused();
    });
  });
});

test.describe('Radio with Additional input props', () => {
  test('Verify roles and attributes for radio with Additional input props', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/additional_props_for_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const radioGroup = page.locator('[data-ui-name="RadioGroup"]');
    await expect(radioGroup).toHaveAttribute('role', 'group');
    await expect(radioGroup).toHaveAttribute('aria-label', 'radiogroup with custom properties');
    await expect(radioGroup).not.toHaveAttribute('value', '');

    const radios = page.locator('[data-ui-name="Radio"]');
    const count = await radios.count();

    for (let i = 0; i < count; i++) {
      const radio = radios.nth(i);
      const input = radio.locator('input[data-ui-name="Radio.Value"]');
      const mark = radio.locator('[data-ui-name="Value.RadioMark"]');
      const labelText = radio.locator('span[data-ui-name="Radio.Text"]');

      await expect(input).toHaveAttribute('type', 'radio');
      await expect(input).toHaveAttribute('aria-invalid', 'false');

      await expect(input).not.toBeChecked();

      await expect(mark).toHaveAttribute('aria-hidden', 'true');
    }
  });

  test('Verify styles for m size', async ({ page }) => {
    const standPath = 'stories/components/radio/docs/examples/additional_props_for_input.tsx';
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

  test('Verify all states and sizes when checked and focused', async ({ page }) => {
    const standPath = 'stories/components/radio/tests/examples/checked-and-focused-states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Verify mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/radio/docs/examples/additional_props_for_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const radioGroup = page.locator('[data-ui-name="RadioGroup"]');
    const radios = page.locator('[data-ui-name="Radio"]');

    await test.step('Verify pre checked value works', async () => {
      await expect(radioGroup).not.toHaveAttribute('value', '');
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).not.toBeChecked();
    });

    await test.step('Verify checking works by clicking on checkmart', async () => {
      page.locator('label').filter({ hasText: 'Second value' }).locator('div').click();
      await expect(radioGroup).toHaveAttribute('value', '2');
      await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
    });

    await test.step('Verify checking works by clicking on radio text', async () => {
      radios.nth(0).locator('[data-ui-name="Radio.Text"]').click();
      await expect(radioGroup).toHaveAttribute('value', '1');
      await expect(radios.nth(0).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
    });

    await test.step('Verify keyboard interactions work after mouse', async () => {
      if (browserName === 'firefox') {
        // BUG!
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
      } else await page.keyboard.press('ArrowDown');

      await expect(radioGroup).toHaveAttribute('value', '2');

      await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
      await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeFocused();
    });
  });

  test('Verify keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/radio/tests/examples/additional_props_for_input_L.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const radioGroup = page.locator('[data-ui-name="RadioGroup"]');
    const radios = page.locator('[data-ui-name="Radio"]');

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
      await expect(radioGroup).not.toHaveAttribute('value', '');
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).not.toBeChecked();
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeFocused();
    });

    if (browserName !== 'firefox') {
      await test.step('Verify focus and selection changes by Up/Down arrows', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(radioGroup).toHaveAttribute('value', '3');
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(radioGroup).toHaveAttribute('value', '2');
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeFocused();
      });

      await test.step('Verify focus and selection changes by Left/Right arrows', async () => {
        await page.keyboard.press('ArrowRight');
        await expect(radioGroup).toHaveAttribute('value', '3');
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(radioGroup).toHaveAttribute('value', '2');
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeFocused();
      });
    } else {
      await test.step('Verify focus and selection changes in Firefox', async () => {
        await page.keyboard.press('Tab');
        await expect(radioGroup).not.toHaveAttribute('value', '');
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).not.toBeChecked();
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeFocused();

        await page.keyboard.press('Enter');
        await expect(radioGroup).not.toHaveAttribute('value', '');
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).not.toBeChecked();
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeFocused();

        await page.keyboard.press('Space');
        await expect(radioGroup).toHaveAttribute('value', '2');
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeChecked();
        await expect(radios.nth(1).locator('[data-ui-name="Radio.Value"]')).toBeFocused();
      });
    }
  });

  test('Verify actions when interactive element in text2', async ({ page, browserName }) => {
    const standPath =
      'stories/components/radio/tests/examples/additional_props_for_input_tooltip.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const radioGroup = page.locator('[data-ui-name="RadioGroup"]');
    const radios = page.locator('[data-ui-name="Radio"]');

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(radioGroup).not.toHaveAttribute('value', '');
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).not.toBeChecked();
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).toBeFocused();
    });

    await test.step('Verify tab focuses next interactive element', async () => {
      if (browserName === 'firefox') {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
      } else await page.keyboard.press('Tab');
      await expect(radioGroup).not.toHaveAttribute('value', '');
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
      await expect(radios.first().locator('[data-ui-name="Radio.Value"]')).not.toBeChecked();
      await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).not.toBeChecked();
      await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).not.toBeFocused();
    });

    await test.step('Verify enter activates interactive element not not checks radio ', async () => {
      await page.keyboard.press('Enter');
      await expect(radioGroup).not.toHaveAttribute('value', '');
      await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).not.toBeChecked();
      await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).not.toBeFocused();

      await page.keyboard.press('Escape');
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
      await expect(radios.nth(2).locator('[data-ui-name="Radio.Value"]')).not.toBeChecked();
    });
  });
});
