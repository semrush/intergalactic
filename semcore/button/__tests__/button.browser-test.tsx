import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  buttonText: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button.Text"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  buttonAddon: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button.Addon"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),

};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesPrimary = [
    // primary
    { size: 'm', use: 'primary', theme: 'info', active: false, disabled: false, loading: false, hintPlacement: 'top' },
    { size: 'm', use: 'primary', theme: 'success', active: false, disabled: false, loading: false, hintPlacement: 'bottom' },
    { size: 'm', use: 'primary', theme: 'brand', active: false, disabled: false, loading: false, hintPlacement: 'left' },
    { size: 'm', use: 'primary', theme: 'danger', active: false, disabled: false, loading: false, hintPlacement: 'right' },
    { size: 'm', use: 'primary', theme: 'invert', active: false, disabled: false, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    { size: 'l', use: 'primary', theme: 'info', active: false, disabled: false, loading: false, hintPlacement: 'top' },
    { size: 'l', use: 'primary', theme: 'success', active: false, disabled: false, loading: false, hintPlacement: 'bottom' },
    { size: 'l', use: 'primary', theme: 'brand', active: false, disabled: false, loading: false, hintPlacement: 'left' },
    { size: 'l', use: 'primary', theme: 'danger', active: false, disabled: false, loading: false, hintPlacement: 'right' },
    { size: 'l', use: 'primary', theme: 'invert', active: false, disabled: false, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    // active
    { size: 'm', use: 'primary', theme: 'info', active: true, disabled: false, loading: false, hintPlacement: 'top' },
    { size: 'm', use: 'primary', theme: 'success', active: true, disabled: false, loading: false, hintPlacement: 'bottom' },
    { size: 'm', use: 'primary', theme: 'brand', active: true, disabled: false, loading: false, hintPlacement: 'left' },
    { size: 'm', use: 'primary', theme: 'danger', active: true, disabled: false, loading: false, hintPlacement: 'right' },
    { size: 'm', use: 'primary', theme: 'invert', active: true, disabled: false, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    // Disabled
    { size: 'l', use: 'primary', theme: 'info', active: false, disabled: true, loading: false, hintPlacement: 'top' },
    { size: 'l', use: 'primary', theme: 'success', active: false, disabled: true, loading: false, hintPlacement: 'bottom' },
    { size: 'l', use: 'primary', theme: 'brand', active: false, disabled: true, loading: false, hintPlacement: 'left' },
    { size: 'l', use: 'primary', theme: 'danger', active: false, disabled: true, loading: false, hintPlacement: 'right' },
    { size: 'l', use: 'primary', theme: 'invert', active: false, disabled: true, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    // loading
    { size: 'l', use: 'primary', theme: 'info', active: false, disabled: false, loading: true, hintPlacement: 'top' },
    { size: 'l', use: 'primary', theme: 'success', active: false, disabled: false, loading: true, hintPlacement: 'bottom' },
    { size: 'l', use: 'primary', theme: 'brand', active: false, disabled: false, loading: true, hintPlacement: 'left' },
    { size: 'm', use: 'primary', theme: 'brand', active: false, disabled: false, loading: true, hintPlacement: 'left' },
    { size: 'm', use: 'primary', theme: 'danger', active: false, disabled: false, loading: true, hintPlacement: 'right' },
    { size: 'm', use: 'primary', theme: 'invert', active: false, disabled: false, loading: true, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

  ];

  variablesPrimary.forEach((item) => {
    test(`Verify Base example size=${item.size} use=${item.use} theme=${item.theme} disabled=${item.disabled} active=${item.active} loading=${item.loading}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-base.tsx', 'en', item);

      await page.keyboard.press('Tab');
      const count = await locators.button(page).count();

      if (!item.loading) {
        await test.step('Verify text paddings and spacing based on content', async () => {
          for (let i = 0; i < count; i++) {
            const button = locators.button(page).nth(i);
            const text = button.locator('[data-ui-name="Button.Text"]');
            const addon = button.locator('[data-ui-name="Button.Addon"]');

            const hasText = await text.count();
            const hasAddon = await addon.count();

            if (hasText && !hasAddon) {
              await expect(text).toHaveCSS('margin-left', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('margin-right', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('font-size', item.size === 'm' ? '14px' : '16px');
            }
          }
        });
      }

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await locators.button(page).nth(4).hover();
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.loading) {
        await test.step(`Verify attributes for loading`, async () => {
          for (let i = 0; i < count; i++) {
            await expect(locators.button(page).nth(i)).toHaveAttribute('aria-busy', 'true');
          }
        });
      }
      if (item.disabled) {
        await test.step(`Verify disabled styles`, async () => {
          await expect(page).toHaveScreenshot();
        });
      }
    });

    test(`Verify Neignbor location example size=${item.size} use=${item.use} theme=${item.theme} disabled=${item.disabled} active=${item.active} loading=${item.loading}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@button',
        '@base-components',
        '@neighbor-location'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-neighbor-location.tsx', 'en', item);

      await page.keyboard.press('Tab');
      const count = await locators.button(page).count();

      if (!item.loading) {
        await test.step('Verify text paddings and spacing based on content', async () => {
          for (let i = 0; i < count; i++) {
            const button = locators.button(page).nth(i);
            const text = button.locator('[data-ui-name="Button.Text"]');
            const addon = button.locator('[data-ui-name="Button.Addon"]');

            const hasText = await text.count();
            const hasAddon = await addon.count();

            if (hasText && !hasAddon) {
              await expect(text).toHaveCSS('margin-left', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('margin-right', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('font-size', item.size === 'm' ? '14px' : '16px');
            }
          }
        });
      }

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await locators.button(page).nth(0).hover();
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.loading) {
        await test.step(`Verify attributes for loading`, async () => {
          for (let i = 0; i < count; i++) {
            await expect(locators.button(page).nth(i)).toHaveAttribute('aria-busy', 'true');
          }
        });
      }

      if (item.disabled) {
        await test.step(`Verify disabled styles`, async () => {
          await expect(page).toHaveScreenshot();
        });
      }
    });

    test(`Verify Addon only example size=${item.size} use=${item.use} theme=${item.theme} disabled=${item.disabled} active=${item.active} loading=${item.loading} hintPlacement=${item.hintPlacement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@button',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-icon-only.tsx', 'en', item);
      const hint = page.locator('div[data-ui-name="Hint"]');
      await locators.button(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(100);
      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(locators.button(page).first()).toBeFocused();
          await hint.waitFor({ state: 'visible' });
          await page.waitForFunction(
            () => {
              const el = document.querySelector('[data-ui-name="Hint"]');
              return el && getComputedStyle(el).opacity === '1';
            },
          );
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await locators.button(page).nth(1).hover();
          await page.getByText('Hint Button Addon').waitFor({ state: 'visible' });
          await page.waitForFunction(
            () => {
              const el = document.querySelector('[data-ui-name="Hint"]');
              return el && getComputedStyle(el).opacity === '1';
            },
          );
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.disabled) {
        await test.step(`Verify disabled styles`, async () => {
          await expect(page).toHaveScreenshot();
        });
      }
    });
  });

  const variablesSeconsary = [
    // primary
    { size: 'm', use: 'secondary', theme: 'muted', active: false, disabled: false, loading: false, hintPlacement: 'top' },
    { size: 'm', use: 'secondary', theme: 'invert', active: false, disabled: false, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    { size: 'l', use: 'secondary', theme: 'muted', active: false, disabled: false, loading: false, hintPlacement: 'top' },
    { size: 'l', use: 'secondary', theme: 'invert', active: false, disabled: false, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    // active
    { size: 'm', use: 'secondary', theme: 'muted', active: true, disabled: false, loading: false, hintPlacement: 'top' },
    { size: 'm', use: 'secondary', theme: 'invert', active: true, disabled: false, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    // Disabled
    { size: 'l', use: 'secondary', theme: 'muted', active: false, disabled: true, loading: false, hintPlacement: 'top' },
    { size: 'l', use: 'secondary', theme: 'invert', active: false, disabled: true, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    // loading
    { size: 'l', use: 'secondary', theme: 'muted', active: false, disabled: false, loading: true, hintPlacement: 'top' },
    { size: 'm', use: 'secondary', theme: 'invert', active: false, disabled: false, loading: true, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

  ];

  variablesSeconsary.forEach((item) => {
    test(`Verify Base example size=${item.size} use=${item.use} theme=${item.theme} disabled=${item.disabled} active=${item.active} loading=${item.loading}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-base.tsx', 'en', item);

      await page.keyboard.press('Tab');
      const count = await locators.button(page).count();

      if (!item.loading) {
        await test.step('Verify text paddings and spacing based on content', async () => {
          for (let i = 0; i < count; i++) {
            const button = locators.button(page).nth(i);
            const text = button.locator('[data-ui-name="Button.Text"]');
            const addon = button.locator('[data-ui-name="Button.Addon"]');

            const hasText = await text.count();
            const hasAddon = await addon.count();

            if (hasText && !hasAddon) {
              await expect(text).toHaveCSS('margin-left', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('margin-right', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('font-size', item.size === 'm' ? '14px' : '16px');
            }
          }
        });
      }

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await locators.button(page).nth(4).hover();
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.loading) {
        await test.step(`Verify attributes for loading`, async () => {
          for (let i = 0; i < count; i++) {
            await expect(locators.button(page).nth(i)).toHaveAttribute('aria-busy', 'true');
          }
        });
      }

      if (item.disabled) {
        await test.step(`Verify disabled styles`, async () => {
          await expect(page).toHaveScreenshot();
        });
      }
    });

    test(`Verify Neignbor location example size=${item.size} use=${item.use} theme=${item.theme} disabled=${item.disabled} active=${item.active} loading=${item.loading}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@button',
        '@base-components',
        '@neighbor-location'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-neighbor-location.tsx', 'en', item);

      await page.keyboard.press('Tab');
      const count = await locators.button(page).count();

      if (!item.loading) {
        await test.step('Verify text paddings and spacing based on content', async () => {
          for (let i = 0; i < count; i++) {
            const button = locators.button(page).nth(i);
            const text = button.locator('[data-ui-name="Button.Text"]');
            const addon = button.locator('[data-ui-name="Button.Addon"]');

            const hasText = await text.count();
            const hasAddon = await addon.count();

            if (hasText && !hasAddon) {
              await expect(text).toHaveCSS('margin-left', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('margin-right', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('font-size', item.size === 'm' ? '14px' : '16px');
            }
          }
        });
      }

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await locators.button(page).nth(0).hover();
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.loading) {
        await test.step(`Verify attributes for loading`, async () => {
          for (let i = 0; i < count; i++) {
            await expect(locators.button(page).nth(i)).toHaveAttribute('aria-busy', 'true');
          }
        });
      }

      if (item.disabled) {
        await test.step(`Verify disabled styles`, async () => {
          await expect(page).toHaveScreenshot();
        });
      }
    });

    test(`Verify Addon only example size=${item.size} use=${item.use} theme=${item.theme} disabled=${item.disabled} active=${item.active} loading=${item.loading} hintPlacement=${item.hintPlacement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@button',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-icon-only.tsx', 'en', item);
      const hint = page.locator('div[data-ui-name="Hint"]');
      await locators.button(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(100);

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(locators.button(page).first()).toBeFocused();
          await hint.waitFor({ state: 'visible' });
          await page.waitForFunction(
            () => {
              const el = document.querySelector('[data-ui-name="Hint"]');
              return el && getComputedStyle(el).opacity === '1';
            },
          );
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await locators.button(page).nth(1).hover();
          await page.getByText('Hint Button Addon').waitFor({ state: 'visible' });
          await page.waitForFunction(
            () => {
              const el = document.querySelector('[data-ui-name="Hint"]');
              return el && getComputedStyle(el).opacity === '1';
            },
          );
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.disabled) {
        await test.step(`Verify disabled styles`, async () => {
          await expect(page).toHaveScreenshot();
        });
      }
    });
  });

  const variablesTertiary = [
    // primary
    { size: 'm', use: 'tertiary', theme: 'muted', active: false, disabled: false, loading: false, hintPlacement: 'top' },
    { size: 'm', use: 'tertiary', theme: 'invert', active: false, disabled: false, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    { size: 'l', use: 'tertiary', theme: 'muted', active: false, disabled: false, loading: false, hintPlacement: 'top' },
    { size: 'l', use: 'tertiary', theme: 'invert', active: false, disabled: false, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    // active
    { size: 'm', use: 'tertiary', theme: 'muted', active: true, disabled: false, loading: false, hintPlacement: 'top' },
    { size: 'm', use: 'tertiary', theme: 'invert', active: true, disabled: false, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    // Disabled
    { size: 'l', use: 'tertiary', theme: 'muted', active: false, disabled: true, loading: false, hintPlacement: 'top' },
    { size: 'l', use: 'tertiary', theme: 'invert', active: false, disabled: true, loading: false, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

    // loading
    { size: 'l', use: 'tertiary', theme: 'muted', active: false, disabled: false, loading: true, hintPlacement: 'top' },
    { size: 'm', use: 'tertiary', theme: 'invert', active: false, disabled: false, loading: true, hintPlacement: 'top', style: { backgroundColor: '#191B23' } },

  ];

  variablesTertiary.forEach((item) => {
    test(`Verify Base example size=${item.size} use=${item.use} theme=${item.theme} disabled=${item.disabled} active=${item.active} loading=${item.loading}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-base.tsx', 'en', item);

      await page.keyboard.press('Tab');
      const count = await locators.button(page).count();

      if (!item.loading) {
        await test.step('Verify text paddings and spacing based on content', async () => {
          for (let i = 0; i < count; i++) {
            const button = locators.button(page).nth(i);
            const text = button.locator('[data-ui-name="Button.Text"]');
            const addon = button.locator('[data-ui-name="Button.Addon"]');

            const hasText = await text.count();
            const hasAddon = await addon.count();

            if (hasText && !hasAddon) {
              await expect(text).toHaveCSS('margin-left', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('margin-right', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('font-size', item.size === 'm' ? '14px' : '16px');
            }
          }
        });
      }

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await locators.button(page).nth(4).hover();
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.loading) {
        await test.step(`Verify attributes for loading`, async () => {
          for (let i = 0; i < count; i++) {
            await expect(locators.button(page).nth(i)).toHaveAttribute('aria-busy', 'true');
          }
        });
      }

      if (item.disabled) {
        await test.step(`Verify disabled styles`, async () => {
          await expect(page).toHaveScreenshot();
        });
      }
    });

    test(`Verify Neignbor location example size=${item.size} use=${item.use} theme=${item.theme} disabled=${item.disabled} active=${item.active} loading=${item.loading}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@button',
        '@base-components',
        '@neighbor-location'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-neighbor-location.tsx', 'en', item);

      await page.keyboard.press('Tab');
      const count = await locators.button(page).count();

      if (!item.loading) {
        await test.step('Verify text paddings and spacing based on content', async () => {
          for (let i = 0; i < count; i++) {
            const button = locators.button(page).nth(i);
            const text = button.locator('[data-ui-name="Button.Text"]');
            const addon = button.locator('[data-ui-name="Button.Addon"]');

            const hasText = await text.count();
            const hasAddon = await addon.count();

            if (hasText && !hasAddon) {
              await expect(text).toHaveCSS('margin-left', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('margin-right', item.size === 'm' ? '8px' : '12px');
              await expect(text).toHaveCSS('font-size', item.size === 'm' ? '14px' : '16px');
            }
          }
        });
      }

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await locators.button(page).nth(0).hover();
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.loading) {
        await test.step(`Verify attributes for loading`, async () => {
          for (let i = 0; i < count; i++) {
            await expect(locators.button(page).nth(i)).toHaveAttribute('aria-busy', 'true');
          }
        });
      }

      if (item.disabled) {
        await test.step(`Verify disabled styles`, async () => {
          await expect(page).toHaveScreenshot();
        });
      }
    });

    test(`Verify Addon only example size=${item.size} use=${item.use} theme=${item.theme} disabled=${item.disabled} active=${item.active} loading=${item.loading} hintPlacement=${item.hintPlacement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@button',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-icon-only.tsx', 'en', item);
      const hint = page.locator('div[data-ui-name="Hint"]');
      await locators.button(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(100);

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await expect(locators.button(page).first()).toBeFocused();
          await hint.waitFor({ state: 'visible' });
          await page.waitForFunction(
            () => {
              const el = document.querySelector('[data-ui-name="Hint"]');
              return el && getComputedStyle(el).opacity === '1';
            },
          );
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await locators.button(page).nth(1).hover();
          await page.getByText('Hint Button Addon').waitFor({ state: 'visible' });
          await page.waitForFunction(
            () => {
              const el = document.querySelector('[data-ui-name="Hint"]');
              return el && getComputedStyle(el).opacity === '1';
            },
          );
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.disabled) {
        await test.step(`Verify disabled styles`, async () => {
          await expect(page).toHaveScreenshot();
        });
      }
    });
  });

  const ellipsisVariants = [
    { ellipsis: { cropPosition: 'middle' }, size: 'l', description: 'cropPosition: middle size: l' },
    { ellipsis: { cropPosition: 'end' }, description: 'cropPosition: end' },
    { ellipsis: { cropPosition: 'middle', lastRequiredSymbols: 2 }, description: 'cropPosition: middle, , lastRequiredSymbols: 2' },
  ];

  ellipsisVariants.forEach((variant) => {
    test(`Verify Ellipsis Hint visual ${variant.description}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@ellipsis', '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-with-ellipsis.tsx', 'en', variant);
      await locators.button(page).nth(0).waitFor({ state: 'visible' });
      await page.waitForTimeout(200);

      await page.keyboard.press('Tab');
      await expect(locators.button(page).nth(0)).toBeFocused();
      await locators.button(page).nth(0).hover();

      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(locators.hint(page)).toHaveCount(1);
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );
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
  test(`Verify Addon only Hint appearing by keyboard`, {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@button',
      '@base-components'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/button/tests/examples/button-icon-only.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(page.getByText('Addon only')).toHaveCount(1);
    await page.keyboard.press('Escape');
    await expect(page.getByText('Addon only')).toHaveCount(0);

    await page.keyboard.press('Tab');
    await expect(page.getByText('Hint Button Addon')).toHaveCount(1);
    await page.keyboard.press('Escape');
    await expect(page.getByText('Hint Button Addon')).toHaveCount(0);

    await page.keyboard.press('Tab');
    await expect(page.getByText('Tooltip Button Addon')).toHaveCount(1);
    await page.keyboard.press('Escape');
    await expect(page.getByText('Tooltip Button Addon')).toHaveCount(0);
  });

  test(`Verify Addon only Hint appearing by mouse`, {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@button',
      '@base-components'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/button/tests/examples/button-icon-only.tsx', 'en');

    await locators.button(page).nth(0).hover();
    await expect(page.getByText('Addon only')).toHaveCount(1);

    await locators.button(page).nth(1).hover();
    await expect(page.getByText('Addon only')).toHaveCount(0);
    await expect(page.getByText('Hint Button Addon')).toHaveCount(1);

    await locators.button(page).nth(2).hover();
    await expect(page.getByText('Hint Button Addon')).toHaveCount(0);
    await expect(page.getByText('Tooltip Button Addon')).toHaveCount(1);
  });

  const ellipsisVariants = [
    { ellipsis: { cropPosition: 'middle' }, size: 'l', description: 'cropPosition: middle size: l' },
    { ellipsis: { cropPosition: 'end' }, description: 'cropPosition: end' },
    { ellipsis: { cropPosition: 'middle', lastRequiredSymbols: 2 }, description: 'cropPosition: middle, , lastRequiredSymbols: 2' },
  ];

  ellipsisVariants.forEach((variant) => {
    test(`Verify Hint Shown on mouse hover when ${variant.description}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@ellipsis', '@link'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-with-ellipsis.tsx', 'en', variant);
      await page.waitForTimeout(200);

      await test.step('Hover link and verify hint appears', async () => {
        await locators.button(page).nth(0).hover();

        await page.waitForTimeout(200);
        await locators.hint(page).waitFor({ state: 'visible' });
        await expect(locators.hint(page)).toHaveCount(1);
      });
    });

    test(`Verify Ellipsis Hint on focus  ${variant.description}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@ellipsis', '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-with-ellipsis.tsx', 'en', variant);
      await locators.button(page).nth(0).waitFor({ state: 'visible' });
      await page.waitForTimeout(200);

      await page.keyboard.press('Tab');
      await expect(locators.button(page).nth(0)).toBeFocused();

      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(locators.hint(page)).toHaveCount(1);
    });
  });

  const noEllipsisVariants = [
    { ellipsis: false, description: 'false' },
  ];

  noEllipsisVariants.forEach((variant) => {
    test(`Verify no hint appears when ${variant.description}`, {
      tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@ellipsis', '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/button/tests/examples/button-with-ellipsis.tsx', 'en', variant);
      await page.waitForTimeout(100);

      await test.step('Focus and hover  - no hint should appear', async () => {
        await page.keyboard.press('Tab');
        await locators.button(page).nth(0).hover();
        await expect(locators.hint(page)).toHaveCount(0);
      });
    });
  });
});
