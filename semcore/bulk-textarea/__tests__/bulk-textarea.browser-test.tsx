import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  button: (page: Page, name?: string): Locator => page.getByRole('button', { name }),
  textbox: (page: Page): Locator => page.getByRole('textbox'),
  counter: (page: Page): Locator => page.locator(
    '[data-ui-name="BulkTextarea.Counter"]',
  ),

  row: (page: Page, index: number): Locator =>
    page.locator('div[contenteditable="true"] p').nth(index),
  contentDiv: (page: Page): Locator => page.locator('[contenteditable="true"]'),
  assertive: (page: Page): Locator => page.locator('[aria-live="assertive"]'),
  tooltip: (page: Page, text?: string): Locator => {
    const base = page.locator('[data-ui-name="Tooltip.Popper"]');
    return text ? base.getByText(text) : base;
  },
  errorMessage: (page: Page, text?: string): Locator => {
    const base = page.locator('[data-ui-name="Text"]').nth(1);
    return text ? base.getByText(text) : base;
  },
  boxLocator: (page: Page, text?: string): Locator => page.locator('div[data-ui-name="Box"]').first(),

};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    // active
    { size: 'm', placeholder: 'Enter or paste a list using comma or Enter', disabled: undefined, readOnly: false, minRows: 2, maxRows: 10, maxLines: 10, autoFocus: true },
    { size: 'm', placeholder: undefined, disabled: undefined, readOnly: false, minRows: 1, maxRows: 5, maxLines: 3, autoFocus: true },
    { size: 'l', placeholder: 'Enter or paste a list using comma or Enter', disabled: undefined, readOnly: false, minRows: 2, maxRows: 10, maxLines: 10, w: 300, autoFocus: false },
    { size: 'l', placeholder: undefined, disabled: undefined, readOnly: false, minRows: 1, maxRows: 1, maxLines: 5, autoFocus: false },

    // disabled
    { size: 'm', placeholder: 'Enter or paste a list using comma or Enter', disabled: true, readOnly: false, minRows: 2, maxRows: 10, maxLines: 10, autoFocus: true },
    { size: 'l', placeholder: undefined, disabled: true, readOnly: false, minRows: 1, maxRows: 1, maxLines: 5, autoFocus: false },

    // readOnly
    { size: 'm', placeholder: 'Enter or paste a list using comma or Enter', disabled: false, readOnly: true, minRows: 2, maxRows: 10, maxLines: 10, autoFocus: true },
    { size: 'l', placeholder: undefined, disabled: false, readOnly: true, minRows: 1, maxRows: 1, maxLines: 5, autoFocus: false },

  ];
  variables.forEach((item) => {
    test(`Verify size=${item.size} placeholder=${item.placeholder}  w=${item.w} disabled=${item.disabled} readOnly=${item.readOnly} minRows=${item.minRows} maxRows=${item.maxRows} maxLines=${item.maxLines} autoFocus=${item.autoFocus}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@bulk-textarea'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', item);
      await test.step('Verify initial state', async () => {
        if (!item.autoFocus) {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
        }

        await expect(page).toHaveScreenshot();
      });
      if (!item.disabled && !item.readOnly) {
        const text =
            'Zoom in on product categories to understand how each site segment drives conversions.\nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row';
        await page.keyboard.type(text, { delay: 20 });
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

        await page.keyboard.type('\n[]');
        await page.waitForTimeout(100);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');

        await locators.button(page, 'Next error').waitFor({ state: 'visible' });
        await expect(locators.button(page, 'Next error')).toBeFocused();

        await page.keyboard.press('Shift+Tab');

        await page.waitForTimeout(100);
        await page.keyboard.press('ArrowUp');
        await locators.tooltip(page, 'Please enter correct movie names.').waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

        await page.keyboard.type(']');
        await locators.tooltip(page, 'Please remove one error value').waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
      }
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('StrictMode', () => {
    test('Verify single textbox after StrictMode remount', {
      tag: [TAG.PRIORITY_HIGH,
        '@bulk-textarea'],
    }, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        const text = message.text();
        if (
          message.type() === 'error' &&
          !text.includes('ReactDOM.render is no longer supported in React 18')
        ) {
          errors.push(text);
        }
      });

      await loadPage(
        page,
        'stories/components/bulk-textarea/tests/examples/basic-props.tsx',
        'en',
        { maxLines: 15, strictMode: true },
      );

      await expect(locators.textbox(page)).toBeVisible();
      await expect(locators.textbox(page)).toHaveCount(1);
      await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
      await expect.poll(() => errors).toHaveLength(0);
    });

    test('Verify editing states work in StrictMode', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/bulk-textarea/tests/examples/basic-props.tsx',
        'en',
        { autoFocus: true, maxLines: 15, strictMode: true },
      );

      await expect(locators.textbox(page)).toBeFocused();
      await expect(locators.textbox(page)).toHaveCount(1);

      await page.keyboard.type('Testhttp://,test2', { delay: 10 });
      await expect(locators.counter(page)).toHaveText('2/15of 15 lines');
      await expect(locators.button(page, 'Clear all')).toBeVisible();

      await locators.button(page, 'Clear all').click();
      await expect(locators.textbox(page)).toBeFocused();
      await expect(locators.textbox(page)).toHaveText('');
      await expect(locators.button(page, 'Clear all')).not.toBeVisible();
      await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
    });
  });

  test.describe('Counter and Clear all', () => {
    test('Verify counter functionality', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15, validateOn: ['blur'] });

      await test.step('Verify counter is zero on initial load', async () => {
        await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
      });

      await test.step('Type text into textarea and check counter', async () => {
        await page.keyboard.press('Tab');
        await locators.textbox(page).press('a');
        await expect(locators.counter(page)).toHaveText('1/15of 15 lines');
        await expect(locators.button(page, 'Clear all')).toBeVisible();
      });

      await test.step('Press backspace and check counter', async () => {
        await locators.textbox(page).press('Backspace');
        await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
        await expect(locators.button(page, 'Clear all')).not.toBeVisible();
      });

      await test.step('Counter decreases when last character removed from 2nd row', async () => {
        await page.keyboard.type('text', { delay: 10 });
        await page.keyboard.press('Enter');
        await page.keyboard.type('a', { delay: 10 });
        await page.keyboard.press('Backspace');
        await expect(locators.counter(page)).toHaveText('1/15of 15 lines');
        await locators.textbox(page).press('Backspace');
      });

      await test.step('Add more rows and reach counter limit', async () => {
        await locators.textbox(page).click();
        const text =
          'Zoom in \nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row\n12 row\n13 row\n14 row\n15 row';
        await page.keyboard.type(text, { delay: 10 });
        await expect(locators.counter(page)).toHaveText('15/15of 15 linesLimit reached');
      });

      await test.step('Exceeded counter limit by entering one row', async () => {
        await page.keyboard.press('Enter');
        await locators.textbox(page).press('a');
        await page.keyboard.press('Space');
        await expect(locators.counter(page)).toHaveText('16/15of 15 linesLimit exceeded');
      });

      await test.step('Remove all content manually and verify counter', async () => {
        const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
        await page.keyboard.down(modifier);
        await page.keyboard.press('A');
        await page.keyboard.up(modifier);
        await page.keyboard.press('Backspace');
        await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
        const text =
          'Zoom in \nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row\n11 row\n12 row\n13 row\n14 row\n15 row';
        await page.keyboard.type(text, { delay: 10 });
        await expect(locators.counter(page)).toHaveText('15/15of 15 linesLimit reached');
      });

      await test.step('Remove one line manually and it is not counted in counter', async () => {
        const text = await locators.row(page, 13).textContent();
        const charCount = text ? text.length : 0;
        await locators.row(page, 13).click();
        for (let i = 0; i < charCount; i++) {
          await page.keyboard.press('Backspace');
        }
        await expect(locators.counter(page)).toHaveText('14/15of 15 lines');
      });
    });

    test('Verify Clear all by mouse when no validation', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await test.step('Removed when remove last character', async () => {
        await locators.textbox(page).click();
        await page.keyboard.type('abc', { delay: 50 });
        await expect(locators.button(page, 'Clear all')).toBeVisible();
        await locators.textbox(page).press('Backspace');
        await locators.textbox(page).press('Backspace');
        await locators.textbox(page).press('Backspace');
        await expect(locators.button(page, 'Clear all')).not.toBeVisible();
        const lineCount = await locators.contentDiv(page).locator('p').count();
        await expect(lineCount).toBe(0);
        await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
      });

      await test.step('Type text into textarea and click clear all', async () => {
        await locators.textbox(page).click();
        await page.keyboard.type('Testhttp://,test2', { delay: 100 });
        await expect(locators.counter(page)).toHaveText('2/15of 15 lines');
        await expect(locators.button(page, 'Clear all')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).not.toBeFocused();
        await locators.button(page, 'Clear all').click();
        await expect(locators.textbox(page)).toBeFocused();
        await expect(locators.button(page, 'Clear all')).not.toBeVisible();
        const lineCount = await locators.contentDiv(page).locator('p').count();
        await expect(lineCount).toBe(0);
        await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
      });
    });

    test('Verify Clear all by keyboard no validation', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/docs/examples/basic-usage.tsx', 'en');

      await test.step('Type text into textarea and press clear all', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.type('Testhttp://,test2', { delay: 20 });
        await page.waitForTimeout(100); // it is necessary for stability in GitLab in Firefox
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        await expect(locators.button(page, 'Clear all')).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(locators.textbox(page)).toBeFocused();
        await expect(locators.button(page, 'Clear all')).not.toBeVisible();
        const lineCount = await locators.contentDiv(page).locator('p').count();
        await expect(lineCount).toBe(0);
        await expect(locators.counter(page)).toHaveText('0/10of 10 lines');
      });
    });

    test('Verify Clear all by keyboard with validation', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/docs/examples/basic-usage.tsx', 'en');

      await test.step('Type text into textarea and press clear all', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.type('Testhttp://,test2[]', { delay: 100 });
        await page.keyboard.press('Enter');
        await page.keyboard.press('Tab');
        await page.waitForTimeout(50);
        await expect(locators.button(page, 'Clear all')).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(locators.textbox(page)).toBeFocused();
        await expect(locators.button(page, 'Clear all')).not.toBeVisible();
        const lineCount = await locators.contentDiv(page).locator('p').count();
        await expect(lineCount).toBe(0);
        await expect(locators.counter(page)).toHaveText('0/10of 10 lines');
      });
    });
  });

  test.describe('Common error ON - Validation Delimiter LineProcessing', () => {
    test('Verify Validation on Blur', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await test.step('Verify validation on blur not starts by entering new row', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await locators.textbox(page).press('[');
        await page.waitForTimeout(100);// it is nessesary for stability in GitLab in Firefox
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await expect(locators.textbox(page)).not.toHaveAttribute('aria-invalid', 'true');
      });

      await test.step('Verify validation on blur starts by TAB', async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100); // needs for animation ending

        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
      });

      await test.step('Clear all and check error visibility', async () => {
        await locators.button(page, 'Clear all').click();
        await page.waitForTimeout(100);// tests can fail without some delays for this component
        await expect(locators.errorMessage(page, '1 error')).not.toBeVisible();
        await expect(locators.button(page, 'Next error')).not.toBeVisible();
        await expect(locators.button(page, 'Previous error')).not.toBeVisible();
        await expect(locators.button(page, 'Clear all')).not.toBeVisible();
      });

      await test.step('Verify validation on clicking outside textbox', async () => {
        await locators.textbox(page).press('[');
        await page.waitForTimeout(100); // it is necessary for stability in GitLab in Firefox
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        const boxBoundingBox = await locators.boxLocator(page).boundingBox();

        if (boxBoundingBox) {
          const rightTopX = boxBoundingBox.x + boxBoundingBox.width;
          const rightTopY = boxBoundingBox.y;
          await page.mouse.click(rightTopX, rightTopY);
          await page.waitForTimeout(200);
        }

        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
      });

      await test.step('Verify multiple rows with errors validation', async () => {
        await locators.button(page, 'Clear all').click();

        const text =
          'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row\n13 row\n14 row\n15 row';
        await page.keyboard.type(text, { delay: 10 });
        await page.keyboard.press('Enter');
        await expect(locators.errorMessage(page)).not.toBeVisible();
        await expect(locators.button(page, 'Next error')).not.toBeVisible();
        await expect(locators.button(page, 'Previous error')).not.toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
        await page.keyboard.press('Tab');
        await expect(locators.errorMessage(page, '3 errors')).toBeVisible();
      });

      // works instable in playwright
      // await test.step('Verify focus order when validation starts', async () => {
      // await expect(locators.button(page, 'Next error')).toBeFocused();
      // await page.keyboard.press('Tab');
      // await expect(locators.button(page, 'Previous error')).toBeFocused();
      // await page.keyboard.press('Tab');
      // await expect(locators.button(page, 'Clear all')).toBeFocused();
      // });
    });

    test('Verify Validation on BlurLine', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/blurLine-base-example.tsx', 'en');

      await test.step('Verify validation on blurLine starts by entering new row', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.type('test[]]', { delay: 10 });
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);// it is nessesary for stability in GitLab in Firefox
        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
      });

      await test.step('Clear all and check error visibility', async () => {
        await locators.button(page, 'Clear all').click();
        await expect(locators.errorMessage(page, '1 error')).not.toBeVisible();
        await expect(locators.button(page, 'Next error')).not.toBeVisible();
        await expect(locators.button(page, 'Previous error')).not.toBeVisible();
        await expect(locators.button(page, 'Clear all')).not.toBeVisible();
      });

      await test.step('Verify validation on blur starts by Tab', async () => {
        const text = 'Zoom in \nSecond row\n3 row[\ntest';
        await page.keyboard.type(text, { delay: 10 });
        await page.waitForTimeout(100);// for firefox
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
      });

      await test.step('Verify validation on clicking outside textbox', async () => {
        await page.waitForTimeout(100);
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.keyboard.type('text\n[]\nttext', { delay: 10 });
        await page.waitForTimeout(100); // it is necessary for stability in GitLab in Firefox
        const boxBoundingBox = await locators.boxLocator(page).boundingBox();

        if (boxBoundingBox) {
          const rightTopX = boxBoundingBox.x + boxBoundingBox.width;
          const rightTopY = boxBoundingBox.y;
          await page.mouse.click(rightTopX, rightTopY);
        }
        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
        await locators.button(page, 'Clear all').click();
      });

      await test.step('Verify multiple rows with errors validation', async () => {
        const text =
          'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row\n13 row\n14 row\n15 row';
        await page.keyboard.type(text, { delay: 10 });
        await expect(locators.errorMessage(page, '3 errors')).toBeVisible();
      });

      await test.step('Verify focus order when validation starts ', async () => {
        await page.waitForTimeout(100); // it is necessary for stability in GitLab in Firefox
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next error')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Previous error')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Clear all')).toBeFocused();
      });
    });

    test('Verify Validation on Submit', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/on-submit-example.tsx', 'en');

      await test.step('Verify validation on blurRow starts by clicking submit', async () => {
        await page.keyboard.press('Tab');
        const text = 'Zoom in \nSecond[] row\n3 row';
        await page.keyboard.type(text, { delay: 10 });

        await locators.button(page, 'submit').click();
        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
        await locators.button(page, 'Clear all').click();
      });
    });

    test('Verify Delimiter and LineProcessing functionality', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/blurLine-base-example.tsx', 'en', { maxLines: 15 });

      await page.keyboard.press('Tab');
      await test.step('Verify enter delimiter works', async () => {
        const text = 'Zoom in \nSecond line\n3 line\n4 line\n5 line';
        await page.keyboard.type(text, { delay: 10 });
        const lineCount = await locators.textbox(page).locator('p').count();
        await expect(lineCount).toBe(5);
      });
      await test.step('Verify comma delimiter works', async () => {
        await page.keyboard.press('Enter');
        const text = 'Zoom in ,Second line,3 line,4 line,5 line';
        await page.keyboard.type(text, { delay: 10 });
        const lineCount = await locators.contentDiv(page).locator('p').count();
        await expect(lineCount).toBe(10);
        await expect(locators.counter(page)).toHaveText('10/15of 15 lines');
        await locators.button(page, 'Clear all').click();
        await page.waitForTimeout(100);
      });

      await test.step('Verify lines Processing works in 1st line ', async () => {
        await page.waitForTimeout(100);
        await locators.textbox(page).click();
        await page.keyboard.type('http://', { delay: 10 });
        await page.keyboard.press('Enter');
        const lineCount = await locators.contentDiv(page).locator('p').count();
        await expect(lineCount).toBe(2);
        await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
        await page.keyboard.press('Backspace');
      });

      await test.step('Verify Line Processing works in 1st row when data in the begin', async () => {
        await page.waitForTimeout(100);
        await page.keyboard.type('http://Test', { delay: 100 });
        await page.keyboard.press('Space');
        await page.keyboard.press('Enter');
        const lineCount = await locators.contentDiv(page).locator('p').count();
        await expect(lineCount).toBe(2);
        await expect(locators.counter(page)).toHaveText('1/15of 15 lines');

        const firstLineText = await locators.row(page, 0).textContent();

        expect(firstLineText).not.toMatch(/^http:\/\//);

        await locators.button(page, 'Clear all').click();
        await page.waitForTimeout(100);
      });

      await test.step('Verify Line Processing works in 1st row when data in the end', async () => {
        await locators.textbox(page).click();
        await page.waitForTimeout(100);
        await page.keyboard.type('Testhttp://', { delay: 100 });
        await page.keyboard.press('Enter');
        const firstLineText = await locators.row(page, 0).textContent();
        expect(firstLineText).not.toMatch(/^http:\/\//);
      });
    });
  });

  test.describe('Common error OFF - Validation Delimiter LineProcessing', () => {
    test('Verify Validation on Blur', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props', 'en', { maxLines: 15, showErrors: false });

      await test.step('Verify validation on blur starts by TAB', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await locators.textbox(page).press('[');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
        await locators.button(page, 'Clear all').click();
      });

      await test.step('Verify validation on clicking outside textbox', async () => {
        await locators.textbox(page).press('[');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        const boxBoundingBox = await locators.boxLocator(page).boundingBox();

        if (boxBoundingBox) {
          const rightTopX = boxBoundingBox.x + boxBoundingBox.width;
          const rightTopY = boxBoundingBox.y;
          await page.mouse.click(rightTopX, rightTopY);
          await page.waitForTimeout(200);
        }

        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
      });

      await test.step('Verify multiple rows with errors validation', async () => {
        await locators.button(page, 'Clear all').click();
        const text = 'Zoom in \nSecond [row\n3 row\n4[] row\n5[] row ';
        await page.keyboard.type(text, { delay: 10 });
        await page.keyboard.press('Enter');
        await expect(locators.errorMessage(page)).not.toBeVisible();
        await expect(locators.button(page, 'Next error')).not.toBeVisible();
        await expect(locators.button(page, 'Previous error')).not.toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
        await page.keyboard.press('Tab');
        await expect(locators.errorMessage(page, '3 errors')).toBeVisible();
      });
    });

    test('Verify Validation on BlurLine', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/blurLine-base-example.tsx', 'en', { showErrors: false });

      await test.step('Verify validation on blurLine starts by entering new Line', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.type('test[]]', { delay: 10 });
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
        await locators.button(page, 'Clear all').click();
      });

      await test.step('Verify validation on blur starts by Tab', async () => {
        const text = 'Zoom in \nSecond row\n3 row[\ntest';
        await page.keyboard.type(text, { delay: 10 });
        await page.waitForTimeout(100);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
      });

      await test.step('Verify validation on clicking outside textbox', async () => {
        await page.waitForTimeout(100);
        await locators.button(page, 'Clear all').click();
        await page.keyboard.type('text\n[]\nttext', { delay: 10 });
        await page.waitForTimeout(100);
        const boxBoundingBox = await locators.boxLocator(page).boundingBox();

        if (boxBoundingBox) {
          const rightTopX = boxBoundingBox.x + boxBoundingBox.width;
          const rightTopY = boxBoundingBox.y;
          await page.mouse.click(rightTopX, rightTopY);
        }
        await expect(locators.textbox(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page, '1 error')).toBeVisible();
        await expect(locators.button(page, 'Next error')).toBeVisible();
        await expect(locators.button(page, 'Previous error')).toBeVisible();
        await expect(locators.button(page, 'Clear all')).toBeVisible();
        await locators.button(page, 'Clear all').click();
      });

      await test.step('Verify multiple rows with errors validation', async () => {
        const text = 'Zoom in ]\nSecond[] row\n3 row\n4[] row\n5 row';
        await page.keyboard.type(text, { delay: 10 });
        await expect(locators.errorMessage(page, '3 errors')).toBeVisible();
      });
    });

    test('Verify Delimiter and Rows Processing functionality', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/advanced/examples/no-common-error.tsx', 'en');

      await page.keyboard.press('Tab');
      await test.step('Verify enter delimiter works', async () => {
        const text = 'Zoom in \nSecond row\n3 row\n4 row\n5 row';
        await page.keyboard.type(text, { delay: 10 });
        const lineCount = await locators.textbox(page).locator('p').count();
        await expect(lineCount).toBe(5);
      });
      await test.step('Verify comma delimiter works', async () => {
        await page.keyboard.press('Enter');
        const text = 'Zoom in ,Second row,3 row,4 row,5 row';
        await page.keyboard.type(text, { delay: 10 });
        const lineCount = await locators.contentDiv(page).locator('p').count();
        expect(lineCount).toBe(10);
        await expect(locators.counter(page)).toHaveText('10/10of 10 linesLimit reached');
        await locators.button(page, 'Clear all').click();
        await page.waitForTimeout(100);
      });

      await test.step('Verify rows Processing works in 1st row ', async () => {
        await page.waitForTimeout(100);
        await locators.textbox(page).click();
        await page.keyboard.type('http://', { delay: 10 });
        await page.keyboard.press('Enter');
        const lineCount = await locators.contentDiv(page).locator('p').count();
        expect(lineCount).toBe(2);
        await expect(locators.counter(page)).toHaveText('0/10of 10 lines');
        await page.keyboard.press('Backspace');
      });
      await test.step('Verify rows Processing works in 1st row when data in the begin', async () => {
        await page.waitForTimeout(100);
        await page.keyboard.type('http://Test', { delay: 100 });
        await page.keyboard.press('Space');
        await page.keyboard.press('Enter');
        const lineCount = await locators.contentDiv(page).locator('p').count();
        expect(lineCount).toBe(2);
        await expect(locators.counter(page)).toHaveText('1/10of 10 lines');

        const firstLineText = await locators.row(page, 0).textContent();

        expect(firstLineText).not.toMatch(/^http:\/\//);

        await locators.button(page, 'Clear all').click();
        await page.waitForTimeout(100);
      });

      await test.step('Verify rows Processing works in 1st row when data in the end', async () => {
        await locators.textbox(page).click();
        await page.waitForTimeout(100);
        await page.keyboard.type('Testhttp://', { delay: 100 });
        await page.keyboard.press('Enter');
        const firstLine = await page.locator('div[contenteditable="true"] p').first();
        const firstLineText = await firstLine.textContent();
        expect(firstLineText).not.toMatch(/^http:\/\//);
      });
    });
  });

  test.describe('Common error On - Error tooltips', () => {
    test('Verify tooltips by mouse hover and click', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await test.step('Row Error on Hover', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        const text =
          'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row\n13 row';
        await page.keyboard.type(text, { delay: 20 });
        await page.waitForTimeout(100);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);

        await expect(locators.row(page, 10)).toHaveAttribute('data-errormessage', 'Please fix this value = another error');
        await locators.row(page, 10).hover();
        await locators.tooltip(page, 'Please fix this value = another error').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('3 errors');
        await expect(locators.textbox(page)).not.toBeFocused();

        await locators.row(page, 9).hover();
        await locators.tooltip(page, 'Please fix this value = another error').waitFor({ state: 'hidden' });
        await expect(locators.tooltip(page)).toBeEmpty;

        await locators.row(page, 10).click();
        await locators.tooltip(page, 'Please fix this value = another error').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('Error 3 out of 3');

        await locators.row(page, 9).click();
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('3 errors');
        await expect(locators.tooltip(page)).toHaveText('Please enter correct movie names.');
        await locators.row(page, 10).hover();
        await locators.tooltip(page, 'Please fix this value = another error').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('3 errors');
      });

      await test.step('Navigation between rows by clicking arrows', async () => {
        await locators.button(page, 'Next error').click();
        await locators.tooltip(page, 'Please remove one error value').waitFor({ state: 'visible' });

        await expect(locators.errorMessage(page)).toHaveText('Error 1 out of 3');

        await locators.button(page, 'Previous error').click();
        await locators.tooltip(page, 'Please fix this value = another error').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('Error 3 out of 3');

        await locators.button(page, 'Previous error').click();
        await expect(locators.errorMessage(page)).toHaveText('Error 2 out of 3');

        await locators.button(page, 'Previous error').click();
        await expect(locators.errorMessage(page)).toHaveText('Error 1 out of 3');

        await locators.row(page, 9).click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await locators.tooltip(page, 'Please enter correct movie names.').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('3 errors');
      });
    });

    test('Verify tooltips by keyboard click and navigate by arrows', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await test.step('Row Error on Focus', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        const text =
          'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row';
        await page.keyboard.type(text, { delay: 20 });
        await page.waitForTimeout(200);
        await page.keyboard.press('Tab');
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');

        await page.waitForTimeout(200);

        await locators.tooltip(page, 'Please enter correct movie names.').waitFor({ state: 'visible' });
        await expect(locators.textbox(page)).toBeFocused();
        await expect(locators.contentDiv(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page)).toHaveText('3 errors');

        await page.keyboard.press('ArrowUp');
        await page.waitForTimeout(100);
        await expect(locators.row(page, 10)).toHaveAttribute('data-errormessage', 'Please fix this value = another error');
        await page.keyboard.press('ArrowUp');
        await expect(locators.errorMessage(page)).toHaveText('3 errors');
        await locators.tooltip(page, 'Please enter correct movie names.').waitFor({ state: 'visible' });
      });

      await test.step('Navigation between rows by clicking arrows', async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(50);
        await page.keyboard.press('Enter');
        await locators.tooltip(page, 'Please remove one error value').waitFor({ state: 'visible' });
        await expect(locators.textbox(page)).toBeFocused();

        await page.keyboard.press('Tab');
        await locators.tooltip(page, 'Please remove one error value').waitFor({ state: 'hidden' });
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.tooltip(page, 'Please fix this value = another error').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('Error 3 out of 3');
      });
    });

    test('Verify tooltips when fixing errors', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page, browserName }) => {
      if (browserName === 'webkit') test.skip();

      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await test.step('Row Error on Focus', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        const text =
          'Zoom in \nSecond row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row\n9 row\n10 row\n11[[row\n12 row';
        await page.keyboard.type(text, { delay: 20 });
        await page.waitForTimeout(200);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
        await locators.textbox(page).click();
        await expect(locators.textbox(page)).toBeFocused();
        await locators.tooltip(page, 'Please enter correct movie names.').waitFor({ state: 'visible' });
        await expect(locators.contentDiv(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.errorMessage(page)).toHaveText('3 errors');

        await locators.row(page, 10).click();
        await expect(locators.row(page, 10)).toHaveAttribute('data-errormessage', 'Please fix this value = another error');
        await expect(locators.errorMessage(page)).toHaveText('Error 3 out of 3');

        for (let i = 0; i < 6; i++)
          await page.keyboard.press('Backspace');
        await page.waitForTimeout(200);

        await locators.tooltip(page, 'Please enter correct movie names.').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('2 errors');
        await expect(locators.row(page, 10)).not.toHaveAttribute('data-errormessage', 'Please fix this value = another error');
      });

      await test.step('Navigation between rows by clicking arrows', async () => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);

        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);

        await expect(locators.textbox(page)).toBeFocused();
        await expect(locators.errorMessage(page)).toHaveText('Error 1 out of 2');
        await locators.tooltip(page, 'Please remove one error value').waitFor({ state: 'visible' });

        for (let i = 0; i < 6; i++) await page.keyboard.press('Backspace');
        await locators.tooltip(page, 'Please enter correct movie names.').waitFor({ state: 'visible' });
        await expect(locators.contentDiv(page)).toHaveAttribute('aria-invalid', 'true');

        await locators.button(page, 'Next error').click();

        await locators.tooltip(page, 'Please enter correct movie names.').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('Error 1 out of 1');

        await locators.row(page, 4).click();
        await page.waitForTimeout(200); // wait for setting cursor, for forefox stability
        for (let i = 0; i < 6; i++) await page.keyboard.press('Backspace');
        await expect(locators.contentDiv(page)).not.toHaveAttribute('aria-invalid', 'true');
        await expect(locators.tooltip(page)).toBeEmpty;
      });
    });

    test('Verify tooltips when adding errors ', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await test.step('Row Error on Focus', async () => {
        await locators.textbox(page).click();
        const text = '1 row[\n2[] row\n3 row\n4 ]]row\n5 row';
        await page.keyboard.type(text, { delay: 10 });
        await page.waitForTimeout(200);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(500);
        await expect(locators.errorMessage(page)).toHaveText('3 errors');
        await locators.row(page, 4).click();
        await page.keyboard.type('test[]', { delay: 20 });
        await locators.tooltip(page, 'Please remove one error value').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('Error 4 out of 4');
      });
    });
  });

  test.describe('Common error Off - Error tooltips', () => {
    test('Verify tooltips by mouse hover and click', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/advanced/examples/no-common-error.tsx', 'en');

      await test.step('Row Error on Hover', async () => {
        await page.keyboard.press('Tab');
        const text = 'Zoom in \nSecond[] row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row';
        await page.keyboard.type(text, { delay: 10 });
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);

        await expect(locators.row(page, 0)).toHaveAttribute('data-errormessage', 'undefined');
        await expect(locators.row(page, 1)).toHaveAttribute(
          'data-errormessage',
          'Please remove invalid charsets from the movie name.',
        );
        await locators.row(page, 2).hover();
        await page.waitForTimeout(100);
        await expect(locators.errorMessage(page)).toHaveText('3 errors');
        await expect(locators.tooltip(page)).toHaveCount(0);
        await expect(locators.textbox(page)).not.toBeFocused();
        await locators.row(page, 1).hover();
        await expect(locators.tooltip(page)).toHaveCount(1);
        await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'visible' });
        await locators.row(page, 2).hover();
        await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'hidden' });
        await expect(locators.tooltip(page)).toHaveCount(0);

        await locators.row(page, 1).click();
        await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('Error 1 out of 3');
        await expect(locators.textbox(page)).toBeFocused();

        await locators.row(page, 2).click();
        await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'hidden' });
        await expect(locators.errorMessage(page)).toHaveText('3 errors');
        await expect(locators.tooltip(page)).toHaveCount(0);

        await locators.row(page, 1).hover();
        await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'visible' });

        await expect(locators.errorMessage(page)).toHaveText('3 errors');
      });

      await test.step('Navigation between rows by clicking arrows', async () => {
        await locators.button(page, 'Next error').click();
        await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'visible' });

        await expect(locators.errorMessage(page)).toHaveText('Error 1 out of 3');

        await locators.button(page, 'Previous error').click();
        await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('Error 3 out of 3');

        await locators.button(page, 'Previous error').click();
        await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'visible' });
        await expect(locators.errorMessage(page)).toHaveText('Error 2 out of 3');

        await locators.row(page, 2).click();
        await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'hidden' });
        await expect(locators.errorMessage(page)).toHaveText('3 errors');
        await expect(locators.tooltip(page)).toHaveCount(0);
      });
    });

    test('Verify tooltips by keyboard click and navigate by arrows', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/advanced/examples/no-common-error.tsx', 'en');

      await page.keyboard.press('Tab');
      const text = 'Zoom in \nSecond[] row\n3 row\n4[] row\n5 row\n6 ]]row\n7 row\n8 row';
      await page.keyboard.type(text, { delay: 20 });
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      await expect(locators.tooltip(page)).toHaveCount(0);
      await expect(locators.contentDiv(page)).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.errorMessage(page)).toHaveText('3 errors');

      await locators.row(page, 1).click();
      await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'visible' });
      await expect(locators.errorMessage(page)).toHaveText('Error 1 out of 3');

      await page.keyboard.press('ArrowUp');
      await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'hidden' });

      await expect(locators.tooltip(page)).toHaveCount(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.tooltip(page, 'Please remove invalid charsets from the movie name.').waitFor({ state: 'visible' });

      await expect(locators.errorMessage(page)).toHaveText('Error 3 out of 3');
      await expect(locators.tooltip(page)).toHaveCount(1);
    });
  });

  test.describe('handleChange - Error validation', () => {
    test('Verify Errors counter works when handleChange added rows', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/with-new-value-on-handleChange.tsx', 'en');
      await page.waitForTimeout(100);

      await page.keyboard.press('Tab');
      const text = 'Zoom in[] \nSecond';
      await page.keyboard.type(text, { delay: 20 });
      await page.keyboard.press('Tab');
      await expect(locators.tooltip(page)).toHaveCount(0);
      await expect(locators.errorMessage(page)).toHaveText('2 errors');
    });
  });

  test.describe('lineProcessing cases', () => {
    test('Verify lineProcessing when paste empty rows', {
      tag: [TAG.PRIORITY_HIGH,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/empty-value-in-paste.tsx', 'en');

      const firstTextArea = locators.textbox(page).first();
      await firstTextArea.click();
      const text = 'Zoom in[] \nSecond \n //[third';
      await page.keyboard.type(text, { delay: 20 });
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await expect(locators.textbox(page).nth(1)).toBeEmpty();
    });

    test('Verify lineProcessing when counts lines and index', {
      tag: [TAG.PRIORITY_HIGH,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/lines-and-index-in-paste.tsx', 'en');

      const firstTextArea = locators.textbox(page).first();
      await firstTextArea.click();
      const text = 'Zoom in[] \nSecond \n //[third';
      await page.keyboard.type(text, { delay: 20 });
      await locators.textbox(page).nth(1).click();
      await page.waitForTimeout(100);
      await expect(locators.textbox(page).nth(1)).not.toBeEmpty();
      const paragraphs = locators.textbox(page).nth(1).locator('p');
      await expect(paragraphs).toHaveCount(3);
      await expect(paragraphs.first()).toHaveText(/^#1\/3:/);
      await expect(paragraphs.nth(1)).toHaveText(/^#2\/3:/);
      await expect(paragraphs.nth(2)).toHaveText(/^#3\/3:/);
    });
  });

  test.describe('Controlled errors', () => {
    test('Verify error shows on manually errors set', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/controlled-errors.tsx', 'en');

      await locators.textbox(page).first().click();
      const text = 'Zoom in[] \nSecond \n //[third';
      await page.keyboard.type(text, { delay: 20 });

      const paragraphs = locators.textbox(page).locator('p');
      await locators.button(page, 'validate').click();

      await expect(paragraphs.first()).toHaveAttribute('aria-invalid', 'true');
      await paragraphs.first().click();
      await locators.tooltip(page, 'some error in row').waitFor({ state: 'visible' });
      await expect(locators.tooltip(page)).toHaveCount(1);
      await expect(locators.tooltip(page)).toHaveText('some error in row');
      await expect(locators.errorMessage(page)).toHaveText('Error 1 out of 1');

      await locators.button(page, 'validate').click();

      await expect(paragraphs.nth(1)).toHaveAttribute('aria-invalid', 'true');
      await paragraphs.nth(1).click();
      await expect(locators.tooltip(page)).toHaveText('some error in row');
      await expect(locators.tooltip(page)).toHaveCount(1);
      await expect(locators.errorMessage(page)).toHaveText('Error 1 out of 1');
    });
  });
});
