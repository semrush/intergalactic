import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { checkStyle, getCalendarCellDefaultStyles, getPrimaryButtonStyles } from './utils';

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
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const year = parsedDate.getFullYear().toString();

  return `${month}/${year}`;
}

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },

  monthRangeComparatorPickerTrigger: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="MonthDateRangeComparator.Trigger"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  calendar: (page: Page) => page.locator('[data-ui-name="MonthDateRangeComparator.Calendar"]'),
  weekDaysRow: (page: Page) => page.locator('[data-ui-name="CalendarWeekDays"]'),
  divider: (page: Page) => page.locator('[data-ui-name="Divider"]'),
  cells: (page: Page, index?: number) => {
    const base = page.getByRole('gridcell');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dateRangeHeader: (page: Page) => page.locator('[data-ui-name="MonthDateRangeComparator.Header"]'),
  inputValue: (page: Page) => page.locator('[data-ui-name="MonthDateRangeComparator.ValueDateRange"]'),
  compareValue: (page: Page) => page.locator(
    '[data-ui-name="MonthDateRangeComparator.CompareDateRange"]'),
  popper: (page: Page) => page.getByRole('dialog'),
  title: (page: Page) => page.locator('[data-ui-name="MonthDateRangeComparator.Title"]'),
  period: (page: Page) => page.locator('[data-ui-name="MonthDateRangeComparator.Periods.Options"]'),
  periodButtons: (page: Page) => page.getByRole('option'),

};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('MonthRangeComparator range', () => {
    test('Verify month range comparator styles', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');
      const defaultCellStyles = await getCalendarCellDefaultStyles(page);
      const primaryButtonStyles = await getPrimaryButtonStyles(page);

      await locators.monthRangeComparatorPickerTrigger(page).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      await test.step('Verify header and calendar styles', async () => {
        await checkStyle(locators.dateRangeHeader(page), { padding: '16px' });

        const indicstors = page.locator('[data-ui-name="DateRange.Indicator"]');
        const count = await indicstors.count();
        for (let i = 0; i < count; i++) {
          const calendar = indicstors.nth(i);
          await expect(calendar).toHaveAttribute('width', '16');
          await expect(calendar).toHaveAttribute('height', '16');
          await checkStyle(calendar, {
            paddingLeft: '12px',
            paddingRight: '6px',
          });
        }
      });

      await test.step('Verify style of available date', async () => {
        const cell = locators.cells(page, 2);
        await checkStyle(cell, {
          ...defaultCellStyles,
          margin: '4px 0px 0px',
        });
      });

      await locators.cells(page, 10).click();
      await locators.cells(page, 11).click();
      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

      await locators.monthRangeComparatorPickerTrigger(page).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      await test.step('Verify style of selected date', async () => {
        const selectedCell = page
          .locator('[data-ui-name="CalendarMonths.Unit"][class*="Selected"]')
          .nth(0);
        await checkStyle(selectedCell, {
          margin: '4px 0px 0px',
          width: '60px',
          height: '32px',
        });
      });

      await test.step('Verify style for Apply picker button', async () => {
        await checkStyle(locators.button(page, 'Apply'), primaryButtonStyles);
      });
    });
    test('Month range comparator filled state', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');

      const toggle = page.locator('[data-ui-name="MonthDateRangeComparator.CompareToggle"]');

      await locators.monthRangeComparatorPickerTrigger(page).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
      await locators.inputValue(page).nth(2).fill('05.2022');
      await locators.inputValue(page).nth(3).fill('08.2022');
      await toggle.click();
      await locators.compareValue(page).nth(2).fill('06.2022');
      await locators.compareValue(page).nth(3).fill('10.2022');
      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();

      await locators.monthRangeComparatorPickerTrigger(page).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });
  test.describe('Month Range comparator with advanced use', () => {
    test('Verify mouse intearctions and styles of advanced use', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/month_range_comparator_advanced_use.tsx', 'en');

      const from = page.locator('[data-ui-name="MonthDateRangeComparator.ValueDateRange"]').first();
      const to = page.locator('[data-ui-name="MonthDateRangeComparator.CompareDateRange"]').first();
      const toggle = page.locator('[data-ui-name="MonthDateRangeComparator.CompareToggle"]');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      await from.click();
      await locators.inputValue(page).nth(2).fill('052022');
      await locators.inputValue(page).nth(3).fill('072022');

      await toggle.click();
      await to.click();
      await locators.compareValue(page).nth(2).fill('012023');
      await locators.compareValue(page).nth(3).fill('082023');

      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

      await locators.monthRangeComparatorPickerTrigger(page).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('MonthRangeComparator range', () => {
    test('Verify roles and attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');

      await test.step('Verify trigger attributes', async () => {
        await expect(locators.monthRangeComparatorPickerTrigger(page)).toHaveAttribute('tabindex', '0');
        await expect(locators.monthRangeComparatorPickerTrigger(page)).toHaveAttribute('aria-haspopup', 'dialog');
        await expect(locators.monthRangeComparatorPickerTrigger(page)).toHaveAttribute('role', 'button');
        await expect(locators.monthRangeComparatorPickerTrigger(page)).toHaveAttribute('type', 'button');
      });

      await test.step('Verify trigger svg attributes', async () => {
        const svg = locators.monthRangeComparatorPickerTrigger(page).locator('svg');
        await expect(svg).toHaveAttribute('aria-hidden', 'true');
        await expect(svg).toHaveAttribute('width', '16');
        await expect(svg).toHaveAttribute('height', '16');
      });

      // Trigger click to open the popper
      locators.monthRangeComparatorPickerTrigger(page).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      await test.step('Verify popper attributes', async () => {
        await expect(locators.popper(page)).toHaveAttribute('tabindex', '0');
        await expect(locators.popper(page)).toHaveAttribute('data-popper-placement', 'bottom-start');
      });

      await test.step('Verify popper input attributes', async () => {
        await expect(locators.inputValue(page).first()).toHaveAttribute('aria-label', 'Date field');

        await expect(locators.compareValue(page).first()).toHaveAttribute('aria-label', 'Date field');
        await expect(locators.compareValue(page).first()).toHaveAttribute('disabled', '');

        const checkbox = page.locator('[data-ui-name="Checkbox.Value"]');
        await expect(checkbox).toHaveAttribute('type', 'checkbox');
        await expect(checkbox).toHaveAttribute('aria-invalid', 'false');

        const count = await page.getByRole('textbox').count();

        for (let i = 0; i < count; i++) {
          const input = page.getByRole('textbox').nth(i);
          await expect(input).toHaveAttribute('type', 'text');
          await expect(input).toHaveAttribute('inputmode', 'numeric');
          await expect(input).toHaveAttribute('aria-invalid', 'false');
        }
      });

      await test.step('Verify calendar attributes', async () => {
        const count = await locators.calendar(page).count();

        for (let i = 0; i < count; i++) {
          const calendar = locators.calendar(page).nth(i);
          await expect(calendar).toHaveAttribute('role', 'grid');
          await expect(calendar).toHaveAttribute('disabled', '');
        }
      });

      await test.step('Verify days attributes', async () => {
        const cells = page.locator('[data-ui-name="CalendarMonths.Unit"]');
        const cellCount = await cells.count();

        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);

          // Skip empty cells without aria-label
          const ariaLabel = await cell.getAttribute('aria-label');
          if (!ariaLabel) continue;

          await expect(cell).toHaveAttribute('role', 'gridcell');
          await expect(cell).toHaveAttribute('aria-colindex');
          await expect(cell).toHaveAttribute('aria-rowindex');

          const date = new Date(ariaLabel);
          const month = date.getMonth();
          const isCurrentMonth = month === 5;

          const hasDisabledAttr = (await cell.getAttribute('disabled')) !== null;
          const ariaDisabled = await cell.getAttribute('aria-disabled');

          if (isCurrentMonth) {
            expect(hasDisabledAttr).toBe(false);
            expect(ariaDisabled).toBe('false');
          }

          const text = await cell.textContent();
          expect(text?.trim()).not.toBe('');
        }
      });

      const period = page.locator('[data-ui-name="MonthDateRangeComparator.Periods.Options"]');

      await test.step('Verify Period attributes', async () => {
        await expect(period).toHaveAttribute('role', 'listbox');
        await expect(period).toHaveAttribute('aria-label', 'Presets');
      });
    });

    test('Month range comparator mouse interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');

      const buttons = page.locator('[data-ui-name="Button"]');
      const toggle = page.locator('[data-ui-name="MonthDateRangeComparator.CompareToggle"]');

      await locators.monthRangeComparatorPickerTrigger(page).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      const initialTitle1 = await locators.title(page).first().textContent();
      const initialTitle2 = await locators.title(page).nth(1).textContent();

      await locators.button(page, 'Previous year').click();

      await expect(locators.title(page).first()).not.toHaveText(initialTitle1!);
      await expect(locators.title(page).nth(1)).not.toHaveText(initialTitle2!);

      await locators.button(page, 'Next year').click();
      await expect(locators.title(page).first()).toHaveText(initialTitle1!);
      await expect(locators.title(page).nth(1)).toHaveText(initialTitle2!);

      await locators.cells(page, 10).click();
      const inputValue_1 = await locators.inputValue(page).nth(2).inputValue();
      const inputValue_2 = await locators.inputValue(page).nth(3).inputValue();
      const calendarAriaLabel = await locators.cells(page, 10).getAttribute('aria-label');
      const expectedInputValue = formatAriaLabelToInputValue(calendarAriaLabel);

      await expect(inputValue_1).toBe(expectedInputValue);
      await expect(inputValue_2).toBe('');

      await locators.cells(page, 15).click();
      const inputValue_22 = await locators.inputValue(page).nth(3).inputValue();

      const calendarAriaLabel22 = await locators.cells(page, 15).getAttribute('aria-label');
      const expectedInputValue22 = formatAriaLabelToInputValue(calendarAriaLabel22);
      await expect(inputValue_22).toBe(expectedInputValue22);

      await locators.cells(page, 15).click();
      await page.waitForTimeout(300);
      const inputValue15_1 = await locators.inputValue(page).nth(2).inputValue();
      const inputValue15_2 = await locators.inputValue(page).nth(3).inputValue();

      await expect(inputValue15_1).toBe(expectedInputValue22);
      await expect(inputValue15_2).toBe('');

      await locators.cells(page, 15).click();
      const inputValue_15_3 = await locators.inputValue(page).nth(2).inputValue();
      const inputValue15_3 = await locators.inputValue(page).nth(3).inputValue();
      await expect(inputValue_15_3).toBe(expectedInputValue22);
      await expect(inputValue15_3).toBe(expectedInputValue22);

      await toggle.click();

      await locators.cells(page, 5).click();
      const inputValueTo_1 = await locators.compareValue(page).nth(2).inputValue();
      const inputValueTo_2 = await locators.compareValue(page).nth(3).inputValue();

      const calendarAriaLabel_1 = await locators.cells(page, 5).getAttribute('aria-label');
      const expectedInputValue50 = formatAriaLabelToInputValue(calendarAriaLabel_1);

      await expect(inputValueTo_1).toBe(expectedInputValue50);
      await expect(inputValueTo_2).toBe('');

      await locators.cells(page, 8).click();

      const inputValueTo_11 = await locators.compareValue(page).nth(2).inputValue();
      const inputValueTo_21 = await locators.compareValue(page).nth(3).inputValue();

      const calendarAriaLabel_2 = await locators.cells(page, 8).getAttribute('aria-label');
      const expectedInputValue55 = formatAriaLabelToInputValue(calendarAriaLabel_2);

      await expect(inputValueTo_11).toBe(expectedInputValue50);
      await expect(inputValueTo_21).toBe(expectedInputValue55);

      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).not.toHaveText(
        'Select date ranges',
      );

      await locators.monthRangeComparatorPickerTrigger(page).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
      await locators.button(page, 'Reset').click();
      await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).toHaveText(
        'Select date ranges',
      );

      await locators.monthRangeComparatorPickerTrigger(page).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
      await buttons.nth(1).click();
      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).not.toHaveText(
        'Select date ranges',
      );
    });

    test('Month range comparator keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');
      const buttons = page.locator('[data-ui-name="Button"]');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.monthRangeComparatorPickerTrigger(page)).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      await expect(locators.monthRangeComparatorPickerTrigger(page)).not.toBeFocused();
      await expect(locators.popper(page)).toBeFocused();

      await page.keyboard.press('Escape');
      await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      await expect(locators.monthRangeComparatorPickerTrigger(page)).toBeFocused();

      await page.keyboard.press('Space');
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
      await expect(locators.popper(page)).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.getByLabel('To Date field').first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="Checkbox.Value"]')).toBeFocused();

      const [initialTitleFrom, initialTitleTo] = await Promise.all([
        locators.title(page).first().textContent(),
        locators.title(page).nth(1).textContent(),
      ]);

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Previous year')).toBeFocused();
      await page.keyboard.press('Enter');

      const [titleAfterFirstEnterFrom, titleAfterFirstEnterTo] = await Promise.all([
        locators.title(page).first().textContent(),
        locators.title(page).nth(1).textContent(),
      ]);

      expect(titleAfterFirstEnterFrom).not.toBe(initialTitleFrom);
      expect(titleAfterFirstEnterTo).not.toBe(initialTitleTo);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Next year')).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Next year')).toBeFocused();
      await page.keyboard.press('Space');

      const [titleAfterSecondEnterFrom, titleAfterSecondEnterTo] = await Promise.all([
        locators.title(page).first().textContent(),
        locators.title(page).nth(1).textContent(),
      ]);
      expect(titleAfterSecondEnterFrom).toBe(initialTitleFrom);
      expect(titleAfterSecondEnterTo).toBe(initialTitleTo);

      await page.keyboard.press('Shift+Tab');
      await expect(
        page.locator('[data-ui-name="MonthDateRangeComparator.Calendar"]').first(),
      ).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Next year')).toBeFocused();

      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      await expect(buttons.first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(buttons.nth(1)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(buttons.nth(2)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(buttons.nth(3)).toBeFocused();

      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      await expect(locators.button(page, 'Apply')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Reset')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.popper(page)).toBeFocused();

      const [initialFrom1, initialFrom2] = await Promise.all([
        locators.inputValue(page).nth(2).inputValue(),
        locators.inputValue(page).nth(3).inputValue(),
      ]);

      await page.keyboard.press('ArrowLeft');

      const [afterLeftFrom1, afterLeftFrom2] = await Promise.all([
        locators.inputValue(page).nth(2).inputValue(),
        locators.inputValue(page).nth(3).inputValue(),
      ]);

      expect(afterLeftFrom1).toBe(initialFrom1);
      expect(afterLeftFrom2).toBe(initialFrom2);

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Space');
      await page.waitForTimeout(50);

      const [afterUpFrom1, afterUpFrom2] = await Promise.all([
        locators.inputValue(page).nth(2).inputValue(),
        locators.inputValue(page).nth(3).inputValue(),
      ]);

      expect(afterUpFrom1).not.toBe(afterLeftFrom1);
      expect(afterUpFrom2).toBe(afterLeftFrom2);

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);

      const [afterRightFrom1, afterRightFrom2] = await Promise.all([
        locators.inputValue(page).nth(2).inputValue(),
        locators.inputValue(page).nth(3).inputValue(),
      ]);

      expect(afterRightFrom1).toBe(afterUpFrom1);
      expect(afterRightFrom2).not.toBe(afterUpFrom2);

      await page.keyboard.press('Shift+Tab');
      if ((await locators.calendar(page).first().evaluate((el) => el === document.activeElement))) {
        await page.keyboard.press('Tab');
      }
      await expect(locators.button(page, 'Next year')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      if (!(await locators.button(page, 'Previous year').evaluate((el) => el === document.activeElement))) {
        await page.keyboard.press('Shift+Tab');
      }
      await expect(locators.button(page, 'Previous year')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(page.locator('[data-ui-name="Checkbox.Value"]')).toBeFocused();

      await page.keyboard.press('Space');
      await page.waitForTimeout(100);

      await page.keyboard.press('Tab');
      const compareDateRange = page.locator('[data-ui-name="MonthDateRangeComparator.CompareDateRange"]').nth(2);
      if (!(await compareDateRange.evaluate((el) => el === document.activeElement))) {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
      }
      await expect(compareDateRange).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Previous year')).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowLeft');

      const [initialTo1, initialTo2] = await Promise.all([
        locators.compareValue(page).nth(2).inputValue(),
        locators.compareValue(page).nth(3).inputValue(),
      ]);

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Space');

      const [afterUpTo1, afterUpTo2] = await Promise.all([
        locators.compareValue(page).nth(2).inputValue(),
        locators.compareValue(page).nth(3).inputValue(),
      ]);

      expect(afterUpTo1).not.toBe(initialTo1);
      expect(afterUpTo2).toBe(initialTo2);

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Space');
      await page.waitForTimeout(50);

      const [afterRightTo1, afterRightTo2] = await Promise.all([
        locators.compareValue(page).nth(2).inputValue(),
        locators.compareValue(page).nth(3).inputValue(),
      ]);

      expect(afterRightTo1).toBe(afterUpTo1);
      expect(afterRightTo2).not.toBe(afterUpTo2);

      const [finalFrom1, finalFrom2] = await Promise.all([
        locators.inputValue(page).nth(2).inputValue(),
        locators.inputValue(page).nth(3).inputValue(),
      ]);

      expect(finalFrom1).toBe(afterRightFrom1);
      expect(finalFrom2).toBe(afterRightFrom2);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(locators.button(page, 'Apply')).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).not.toHaveText(
        'Select date ranges',
      );

      await page.keyboard.press('Enter');
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      for (let i = 0; i < 14; i++) await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Reset')).toBeFocused();

      await page.keyboard.press('Space');
      await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).toHaveText(
        'Select date ranges',
      );
    });
  });
});
