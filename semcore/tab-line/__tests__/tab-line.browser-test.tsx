import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  tabLines: (page: Page) => page.getByRole('tab'),
  addons: (page: Page) => page.locator('[data-ui-name="TabLine.Item.Addon"]'),
  text: (page: Page) => page.locator('[data-ui-name="TabLine.Item.Text"]'),
  tabLine: (page: Page) => page.getByRole('tablist'),
  tabpanel: (page: Page) => page.locator('[role="tabpanel"]'),
};

const tabHeight = { m: '32px', l: '44px' };

const expectSelectedTab = async (page: Page, selectedIndex: number) => {
  for (const [index, tab] of (await locators.tabLines(page).all()).entries()) {
    await expect(tab).toHaveAttribute('aria-selected', String(index === selectedIndex));
  }
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesActive = [
    { disabled: false, size: 'm', underlined: true },
    { disabled: false, size: 'l', underlined: false },
  ] as const;
  variablesActive.forEach((item) => {
    test(`Verify active Tab lines size = ${item.size} underlined = ${item.underlined} styles`, {
      tag: [TAG.PRIORITY_HIGH,
        '@tab-line',
        '@base-components',
        '@counter',
        '@badge',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', item);

      await page.keyboard.press('Tab');
      await locators.tabLines(page).nth(2).hover();

      await expect(page).toHaveScreenshot();

      await test.step('Verify gaps between tabs and inside tabs', async () => {
        await expect(locators.tabLine(page)).toHaveCSS('column-gap', item.size === 'l' ? '20px' : '16px');

        for (const tab of await locators.tabLines(page).all()) {
          await expect(tab).toHaveCSS('column-gap', '6px');
          await expect(tab).toHaveCSS('margin-right', '0px');
        }
      });

      await test.step('Verify text and addons have no own margins', async () => {
        for (const element of [...await locators.text(page).all(), ...await locators.addons(page).all()]) {
          await expect(element).toHaveCSS('margin-right', '0px');
          await expect(element).toHaveCSS('margin-left', '0px');
        }
      });

      await test.step(`Verify tab height for size ${item.size}`, async () => {
        await expect(locators.tabLines(page)).not.toHaveCount(0);
        for (const tab of await locators.tabLines(page).all()) {
          await expect(tab).toHaveCSS('height', tabHeight[item.size]);
        }
      });
    });
  });

  const variablesDisabled = [
    { disabled: true, size: 'm', underlined: true },
    { disabled: true, size: 'l', underlined: false },
  ];
  variablesDisabled.forEach((item) => {
    test(`Verify disabled Tab lines size = ${item.size} underlined = ${item.underlined} styles`, {
      tag: [TAG.PRIORITY_HIGH,
        '@tab-line',
        '@base-components',
        '@counter',
        '@badge',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', item);

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify disabled tabLine with tooltip', {
    tag: [TAG.PRIORITY_HIGH,
      '@tab-line',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/docs/examples/disabled_tab_line_item.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await locators.tabLines(page).nth(1).hover({ position: { x: 10, y: 5 } });
    await page.waitForSelector('text="Do not forget to add short text to explain why this item is disabled."');

    await expect(page).toHaveScreenshot();
  });

  const variablesEllipsis = [
    { w: 100, size: 'l', behavior: 'auto', hintPlacement: 'right', desc: 'default' },
    { w: 70, size: 'm', behavior: 'auto', ellipsis: { 'ellipsis:cropPosition': 'middle' }, hintPlacement: 'right', desc: 'cropPosition:middle' },
    { w: 100, size: 'l', behavior: 'manual', hintPlacement: 'right', desc: 'default' },
    { w: 70, size: 'm', behavior: 'manual', ellipsis: { 'ellipsis:cropPosition': 'middle' }, hintPlacement: 'right', desc: 'cropPosition:middle' },
  ];
  variablesEllipsis.forEach((item) => {
    test(`Verify ellipsis in Tab lines behavior = ${item.behavior} size = ${item.size} ellipsis = ${item.desc} styles`, {
      tag: [TAG.PRIORITY_HIGH,
        '@tab-line',
        '@base-components',
        '@ellipsis',
        '@hint',
        '@counter',
        '@badge',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', item);
      await page.waitForTimeout(100);

      await page.keyboard.press('Tab');
      await expect(locators.tabLines(page).nth(1)).toBeFocused();
      await page.waitForTimeout(100);
      await page.keyboard.press('ArrowLeft');
      await expect(locators.tabLines(page).nth(0)).toBeFocused();
      await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
      await page.waitForFunction(() => {
        const el = document.querySelector('[data-ui-name="Hint"]');
        return el && getComputedStyle(el).opacity === '1';
      });
      await locators.tabLines(page).nth(2).hover();
      await page.locator('[data-ui-name="Hint"]').nth(1).waitFor({ state: 'visible' });
      await page.waitForFunction(() => {
        const els = document.querySelectorAll('[data-ui-name="Hint"]');
        return els.length >= 2 && getComputedStyle(els[1]).opacity === '1';
      });
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
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify automatic tabs activation by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@tab-line',
      '@badge',
      '@counter',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', { behavior: 'auto' });

    await test.step('Verify tabline roles and attributes', async () => {
      await expect(locators.tabLine(page)).toHaveAttribute('aria-label');
    });
    await test.step('Verify tabs roles and attributes when second is selected by default', async () => {
      for (const [index, tab] of (await locators.tabLines(page).all()).entries()) {
        await expect(tab).toHaveAttribute('type', 'button');
        await expect(tab).toHaveAttribute('aria-selected');
        await expect(tab).toHaveAttribute('value');
        await expect(tab).toHaveAttribute('id');
        if (index === 1) {
          await expect(tab).toHaveAttribute('tabindex', '0');
          await expect(tab).toHaveAttribute('aria-controls');
        } else {
          await expect(tab).toHaveAttribute('tabindex', '-1');
          await expect(tab).not.toHaveAttribute('aria-controls');
        }
      }
    });

    await test.step('Verify tabLine roles and attributes and selected attribute when first is selected', async () => {
      await locators.tabLines(page).nth(0).click();

      await expect(locators.tabpanel(page)).toHaveAttribute('tabindex', '-1');
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-fb');
      await expectSelectedTab(page, 0);
    });
    await test.step('Verify tabLine roles and attributes and selected attribute when second is selected', async () => {
      await locators.tabLines(page).nth(1).click();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-ig');
      await expect(locators.tabLines(page).nth(0)).not.toHaveClass(/selected/);
      await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'true');
      await expect(locators.tabLines(page).nth(1)).toHaveClass(/selected/);
      await expect(locators.tabpanel(page)).toHaveAttribute('tabindex', '-1');
    });
  });

  test('Verify automatic tabs activation by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@tab-line',
      '@badge',
      '@counter',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', { behavior: 'auto' });

    await test.step('Verify ArrowLeft selects first tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Enter');

      await expect(locators.tabLines(page).first()).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-fb');
      await expectSelectedTab(page, 0);
    });

    await test.step('Verify ArrowRight selects second tab', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.tabLines(page).nth(1)).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-ig');
      await expect(locators.tabLines(page).nth(0)).not.toHaveClass(/selected/);
      await expect(locators.tabLines(page).nth(1)).toHaveClass(/selected/);
      await expectSelectedTab(page, 1);
    });

    await test.step('Verify ArrowLeft selects first tab again', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(locators.tabLines(page).first()).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-fb');
      await expectSelectedTab(page, 0);
    });
  });

  test('Verify manual tabs activation by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@tab-line',
      '@badge',
      '@counter',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', { behavior: 'manual' });

    await test.step('Verify Tab focuses selected tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.tabLines(page).nth(1)).toBeFocused();
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby');
      await expectSelectedTab(page, 1);
    });

    await test.step('Verify arrow moves focus and Space selects tab', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.tabLines(page).nth(2)).toBeFocused();
      await page.keyboard.press('Space');
      await expect(locators.tabpanel(page)).toContainText('Twitter');
      await expect(locators.tabLines(page).nth(0)).not.toHaveClass(/selected/);
      await expect(locators.tabLines(page).nth(1)).not.toHaveClass(/selected/);
      await expect(locators.tabLines(page).nth(2)).toHaveClass(/selected/);
      await expectSelectedTab(page, 2);
    });

    await test.step('Verify arrows do not select tab without Enter', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await expect(locators.tabLines(page).first()).toBeFocused();
      await expect(locators.tabpanel(page)).toContainText('Twitter');
    });

    await test.step('Verify Enter selects focused tab', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.tabpanel(page)).toContainText('Facebook');
      await expectSelectedTab(page, 0);
    });
  });

  test('Verify manual tabs activation by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@tab-line',
      '@badge',
      '@counter',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', { behavior: 'manual' });

    await expectSelectedTab(page, 1);

    await locators.tabLines(page).nth(2).click();
    await expect(locators.tabLines(page).nth(0)).not.toHaveClass(/selected/);
    await expect(locators.tabLines(page).nth(1)).not.toHaveClass(/selected/);

    await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabLines(page).nth(2)).toHaveClass(/selected/);
    await expect(locators.tabpanel(page)).toContainText('Twitter');
  });

  test('Verify interactions with defaultValue props', {
    tag: [TAG.PRIORITY_HIGH,
      '@tab-line'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/value_and_default_value.tsx', 'en', { behavior: 'auto' });

    const messages: string[] = [];

    await expect(locators.tabLines(page).nth(1)).toHaveClass(/selected/);
    await expectSelectedTab(page, 1);
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        messages.push(msg.text());
      }
    });
    await locators.tabLines(page).nth(0).click();

    await expect
      .poll(() => messages)
      .toContain('Tab changed to facebook');
  });

  test('Verify tabs activation by mouse and keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      TAG.KEYBOARD,
      '@tab-line',
      '@base-components',
      '@counter',
      '@badge',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', { behavior: 'auto' });

    await locators.tabLines(page).nth(1).click();
    await page.keyboard.press('ArrowRight');
    await expect(locators.tabLines(page).nth(2)).toBeFocused();
    await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-tw');
    await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'true');

    await locators.tabLines(page).nth(1).click();
    await expect(locators.tabLines(page).nth(1)).toBeFocused();
    await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-ig');
    await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'true');
  });
});
