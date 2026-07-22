import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const TEXTBOX_SELECTOR = 'ol[contenteditable="true"]';
const ROW_SELECTOR = `${TEXTBOX_SELECTOR} li`;

export const locators = {
  button: (page: Page, name?: string): Locator => page.getByRole('button', { name }),
  textbox: (page: Page): Locator => page.locator(TEXTBOX_SELECTOR),
  counter: (page: Page): Locator => page.locator(
    '[data-ui-name="BulkTextarea.Counter"]',
  ),

  rows: (page: Page): Locator => page.locator(ROW_SELECTOR),
  row: (page: Page, index: number): Locator => page.locator(ROW_SELECTOR).nth(index),
  contentDiv: (page: Page): Locator => page.locator(TEXTBOX_SELECTOR),
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

const keyboardModifier = process.platform === 'darwin' ? 'Meta' : 'Control';
// NOTE: keys must be lowercase. Playwright delivers `press('Meta+Z')` as `event.key === 'Z'`,
// but the component checks `event.key === 'z'`, so an uppercase letter never triggers undo/redo.
const pressUndo = async (page: Page) => {
  await page.keyboard.press(`${keyboardModifier}+z`);
};
const pressRedo = async (page: Page) => {
  await page.keyboard.press(`${keyboardModifier}+Shift+z`);
};
const pressRedoAlternative = async (page: Page) => {
  await page.keyboard.press(`${keyboardModifier}+y`);
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

    test('Verify too many lines tooltip', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/advanced/examples/manuall_focus.tsx', 'en');

      await test.step('Show tooltip after exceeding the maximum number of lines', async () => {
        await expect(locators.textbox(page)).toBeFocused();

        await page.keyboard.type('second');
        await page.keyboard.press('Enter');
        await page.keyboard.type('third');
        await page.keyboard.press('Enter');
        await page.keyboard.type('fourth');
        await page.keyboard.press('Enter');
        await page.keyboard.type('fifth');

        await expect(locators.rows(page)).toHaveCount(5);
        await expect(locators.counter(page)).toContainText('5/4');
        await expect(locators.counter(page)).toContainText('Limit exceeded');
        await expect(page.getByRole('tooltip', { name: 'Too much lines' })).toBeVisible();
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
        const lineCount = await locators.rows(page).count();
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
        const lineCount = await locators.rows(page).count();
        await expect(lineCount).toBe(0);
        await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
      });

      await test.step('Type immediately after clear starts fresh, not append', async () => {
        await page.waitForTimeout(300);
        await locators.textbox(page).click();
        await page.keyboard.type('new text', { delay: 20 });
        await expect(locators.counter(page)).toHaveText('1/15of 15 lines');
        const lineCount = await locators.rows(page).count();
        await expect(lineCount).toBe(1);
        await expect(locators.row(page, 0)).toHaveText('new text');
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
        const lineCount = await locators.rows(page).count();
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
        const lineCount = await locators.rows(page).count();
        await expect(lineCount).toBe(0);
        await expect(locators.counter(page)).toHaveText('0/10of 10 lines');
      });
    });
  });

  test.describe('Undo and redo', () => {
    test('Verify text undo, redo and redo reset after new input', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await locators.textbox(page).click();
      await page.keyboard.type('abc', { delay: 10 });
      await expect(locators.row(page, 0)).toHaveText('abc');

      await pressUndo(page);
      await expect(locators.row(page, 0)).toHaveText('ab');

      await pressRedo(page);
      await expect(locators.row(page, 0)).toHaveText('abc');

      await pressUndo(page);
      await expect(locators.row(page, 0)).toHaveText('ab');

      await pressRedoAlternative(page);
      await expect(locators.row(page, 0)).toHaveText('abc');

      await pressUndo(page);
      await expect(locators.row(page, 0)).toHaveText('ab');

      await page.keyboard.type('d', { delay: 10 });
      await expect(locators.row(page, 0)).toHaveText('abd');

      await pressRedo(page);
      await expect(locators.row(page, 0)).toHaveText('abd');
    });

    test('Verify undo and redo restore paragraph insertion with empty line', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await locators.textbox(page).click();
      await page.keyboard.type('one', { delay: 10 });
      await page.keyboard.press('Enter');
      // let post-Enter state settle (history push, setErrorIndex, deferred recalculateErrors)
      await page.waitForTimeout(100);

      await expect(locators.rows(page)).toHaveCount(2);
      await expect(locators.row(page, 0)).toHaveText('one');
      expect(await locators.row(page, 1).evaluate((node) => node.textContent)).toBe('\uFEFF');

      await page.keyboard.type('two', { delay: 10 });
      expect(await locators.row(page, 1).evaluate((node) => node.textContent)).toBe('two');

      await pressUndo(page);
      await pressUndo(page);
      await pressUndo(page);
      expect(await locators.row(page, 1).evaluate((node) => node.textContent)).toBe('\uFEFF');

      await pressUndo(page);
      await expect(locators.rows(page)).toHaveCount(1);
      await expect(locators.row(page, 0)).toHaveText('one');

      await pressRedo(page);
      await expect(locators.rows(page)).toHaveCount(2);
      await expect(locators.row(page, 0)).toHaveText('one');
      expect(await locators.row(page, 1).evaluate((node) => node.textContent)).toBe('\uFEFF');
    });

    test('Verify undo restores caret position', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await locators.textbox(page).click();
      await page.keyboard.type('abc', { delay: 10 });
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.type('X', { delay: 10 });
      await expect(locators.row(page, 0)).toHaveText('aXbc');

      await pressUndo(page);
      await expect(locators.row(page, 0)).toHaveText('abc');

      const selection = await page.evaluate(() => {
        const selection = document.getSelection();
        const anchorNode = selection?.anchorNode;
        const anchorElement = anchorNode instanceof Text ? anchorNode.parentElement : anchorNode;

        return {
          lineIndex: Array.from(document.querySelectorAll('[contenteditable="true"] li')).indexOf(anchorElement as HTMLLIElement),
          offset: selection?.anchorOffset,
        };
      });

      expect(selection).toEqual({ lineIndex: 0, offset: 1 });
    });

    test('Verify undo with paste lineProcessing restores processed empty row', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15, pasteSkipEmptyLines: false });

      await test.step('Type value that paste lineProcessing turns into an empty row on undo', async () => {
        await locators.textbox(page).click();
        await page.keyboard.type('http://a', { delay: 10 });
        await expect(locators.row(page, 0)).toHaveText('http://a');
      });

      await test.step('Undo restores the processed previous value', async () => {
        await pressUndo(page);
        expect(await locators.row(page, 0).evaluate((node) => node.textContent)).toBe('\uFEFF');
      });
    });

    test('Verify undo restores value before paste', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await locators.textbox(page).click();
      await locators.textbox(page).evaluate((node, text) => {
        const event = new Event('paste', { bubbles: true, cancelable: true });
        (event as any).clipboardData = {
          getData: (type: string) => (type === 'text/plain' ? text : ''),
          types: ['text/plain'],
        };
        node.dispatchEvent(event);
      }, 'first\nsecond\nthird');

      await expect(locators.rows(page)).toHaveCount(3);
      await expect(locators.row(page, 0)).toHaveText('first');
      await expect(locators.row(page, 1)).toHaveText('second');
      await expect(locators.row(page, 2)).toHaveText('third');

      await pressUndo(page);
      await expect(locators.rows(page)).toHaveCount(0);

      await pressRedo(page);
      await expect(locators.rows(page)).toHaveCount(3);
      await expect(locators.row(page, 0)).toHaveText('first');
      await expect(locators.row(page, 1)).toHaveText('second');
      await expect(locators.row(page, 2)).toHaveText('third');
    });

    test('Verify undo and redo after Backspace', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await locators.textbox(page).click();
      await page.keyboard.type('abc', { delay: 10 });
      await page.keyboard.press('Backspace');
      await expect(locators.row(page, 0)).toHaveText('ab');

      await pressUndo(page);
      await expect(locators.row(page, 0)).toHaveText('abc');

      await pressRedo(page);
      await expect(locators.row(page, 0)).toHaveText('ab');
    });

    test('Verify undo and redo after Delete (forward)', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await locators.textbox(page).click();
      await page.keyboard.type('abc', { delay: 10 });
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Delete');
      await expect(locators.row(page, 0)).toHaveText('bc');

      await pressUndo(page);
      await expect(locators.row(page, 0)).toHaveText('abc');

      await pressRedo(page);
      await expect(locators.row(page, 0)).toHaveText('bc');
    });

    test('Verify undo restores a range selection, not just the caret', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await locators.textbox(page).click();
      await page.keyboard.type('abcdef', { delay: 10 });
      // move caret after "ab" (from the end), then select "cd"
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Shift+ArrowRight');
      await page.keyboard.press('Shift+ArrowRight');
      await page.keyboard.press('Delete');
      await expect(locators.row(page, 0)).toHaveText('abef');

      await pressUndo(page);
      await expect(locators.row(page, 0)).toHaveText('abcdef');

      const selection = await page.evaluate(() => {
        const selection = document.getSelection();

        return {
          anchorOffset: selection?.anchorOffset,
          focusOffset: selection?.focusOffset,
          isCollapsed: selection?.isCollapsed,
        };
      });

      expect(selection).toEqual({ anchorOffset: 2, focusOffset: 4, isCollapsed: false });
    });
  });

  test('Verify instanceRef adds an empty row and sets its caret', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@bulk-textarea'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/bulk-textarea/advanced/examples/manuall_focus.tsx', 'en');

    await test.step('Add an empty row and focus its caret on mount', async () => {
      await expect(locators.rows(page)).toHaveCount(2);
      await expect(locators.row(page, 0)).toHaveText('first value');
      expect(await locators.row(page, 1).evaluate((node) => node.textContent)).toBe('\uFEFF');
      await expect(locators.textbox(page)).toBeFocused();

      const selection = await page.evaluate(() => {
        const selection = document.getSelection();
        const anchorElement = selection?.anchorNode instanceof Text
          ? selection.anchorNode.parentElement
          : selection?.anchorNode;

        return {
          anchorLineIndex: Array.from(document.querySelectorAll('ol[contenteditable="true"] li')).indexOf(anchorElement as HTMLLIElement),
          anchorOffset: selection?.anchorOffset,
        };
      });

      expect(selection).toEqual({
        anchorLineIndex: 1,
        anchorOffset: 0,
      });
    });
  });

  test.describe('Keyboard navigation', () => {
    test('Verify Home and first character on empty row stay in current row', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@bulk-textarea'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/bulk-textarea/tests/examples/basic-props.tsx', 'en', { maxLines: 15 });

      await test.step('Create an empty second row', async () => {
        await locators.textbox(page).click();
        await page.keyboard.type('one', { delay: 10 });
        await page.keyboard.press('Enter');
        await expect(locators.rows(page)).toHaveCount(2);
        expect(await locators.row(page, 1).evaluate((node) => node.textContent)).toBe('\uFEFF');
      });

      await test.step('Home keeps caret on the empty row', async () => {
        await page.keyboard.press('Home');
        const selection = await page.evaluate(() => {
          const rows = Array.from(document.querySelectorAll('ol[contenteditable="true"] li'));
          const selection = document.getSelection();
          const focusElement = selection?.focusNode instanceof Text
            ? selection.focusNode.parentElement
            : selection?.focusNode;

          return {
            lineIndex: rows.indexOf(focusElement as HTMLLIElement),
            offset: selection?.focusOffset,
          };
        });

        expect(selection.lineIndex).toBe(1);
      });

      await test.step('Typing first character into empty row does not drop it', async () => {
        await page.keyboard.type('x', { delay: 10 });
        await expect(locators.row(page, 1)).toHaveText('x');
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
        await expect(locators.contentDiv(page)).not.toHaveAttribute('aria-invalid', 'true');
        await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
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
        const lineCount = await locators.rows(page).count();
        await expect(lineCount).toBe(5);
      });
      await test.step('Verify comma delimiter works', async () => {
        await page.keyboard.press('Enter');
        const text = 'Zoom in ,Second line,3 line,4 line,5 line';
        await page.keyboard.type(text, { delay: 10 });
        const lineCount = await locators.rows(page).count();
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
        const lineCount = await locators.rows(page).count();
        await expect(lineCount).toBe(2);
        await expect(locators.counter(page)).toHaveText('0/15of 15 lines');
        await page.keyboard.press('Backspace');
        await expect(locators.rows(page)).toHaveCount(0);
      });

      await test.step('Verify Line Processing works in 1st row when data in the begin', async () => {
        await locators.textbox(page).click();
        await page.waitForTimeout(100);
        await page.keyboard.type('http://Test', { delay: 100 });
        await page.keyboard.press('Space');
        await page.waitForTimeout(100);
        await page.keyboard.press('Enter');
        await expect(locators.rows(page)).toHaveCount(2);
        await expect(locators.counter(page)).toHaveText('1/15of 15 lines');

        await expect(locators.row(page, 0)).not.toHaveText(/^http:\/\//);

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
        await page.waitForTimeout(100);
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
        await page.waitForTimeout(100);
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
        const lineCount = await locators.rows(page).count();
        await expect(lineCount).toBe(5);
      });
      await test.step('Verify comma delimiter works', async () => {
        await page.keyboard.press('Enter');
        const text = 'Zoom in ,Second row,3 row,4 row,5 row';
        await page.keyboard.type(text, { delay: 10 });
        const lineCount = await locators.rows(page).count();
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
        const lineCount = await locators.rows(page).count();
        expect(lineCount).toBe(2);
        await expect(locators.counter(page)).toHaveText('0/10of 10 lines');
        await page.keyboard.press('Backspace');
        await expect(locators.rows(page)).toHaveCount(0);
      });
      await test.step('Verify rows Processing works in 1st row when data in the begin', async () => {
        await locators.textbox(page).click();
        await page.waitForTimeout(100);
        await page.keyboard.type('http://Test', { delay: 100 });
        await page.keyboard.press('Space');
        await page.waitForTimeout(100);
        await page.keyboard.press('Enter');
        await expect(locators.rows(page)).toHaveCount(2);
        await expect(locators.counter(page)).toHaveText('1/10of 10 lines');

        await expect(locators.row(page, 0)).not.toHaveText(/^http:\/\//);

        await locators.button(page, 'Clear all').click();
        await page.waitForTimeout(100);
      });

      await test.step('Verify rows Processing works in 1st row when data in the end', async () => {
        await locators.textbox(page).click();
        await page.waitForTimeout(100);
        await page.keyboard.type('Testhttp://', { delay: 100 });
        await page.keyboard.press('Enter');
        const firstLine = await page.locator('ol[contenteditable="true"] li').first();
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
        await page.keyboard.type(text, { delay: 30 });
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

        await expect(locators.row(page, 0)).not.toHaveAttribute('data-errormessage');
        await expect(locators.row(page, 1)).toHaveAttribute(
          'data-errormessage',
          'Please remove invalid charsets from the movie name.',
        );
        await expect(locators.row(page, 2)).not.toHaveAttribute('data-errormessage');
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
      const paragraphs = locators.textbox(page).nth(1).locator('li');
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

      const paragraphs = locators.rows(page);
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
