import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    // Normal
    { size: 'm', active: false, empty: false, placeholder: 'Placeholder', disabled: false, loading: false, color: undefined },
    { size: 'm', active: true, empty: true, placeholder: 'Placeholder', disabled: false, loading: false, color: 'violet' },

    // Disabled
    { size: 'm', active: false, empty: false, placeholder: undefined, disabled: true, loading: false, color: 'red' },
    { size: 'l', active: true, empty: true, placeholder: 'Placeholder', disabled: true, loading: false, color: undefined },

    // Loading
    { size: 'm', active: false, empty: false, placeholder: undefined, disabled: false, loading: true, color: undefined },
    { size: 'l', active: true, empty: true, placeholder: 'Placeholder', disabled: false, loading: true, color: 'yellow' },
  ];

  variables.forEach((item) => {
    test(`Verify Base case size=${item.size} disabled=${item.disabled} loading=${item.loading} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} color=${item.color}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger',
        '@link-trigger'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/link-trigger/base.tsx', 'en', item);

      if (item.loading) {
        await test.step('Check loading state', async () => {
          // await expect(locators.button(page)).toHaveAttribute('tabindex', '-1');
          const svg = locators.button(page).locator('svg');
          await expect(svg).toBeVisible();
          await expect(svg).toHaveAttribute('role', 'img');
          await expect(svg).toHaveAttribute('aria-label', 'Loading…');

          await page.keyboard.press('Tab');
          // await expect(locators.button(page)).not.toBeFocused();
        });
      }

      if (!item.disabled) {
        await test.step('Normal/Active styles', async () => {
          // await expect(locators.button(page)).toHaveAttribute('tabindex', item.loading ? '-1' : '0');
          if (item.empty && item.placeholder !== undefined) {
            const placeholderElement = page.locator('[data-ui-name="LinkTrigger.Text"]').first();
            await expect(placeholderElement).not.toHaveAttribute('aria-hidden');
          }

          if (!item.loading) {
            const svg = locators.button(page).locator('svg');
            await expect(svg).toBeVisible();
            await expect(svg).toHaveAttribute('aria-hidden', 'true');
          }
          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-active:${item.active}-placeholder:${item.placeholder}-color:${item.color}.png`);
        });
      }

      if (item.disabled) {
        await test.step('Disabled state', async () => {
          await expect(locators.button(page)).toHaveAttribute('tabindex', '0');
          await page.keyboard.press('Tab');
          await expect(locators.button(page)).not.toBeFocused();
          await expect(page).toHaveScreenshot(`base-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-active:${item.active}-placeholder:${item.placeholder}-color:${item.color}.png`);
        });
      }
    });

    test(`Verify With addons case size=${item.size} disabled=${item.disabled} loading=${item.loading} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} color=${item.color}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger',
        '@link-trigger'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/link-trigger/with-addons.tsx', 'en', item);

      const buttons = await locators.button(page).all();

      if (item.loading) {
        await test.step('Check loading state', async () => {
          for (const button of buttons) {
            const svg = button.locator('svg');

            // await expect(button).toHaveAttribute('tabindex', '-1');

            await expect(svg.nth(1)).toHaveAttribute('role', 'img');
            await expect(svg.nth(1)).toHaveAttribute('aria-label', 'Loading…');

            await page.keyboard.press('Tab');
            // await expect(button).not.toBeFocused();
          }
        });
      }

      if (!item.disabled) {
        await test.step('Normal/Active styles', async () => {
          for (const button of buttons) {
            // await expect(button).toHaveAttribute('tabindex', item.loading ? '-1' : '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = page.locator('[data-ui-name="LinkTrigger.Text"]').first();
              await expect(placeholderElement).not.toHaveAttribute('aria-hidden');
            }

            if (!item.loading) {
              const svgs = await button.locator('svg').all();
              for (const svg of svgs) {
                await expect(svg).toBeVisible();
                await expect(svg).toHaveAttribute('aria-hidden', 'true');
              }
            }
          }

          await page.keyboard.press('Tab');
          await expect(page).toHaveScreenshot(`with-addons-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-active:${item.active}-placeholder:${item.placeholder}-color:${item.color}.png`);
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
    });

    test(`Verify Link Trigger for Select case size=${item.size} disabled=${item.disabled} loading=${item.loading} active=${item.active} empty=${item.empty} placeholder=${item.placeholder} color=${item.color}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-trigger',
        '@link-trigger',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-trigger/tests/examples/link-trigger/with-select.tsx', 'en', item);

      const triggers = await locators.trigger(page).all();

      await test.step('Base background check', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot(`triggers-size:${item.size}-disabled:${item.disabled}-loading:${item.loading}-active:${item.active}-placeholder:${item.placeholder}-color:${item.color}.png`);
      });

      if (item.loading) {
        await test.step('Check loading state', async () => {
          for (const button of triggers) {
            // await expect(button).toHaveAttribute('tabindex', '-1');
            const svg = button.locator('svg');
            await expect(svg).toBeVisible();
            await expect(svg).toHaveAttribute('role', 'img');
            await expect(svg).toHaveAttribute('aria-label', 'Loading…');
          }
        });
      }

      if (!item.disabled) {
        await test.step('Normal/Active styles', async () => {
          for (const button of triggers) {
            // await expect(button).toHaveAttribute('tabindex', item.loading ? '-1' : '0');
            if (item.empty && item.placeholder !== undefined) {
              const placeholderElement = page.locator('[data-ui-name="LinkTrigger.Text"]').first();
              await expect(placeholderElement).not.toHaveAttribute('aria-hidden');
            }

            if (!item.loading) {
              const svg = button.locator('svg');
              await expect(svg).toBeVisible();
              await expect(svg).toHaveAttribute('aria-hidden', 'true');
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
    });
  });

  test('Verify ellipsis in Link trigger', {
    tag: [TAG.PRIORITY_HIGH,
      '@base-trigger',
      '@link-trigger',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/advanced/examples/link-trigger-ellipsis.tsx', 'en');

    await expect(page).toHaveScreenshot();

    await locators.button(page).nth(1).hover();
    await page.locator(`[data-ui-name="Hint"]`).waitFor({ state: 'visible' });
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
      '@link-trigger',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/link-trigger/examples/link-trigger.tsx', 'en');

    await expect(locators.trigger(page).first()).toHaveAttribute('aria-haspopup', 'listbox');
    await expect(locators.trigger(page).first()).toHaveAttribute('placeholder', 'Select option');
    await page.keyboard.press('Tab');
    await expect(locators.trigger(page).first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'Desktop')).toHaveClass(/highlighted/);

    await page.keyboard.press('Escape');
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });
    await page.keyboard.press('Space');
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).toBeFocused();
    await expect(locators.trigger(page).first()).toHaveAttribute('value', 'Desktop');
  });

  test('Verify navigation and changing values by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@base-trigger',
      '@link-trigger',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/link-trigger/examples/link-trigger.tsx', 'en');

    const initialWidth = await locators.trigger(page).first().boundingBox().then((b) => b?.width || 0);
    await locators.trigger(page).first().click();

    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });
    await expect(locators.options(page, 'Desktop')).not.toHaveClass(/highlighted/);

    await locators.trigger(page).first().click();
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });

    await locators.trigger(page).first().click();
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });

    await locators.options(page, 'Mobile').click();
    await locators.options(page, 'Desktop').waitFor({ state: 'hidden' });

    await expect(locators.trigger(page).first()).toHaveAttribute('value', 'Mobile');
    const finalWidth = await locators.trigger(page).first().boundingBox().then((b) => b?.width || 0);
    expect(finalWidth).toBeLessThan(initialWidth);
  });

  test('Verify navigation and changing values by mouse AND keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@base-trigger',
      '@link-trigger',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-trigger/docs/link-trigger/examples/link-trigger.tsx', 'en');

    await locators.trigger(page).first().click();
    await locators.options(page, 'Desktop').waitFor({ state: 'visible' });

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(locators.options(page, 'Mobile')).toHaveClass(/highlighted/);

    await locators.trigger(page).first().click();
    await locators.options(page, 'Mobile').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).not.toHaveAttribute('value', 'Mobile');

    await locators.trigger(page).first().click();
    await locators.options(page, 'Mobile').waitFor({ state: 'visible' });
    await locators.options(page, 'Mobile').click();
    await locators.options(page, 'Mobile').waitFor({ state: 'hidden' });
    await expect(locators.trigger(page).first()).toHaveAttribute('value', 'Mobile');
  });
});
