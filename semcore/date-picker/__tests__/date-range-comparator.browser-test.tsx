import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import {
  formatAriaLabelToInputValue,
  checkStyle,
  getCalendarCellDefaultStyles,
  getPrimaryButtonStyles,
} from './utils';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },

  option: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('option', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },

  dateRangeComparatorTrigger: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="DateRangeComparator.Trigger"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  calendar: (page: Page) => page.locator('[data-ui-name="DateRangeComparator.Calendar"]'),
  weekDaysRow: (page: Page) => page.locator('[data-ui-name="CalendarWeekDays"]'),
  divider: (page: Page) => page.locator('[data-ui-name="Divider"]'),
  cells: (page: Page, index?: number) => {
    const base = page.getByRole('gridcell');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dateRangeHeader: (page: Page) => page.locator('[data-ui-name="DateRangeComparator.Header"]'),

  popper: (page: Page) => page.getByRole('dialog'),
  title: (page: Page) => page.locator('[data-ui-name="DateRangeComparator.Title"]'),
  period: (page: Page) => page.locator('[data-ui-name="DateRangeComparator.Periods.Options"]'),

  inputValues: (page: Page) => page.locator('input[data-ui-name="DateRangeComparator.ValueDateRange"]'),
  compareValues: (page: Page) => page.locator(
    'input[data-ui-name="DateRangeComparator.CompareDateRange"]'),

};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('DateRangeComparator range', () => {
    test('Verify date range comparator styles', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');

      const selectedCell = page.locator('[data-ui-name="CalendarDays.Unit"][class*="Selected"]');
      const defaultCellStyles = await getCalendarCellDefaultStyles(page);
      const primaryButtonStyles = await getPrimaryButtonStyles(page);

      await locators.dateRangeComparatorTrigger(page, 0).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });

      await test.step('Verify header margins and calendar paddings', async () => {
        await checkStyle(locators.dateRangeHeader(page), { padding: '16px' });
        const indicators = page.locator('[data-ui-name="DateRange.Indicator"]');
        const count = await indicators.count();
        for (let i = 0; i < count; i++) {
          const calendar = indicators.nth(i);
          await expect(calendar).toHaveAttribute('width', '16');
          await expect(calendar).toHaveAttribute('height', '16');
          await checkStyle(calendar, {
            paddingLeft: '12px',
            paddingRight: '6px',
          });
        }
      });

      await test.step('Verify style of available date', async () => {
        await checkStyle(locators.cells(page, 2), {
          ...defaultCellStyles,
          margin: '4px 0px 0px',
        });
      });

      await test.step('Select dates', async () => {
        await locators.cells(page, 10).click();
        await locators.cells(page, 1).click();
        await locators.button(page, 'Apply').click();
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        await locators.dateRangeComparatorTrigger(page, 0).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      });

      await test.step('Verify style of selected date', async () => {
        await checkStyle(selectedCell.nth(0), {
          margin: '4px 0px 0px',
          width: '32px',
          height: '32px',
        });
      });

      await test.step('Verify style for Apply picker button', async () => {
        await checkStyle(locators.button(page, 'Apply'), primaryButtonStyles);
      });
    });
  });

  test.describe('Date Range comparator with advanced use', () => {
    test('Verify mouse intearctions and styles of advanced use', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker'],
    }, async ({ page }) => {
      await page.clock.setFixedTime(new Date('2024-01-15T12:00:00'));
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator_advanced_use.tsx', 'en');

      const from = page.locator('[data-ui-name="DateRangeComparator.ValueDateRange"]').first();
      const to = page.locator('[data-ui-name="DateRangeComparator.CompareDateRange"]').first();
      const toggle = page.locator('[data-ui-name="DateRangeComparator.CompareToggle"]');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });

      await from.click();
      await locators.inputValues(page).first().fill('05052023');
      await locators.inputValues(page).nth(1).fill('05202023');

      await toggle.click();
      await to.click();
      await locators.compareValues(page).first().fill('05012023');
      await locators.compareValues(page).nth(1).fill('05182023');

      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });

      await locators.dateRangeComparatorTrigger(page, 0).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Date range comparator props', () => {
    test('Verify all date range comparator props work', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/date-range-comparator-props.tsx', 'en');
      // if (browserName === 'webkit') test.skip(); // skipped for webkit because of unstable focus outline on the dialog

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });

      await page.keyboard.press('Escape');
      await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await locators.cells(page, 20).hover();
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
  test.describe('DateRangeComparator range', () => {
    test('Verify roles and attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');

      const triggerAttributes = [
        { name: 'tabindex', value: '0' },
        { name: 'aria-haspopup', value: 'dialog' },
        { name: 'role', value: 'button' },
        { name: 'type', value: 'button' },
      ];

      await test.step('Verify trigger attributes', async () => {
        for (const { name, value } of triggerAttributes) {
          await expect(locators.dateRangeComparatorTrigger(page, 0)).toHaveAttribute(name, value);
        }
      });

      await test.step('Verify trigger svg attributes', async () => {
        const svg = locators.dateRangeComparatorTrigger(page, 0).locator('svg');
        const svgAttributes = [
          { name: 'aria-hidden', value: 'true' },
          { name: 'width', value: '16' },
          { name: 'height', value: '16' },
        ];
        for (const { name, value } of svgAttributes) {
          await expect(svg).toHaveAttribute(name, value);
        }
      });

      locators.dateRangeComparatorTrigger(page, 0).click();
      const popperAttributes = [
        { name: 'tabindex', value: '0' },
        { name: 'data-popper-placement', value: 'bottom-start' },
      ];

      await test.step('Verify popper attributes', async () => {
        for (const { name, value } of popperAttributes) {
          await expect(locators.popper(page)).toHaveAttribute(name, value);
        }
      });

      await test.step('Verify popper inputs attributes', async () => {
        const inputAttributes = [
          {
            selector: '[data-ui-name="DateRangeComparator.ValueDateRange"]',
            ariaLabel: 'Date field',
          },
          {
            selector: '[data-ui-name="DateRangeComparator.CompareDateRange"]',
            ariaLabel: 'Date field',
            disabled: '',
          },
        ];

        for (const { selector, ariaLabel, disabled } of inputAttributes) {
          const input = page.locator(selector);
          await expect(input.first()).toHaveAttribute('aria-label', ariaLabel);
          if (disabled) await expect(input.first()).toHaveAttribute('disabled', disabled);
        }

        const checkboxAttributes = [
          {
            selector: '[data-ui-name="Checkbox.Value"]',
            attributes: [
              { name: 'type', value: 'checkbox' },
              { name: 'aria-invalid', value: 'false' },
            ],
          },
        ];

        for (const { selector, attributes } of checkboxAttributes) {
          const checkbox = page.locator(selector);
          for (const { name, value } of attributes) {
            await expect(checkbox).toHaveAttribute(name, value);
          }
        }

        const inputAttributesCommon = [
          { name: 'type', value: 'text' },
          { name: 'inputmode', value: 'numeric' },
          { name: 'aria-invalid', value: 'false' },
        ];

        const inputs = [locators.inputValues(page), locators.compareValues(page)];

        for (const locator of inputs) {
          const count = await locator.count();
          for (let i = 0; i < count; i++) {
            const input = locator.nth(i);
            for (const { name, value } of inputAttributesCommon) {
              await expect(input).toHaveAttribute(name, value);
            }
          }
        }
      });

      await test.step('Verify calendar header attributes', async () => {
        await expect(locators.title(page).first()).toHaveAttribute('aria-live', 'polite');
        await expect(locators.title(page).nth(1)).toHaveAttribute('aria-live', 'polite');
      });

      await test.step('Verify calendar attributes', async () => {
        const calendarAttributes = [
          { name: 'role', value: 'grid' },
          { name: 'disabled', value: '' },
        ];

        for (let i = 0; i < (await locators.calendar(page).count()); i++) {
          const calendar = locators.calendar(page).nth(i);
          for (const { name, value } of calendarAttributes) {
            await expect(calendar).toHaveAttribute(name, value);
          }

          const weekDays = calendar.locator('[data-ui-name="CalendarWeekDays.Unit"]');
          const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ];

          for (let i = 0; i < daysOfWeek.length; i++) {
            const day = weekDays.nth(i);
            await expect(day).toHaveAttribute('role', 'columnheader');
            await expect(day).toHaveAttribute('aria-label', daysOfWeek[i]);
            const dayText = await day.textContent();
            await expect(dayText).toBe(daysOfWeek[i].slice(0, 3));
          }

          await expect(calendar).toHaveAttribute('tabindex', i === 0 ? '0' : '-1');
        }
      });

      await test.step('Verify days attributes', async () => {
        const cells = page.locator('[data-ui-name="CalendarDays.Unit"]');
        const cellCount = await cells.count();

        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
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

      await test.step('Verify Period attributes', async () => {
        await expect(locators.period(page)).toHaveAttribute('role', 'listbox');
        await expect(locators.period(page)).toHaveAttribute('aria-label', 'Presets');
      });
    });

    test('Verify Date comparator range mouse interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');

      const toggle = page.locator('[data-ui-name="DateRangeComparator.CompareToggle"]');

      let initialTitle1: string | null = '';
      let initialTitle2: string | null = '';
      let expectedInputValue = '';
      let expectedInputValue22 = '';
      let expectedInputValue50 = '';
      let expectedInputValue55 = '';

      await test.step('Open and close calendar', async () => {
        await locators.dateRangeComparatorTrigger(page, 0).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        await locators.dateRangeComparatorTrigger(page, 0).click();
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
        ;
        await locators.dateRangeComparatorTrigger(page, 0).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      });

      await test.step('Navigate months using header buttons', async () => {
        initialTitle1 = await locators.title(page).first().textContent();
        initialTitle2 = await locators.title(page).nth(1).textContent();

        await locators.button(page, 'Previous month').click();
        await expect(locators.title(page).first()).not.toHaveText(initialTitle1!);
        await expect(locators.title(page).nth(1)).not.toHaveText(initialTitle2!);

        await locators.button(page, 'Next month').click();
        await expect(locators.title(page).first()).toHaveText(initialTitle1!);
        await expect(locators.title(page).nth(1)).toHaveText(initialTitle2!);
      });

      await test.step('Select first date in from input', async () => {
        await locators.cells(page, 10).click();
        await page.waitForTimeout(50);
        const inputValue_1 = await locators.inputValues(page).nth(0).inputValue();
        const inputValue_2 = await locators.inputValues(page).nth(1).inputValue();
        const calendarAriaLabel = await locators.cells(page, 10).getAttribute('aria-label');

        expectedInputValue = formatAriaLabelToInputValue(calendarAriaLabel);

        await expect(inputValue_1).toBe(expectedInputValue);
        await expect(inputValue_2).toBe('');
      });

      await test.step('Select second date in from input', async () => {
        await locators.cells(page, 15).click();
        await page.waitForTimeout(50);
        const inputValue_2 = await locators.inputValues(page).nth(1).inputValue();
        const calendarAriaLabel22 = await locators.cells(page, 15).getAttribute('aria-label');

        expectedInputValue22 = formatAriaLabelToInputValue(calendarAriaLabel22);
        await expect(inputValue_2).toBe(expectedInputValue22);
      });

      await test.step('Reset from input values by clicking same cell', async () => {
        await locators.cells(page, 15).click();
        await page.waitForTimeout(100);

        const inputValue1 = await locators.inputValues(page).nth(0).inputValue();
        const inputValue2 = await locators.inputValues(page).nth(1).inputValue();

        await expect(inputValue1).toBe(expectedInputValue22);
        await expect(inputValue2).toBe('');
      });

      await test.step('Confirm both from inputs set to same date', async () => {
        await locators.cells(page, 15).click();

        const inputValue1 = await locators.inputValues(page).nth(0).inputValue();
        const inputValue2 = await locators.inputValues(page).nth(1).inputValue();

        await expect(inputValue1).toBe(expectedInputValue22);
        await expect(inputValue2).toBe(expectedInputValue22);
      });

      await test.step('Switch to "compare" mode', async () => {
        await toggle.click();
      });

      await test.step('Select first date in to input', async () => {
        await locators.cells(page, 50).click();
        await page.waitForTimeout(50);
        const inputValue1 = await locators.compareValues(page).nth(0).inputValue();
        const inputValue2 = await locators.compareValues(page).nth(1).inputValue();
        const calendarAriaLabel50 = await locators.cells(page, 50).getAttribute('aria-label');

        expectedInputValue50 = formatAriaLabelToInputValue(calendarAriaLabel50);

        await expect(inputValue1).toBe(expectedInputValue50);
        await expect(inputValue2).toBe('');
      });

      await test.step('Select second date in to input', async () => {
        await locators.cells(page, 55).click();
        await page.waitForTimeout(50);
        const inputValue1 = await locators.compareValues(page).nth(0).inputValue();
        const inputValue2 = await locators.compareValues(page).nth(1).inputValue();
        const calendarAriaLabel55 = await locators.cells(page, 55).getAttribute('aria-label');

        expectedInputValue55 = formatAriaLabelToInputValue(calendarAriaLabel55);

        await expect(inputValue1).toBe(expectedInputValue50);
        await expect(inputValue2).toBe(expectedInputValue55);
      });

      await test.step('Apply selection and close calendar', async () => {
        await locators.button(page, 'Apply').click();
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').first()).not.toHaveText(
          'Select date ranges',
        );
      });

      await test.step('Reset selections', async () => {
        locators.dateRangeComparatorTrigger(page, 0).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        await locators.button(page, 'Reset').click();
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').first()).toHaveText(
          'Select date ranges',
        );
      });

      await test.step('Open calendar and close with Sange selection', async () => {
        locators.dateRangeComparatorTrigger(page, 0).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        await locators.option(page, 'Last 3 months').click();
        await locators.button(page, 'Apply').click();
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').first()).not.toHaveText(
          'Select date ranges',
        );
      });
    });

    test('Verify Date range comparator keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');

      const getInputValues = async (locator: any) => ({
        from: await locator.nth(0).inputValue(),
        to: await locator.nth(1).inputValue(),
      });

      // if (browserName === 'webkit') return;

      await test.step('Open and close calendar using keyboard', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        await page.keyboard.press('Tab');
        await page.keyboard.type('04042024');
        await page.keyboard.type('04042024');

        for (let i = 0; i < 9; i++) await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
        await expect(locators.dateRangeComparatorTrigger(page, 0)).toBeFocused();

        await page.keyboard.press('Enter');
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        await expect(locators.dateRangeComparatorTrigger(page, 0)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('Escape');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        await page.keyboard.press('Space');
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      });

      await test.step('Navigate months backwards and forwards', async () => {
        const initial = {
          from: await locators.title(page).first().textContent(),
          to: await locators.title(page).nth(1).textContent(),
        };

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();
        await page.keyboard.press('Enter');

        const changed = {
          from: await locators.title(page).first().textContent(),
          to: await locators.title(page).nth(1).textContent(),
        };

        expect(changed.from).not.toBe(initial.from);
        expect(changed.to).not.toBe(initial.to);

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();
        await page.keyboard.press('Enter');

        const reverted = {
          from: await locators.title(page).first().textContent(),
          to: await locators.title(page).nth(1).textContent(),
        };

        expect(reverted.from).toBe(initial.from);
        expect(reverted.to).toBe(initial.to);
      });

      await test.step('Select From dates with keyboard', async () => {
        const initial = await getInputValues(locators.inputValues(page));

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');

        const unchanged = await getInputValues(locators.inputValues(page));
        expect(unchanged).toEqual(initial);

        await page.keyboard.press('Space');
        await page.waitForTimeout(50);

        const changed = await getInputValues(locators.inputValues(page));
        expect(changed.from).not.toBe(initial.from);
        expect(changed.to).not.toBe(initial.to);

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Space');

        const final = await getInputValues(locators.inputValues(page));
        expect(final.from).toBe(changed.from);
        expect(final.to).not.toBe(initial.to);
      });

      await test.step('Switch to Compare mode and select To dates', async () => {
        for (let i = 0; i < 3; i++) await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Space');
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        const initial = await getInputValues(locators.compareValues(page));
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Space');

        const mid = await getInputValues(locators.compareValues(page));
        expect(mid.from).not.toBe(initial.from);
        expect(mid.to).toBe(initial.to);

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Space');

        const final = await getInputValues(locators.compareValues(page));
        expect(final.from).toBe(mid.from);
        expect(final.to).not.toBe(mid.to);
      });

      await test.step('Apply and reset selected dates', async () => {
        for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Apply')).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        await page.keyboard.press('Enter');
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });
        for (let i = 0; i < 14; i++) await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Reset')).toBeFocused();
        await page.keyboard.press('Space');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').first()).toHaveText(
          'Select date ranges',
        );
      });
    });
  });
});
