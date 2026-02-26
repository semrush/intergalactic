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
      const hint = page.locator('[data-ui-name="Hint"]');

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await hint.waitFor({ state: 'visible' });

          await page.getByText('Addon only').waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await locators.button(page).nth(1).hover();
          await page.getByText('Hint Button Addon').waitFor({ state: 'visible' });
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

      const count = await locators.button(page).count();

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await locators.button(page).nth(1).hover();
          await page.getByText('Hint Button Addon').waitFor({ state: 'visible' });
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

      const count = await locators.button(page).count();

      if (!item.active && !item.disabled) {
        await test.step(`Verify focus styles for not active button styles`, async () => {
          await page.keyboard.press('Tab');
          await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      }

      if (item.active && !item.disabled) {
        await test.step(`Verify focus styles for active button styles`, async () => {
          await locators.button(page).nth(1).hover();
          await page.getByText('Hint Button Addon').waitFor({ state: 'visible' });
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
});
