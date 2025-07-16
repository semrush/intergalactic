import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variables = [
    { use: 'primary' },
    { use: 'secondary' },
  ];
  variables.forEach((item) => {
    test(`Verify ${item.use} styles`, async ({ page }) => {
      const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const items = page.locator('h3[data-ui-name="Item.Toggle"]');

      const toggles = page.locator('svg[data-ui-name="Item.Chevron"]');
      await test.step('Verify active and normal states', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus and hover states', async () => {
        await page.keyboard.press('Tab');

        await items.nth(1).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify toggle margins', async () => {
        const count = await toggles.count();
        for (let i = 0; i < count; i++) {
          await expect(toggles.nth(i)).toHaveCSS('margin-right', '8px');
        }
      });

      await test.step('Verify item padding', async () => {
        const count = await items.count();
        for (let i = 0; i < count; i++) {
          await expect(items.nth(i)).toHaveCSS('padding-bottom', '8px');
        }
      });
    });
  });

  test('Verify accordion with width less than content', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { w: '50px' });

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify custom styles for selected toggle', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/custom_styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const toggles = page.locator('[data-ui-name="Item.Toggle"]');
    await toggles.first().click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Item.Collapse"]').nth(1).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify heading tag styles', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/heading_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Item.Collapse"]').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify focus on focusable item inside accorion', async ({
    page,
  }) => {
    const standPath = 'stories/components/accordion/docs/examples/seo.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify base example keyboard interactions and attributes', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const toggles = page.locator('h3[data-ui-name="Item.Toggle"]');
    const toggleButtons = page.locator('[data-ui-name="Item.ToggleButton"]');
    const itemCollapse = page.locator('[data-ui-name="Item.Collapse"]');

    await test.step('Verify toggles tabindex', async () => {
      const count = await toggles.count();
      for (let i = 0; i < count - 1; i++) {
        await expect(toggles.nth(i)).toHaveAttribute('tabindex', '0');
      }
      await expect(toggles.nth(count - 1)).toHaveAttribute('tabindex', '-1');
      await expect(toggles.nth(count - 1)).toHaveAttribute('disabled');
    });

    await test.step('Verify first section expanded', async () => {
      await expect(itemCollapse).toHaveCount(1);

      await expect(itemCollapse).toHaveAttribute('role', 'region');
      await expect(itemCollapse).toHaveAttribute('aria-labelledby');
      await expect(itemCollapse).toHaveAttribute('aria-hidden', 'false');

      await expect(toggleButtons.first()).toHaveAttribute('aria-expanded', 'true');
      await expect(toggleButtons.first()).toHaveAttribute('aria-controls');
      await expect(toggleButtons.first()).toHaveAttribute('role', 'button');

      await expect(toggleButtons.nth(1)).toHaveAttribute('aria-expanded', 'false');
      await expect(toggleButtons.nth(1)).not.toHaveAttribute('aria-controls');

      await expect(toggleButtons.nth(2)).toHaveAttribute('aria-expanded', 'false');
      await expect(toggleButtons.nth(2)).not.toHaveAttribute('aria-controls');
      await expect(toggleButtons.nth(2)).toHaveAttribute('disabled');
    });

    await test.step('Verify icons attributes', async () => {
      const icons = toggleButtons.locator('svg');
      const count = await icons.count();

      for (let i = 0; i < count - 1; i++) {
        await expect(icons.nth(i)).toHaveAttribute('tabindex', '-1');
        await expect(icons.nth(i)).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify focus on tiggles by tab when no interactive elements in item.collapse ', async () => {
      await page.keyboard.press('Tab');
      await expect(toggles.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(toggles.nth(1)).toBeFocused();
    });

    await test.step('Verify two section can be opened', async () => {
      await page.keyboard.press('Space');
      await expect(toggles.nth(1)).toBeFocused();
      await expect(itemCollapse).toHaveCount(2);
      await expect(toggleButtons.first()).toHaveAttribute('aria-expanded', 'true');
      await expect(toggleButtons.nth(1)).toHaveAttribute('aria-expanded', 'true');
    });

    await test.step('Verify no action by arrows and ESC', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Escape');
      await expect(toggles.nth(1)).toBeFocused();
      await expect(itemCollapse).toHaveCount(2);
    });

    await test.step('Verify Shift+Tab moves to the prev element', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(toggles.nth(0)).toBeFocused();
      await expect(itemCollapse).toHaveCount(2);
    });

    await test.step('Verify item.collapse closed by Enter', async () => {
      await page.keyboard.press('Enter');
      await expect(toggles.nth(0)).toBeFocused();
      await expect(itemCollapse).toHaveCount(1);
      await expect(toggleButtons.first()).toHaveAttribute('aria-expanded', 'false');
      await expect(toggleButtons.nth(1)).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test('Verify base example mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const toggles = page.locator('h3[data-ui-name="Item.Toggle"]');
    const toggleButtons = toggles.locator('[data-ui-name="Item.ToggleButton"]');
    const itemCollapse = page.locator('[data-ui-name="Item.Collapse"]');

    await test.step('Verify item collapses by click on text', async () => {
      await toggleButtons.nth(0).getByText('Section 1').click();
      await expect(itemCollapse).toHaveCount(0);
      await expect(toggleButtons.first()).toHaveAttribute('aria-expanded', 'false');
    });

    await test.step('Verify item expands by click on icon', async () => {
      await toggleButtons.nth(0).locator('svg[data-ui-name="Item.Chevron"]').click();
      await expect(itemCollapse).toHaveCount(1);
      await expect(toggleButtons.first()).toHaveAttribute('aria-expanded', 'true');
    });

    await test.step('Verify two section expand by mouse click', async () => {
      await toggleButtons.nth(1).click();
      await expect(itemCollapse).toHaveCount(2);
      await expect(toggleButtons.first()).toHaveAttribute('aria-expanded', 'true');
      await expect(toggleButtons.nth(1)).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test('Verify items render in DOM and focusable elements not focused when collapsed with preserveNode prop', async ({
    page, browserName,
  }) => {
    const standPath = 'stories/components/accordion/docs/examples/seo.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const toggles = page.locator('h3[data-ui-name="Item.Toggle"]');
    const itemCollapse = page.locator('[data-ui-name="Item.Collapse"]');

    await expect(itemCollapse).toHaveCount(3);
    await page.keyboard.press('Tab');
    await expect(toggles.first()).toBeFocused();
    await page.keyboard.press('Enter');
    await page.getByRole('link').waitFor({ state: 'hidden' });
    await expect(toggles.first()).toBeFocused();
    await expect(itemCollapse).toHaveCount(3);
    await page.keyboard.press('Tab');
    await expect(toggles.nth(2)).toBeFocused();
    if (browserName === 'webkit') return;
    await page.keyboard.press('Space');
    await page.keyboard.press('Tab');
    await page.getByRole('link').waitFor({ state: 'visible' });
    await expect(page.getByRole('link')).toBeFocused();
  });

  test('Verify One section opening keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/one_section_opening.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const toggles = page.locator('h3[data-ui-name="Item.Toggle"]');
    const toggleButtons = toggles.locator('[data-ui-name="Item.ToggleButton"]');
    const itemCollapse = page.locator('[data-ui-name="Item.Collapse"]');

    await expect(itemCollapse).toHaveCount(0);
    await page.keyboard.press('Tab');
    await expect(toggles.first()).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(itemCollapse).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(toggles.nth(1)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(itemCollapse).toHaveCount(1);
    await page.keyboard.press('Shift+Tab');
    await expect(toggles.first()).toBeFocused();
    await page.keyboard.press('Space');
    await expect(itemCollapse).toHaveCount(1);
    await page.keyboard.press('Space');
    await expect(itemCollapse).toHaveCount(0);
  });

  test('Verify One section opening mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/one_section_opening.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const toggles = page.locator('h3[data-ui-name="Item.Toggle"]');
    const toggleButtons = toggles.locator('[data-ui-name="Item.ToggleButton"]');
    const itemCollapse = page.locator('[data-ui-name="Item.Collapse"]');

    await expect(itemCollapse).toHaveCount(0);
    await toggles.first().click();
    await expect(itemCollapse).toHaveCount(1);
    await toggles.nth(1).click();
    await expect(itemCollapse).toHaveCount(1);
    await toggles.first().click();
    await expect(itemCollapse).toHaveCount(1);
    await toggles.first().click();
    await expect(itemCollapse).toHaveCount(0);
  });

  test('Verify overflowHidden=false and defaultHeight=auto', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { overflowHidden: false, defaultHeight: 'auto' });

    await page.setContent(htmlContent);

    const toggles = page.locator('h3[data-ui-name="Item.Toggle"]');
    const itemCollapse = page.locator('[data-ui-name="Item.Collapse"]');

    const collapse = page.locator('[data-ui-name="Item.Collapse"]');
    await expect(collapse.first()).toBeVisible();

    const inlineStyle = await collapse.first().getAttribute('style');
    expect(inlineStyle).toContain('height: auto');

    await toggles.first().click();
    await toggles.first().click();
    await itemCollapse.waitFor({ state: 'visible' });
    const inlineStyle2 = await collapse.first().getAttribute('style');
    expect(inlineStyle2).not.toContain('overflow');
  });

  test('Verify overflowHidden=true and defaultHeight=100%', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { overflowHidden: true, defaultHeight: '100%' });

    await page.setContent(htmlContent);

    const toggles = page.locator('h3[data-ui-name="Item.Toggle"]');
    const toggleButtons = page.locator('[data-ui-name="Item.ToggleButton"]');
    const itemCollapse = page.locator('[data-ui-name="Item.Collapse"]');

    const collapse = page.locator('[data-ui-name="Item.Collapse"]');

    await expect(collapse.first()).toBeVisible();

    const inlineStyle = await collapse.first().getAttribute('style');
    expect(inlineStyle).toContain('height: 100%');
    await toggles.first().click();
    await toggles.first().click();
    await itemCollapse.waitFor({ state: 'visible' });
    const inlineStyle2 = await collapse.first().getAttribute('style');
    expect(inlineStyle2).toContain('overflow: clip');
  });

  test('Verify section not expands by clicking on the interactive element in toggle', async ({ page }) => {
    const standPath = 'stories/components/accordion/tests/examples/button-on-toggle.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const toggles = page.locator('h3[data-ui-name="Item.Toggle"]');
    const toggleButtons = toggles.locator('[data-ui-name="Item.ToggleButton"]');
    const itemCollapse = page.locator('[data-ui-name="Item.Collapse"]');
    const buttons = page.locator('[data-ui-name="Button"]');

    await expect(itemCollapse).toHaveCount(0);
    await buttons.first().click();
    await expect(itemCollapse).toHaveCount(0);

    await page.keyboard.press('Tab');
    await expect(toggles.nth(1)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(itemCollapse).toHaveCount(1);

    await page.keyboard.press('Tab');
    await expect(buttons.nth(1)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(itemCollapse).toHaveCount(1);
  });

  test('Verify values with different types', async ({ page }) => {
    const standPath = 'stories/components/accordion/tests/examples/values.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const toggles = page.locator('h3[data-ui-name="Item.Toggle"]');

    await expect(page.locator('[data-test-id="number"]')).toBeVisible();
    await expect(page.locator('[data-test-id="string"]')).toBeVisible();
    await expect(page.locator('[data-test-id="null"]')).toBeVisible();
    await expect(page.locator('[data-test-id="array"]')).not.toBeVisible();

    await toggles.first().click();
    await toggles.nth(1).click();
    await toggles.nth(2).click();
    await expect(page.locator('[data-test-id="number"]')).not.toBeVisible();
    await expect(page.locator('[data-test-id="string"]')).not.toBeVisible();
    await expect(page.locator('[data-test-id="null"]')).not.toBeVisible();
  });

  test('Verify default value', async ({ page }) => {
    const standPath = 'stories/components/accordion/tests/examples/default-values.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page.locator('[data-test-id="default-value"]')).toBeVisible();
  });
});
