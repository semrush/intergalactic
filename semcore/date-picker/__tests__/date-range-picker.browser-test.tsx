import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { formatAriaLabelToInputValue, checkStyle } from './utils';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  option: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('option', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dateRangePickerTrigger: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="DateRangePicker.Trigger"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  calendar: (page: Page) => page.locator('[data-ui-name="DateRangePicker.Calendar"]'),
  weekDaysRow: (page: Page) => page.locator('[data-ui-name="CalendarWeekDays"]'),
  divider: (page: Page) => page.locator('[data-ui-name="Divider"]'),
  cells: (page: Page, index?: number) => {
    const base = page.getByRole('gridcell');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dateRangeHeader: (page: Page) => page.locator('[data-ui-name="DateRangePicker.Header"]'),

  popper: (page: Page) => page.getByRole('dialog'),
  title: (page: Page) => page.locator('[data-ui-name="DateRangePicker.Title"]'),
  period: (page: Page) => page.locator('[data-ui-name="DateRangePicker.Period"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Date Range Trigger', () => {
    test('Verify trigger states when entering sate manually', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/datepicker.tsx', 'en');

      const screenshotsClip = (await locators.dateRangePickerTrigger(page, 0).boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.type('052020');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      await page.keyboard.type('2005292020');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      for (let i = 0; i < 5; i++) await page.keyboard.press('Backspace');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    test('Verify trigger states and props', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/day-range-trigger.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });
  test.describe('Date range with standart ranges', () => {
    test('Verify date range picker styles', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx', 'en');

      await test.step('Verify trigger margins', async () => {
        await checkStyle(locators.dateRangePickerTrigger(page, 4), { marginTop: '8px' });
      });

      await test.step('Verify svg dimensions', async () => {
        const svg = locators.dateRangePickerTrigger(page, 4).locator('svg');
        await checkStyle(svg, { paddingLeft: '8px', paddingRight: '8px' });
        await expect(svg).toHaveAttribute('width', '16');
        await expect(svg).toHaveAttribute('height', '16');
      });

      await test.step('Verify trigger separator padding', async () => {
        const separator = page.locator('[data-ui-name="DateRange.RangeSep"]').nth(1);
        await checkStyle(separator, { paddingRight: '8px' });
      });

      await test.step('Enter dates and open popper', async () => {
        await page.locator('input[data-ui-name="DateRangePicker.Trigger"]').nth(2).fill('05.04.2025');
        await page.locator('input[data-ui-name="DateRangePicker.Trigger"]').nth(3).fill('05.05.2025');
        await locators.dateRangePickerTrigger(page, 4).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      });

      const dateStyles = [
        {
          locator: locators.cells(page, 0),
          expectedStyles: {
            color: 'rgb(25, 27, 35)',
            backgroundColor: 'rgb(255, 255, 255)',
            margin: '4px 0px 0px',
          },
        },
        {
          locator: locators.cells(page, 10),
          expectedStyles: {
            color: 'rgb(25, 27, 35)',
            backgroundColor: 'rgb(255, 255, 255)',
            margin: '4px 0px 0px',
          },
        },
      ];

      for (const { locator, expectedStyles } of dateStyles) {
        await test.step(`Verify style of ${locator === locators.cells(page, 0) ? 'disabled' : 'available'
        } date`, async () => {
          await checkStyle(locator, expectedStyles);
        });
      }

      await test.step('Verify style of selected date', async () => {
        await locators.cells(page, 10).click();
        await locators.cells(page, 11).click();
        await locators.button(page, 'Apply').click();
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        await locators.dateRangePickerTrigger(page, 4).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        const cell = page.locator('[data-ui-name="CalendarDays.Unit"][class*="Selected"]');
        await checkStyle(cell.nth(1), { margin: '4px 0px 0px', width: '32px', height: '32px' });
      });

      await test.step('Verify style for Apply picker button', async () => {
        await checkStyle(locators.button(page, 'Apply'), { color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 143, 248)' });
      });
    });

    test('Verify date range picker opened by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.type('0505202310052023');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Date range picker props', () => {
    test('Verify all date range picker props work good', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/day-range-picker.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();

      await locators.cells(page, 3).hover();
      await expect(page).toHaveScreenshot();

      await locators.button(page, 'Apply').hover();
      await expect(page).toHaveScreenshot();
    });

    test('Verify  date range picker period work good', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/day-range-picker-perios-props.tsx', 'en');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Week picker', () => {
    test('Verify Week picker trigger when entering date manually', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/week_picker.tsx', 'en');

      const screenshotsClip = (await locators.dateRangePickerTrigger(page, 0).boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await page.keyboard.press('Tab');
      await page.keyboard.type('05012020');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    test('Verify week picker interacting by mouse', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/week_picker.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.type('05012020');

      await locators.dateRangePickerTrigger(page, 0).click();
      await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();

      await locators.cells(page, 15).click(); // Select a day
      await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

      await expect(locators.popper(page)).not.toBeVisible();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Date range with standart ranges', () => {
    test('Verify roles and attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx', 'en');

      await test.step('Verify trigger aria label', async () => {
        await expect(locators.dateRangePickerTrigger(page, 4)).toHaveAttribute('aria-label', 'Date field');
      });

      await test.step('Verify trigger svg attributes', async () => {
        const svgAttributes = [
          ['aria-hidden', 'true'],
          ['width', '16'],
          ['height', '16'],
        ];
        const svg = locators.dateRangePickerTrigger(page, 4).locator('svg');
        for (const [attr, value] of svgAttributes) {
          await expect(svg).toHaveAttribute(attr, value);
        }
      });

      const inputAttributes = [
        { index: 2, label: 'From date' },
        { index: 3, label: 'To Date field' },
      ];

      for (const { index, label } of inputAttributes) {
        await test.step(`Verify ${label} trigger attributes`, async () => {
          await expect(locators.dateRangePickerTrigger(page, index)).toHaveAttribute('aria-invalid', 'false');
          await expect(locators.dateRangePickerTrigger(page, index)).toHaveAttribute('aria-haspopup', 'dialog');
          await expect(locators.dateRangePickerTrigger(page, index)).toHaveAttribute('aria-expanded', 'false');
          await expect(locators.dateRangePickerTrigger(page, index)).toHaveAttribute('role', 'combobox');
          await expect(locators.dateRangePickerTrigger(page, index)).toHaveAttribute('aria-label', label);
          await expect(locators.dateRangePickerTrigger(page, index)).toHaveAttribute('inputmode', 'numeric');
        });
      }

      locators.dateRangePickerTrigger(page, 4).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });

      await test.step('Verify popper attributes', async () => {
        const popperAttributes = [
          ['tabindex', '0'],
          ['data-popper-placement', 'bottom-start'],
        ];

        for (const [attr, value] of popperAttributes) {
          await expect(locators.popper(page)).toHaveAttribute(attr, value);
        }
      });

      await test.step('Verify popper header attributes', async () => {
        await expect(locators.title(page).first()).toHaveAttribute(
          'aria-live',
          'polite',
        );
        await expect(locators.title(page).nth(1)).not.toHaveAttribute('aria-live', '');
      });

      await test.step('Verify calendar attributes', async () => {
        const count = await locators.calendar(page).count();

        for (let i = 0; i < count; i++) {
          const calendar = locators.calendar(page).nth(i);
          await expect(calendar).toHaveAttribute('role', 'grid');
          await expect(calendar).toHaveAttribute('disabled', '');
        }
      });

      await test.step('Verify weekdays attributes', async () => {
        const rowCount = await locators.weekDaysRow(page).count();
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];

        for (let r = 0; r < rowCount; r++) {
          const weekDaysRow = locators.weekDaysRow(page).nth(r);
          await expect(weekDaysRow).toHaveAttribute('role', 'row');
          const weekDays = weekDaysRow.locator('[data-ui-name="CalendarWeekDays.Unit"]');
          const unitCount = await weekDays.count();
          expect(unitCount).toBe(daysOfWeek.length);

          for (let i = 0; i < daysOfWeek.length; i++) {
            const day = weekDays.nth(i);
            await expect(day).toHaveAttribute('role', 'columnheader');
            await expect(day).toHaveAttribute('aria-label', daysOfWeek[i]);

            const text = (await day.textContent())?.trim();
            expect(text).toBe(daysOfWeek[i].slice(0, 3));
          }
        }
      });

      await test.step('Verify days attributes', async () => {
        const cellCount = await locators.cells(page).count();

        for (let i = 0; i < cellCount; i++) {
          const cell = locators.cells(page).nth(i);
          const ariaLabel = await cell.getAttribute('aria-label');
          if (!ariaLabel) continue;

          await expect(cell).toHaveAttribute('role', 'gridcell');
          await expect(cell).toHaveAttribute('aria-colindex');
          await expect(cell).toHaveAttribute('aria-rowindex');

          const date = new Date(ariaLabel);
          const isCurrentMonth = date.getMonth() === 5;

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

      await test.step('Verify divider attributes', async () => {
        const dividerAttributes = [
          ['orientation', 'vertical'],
          ['aria-orientation', 'vertical'],
          ['role', 'separator'],
        ];

        for (const [attr, value] of dividerAttributes) {
          await expect(locators.divider(page)).toHaveAttribute(attr, value);
        }
      });

      await test.step('Verify DateRangePicker.Period attributes', async () => {
        const periodAttributes = [
          ['role', 'listbox'],
          ['aria-label', 'Presets'],
        ];

        for (const [attr, value] of periodAttributes) {
          await expect(locators.period(page)).toHaveAttribute(attr, value);
        }
      });
    });

    test('Verify Date range picker mouse interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx', 'en');

      const input = page.locator('input[data-ui-name="DateRangePicker.Trigger"]');

      await test.step('Click on date picker to open popper', async () => {
        await locators.dateRangePickerTrigger(page, 6).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        await expect(locators.popper(page)).toHaveCount(1);
        await locators.dateRangePickerTrigger(page, 6).click();
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
      });

      await test.step('Open date picker and check titles', async () => {
        await locators.dateRangePickerTrigger(page, 6).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        const initialTitle1 = await locators.title(page).first().textContent();
        const initialTitle2 = await locators.title(page).nth(1).textContent();

        await test.step('Click on "Previous month" button', async () => {
          await locators.button(page, 'Previous month').click();
          await expect(locators.title(page).first()).not.toHaveText(initialTitle1!);
          await expect(locators.title(page).nth(1)).not.toHaveText(initialTitle2!);
        });

        await test.step('Click on "Next month" button', async () => {
          await locators.button(page, 'Next month').click();
          await expect(locators.title(page).first()).toHaveText(initialTitle1!);
          await expect(locators.title(page).nth(1)).toHaveText(initialTitle2!);
        });
      });
      let expectedInputValue15 = '';
      await test.step('Select date cells and validate input values', async () => {
        await locators.cells(page, 10).click();
        const inputValue = await input.nth(2).inputValue();
        const calendarAriaLabel = await locators.cells(page, 10).getAttribute('aria-label');
        const expectedInputValue = formatAriaLabelToInputValue(calendarAriaLabel);

        await expect(inputValue).toBe(expectedInputValue);

        await locators.cells(page, 15).click();
        const inputValue15 = await input.nth(3).inputValue();
        const calendarAriaLabel15 = await locators.cells(page, 15).getAttribute('aria-label');
        expectedInputValue15 = formatAriaLabelToInputValue(calendarAriaLabel15);
        await expect(inputValue15).toBe(expectedInputValue15);
      });

      await test.step('Reset the selected dates', async () => {
        await locators.cells(page, 15).click();
        await page.waitForTimeout(300);

        const inputValue1 = await input.nth(2).inputValue();
        const inputValue15_1 = await input.nth(3).inputValue();

        await expect(inputValue1).toBe(expectedInputValue15);
        await expect(inputValue15_1).toBe('');

        await locators.cells(page, 15).click();
        const inputValue2 = await input.nth(2).inputValue();
        const inputValue15_2 = await input.nth(3).inputValue();
        await expect(inputValue15_2).toBe(expectedInputValue15);
        await expect(inputValue2).toBe(expectedInputValue15);
      });

      await test.step('Click on apply and check input values', async () => {
        await locators.cells(page, 20).click();
        await locators.cells(page, 25).click();

        const inputValue20 = await input.nth(2).inputValue();
        const calendarAriaLabel20 = await locators.cells(page, 20).getAttribute('aria-label');
        const expectedInputValue20 = formatAriaLabelToInputValue(calendarAriaLabel20);

        const inputValue25 = await input.nth(3).inputValue();
        const calendarAriaLabel25 = await locators.cells(page, 25).getAttribute('aria-label');
        await locators.button(page, 'Apply').click();
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        await expect(inputValue20).toBe(expectedInputValue20);

        const expectedInputValue25 = formatAriaLabelToInputValue(calendarAriaLabel25);
        await expect(inputValue25).toBe(expectedInputValue25);
      });

      await test.step('Reset date selection and validate input', async () => {
        await locators.dateRangePickerTrigger(page, 6).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        await locators.button(page, 'Reset').click();
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });

        const inputValueReset1 = await input.nth(2).inputValue();
        const inputValueReset2 = await input.nth(3).inputValue();
        await expect(inputValueReset1).toBe('');
        await expect(inputValueReset2).toBe('');
      });

      await test.step('Click on buttons and check input values', async () => {
        await locators.dateRangePickerTrigger(page, 6).click();
        await locators.button(page, 'Apply').waitFor({ state: 'visible' });

        await locators.option(page, 'Last month').click();
        const inputValueDate1 = await input.nth(2).inputValue();
        const inputValueDate2 = await input.nth(3).inputValue();
        await expect(inputValueDate1).not.toBe('');
        await expect(inputValueDate2).not.toBe('');
      });
    });

    test('Verify Date range picker keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker',
        '@base-components'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx', 'en');
      if (browserName == 'webkit') test.skip(); // todo refactor to support webkit specifics in focus
      const buttons = page.locator('[data-ui-name="Button"]');
      const input = page.locator('input[data-ui-name="DateRangePicker.Trigger"]');
      await test.step('Open date range picker by Enter', async () => {
        await page.keyboard.press('Tab');
        await expect(input.first()).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(input.nth(1)).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(input.nth(2)).toBeFocused();

        await page.keyboard.press('Enter');
        await locators.button(page, 'Apply').waitFor({ state: 'visible', timeout: 5000 });

        await expect(locators.dateRangePickerTrigger(page, 4)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });

      await test.step('Close date range picker by Escape', async () => {
        await page.keyboard.press('Escape');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
        await expect(input.nth(2)).toBeFocused();
      });
      await test.step('Open date range picker by Space', async () => {
        await page.keyboard.press('Space');
        await locators.button(page, 'Apply').waitFor({ state: 'visible', timeout: 5000 });

        await expect(input.nth(2)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });
      await test.step('Verify month switched by Enter', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();
        const [initialTitleFrom, initialTitleTo] = await Promise.all([
          locators.title(page).first().textContent(),
          locators.title(page).nth(1).textContent(),
        ]);

        await page.keyboard.press('Enter');
        const [titleAfterFirstEnterFrom, titleAfterFirstEnterTo] = await Promise.all([
          locators.title(page).first().textContent(),
          locators.title(page).nth(1).textContent(),
        ]);
        expect(titleAfterFirstEnterFrom).not.toBe(initialTitleFrom);
        expect(titleAfterFirstEnterTo).not.toBe(initialTitleTo);

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();

        await page.keyboard.press('Space');
        const [titleAfterSecondEnterFrom, titleAfterSecondEnterTo] = await Promise.all([
          locators.title(page).first().textContent(),
          locators.title(page).nth(1).textContent(),
        ]);
        expect(titleAfterSecondEnterFrom).toBe(initialTitleFrom);
        expect(titleAfterSecondEnterTo).toBe(initialTitleTo);
      });

      await test.step('Verify navigation inside popper and date range selection', async () => {
        await page.keyboard.press('Shift+Tab');
        await expect(page.locator('[data-ui-name="DateRangePicker.Calendar"]').first()).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(buttons.first()).toBeFocused();

        for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Apply')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Reset')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('ArrowLeft');
        const [initialValue1, initialValue2] = await Promise.all([
          input.nth(2).inputValue(),
          input.nth(3).inputValue(),
        ]);

        await page.keyboard.press('Escape');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden', timeout: 5000 });
        await expect(input.nth(2)).toBeFocused();

        const [value1_1, value2_1] = await Promise.all([
          input.nth(2).inputValue(),
          input.nth(3).inputValue(),
        ]);
        expect(value1_1).toBe(initialValue1);
        expect(value2_1).toBe(initialValue2);

        await page.keyboard.press('Space');
        await locators.button(page, 'Apply').waitFor({ state: 'visible', timeout: 5000 });
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Space');
        const [value1_2, value2_2] = await Promise.all([
          input.nth(2).inputValue(),
          input.nth(3).inputValue(),
        ]);
        expect(value1_2).not.toBe(value1_1);
        expect(value2_2).toBe(value2_1);

        await page.keyboard.press('Space');
        const [value1_3, value2_3] = await Promise.all([
          input.nth(2).inputValue(),
          input.nth(3).inputValue(),
        ]);
        expect(value1_3).toBe(value1_2);
        expect(value2_3).not.toBe(value2_2);

        await page.keyboard.press('Escape');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden', timeout: 5000 });
        await expect(input.nth(2)).toBeFocused();

        const [value1_4, value2_4] = await Promise.all([
          input.nth(2).inputValue(),
          input.nth(3).inputValue(),
        ]);
        expect(value1_4).toBe(initialValue1);
        expect(value2_4).toBe(initialValue2);

        await page.keyboard.press('Space');
        await locators.button(page, 'Apply').waitFor({ state: 'visible', timeout: 5000 });
        await expect(input.nth(2)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Space');
        await page.keyboard.press('Tab');
        if (!(await buttons.first().evaluate((el) => el === document.activeElement))) {
          await page.keyboard.press('Tab');
        }
        await expect(buttons.first()).toBeFocused();

        for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Apply')).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden', timeout: 5000 });
        await expect(input.nth(2)).toBeFocused();

        const [value1_6, value2_6] = await Promise.all([
          input.nth(2).inputValue(),
          input.nth(3).inputValue(),
        ]);
        expect(value1_6).not.toBe(value1_4);
        expect(value2_6).not.toBe(value2_4);

        await page.keyboard.press('Space');
        await locators.button(page, 'Apply').waitFor({ state: 'visible', timeout: 5000 });
        await expect(locators.popper(page)).toBeFocused();

        for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
        await expect(buttons.nth(1)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden', timeout: 5000 });
        await expect(input.nth(2)).toBeFocused();

        await page.keyboard.press('Enter');
        await locators.button(page, 'Apply').waitFor({ state: 'visible', timeout: 5000 });
        await expect(locators.popper(page)).toBeFocused();

        for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Reset')).toBeFocused();

        await page.keyboard.press('Space');
        await locators.button(page, 'Apply').waitFor({ state: 'hidden', timeout: 5000 });
        await expect(input.nth(2)).toBeFocused();

        const [value1_5, value2_5] = await Promise.all([
          input.nth(2).inputValue(),
          input.nth(3).inputValue(),
        ]);
        expect(value1_5).toBe(initialValue1);
        expect(value2_5).toBe(initialValue2);
      });
    });
  });

  test.describe('Week picker', () => {
    test('Verify week picker interacting by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker',
        '@base-components'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/week_picker.tsx', 'en');
      await page.keyboard.press('Tab');
      await page.keyboard.type('05012020');

      await page.keyboard.press('Enter');
      await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Previous month')).toBeFocused();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await expect(locators.button(page, 'Previous month')).toBeVisible();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');

      await page.keyboard.press('Space'); // enter doesn't work
      await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

      await page.keyboard.press('Enter');
      await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Next month')).toBeFocused();
      await expect(locators.button(page, 'Previous month')).toBeVisible();
    });
  });
});
