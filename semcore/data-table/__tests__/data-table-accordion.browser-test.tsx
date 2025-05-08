import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

const checkStyles = async (element: any, styles: Record<string, string>) => {
  for (const [property, value] of Object.entries(styles) as [string, string][]) {
    await expect(element).toHaveCSS(property, value);
  }
};

test.describe('Accordion in table', () => {
  test('Verify keyboard interactions with accordion and chart inside', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    const plot = await page.locator('[data-ui-name="Plot"]');
    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await expect(plot).toHaveCount(1);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await expect(plot).toHaveCount(0);

    await expect(page).toHaveScreenshot();
    await expect(firstArrow).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(plot).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    const secondArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(1);

    await expect(secondArrow).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await expect(plot).toBeVisible();
    await expect(plot).toHaveCount(1);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);

    await expect(plot).not.toBeVisible();
    await expect(plot).toHaveCount(0);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);

    await page.keyboard.press('ArrowDown');
    // await expect(page.getByRole('gridcell', { name: 'Chart' })).toBeFocused();

    await page.keyboard.press('ArrowDown');
    const thirdArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(2);
    await expect(thirdArrow).toBeFocused();
  });

  test('Verify mouse interactions with accordion and chart inside', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();

    await firstArrow.click();
    await page.keyboard.press('ArrowDown');
    const plot = await page.locator('[data-ui-name="Plot"]');
    await expect(plot).toHaveCount(1);
    await firstArrow.click();
    await expect(plot).toHaveCount(0);
    await firstArrow.click();

    const thirdArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(2);
    await thirdArrow.click();
    await expect(plot).toHaveCount(2);
  });

  test('Verify accordion with chart styles', async ({ page, browserName }) => {
    const standPath = 'stories/components/data-table/docs/examples/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();
    const marginRight1 = await firstArrow.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight1).toBe('12px');
    await firstArrow.click();
    await page.waitForTimeout(100);
    const marginRight = await firstArrow.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight).toBe('12px');
    const plot = await page.locator('[data-ui-name="Plot"]');
    await expect(plot).toHaveCount(1);

    const row3 = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
    const cells = row3.locator('div');
    const cellCount = await cells.count();

    for (let i = 0; i < cellCount; i++) {
      const cell = cells.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(230, 231, 237)',
      });
    }

    const row4 = page.locator('[data-ui-name="Collapse"][aria-rowindex="3"]');
    await checkStyles(row4.locator('div').first(), {
      'background-color': 'rgb(244, 245, 249)',
    });

    const secondArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(1);
    await secondArrow.click();
    await page.waitForTimeout(100);

    await expect(plot).toHaveCount(2);
    const row5 = page.locator('[data-ui-name="Body.Row"][aria-rowindex="4"]');
    const cells5 = row5.locator('div');

    const cellCount5 = await cells5.count();
    if (browserName !== 'firefox')
      for (let i = 0; i < cellCount5 - 1; i++) {
        const cell = cells5.nth(i);
        await checkStyles(cell, {
          'background-color': 'rgb(240, 240, 244)',
        });
      }

    await checkStyles(cells5.nth(3), {
      'background-color': 'rgb(230, 231, 237)',
    });

    await firstArrow.click();
    if (browserName !== 'firefox')
      for (let i = 0; i < cellCount; i++) {
        const cell = cells.nth(i);
        await checkStyles(cell, {
          'background-color': 'rgb(240, 240, 244)',
        });
      }
  });

  test('Verify accordion attributes', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/accordion-inside-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();
    await expect(firstArrow).toHaveAttribute('aria-label', 'Show details');
    const row3 = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
    const cells = row3.locator('div');

    await expect(cells.first()).toHaveAttribute('aria-expanded', 'false');
    await expect(cells.nth(1)).not.toHaveAttribute('aria-expanded', 'false');
    await firstArrow.click();
    await expect(cells.first()).toHaveAttribute('aria-expanded', 'true');
  });

  test('Verify accordion table in table styles', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();
    const marginRight1 = await firstArrow.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight1).toBe('12px');
    await firstArrow.click();
    const marginRight = await firstArrow.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    expect(marginRight).toBe('12px');

    const row2 = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
    const cells2 = row2.locator('div');

    const cellCount = await cells2.count();

    for (let i = 0; i < cellCount; i++) {
      const cell = cells2.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(230, 231, 237)',
      });
    }

    const row3 = page.locator('[data-ui-name="Row"][aria-rowindex="3"]');
    const cells3 = row3.locator('div');

    const cellCount3 = await cells3.count();

    for (let i = 0; i < cellCount3; i++) {
      const cell = cells3.nth(i);
      await checkStyles(cell, {
        'background-color': 'rgb(244, 245, 249)',
      });
    }

    const peddingLeft = await cells3.first().evaluate((el) => {
      return window.getComputedStyle(el).paddingLeft;
    });

    expect(peddingLeft).toBe('40px');
  });

  test('Verify keyboard navigation when interactive element incide cell', async ({ page }) => {
    const standPath = 'stories/components/data-table/tests/examples/accordion-tests/accordion-with-render-cell.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');

  const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();
  const row = page.locator('[data-ui-name="Body.Row"][aria-rowindex="2"]');
  const firstrowCell = row.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]')
 const widget = page.locator('[data-ui-name="WidgetNoData"]');
  await test.step('Verify focus on whole first body cell', async () => {
  await expect(firstrowCell).toBeFocused();
});

await page.keyboard.press('Enter');

await test.step('Verify focus on accrorsion arrow inside cell and its collapsed ', async () => {
  await expect(firstArrow).toBeFocused();
  await expect(widget).not.toBeVisible();
});

await page.keyboard.press('Escape');

await test.step('Verify focus on whole first body cell by escape', async () => {
  await expect(firstrowCell).toBeFocused();
});


   
  });
});
