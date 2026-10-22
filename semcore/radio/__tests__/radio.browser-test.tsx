import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  radios: (page: Page, index?: number) => {
    const base = page.getByRole('radio');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  radio: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Radio"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  radioMark: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Value.RadioMark"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  radioText: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Radio.Text"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  radioGroup: (page: Page, index?: number) => {
    const base = page.getByRole('group');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

const sizeStyles = {
  m: { mark: '16px', fontSize: '14px', textMargin: '6px' },
  l: { mark: '20px', fontSize: '16px', textMargin: '8px' },
};

const expectSizeStyles = async (page: Page, size: 'm' | 'l', { withTextMargin }: { withTextMargin: boolean }) => {
  const styles = sizeStyles[size];
  await expect(locators.radioMark(page, 0)).toHaveCSS('width', styles.mark);
  await expect(locators.radioMark(page, 0)).toHaveCSS('height', styles.mark);
  await expect(locators.radioText(page, 0)).toHaveCSS('font-size', styles.fontSize);
  if (withTextMargin) {
    await expect(locators.radioText(page, 0)).toHaveCSS('margin-left', styles.textMargin);
  }
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Verify RadioGroup and Radio prop combinations', () => {
    const variables = [
      { size: 'm', theme: undefined, disabled: false },
      { size: 'm', theme: 'yellow-400', disabled: true },
      { size: 'l', theme: undefined, disabled: false },
      { size: 'l', theme: 'yellow-400', disabled: true },
    ] as const;
    variables.forEach((item) => {
      test(`Verify RadioGroup size ${item.size}, theme ${item.theme}, disabled ${item.disabled}`, {
        tag: [TAG.PRIORITY_HIGH, '@radio', '@base-components', '@flex-box', '@typography'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/radio/docs/examples/radiogroup_example.tsx', 'en', item);

        await expect(page).toHaveScreenshot();
        if (!item.disabled) {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Enter');
          await expect(page).toHaveScreenshot();
        }

        const enabledStep = item.disabled ? test.step.skip : test.step;
        await enabledStep(`Verify Radio size ${item.size} styles`, async () => {
          await expectSizeStyles(page, item.size, { withTextMargin: true });
        });

        await test.step('Verify Radio disabled state', async () => {
          await expect(locators.radios(page, 0)).toBeEnabled({ enabled: !item.disabled });
        });
      });

      test(`Verify RadioGroup with additional props size ${item.size}, theme ${item.theme}, disabled ${item.disabled}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@radio'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/radio/docs/examples/additional_props_for_input.tsx', 'en', item);

        await expect(page).toHaveScreenshot();
        if (!item.disabled) {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot();
        }

        await test.step('Verify RadioGroup disabled state', async () => {
          await expect(locators.radios(page, 0)).toBeEnabled({ enabled: !item.disabled });
        });
      });
    });
  });

  test.describe('Verify Radio prop combinations', () => {
    const variables = [
      { size: 'm', state: 'normal', disabled: false, checked: false },
      { size: 'm', state: 'invalid', disabled: false, checked: true },
      { size: 'm', state: 'normal', disabled: true, checked: true },
      { size: 'l', state: 'normal', disabled: false, checked: false },
      { size: 'l', state: 'invalid', disabled: false, checked: true },
      { size: 'l', state: 'normal', disabled: true, checked: false },
    ] as const;
    variables.forEach((item) => {
      const priority = item.disabled && item.size === 'l' ? TAG.PRIORITY_MEDIUM : TAG.PRIORITY_HIGH;
      test(`Verify Radio size ${item.size}, state ${item.state}, disabled ${item.disabled}, checked ${item.checked}`, {
        tag: [priority, '@radio', '@base-components', '@flex-box'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/radio/tests/examples/radio-props.tsx', 'en', item);

        await expect(page).toHaveScreenshot();
        if (!item.disabled) {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot();
        }

        const baseCaseStep = !item.disabled && item.state === 'normal' && !item.checked ? test.step : test.step.skip;
        await baseCaseStep(`Verify Radio size ${item.size} styles`, async () => {
          await expectSizeStyles(page, item.size, { withTextMargin: false });
        });

        await test.step('Verify Radio disabled, checked and invalid states', async () => {
          const radioInput = locators.radios(page, 0);
          await expect(radioInput).toBeEnabled({ enabled: !item.disabled });
          await expect(radioInput).toBeChecked({ checked: item.checked });
          await expect(radioInput).toHaveAttribute('aria-invalid', String(item.state === 'invalid'));
        });
      });
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify mouse interactions for radio with group', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@radio', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio/docs/examples/radiogroup_example.tsx', 'en');

    await test.step('Verify pre checked value works', async () => {
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
    });

    await test.step('Verify checking works by clicking on checkmark', async () => {
      await page.locator('label').filter({ hasText: 'Beagle' }).locator('div').click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
      await expect(locators.radios(page, 2)).toBeChecked();
    });

    await test.step('Verify checking works by clicking on text', async () => {
      await locators.radioText(page, 1).click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
      await expect(locators.radios(page, 1)).toBeChecked();
    });

    await test.step('Verify keyboard interactions work after mouse', async () => {
      await page.keyboard.press('ArrowDown');

      await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
      await expect(locators.radios(page, 2)).toBeChecked();
      await expect(locators.radios(page, 2)).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();
    });
  });

  test('Verify keyboard interactions for radio with group', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio', '@base-components', '@flex-box', '@typography'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/radio/docs/examples/radiogroup_example.tsx', 'en');

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();
    });

    const wrapStep = browserName === 'webkit' ? test.step.skip : test.step;
    const webkitStep = browserName === 'webkit' ? test.step : test.step.skip;

    await wrapStep('Verify focus and selection changes by Up/Down arrows', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
      await expect(locators.radios(page, 2)).toBeChecked();
      await expect(locators.radios(page, 2)).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
      await expect(locators.radios(page, 1)).toBeChecked();
      await expect(locators.radios(page, 1)).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();
    });

    await wrapStep('Verify focus and selection changes by Left/Right arrows', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
      await expect(locators.radios(page, 2)).toBeChecked();
      await expect(locators.radios(page, 2)).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
      await expect(locators.radios(page, 1)).toBeChecked();
      await expect(locators.radios(page, 1)).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();
    });

    await webkitStep('Verify focus and selection changes by Up/Down arrows without wrap (webkit)', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
      await expect(locators.radios(page, 2)).toBeChecked();
      await expect(locators.radios(page, 2)).toBeFocused();
    });

    await webkitStep('Verify focus and selection changes by Left/Right arrows without wrap (webkit)', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();
    });
  });

  test('Verify actions when interactive element in text', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio', '@base-components', '@flex-box', '@link', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio/tests/examples/radiogroup_example_with_link.tsx', 'en');

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();
    });

    await test.step('Verify tab focuses first link', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(page.locator('[data-testid="link1"]')).toBeFocused();
    });

    await test.step('Verify tab focuses second link', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(page.locator('[data-testid="link2"]')).toBeFocused();
    });

    await test.step('Verify shift+tab focuses radio', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();
    });
  });

  test('Verify mouse interactions with additional props', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@radio'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio/docs/examples/additional_props_for_input.tsx', 'en');

    await test.step('Verify pre checked value works', async () => {
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page, 0)).not.toBeChecked();
    });

    await test.step('Verify checking works by clicking on checkmark', async () => {
      await page.locator('label').filter({ hasText: 'Second value' }).locator('div').click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
      await expect(locators.radios(page, 1)).toBeChecked();
    });

    await test.step('Verify checking works by clicking on radio text', async () => {
      await locators.radioText(page, 0).click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
    });

    await test.step('Verify keyboard interactions work after mouse', async () => {
      await page.keyboard.press('ArrowDown');

      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');

      await expect(locators.radios(page, 1)).toBeChecked();
      await expect(locators.radios(page, 1)).toBeFocused();
    });
  });

  test('Verify keyboard interactions with additional props', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio'],
  }, async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Tab does not focus radio when "Press Tab to highlight each item on a webpage" is disabled');
    await loadPage(page, 'stories/components/radio/docs/examples/additional_props_for_input.tsx', 'en');

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page, 0)).not.toBeChecked();

      await expect(locators.radios(page, 0)).toBeFocused();
    });

    const arrowsStep = browserName === 'firefox' ? test.step.skip : test.step;
    const firefoxStep = browserName === 'firefox' ? test.step : test.step.skip;

    await arrowsStep('Verify focus and selection changes by Up/Down arrows', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
      await expect(locators.radios(page, 1)).toBeChecked();
      await expect(locators.radios(page, 1)).toBeFocused();
    });

    await arrowsStep('Verify focus and selection changes by Left/Right arrows', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
      await expect(locators.radios(page, 1)).toBeChecked();
      await expect(locators.radios(page, 1)).toBeFocused();
    });

    await firefoxStep('Verify Enter does not check and Space checks radio (firefox)', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page, 0)).not.toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();

      await page.keyboard.press('Enter');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page, 0)).not.toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();

      await page.keyboard.press('Space');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();
    });
  });

  test('Verify actions when interactive element in text with tooltip', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@radio', '@button-link', '@link', '@tooltip', '@description-tooltip', '@typography',
      '@button'],
  }, async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Tab does not focus radio when "Press Tab to highlight each item on a webpage" is disabled');
    await loadPage(page, 'stories/components/radio/tests/examples/additional_props_for_input_tooltip.tsx', 'en');

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page, 0)).not.toBeChecked();

      await expect(locators.radios(page, 0)).toBeFocused();
    });

    await test.step('Verify tab focuses description tooltip trigger', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
      await expect(locators.radios(page, 0)).not.toBeChecked();
      await expect(locators.radios(page, 2)).not.toBeChecked();
      await expect(locators.radios(page, 2)).not.toBeFocused();
    });

    await test.step('Verify Enter activates interactive element and does not check radio', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page, 2)).not.toBeChecked();
      await expect(locators.radios(page, 2)).not.toBeFocused();

      await page.keyboard.press('Escape');
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
      await expect(locators.radios(page, 2)).not.toBeChecked();
    });
  });
});
