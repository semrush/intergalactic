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
  tabLines: (page: Page) => page.getByRole('tab'),
  addons: (page: Page) => page.locator('[data-ui-name="TabLine.Item.Addon"]'),
  text: (page: Page) => page.locator('[data-ui-name="TabLine.Item.Text"]'),
  tabLine: (page: Page) => page.getByRole('tablist'),
  tabpanel: (page: Page) => page.locator('[role="tabpanel"]'),

};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesActive = [
    { disabled: false, size: 'm', underlined: true },
    { disabled: false, size: 'l', underlined: false },
  ];
  variablesActive.forEach((item) => {
    test(`Verify active Tab lines size = ${item.size} underlined = ${item.underlined} styles`, {
      tag: [TAG.PRIORITY_HIGH,
        '@tab-line',
        '@base-components',

        '@counter',
        '@badge'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', item);

      await page.keyboard.press('Tab');
      await locators.tabLines(page).nth(2).hover();

      await expect(page).toHaveScreenshot();

      const m_size = page.locator('[data-ui-name="TabLine"][class*="size_m"]');
      const l_size = page.locator('[data-ui-name="TabLine"][class*="size_l"]');

      await test.step('Verify tab line styles styles', async () => {
        const countText = await locators.text(page).count();
        for (let i = 0; i < countText - 2; i++) {
          await expect(locators.text(page).nth(i)).toHaveCSS('margin-right', '8px');
        }
        await expect(locators.text(page).nth(countText - 2)).not.toHaveCSS('margin-right', '8px');
        await expect(locators.text(page).nth(countText - 1)).not.toHaveCSS('margin-right', '8px');

        const countTabs = await locators.tabLines(page).count();
        for (let i = 0; i < countTabs - 1; i++) {
          await expect(locators.tabLines(page).nth(i)).toHaveCSS('margin-right', '16px');
        }
        await expect(locators.tabLines(page).nth(countTabs - 1)).not.toHaveCSS('margin-right', '16px');

        await expect(locators.addons(page).nth(0)).toHaveCSS('margin-right', '8px');
        await expect(locators.addons(page).nth(2)).toHaveCSS('margin-right', '8px');
        await expect(locators.addons(page).nth(4)).toHaveCSS('margin-right', '8px');
        await expect(locators.addons(page).nth(7)).toHaveCSS('margin-right', '8px');

        await expect(locators.addons(page).nth(1)).not.toHaveCSS('margin-right', '8px');
        await expect(locators.addons(page).nth(3)).not.toHaveCSS('margin-right', '8px');
        await expect(locators.addons(page).nth(5)).not.toHaveCSS('margin-right', '8px');
        await expect(locators.addons(page).nth(6)).not.toHaveCSS('margin-right', '8px');
      });

      await test.step('Verify tab line sizes styles', async () => {
        if (await m_size.count() > 0) {
          const tabLinesCount = await locators.tabLines(page).count();
          for (let i = 0; i < tabLinesCount; i++) {
            await expect(locators.tabLines(page).nth(i)).toHaveCSS('height', '28px');
          }
        } else if (await l_size.count() > 0) {
          const tabLinesCount = await locators.tabLines(page).count();
          for (let i = 0; i < tabLinesCount; i++) {
            await expect(locators.tabLines(page).nth(i)).toHaveCSS('height', '40px');
          }
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
        '@badge'],
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
    const box = await locators.tabLines(page).nth(1).boundingBox();
    if (box) {
      await page.mouse.move(box.x + 10, box.y + 5);
    }
    await page.waitForSelector('text="Do not forget to add short text to explain why this item is disabled."');

    await expect(page).toHaveScreenshot();
  });

  const variablesEllipsis = [
    { w: 100, size: 'l', behavior: 'auto', hintPlacement: 'right', desc: 'default' },
    { w: 100, size: 'm', behavior: 'auto', ellipsis: { 'ellipsis:cropPosition': 'middle' }, hintPlacement: 'right', desc: 'cropPosition:middle' },
    { w: 100, size: 'l', behavior: 'manual', hintPlacement: 'right', desc: 'default' },
    { w: 100, size: 'm', behavior: 'manual', ellipsis: { 'ellipsis:cropPosition': 'middle' }, hintPlacement: 'right', desc: 'cropPosition:middle' },
  ];
  variablesEllipsis.forEach((item) => {
    test(`Verify ellipsis in Tab lines behavior = ${item.behavior} size = ${item.size} ellipsis = ${item.desc} styles`, {
      tag: [TAG.PRIORITY_HIGH,
        '@tab-line',
        '@base-components',
        '@ellipsis',
        '@hint',
        '@counter',
        '@badge'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', item);
      await page.waitForTimeout(100);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await page.keyboard.press('ArrowLeft');
      await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible' });
      await locators.tabLines(page).nth(2).hover();
      await page.locator('[data-ui-name="Hint"]').nth(1).waitFor({ state: 'visible' });
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
      '@tab-line'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', { behavior: 'auto' });

    await test.step('Verify tabline roles and attributes', async () => {
      await expect(locators.tabLine(page)).toHaveAttribute('aria-label');
    });
    await test.step('Verify tabs roles and attributes when first is selected', async () => {
      const countTabs = await locators.tabLines(page).count();
      for (let i = 0; i < countTabs; i++) {
        await expect(locators.tabLines(page).nth(i)).toHaveAttribute('type', 'button');
        await expect(locators.tabLines(page).nth(i)).toHaveAttribute('aria-selected');
        await expect(locators.tabLines(page).nth(i)).toHaveAttribute('value');
        await expect(locators.tabLines(page).nth(i)).toHaveAttribute('id');
      }
      await expect(locators.tabLines(page).nth(0)).not.toHaveAttribute('aria-controls');
      await expect(locators.tabLines(page).nth(0)).toHaveAttribute('tabindex', '-1');
      await expect(locators.tabLines(page).nth(1)).toHaveAttribute('tabindex', '0');
      await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-controls');
      for (let i = 2; i < countTabs; i++) {
        await expect(locators.tabLines(page).nth(i)).not.toHaveAttribute('aria-controls');
        await expect(locators.tabLines(page).nth(i)).toHaveAttribute('tabindex', '-1');
      }
    });

    await test.step('Verify tabLine roles and attributes and selected attribute when first is selected', async () => {
      await locators.tabLines(page).nth(0).click();

      await expect(locators.tabpanel(page)).toHaveAttribute('tabindex', '-1');
      await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-fb');
      await expect(locators.tabLines(page).nth(0)).toHaveAttribute('aria-selected', 'true');
      await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'false');
      await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'false');
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
      '@tab-line'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', { behavior: 'auto' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Enter');

    await expect(locators.tabLines(page).first()).toBeFocused();
    await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-fb');
    await expect(locators.tabLines(page).nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(locators.tabLines(page).nth(1)).toBeFocused();
    await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-ig');
    await expect(locators.tabLines(page).nth(0)).not.toHaveClass(/selected/);
    await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabLines(page).nth(1)).toHaveClass(/selected/);

    await page.keyboard.press('ArrowLeft');
    await expect(locators.tabLines(page).first()).toBeFocused();
    await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby', 'tab-label-fb');
    await expect(locators.tabLines(page).nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('Verify manual tabs activation by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@tab-line'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', { behavior: 'manual' });

    await page.keyboard.press('Tab');
    await expect(locators.tabLines(page).nth(1)).toBeFocused();
    await expect(locators.tabpanel(page)).toHaveAttribute('aria-labelledby');
    await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabLines(page).nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(locators.tabLines(page).nth(2)).toBeFocused();
    await page.keyboard.press('Space');
    await expect(locators.tabpanel(page)).toContainText('Twitter');
    await expect(locators.tabLines(page).nth(0)).not.toHaveClass(/selected/);
    await expect(locators.tabLines(page).nth(1)).not.toHaveClass(/selected/);

    await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabLines(page).nth(2)).toHaveClass(/selected/);

    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');

    await expect(locators.tabLines(page).first()).toBeFocused();
    await expect(locators.tabpanel(page)).toContainText('Twitter');
    await page.keyboard.press('Enter');
    await expect(locators.tabpanel(page)).toContainText('Facebook');
    await expect(locators.tabLines(page).nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('Verify manual tabs activation by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@tab-line'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx', 'en', { behavior: 'manual' });

    await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabLines(page).nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'false');

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
    await expect(locators.tabLines(page).nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(locators.tabLines(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(locators.tabLines(page).nth(2)).toHaveAttribute('aria-selected', 'false');
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
      '@badge'],
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
