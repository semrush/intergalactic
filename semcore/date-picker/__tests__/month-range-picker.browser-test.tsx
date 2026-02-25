import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export function formatAriaLabelToInputValue(ariaLabel: string | null): string {
  if (!ariaLabel) {
    throw new Error('aria-label is null');
  }

  let parsedDate = new Date(ariaLabel);

  if (isNaN(parsedDate.getTime())) {
    parsedDate = new Date(`${ariaLabel} 1`);
  }

  if (isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid aria-label date: ${ariaLabel}`);
  }

  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = parsedDate.getFullYear().toString();

  return `${month}/${year}`;
}

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },

  monthRangePickerTrigger: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="MonthRangePicker.Trigger"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  calendar: (page: Page) => page.locator('[data-ui-name="MonthRangePicker.Calendar"]'),
  weekDaysRow: (page: Page) => page.locator('[data-ui-name="CalendarWeekDays"]'),
  divider: (page: Page) => page.locator('[data-ui-name="Divider"]'),
  cells: (page: Page, index?: number) => {
    const base = page.getByRole('gridcell');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dateRangeHeader: (page: Page) => page.locator('[data-ui-name="MonthRangePicker.Header"]'),
  inputValue: (page: Page) => page.locator('[data-ui-name="MonthRangePicker.ValueDateRange"]'),
  compareValue: (page: Page) => page.locator(
    '[data-ui-name="MonthRangePicker.CompareDateRange"]'),
  popper: (page: Page) => page.getByRole('dialog'),
  title: (page: Page) => page.locator('[data-ui-name="MonthRangePicker.Title"]'),
  period: (page: Page) => page.locator('[data-ui-name="MonthRangePicker.Period"]'),
  periodButtons: (page: Page) => page.getByRole('option'),

};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Month Range Trigger', () => {
    test('Verify trigger when entering date manually', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

      const screenshotsClip = (await locators.monthRangePickerTrigger(page, 1).boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.type('052020');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      await page.keyboard.type('05');
      await page.keyboard.type('2024');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    test('Verify trigger states and props', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/month-range-trigger.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });
  test.describe('Month range', () => {
    test('Verify Month RangePicker styles', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

      const separator = page.locator('[data-ui-name="DateRange.RangeSep"]');

      const checkStyle = async (element: any, expectedStyles: Record<string, string>) => {
        for (const [property, expectedValue] of Object.entries(expectedStyles)) {
          const actualValue = await element.evaluate(
            (el: any, property: any) => getComputedStyle(el)[property],
            property,
          );
          expect(actualValue).toBe(expectedValue);
        }
      };

      await test.step('Verify SVG dimensions and paddings', async () => {
        const svg = locators.monthRangePickerTrigger(page).locator('svg');
        await checkStyle(svg, {
          paddingLeft: '8px',
          paddingRight: '8px',
        });
        await expect(svg).toHaveAttribute('width', '16');
        await expect(svg).toHaveAttribute('height', '16');
      });

      await test.step('Verify trigger separator padding', async () => {
        await checkStyle(separator, { paddingRight: '8px' });
      });

      await test.step('Verify disabled date style', async () => {
        await locators.monthRangePickerTrigger(page, 0).click();
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        await checkStyle(locators.cells(page, 0), {
          color: 'rgb(25, 27, 35)',
          backgroundColor: 'rgb(255, 255, 255)',
          margin: '4px 0px 0px',
        });
      });

      await test.step('Verify available date style', async () => {
        await checkStyle(locators.cells(page, 2), {
          color: 'rgb(25, 27, 35)',
          backgroundColor: 'rgb(255, 255, 255)',
          margin: '4px 0px 0px',
        });
      });

      await test.step('Select range and open popper again', async () => {
        await locators.cells(page, 10).click();
        await locators.cells(page, 11).click();
        await locators.button(page, 'Apply').click();
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

        await locators.monthRangePickerTrigger(page, 0).click();
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
      });

      const selectedCells = page.locator('[data-ui-name="CalendarMonths.Unit"][class*="Selected"]');

      await test.step('Verify selected date style', async () => {
        await checkStyle(selectedCells.nth(0), {
          margin: '4px 0px 0px',
          width: '60px',
          height: '32px',
        });
      });

      await test.step('Verify style for Apply picker button', async () => {
        await checkStyle(locators.button(page, 'Apply'), {
          color: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(0, 143, 248)',
        });
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
  test.describe('Month range', () => {
    test('Verify roles and attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

      await test.step('Verify trigger svg attributes', async () => {
        const svg = locators.monthRangePickerTrigger(page, 1).locator('svg');
        const svgAttributes = [
          ['aria-hidden', 'true'],
          ['width', '16'],
          ['height', '16'],
        ];

        for (const [attr, value] of svgAttributes) {
          await expect(svg).toHaveAttribute(attr, value);
        }
      });

      await locators.monthRangePickerTrigger(page, 1).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      await test.step('Verify calendar attributes', async () => {
        const count = await locators.calendar(page).count();

        for (let i = 0; i < count; i++) {
          const calendar = locators.calendar(page).nth(i);
          await expect(calendar).toHaveAttribute('role', 'grid');
          await expect(calendar).toHaveAttribute('disabled', '');
        }
      });

      await test.step('Verify days attributes', async () => {
        const cellCount = await locators.cells(page).count();

        for (let i = 0; i < cellCount; i++) {
          const cell = locators.cells(page, i);
          const ariaLabel = await cell.getAttribute('aria-label');
          if (!ariaLabel) continue;

          const attributes = ['role', 'aria-colindex', 'aria-rowindex'];
          for (const attr of attributes) {
            await expect(cell).toHaveAttribute(attr);
          }

          const date = new Date(ariaLabel);
          const isCurrentMonth = date.getMonth() === 5;

          const hasDisabled = (await cell.getAttribute('disabled')) !== null;
          const ariaDisabled = await cell.getAttribute('aria-disabled');

          if (isCurrentMonth) {
            expect(hasDisabled).toBe(false);
            expect(ariaDisabled).toBe('false');
          }

          const text = await cell.textContent();
          expect(text?.trim()).not.toBe('');
        }
      });

      await test.step('Verify Period attributes', async () => {
        const attributes = [
          ['role', 'listbox'],
          ['aria-label', 'Presets'],
        ];
        for (const [attr, value] of attributes) {
          await expect(locators.period(page)).toHaveAttribute(attr, value);
        }
      });
    });

    test('Verify Month RangePicker mouse interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

      const buttons = page.locator('[data-ui-name="Button"]');
      const input = page.locator('input[data-ui-name="MonthRangePicker.Trigger"]');

      await test.step('Navigate months via header buttons', async () => {
        await locators.monthRangePickerTrigger(page, 2).click();
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        const title1 = await locators.title(page).first().textContent();
        const title2 = await locators.title(page).nth(1).textContent();

        await locators.button(page, 'Previous year').click();
        await expect(locators.title(page).first()).not.toHaveText(title1!);
        await expect(locators.title(page).nth(1)).not.toHaveText(title2!);

        await locators.button(page, 'Next year').click();
        await expect(locators.title(page).first()).toHaveText(title1!);
        await expect(locators.title(page).nth(1)).toHaveText(title2!);
      });

      await test.step('Select start and end dates', async () => {
        await locators.cells(page, 10).click();
        const label10 = await locators.cells(page, 10).getAttribute('aria-label');
        await expect(input.nth(0)).toHaveValue(formatAriaLabelToInputValue(label10));

        await locators.cells(page, 15).click();
        const label15 = await locators.cells(page, 15).getAttribute('aria-label');
        await expect(input.nth(1)).toHaveValue(formatAriaLabelToInputValue(label15));
      });

      await test.step('Reselect start date and reset end', async () => {
        await locators.cells(page, 15).click();
        await page.waitForTimeout(300);
        const label = await locators.cells(page, 15).getAttribute('aria-label');

        await expect(input.nth(0)).toHaveValue(formatAriaLabelToInputValue(label));
        await expect(input.nth(1)).toHaveValue('');

        await locators.cells(page, 15).click();
        await expect(input.nth(1)).toHaveValue(formatAriaLabelToInputValue(label));
      });

      await test.step('Select new date range', async () => {
        await locators.cells(page, 17).click();
        const label17 = await locators.cells(page, 17).getAttribute('aria-label');
        await expect(input.nth(0)).toHaveValue(formatAriaLabelToInputValue(label17));
        await expect(input.nth(1)).toHaveValue('');

        await locators.cells(page, 20).click();
        const label20 = await locators.cells(page, 20).getAttribute('aria-label');
        await expect(input.nth(1)).toHaveValue(formatAriaLabelToInputValue(label20));
      });

      await test.step('Click outside resets input values', async () => {
        await locators.monthRangePickerTrigger(page, 2).click();
        await expect(input.nth(0)).toHaveValue('');
        await expect(input.nth(1)).toHaveValue('');
      });

      await test.step('Apply a selected range', async () => {
        await locators.monthRangePickerTrigger(page, 2).click();
        await page.waitForTimeout(200);

        await locators.cells(page, 5).click();
        await locators.cells(page, 7).click();
        await locators.button(page, 'Apply').click();
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      });

      await test.step('Reset via Reset button', async () => {
        await locators.monthRangePickerTrigger(page, 2).click();
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        await locators.button(page, 'Reset').click();
        await expect(input.nth(0)).toHaveValue('');
        await expect(input.nth(1)).toHaveValue('');
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      });

      await test.step('Quick select today’s range', async () => {
        await locators.monthRangePickerTrigger(page, 2).click();
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        await buttons.nth(3).click();

        await expect(input.nth(0)).not.toHaveValue('');
        await expect(input.nth(1)).not.toHaveValue('');
      });
    });

    test('Verify Month RangePicker keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');
      const buttons = page.locator('[data-ui-name="Button"]');
      const input = page.locator('input[data-ui-name="MonthRangePicker.Trigger"]');

      const pressTab = async (times = 1) => {
        for (let i = 0; i < times; i++) {
          await page.keyboard.press('Tab');
        }
      };

      await test.step('Open popper using Enter key', async () => {
        await pressTab(3);
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        await expect(locators.popper(page)).toBeFocused();
      });

      await test.step('Close popper using Escape key', async () => {
        await page.keyboard.press('Escape');
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      });

      await test.step('Reopen popper using Space key', async () => {
        await page.keyboard.press('Space');
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        await expect(locators.popper(page)).toBeFocused();
      });

      await test.step('Navigate header controls with keyboard', async () => {
        await pressTab(1); // Focus Prev
        await expect(locators.button(page, 'Previous year')).toBeFocused();

        const [initialFrom, initialTo] = await Promise.all([
          locators.title(page).first().textContent(),
          locators.title(page).nth(1).textContent(),
        ]);

        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);

        const [updatedFrom, updatedTo] = await Promise.all([
          locators.title(page).first().textContent(),
          locators.title(page).nth(1).textContent(),
        ]);

        expect(updatedFrom).not.toBe(initialFrom);
        expect(updatedTo).not.toBe(initialTo);

        await pressTab(2); // Focus Next
        await expect(locators.button(page, 'Next year')).toBeFocused();

        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);

        await expect(locators.title(page).first()).toHaveText(initialFrom!);
        await expect(locators.title(page).nth(1)).toHaveText(initialTo!);
      });

      await test.step('Tab through calendar and action buttons', async () => {
        await page.keyboard.press('Shift+Tab'); // Calendar
        await expect(
          page.locator('[data-ui-name="MonthRangePicker.Calendar"]').first(),
        ).toBeFocused();

        await pressTab(2); // period button
        await expect(buttons.first()).toBeFocused();

        await pressTab(4); // Apply
        await expect(await locators.button(page, 'Apply')).toBeFocused();

        await pressTab(1); // Reset
        await expect(locators.button(page, 'Reset')).toBeFocused();
      });

      await test.step('Select range using arrow keys and keyboard', async () => {
        await page.keyboard.press('Tab'); // Back to grid

        const [initialLeft, initialRight] = await Promise.all([
          input.nth(0).inputValue(),
          input.nth(1).inputValue(),
        ]);

        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Escape');
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

        await page.keyboard.press('Space');
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Space');
        await page.waitForTimeout(100);
        const [start, middle] = await Promise.all([
          input.nth(0).inputValue(),
          input.nth(1).inputValue(),
        ]);

        if (browserName !== 'webkit') {
          // works unstable on webkit in non debug mode
          expect(start).not.toBe(initialLeft);
          expect(middle).toBe(initialRight);
        }
        await page.keyboard.press('Space');
        await page.waitForTimeout(100);

        const [confirmedStart, confirmedEnd] = await Promise.all([
          input.nth(0).inputValue(),
          input.nth(1).inputValue(),
        ]);
        if (browserName !== 'webkit') {
          // wprks unstable on webkit in non debug mode
          expect(confirmedStart).toBe(start);
          expect(confirmedEnd).not.toBe(middle);
        }
        await page.keyboard.press('Escape');
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

        const [resetStart, resetEnd] = await Promise.all([
          input.nth(0).inputValue(),
          input.nth(1).inputValue(),
        ]);

        expect(resetStart).toBe(initialLeft);
        expect(resetEnd).toBe(initialRight);
      });

      await test.step('Apply range via keyboard interaction', async () => {
        await page.keyboard.press('Space');
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Space');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Space');

        await pressTab(6);
        await expect(locators.button(page, 'Apply')).toBeFocused();

        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

        const [left, right] = await Promise.all([
          input.nth(0).inputValue(),
          input.nth(1).inputValue(),
        ]);

        expect(left).not.toBe('');
        expect(right).not.toBe('');
      });

      await test.step('Reset range using keyboard', async () => {
        await page.keyboard.press('Space');
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
        await expect(locators.popper(page)).toBeFocused();

        await pressTab(9); // Focus Reset
        await expect(locators.button(page, 'Reset')).toBeFocused();

        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

        const [left, right] = await Promise.all([
          input.nth(0).inputValue(),
          input.nth(1).inputValue(),
        ]);

        expect(left).toBe('');
        expect(right).toBe('');
      });
    });
  });
});
