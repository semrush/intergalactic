import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  options: (page: Page) => page.getByRole('option'),
  tabPanels: (page: Page) => page.getByRole('tab'),
  addons: (page: Page) => page.locator('[data-ui-name="TabPanel.Item.Addon"]'),
  text: (page: Page) => page.locator('[data-ui-name="TabPanel.Item.Text"]'),
  tabpanel: (page: Page) => page.getByRole('tablist'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesActive = [
    { disabled: false, selected: undefined },
    { disabled: false, selected: true },
  ];
  variablesActive.forEach((item) => {
    test(`Verify active Tab Panel selected = ${item.selected} styles`, {
      tag: [TAG.PRIORITY_HIGH,
        '@tab-panel',
        '@base-components',

        '@counter',
        '@badge'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', item);

      await page.keyboard.press('Tab');
      await locators.tabPanels(page).nth(0).hover();
      await expect(page).toHaveScreenshot();

      await locators.tabPanels(page).nth(1).hover();
      await expect(page).toHaveScreenshot();

      await test.step('Verify tab panel styles', async () => {
        const countText = await locators.text(page).count();
        for (let i = 0; i < countText; i++) {
          await expect(locators.text(page).nth(i)).toHaveCSS('margin-right', '8px');
          await expect(locators.text(page).nth(i)).toHaveCSS('margin-left', '8px');
        }

        await expect(locators.addons(page).nth(0)).toHaveCSS('margin-left', '8px');
        await expect(locators.addons(page).nth(2)).toHaveCSS('margin-left', '8px');
        await expect(locators.addons(page).nth(4)).toHaveCSS('margin-left', '8px');
        await expect(locators.addons(page).nth(7)).toHaveCSS('margin-left', '8px');

        await expect(locators.addons(page).nth(1)).toHaveCSS('margin-right', '8px');
        await expect(locators.addons(page).nth(3)).toHaveCSS('margin-right', '8px');
        await expect(locators.addons(page).nth(5)).toHaveCSS('margin-right', '8px');
        await expect(locators.addons(page).nth(6)).toHaveCSS('margin-right', '8px');
      });
    });
  });

  test('Verify disabled Tab panel styles', {
    tag: [TAG.PRIORITY_HIGH,
      '@tab-panel',
      '@base-components',

      '@counter',
      '@badge'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', { disabled: true });

    await expect(page).toHaveScreenshot();
  });

  test('Verify text width is set', {
    tag: [TAG.PRIORITY_HIGH,
      '@tab-panel',
      '@base-components',

      '@counter',
      '@badge'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', { w: 500 });

    await expect(page).toHaveScreenshot();
  });

  test('Verify disabled Tab panel with tooltip', {
    tag: [TAG.PRIORITY_HIGH,
      '@tab-panel',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/docs/examples/disabled_tab_panel_item.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    const box = await locators.tabPanels(page).nth(1).boundingBox();
    if (box) {
      await page.mouse.move(box.x + 10, box.y + 5);
    }
    await page.waitForSelector('text="Do not forget to add short text to explain why this item is disabled."');
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify automatic tabs activation by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@tab-panel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/docs/examples/automatic_tab_activation.tsx', 'en', { behavior: 'auto' });

    await test.step('Verify TabPanel roles and attributes', async () => {
      await expect(locators.tabpanel(page)).toHaveAttribute('role', 'tablist');
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-label', 'Animals');
    });
    await test.step('Verify tabs roles and attributes when first is selected', async () => {
      const countTabs = await locators.tabPanels(page).count();
      for (let i = 0; i < countTabs; i++) {
        await expect(locators.tabPanels(page).nth(i)).toHaveAttribute('role', 'tab');
        await expect(locators.tabPanels(page).nth(i)).toHaveAttribute('type', 'button');
        await expect(locators.tabPanels(page).nth(i)).toHaveAttribute('aria-selected');
        await expect(locators.tabPanels(page).nth(i)).toHaveAttribute('value');
        await expect(locators.tabPanels(page).nth(i)).toHaveAttribute('id');
      }
      await expect(locators.tabPanels(page).nth(0)).toHaveAttribute('tabindex', '0');

      await expect(locators.tabPanels(page).nth(0)).toHaveAttribute('aria-controls');
      for (let i = 1; i < countTabs; i++) {
        await expect(locators.tabPanels(page).nth(i)).not.toHaveAttribute('aria-controls');
        await expect(locators.tabPanels(page).nth(i)).toHaveAttribute('tabindex', '-1');
      }
    });

    await test.step('Verify tabpanel roles and attributes and selected attribute when first is selected', async () => {
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('tabindex', '-1');
      await expect(locators.tabpanel(page)).not.toHaveAttribute('aria-hidden', 'true');
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
      await expect(locators.tabPanels(page).nth(0)).toHaveAttribute('aria-selected', 'true');
      await expect(locators.tabPanels(page).nth(1)).toHaveAttribute('aria-selected', 'false');
      await expect(locators.tabPanels(page).nth(2)).toHaveAttribute('aria-selected', 'false');
    });
    await test.step('Verify tabpanel roles and attributes and selected attribute when second is selected', async () => {
      await locators.tabPanels(page).nth(1).click();
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-1-2');
      await expect(locators.tabPanels(page).nth(0)).not.toHaveClass(/selected/);
      await expect(locators.tabPanels(page).nth(1)).toHaveAttribute('aria-selected', 'true');
      await expect(locators.tabPanels(page).nth(1)).toHaveClass(/selected/);
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('tabindex', '-1');
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test('Verify automatic tabs activation by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@tab-panel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/docs/examples/automatic_tab_activation.tsx', 'en', { behavior: 'auto' });

    const TabPanels = page.locator('[data-ui-name="TabPanel.Item"]');
    await page.keyboard.press('Tab');
    await expect(TabPanels.first()).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
    await expect(TabPanels.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(TabPanels.nth(1)).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-1-2');
    await expect(TabPanels.nth(0)).not.toHaveClass(/selected/);
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(1)).toHaveClass(/selected/);

    await page.keyboard.press('ArrowLeft');
    await expect(TabPanels.first()).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
    await expect(TabPanels.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('Verify manual tabs activation by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@tab-panel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/docs/examples/manual_tab_activation.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.tabPanels(page).first()).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await expect(locators.tabPanels(page).nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabPanels(page).nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabPanels(page).nth(2)).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(locators.tabPanels(page).nth(1)).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await page.keyboard.press('Space');
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-2');
    await expect(locators.tabPanels(page).nth(0)).not.toHaveClass(/selected/);
    await expect(locators.tabPanels(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabPanels(page).nth(1)).toHaveClass(/selected/);

    await page.keyboard.press('ArrowLeft');
    await expect(locators.tabPanels(page).first()).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-2');
    await page.keyboard.press('Enter');
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await expect(locators.tabPanels(page).nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabPanels(page).nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabPanels(page).nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('Verify manual tabs activation by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@tab-panel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/docs/examples/manual_tab_activation.tsx', 'en');

    const TabPanels = page.locator('[data-ui-name="TabPanel.Item"]');
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await expect(TabPanels.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'false');

    await TabPanels.nth(1).click();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-2');
    await expect(TabPanels.nth(0)).not.toHaveClass(/selected/);
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(1)).toHaveClass(/selected/);
  });

  test('Verify interactions with defaultValue props', {
    tag: [TAG.PRIORITY_HIGH,
      '@tab-panel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/value_and_default_value.tsx', 'en', { behavior: 'auto' });

    const messages: string[] = [];

    await expect(locators.tabPanels(page).nth(1)).toHaveClass(/selected/);
    await expect(locators.tabPanels(page).nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabPanels(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabPanels(page).nth(2)).toHaveAttribute('aria-selected', 'false');
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        messages.push(msg.text());
      }
    });
    await locators.tabPanels(page).nth(0).click();

    await expect
      .poll(() => messages)
      .toContain('Tab changed to facebook');
  });

  test('Verify tabs activation by mouse and keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      TAG.KEYBOARD,
      '@tab-panel',
      '@base-components',

      '@counter',
      '@badge'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', { behavior: 'auto' });

    await locators.tabPanels(page).nth(1).click();
    await page.keyboard.press('ArrowRight');
    await expect(locators.tabPanels(page).nth(2)).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-tw');
    await expect(locators.tabPanels(page).nth(2)).toHaveAttribute('aria-selected', 'true');

    await locators.tabPanels(page).nth(1).click();
    await expect(locators.tabPanels(page).nth(1)).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-ig');
    await expect(locators.tabPanels(page).nth(1)).toHaveAttribute('aria-selected', 'true');
  });
});
