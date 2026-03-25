import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators, getColumnWidth } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */

test.describe(`${TAG.VISUAL}`, () => {
  test.describe('One level Header', () => {
    test('Verify keyboard interactions when Select and Tooltip in header', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table',
        '@select',
        '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/customizing-header.tsx', 'en');

      const menuItem = page.getByRole('option');

      await test.step('Verify tooltip on focus', async () => {
        await page.keyboard.press('Tab');
        await page.getByRole('tooltip').waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify interactions with DD menu', async () => {
        await page.keyboard.press('ArrowRight');
        await page.getByRole('tooltip').waitFor({ state: 'hidden' });

        await page.keyboard.press('Enter');
        await menuItem.first().waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    const variantUse = [
      { use: 'primary' },
      { use: 'secondary' },
    ];
    variantUse.forEach((item) => {
      test(`Verify styles when long text and icons in header when use=${item.use}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@data-table',
          '@base-components'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/long-header-ellipsis.tsx', 'en', item);

        await expect(page).toHaveScreenshot();
        const amazonIcon = page.getByLabel('AmazonM non interactive').nth(1);
        await amazonIcon.hover();
        await page.getByText('AmazonM non interactive').waitFor({ state: 'visible' });
        await page.mouse.move(0, 0);
        await page.getByText('AmazonM non interactive').waitFor({ state: 'hidden' });

        const difficultyElement = page.getByText('Difficulty Difficulty');
        const difficultyBox = await difficultyElement.boundingBox();
        if (!difficultyBox) throw new Error('Difficulty element bounding box not found');
        await page.mouse.move(
          difficultyBox.x + difficultyBox.width / 4,
          difficultyBox.y + difficultyBox.height / 4,
        );
        await page.locator('[data-ui-name="Hint"]').getByText('Difficulty Difficulty').waitFor({ state: 'visible' });

        const elements = page.locator('[data-ui-name="Head.Column"]');
        for (const element of await elements.all()) {
          const alignItems = await element.evaluate((el) => window.getComputedStyle(el).alignItems);
          expect(alignItems).toBe('flex-start');
        }
      });

      test(`Verify keyboard sorting with changing size when use=${item.use} `, {
        tag: [TAG.PRIORITY_HIGH,
          TAG.KEYBOARD,
          '@data-table'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/docs/examples/sorting-changing-size.tsx', 'en', item);

        {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Enter');
        }

        {
          await page.keyboard.press('ArrowRight');
          await expect(page).toHaveScreenshot(); // verify sort icon do not move text content
          await page.keyboard.press('Space');
          await expect(page).toHaveScreenshot(); // verify sort icon move text content
        }
      });

      test(`Verify mouse sorting with changing size when use=${item.use} `, {
        tag: [TAG.PRIORITY_HIGH,
          TAG.MOUSE,
          '@data-table'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/docs/examples/sorting-changing-size.tsx', 'en', item);

        {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Enter');
        }

        {
          await page.keyboard.press('ArrowRight');
          await expect(page).toHaveScreenshot(); // verify sort icon do not move text content
          await page.keyboard.press('Space');
          await expect(page).toHaveScreenshot(); // verify sort icon move text content
        }
      });
    });
  });

  test.describe('Multi level Header', () => {
    test('Verify border and Long title with and without Ellipsis correctly', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/multi-level-borders.tsx', 'en');

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

    test('Verify mouse interactions in header with hint, checkbox, description tooltip, select', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table',
        '@select',
        '@tooltip',
        '@link'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/multi-level-with-interactive.tsx', 'en');

      await test.step('Verify tooltip opened in multi level header', async () => {
        await page.getByRole('button').first().click();
        await page.getByLabel('Additional info about item').waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test(`Verify sorting styles`, {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/sorting/multi-level-sorting.tsx', 'en');

      await test.step('Verify focus on the 1st sorted icon', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify mouse interactions with sorting', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/sorting/multi-level-sorting.tsx', 'en');

      await test.step('Sorting activation on click', async () => {
        await locators.getHeadColumn(page, 1).hover();
        await locators.sortButton(page, 1).nth(1).click();
      });

      await test.step('Verify hover and click on another sorting column', async () => {
        await locators.getHeadColumn(page, 2).hover();
        await expect(page).toHaveScreenshot();
      });
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('One level Header', () => {
    test('Verify keyboard interactions when in header hint, checkbox, description tooltip', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@tooltip',
        '@checkbox',
        '@ellipsis',
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/one-level-interactive-header.tsx', 'en');

      const getTooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');
      const checkbox = page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]');
      const columnKD = page.locator(
        '[data-ui-name="Head.Column"][name="keyword"][aria-colindex="6"]',
      );

      await test.step('Verify interaction with tooltip without interactive elements', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowRight');
        const tooltipTrigger = locators.getDataTestId(page, 'tooltip-without-interactive-el');
        await expect(tooltipTrigger).toBeFocused();
        await expect(getTooltipPopper).toBeHidden();

        await page.keyboard.press('ArrowDown');
        await expect(locators.getCell(page, 2, 2)).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(tooltipTrigger).toBeFocused();

        await page.keyboard.press('Enter');
        await page.getByLabel('Additional info about item').waitFor({ state: 'visible' });
        await expect(getTooltipPopper).toHaveCount(1);
        await expect(getTooltipPopper).toBeFocused();
        await page.keyboard.press('Escape');
        await page.getByLabel('Additional info about item').waitFor({ state: 'hidden' });

        await expect(getTooltipPopper).toHaveCount(0);
        await expect(tooltipTrigger).toBeFocused();

        await page.keyboard.press('ArrowRight');
      });

      await test.step('Verify interaction with tooltip containing interactive elements', async () => {
        const tooltipTrigger = locators.getDataTestId(page, 'tooltip-with-interactive-el');
        await expect(tooltipTrigger).toBeFocused();
        await page.keyboard.press('ArrowDown');
        await expect(locators.getCell(page, 2, 3)).toBeFocused();
        await page.keyboard.press('ArrowUp');
        await expect(tooltipTrigger).toBeFocused();

        await page.keyboard.press('Enter');
        await page.getByLabel('Additional info about item').waitFor({ state: 'visible' });
        await expect(getTooltipPopper).toBeFocused();

        await page.keyboard.press('Escape');
        await page.getByLabel('Additional info about item').waitFor({ state: 'hidden' });
        await expect(getTooltipPopper).toHaveCount(0);
        await expect(tooltipTrigger).toBeFocused();

        await page.keyboard.press('Enter');
        await page.getByLabel('Additional info about item').waitFor({ state: 'visible' });
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-ui-name="Link"]')).toBeFocused();

        await page.keyboard.press('Escape');
        await page.getByLabel('Additional info about item').waitFor({ state: 'hidden' });
        await expect(getTooltipPopper).toHaveCount(0);
        await expect(tooltipTrigger).toBeFocused();
      });

      await test.step('Verify interaction with inline tooltip', async () => {
        await page.keyboard.press('ArrowRight');
        const linkTrigger = locators.getDataTestId(page, 'tooltip-with-tag-link');
        await expect(linkTrigger).toBeFocused();
        await page.getByRole('tooltip', { name: 'Default tooltip contains' }).waitFor({ state: 'visible' });

        await page.keyboard.press('ArrowDown');
        await page.getByRole('tooltip', { name: 'Default tooltip contains' }).waitFor({ state: 'hidden' });

        await page.keyboard.press('ArrowUp');
        await page.getByRole('tooltip', { name: 'Default tooltip contains' }).waitFor({ state: 'visible' });

        await page.keyboard.press('Escape');
        await page.getByRole('tooltip', { name: 'Default tooltip contains' }).waitFor({ state: 'hidden' });

        const icon = page.locator('[data-test-id="interactive-icon"]');
        await page.keyboard.press('ArrowRight');

        await page.keyboard.press('Enter');
        await expect(icon).toBeFocused();
        await page.getByText('Go to our awesome article').waitFor({ state: 'visible' });

        await page.keyboard.press('Escape');
        await page.getByText('Go to our awesome article').waitFor({ state: 'hidden' });
      });

      await test.step('Verify interaction with checkbox and tooltip in header', async () => {
        await page.keyboard.press('Escape');
        await page.keyboard.press('ArrowRight');
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

    test('Verify mouse interactions when in header hint, checkbox, description tooltip', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table',
        '@tooltip',
        '@checkbox',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/one-level-interactive-header.tsx', 'en');

      const tooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');
      const firstCell = page.locator('[data-ui-name="Row.Cell"]').first();
      const checkbox = page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]');

      await test.step('Verify interaction with tooltip without interactive elements', async () => {
        await locators.getDataTestId(page, 'tooltip-without-interactive-el').click();
        await expect(tooltipPopper).toBeVisible();
        await firstCell.click();
        await expect(tooltipPopper).toBeHidden();
      });

      await test.step('Verify interaction with tooltip containing interactive elements', async () => {
        const tooltipTrigger = locators.getDataTestId(page, 'tooltip-with-interactive-el');
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
        const linkTrigger = locators.getDataTestId(page, 'tooltip-with-tag-link');
        const tooltip = page.getByRole('tooltip', { name: 'Default tooltip contains' });

        await linkTrigger.hover();
        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltip).toBeVisible();

        await firstCell.hover();
        await tooltip.waitFor({ state: 'hidden' });
      });

      await test.step('Verify interaction with checkbox and tooltip in header', async () => {
        const tooltipTrigger = locators.getDataTestId(page, 'few-interactive');

        await page.locator('[data-test-id="header-checkbox"] span').first().click();
        await expect(checkbox).toHaveClass(/__checked_/);

        await tooltipTrigger.click();
        await expect(tooltipPopper).toBeVisible();

        await page.locator('[data-test-id="header-checkbox"] span').first().click();
        await expect(tooltipPopper).toBeHidden();
        await expect(checkbox).not.toHaveClass(/__checked_/);
      });
    });

    test('Verify keyboard interactions when in header Select', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table',
        '@select',
        '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/customizing-header.tsx', 'en');

      const selectTrigger = page.locator('[data-ui-name="Select.Trigger"]');
      const menuItem = page.getByRole('option');
      const headerCell3 = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');

      await test.step('Verify tooltip on focus', async () => {
        await page.keyboard.press('Tab');
        await page.getByRole('tooltip').waitFor({ state: 'visible' });
      });

      await test.step('Verify interactions with DD menu', async () => {
        await page.keyboard.press('ArrowRight');
        await page.getByRole('tooltip').waitFor({ state: 'hidden' });
        await page.keyboard.press('Enter');
        await menuItem.first().waitFor({ state: 'visible' });
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowRight');
        await expect(menuItem.first()).toBeVisible();

        await page.keyboard.press('Escape');
        await expect(selectTrigger).toBeFocused();
        await expect(menuItem.first()).toBeHidden();

        await page.keyboard.press('ArrowRight');
        await expect(menuItem.first()).not.toBeVisible();
        await expect(headerCell3).toBeFocused();
      });

      await test.step('Verify keyboard and mouse interactions', async () => {
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Enter');
        await menuItem.first().waitFor({ state: 'visible' });
        await selectTrigger.click();
        await menuItem.first().waitFor({ state: 'hidden' });
        await expect(menuItem.first()).toHaveCount(0);
      });
    });

    test('Verify mouse interactions when in header Select', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table',
        '@select',
        '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/customizing-header.tsx', 'en');

      const selectTrigger = page.locator('[data-ui-name="Select.Trigger"]');
      const menuItem = page.getByRole('option').first();
      const headerCell3 = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');

      await test.step('Verify mouse interactions ', async () => {
        await selectTrigger.click();
        await menuItem.waitFor({ state: 'visible' });
        await selectTrigger.click();
        await menuItem.waitFor({ state: 'hidden' });
        await selectTrigger.click();
        await menuItem.waitFor({ state: 'visible' });
        await headerCell3.click();
        await menuItem.waitFor({ state: 'hidden' });
        await expect(menuItem).toHaveCount(0);
      });
    });

    test.describe('Sorting', () => {
      test('Verify keyboard sorting without changing size', {
        tag: [TAG.PRIORITY_HIGH,
          TAG.KEYBOARD,
          '@data-table'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/docs/examples/sorting.tsx', 'en');

        await test.step('Verify keyboard interactions', async () => {
          const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

          await page.keyboard.press('Tab');
          const button1 = locators.sortButton(page, 1);
          await expect(button1).toBeFocused();
          await expect(button1).not.toHaveAttribute('aria-label');

          await page.keyboard.press('Enter');
          await expect(button1).toHaveAttribute('aria-label', 'descending');
          await page.keyboard.press('Enter');
          await expect(button1).toHaveAttribute('aria-label', 'ascending');

          await page.keyboard.press('ArrowRight');
          const button = locators.sortButton(page, 2);
          await expect(button).toBeFocused();

          await button.click();
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowUp');
          await expect(button).toBeFocused();

          await page.keyboard.press('ArrowLeft');
          await page.keyboard.press('Enter');

          const newWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
          expect(newWidths).toEqual(initialWidths);
        });
      });

      test('Verify mouse sorting without changing size', {
        tag: [TAG.PRIORITY_HIGH,
          TAG.MOUSE,
          '@data-table'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/data-table/docs/examples/sorting.tsx', 'en');
        if (browserName === 'firefox') test.skip();
        const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

        await test.step('Verify 1st click on not sorted icon activates sorting', async () => {
          await locators.getHeadColumn(page, 1).hover();
          await locators.sortButton(page, 1).click();
          await expect(locators.sortButton(page, 1)).toHaveAttribute('aria-label', 'descending');
          await locators.sortButton(page, 1).click();
          await expect(locators.sortButton(page, 1)).toHaveAttribute('aria-label', 'ascending');
        });

        await test.step('Verify click on the column activates sorting', async () => {
          await locators.getHeadColumn(page, 2).hover();

          await locators.getHeadColumn(page, 2).click();
          await expect(locators.sortButton(page, 2)).toHaveAttribute('aria-label', 'descending');
          await locators.getHeadColumn(page, 2).click();
          await expect(locators.sortButton(page, 2)).toHaveAttribute('aria-label', 'ascending');
        });

        await test.step('Verify columns width not changed', async () => {
          const newWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
          expect(newWidths).toEqual(initialWidths);
        });
      });

      test('Verify sorting with changing size keyboard', {
        tag: [TAG.PRIORITY_HIGH,
          TAG.KEYBOARD,
          '@data-table'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/docs/examples/sorting-changing-size.tsx', 'en');

        const kdMaxWidth = 68;
        const cpcMaxWidth = 66;
        const volMaxWidth = 120;

        {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Enter');

          const kdWidth = await getColumnWidth(page, 2);
          const cpcWidth = await getColumnWidth(page, 3);
          const volWidth = await getColumnWidth(page, 4);

          expect(kdWidth).toEqual(kdMaxWidth);
          expect(cpcWidth).toEqual(cpcMaxWidth);
          expect(volWidth).toEqual(volMaxWidth);
        }

        {
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('Space');

          const kdWidth = await getColumnWidth(page, 2);
          const cpcWidth = await getColumnWidth(page, 3);
          const volWidth = await getColumnWidth(page, 4);

          expect(kdWidth).toBeGreaterThan(kdMaxWidth);
          expect(cpcWidth).toEqual(cpcMaxWidth);
          expect(volWidth).toEqual(volMaxWidth);
        }

        {
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('Space');

          const kdWidth = await getColumnWidth(page, 2);
          const cpcWidth = await getColumnWidth(page, 3);
          const volWidth = await getColumnWidth(page, 4);

          expect(kdWidth).toEqual(kdMaxWidth);
          expect(cpcWidth).toBeGreaterThanOrEqual(cpcMaxWidth);
          expect(volWidth).toEqual(volMaxWidth);
        }
      });

      test('Verify sorting with changing size mouse', {
        tag: [TAG.PRIORITY_HIGH,
          TAG.MOUSE,
          '@data-table'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/docs/examples/sorting-changing-size.tsx', 'en');

        const column1 = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
        const column2 = page.locator('[data-ui-name="Head.Column"][aria-colindex="2"]');
        const column3 = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');

        const kdMaxWidth = 68;
        const cpcMaxWidth = 66;
        const volMaxWidth = 120;

        {
          await column1.click();

          const kdWidth = await getColumnWidth(page, 2);
          const cpcWidth = await getColumnWidth(page, 3);
          const volWidth = await getColumnWidth(page, 4);

          expect(kdWidth).toEqual(kdMaxWidth);
          expect(cpcWidth).toEqual(cpcMaxWidth);
          expect(volWidth).toEqual(volMaxWidth);
        }

        {
          await column2.click();

          const kdWidth = await getColumnWidth(page, 2);
          const cpcWidth = await getColumnWidth(page, 3);
          const volWidth = await getColumnWidth(page, 4);

          expect(kdWidth).toBeGreaterThan(kdMaxWidth);
          expect(cpcWidth).toEqual(cpcMaxWidth);
          expect(volWidth).toEqual(volMaxWidth);
        }

        {
          await column3.click();

          const kdWidth = await getColumnWidth(page, 2);
          const cpcWidth = await getColumnWidth(page, 3);
          const volWidth = await getColumnWidth(page, 4);

          expect(kdWidth).toEqual(kdMaxWidth);
          expect(cpcWidth).toBeGreaterThanOrEqual(cpcMaxWidth);
          expect(volWidth).toEqual(volMaxWidth);
        }
      });

      test('Verify sorting with undefined as default value by mouse interactions', {
        tag: [TAG.PRIORITY_HIGH,
          TAG.MOUSE,
          '@data-table'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/sorting/sorting-default-undefined.tsx', 'en');

        const messages: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'log') {
            const text = msg.text();
            if (text === 'Sorted') {
              messages.push(text);
            }
          }
        });

        await locators.getHeadColumn(page, 1).hover();
        const count = await page.locator('[data-ui-name="Head.Column"]').count();
        for (let i = 1; i <= count; i++) {
          await expect(locators.getHeadColumn(page, i)).not.toHaveAttribute('aria-sort');
        }
        expect(messages.length).toBe(0);
        await locators.sortButton(page, 1).click();
        await expect(locators.sortButton(page, 1)).toHaveAttribute('aria-label', 'descending');
        await expect(locators.getHeadColumn(page, 1)).toHaveAttribute('aria-sort', 'descending');

        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Sorted']);

        await locators.sortButton(page, 1).click();
        await expect(locators.sortButton(page, 1)).toHaveAttribute('aria-label', 'ascending');
        await expect(locators.getHeadColumn(page, 1)).toHaveAttribute('aria-sort', 'ascending');
        for (let i = 2; i <= count; i++) {
          await expect(locators.getHeadColumn(page, i)).not.toHaveAttribute('aria-sort');
        }
        await expect(locators.getHeadColumn(page, 1)).toHaveAttribute('aria-sort');

        expect(messages.length).toBe(2);
      });

      test('Verify sorting with undefined as default value by keyboard interactions', {
        tag: [TAG.PRIORITY_HIGH,
          TAG.KEYBOARD,
          '@data-table'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/sorting/sorting-default-undefined.tsx', 'en');

        const messages: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'log') {
            const text = msg.text();
            if (text === 'Sorted') {
              messages.push(text);
            }
          }
        });
        await page.keyboard.press('Tab');
        await expect(locators.sortButton(page, 1)).toBeFocused();
        const count = await page.locator('[data-ui-name="Head.Column"]').count();
        for (let i = 1; i <= count; i++) {
          await expect(locators.getHeadColumn(page, i)).not.toHaveAttribute('aria-sort');
        }
        expect(messages.length).toBe(0);

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('[data-ui-name="Row.Cell"][aria-colindex="1"]').first()).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(locators.sortButton(page, 1)).toBeFocused();

        await page.keyboard.press('ArrowRight');
        await expect(locators.sortButton(page, 2)).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(locators.sortButton(page, 2)).toHaveAttribute('aria-label', 'descending');
        await expect(locators.getHeadColumn(page, 2)).toHaveAttribute('aria-sort', 'descending');
        expect(messages.length).toBe(1);
        expect(messages).toEqual(['Sorted']);

        await locators.sortButton(page, 2).click();
        await expect(locators.sortButton(page, 2)).toHaveAttribute('aria-label', 'ascending');
        await expect(locators.getHeadColumn(page, 2)).toHaveAttribute('aria-sort', 'ascending');
        expect(messages.length).toBe(2);
      });

      test('Verify sorting not activates interactive when interactive element in cell with sorting', {
        tag: [TAG.PRIORITY_HIGH,
          TAG.KEYBOARD,
          '@data-table',
          '@tooltip'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/sorting/sorting-with-interactive.tsx', 'en');

        const popper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');
        const trigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        await expect(popper).not.toBeVisible();
        await page.keyboard.press('Enter');
        await expect(locators.getHeadColumn(page, 1)).not.toHaveAttribute('aria-sort');
        await expect(popper).toBeVisible();
        await expect(popper).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(trigger).toBeFocused();

        await page.keyboard.press('Escape');
        await page.keyboard.press('ArrowRight');

        await locators.getHeadColumn(page, 1).hover();
        await trigger.click();
        await expect(popper).toBeVisible();
        await expect(locators.getHeadColumn(page, 1)).not.toHaveAttribute('aria-sort');
      });
    });
  });

  test.describe('Multi level Header', () => {
    test('Verify keyboard interactions in header with hint, checkbox, description tooltip, select', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@select',
        '@tooltip',
        '@link',
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/multi-level-with-interactive.tsx', 'en');

      if (browserName === 'firefox') test.skip();

      const tooltipTrigger = locators.getDataTestId(page, 'tooltip-with-interactive-el');
      const tooltip = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

      await test.step('Verify interaction with tooltip inside header', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowRight');

        await expect(tooltipTrigger).toBeFocused();
        await expect(tooltip).toBeHidden();

        await page.keyboard.press('Enter');
        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltipTrigger).not.toBeFocused();

        await page.keyboard.press('Tab');
        await expect(page.locator('[data-ui-name="Link"]')).toBeFocused();

        await page.keyboard.press('Escape');
        await tooltip.waitFor({ state: 'hidden' });
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

    test('Verify multi level attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/docs/examples/borders.tsx', 'en');

      const headGroup = page.locator('[data-ui-name="Head.Group"]');
      const headGoupColumn = headGroup.nth(0).locator('[data-ui-name="Head.Column"]');

      const count = await headGoupColumn.count();
      for (let i = 0; i < count; i++) {
        await expect(headGoupColumn.nth(i)).toHaveAttribute('role', 'columnheader');
        await expect(headGoupColumn.nth(i)).toHaveAttribute('aria-colindex', `${i + 2}`);
        await expect(headGoupColumn.nth(i)).toHaveAttribute('aria-describedby');
        await expect(headGoupColumn.nth(i)).toHaveAttribute('tabindex', '-1');
      }
    });

    test('Verify mouse interactions in header with hint, checkbox, description tooltip, select', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table',
        '@select',
        '@tooltip',
        '@link'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/multi-level-with-interactive.tsx', 'en');

      const firstCell = page.locator('[data-ui-name="Row.Cell"]').first();

      const tooltip = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

      await test.step('Verify tooltip without interactive elements', async () => {
        const tooltipTrigger = locators.getDataTestId(page, 'tooltip-without-interactive-el');
        await tooltipTrigger.click();
        await tooltip.waitFor({ state: 'visible' });

        await firstCell.click();
        await tooltip.waitFor({ state: 'hidden' });
      });

      await test.step('Verify tooltip with interactive elements', async () => {
        const tooltipTrigger = locators.getDataTestId(page, 'tooltip-with-interactive-el');

        await tooltipTrigger.click();

        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltip).toHaveCount(1);

        await tooltipTrigger.click();
        await tooltip.waitFor({ state: 'hidden' });

        await tooltipTrigger.click();
        await tooltip.waitFor({ state: 'visible' });

        await page.locator('[data-ui-name="Link"]').click();
        await expect(tooltip).toBeVisible();
        await tooltipTrigger.click();
        await tooltip.waitFor({ state: 'hidden' });
        await expect(tooltip).toBeHidden();
      });

      await test.step('Verify Select interaction', async () => {
        const selectTrigger = page.locator('[data-ui-name="Select"]');
        await selectTrigger.hover();
        await selectTrigger.click();

        await page.getByRole('option').first().waitFor({ state: 'visible' });

        await page.getByRole('option').nth(2).click();

        await page.getByRole('option').first().waitFor({ state: 'hidden' });
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

    test.describe('Sorting', () => {
      test('Verify keyboard interactions with sorting', {
        tag: [TAG.PRIORITY_HIGH,
          TAG.KEYBOARD,
          '@data-table'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/sorting/multi-level-sorting.tsx', 'en');

        await test.step('Verify focus on the 1st sorted icon', async () => {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Enter');
          await page.keyboard.press('Tab');

          await expect(locators.sortButton(page, 1).nth(1)).toBeFocused();
          await expect(locators.sortButton(page, 1).nth(1)).toHaveAttribute('aria-label', 'descending');
        });

        await test.step('Verify sorting interaction by keyboard', async () => {
          await page.keyboard.press('Enter');
          await expect(locators.sortButton(page, 1).nth(1)).toHaveAttribute('aria-label', 'ascending');
        });

        await test.step('Verify sorting interaction with mouse and keyboard', async () => {
          await page.keyboard.press('Escape');
          await page.keyboard.press('ArrowRight');
          await expect(locators.sortButton(page, 2)).not.toHaveAttribute('aria-label');

          await locators.sortButton(page, 2).click();
          await expect(locators.sortButton(page, 2)).toHaveAttribute('aria-label', 'descending');
        });

        await test.step('Verify switching between cells by keyboard', async () => {
          await page.keyboard.press('ArrowRight');
          await expect(locators.getHeadColumn(page, 3)).toBeFocused();
          await page.keyboard.press('ArrowRight');
          await expect(locators.sortButton(page, 4)).toBeFocused();
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');
          await expect(locators.getHeadColumn(page, 7)).toBeFocused();
        });
      });

      test('Verify mouse interactions with sorting', {
        tag: [TAG.PRIORITY_HIGH,
          TAG.MOUSE,
          '@data-table'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/sorting/multi-level-sorting.tsx', 'en');

        await test.step('Verify sorting activation on click', async () => {
          await locators.getHeadColumn(page, 1).hover();
          await expect(locators.sortButton(page, 1).nth(1)).toHaveAttribute('aria-label', 'descending');
          await locators.sortButton(page, 1).nth(1).click();
          await expect(locators.sortButton(page, 1).nth(1)).toHaveAttribute('aria-label', 'ascending');
        });

        await test.step('Verify hover and click on another sorting column', async () => {
          await locators.getHeadColumn(page, 2).hover();
          await expect(locators.sortButton(page, 2)).not.toHaveAttribute('aria-label');
          await locators.sortButton(page, 2).click();
          await expect(locators.sortButton(page, 2)).toHaveAttribute('aria-label', 'descending');
        });
      });
    });
  });
});
