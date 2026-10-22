import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import {
  checkBackgroundColor,
  checkBorderColor,
  expectVisibleHintsCount,
  getTriggerColors,
  locators,
  waitForHint,
} from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    // Normal
    { size: 'm', state: 'normal', active: false, empty: false, placeholder: 'Placeholder', disabled: false, loading: false, chevron: true },
    { size: 'm', state: 'normal', active: true, empty: true, placeholder: 'Placeholder', disabled: false, loading: false, chevron: false },

    // Valid
    { size: 'm', state: 'valid', active: true, empty: false, placeholder: undefined, disabled: false, loading: false, chevron: true },
    { size: 'l', state: 'valid', active: false, empty: true, placeholder: 'Placeholder', disabled: false, loading: false, chevron: true },

    // Invalid
    { size: 'm', state: 'invalid', active: false, empty: false, placeholder: undefined, disabled: false, loading: false, chevron: true },
    { size: 'l', state: 'invalid', active: true, empty: true, placeholder: 'Placeholder', disabled: false, loading: false, chevron: true },

    // Disabled
    { size: 'm', state: 'normal', active: false, empty: false, placeholder: undefined, disabled: true, loading: false, chevron: true },

    // Loading
    { size: 'l', state: 'normal', active: false, empty: false, placeholder: undefined, disabled: false, loading: true, chevron: true },
    { size: 'm', state: 'valid', active: false, empty: false, placeholder: undefined, disabled: false, loading: true, chevron: true },
    { size: 'l', state: 'invalid', active: true, empty: true, placeholder: 'Placeholder', disabled: false, loading: true, chevron: false },
  ];

  variables.forEach((item) => {
    test(`Verify Base case size=${item.size} disabled=${item.disabled} loading=${item.loading} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} chevron=${item.chevron}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        TAG.KEYBOARD,
        '@base-trigger',
        '@button-trigger',
        '@base-components',
        '@flex-box'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/button-trigger/base.tsx', 'en', item);

      const { bgPrimary, borderPrimary, borderActive, borderSuccess, borderCritical } = await getTriggerColors(page);

      await test.step('Base background check', async () => {
        await checkBackgroundColor(page, locators.button(page), bgPrimary);
      });

      if (item.state === 'normal' && !item.disabled && !item.loading) {
        await test.step('Normal/Active styles', async () => {
          await expect(locators.button(page)).toHaveAttribute('tabindex', '0');
          if (item.empty && item.placeholder !== undefined) {
            const placeholderElement = locators.triggerText(page, 'ButtonTrigger', { withPlaceholder: true }).first();
            await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
          }

          if (item.chevron && !item.loading) {
            const svg = locators.button(page).locator('svg');
            await expect(svg).toBeVisible();
            await expect(svg).toHaveAttribute('aria-hidden', 'true');
          }
          if (item.active) {
            await checkBorderColor(page, locators.button(page), borderActive);
          } else {
            await checkBorderColor(page, locators.button(page), borderPrimary);
          }
          await page.keyboard.press('Tab');
          await locators.button(page).hover();
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
        });
      }
      if (item.loading) {
        await test.step('Check loading state', async () => {
          await expect(locators.button(page)).toHaveAttribute('tabindex', '0');
          const svg = locators.button(page).locator('svg');
          await expect(svg).toBeVisible();
          await expect(svg).toHaveAttribute('role', 'img');
          await expect(svg).toHaveAttribute('aria-label', 'Loading…');

          await page.keyboard.press('Tab');
          await expect(locators.button(page)).not.toBeFocused();
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
        });
      }
      if (item.disabled) {
        await test.step('Disabled state', async () => {
          await expect(locators.button(page)).toHaveAttribute('tabindex', '0');
          await page.keyboard.press('Tab');
          await expect(locators.button(page)).not.toBeFocused();
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
        });
      }

      if (item.state === 'valid' && !item.disabled && !item.loading) {
        await test.step('Valid state styles', async () => {
          await checkBorderColor(page, locators.button(page), borderSuccess);
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
        });
      }

      if (item.state === 'invalid' && !item.disabled && !item.loading) {
        await test.step('Invalid state styles', async () => {
          await checkBorderColor(page, locators.button(page), borderCritical);
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
        });
      }
    });

    test(`Verify With addons case size=${item.size} disabled=${item.disabled} loading=${item.loading} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} chevron=${item.chevron}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        TAG.KEYBOARD,
        '@base-trigger',
        '@button-trigger',
        '@base-components',
        '@flex-box'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/button-trigger/with-addons.tsx', 'en', item);

      const buttons = await locators.button(page).all();

      const { bgPrimary, borderPrimary, borderActive, borderSuccess, borderCritical } = await getTriggerColors(page);

      await test.step('Base background check', async () => {
        for (const button of buttons) {
          await checkBackgroundColor(page, button, bgPrimary);
        }
      });

      if (item.loading) {
        await test.step('Check loading state', async () => {
          for (const button of buttons) {
            const svg = button.locator('svg');

            await expect(button).toHaveAttribute('tabindex', '0');
            await expect(svg.nth(1)).toHaveAttribute('role', 'img');
            await expect(svg.nth(1)).toHaveAttribute('aria-label', 'Loading…');

            await page.keyboard.press('Tab');
            await expect(button).not.toBeFocused();
          }
          await expect(page).toHaveScreenshot(`with-addons-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
        });
      }

      if (item.state === 'normal' && !item.disabled && !item.loading) {
        await test.step('Normal/Active styles', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = locators.triggerText(page, 'ButtonTrigger', { withPlaceholder: true }).first();
              await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
            }

            if (item.chevron) {
              const svgs = await button.locator('svg').all();
              for (const svg of svgs) {
                await expect(svg).toBeVisible();
                await expect(svg).toHaveAttribute('aria-hidden', 'true');
              }
            }
            if (item.active) {
              await checkBorderColor(page, button, borderActive);
            } else {
              await checkBorderColor(page, button, borderPrimary);
            }
          }
          await locators.button(page).nth(1).hover();

          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`with-addons-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
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

      if (item.state === 'valid' && !item.disabled && !item.loading) {
        await test.step('Valid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, borderSuccess);
          }
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`button-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }

      if (item.state === 'invalid' && !item.disabled && !item.loading) {
        await test.step('Invalid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, borderCritical);
          }
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`button-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }
    });

    test(`Verify Neighbor Location case size=${item.size} disabled=${item.disabled} loading=${item.loading} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} chevron=${item.chevron}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        TAG.KEYBOARD,
        '@base-trigger',
        '@base-components',
        '@flex-box',
        '@neighbor-location',
        '@button-trigger'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/button-trigger/neighbor-location.tsx', 'en', item);

      const buttons = await locators.button(page).all();

      const { bgPrimary, borderPrimary, borderActive, borderSuccess, borderCritical } = await getTriggerColors(page);

      await test.step('Base background check', async () => {
        for (const button of buttons) {
          await checkBackgroundColor(page, button, bgPrimary);
        }
      });

      if (item.loading) {
        await test.step('Check loading state', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
            const svg = button.locator('svg');
            await expect(svg).toBeVisible();
            await expect(svg).toHaveAttribute('role', 'img');
            await expect(svg).toHaveAttribute('aria-label', 'Loading…');
          }
          await expect(page).toHaveScreenshot(`neighbor-location-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
        });
      }

      if (item.state === 'normal' && !item.disabled && !item.loading) {
        await test.step('Normal/Active styles', async () => {
          for (const button of buttons) {
            await expect(button).toHaveAttribute('tabindex', '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = locators.triggerText(button, 'ButtonTrigger', { withPlaceholder: true }).first();
              await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
            }

            if (item.chevron) {
              const svg = button.locator('svg');
              await expect(svg).toBeVisible();
              await expect(svg).toHaveAttribute('aria-hidden', 'true');
            }
            if (item.active) {
              await checkBorderColor(page, button, borderActive);
            } else {
              await checkBorderColor(page, button, borderPrimary);
            }
          }
          await locators.button(page).nth(1).hover();
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`neighbor-location-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
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

      if (item.state === 'valid' && !item.disabled && !item.loading) {
        await test.step('Valid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, borderSuccess);
          }
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`neighbor-location-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }

      if (item.state === 'invalid' && !item.disabled && !item.loading) {
        await test.step('Invalid state styles', async () => {
          for (const button of buttons) {
            await checkBorderColor(page, button, borderCritical);
          }
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`neighbor-location-size:${item.size}-disabled:${item.disabled}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}.png`);
        });
      }
    });

    test(`Verify Button Trigger for Select or DD menu case size=${item.size} disabled=${item.disabled} loading=${item.loading} state=${item.state} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} chevron=${item.chevron}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@base-trigger',
        '@button-trigger',
        '@base-components',
        '@flex-box',
        '@select',
        '@dropdown'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/button-trigger/with-select-and-dd-menu.tsx', 'en', item);

      const triggers = await locators.trigger(page).all();

      const { bgPrimary, borderPrimary, borderActive, borderSuccess, borderCritical } = await getTriggerColors(page);

      await test.step('Base background check', async () => {
        for (const button of triggers) {
          await checkBackgroundColor(page, button, bgPrimary);
        }
        await expect(page).toHaveScreenshot(`triggers-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
      });

      if (item.loading) {
        await test.step('Check loading state', async () => {
          for (const button of triggers) {
            await expect(button).toHaveAttribute('tabindex', '0');
            const svg = button.locator('svg');
            await expect(svg).toBeVisible();
            await expect(svg).toHaveAttribute('role', 'img');
            await expect(svg).toHaveAttribute('aria-label', 'Loading…');

            await page.keyboard.press('Tab');
            await expect(button).not.toBeFocused();
          }
          await expect(page).toHaveScreenshot(`triggers-loading-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-state:${item.state}-active:${item.active}-placeholder:${item.placeholder}-chevron:${item.chevron}.png`);
        });
      }

      if (item.state === 'normal' && !item.disabled && !item.loading) {
        await test.step('Normal/Active styles', async () => {
          for (const button of triggers) {
            await expect(button).toHaveAttribute('tabindex', '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = locators.triggerText(page, 'ButtonTrigger', { withPlaceholder: true }).first();
              await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
            }

            if (item.chevron) {
              const svg = button.locator('svg');
              await expect(svg).toBeVisible();
              await expect(svg).toHaveAttribute('aria-hidden', 'true');
            }
            if (item.active) {
              await checkBorderColor(page, button, borderActive);
            } else {
              await checkBorderColor(page, button, borderPrimary);
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

      if (item.state === 'valid' && !item.disabled && !item.loading) {
        await test.step('Valid state styles', async () => {
          for (const button of triggers) {
            await checkBorderColor(page, button, borderSuccess);
          }
        });
      }

      if (item.state === 'invalid' && !item.disabled && !item.loading) {
        await test.step('Invalid state styles', async () => {
          for (const button of triggers) {
            await checkBorderColor(page, button, borderCritical);
          }
        });
      }
    });
  });

  test('Verify ellipsis in Button trigger and few tags', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@base-trigger',
      '@button-trigger',
      '@ellipsis',
      '@dropdown-menu'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/advanced/examples/button-trigger-ellipsis.tsx', 'en');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot();

    await locators.button(page).nth(1).hover();
    await waitForHint(page);
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
      '@button-trigger',
      '@base-components',
      '@flex-box',
      '@select',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.trigger(page)).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await locators.options(page, 'Option 0').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'Option 0')).toHaveClass(/highlighted/);
    await page.keyboard.press('Escape');
    await locators.options(page, 'Option 0').waitFor({ state: 'hidden' });

    await expect(locators.trigger(page)).toBeFocused();
    await page.keyboard.press('Enter');
    await locators.options(page, 'Option 0').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'Option 0')).toHaveClass(/highlighted/);
    await page.keyboard.press('Space');
    await locators.options(page, 'Option 0').waitFor({ state: 'hidden' });

    await expect(locators.trigger(page)).toBeFocused();
    await expect(locators.trigger(page)).toHaveAttribute('value', '0');
  });

  test('Verify navigation and changing values by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@base-trigger',
      '@button-trigger',
      '@base-components',
      '@flex-box',
      '@select',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    const initialWidth = await locators.trigger(page).boundingBox().then((b) => b?.width || 0);
    await locators.trigger(page).click();

    await locators.options(page, 'Option 0').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'Option 0')).not.toHaveClass(/highlighted/);
    await locators.trigger(page).click();
    await locators.options(page, 'Option 0').waitFor({ state: 'hidden' });
    await locators.trigger(page).click();
    await locators.options(page, 'Option 0').waitFor({ state: 'visible' });

    await locators.options(page, 'Option 0').click();
    await locators.options(page, 'Option 0').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page)).toHaveAttribute('value', '0');
    const finalWidth = await locators.trigger(page).boundingBox().then((b) => b?.width || 0);
    expect(finalWidth).toBeLessThan(initialWidth);
  });

  test('Verify Button trigger custom heading tags and ellipsis hint on focus', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@base-trigger',
      '@button-trigger',
      '@ellipsis',
      '@dropdown-menu'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/advanced/examples/button-trigger-ellipsis.tsx', 'en');

    const triggerText = locators.triggerText(page, 'ButtonTrigger').first();
    const secondTriggerText = locators.triggerText(page, 'ButtonTrigger').nth(1);
    await expect(locators.button(page).first()).toHaveJSProperty('tagName', 'H1');
    await expect(triggerText).toHaveJSProperty('tagName', 'H2');

    await expect(secondTriggerText.locator('span[aria-hidden="true"]').first()).toBeAttached();

    await page.keyboard.press('Tab');
    await expect(locators.button(page).nth(0)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(locators.button(page).nth(1)).toBeFocused();
    await waitForHint(page);
    await expectVisibleHintsCount(page, 1);
  });
});
