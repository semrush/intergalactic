import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { checkStyle } from './utils';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  datePickerTrigger: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="DatePicker.Trigger"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  calendar: (page: Page) => page.locator('[data-ui-name="DatePicker.Calendar"]'),
  weekDaysRow: (page: Page) => page.locator('[data-ui-name="CalendarWeekDays"]'),
  divider: (page: Page) => page.locator('[data-ui-name="Divider"]'),
  cells: (page: Page, index?: number) => {
    const base = page.getByRole('gridcell');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  popper: (page: Page) => page.getByRole('dialog'),
  title: (page: Page) => page.locator('[data-ui-name="DatePicker.Title"]'),

};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Date Picker Trigger', () => {
    test('Verify trigger states when entering date manually', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/datepicker.tsx', 'en');

      const screenshotsClip = (await locators.datePickerTrigger(page, 0).boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await page.keyboard.press('Tab');
      await page.keyboard.type('052');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      await page.keyboard.type('92000');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('ArrowRight');
      for (let i = 0; i < 5; i++) await page.keyboard.press('Backspace');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    test('Verify trigger states and props', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/day-trigger.tsx', 'en');

      await expect(page).toHaveScreenshot();
      for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('DayPicker with today button', () => {
    test('Verify datepicker with Today button styles', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/datepicker.tsx', 'en');

      const selectedCell = page.locator('[data-ui-name="CalendarDays.Unit"][class*="Selected"]');

      await test.step('Verify trigger margins', async () => {
        await checkStyle(locators.datePickerTrigger(page, 0), { marginTop: '8px' });
      });

      await test.step('Verify header button hover', async () => {
        await locators.datePickerTrigger(page, 0).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await locators.button(page, 'Previous month').hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify disabled date styles', async () => {
        await checkStyle(locators.cells(page, 0), {
          color: 'rgb(25, 27, 35)',
          backgroundColor: 'rgb(255, 255, 255)',
          margin: '4px 0px 0px',
        });
      });

      await test.step('Verify style of available date', async () => {
        await checkStyle(locators.cells(page, 2), {
          color: 'rgb(25, 27, 35)',
          backgroundColor: 'rgb(255, 255, 255)',
          margin: '4px 0px 0px',
        });
      });

      await test.step('Verify hover style of available date', async () => {
        await locators.cells(page, 8).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify style of selected date', async () => {
        await checkStyle(selectedCell, {
          color: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(43, 179, 255)',
          margin: '4px 0px 0px',
          width: '32px',
          height: '32px',
        });
      });

      await test.step('Verify hover style of selected date', async () => {
        await selectedCell.hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify hover style for today button', async () => {
        await locators.button(page, 'Today').hover();
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('DayPicker with custom days', () => {
    test('Verify datepicker with custom days styles', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/custom_day_test.tsx', 'en');

      const selectedCell = page.locator(
        '[data-ui-name="CalendarDays.Unit"][class*="__startSelected_"][class*="__endSelected_"]',
      );

      // Helper function to check style properties
      const checkStyle = async (element: any, expectedStyles: any) => {
        for (const [property, expectedValue] of Object.entries(expectedStyles)) {
          const actualValue = await element.evaluate(
            (el: any, property: any) => getComputedStyle(el)[property],
            property,
          );
          expect(actualValue).toBe(expectedValue);
        }
      };

      await test.step('Verify trigger margins', async () => {
        await locators.datePickerTrigger(page, 0).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await checkStyle(locators.datePickerTrigger(page, 0), { marginTop: '8px' });
      });

      await test.step('Verify hover disabled date', async () => {
        await checkStyle(locators.cells(page, 0), {
          color: 'rgb(25, 27, 35)',
          backgroundColor: 'rgb(255, 255, 255)',
          margin: '4px 0px 0px',
        });
      });

      await test.step('Verify style of available date', async () => {
        await checkStyle(locators.cells(page, 10), {
          color: 'rgb(25, 27, 35)',
          backgroundColor: 'rgb(255, 255, 255)',
          margin: '4px 0px 0px',
        });
      });

      await test.step('Verify hover style of available date', async () => {
        await locators.datePickerTrigger(page, 0).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        page.locator('input[data-ui-name="DatePicker.Trigger"]').fill('05.05.2024');
        await locators.datePickerTrigger(page, 0).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
      });

      await test.step('Verify style of selected date', async () => {
        await checkStyle(selectedCell, {
          color: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(43, 179, 255)',
          margin: '4px 0px 0px',
          width: '32px',
        });
      });
    });
  });

  test.describe('DayPikcer trigger and popper', () => {
    test('Verify mouse interactions when component uses expanded trigger and popper', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx', 'en');

      const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

      await test.step('Fill input manually and open calendar', async () => {
        await input.fill('04042022');
        await locators.datePickerTrigger(page, 0).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot();
      });
    });
  });

  test.describe('Calendar props and date picker', () => {
    test('Verify all calendar props work good', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        '@propgress-bar'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/calendar_props.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.type('03032025');

      await page.keyboard.press('Enter');
      await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    test('Verify all date picker props work good', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/date-picker-props.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await locators.button(page, 'Previous month').hover();
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
  test.describe('DayPicker with today button', () => {
    test('Verify roles and attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/datepicker.tsx', 'en');

      const inputTrigger = page.locator('input[data-ui-name="DatePicker.Trigger"]');

      await test.step('Verify trigger aria label', async () => {
        await expect(locators.datePickerTrigger(page, 0)).toHaveAttribute('aria-label', 'Date field');
      });

      await test.step('Verify trigger SVG attributes', async () => {
        const svg = locators.datePickerTrigger(page).locator('svg');
        const svgAttributes = [
          ['aria-hidden', 'true'],
          ['width', '16'],
          ['height', '16'],
        ];

        for (const [attr, value] of svgAttributes) {
          await expect(svg).toHaveAttribute(attr, value);
        }
      });

      await test.step('Verify input trigger attributes', async () => {
        const inputAttributes = [
          ['aria-invalid', 'false'],
          ['role', 'combobox'],
          ['aria-label', 'Date'],
          ['inputmode', 'numeric'],
        ];

        for (const [attr, value] of inputAttributes) {
          await expect(inputTrigger).toHaveAttribute(attr, value);
        }
      });

      await locators.datePickerTrigger(page, 0).click();
      await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

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
        const headerLocators = [
          { locator: '[data-ui-name="DatePicker.Title"]', attrs: [['aria-live', 'polite']] },
        ];

        for (const { locator, attrs } of headerLocators) {
          const element = page.locator(locator);
          for (const [attr, value] of attrs) {
            await expect(element).toHaveAttribute(attr, value);
          }
        }
      });

      await test.step('Verify calendar attributes', async () => {
        await expect(locators.calendar(page)).toHaveAttribute('tabindex', '0');
        await expect(locators.calendar(page)).toHaveAttribute('role', 'grid');
        await expect(locators.calendar(page)).toHaveAttribute('disabled', '');
      });

      await test.step('Verify weekdays attributes', async () => {
        await expect(locators.weekDaysRow(page)).toHaveAttribute('role', 'row');

        const weekDays = locators.weekDaysRow(page).locator('[data-ui-name="CalendarWeekDays.Unit"]');
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];

        for (const [i, dayName] of daysOfWeek.entries()) {
          const day = weekDays.nth(i);
          await expect(day).toHaveAttribute('role', 'columnheader');
          await expect(day).toHaveAttribute('aria-label', dayName);

          const dayText = (await day.textContent())?.trim();
          expect(dayText).toBe(dayName.slice(0, 3));
        }
      });

      await test.step('Verify days attributes', async () => {
        const cells = page.locator('[role="gridcell"]');
        const cellCount = await cells.count();

        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          const ariaLabel = await cell.getAttribute('aria-label');
          if (!ariaLabel) continue;

          const dayAttributes = [
            ['role', 'gridcell'],
            ['aria-colindex'],
            ['aria-rowindex'],
            ['aria-selected', 'false'],
            ['aria-hidden', 'false'],
          ];

          for (const [attr, value] of dayAttributes) {
            if (value !== undefined) {
              await expect(cell).toHaveAttribute(attr, value);
            } else {
              await expect(cell).toHaveAttribute(attr);
            }
          }

          const date = new Date(ariaLabel);
          const isCurrentMonth = date.getMonth() === 5; // June

          const hasDisabled = (await cell.getAttribute('disabled')) !== null;
          const ariaDisabled = await cell.getAttribute('aria-disabled');

          if (isCurrentMonth) {
            expect(hasDisabled).toBe(false);
          } else {
            expect(hasDisabled).toBe(true);
          }
          expect(ariaDisabled).toBe('false');

          const text = (await cell.textContent())?.trim();
          expect(text).not.toBe('');
        }
      });

      await test.step('Verify divider attributes', async () => {
        const dividerAttributes = [
          ['orientation', 'horizontal'],
          ['aria-orientation', 'horizontal'],
          ['role', 'separator'],
        ];

        for (const [attr, value] of dividerAttributes) {
          await expect(locators.divider(page)).toHaveAttribute(attr, value);
        }
      });
    });

    test('Verify datepicker with today button by mouse interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/datepicker.tsx', 'en');

      const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

      const initialValue = await input.inputValue();

      await test.step('Open and close datepicker popper', async () => {
        await locators.datePickerTrigger(page).first().click();
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await locators.datePickerTrigger(page).first().click();
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        await locators.datePickerTrigger(page).first().click();
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
      });

      await test.step('Navigate months and verify title changes', async () => {
        const initialTitle = await locators.title(page).textContent();

        await locators.button(page, 'Previous month').click();
        await expect(locators.title(page)).not.toHaveText(initialTitle!);

        await locators.button(page, 'Next month').click();
        await expect(locators.title(page)).toHaveText(initialTitle!);
      });

      await test.step('Select date and today and input value changes', async () => {
        await locators.cells(page).nth(15).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        const newValue = await input.inputValue();
        expect(newValue).not.toBe(initialValue);

        await locators.datePickerTrigger(page).first().click();
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await locators.button(page, 'Today').click();
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        const finalValue = await input.inputValue();
        expect(finalValue).not.toBe(newValue);
      });
    });

    test('Verify datepicker with today button by keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/datepicker.tsx', 'en');

      const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
      const highlightedCell = page.locator(
        '[data-ui-name="CalendarDays.Unit"][class*="highlighted"]',
      );

      const initialValue = await input.inputValue();

      await test.step('Open datepicker with Enter', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
        await expect(locators.datePickerTrigger(page, 2)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });

      await test.step('Close datepicker with Escape', async () => {
        await page.keyboard.press('Escape');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });
        await expect(input).toBeFocused();
      });

      await test.step('Navigate to prev button and change month', async () => {
        await page.keyboard.press('Space');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
        await expect(locators.popper(page)).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();
        const initialTitle = await locators.title(page).textContent();

        await page.keyboard.press('Enter');
        const titleAfterFirstEnter = await locators.title(page).textContent();
        expect(titleAfterFirstEnter).not.toBe(initialTitle);
        await expect(locators.title(page)).not.toHaveText(initialTitle!);

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();

        await page.keyboard.press('Enter');
        const titleAfterSecondEnter = await locators.title(page).textContent();
        expect(titleAfterSecondEnter).toBe(initialTitle);
      });

      await test.step('Verify month changes by Space press', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Today')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();

        const initialTitle = await locators.title(page).textContent();

        await page.keyboard.press('Space');
        const titleAfterFirstEnter = await locators.title(page).textContent();
        expect(titleAfterFirstEnter).not.toBe(initialTitle);
        await expect(locators.title(page)).not.toHaveText(initialTitle!);
      });

      await test.step('Navigate to calendar and today button', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.calendar(page)).toBeFocused();

        // Navigate to Today button - tab navigation may vary by browser
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('Tab');
          const isFocused = await locators.button(page, 'Today').evaluate((el) => el === document.activeElement);
          if (isFocused) break;
        }
        await expect(locators.button(page, 'Today')).toBeFocused();
      });

      await test.step('Navigate in calendar and select date', async () => {
        await page.keyboard.press('ArrowUp');
        await expect(highlightedCell).toBeVisible();

        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        const newValue = await input.inputValue();
        expect(newValue).not.toBe(initialValue);

        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('Tab');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await page.keyboard.press('Tab');
        await locators.button(page, 'Next month').waitFor({ state: 'visible' });

        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Space');

        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });
        await expect(input).toBeFocused();
        const newValue2 = await input.inputValue();
        expect(newValue2).not.toBe(newValue);
      });

      await test.step('Select today by Enter on Today button', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('Shift+Tab');
        await expect(locators.button(page, 'Today')).toBeFocused();

        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });
        await expect(input).toBeFocused();

        const todayValue = await input.inputValue();
        const today = new Date();
        const expectedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
        expect(todayValue).toBe(expectedDate);
      });

      await test.step('Select today by Space on Today button', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('Shift+Tab');
        await expect(locators.button(page, 'Today')).toBeFocused();

        await page.keyboard.press('Space');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        await expect(input).toBeFocused();
        const todayValue = await input.inputValue();
        const today = new Date();
        const expectedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
        expect(todayValue).toBe(expectedDate);
      });
    });
  });

  test.describe('DayPicker with custom days', () => {
    test('Verify custom days roles and attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/custom_day_test.tsx', 'en');

      await test.step('Verify trigger SVG attributes', async () => {
        const svg = locators.datePickerTrigger(page).locator('svg');
        const svgAttributes = [
          ['aria-hidden', 'true'],
          ['width', '16'],
          ['height', '16'],
        ];

        for (const [attr, value] of svgAttributes) {
          await expect(svg).toHaveAttribute(attr, value);
        }
      });

      const triggerAttributes = [{ name: 'aria-label', value: 'Date field' }];

      await test.step('Verify trigger attributes', async () => {
        for (const { name, value } of triggerAttributes) {
          await expect(locators.datePickerTrigger(page, 0)).toHaveAttribute(name, value);
        }
      });

      const inputTrigger = page.locator('input[data-ui-name="DatePicker.Trigger"]');
      await test.step('Verify input trigger attributes', async () => {
        const inputAttributes = [
          ['aria-invalid', 'false'],
          ['role', 'combobox'],
          ['aria-label', 'Date'],
          ['inputmode', 'numeric'],
        ];

        for (const [attr, value] of inputAttributes) {
          await expect(inputTrigger).toHaveAttribute(attr, value);
        }
      });

      // Triggering the date picker
      await locators.datePickerTrigger(page, 0).click();
      await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

      await test.step('Verify popper attributes', async () => {
        const popperAttributes = [
          ['tabindex', '0'],
          ['data-popper-placement', 'bottom-start'],
        ];

        for (const [attr, value] of popperAttributes) {
          await expect(locators.popper(page)).toHaveAttribute(attr, value);
        }
      });

      await test.step('Verify title attributes', async () => {
        await expect(locators.title(page)).toHaveAttribute('aria-live', 'polite');
      });

      await test.step('Verify calendar attributes', async () => {
        await expect(locators.calendar(page)).toHaveAttribute('tabindex', '0');
        await expect(locators.calendar(page)).toHaveAttribute('disabled', '');
      });

      await test.step('Verify weekdays attributes', async () => {
        await expect(locators.weekDaysRow(page)).toHaveAttribute('role', 'row');

        const weekDays = locators.weekDaysRow(page).locator('[data-ui-name="CalendarWeekDays.Unit"]');
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];

        for (const [i, dayName] of daysOfWeek.entries()) {
          const day = weekDays.nth(i);
          await expect(day).toHaveAttribute('role', 'columnheader');
          await expect(day).toHaveAttribute('aria-label', dayName);

          const dayText = (await day.textContent())?.trim();
          expect(dayText).toBe(dayName.slice(0, 3));
        }
      });

      await test.step('Verify days attributes', async () => {
        const cellCount = await locators.cells(page).count();

        for (let i = 0; i < cellCount; i++) {
          const cell = locators.cells(page).nth(i);
          const ariaLabel = await cell.getAttribute('aria-label');
          if (!ariaLabel) continue;

          const dayAttributes = [
            ['aria-colindex'],
            ['aria-rowindex'],
            ['aria-selected', 'false'],
            ['aria-hidden', 'false'],
          ];

          for (const [attr, value] of dayAttributes) {
            if (value !== undefined) {
              await expect(cell).toHaveAttribute(attr, value);
            } else {
              await expect(cell).toHaveAttribute(attr);
            }
          }

          const date = new Date(ariaLabel);
          const isCurrentMonth = date.getMonth() === 5; // June

          const hasDisabled = (await cell.getAttribute('disabled')) !== null;
          const ariaDisabled = await cell.getAttribute('aria-disabled');

          if (isCurrentMonth) {
            expect(hasDisabled).toBe(false);
          } else {
            expect(hasDisabled).toBe(true);
          }
          expect(ariaDisabled).toBe('false');

          const text = (await cell.textContent())?.trim();
          expect(text).not.toBe('');
        }
      });
    });

    test('Verify custom days can be selected by the mouse', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/custom_day_test.tsx', 'en');

      const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
      const initialValue = await input.inputValue();

      await test.step('Open datepicker popper by click', async () => {
        await locators.datePickerTrigger(page, 0).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
      });

      await test.step('Navigate months and verify title change', async () => {
        const initialTitle = await locators.title(page).textContent();

        await locators.button(page, 'Previous month').click();
        await expect(locators.title(page)).not.toHaveText(initialTitle!);

        await locators.button(page, 'next month').click();
        await expect(locators.title(page)).toHaveText(initialTitle!);
      });

      await test.step('Select a day and verify input value changes', async () => {
        await locators.cells(page, 10).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        const newValue = await input.inputValue();
        expect(newValue).not.toBe(initialValue);
      });
    });

    test('Verify custom days by keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/tests/examples/custom_day_test.tsx', 'en');

      const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
      const highlightedCell = page.locator(
        '[data-ui-name="CalendarDays.Unit"][class*="highlighted"]',
      );

      const initialValue = await input.inputValue();

      await test.step('Open datepicker with Enter key', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
        await expect(locators.datePickerTrigger(page, 0)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });

      await test.step('Close datepicker with Escape key', async () => {
        await page.keyboard.press('Escape');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });
        await expect(input).toBeFocused();
      });

      await test.step('Reopen datepicker with Space key', async () => {
        await page.keyboard.press('Space');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await expect(locators.datePickerTrigger(page, 0)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });
      const initialTitle = await locators.title(page).textContent();

      await test.step('Navigate to previous month and validate title change', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();
        await locators.button(page, 'Previous month').hover();
        await page.keyboard.press('Enter'); // Space doesn't work — bug
        const titleAfterFirstEnter = await locators.title(page).textContent();
        expect(titleAfterFirstEnter).not.toBe(initialTitle);
        await expect(locators.title(page)).not.toHaveText(initialTitle!);
      });

      await test.step('Navigate to next month and validate title restored', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();

        await page.keyboard.press('Enter'); // Space doesn't work — bug
        const titleAfterSecondEnter = await locators.title(page).textContent();
        expect(titleAfterSecondEnter).toBe(initialTitle);
      });

      await test.step('Navigate to calendar and today button', async () => {
        await page.keyboard.press('Shift+Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(locators.calendar(page)).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.popper(page)).toBeFocused();

        await page.keyboard.press('Shift+Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();
      });

      await test.step('Navigate in calendar and select highlighted date', async () => {
        await page.keyboard.press('ArrowDown');
        await expect(highlightedCell).toBeVisible();

        const activeElementHandle = await page.evaluateHandle(() => document.activeElement);
        const isFocusedElementHighlighted = await highlightedCell.evaluate(
          (el, active) => el === active,
          activeElementHandle,
        );
        expect(isFocusedElementHighlighted).toBe(true);

        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        const newValue = await input.inputValue();
        expect(newValue).not.toBe(initialValue);
      });

      await test.step('Select another date after reopening', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        const newValue = await input.inputValue();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Space');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        const newValue2 = await input.inputValue();
        expect(newValue2).not.toBe(newValue);
      });
    });
  });

  test.describe('DayPikcer trigger and popper', () => {
    test('Verify mouse interactions when component uses expanded trigger and popper', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx', 'en');

      const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
      const initialValue = await input.inputValue();

      await test.step('Navigate months and validate title change', async () => {
        await input.fill('04042022');
        await locators.datePickerTrigger(page, 0).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        const initialTitle = await locators.title(page).textContent();

        await locators.button(page, 'Previous month').click();
        await expect(locators.title(page)).not.toHaveText(initialTitle!);

        await locators.button(page, 'Next month').click();
        await expect(locators.title(page)).toHaveText(initialTitle!);
      });

      await test.step('Select a date and validate input value change', async () => {
        await locators.cells(page, 10).click();
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        const newValue = await input.inputValue();
        expect(newValue).not.toBe(initialValue);
      });
    });

    test('Verify keyboard interactions when component uses expanded trigger and popper', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx', 'en');

      const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
      const highlighted = page.locator('[data-ui-name="CalendarDays.Unit"][class*="highlighted"]');
      const initialValue = await input.inputValue();

      await test.step('Focus DatePicker and fill date manually', async () => {
        await page.keyboard.press('Tab');
        await input.fill('04042022');
      });

      await test.step('Open popper with Enter key and check focus', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
        await expect(locators.datePickerTrigger(page, 0)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });

      await test.step('Close popper with Escape key and check focus', async () => {
        await page.keyboard.press('Escape');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });
        await expect(input).toBeFocused();
      });

      await test.step('Reopen popper with Space key and check focus', async () => {
        await page.keyboard.press('Space');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
        await expect(locators.datePickerTrigger(page, 0)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });
      const initialTitle = await locators.title(page).textContent();

      await test.step('Navigate to previous month and validate title change', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();
        await locators.button(page, 'Previous month').hover();
        await page.keyboard.press('Space');
        const titleAfterFirstEnter = await locators.title(page).textContent();
        expect(titleAfterFirstEnter).not.toBe(initialTitle);
        await expect(locators.title(page)).not.toHaveText(initialTitle!);
      });

      await test.step('Navigate to next month and validate title reset', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();
        await page.keyboard.press('Enter');
        const titleAfterSecondEnter = await locators.title(page).textContent();
        expect(titleAfterSecondEnter).toBe(initialTitle);
      });

      await test.step('Navigate to calendar and today button', async () => {
        await page.keyboard.press('Shift+Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(locators.calendar(page)).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Today')).toBeFocused();

        await page.keyboard.press('Shift+Tab');
        await expect(locators.calendar(page)).toBeFocused();
      });

      await test.step('Move selection inside calendar and validate highlighting', async () => {
        await page.keyboard.press('ArrowDown');
        await expect(highlighted).toBeVisible();

        const activeElementHandle = await page.evaluateHandle(() => document.activeElement);
        const isFocusedElementHighlighted = await highlighted.evaluate(
          (el, active) => el === active,
          activeElementHandle,
        );
        expect(isFocusedElementHighlighted).toBe(true);
      });

      await test.step('Select day with Enter key and validate input value change', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

        const newValue = await input.inputValue();
        expect(newValue).not.toBe(initialValue);
      });

      await test.step('Quick navigation and selection with keyboard', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        const newValue = await input.inputValue();
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Space');

        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });
        const newValue2 = await input.inputValue();
        expect(newValue2).not.toBe(newValue);
      });
    });
  });

  test.describe('Disabled dates and Validation', () => {
    test('Verify validation tooltip', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker',
        TAG.KEYBOARD],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/disabled_dates.tsx', 'en');

      const tooltip = page.getByRole('tooltip', { name: 'January 1 of this year is off' });

      await page.keyboard.press('Tab');
      await page.keyboard.type('06');
      await page.keyboard.type('20');
      await expect(locators.datePickerTrigger(page, 2)).toHaveAttribute('aria-invalid', 'false');

      await page.keyboard.type('7875');
      await page.waitForTimeout(250);
      await expect(locators.datePickerTrigger(page, 2)).toHaveAttribute('aria-invalid', 'true');
      await expect(locators.datePickerTrigger(page, 2)).toHaveAttribute('aria-haspopup', 'true');

      await page.keyboard.press('Backspace');
      await page.keyboard.type('24');
      await expect(locators.datePickerTrigger(page, 2)).toHaveAttribute('aria-invalid', 'true');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Previous month').waitFor({ state: 'visible' });
      await expect(tooltip).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(tooltip).toBeVisible();
      await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });

      await page.keyboard.press('Escape'); // bug
      await expect(tooltip).toBeVisible();
      await expect(locators.datePickerTrigger(page, 2)).toHaveAttribute('aria-invalid', 'true');
    });

    test('Verify keyboard interactions when disabled dates and validation tooltip', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/disabled_dates.tsx', 'en');

      const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

      await test.step('Navigate to date picker and fill the input with a date', async () => {
        await page.keyboard.press('Tab');
        await input.fill('04/24/2025');
        await page.keyboard.press('Enter');
      });

      await test.step('Verify popper visibility and focus', async () => {
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await expect(locators.datePickerTrigger(page, 0)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });

      await test.step('Close popper with Escape and check input focus', async () => {
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Escape');
        await locators.button(page, 'Previous month').waitFor({ state: 'hidden' });
        await expect(input).toBeFocused();
      });

      await test.step('Open popper with Space and check focus', async () => {
        await page.keyboard.press('Space');
        await locators.button(page, 'Previous month').waitFor({ state: 'visible' });

        await expect(locators.datePickerTrigger(page, 0)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });
      const initialTitle = await locators.title(page).textContent();

      await test.step('Navigate to previous month and check title', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();
        await page.keyboard.press('Enter');
        const titleAfterFirstEnter = await locators.title(page).textContent();
        expect(titleAfterFirstEnter).not.toBe(initialTitle);
        await expect(locators.title(page)).not.toHaveText(initialTitle!);
      });

      await test.step('Navigate to next month and validate title reset', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();
        await page.keyboard.press('Space');
        const titleAfterSecondEnter = await locators.title(page).textContent();
        expect(titleAfterSecondEnter).toBe(initialTitle);
      });

      await test.step('Navigate between prev and next month with Tab and Shift+Tab', async () => {
        await page.keyboard.press('Shift+Tab');
        await expect(locators.button(page, 'Previous month')).toBeFocused();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-ui-name="DatePicker.Calendar"]')).toBeFocused();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Shift+Tab');
        await expect(locators.button(page, 'Next month')).toBeFocused();
      });

      await test.step('Navigate down in the calendar and verify highlighted date', async () => {
        await page.keyboard.press('ArrowDown');
        const highlighted = page.locator('[data-ui-name="CalendarDays.Unit"][class*="highlighted"]');
        await expect(highlighted).toBeVisible();
      });
    });
  });
});
