import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variablesActive = [
    { disabled: false, size: 'm', underlined: true, selected: undefined },
    { disabled: false, size: 'l', underlined: false, selected: false },
    { disabled: false, size: 'm', underlined: true, selected: true },
  ];
  variablesActive.forEach((item) => {
    test(`Verify active Tab lines size = ${item.size} underlined = ${item.underlined} selected = ${item.selected} styles`, async ({ page }) => {
      const standPath = 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const tabLines = page.locator('[data-ui-name="TabLine.Item"]');
      const addons = page.locator('[data-ui-name="TabLine.Item.Addon"]');
      const text = page.locator('[data-ui-name="TabLine.Item.Text"]');
      await page.keyboard.press('Tab');
      await tabLines.nth(2).hover();

      await expect(page).toHaveScreenshot();

      const m_size = page.locator('[data-ui-name="TabLine"][class*="size_m"]');
      const l_size = page.locator('[data-ui-name="TabLine"][class*="size_l"]');

      await test.step('Verify tab line styles styles', async () => {
        const countText = await text.count();
        for (let i = 0; i < countText - 2; i++) {
          await expect(text.nth(i)).toHaveCSS('margin-right', '8px');
        }
        await expect(text.nth(countText - 2)).not.toHaveCSS('margin-right', '8px');
        await expect(text.nth(countText - 1)).not.toHaveCSS('margin-right', '8px');

        const countTabs = await tabLines.count();
        for (let i = 0; i < countTabs - 1; i++) {
          await expect(tabLines.nth(i)).toHaveCSS('margin-right', '16px');
        }
        await expect(tabLines.nth(countTabs - 1)).not.toHaveCSS('margin-right', '16px');

        await expect(addons.nth(0)).toHaveCSS('margin-right', '8px');
        await expect(addons.nth(2)).toHaveCSS('margin-right', '8px');
        await expect(addons.nth(4)).toHaveCSS('margin-right', '8px');
        await expect(addons.nth(7)).toHaveCSS('margin-right', '8px');

        await expect(addons.nth(1)).not.toHaveCSS('margin-right', '8px');
        await expect(addons.nth(3)).not.toHaveCSS('margin-right', '8px');
        await expect(addons.nth(5)).not.toHaveCSS('margin-right', '8px');
        await expect(addons.nth(6)).not.toHaveCSS('margin-right', '8px');
      });

      await test.step('Verify tab line sizes styles', async () => {
        if (await m_size.count() > 0) {
          const tabLinesCount = await tabLines.count();
          for (let i = 0; i < tabLinesCount; i++) {
            await expect(tabLines.nth(i)).toHaveCSS('height', '28px');
          }
        } else if (await l_size.count() > 0) {
          const tabLinesCount = await tabLines.count();
          for (let i = 0; i < tabLinesCount; i++) {
            await expect(tabLines.nth(i)).toHaveCSS('height', '40px');
          }
        }
      });
    });
  });

  const variablesDisabled = [
    { disabled: true, size: 'm', underlined: true, selected: undefined },
    { disabled: true, size: 'l', underlined: false, selected: false },
    { disabled: true, size: 'm', underlined: true, selected: true },
  ];
  variablesDisabled.forEach((item) => {
    test(`Verify disabled Tab lines size = ${item.size} underlined = ${item.underlined} selected = ${item.selected} styles`, async ({ page }) => {
      const standPath = 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });

  const variablesWidth = [
    { disabled: false, size: 'm', underlined: true, selected: undefined, w: 500 },
    { disabled: false, size: 'l', underlined: false, selected: undefined, w: 500 },
  ];
  variablesWidth.forEach((item) => {
    test(`Verify text and underline when width=${item.w} and underline =${item.underlined} is set`, async ({ page }) => {
      const standPath = 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify disabled tabLine with tooltip', async ({ page }) => {
    const standPath = 'stories/components/tab-line/docs/examples/disabled_tab_line_item.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const tabLines = page.locator('[data-ui-name="TabLine.Item"]');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    const box = await tabLines.nth(1).boundingBox();
    if (box) {
      await page.mouse.move(box.x + 10, box.y + 5);
    }
    await page.waitForSelector('text="Do not forget to add short text to explain why this item is disabled."');

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify automatic tabs activation by mouse', async ({ page }) => {
    const standPath = 'stories/components/tab-line/docs/examples/automatic_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const tabLines = page.locator('[data-ui-name="TabLine.Item"]');
    const tabLine = page.locator('[data-ui-name="TabLine"]');
    const tabpanel = page.getByRole('tabpanel');

    await test.step('Verify tabline roles and attributes', async () => {
      await expect(tabLine).toHaveAttribute('role', 'tablist');
      await expect(tabLine).toHaveAttribute('aria-label', 'Animals');
    });
    await test.step('Verify tabs roles and attributes when first is selected', async () => {
      const countTabs = await tabLines.count();
      for (let i = 0; i < countTabs; i++) {
        await expect(tabLines.nth(i)).toHaveAttribute('role', 'tab');
        await expect(tabLines.nth(i)).toHaveAttribute('type', 'button');
        await expect(tabLines.nth(i)).toHaveAttribute('aria-selected');
        await expect(tabLines.nth(i)).toHaveAttribute('value');
        await expect(tabLines.nth(i)).toHaveAttribute('id');
      }
      await expect(tabLines.nth(0)).toHaveAttribute('tabindex', '0');

      await expect(tabLines.nth(0)).toHaveAttribute('aria-controls');
      for (let i = 1; i < countTabs; i++) {
        await expect(tabLines.nth(i)).not.toHaveAttribute('aria-controls');
        await expect(tabLines.nth(i)).toHaveAttribute('tabindex', '-1');
      }
    });

    await test.step('Verify tabpanel roles and attributes and selected attribute when first is selected', async () => {
      await expect(tabpanel).toHaveAttribute('tabindex', '-1');
      await expect(tabpanel).not.toHaveAttribute('aria-hidden', 'true');
      await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
      await expect(tabLines.nth(0)).toHaveAttribute('aria-selected', 'true');
      await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'false');
      await expect(tabLines.nth(2)).toHaveAttribute('aria-selected', 'false');
    });
    await test.step('Verify tabpanel roles and attributes and selected attribute when second is selected', async () => {
      await tabLines.nth(1).click();
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-1-2');
      await expect(tabLines.nth(0)).not.toHaveClass(/selected/);
      await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'true');
      await expect(tabLines.nth(1)).toHaveClass(/selected/);
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('tabindex', '-1');
      await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test('Verify automatic tabs activation by keyboard', async ({ page }) => {
    const standPath = 'stories/components/tab-line/docs/examples/automatic_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const tabLines = page.locator('[data-ui-name="TabLine.Item"]');
    await page.keyboard.press('Tab');
    await expect(tabLines.first()).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
    await expect(tabLines.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(tabLines.nth(2)).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(tabLines.nth(1)).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-1-2');
    await expect(tabLines.nth(0)).not.toHaveClass(/selected/);
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabLines.nth(1)).toHaveClass(/selected/);

    await page.keyboard.press('ArrowLeft');
    await expect(tabLines.first()).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-1-1');
    await expect(tabLines.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(tabLines.nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('Verify manual tabs activation by keyboard', async ({ page }) => {
    const standPath = 'stories/components/tab-line/docs/examples/manual_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const tabLines = page.locator('[data-ui-name="TabLine.Item"]');
    await page.keyboard.press('Tab');
    await expect(tabLines.first()).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await expect(tabLines.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(tabLines.nth(2)).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('ArrowRight');
    await expect(tabLines.nth(1)).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await page.keyboard.press('Space');
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-2');
    await expect(tabLines.nth(0)).not.toHaveClass(/selected/);
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabLines.nth(1)).toHaveClass(/selected/);

    await page.keyboard.press('ArrowLeft');
    await expect(tabLines.first()).toBeFocused();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-2');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await expect(tabLines.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(tabLines.nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('Verify manual tabs activation by mouse', async ({ page }) => {
    const standPath = 'stories/components/tab-line/docs/examples/manual_tab_activation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const tabLines = page.locator('[data-ui-name="TabLine.Item"]');
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-3-1');
    await expect(tabLines.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(tabLines.nth(2)).toHaveAttribute('aria-selected', 'false');

    await tabLines.nth(1).click();
    await expect(page.locator('div[role="tabpanel"]')).toHaveAttribute('aria-labelledby', 'tab-label-3-2');
    await expect(tabLines.nth(0)).not.toHaveClass(/selected/);
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabLines.nth(1)).toHaveClass(/selected/);
  });

  test('Verify interactions with defaultValue props', async ({ page }) => {
    const standPath = 'stories/components/tab-line/tests/examples/value_and_default_value.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const tabLines = page.locator('[data-ui-name="TabLine.Item"]');
    const messages: string[] = [];

    await expect(tabLines.nth(1)).toHaveClass(/selected/);
    await expect(tabLines.nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabLines.nth(2)).toHaveAttribute('aria-selected', 'false');
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        messages.push(msg.text());
      }
    });
    await tabLines.nth(0).click();

    await expect
      .poll(() => messages)
      .toContain('Tab changed to facebook');
  });

  test('Verify tabs activation by mouse and keyboard', async ({ page }) => {
    const standPath = 'stories/components/tab-line/tests/examples/tab_line_item_addons_and_props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { behavior: 'auto' });

    await page.setContent(htmlContent);
    const tabLines = page.locator('[data-ui-name="TabLine.Item"]');
    await tabLines.nth(1).click();
    await page.keyboard.press('ArrowRight');
    await expect(tabLines.nth(2)).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-tw');
    await expect(tabLines.nth(2)).toHaveAttribute('aria-selected', 'true');

    await tabLines.nth(1).click();
    await expect(tabLines.nth(1)).toBeFocused();
    await expect(page.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-label-ig');
    await expect(tabLines.nth(1)).toHaveAttribute('aria-selected', 'true');
  });
});
