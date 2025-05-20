import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

async function checkAriaMaxValue(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuemax');
  const attrValue = await scrollBar.getAttribute('aria-valuemax');
  expect(attrValue).not.toBeNull();
  const value = Number(attrValue);
  return value;
}

async function checkScrollNowIncreased(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuenow');
  const nowValue = await scrollBar.getAttribute('aria-valuenow');
  expect(nowValue).not.toBeNull();
  const nowNumber = Number(nowValue);
  return nowNumber;
}

test.describe('Vertical Scroll', () => {
  test('Verify Keyboard scroll when Sticky header and no interactive in cells', async ({
    page,
  }) => {
    const standPath =
      'stories/components/data-table/tests/examples/scroll-tests/scroll-in-table-sticky.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const initialValue = await checkAriaMaxValue(scrollBar);
    await page.keyboard.press('Tab');
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('ArrowDown');
    }
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
  });

  test('Verify Mouse scroll when Sticky header and no interactive in cells', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples//scroll-tests/scroll-in-table-sticky.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const dataTable = await page.locator('[data-ui-name="DataTable"]');
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const initialValue = await checkAriaMaxValue(scrollBar);
    await dataTable.hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Keyboard scroll when Sticky header and interactive in cells', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/table-with-1tf-and diff-elements.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const initialValue = await checkAriaMaxValue(scrollBar);
    await page.keyboard.press('Tab');
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowDown');
    }
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot();
  });

  test('Verify mouse scroll when Sticky header and interactive in cells', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/table-with-1tf-and diff-elements.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const dataTable = await page.locator('[data-ui-name="DataTable"]');
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const initialValue = await checkAriaMaxValue(scrollBar);
    await dataTable.hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Keyboard scroll when header not Sticky ', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/scroll-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
    const initialValue = await checkAriaMaxValue(scrollBar);
    await page.keyboard.press('Tab');
    for (let i = 0; i < 7; i++) {
      await page.keyboard.press('ArrowDown');
    }
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot();
  });

  test('Verify mouse scroll when header not Sticky', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/scroll-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const dataTable = await page.locator('[data-ui-name="DataTable"]');
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
    const initialValue = await checkAriaMaxValue(scrollBar);
    await dataTable.hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify keyboard when sticky header with top props', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/scroll-tests/scroll-in-top-header.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('ArrowDown');
    }
    await page.waitForTimeout(100);

    const headColumns = page.locator('[data-ui-name="Head.Column"]');
    const count = await headColumns.count();

    for (let i = 0; i < count; i++) {
      const column = headColumns.nth(i);
      const topStyle = await column.evaluate((el) => getComputedStyle(el).top);
      expect(topStyle).toBe('100px');
    }

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});

test.describe('Horizontal Scroll', () => {
  test('Verify keyboard scroll when no fixed columns', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/scroll-tests/horizontal-scroll.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('Verify regular horizontal scroll', async () => {
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
      const initialValue = await checkAriaMaxValue(scrollBar);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowRight');
      }
      await page.waitForTimeout(100);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    await test.step('Verify when header scroll presents', async () => {
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
      const initialValue = await checkAriaMaxValue(scrollBar);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowRight');
      }
      await page.waitForTimeout(100);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });
  });

  test('Verify mouse scroll when no fixed columns', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/scroll-tests/horizontal-scroll.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify regular horizontal scroll', async () => {
      const dataTable = await page.locator('[data-ui-name="DataTable"]').first();

      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
      const initialValue = await checkAriaMaxValue(scrollBar);
      await dataTable.hover();
      await page.mouse.wheel(600, 0);
      await page.waitForTimeout(1000);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    await test.step('Verify when header scroll presents', async () => {
      const dataTable = await page.locator('[data-ui-name="DataTable"]').nth(1);

      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
      const initialValue = await checkAriaMaxValue(scrollBar);
      await dataTable.hover();
      await page.mouse.wheel(600, 0);
      await page.waitForTimeout(1000);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });
  });

  test('Verify keyboard scroll when 1 level header and columns fixed', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/fixed-columns.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(0);
    const initialValue = await checkAriaMaxValue(scrollBar);
    await page.keyboard.press('Tab');
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(200);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify mouse scroll when 1 level header and columns fixed', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/fixed-columns.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const dataTable = await page.locator('[data-ui-name="DataTable"]');

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
    const initialValue = await checkAriaMaxValue(scrollBar);
    await dataTable.hover();
    await page.mouse.wheel(600, 0);
    await page.waitForTimeout(1000);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify keyboard scroll when columns with differend width fixed', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/scroll-tests/fixed-column-with-d-ff-width.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
    const initialValue = await checkAriaMaxValue(scrollBar);
    await page.keyboard.press('Tab');
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(200);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify keyboard scroll when multilevel parent fixed', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/scroll-tests/horizontal-scroll-fixed-group.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
    const initialValue = await checkAriaMaxValue(scrollBar);
    await page.keyboard.press('Tab');
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(100);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);

    const scrollBar2 = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(2);
    const initialValue2 = await checkAriaMaxValue(scrollBar2);
    await page.keyboard.press('Tab');
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(100);
    const nowNumber2 = await checkScrollNowIncreased(scrollBar2);
    expect(nowNumber2).toBeLessThanOrEqual(initialValue2);

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify mouse scroll when multilevel parent fixed', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/scroll-tests/horizontal-scroll-fixed-group.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const dataTable = await page.locator('[data-ui-name="DataTable"]');

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
    const initialValue = await checkAriaMaxValue(scrollBar);
    await dataTable.first().hover();
    await page.mouse.wheel(600, 0);
    await page.waitForTimeout(200);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);

    await dataTable.nth(1).hover();
    const scrollBarHeader = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(2);
    const initialValue2 = await checkAriaMaxValue(scrollBarHeader);
    await page.mouse.wheel(600, 0);
    await page.waitForTimeout(200);
    const nowNumber2 = await checkScrollNowIncreased(scrollBarHeader);
    expect(nowNumber2).toBeLessThanOrEqual(initialValue2);

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify keyboard when vertical and horizontal presents', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/scroll-tests/multiple-scrolls.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
    const initialValue = await checkAriaMaxValue(scrollBar);
    await page.keyboard.press('Tab');
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(100);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);

    const scrollBar2 = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
    const initialValue2 = await checkAriaMaxValue(scrollBar2);

    await page.keyboard.press('Tab');
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('ArrowDown');
    }
    await page.waitForTimeout(100);
    const nowNumber2 = await checkScrollNowIncreased(scrollBar2);
    expect(nowNumber2).toBeLessThanOrEqual(initialValue2);

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify mouse when vertical and horizontal presents', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/scroll-tests/multiple-scrolls.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const dataTable = await page.locator('[data-ui-name="DataTable"]');

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
    const initialValue = await checkAriaMaxValue(scrollBar);
    await dataTable.hover();
    await page.mouse.wheel(600, 0);
    await page.waitForTimeout(1000);
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

    const scrollBar2 = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
    const initialValue2 = await checkAriaMaxValue(scrollBar2);

    await dataTable.hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    await page.waitForTimeout(100);
    const nowNumber2 = await checkScrollNowIncreased(scrollBar2);
    expect(nowNumber2).toBeLessThanOrEqual(initialValue2);
  });
});
