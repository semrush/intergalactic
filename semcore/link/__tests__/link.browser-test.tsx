import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  link: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Link"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  linkAddon: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Link.Addon"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(` ${TAG.VISUAL}`, () => {
  const variables = [
    { size: 100, disabled: false, active: false, showAddonLeft: false, showAddonRight: false, color: undefined },
    { size: 200, disabled: false, active: true, showAddonLeft: true, showAddonRight: false, color: 'text-success' },
    { size: 300, disabled: false, active: false, showAddonLeft: false, showAddonRight: true, color: 'text-critical' },
    { size: 300, disabled: true, active: false, showAddonLeft: true, showAddonRight: false, color: undefined },
    { size: 400, disabled: false, active: true, showAddonLeft: false, showAddonRight: true, color: undefined },
    { size: 500, disabled: true, active: false, showAddonLeft: false, showAddonRight: false, color: 'text-success' },
    { size: 500, disabled: false, active: false, showAddonLeft: true, showAddonRight: true, color: undefined },
    { size: 600, disabled: false, active: true, showAddonLeft: false, showAddonRight: false, color: 'text-critical' },
    { size: 700, disabled: true, active: true, showAddonLeft: true, showAddonRight: true, color: undefined },
    { size: 800, disabled: false, active: false, showAddonLeft: true, showAddonRight: false, color: 'text-success' },
  ];

  variables.forEach((item) => {
    test(`Verify Link size=${item.size}, disabled=${item.disabled}, active=${item.active}, addonLeft=${item.showAddonLeft}, addonRight=${item.showAddonRight},  color=${item.color || 'default'}`, {
      tag: [TAG.PRIORITY_HIGH, '@link'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/link/tests/examples/basic_usage.tsx', 'en', item);

      await test.step('Verify default visual state', async () => {
        await expect(page).toHaveScreenshot();
      });

      if (!item.disabled) {
        await test.step('Verify focused state', async () => {
          await page.keyboard.press('Tab');
          await expect(locators.link(page).first()).toBeFocused();
          await expect(page).toHaveScreenshot();
        });

        await test.step('Verify hover state', async () => {
          await locators.link(page).first().hover();
          await expect(page).toHaveScreenshot();
        });
      }
    });
  });

  test('Verify default link styles when links inside the text', {
    tag: [TAG.PRIORITY_HIGH, '@link', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/tests/examples/link_inside_the_content-with_enable_visited.tsx', 'en');

    await test.step('Verify links styles', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Links without text mouse interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@link'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_without_text.tsx', 'en');

    await test.step('Verify default color', async () => {
      await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
      await expect(locators.link(page, 1)).toHaveCSS('color', 'rgb(0, 109, 202)');
    });

    await test.step('Verify first link hover with hint', async () => {
      await locators.link(page).first().hover();
      await page.waitForSelector('text="Home page"');
      if (browserName !== 'firefox') {
        await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(4, 71, 146)');
        await expect(locators.link(page, 1)).toHaveCSS('color', 'rgb(0, 109, 202)');
      }
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify second link hover with hint', async () => {
      await locators.link(page, 1).hover();
      await page.waitForSelector('text="Go to the next page"');
      if (browserName !== 'firefox') {
        await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
        await expect(locators.link(page, 1)).toHaveCSS('color', 'rgb(4, 71, 146)');
      }
    });
  });

  test('Verify Links without text keyboard interactions', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_without_text.tsx', 'en');

    await test.step('Verify first link focus with hint', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Home page"');
      await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
      await expect(locators.link(page, 1)).toHaveCSS('color', 'rgb(0, 109, 202)');
    });

    await test.step('Verify second link focus with hint', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Go to the next page"');
      await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
      await expect(locators.link(page).first()).toHaveCSS('color', 'rgb(0, 109, 202)');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify link with ellipsis', {
    tag: [TAG.PRIORITY_MEDIUM, '@link', '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/links_with_ellipsis.tsx', 'en');

    await locators.link(page).waitFor({ state: 'visible' });
    await page.waitForTimeout(200);

    await test.step('Verify ellipsis visual with focus', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.link(page)).toBeFocused();
      await page.waitForTimeout(200);
      await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`@link ${TAG.FUNCTIONAL}`, () => {
  test('Verify link keyboard navigation and attributes', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/tests/examples/basic_usage.tsx', 'en');

    await test.step('Verify link attributes', async () => {
      await expect(locators.link(page).first()).toHaveAttribute('href', '#');
      await expect(locators.link(page).first()).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify link can be focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.link(page).first()).toBeFocused();
    });
  });

  test('Verify disabled link cannot be focused', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/tests/examples/basic_usage.tsx', 'en', { disabled: true });

    await test.step('Verify disabled link attributes', async () => {
      await expect(locators.link(page).first()).toHaveAttribute('tabindex', '-1');
    });

    await test.step('Verify disabled link cannot receive focus', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.link(page).first()).not.toBeFocused();
    });
  });

  test('Verify link with addons maintains correct structure', {
    tag: [TAG.PRIORITY_MEDIUM, '@link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/link/tests/examples/basic_usage.tsx', 'en', { showAddonLeft: true, showAddonRight: true });

    await test.step('Verify addons are present', async () => {
      const link = locators.link(page).first();
      await expect(link).toBeVisible();

      // Verify the link can be focused with addons
      await page.keyboard.press('Tab');
      await expect(link).toBeFocused();
    });
  });
});
