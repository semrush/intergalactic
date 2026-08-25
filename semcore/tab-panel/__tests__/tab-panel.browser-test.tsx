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

const waitForHint = async (page: Page, text: string) => {
  await page.locator('[data-ui-name="Hint"]').filter({ hasText: text }).waitFor({ state: 'visible' });
  await page.waitForFunction((text) => {
    const hint = Array.from(document.querySelectorAll<HTMLElement>('[data-ui-name="Hint"]'))
      .find((el) => el.textContent?.includes(text));

    return hint && getComputedStyle(hint).opacity === '1';
  }, text);
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test(`Verify active Tab Panel  styles`, {
    tag: [TAG.PRIORITY_HIGH,
      '@tab-panel',
      '@base-components',

      '@counter',
      '@badge'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en');

    await page.keyboard.press('Tab');
    await locators.tabPanels(page).nth(0).hover();
    await expect(page).toHaveScreenshot();

    await locators.tabPanels(page).nth(1).hover();
    await expect(page).toHaveScreenshot();

    await test.step('Verify tab panel styles', async () => {
      const countTabs = await locators.tabPanels(page).count();
      for (let i = 0; i < countTabs; i++) {
        // Spacing between an addon and the text comes from the tab gap
        await expect(locators.tabPanels(page).nth(i)).toHaveCSS('column-gap', '6px');
        // Space around the tab content comes from its own padding
        await expect(locators.tabPanels(page).nth(i)).toHaveCSS('padding-left', '12px');
        await expect(locators.tabPanels(page).nth(i)).toHaveCSS('padding-right', '12px');
      }

      // Per-child margins were replaced by the gap and padding above and must not come back
      const countText = await locators.text(page).count();
      for (let i = 0; i < countText; i++) {
        await expect(locators.text(page).nth(i)).toHaveCSS('margin-right', '0px');
        await expect(locators.text(page).nth(i)).toHaveCSS('margin-left', '0px');
      }

      const countAddons = await locators.addons(page).count();
      for (let i = 0; i < countAddons; i++) {
        await expect(locators.addons(page).nth(i)).toHaveCSS('margin-right', '0px');
        await expect(locators.addons(page).nth(i)).toHaveCSS('margin-left', '0px');
      }
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

  const variablesEllipsis = [
    { w: 100, behavior: 'auto', hintPlacement: 'right', desc: 'default' },
    { w: 100, behavior: 'auto', ellipsis: { 'ellipsis:cropPosition': 'middle' }, hintPlacement: 'right', desc: 'cropPosition:middle' },
    { w: 100, behavior: 'manual', hintPlacement: 'right', desc: 'default' },
    { w: 100, behavior: 'manual', ellipsis: { 'ellipsis:cropPosition': 'middle' }, hintPlacement: 'right', desc: 'cropPosition:middle' },

  ];
  variablesEllipsis.forEach((item) => {
    test(`Verify ellipsis in Tab Panel ellipsis = ${item.desc} behavior = ${item.behavior} styles`, {

      tag: [TAG.PRIORITY_HIGH,
        '@tab-panel',
        '@base-components',
        '@ellipsis',
        '@hint',
        '@counter',
        '@badge'],
    }, async ({ page }) => {
      const focusedHintText = 'Facebook';
      const hoveredHintText = 'Instagram Instagram';

      await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', item);
      await page.waitForTimeout(200);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(100);

      const focusedTab = locators.tabPanels(page).first();
      const focusedText = locators.text(page).first();

      await expect(focusedTab).toBeFocused();
      await expect.poll(async () => {
        return focusedText.evaluate((el) => {
          const element = el as HTMLElement;

          return element.scrollWidth > element.clientWidth || element.childNodes.length > 1;
        });
      }).toBe(true);

      await focusedTab.evaluate((el) => (el as HTMLElement).blur());
      await focusedTab.focus();
      await waitForHint(page, focusedHintText);

      await locators.tabPanels(page).nth(1).hover();
      await waitForHint(page, hoveredHintText);

      await expect(page.locator('[data-ui-name="Hint"]')).toHaveCount(2);
      await expect(page).toHaveScreenshot();
    });
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
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', { behavior: 'manual' });

    await page.keyboard.press('Tab');
    await expect(locators.tabPanels(page).nth(1)).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby');
    await expect(locators.tabPanels(page).nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabPanels(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabPanels(page).nth(2)).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(locators.tabPanels(page).nth(2)).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby');
    await page.keyboard.press('Space');
    await expect(locators.tabPanels(page).nth(1)).not.toHaveClass(/selected/);
    await expect(locators.tabPanels(page).nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabPanels(page).nth(2)).toHaveClass(/selected/);

    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');

    await expect(locators.tabPanels(page).first()).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby');
    await page.keyboard.press('Enter');
    await expect(page.locator('div[role="tabpanel"]')).toContainText('Facebook');
    await expect(locators.tabPanels(page).nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabPanels(page).nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabPanels(page).nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('Verify manual tabs activation by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@tab-panel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', { behavior: 'manual' });

    const TabPanels = page.locator('[data-ui-name="TabPanel.Item"]');
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'false');

    await TabPanels.nth(2).click();
    await expect(page.locator('div[role="tabpanel"]')).toContainText('Twitter');
    await expect(TabPanels.nth(1)).not.toHaveClass(/selected/);
    await expect(TabPanels.nth(0)).not.toHaveClass(/selected/);

    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(2)).toHaveClass(/selected/);
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
