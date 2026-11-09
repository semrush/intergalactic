import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  tabs: (page: Page) => page.getByRole('tab'),
  addons: (page: Page) => page.locator('[data-ui-name="TabPanel.Item.Addon"]'),
  text: (page: Page) => page.locator('[data-ui-name="TabPanel.Item.Text"]'),
  tablist: (page: Page) => page.getByRole('tablist'),
  tabpanel: (page: Page) => page.locator('div[role="tabpanel"]'),
};

const expectSelectedTab = async (page: Page, selectedIndex: number) => {
  for (const [index, tab] of (await locators.tabs(page).all()).entries()) {
    await expect(tab).toHaveAttribute('aria-selected', String(index === selectedIndex));
  }
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
      '@badge',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en');

    await page.keyboard.press('Tab');
    await test.step('Verify focused and hovered first tab', async () => {
      await locators.tabs(page).nth(0).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hovered second tab', async () => {
      await locators.tabs(page).nth(1).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tab gap and paddings', async () => {
      await expect(locators.tabs(page)).not.toHaveCount(0);
      for (const tab of await locators.tabs(page).all()) {
        await expect(tab).toHaveCSS('column-gap', '6px');
        await expect(tab).toHaveCSS('padding-left', '12px');
        await expect(tab).toHaveCSS('padding-right', '12px');
      }
    });

    await test.step('Verify text and addons have no own margins', async () => {
      for (const element of [...await locators.text(page).all(), ...await locators.addons(page).all()]) {
        await expect(element).toHaveCSS('margin-right', '0px');
        await expect(element).toHaveCSS('margin-left', '0px');
      }
    });
  });

  test('Verify disabled Tab panel styles', {
    tag: [TAG.PRIORITY_HIGH,
      '@tab-panel',
      '@base-components',
      '@counter',
      '@badge',
      '@typography'],
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
    await locators.tabs(page).nth(1).hover({ position: { x: 10, y: 5 } });
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
        '@badge',
        '@typography'],
    }, async ({ page }) => {
      const focusedHintText = 'Facebook';
      const hoveredHintText = 'Instagram Instagram';

      await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', item);
      await page.waitForTimeout(200);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(100);

      const focusedTab = locators.tabs(page).first();
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

      await locators.tabs(page).nth(1).hover();
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
      await expect(locators.tablist(page)).toHaveAttribute('role', 'tablist');
      await expect(locators.tablist(page)).toHaveAttribute('aria-label', 'Animals');
    });
    await test.step('Verify tabs roles and attributes when first is selected', async () => {
      for (const [index, tab] of (await locators.tabs(page).all()).entries()) {
        await expect(tab).toHaveAttribute('role', 'tab');
        await expect(tab).toHaveAttribute('type', 'button');
        await expect(tab).toHaveAttribute('aria-selected');
        await expect(tab).toHaveAttribute('value');
        await expect(tab).toHaveAttribute('id');
        if (index === 0) {
          await expect(tab).toHaveAttribute('tabindex', '0');
          await expect(tab).toHaveAttribute('aria-controls');
        } else {
          await expect(tab).toHaveAttribute('tabindex', '-1');
          await expect(tab).not.toHaveAttribute('aria-controls');
        }
      }
    });

    await test.step('Verify tabpanel roles and attributes and selected attribute when first is selected', async () => {
      await expect(locators.tabpanel(page)).toHaveAttribute('tabindex', '-1');
      await expect(locators.tablist(page)).not.toHaveAttribute('aria-hidden', 'true');
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
      await expectSelectedTab(page, 0);
    });
    await test.step('Verify tabpanel roles and attributes and selected attribute when second is selected', async () => {
      await locators.tabs(page).nth(1).click();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-1-2');
      await expect(locators.tabs(page).nth(0)).not.toHaveClass(/selected/);
      await expect(locators.tabs(page).nth(1)).toHaveAttribute('aria-selected', 'true');
      await expect(locators.tabs(page).nth(1)).toHaveClass(/selected/);
      await expect(locators.tabpanel(page)).toHaveAttribute('tabindex', '-1');
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test('Verify automatic tabs activation by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@tab-panel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/docs/examples/automatic_tab_activation.tsx', 'en', { behavior: 'auto' });

    const tabs = locators.tabs(page);

    await test.step('Verify Tab focuses selected first tab', async () => {
      await page.keyboard.press('Tab');
      await expect(tabs.first()).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
      await expectSelectedTab(page, 0);
    });

    await test.step('Verify ArrowRight selects second tab', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(tabs.nth(1)).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-1-2');
      await expect(tabs.nth(0)).not.toHaveClass(/selected/);
      await expect(tabs.nth(1)).toHaveClass(/selected/);
      await expectSelectedTab(page, 1);
    });

    await test.step('Verify ArrowLeft selects first tab again', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(tabs.first()).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
      await expectSelectedTab(page, 0);
    });
  });

  test('Verify manual tabs activation by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@tab-panel',
      '@badge',
      '@counter',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', { behavior: 'manual' });

    await test.step('Verify Tab focuses selected tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.tabs(page).nth(1)).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby');
      await expectSelectedTab(page, 1);
    });

    await test.step('Verify arrow moves focus and Space selects tab', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.tabs(page).nth(2)).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby');
      await page.keyboard.press('Space');
      await expect(locators.tabs(page).nth(1)).not.toHaveClass(/selected/);
      await expect(locators.tabs(page).nth(2)).toHaveClass(/selected/);
      await expectSelectedTab(page, 2);
    });

    await test.step('Verify Enter selects focused tab', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await expect(locators.tabs(page).first()).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby');
      await page.keyboard.press('Enter');
      await expect(locators.tabpanel(page)).toContainText('Facebook');
      await expectSelectedTab(page, 0);
    });
  });

  test('Verify manual tabs activation by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@tab-panel',
      '@badge',
      '@counter',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', { behavior: 'manual' });

    const tabs = locators.tabs(page);
    await expectSelectedTab(page, 1);

    await tabs.nth(2).click();
    await expect(locators.tabpanel(page)).toContainText('Twitter');
    await expect(tabs.nth(1)).not.toHaveClass(/selected/);
    await expect(tabs.nth(0)).not.toHaveClass(/selected/);
    await expect(tabs.nth(2)).toHaveClass(/selected/);
    await expectSelectedTab(page, 2);
  });

  test('Verify interactions with defaultValue props', {
    tag: [TAG.PRIORITY_HIGH,
      '@tab-panel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/value_and_default_value.tsx', 'en', { behavior: 'auto' });

    const messages: string[] = [];

    await expect(locators.tabs(page).nth(1)).toHaveClass(/selected/);
    await expectSelectedTab(page, 1);
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        messages.push(msg.text());
      }
    });
    await locators.tabs(page).nth(0).click();

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
      '@badge',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx', 'en', { behavior: 'auto' });

    await locators.tabs(page).nth(1).click();
    await page.keyboard.press('ArrowRight');
    await expect(locators.tabs(page).nth(2)).toBeFocused();
    await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-tw');
    await expect(locators.tabs(page).nth(2)).toHaveAttribute('aria-selected', 'true');

    await locators.tabs(page).nth(1).click();
    await expect(locators.tabs(page).nth(1)).toBeFocused();
    await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-ig');
    await expect(locators.tabs(page).nth(1)).toHaveAttribute('aria-selected', 'true');
  });
});
