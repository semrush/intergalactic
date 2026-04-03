import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { checkBackgroundColor, checkBorderColor, locators } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    // Normal
    { size: 'm', state: 'normal', active: false, empty: false, placeholder: 'Placeholder', disabled: false },
    { size: 'm', state: 'normal', active: true, empty: true, placeholder: 'Placeholder', disabled: false },

    // Valid
    { size: 'm', state: 'valid', active: true, empty: false, placeholder: undefined, disabled: false },
    { size: 'l', state: 'valid', active: false, empty: true, placeholder: 'Placeholder', disabled: false },

    // Invalid
    { size: 'm', state: 'invalid', active: false, empty: false, placeholder: undefined, disabled: false },
    { size: 'l', state: 'invalid', active: true, empty: true, placeholder: 'Placeholder', disabled: false },

    // Disabled
    { size: 'm', state: 'normal', active: false, empty: false, placeholder: undefined, disabled: true },
    { size: 'l', state: 'valid', active: true, empty: true, placeholder: 'Placeholder', disabled: true },
    { size: 'm', state: 'invalid', active: true, empty: false, placeholder: undefined, disabled: true },

  ];

  variables.forEach((item) => {
    test(`Verify Base case size=${item.size} disabled=${item.disabled}  state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/base-trigger/base.tsx', 'en', item);

      await test.step('Base background check', async () => {
        await checkBackgroundColor(page, locators.button(page), 'rgb(255, 255, 255)');
      });

      if (item.state === 'normal' && !item.disabled) {
        await test.step('Normal/Active styles', async () => {
          await expect(locators.button(page)).toHaveAttribute('tabindex', '0');
          if (item.empty && item.placeholder !== undefined) {
            const placeholderElement = page.locator('[data-ui-name="BaseTrigger.Text"][placeholder]').first();
            await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
          }
          if (item.active) {
            await checkBorderColor(page, locators.button(page), 'rgb(0, 109, 202)');
          } else {
            await checkBorderColor(page, locators.button(page), 'rgb(196, 199, 207)');
          }
          await page.keyboard.press('Tab');
          await locators.button(page).hover();
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          await expect(locators.button(page)).toHaveAttribute('tabindex', '0');
          await page.keyboard.press('Tab');
          await expect(locators.button(page)).not.toBeFocused();
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }

      if (item.state === 'valid' && !item.disabled) {
        await test.step('Valid state styles', async () => {
          await checkBorderColor(page, locators.button(page), 'rgb(0, 124, 101)');
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }

      if (item.state === 'invalid' && !item.disabled) {
        await test.step('Invalid state styles', async () => {
          await checkBorderColor(page, locators.button(page), 'rgb(209, 0, 47)');
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-lstate:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }
    });

    test(`Verify With addons case size=${item.size} disabled=${item.disabled}  state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/base-trigger/with-addons.tsx', 'en', item);

      const buttons = await locators.button(page).all();

      await test.step('Base background check', async () => {
        for (const button of buttons) {
          await checkBackgroundColor(page, button, 'rgb(255, 255, 255)');
        }
      });

      if (item.state === 'normal' && !item.disabled) {
        await test.step('Normal/Active styles', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = page.locator('[data-ui-name="BaseTrigger.Text"][placeholder]').first();
              await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
            }
            if (item.active) {
              await checkBorderColor(page, button, 'rgb(0, 109, 202)');
            } else {
              await checkBorderColor(page, button, 'rgb(196, 199, 207)');
            }
          }
          await locators.button(page).nth(1).hover();

          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`with-addons-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}}.png`);
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
            await page.keyboard.press('Tab');
            await expect(button).not.toBeFocused();
          }
        });
      }

      if (item.state === 'valid' && !item.disabled) {
        await test.step('Valid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(0, 124, 101)');
          }
        });
      }

      if (item.state === 'invalid' && !item.disabled) {
        await test.step('Invalid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(209, 0, 47)');
          }
        });
      }
    });

    test(`Verify Neighbor Location case size=${item.size} disabled=${item.disabled} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger',
        '@base-components',
        '@neighbor-location'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/base-trigger/neighbor-location.tsx', 'en', item);

      const buttons = await locators.button(page).all();

      await test.step('Base background check', async () => {
        for (const button of buttons) {
          await checkBackgroundColor(page, button, 'rgb(255, 255, 255)');
        }
      });

      if (item.state === 'normal' && !item.disabled) {
        await test.step('Normal/Active styles', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = page.locator('[data-ui-name="BaseTrigger.Text"][placeholder]').first();
              await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
            }
            if (item.active) {
              await checkBorderColor(page, button, 'rgb(0, 109, 202)');
            } else {
              await checkBorderColor(page, button, 'rgb(196, 199, 207)');
            }
          }
          await locators.button(page).nth(1).hover();
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`neighbor-location-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
            await page.keyboard.press('Tab');
            await expect(button).not.toBeFocused();
          }
        });
      }

      if (item.state === 'valid' && !item.disabled) {
        await test.step('Valid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(0, 124, 101)');
          }
        });
      }

      if (item.state === 'invalid' && !item.disabled) {
        await test.step('Invalid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, 'rgb(209, 0, 47)');
          }
        });
      }
    });

    test(`Verify Base Trigger for Select or DD menu case size=${item.size} disabled=${item.disabled} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger',
        '@dropdown',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/base-trigger/with-select-and-dd-menu.tsx', 'en', item);

      const triggers = await locators.trigger(page).all();

      await test.step('Base background check', async () => {
        for (const button of triggers) {
          await checkBackgroundColor(page, button, 'rgb(255, 255, 255)');
        }
        await expect(page).toHaveScreenshot(`triggers-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
      });

      if (item.state === 'normal' && !item.disabled) {
        await test.step('Normal/Active styles', async () => {
          for (const button of triggers) {
            await expect(button).toHaveAttribute('tabindex', '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = page.locator('[data-ui-name="BaseTrigger.Text"][placeholder]').first();
              await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
            }
            if (item.active) {
              await checkBorderColor(page, button, 'rgb(0, 109, 202)');
            } else {
              await checkBorderColor(page, button, 'rgb(196, 199, 207)');
            }
          }
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          for (const button of triggers) {
            await expect(button).toHaveAttribute('tabindex', '0');
            await page.keyboard.press('Tab');
            await expect(button).not.toBeFocused();
          }
        });
      }

      if (item.state === 'valid' && !item.disabled) {
        await test.step('Valid state styles', async () => {
          for (const button of triggers) {
            await checkBorderColor(page, button, 'rgb(0, 124, 101)');
          }
        });
      }

      if (item.state === 'invalid' && !item.disabled) {
        await test.step('Invalid state styles', async () => {
          for (const button of triggers) {
            await checkBorderColor(page, button, 'rgb(209, 0, 47)');
          }
        });
      }
    });
  });

  test('Verify ellipsis in Base trigger and few tags', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-trigger',
      '@dropdown-menu',
      '@ellipsis',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/advanced/examples/base-trigger-ellipsis.tsx', 'en');

    await locators.button(page).nth(1).hover();
    await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
    await page.waitForFunction(
      () => {
        const el = document.querySelector('[data-ui-name="Hint"]');
        return el && getComputedStyle(el).opacity === '1';
      },
    );
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify navigation and changing values by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@base-trigger',
      '@dropdown',
      '@select',
      '@divider',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/tests/examples/base-trigger/base-trigger.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.trigger(page).first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await locators.options(page, 'One').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'One')).toHaveClass(/highlighted/);

    await page.keyboard.press('Escape');
    await locators.options(page, 'One').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.options(page, 'One').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'One')).toHaveClass(/highlighted/);

    await page.keyboard.press('Space');
    await locators.options(page, 'One').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).toBeFocused();
    await expect(locators.trigger(page).first()).toHaveAttribute('value', 'One');
  });

  test('Verify navigation and changing values by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@base-trigger',
      '@dropdown',
      '@select',
      '@divider',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/tests/examples/base-trigger/base-trigger.tsx', 'en');

    await locators.trigger(page).first().click();
    const initialWidth = await locators.trigger(page).first().boundingBox().then((b) => b?.width || 0);
    await locators.options(page, 'One').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'One')).not.toHaveClass(/highlighted/);
    await locators.trigger(page).first().click();
    await locators.options(page, 'One').waitFor({ state: 'hidden' });
    await locators.trigger(page).first().click();
    await locators.options(page, 'One').waitFor({ state: 'visible' });

    await locators.options(page, 'One').click();
    await locators.options(page, 'One').waitFor({ state: 'hidden' });
    await expect(page.locator('[id="device-button-select"]')).toHaveAttribute('value', 'One');
    const finalWidth = await locators.trigger(page).first().boundingBox().then((b) => b?.width || 0);
    expect(finalWidth).toBeLessThan(initialWidth);
  });

  test('Verify navigation and changing values by mouse AND keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@base-trigger',
      '@dropdown',
      '@select',
      '@divider',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/tests/examples/base-trigger/base-trigger.tsx', 'en');

    await locators.trigger(page).first().click();
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(locators.options(page, 'Desktop')).toHaveClass(/highlighted/);

    await locators.trigger(page).first().click();
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).not.toHaveAttribute('value', 'Desktop');

    await locators.trigger(page).first().click();
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });
    await locators.options(page, 'Desktop').click();
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).toHaveAttribute('value', 'Desktop');
  });

  test('Verify ellipsis in Base trigger and few tags', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@base-trigger',
      '@dropdown-menu',
      '@ellipsis',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/advanced/examples/base-trigger-ellipsis.tsx', 'en');

    const triggerText = page.locator('[data-ui-name="BaseTrigger.Text"]').first();
    const tagNameButton = await locators.button(page).first().evaluate((el) => el.tagName.toLowerCase());
    expect(tagNameButton).toBe('h1');
    const tagNameText = await triggerText.evaluate((el) => el.tagName.toLowerCase());
    expect(tagNameText).toBe('h2');

    await page.keyboard.press('Tab');
    await expect(page.locator(`[data-ui-name="Hint"]`)).toHaveCount(0);

    await locators.button(page).nth(1).hover();
    await page.locator(`[data-ui-name="Hint"]`).waitFor({ state: 'visible' });
    await expect(page.locator(`[data-ui-name="Hint"]`)).toHaveCount(1);
  });
});
