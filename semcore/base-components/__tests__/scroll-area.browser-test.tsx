import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';

async function checkAriaMaxValue(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuemax');
  const value = Number(await scrollBar.getAttribute('aria-valuemax'));
  expect(value).toBeGreaterThan(0);
  return value;
}

async function checkAriaNowValue(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuenow');
  const value = Number(await scrollBar.getAttribute('aria-valuenow'));
  expect(value).not.toBeNaN();
  return value;
}

async function waitForScrollChange(scrollBar: any, timeout = 2000) {
  const before = await checkAriaNowValue(scrollBar);
  await expect
    .poll(async () => await checkAriaNowValue(scrollBar), { timeout })
    .not.toBe(before);
}

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */

test.describe('@functional @scroll-area', () => {
  test('Verify @keyboard scroll and aria attributes @priority-high @keyboard', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/docs/examples/basic_usage.tsx', 'en');

    const scrollContainer = page.locator('[data-ui-name="ScrollArea.Container"]');
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

    await expect(scrollContainer).toHaveAttribute('tabindex', '0');
    await expect(scrollBar).toHaveAttribute('role', 'scrollbar');
    await expect(scrollBar).toHaveAttribute('aria-orientation', 'vertical');

    const maxValue = await checkAriaMaxValue(scrollBar);

    await page.keyboard.press('Tab');
    await expect(scrollContainer).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    await waitForScrollChange(scrollBar);
    const now = await checkAriaNowValue(scrollBar);
    expect(now).toBeLessThanOrEqual(maxValue);
  });

  test('Verify @mouse scroll behavior @priority-high @mouse', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/docs/examples/basic_usage.tsx', 'en');

    const container = page.locator('[data-ui-name="ScrollArea.Container"]');
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const maxValue = await checkAriaMaxValue(scrollBar);

    await container.hover();
    await page.mouse.wheel(0, 600);
    await waitForScrollChange(scrollBar);

    const now = await checkAriaNowValue(scrollBar);
    expect(now).toBeLessThanOrEqual(maxValue);
  });

  test('Verify synchronized reverse scrolls @priority-medium @keyboard', async ({ page }) => {
    await loadPage(
      page,
      'stories/components/base-components/scroll-area/docs/examples/synchronized_reverse_scroll_on_two_different_screens.tsx',
      'en',
    );

    const mainContainer = page
      .locator('#main-reverse-title')
      .locator('..')
      .locator('[data-ui-name="ScrollArea.Container"]');
    const mainBar = page
      .locator('#main-reverse-title')
      .locator('..')
      .locator('[data-ui-name="ScrollArea.Bar"]');
    const reverseBar = page
      .locator('#control-reverse-title')
      .locator('..')
      .locator('[data-ui-name="ScrollArea.Bar"]');

    const mainInitial = await checkAriaNowValue(mainBar);

    await page.keyboard.press('Tab');
    await expect(mainContainer).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    await waitForScrollChange(mainBar);
    const nowMain = await checkAriaNowValue(mainBar);
    const nowReverse = await checkAriaNowValue(reverseBar);
    expect(nowReverse).toBeLessThan(await checkAriaMaxValue(reverseBar));
    expect(nowMain).toBeGreaterThan(mainInitial);
  });

  test('Verify dynamic virtual list behavior @priority-medium', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/docs/examples/dynamic_virtual_list.tsx', 'en');

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const grid = page.getByRole('grid');

    const initialMax = await checkAriaMaxValue(scrollBar);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter'); // add item

    await expect
      .poll(async () => await checkAriaMaxValue(scrollBar))
      .toBeGreaterThan(initialMax);

    await grid.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await waitForScrollChange(scrollBar);

    const now = await checkAriaNowValue(scrollBar);
    expect(now).toBeGreaterThan(0);
  });

  test('Verify scrollArea reacts to parent resize @priority-high @resize', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/tests/examples/with-observe-parent-size.tsx', 'en');

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const increaseButton = page.getByRole('button', { name: /increase size/i });

    const max1 = await checkAriaMaxValue(scrollBar);
    await increaseButton.click();
    await increaseButton.click();

    await expect
      .poll(async () => await checkAriaMaxValue(scrollBar))
      .toBeGreaterThanOrEqual(max1);
  });
});

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe('@visual @scroll0area', () => {
  test('Verify scroll visuals after @keyboard scroll @priority-medium @keyboard', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/docs/examples/basic_usage.tsx', 'en');
    const scrollContainer = page.locator('[data-ui-name="ScrollArea.Container"]');

    await page.keyboard.press('Tab');
    await expect(scrollContainer).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await waitForScrollChange(page.locator('[data-ui-name="ScrollArea.Bar"]'));

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify visual mouse scroll result @priority-medium @mouse', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/docs/examples/basic_usage.tsx', 'en');

    const container = page.locator('[data-ui-name="ScrollArea.Container"]');
    await container.hover();
    await page.mouse.wheel(0, 600);
    await waitForScrollChange(page.locator('[data-ui-name="ScrollArea.Bar"]'));

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify horizontal scroll with shadow and offsets @priority-high @keyboard', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/tests/examples/horizontal-scroll-with-shadow-and-offset.tsx', 'en');

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    await expect(scrollBar).toHaveAttribute('aria-orientation', 'horizontal');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await waitForScrollChange(scrollBar);

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify vertical scroll with ring offsets @priority-high @mouse', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/tests/examples/vertical-scroll-with-shadow-and-offset.tsx', 'en');

    const scrollContainer = page.locator('[data-ui-name="ScrollArea.Container"]');
    await scrollContainer.hover();
    await page.mouse.wheel(0, 100);
    await waitForScrollChange(page.locator('[data-ui-name="ScrollArea.Bar"]'));

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify vertical scroll with shadow and offsets @priority-high @keyboard', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/tests/examples/vertical-scroll-with-shadow-and-offset.tsx', 'en');

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForScrollChange(scrollBar);

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify scrollArea relative height visual @priority-medium @resize', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/advanced/examples/relative_container_height.tsx', 'en');

    await page.setViewportSize({ width: 1600, height: 1200 });
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

    await page.setViewportSize({ width: 1600, height: 400 });
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});
