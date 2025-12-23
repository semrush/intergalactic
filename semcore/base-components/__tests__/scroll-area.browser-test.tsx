import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

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

async function waitForScrollChange(scrollBar: any, timeout = 3000) {
  const before = Number(await scrollBar.getAttribute('aria-valuenow'));

  await expect
    .poll(async () => {
      const current = Number(await scrollBar.getAttribute('aria-valuenow'));
      return current;
    }, { timeout })
    .toBeGreaterThan(before);
}

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */

test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify base example keyboard scroll and aria attributes', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@base-components',
      '@scroll-area'],
  }, async ({ page }) => {
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

  test('Verify base example mouse scroll', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@base-components',
      '@scroll-area'],
  }, async ({ page }) => {
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

  test('Verify synchronized reverse keyboard scroll', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@base-components',
      '@scroll-area'],
  }, async ({ page }) => {
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

  test('Verify dynamic virtual list keyboard scroll', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@base-components',
      '@scroll-area'],
  }, async ({ page }) => {
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
      .toBeGreaterThanOrEqual(initialMax);

    await grid.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await waitForScrollChange(scrollBar);

    const now = await checkAriaNowValue(scrollBar);
    expect(now).toBeGreaterThan(0);
  });

  test('Verify scrollArea reacts to parent resize', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@base-components',
      '@scroll-area'],
  }, async ({ page }) => {
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

  test('Verify interactive element clickable inside focused scroll area', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@base-components',
      '@scroll-area',
      '@button'],
  }, async ({ page }) => {
    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });

    await loadPage(page, 'stories/components/base-components/scroll-area/advanced/examples/iteractive-element-inside-scroll-area.tsx', 'en');
    await page.keyboard.press('Tab');
    const button = page.getByRole('button', { name: 'Click me' });
    await button.click();
    await expect.poll(() => logs).toContain('Button clicked');
  });
});

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify base example keyboard scroll', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@base-components',
      '@scroll-area'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/docs/examples/basic_usage.tsx', 'en');
    const scrollContainer = page.locator('[data-ui-name="ScrollArea.Container"]');

    await page.keyboard.press('Tab');
    await expect(scrollContainer).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await waitForScrollChange(page.locator('[data-ui-name="ScrollArea.Bar"]'));

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify base example mouse scroll', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@base-components',
      '@scroll-area'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/docs/examples/basic_usage.tsx', 'en');

    const container = page.locator('[data-ui-name="ScrollArea.Container"]');
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

    await container.hover();
    await page.mouse.wheel(0, 600);
    await waitForScrollChange(scrollBar);

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  const baseCombinations = [
    {
      shadow: true,
      orientation: 'vertical',
      shadowTheme: 'dark',
      shadowSize: 20,
      focusRingTopOffset: '0px',
      focusRingBottomOffset: '0px',
      focusRingLeftOffset: '0px',
      focusRingRightOffset: '0px',
      topOffset: 100,
      bottomOffset: 100,
      leftOffset: 100,
      rightOffset: 100,
    },
    {
      shadow: true,
      orientation: 'horizontal',
      shadowTheme: 'light',
      shadowSize: 30,
      focusRingTopOffset: '40px',
      focusRingBottomOffset: '40px',
      focusRingLeftOffset: '40px',
      focusRingRightOffset: '40px',
      topOffset: 100,
      bottomOffset: 100,
      leftOffset: 100,
      rightOffset: 100,
    },
    {
      shadow: false,
      orientation: 'vertical',
      shadowTheme: 'dark',
      shadowSize: 15,
      focusRingTopOffset: '0px',
      focusRingBottomOffset: '0px',
      focusRingLeftOffset: '0px',
      focusRingRightOffset: '0px',
      topOffset: 100,
      bottomOffset: 100,
      leftOffset: 100,
      rightOffset: 100,
    },
    {
      shadow: false,
      orientation: 'horizontal',
      shadowTheme: 'light',
      shadowSize: 25,
      focusRingTopOffset: '0px',
      focusRingBottomOffset: '0px',
      focusRingLeftOffset: '0px',
      focusRingRightOffset: '0px',
      topOffset: 0,
      bottomOffset: 0,
      leftOffset: 0,
      rightOffset: 0,
    },
  ];

  baseCombinations.forEach((item) => {
    test(`Verify mouse Scroll Area with shadow=${item.shadow} orientation=${item.orientation} shadowTheme=${item.shadowTheme} shadowSize=${item.shadowSize}  focusRingOffset=${item.focusRingTopOffset} Offset=${item.topOffset} `, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@base-components',
        '@scroll-area'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/scroll-area/tests/examples/scroll-props.tsx', 'en', item);

      const scrollContainer = page.locator('[data-ui-name="ScrollArea.Container"]');
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await scrollContainer.hover();
      if (item.orientation === 'vertical') {
        await page.mouse.wheel(0, 300);
      } else if (item.orientation === 'horizontal') {
        await page.mouse.wheel(300, 0);
      }
      await waitForScrollChange(scrollBar);

      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    test(`Verify keyboard Scroll Area with shadow=${item.shadow} orientation=${item.orientation} shadowTheme=${item.shadowTheme} shadowSize=${item.shadowSize} focusRingOffset=${item.focusRingTopOffset} Offset=${item.topOffset}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@base-components',
        '@scroll-area'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/scroll-area/tests/examples/scroll-props.tsx', 'en', item);

      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await page.keyboard.press('Tab');
      if (item.orientation === 'horizontal') {
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
      } else if (item.orientation === 'vertical') {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
      }
      await waitForScrollChange(scrollBar);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });
  });

  test('Verify scrollArea relative height after resize', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@base-components',
      '@scroll-area'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/advanced/examples/relative_container_height.tsx', 'en');

    await page.setViewportSize({ width: 1600, height: 1200 });
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

    await page.setViewportSize({ width: 1600, height: 400 });
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});
