import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

async function getColumnWidth(page: any, colIndex: any) {
  const column = await page.locator(`[aria-colindex="${colIndex}"][role="columnheader"]`);
  const box = await column.boundingBox();
  return box ? box.width : 0;
}

const checkStyles = async (element: any, styles: Record<string, string>) => {
  for (const [property, value] of Object.entries(styles) as [string, string][]) {
    await expect(element).toHaveCSS(property, value);
  }
};

test.describe('One level Header', () => {
  test('Verify keyboard interactions when no interactive elements in header', async ({
    page,
    browserName,
  }) => {
    const standPath = 'stories/components/data-table/docs/examples/base.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const table = page.locator('[data-ui-name="DataTable"]');
    await expect(table).toBeVisible();

    await page.keyboard.press('Tab');

    const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

    await expect(firstCell).toBeFocused();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowRight');

    const secondCell = page.locator('[role="gridcell"][aria-colindex="2"]').first();
    await expect(secondCell).toBeFocused();

    await page.keyboard.press('ArrowDown');
    const secondCellSecondRow = page.locator('[role="gridcell"][aria-colindex="2"]').nth(1);
    await expect(secondCellSecondRow).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(secondCell).not.toBeFocused();

    if (browserName === 'firefox') return; //skipped in ff because works unstable in test env
    await page.keyboard.press('Shift+Tab');
    await expect(secondCellSecondRow).toBeFocused();
  });

  test('Verify keyboard interactions when in header hint, checkbox, description tooltip', async ({
    page,
    browserName,
  }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/table-with-1tf-and diff-elements.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const getTooltip = (testId: string) => page.locator(`[data-test-id="${testId}"]`);
    const getTooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');
    const getCell = (index: number) => page.locator('[data-ui-name="Body.Cell"]').nth(index);
    const checkbox = page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]');
    const columnKD = page.locator(
      '[data-ui-name="Head.Column"][name="keyword"][aria-colindex="6"]',
    );

    await test.step('Verify interaction with tooltip without interactive elements', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await new Promise((resolve) => setTimeout(resolve, 250));
      const tooltipTrigger = getTooltip('tooltip-without-interactive-el');
      await expect(tooltipTrigger).toBeFocused();
      await expect(getTooltipPopper).toBeHidden();

      await page.keyboard.press('ArrowDown');
      await expect(getCell(1)).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(tooltipTrigger).toBeFocused();

      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(getTooltipPopper).toBeVisible();
      await expect(getTooltipPopper).toBeFocused();
      await page.keyboard.press('Escape');

      await expect(getTooltipPopper).toBeHidden();
      await expect(tooltipTrigger).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(getTooltip('tooltip-with-interactive-el')).toBeFocused();
    });

    await test.step('Verify interaction with tooltip containing interactive elements', async () => {
      const tooltipTrigger = getTooltip('tooltip-with-interactive-el');
      await page.keyboard.press('ArrowDown');
      await expect(getCell(2)).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await expect(tooltipTrigger).toBeFocused();

      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(getTooltipPopper).toBeVisible();
      await expect(getTooltipPopper).toBeFocused();

      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
      await expect(getTooltipPopper).toBeHidden();
      await expect(tooltipTrigger).toBeFocused();

      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 250));
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="Link"]')).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(getTooltipPopper).toBeHidden();
      await expect(tooltipTrigger).toBeFocused();
    });

    await test.step('Verify interaction with inline tooltip', async () => {
      await page.keyboard.press('ArrowRight');
      await new Promise((resolve) => setTimeout(resolve, 250));
      const linkTrigger = getTooltip('tooltip-with-tag-link');
      await expect(linkTrigger).toBeFocused();
      await expect(page.getByRole('tooltip', { name: 'Default tooltip contains' })).toBeVisible();

      await page.keyboard.press('ArrowDown');
      await expect(page.getByRole('tooltip', { name: 'Default tooltip contains' })).toBeHidden();

      await page.keyboard.press('ArrowUp');
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(page.getByRole('tooltip', { name: 'Default tooltip contains' })).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(page.getByRole('tooltip', { name: 'Default tooltip contains' })).toBeHidden();

      const icon = page.locator('[data-test-id="interactive-icon"]');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(icon).toBeFocused();
      await expect(page.getByText('Go to our awesome article')).toBeVisible();

      await page.keyboard.press('Escape');

      await expect(page.getByText('Go to our awesome article')).toBeHidden();
      await page.keyboard.press('Escape');
      await page.keyboard.press('ArrowRight');
    });

    await test.step('Verify interaction with checkbox and tooltip in header', async () => {
      await expect(columnKD).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(columnKD).not.toBeFocused();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      await expect(checkbox).toBeFocused();

      await page.keyboard.press('Space');
      await expect(checkbox).toHaveClass(/__checked_/);

      await page.keyboard.press('Escape');
      await expect(columnKD).toBeFocused();

      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await expect(checkbox).toBeFocused();
    });
  });

  test('Verify mouse interactions when in header hint, checkbox, description tooltip', async ({
    page,
    browserName,
  }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/table-with-1tf-and diff-elements.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const getTooltip = (testId: string) => page.locator(`[data-test-id="${testId}"]`);
    const tooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');
    const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();
    const checkbox = page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]');

    await test.step('Verify interaction with tooltip without interactive elements', async () => {
      await getTooltip('tooltip-without-interactive-el').click();
      await expect(tooltipPopper).toBeVisible();
      await firstCell.click();
      await expect(tooltipPopper).toBeHidden();
    });

    await test.step('Verify interaction with tooltip containing interactive elements', async () => {
      const tooltipTrigger = getTooltip('tooltip-with-interactive-el');
      await tooltipTrigger.click();
      await expect(tooltipPopper).toBeVisible();

      await tooltipTrigger.click();
      await expect(tooltipPopper).toBeHidden();

      await tooltipTrigger.click();
      await page.locator('[data-ui-name="Link"]').click();
      await expect(tooltipPopper).toBeVisible();
      await firstCell.click();
      await expect(tooltipPopper).toBeHidden();
    });

    await test.step('Verify hover interaction with tooltip', async () => {
      const linkTrigger = getTooltip('tooltip-with-tag-link');
      const tooltip = page.getByRole('tooltip', { name: 'Default tooltip contains' });

      await linkTrigger.hover();
      await expect(tooltip).toBeVisible();

      await firstCell.hover();
      await expect(tooltip).toBeHidden();
    });

    await test.step('Verify interaction with checkbox and tooltip in header', async () => {
      const tooltipTrigger = getTooltip('few-interactive');

      await page.locator('[data-test-id="header-checkbox"] span').first().click();
      await expect(checkbox).toHaveClass(/__checked_/);

      await tooltipTrigger.click();
      await expect(tooltipPopper).toBeVisible();

      await page.locator('[data-test-id="header-checkbox"] span').first().click();
      await expect(tooltipPopper).toBeHidden();
      await expect(checkbox).not.toHaveClass(/__checked_/);
    });
  });

  test('Verify keyboard interactions when in header Select', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/customizing-header.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const ddTrigger = page.locator('[data-ui-name="Select"]');
    const menuItem = page.getByRole('option');
    const headerCell3 = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');

    await test.step('Verify tooltip on focus', async () => {
      await page.keyboard.press('Tab');
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify interactions with DD menu', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(ddTrigger).toBeFocused();

      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(page).toHaveScreenshot();
      await expect(menuItem.first()).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowRight');
      await expect(menuItem.first()).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(ddTrigger).toBeFocused();
      await expect(menuItem.first()).toBeHidden();

      await page.keyboard.press('ArrowRight');
      await expect(menuItem.first()).not.toBeVisible();
      await expect(headerCell3).toBeFocused();
    });

    await test.step('Verify keyboard and mouse interactions', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Enter');
      await expect(menuItem.first()).toBeVisible();
      await ddTrigger.click();
      await expect(menuItem.first()).toBeHidden();
    });
  });

  test('Verify mouse interactions when in header Select', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/customizing-header.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const ddTrigger = page.locator('[data-ui-name="Select"]');
    const menuItem = page.getByRole('option').first();
    const headerCell3 = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');

    await test.step('Cells on hover', async () => {
      await headerCell3.hover();
      await ddTrigger.hover();
    });

    await test.step('Verify mouse interactions ', async () => {
      await ddTrigger.click();
      await expect(menuItem).toHaveCount(1);
      await ddTrigger.click();
      await expect(menuItem).toHaveCount(0);
      await ddTrigger.click();
      await headerCell3.click();
      await expect(menuItem).toHaveCount(0);
    });
  });
});

test.describe('One level header - Sorting', () => {
  test('Verify keyboard sorting without changing size', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify active column highlighted when sorting active', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify keyboard interactions', async () => {
      const getColumn = (i: any) =>
        page.locator(`[data-ui-name="Head.Column"][aria-colindex="${i}"]`);
      const getButton = (col: any) => col.locator('button[data-ui-name="ButtonLink"]');

      const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

      await page.keyboard.press('Tab');
      const button1 = getButton(getColumn(1));
      await expect(button1).toBeFocused();
      await expect(button1).toHaveAttribute('aria-label', 'descending');

      await page.keyboard.press('Enter');
      await expect(button1).toHaveAttribute('aria-label', 'descending');
      await page.keyboard.press('Enter');
      await expect(button1).toHaveAttribute('aria-label', 'ascending');

      for (let i = 2; i <= 4; i++) {
        await page.keyboard.press('ArrowRight');
        const button = getButton(getColumn(i));
        await expect(button).toBeFocused();

        if (i === 4) {
          await button.click();
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowUp');
          await expect(button).toBeFocused();
        }
      }

      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Enter');

      const newWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
      expect(newWidths).toEqual(initialWidths);
    });
  });

  test('Verify sorting with changing size', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/sorting-changing-size.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const afterFirstSortWidths = await Promise.all(
      [1, 2, 3, 4].map((i) => getColumnWidth(page, i)),
    );
    expect(afterFirstSortWidths).toEqual(initialWidths);

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Space');

    const afterSecondSortWidths = await Promise.all(
      [1, 2, 3, 4].map((i) => getColumnWidth(page, i)),
    );

    expect(afterSecondSortWidths[0]).toBeLessThanOrEqual(initialWidths[0]);
    expect(afterSecondSortWidths[1]).toEqual(initialWidths[1]);
    expect(afterSecondSortWidths[2]).toBeGreaterThan(initialWidths[2]);
    expect(afterSecondSortWidths[3]).toEqual(initialWidths[3]);
  });

  test('Verify mouse sorting without changing size', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

    const column1 = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
    const buttonLink1 = column1.locator('button[data-ui-name="ButtonLink"]');
    const column2 = page.locator('[data-ui-name="Head.Column"][aria-colindex="2"]');
    const buttonLink2 = column1.locator('button[data-ui-name="ButtonLink"]');

    await test.step('Verify hover on column with not active sorting', async () => {
      await column1.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify 1st click on not sorted icon activates srrting', async () => {
      await buttonLink1.click();
      await expect(buttonLink1).toHaveAttribute('aria-label', 'descending');
      await buttonLink1.click();
      await expect(buttonLink1).toHaveAttribute('aria-label', 'ascending');
    });

    await test.step('Verify click on the column activates sorting', async () => {
      await column2.click();
      await expect(buttonLink2).toHaveAttribute('aria-label', 'descending');
      await column2.click();
      await expect(buttonLink2).toHaveAttribute('aria-label', 'ascending');
    });

    await test.step('Verify columns width not changed', async () => {
      const newWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
      expect(newWidths).toEqual(initialWidths);
    });
  });

  test('Verify mouse sorting with changing widest column size', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/sorting-changing-size.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
    const column1 = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
    await column1.click();

    const widthsAfterFirstSort = await Promise.all(
      [1, 2, 3, 4].map((i) => getColumnWidth(page, i)),
    );
    expect(widthsAfterFirstSort).toEqual(initialWidths);

    const column3 = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');
    await column3.click();

    const widthsAfterSecondSort = await Promise.all(
      [1, 2, 3, 4].map((i) => getColumnWidth(page, i)),
    );

    expect(widthsAfterSecondSort[0]).toBeLessThan(initialWidths[0]);
    expect(widthsAfterSecondSort[1]).toEqual(initialWidths[1]);
    expect(widthsAfterSecondSort[2]).toBeGreaterThan(initialWidths[2]);
    expect(widthsAfterSecondSort[3]).toEqual(initialWidths[3]);
  });
});

test.describe('Multi level Header', () => {
  test('Verify lines props and ellipsis in header work correctly', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/multi-level-header.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
    const group1 = page.locator('[data-ui-name="Head.Group"]', { hasText: 'left' });
    await group1.evaluate((el) => window.getComputedStyle(el).borderRightWidth === '0px');
    await group1.evaluate((el) => window.getComputedStyle(el).borderLeftWidth === '1px');

    const group2 = page.locator('[data-ui-name="Head.Group"]', { hasText: 'both' });
    await group2.evaluate((el) => window.getComputedStyle(el).borderRightWidth === '0px');
    await group2.evaluate((el) => window.getComputedStyle(el).borderLeftWidth === '0px');

    const group3 = page.locator('[data-ui-name="Head.Group"]', { hasText: 'right' });
    await group3.evaluate((el) => window.getComputedStyle(el).borderRightWidth === '1px');
    await group3.evaluate((el) => window.getComputedStyle(el).borderLeftWidth === '0px');

    const group4 = page.locator('[data-ui-name="Head.Group"]', { hasText: 'default' });
    await group4.evaluate((el) => window.getComputedStyle(el).borderRightWidth === '0px');
    await group4.evaluate((el) => window.getComputedStyle(el).borderLeftWidth === '0px');
  });

  test('Verify multi level looks good when it is sticky', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/multi-level-header-sticky.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify keyboard interactions in header with hint, checkbox, description tooltip, select', async ({
    page,
    browserName,
  }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/multi-level-with-interactive.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    if (browserName === 'firefox') return;

    await test.step('Verify interaction with tooltip inside header', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');

      const tooltipTrigger = page.locator('[data-test-id="tooltip-with-interactive-el"]');
      const tooltip = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

      await expect(tooltipTrigger).toBeFocused();
      await expect(tooltip).toBeHidden();

      await page.keyboard.press('Enter');
      await expect(tooltip).toBeVisible();
      await expect(tooltipTrigger).not.toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="Link"]')).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(tooltip).toBeHidden();
      await expect(tooltipTrigger).toBeFocused();
    });

    await test.step('Verify interaction with multiple elements inside header', async () => {
      await page.keyboard.press('ArrowRight');
      const thirdColumn = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');
      await expect(thirdColumn).toBeFocused();

      await page.keyboard.press('ArrowDown');
      const thirdCell = page.locator(
        '[role="row"][aria-rowindex="2"] [role="gridcell"][aria-colindex="3"]',
      );
      await expect(thirdCell).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Enter');
      const checkbox = page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]');
      await expect(checkbox).toBeFocused();

      await page.keyboard.press('Space');
      await expect(checkbox).toHaveClass(/__checked_/);

      await page.keyboard.press('Escape');
      await expect(thirdColumn).toBeFocused();

      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await expect(checkbox).toBeFocused();

      // but
      // await page.keyboard.press('Tab');  - moves to the next focusable element outside table
      // await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify interaction with Select', async () => {
      await page.keyboard.press('Escape');
      await page.keyboard.press('ArrowRight');

      const selectTrigger = page.locator('[data-ui-name="Select"]');
      await expect(selectTrigger).toBeFocused();

      await page.keyboard.press('Enter');
      const options = page.getByRole('option', { name: 'Option 0' });

      await expect(options).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      await expect(options).toBeHidden();
      await expect(selectTrigger).toBeFocused();
      await expect(selectTrigger).toHaveAttribute('value', '2');

      // await page.keyboard.press('ArrowDown'); ----BUG
    });
  });

  test('Verify mouse interactions in header with hint, checkbox, description tooltip, select', async ({
    page,
  }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/multi-level-with-interactive.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

    await test.step('Verify tooltip without interactive elements', async () => {
      const tooltipTrigger = page.locator('[data-test-id="tooltip-without-interactive-el"]');
      const tooltip = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

      await tooltipTrigger.click();
      await expect(tooltip).toBeVisible();

      await firstCell.click();
      await expect(tooltip).toBeHidden();
    });

    await test.step('Verify tooltip with interactive elements', async () => {
      const tooltipTrigger = page.locator('[data-test-id="tooltip-with-interactive-el"]');
      const tooltip = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

      await tooltipTrigger.click();

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveCount(1);

      await tooltipTrigger.click();
      await expect(tooltip).toBeHidden();

      await tooltipTrigger.click();
      await page.locator('[data-ui-name="Link"]').click();
      await expect(tooltip).toBeVisible();
      await tooltipTrigger.click();
      await expect(tooltip).toBeHidden();
    });

    await test.step('Verify Select interaction', async () => {
      const selectTrigger = page.locator('[data-ui-name="Select"]');
      await selectTrigger.hover();
      // shapshot
      await selectTrigger.click();

      const option0 = page.getByRole('option', { name: 'Option 0' });
      await expect(option0).toBeVisible();

      const option2 = page.getByRole('option', { name: 'Option 2' });
      await option2.click();

      await expect(option0).toBeHidden();
      await expect(selectTrigger).toHaveAttribute('value', '2');
    });

    await test.step('Verify checkbox interaction', async () => {
      const checkbox = page.locator('[data-test-id="header-checkbox"]');

      await checkbox.click();
      await expect(
        page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]'),
      ).toHaveClass(/__checked_/);
      await checkbox.click();
      await expect(
        page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]'),
      ).not.toHaveClass(/__checked_/);
    });
  });
});

test.describe('Multi level header - Sorting', () => {
  test('Verify keyboard interactions with sorting', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/multi-level-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const buttonLink1 = page.locator(
      '[data-ui-name="Head.Column"][aria-colindex="1"] button[data-ui-name="ButtonLink"]',
    );
    const buttonLink2 = page.locator(
      '[data-ui-name="Head.Column"][aria-colindex="2"] button[data-ui-name="ButtonLink"]',
    );

    await test.step('Verify focus on the 1st sorted icon', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
      await expect(buttonLink1).toBeFocused();
      await expect(buttonLink1).toHaveAttribute('aria-label', 'descending');
    });

    await test.step('Verify sorting interaction by keyboard', async () => {
      await page.keyboard.press('Enter');
      await expect(buttonLink1).toHaveAttribute('aria-label', 'ascending');
    });

    await test.step('Verify sorting interaction with mouse and keyboard', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(buttonLink2).toHaveAttribute('aria-label', 'ascending');

      await buttonLink2.click();
      await expect(buttonLink2).toHaveAttribute('aria-label', 'descending');
    });

    await test.step('Verify switching between cells by keyboard', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]')).toBeFocused();
      await page.keyboard.press('ArrowRight');
      const column4 = page.locator('[data-ui-name="Head.Column"][aria-colindex="4"]');
      const buttonLink4 = column4.locator('button[data-ui-name="ButtonLink"]');
      await expect(buttonLink4).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await expect(page.locator('[data-ui-name="Head.Column"][aria-colindex="7"]')).toBeFocused();
    });
  });

  test('Verify mouse interactions with sorting', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/header-tests/multi-level-sorting.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify sorting activation on click', async () => {
      const buttonLink1 = page.locator(
        '[data-ui-name="Head.Column"][aria-colindex="1"] button[data-ui-name="ButtonLink"]',
      );
      await expect(buttonLink1).toHaveAttribute('aria-label', 'descending');
      await buttonLink1.click();
      await expect(buttonLink1).toHaveAttribute('aria-label', 'ascending');
    });

    await test.step('Verify hover and click on another sorting column', async () => {
      const cell2 = page.locator('[data-ui-name="Head.Column"][aria-colindex="2"]');
      const buttonLink2 = page.locator(
        '[data-ui-name="Head.Column"][aria-colindex="2"] button[data-ui-name="ButtonLink"]',
      );
      await cell2.hover();
      await expect(page).toHaveScreenshot();
      await expect(buttonLink2).toHaveAttribute('aria-label', 'ascending');
      await buttonLink2.click();
      await expect(buttonLink2).toHaveAttribute('aria-label', 'descending');
    });
  });
});
