import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variablesActive = [
    { disabled: false, selected: undefined },
    { disabled: false, selected: true },
  ];
  variablesActive.forEach((item) => {
    test(`Verify active Tab Panel selected = ${item.selected} styles`, async ({ page }) => {
      const standPath = 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const tabPanels = page.getByRole('tab');
      const addons = page.locator('[data-ui-name="TabPanel.Item.Addon"]');
      const text = page.locator('[data-ui-name="TabPanel.Item.Text"]');

      await page.keyboard.press('Tab');
      await tabPanels.nth(0).hover();
      await expect(page).toHaveScreenshot();

      await tabPanels.nth(1).hover();
      await expect(page).toHaveScreenshot();

      await test.step('Verify tab panel styles', async () => {
        const countText = await text.count();
        for (let i = 0; i < countText; i++) {
          await expect(text.nth(i)).toHaveCSS('margin-right', '8px');
          await expect(text.nth(i)).toHaveCSS('margin-left', '8px');
        }

        await expect(addons.nth(0)).toHaveCSS('margin-left', '8px');
        await expect(addons.nth(2)).toHaveCSS('margin-left', '8px');
        await expect(addons.nth(4)).toHaveCSS('margin-left', '8px');
        await expect(addons.nth(7)).toHaveCSS('margin-left', '8px');

        await expect(addons.nth(1)).toHaveCSS('margin-right', '8px');
        await expect(addons.nth(3)).toHaveCSS('margin-right', '8px');
        await expect(addons.nth(5)).toHaveCSS('margin-right', '8px');
        await expect(addons.nth(6)).toHaveCSS('margin-right', '8px');
      });
    });
  });

  test('Verify disabled Tab panel styles', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { disabled: true });

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify text width is set', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { w: 500 });

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Verify disabled Tab panel with tooltip', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/docs/examples/disabled_tab_panel_item.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const TabPanels = page.locator('[data-ui-name="TabPanel.Item"]');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    const box = await TabPanels.nth(1).boundingBox();
    if (box) {
      await page.mouse.move(box.x + 10, box.y + 5);
    }
    await page.waitForSelector('text="Do not forget to add short text to explain why this item is disabled."');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify automatic tabs activation by mouse', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/docs/examples/automatic_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const TabPanels = page.locator('[data-ui-name="TabPanel.Item"]');
    const TabPanel = page.locator('[data-ui-name="TabPanel"]');
    const tabpanel = page.getByRole('tabpanel');

    await test.step('Verify TabPanel roles and attributes', async () => {
      await expect(TabPanel).toHaveAttribute('role', 'tablist');
      await expect(TabPanel).toHaveAttribute('aria-label', 'Animals');
    });
    await test.step('Verify tabs roles and attributes when first is selected', async () => {
      const countTabs = await TabPanels.count();
      for (let i = 0; i < countTabs; i++) {
        await expect(TabPanels.nth(i)).toHaveAttribute('role', 'tab');
        await expect(TabPanels.nth(i)).toHaveAttribute('type', 'button');
        await expect(TabPanels.nth(i)).toHaveAttribute('aria-selected');
        await expect(TabPanels.nth(i)).toHaveAttribute('value');
        await expect(TabPanels.nth(i)).toHaveAttribute('id');
      }
      await expect(TabPanels.nth(0)).toHaveAttribute('tabindex', '0');

      await expect(TabPanels.nth(0)).toHaveAttribute('aria-controls');
      for (let i = 1; i < countTabs; i++) {
        await expect(TabPanels.nth(i)).not.toHaveAttribute('aria-controls');
        await expect(TabPanels.nth(i)).toHaveAttribute('tabindex', '-1');
      }
    });

    await test.step('Verify tabpanel roles and attributes and selected attribute when first is selected', async () => {
      await expect(tabpanel).toHaveAttribute('tabindex', '-1');
      await expect(tabpanel).not.toHaveAttribute('aria-hidden', 'true');
      await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
      await expect(TabPanels.nth(0)).toHaveAttribute('aria-selected', 'true');
      await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'false');
      await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'false');
    });
    await test.step('Verify tabpanel roles and attributes and selected attribute when second is selected', async () => {
      await TabPanels.nth(1).click();
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-1-2');
      await expect(TabPanels.nth(0)).not.toHaveClass(/selected/);
      await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'true');
      await expect(TabPanels.nth(1)).toHaveClass(/selected/);
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('tabindex', '-1');
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test('Verify automatic tabs activation by keyboard', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/docs/examples/automatic_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const TabPanels = page.locator('[data-ui-name="TabPanel.Item"]');
    await page.keyboard.press('Tab');
    await expect(TabPanels.first()).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
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
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
    await expect(TabPanels.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('Verify manual tabs activation by keyboard', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/docs/examples/manual_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const TabPanels = page.locator('[data-ui-name="TabPanel.Item"]');
    await page.keyboard.press('Tab');
    await expect(TabPanels.first()).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await expect(TabPanels.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(TabPanels.nth(1)).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await page.keyboard.press('Space');
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-2');
    await expect(TabPanels.nth(0)).not.toHaveClass(/selected/);
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(1)).toHaveClass(/selected/);

    await page.keyboard.press('ArrowLeft');
    await expect(TabPanels.first()).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-2');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await expect(TabPanels.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('Verify manual tabs activation by mouse', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/docs/examples/manual_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
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

  test('Verify interactions with defaultValue props', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/tests/examples/value_and_default_value.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const TabPanels = page.locator('[data-ui-name="TabPanel.Item"]');
    const messages: string[] = [];

    await expect(TabPanels.nth(1)).toHaveClass(/selected/);
    await expect(TabPanels.nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'false');
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        messages.push(msg.text());
      }
    });
    await TabPanels.nth(0).click();

    await expect
      .poll(() => messages)
      .toContain('Tab changed to facebook');
  });

  test('Verify tabs activation by mouse and keyboard', async ({ page }) => {
    const standPath = 'stories/components/tab-panel/tests/examples/tab_panel_item_addons_and_props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const TabPanels = page.locator('[data-ui-name="TabPanel.Item"]');
    await TabPanels.nth(1).click();
    await page.keyboard.press('ArrowRight');
    await expect(TabPanels.nth(2)).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-tw');
    await expect(TabPanels.nth(2)).toHaveAttribute('aria-selected', 'true');

    await TabPanels.nth(1).click();
    await expect(TabPanels.nth(1)).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-ig');
    await expect(TabPanels.nth(1)).toHaveAttribute('aria-selected', 'true');
  });
});
