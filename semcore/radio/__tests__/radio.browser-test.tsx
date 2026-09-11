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
  textLabel: (page: Page, text: string) => page.locator('label', { hasText: text }),
  status: (page: Page, index?: number) => {
    const base = page.getByRole('status');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  radioGroup: (page: Page, index?: number) => {
    const base = page.getByRole('group');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  options: (page: Page, index?: number) => {
    const base = page.getByRole('option');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  selectTrigger: (page: Page, index?: number) => {
    const base = page.getByRole('combobox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, text: string) => page.locator('button', { hasText: text }),
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
    ];
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

        // Only verify styles for enabled state to avoid redundant checks
        if (!item.disabled) {
          const radio_m = page.locator('[data-ui-name="Radio"][class*="size_m"]');
          const radio_l = page.locator('[data-ui-name="Radio"][class*="size_l"]');

          if (item.size === 'm') {
            await test.step('Verify Radio size m styles', async () => {
              const count = await radio_m.count();
              if (count > 0) {
                const mark = radio_m.first().locator('[data-ui-name="Value.RadioMark"]');
                const labelText = radio_m.first().locator('[data-ui-name="Radio.Text"]');

                const markWidth = await mark.evaluate((el) => getComputedStyle(el).width);
                const markHeight = await mark.evaluate((el) => getComputedStyle(el).height);
                expect(markWidth).toBe('16px');
                expect(markHeight).toBe('16px');

                const styles = await labelText.evaluate((el) => {
                  const s = getComputedStyle(el);
                  return { fontSize: s.fontSize, marginLeft: s.marginLeft };
                });
                expect(styles.fontSize).toBe('14px');
                expect(styles.marginLeft).toBe('6px');
              }
            });
          } else {
            await test.step('Verify Radio size l styles', async () => {
              const count = await radio_l.count();
              if (count > 0) {
                const mark = radio_l.first().locator('[data-ui-name="Value.RadioMark"]');
                const labelText = radio_l.first().locator('[data-ui-name="Radio.Text"]');

                const markWidth = await mark.evaluate((el) => getComputedStyle(el).width);
                const markHeight = await mark.evaluate((el) => getComputedStyle(el).height);
                expect(markWidth).toBe('20px');
                expect(markHeight).toBe('20px');

                const styles = await labelText.evaluate((el) => {
                  const s = getComputedStyle(el);
                  return { fontSize: s.fontSize, marginLeft: s.marginLeft };
                });
                expect(styles.fontSize).toBe('16px');
                expect(styles.marginLeft).toBe('8px');
              }
            });
          }
        }

        await test.step('Verify Radio disabled state', async () => {
          const radioInput = locators.radios(page, 0);
          if (item.disabled) {
            await expect(radioInput).toBeDisabled();
          } else {
            await expect(radioInput).not.toBeDisabled();
          }
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
          const radioInput = locators.radios(page, 0);

          if (item.disabled) {
            await expect(radioInput).toBeDisabled();
          } else {
            await expect(radioInput).not.toBeDisabled();
          }
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
    ];
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

        // Only verify styles for one enabled example per size to avoid redundant checks
        if (!item.disabled && item.state === 'normal' && !item.checked) {
          const radio_m = page.locator('[data-ui-name="Radio"][class*="size_m"]');
          const radio_l = page.locator('[data-ui-name="Radio"][class*="size_l"]');

          if (item.size === 'm') {
            await test.step('Verify Radio size m styles', async () => {
              const count = await radio_m.count();
              if (count > 0) {
                const mark = radio_m.first().locator('[data-ui-name="Value.RadioMark"]');
                const labelText = radio_m.first().locator('[data-ui-name="Radio.Text"]');

                const markWidth = await mark.evaluate((el) => getComputedStyle(el).width);
                const markHeight = await mark.evaluate((el) => getComputedStyle(el).height);
                expect(markWidth).toBe('16px');
                expect(markHeight).toBe('16px');

                const styles = await labelText.evaluate((el) => {
                  const s = getComputedStyle(el);
                  return { fontSize: s.fontSize, marginLeft: s.marginLeft };
                });
                expect(styles.fontSize).toBe('14px');
                expect(styles.marginLeft).toBe('6px');
              }
            });
          } else {
            await test.step('Verify Radio size l styles', async () => {
              const count = await radio_l.count();
              if (count > 0) {
                const mark = radio_l.first().locator('[data-ui-name="Value.RadioMark"]');
                const labelText = radio_l.first().locator('[data-ui-name="Radio.Text"]');

                const markWidth = await mark.evaluate((el) => getComputedStyle(el).width);
                const markHeight = await mark.evaluate((el) => getComputedStyle(el).height);
                expect(markWidth).toBe('20px');
                expect(markHeight).toBe('20px');

                const styles = await labelText.evaluate((el) => {
                  const s = getComputedStyle(el);
                  return { fontSize: s.fontSize, marginLeft: s.marginLeft };
                });
                expect(styles.fontSize).toBe('16px');
                expect(styles.marginLeft).toBe('8px');
              }
            });
          }
        }

        await test.step('Verify Radio disabled and checked states', async () => {
          const radioInput = locators.radios(page, 0);

          if (item.disabled) {
            await expect(radioInput).toBeDisabled();
          } else {
            await expect(radioInput).not.toBeDisabled();
          }

          if (item.checked) {
            await expect(radioInput).toBeChecked();
          } else {
            await expect(radioInput).not.toBeChecked();
          }
        });

        await test.step('Verify Radio state attribute', async () => {
          const radioInput = locators.radios(page, 0);

          if (item.state === 'invalid') {
            await expect(radioInput).toHaveAttribute('aria-invalid', 'true');
          } else {
            await expect(radioInput).toHaveAttribute('aria-invalid', 'false');
          }
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
      page.locator('label').filter({ hasText: 'Beagle' }).locator('div').click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
      await expect(locators.radios(page, 2)).toBeChecked();
    });

    await test.step('Verify checking works by clicking on text', async () => {
      locators.radioText(page, 1).click();
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

    if (browserName !== 'webkit') {
      await test.step('Verify focus and selection changes by Up/Down arrows', async () => {
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

      await test.step('Verify focus and selection changes by Left/Right arrows', async () => {
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
    } else {
      await test.step('Verify focus and selection changes by Up/Down arrows', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '3');
        await expect(locators.radios(page, 2)).toBeChecked();
        await expect(locators.radios(page, 2)).toBeFocused();
      });

      await test.step('Verify focus and selection changes by Left/Right arrows', async () => {
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowLeft');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
        await expect(locators.radios(page, 0)).toBeChecked();
        await expect(locators.radios(page, 0)).toBeFocused();
      });
    }
  });

  test('Verify actions when interactive element in text', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio', '@base-components', '@flex-box', '@link', '@typography'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/radio/tests/examples/radiogroup_example_with_link.tsx', 'en');

    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(locators.radios(page, 0)).toBeChecked();
      await expect(locators.radios(page, 0)).toBeFocused();
    });

    await test.step('Verify tab focuses next interactive element', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
      await expect(page.locator('[data-testid="link1"]')).toBeFocused();
    });

    await test.step('Verify tab focuses next interactive element', async () => {
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
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/radio/docs/examples/additional_props_for_input.tsx', 'en');

    await test.step('Verify pre checked value works', async () => {
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page, 0)).not.toBeChecked();
    });

    await test.step('Verify checking works by clicking on checkmark', async () => {
      page.locator('label').filter({ hasText: 'Second value' }).locator('div').click();
      await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
      await expect(locators.radios(page, 1)).toBeChecked();
    });

    await test.step('Verify checking works by clicking on radio text', async () => {
      locators.radioText(page, 0).click();
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
    await loadPage(page, 'stories/components/radio/docs/examples/additional_props_for_input.tsx', 'en');
    if (browserName == 'webkit') test.skip(); // tab doesn work when setting 'Press Tab to highlight each item on a webpage' disabled
    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page, 0)).not.toBeChecked();

      await expect(locators.radios(page, 0)).toBeFocused();
    });

    if (browserName !== 'firefox') {
      await test.step('Verify focus and selection changes by Up/Down arrows', async () => {
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

      await test.step('Verify focus and selection changes by Left/Right arrows', async () => {
        await page.keyboard.press('ArrowRight');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '1');
        await expect(locators.radios(page, 0)).toBeChecked();
        await expect(locators.radios(page, 0)).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await expect(locators.radioGroup(page)).toHaveAttribute('value', '2');
        await expect(locators.radios(page, 1)).toBeChecked();
        await expect(locators.radios(page, 1)).toBeFocused();
      });
    } else {
      await test.step('Verify focus and selection changes in Firefox', async () => {
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
    }
  });

  test('Verify actions when interactive element in text with tooltip', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@radio', '@button-link', '@link', '@tooltip', '@description-tooltip', '@typography'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/radio/tests/examples/additional_props_for_input_tooltip.tsx', 'en');
    if (browserName == 'webkit') test.skip();
    await test.step('Verify tab focuses 1st radio', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(locators.radios(page, 0)).not.toBeChecked();

      await expect(locators.radios(page, 0)).toBeFocused();
    });

    await test.step('Verify tab focuses next interactive element', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(locators.radioGroup(page)).not.toHaveAttribute('value', '');
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]')).toBeFocused();
      await expect(locators.radios(page, 0)).not.toBeChecked();
      await expect(locators.radios(page, 2)).not.toBeChecked();
      await expect(locators.radios(page, 2)).not.toBeFocused();
    });

    await test.step('Verify enter activates interactive element not not checks radio ', async () => {
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
