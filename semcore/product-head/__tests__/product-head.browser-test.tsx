import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const breakpoints = [
    { width: 320 },
    { width: 768 },
    { width: 1280 },
    { width: 1920 },
  ];

  breakpoints.forEach(({ width }) => {
    test(`Verify base example looks good on screen width ${width}px`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@product-head',
        '@button',
        '@tooltip',
        '@base-components',
        '@base-trigger',
        '@breadcrumbs',
        '@button-link',
        '@description-tooltip',
        '@dropdown-menu',
        '@flags',
        '@flex-box',
        '@inline-edit',
        '@inline-input',
        '@input',
        '@link',
        '@link-trigger',
        '@modal',
        '@select',
        '@typography',
        '@wizard'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/product-head/docs/examples/extended_example/index.tsx', 'en');

      await page.setViewportSize({ width, height: 800 });
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify looks good when long long title', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@product-head',
      '@button',
      '@base-components',
      '@base-trigger',
      '@button-link',
      '@description-tooltip',
      '@flex-box',
      '@link',
      '@link-trigger',
      '@select',
      '@tooltip',
      '@typography'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/product-head/advanced/examples/long-long-title.tsx', 'en');
    const title = page.locator('[data-ui-name="Text"]').nth(1);
    const notWebkitStep = browserName === 'webkit' ? test.step.skip : test.step;

    await title.waitFor({ state: 'visible' });

    await notWebkitStep('Hover the long title and wait for hint (hint is unstable on WebKit in CI)', async () => {
      await title.hover();
      await page.waitForTimeout(100); // needed for ff
      await page.locator('[data-ui-name="Hint"]').waitFor({ state: 'visible', timeout: 1500 });
    });

    await test.step('Verify long title', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify renders when single items used', {
    tag: [TAG.PRIORITY_HIGH,
      '@product-head',
      '@button',
      '@tooltip',
      '@breadcrumbs',
      '@base-trigger',
      '@button-link',
      '@description-tooltip',
      '@link',
      '@link-trigger',
      '@select',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/product-head/tests/examples/test_example.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify focus by keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@product-head',
      '@button',
      '@tooltip',
      '@base-components',
      '@base-trigger',
      '@breadcrumbs',
      '@button-link',
      '@description-tooltip',
      '@dropdown-menu',
      '@flags',
      '@flex-box',
      '@inline-edit',
      '@inline-input',
      '@input',
      '@link',
      '@link-trigger',
      '@modal',
      '@select',
      '@typography',
      '@wizard'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/product-head/docs/examples/extended_example/index.tsx', 'en');

    const selectTrigger = page.locator('[data-ui-name="Select.Trigger"]').first();
    const tooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]').first();
    const tooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

    await test.step('Verify focus order through breadcrumbs, links and button', async () => {
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="Breadcrumbs.Item"]').first()).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="Link"]')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="ButtonLink"]')).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="Button"]').first()).toBeFocused();
    });

    await test.step('Verify country selected in Select by keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(selectTrigger).toBeFocused();

      await page.keyboard.press('Space');
      await page.locator('[data-ui-name="Input"]').waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await page.locator('[data-ui-name="Select.Option"]').first().waitFor({ state: 'hidden' });
      await expect(selectTrigger).toBeFocused();
      await expect(selectTrigger).toHaveAttribute('value', 'AF');
    });

    await test.step('Verify description tooltip opened by Space and closed by Escape', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(tooltipTrigger).toBeFocused();
      await page.keyboard.press('Space');
      await tooltipPopper.waitFor({ state: 'visible' });
      await expect(tooltipPopper).toBeFocused();

      await page.keyboard.press('Escape');
      await tooltipPopper.waitFor({ state: 'hidden' });
    });

    await test.step('Verify Shift+Tab returns focus to Select', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(page.locator('[data-ui-name="Select"]')).toBeFocused();
    });
  });
});
