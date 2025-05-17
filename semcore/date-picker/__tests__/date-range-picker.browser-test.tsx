import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Date Range Trigger', () => {
  test('Verify trigger states when entering sate manually', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="DateRangePicker.Trigger"]');
    const screenshotsClip = (await datePicker.first().boundingBox())!;
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
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
  });

  test('Verify trigger states and props', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/day-range-trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Date range with standart ranges', () => {
  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="DateRangePicker.Trigger"]').nth(4);

    await test.step('Verify trigger aria label', async () => {
      await expect(datePickerTrigger).toHaveAttribute('aria-label', 'Date field');
    });

    await test.step('Verify trigger svg attributes', async () => {
      const svgAttributes = [
        ['tabindex', '-1'],
        ['aria-hidden', 'true'],
        ['width', '16'],
        ['height', '16'],
      ];
      const svg = datePickerTrigger.locator('svg');
      for (const [attr, value] of svgAttributes) {
        await expect(svg).toHaveAttribute(attr, value);
      }
    });

    const inputTriggr = page.locator('input[data-ui-name="DateRangePicker.Trigger"]');

    const inputAttributes = [
      { index: 2, label: 'From date' },
      { index: 3, label: 'To Date field' },
    ];

    for (const { index, label } of inputAttributes) {
      await test.step(`Verify ${label} trigger attributes`, async () => {
        await expect(inputTriggr.nth(index)).toHaveAttribute('aria-invalid', 'false');
        await expect(inputTriggr.nth(index)).toHaveAttribute('aria-haspopup', 'dialog');
        await expect(inputTriggr.nth(index)).toHaveAttribute('aria-expanded', 'false');
        await expect(inputTriggr.nth(index)).toHaveAttribute('role', 'combobox');
        await expect(inputTriggr.nth(index)).toHaveAttribute('aria-label', label);
        await expect(inputTriggr.nth(index)).toHaveAttribute('inputmode', 'numeric');
      });
    }

    datePickerTrigger.click();
    const popper = page.locator('[data-ui-name="DateRangePicker.Popper"]');

    await test.step('Verify popper attributes', async () => {
      const popperAttributes = [
        ['tabindex', '0'],
        ['role', 'dialog'],
        ['data-popper-placement', 'bottom-start'],
      ];

      for (const [attr, value] of popperAttributes) {
        await expect(popper).toHaveAttribute(attr, value);
      }
    });

    await test.step('Verify popper header attributes', async () => {
      const headerAttributes = [
        {
          locator: '[data-ui-name="DateRangePicker.Prev"]',
          attrs: [
            ['type', 'button'],
            ['aria-label', 'Previous month'],
          ],
        },
        {
          locator: '[data-ui-name="DateRangePicker.Next"]',
          attrs: [
            ['type', 'button'],
            ['aria-label', 'Next month'],
          ],
        },
      ];

      for (const { locator, attrs } of headerAttributes) {
        const element = page.locator(locator);
        for (const [attr, value] of attrs) {
          await expect(element).toHaveAttribute(attr, value);
        }
      }
      await expect(page.locator('[data-ui-name="DateRangePicker.Title"]').first()).toHaveAttribute(
        'aria-live',
        'polite',
      );
      await expect(
        page.locator('[data-ui-name="DateRangePicker.Title"]').nth(1),
      ).not.toHaveAttribute('aria-live', '');
    });

    await test.step('Verify calendar attributes', async () => {
      const calendars = page.locator('[data-ui-name="DateRangePicker.Calendar"]');
      const count = await calendars.count();

      for (let i = 0; i < count; i++) {
        const calendar = calendars.nth(i);
        await expect(calendar).toHaveAttribute('role', 'grid');
        await expect(calendar).toHaveAttribute('disabled', '');
      }
    });

    await test.step('Verify weekdays attributes', async () => {
      const weekDaysRows = page.locator('[data-ui-name="CalendarWeekDays"]');
      const rowCount = await weekDaysRows.count();
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
        const weekDaysRow = weekDaysRows.nth(r);
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
      const divider = page.locator('[data-ui-name="Divider"]');
      const dividerAttributes = [
        ['orientation', 'vertical'],
        ['aria-orientation', 'vertical'],
        ['role', 'separator'],
      ];

      for (const [attr, value] of dividerAttributes) {
        await expect(divider).toHaveAttribute(attr, value);
      }
    });

    const period = page.locator('[data-ui-name="DateRangePicker.Period"]');

    await test.step('Verify DateRangePicker.Period attributes', async () => {
      const periodAttributes = [
        ['role', 'listbox'],
        ['aria-label', 'Presets'],
      ];

      for (const [attr, value] of periodAttributes) {
        await expect(period).toHaveAttribute(attr, value);
      }
    });

    const periodButtons = page.locator(
      '[data-ui-name="DateRangePicker.Period"] [data-ui-name="Button"]',
    );

    await test.step('Verify DateRangePicker.Period button attributes', async () => {
      const count = await periodButtons.count();

      for (let i = 0; i < count; i++) {
        const button = periodButtons.nth(i);
        await expect(button).toHaveAttribute('type', 'button');
        await expect(button).toHaveAttribute('role', 'option');
      }
    });

    await test.step('Verify Apply and Reset button attributes', async () => {
      const buttons = [
        { locator: '[data-ui-name="DateRangePicker.Apply"]', label: 'Apply' },
        { locator: '[data-ui-name="DateRangePicker.Reset"]', label: 'Reset' },
      ];

      for (const { locator, label } of buttons) {
        const button = page.locator(locator);
        await expect(button).toHaveAttribute('type', 'button');
      }
    });
  });

  test('Verify date range picker styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="DateRangePicker.Trigger"]').nth(4);
    const prevButton = page.locator('[data-ui-name="DateRangePicker.Prev"]');
    const cells = page.locator('[data-ui-name="CalendarDays.Unit"]');
    const apply = page.locator('[data-ui-name="DateRangePicker.Apply"]');

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
      await checkStyle(datePickerTrigger, { marginTop: '8px' });
    });

    await test.step('Verify svg dimensions', async () => {
      const svg = datePickerTrigger.locator('svg');
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
      await datePickerTrigger.click();
    });

    const dateStyles = [
      {
        locator: cells.first(),
        expectedStyles: {
          color: 'rgb(25, 27, 35)',
          backgroundColor: 'rgb(255, 255, 255)',
          margin: '4px 0px 0px',
        },
      },
      {
        locator: cells.nth(10),
        expectedStyles: {
          color: 'rgb(25, 27, 35)',
          backgroundColor: 'rgb(255, 255, 255)',
          margin: '4px 0px 0px',
        },
      },
    ];

    for (const { locator, expectedStyles } of dateStyles) {
      await test.step(`Verify style of ${
        locator === cells.first() ? 'disabled' : 'available'
      } date`, async () => {
        await checkStyle(locator, expectedStyles);
      });
    }

    await test.step('Verify style of selected date', async () => {
      await cells.nth(10).click();
      await cells.nth(11).click();
      await apply.click();
      await datePickerTrigger.click();
      const cell = page.locator('[data-ui-name="CalendarDays.Unit"][class*="Selected"]');
      await checkStyle(cell.nth(1), { margin: '4px 0px 0px', width: '32px', height: '32px' });
    });

    await test.step('Verify style for Apply picker button', async () => {
      await checkStyle(apply, { color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 143, 248)' });
    });
  });

  function formatAriaLabelToInputValue(ariaLabel: string | null): string {
    if (!ariaLabel) {
      throw new Error('aria-label is null');
    }
    const parsedDate = new Date(ariaLabel);

    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid aria-label date: ${ariaLabel}`);
    }

    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const year = parsedDate.getFullYear().toString();

    return `${month}/${day}/${year}`;
  }

  test('Verify Date range picker mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="DateRangePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DateRangePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DateRangePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DateRangePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DateRangePicker.Next"]');
    const input = page.locator('input[data-ui-name="DateRangePicker.Trigger"]');
    const apply = page.locator('[data-ui-name="DateRangePicker.Apply"]');
    const reset = page.locator('[data-ui-name="DateRangePicker.Reset"]');
    const buttons = page.locator('[data-ui-name="Button"]');
    const cells = page.locator('[role="gridcell"]');

    await test.step('Click on date picker to open popper', async () => {
      await datePicker.nth(2).click();
      await expect(popper).toBeVisible();
      await datePicker.nth(3).click();
      await expect(popper).not.toBeVisible();
    });

    await test.step('Open date picker and check titles', async () => {
      await datePicker.first().click();
      await page.waitForTimeout(300);

      const initialTitle1 = await headTitle.first().textContent();
      const initialTitle2 = await headTitle.nth(1).textContent();

      await test.step('Click on "Previous month" button', async () => {
        await headPrev.click();
        await expect(headTitle.first()).not.toHaveText(initialTitle1!);
        await expect(headTitle.nth(1)).not.toHaveText(initialTitle2!);
      });

      await test.step('Click on "Next month" button', async () => {
        await headNext.click();
        await expect(headTitle.first()).toHaveText(initialTitle1!);
        await expect(headTitle.nth(1)).toHaveText(initialTitle2!);
      });
    });
    let expectedInputValue15 = '';
    await test.step('Select date cells and validate input values', async () => {
      await cells.nth(10).click();
      const inputValue = await input.nth(0).inputValue();
      const calendarAriaLabel = await cells.nth(10).getAttribute('aria-label');
      const expectedInputValue = formatAriaLabelToInputValue(calendarAriaLabel);

      await expect(inputValue).toBe(expectedInputValue);
      await expect(popper).toBeVisible();

      await cells.nth(15).click();
      const inputValue15 = await input.nth(1).inputValue();
      const calendarAriaLabel15 = await cells.nth(15).getAttribute('aria-label');
      expectedInputValue15 = formatAriaLabelToInputValue(calendarAriaLabel15);
      await expect(inputValue15).toBe(expectedInputValue15);
    });

    await test.step('Reset the selected dates', async () => {
      await cells.nth(15).click();
      await page.waitForTimeout(300);

      const inputValue1 = await input.nth(0).inputValue();
      const inputValue15_1 = await input.nth(1).inputValue();

      await expect(inputValue1).toBe(expectedInputValue15);
      await expect(inputValue15_1).toBe('');

      await cells.nth(15).click();
      const inputValue2 = await input.nth(0).inputValue();
      const inputValue15_2 = await input.nth(1).inputValue();
      await expect(inputValue15_2).toBe(expectedInputValue15);
      await expect(inputValue2).toBe(expectedInputValue15);
    });

    await test.step('Click on apply and check input values', async () => {
      await cells.nth(20).click();
      await cells.nth(25).click();
      await apply.click();

      const inputValue20 = await input.nth(0).inputValue();
      const calendarAriaLabel20 = await cells.nth(20).getAttribute('aria-label');
      const expectedInputValue20 = formatAriaLabelToInputValue(calendarAriaLabel20);
      await expect(inputValue20).toBe(expectedInputValue20);

      const inputValue25 = await input.nth(1).inputValue();
      const calendarAriaLabel25 = await cells.nth(25).getAttribute('aria-label');
      const expectedInputValue25 = formatAriaLabelToInputValue(calendarAriaLabel25);
      await expect(inputValue25).toBe(expectedInputValue25);
    });

    await test.step('Reset date selection and validate input', async () => {
      await datePicker.nth(2).click();
      await reset.click();
      const inputValueReset1 = await input.nth(0).inputValue();
      const inputValueReset2 = await input.nth(1).inputValue();
      await expect(inputValueReset1).toBe('');
      await expect(inputValueReset2).toBe('');
      await expect(popper).not.toBeVisible();
    });

    await test.step('Click on buttons and check input values', async () => {
      await datePicker.nth(2).click();
      await buttons.nth(3).click();
      const inputValueDate1 = await input.nth(0).inputValue();
      const inputValueDate2 = await input.nth(1).inputValue();
      await expect(inputValueDate1).not.toBe('');
      await expect(inputValueDate2).not.toBe('');
    });
  });

  test('Verify Date range picker keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="DateRangePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DateRangePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DateRangePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DateRangePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DateRangePicker.Next"]');
    const buttons = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="DateRangePicker.Trigger"]');
    const apply = page.locator('[data-ui-name="DateRangePicker.Apply"]');
    const reset = page.locator('[data-ui-name="DateRangePicker.Reset"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(popper).toBeVisible();
    await expect(datePicker.nth(4)).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(popper).not.toBeVisible();

    await page.keyboard.press('Space');
    await expect(popper).toBeVisible();
    await expect(datePicker.nth(4)).not.toBeFocused();
    await expect(popper).toBeFocused();

    if (browserName === 'webkit') return;

    await page.keyboard.press('Tab');
    await expect(headPrev).toBeFocused();
    await headPrev.hover();
    const [initialTitleFrom, initialTitleTo] = await Promise.all([
      headTitle.first().textContent(),
      headTitle.nth(1).textContent(),
    ]);

    await page.keyboard.press('Enter');
    const [titleAfterFirstEnterFrom, titleAfterFirstEnterTo] = await Promise.all([
      headTitle.first().textContent(),
      headTitle.nth(1).textContent(),
    ]);
    expect(titleAfterFirstEnterFrom).not.toBe(initialTitleFrom);
    expect(titleAfterFirstEnterTo).not.toBe(initialTitleTo);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(headNext).toBeFocused();

    await page.keyboard.press('Enter');
    const [titleAfterSecondEnterFrom, titleAfterSecondEnterTo] = await Promise.all([
      headTitle.first().textContent(),
      headTitle.nth(1).textContent(),
    ]);
    expect(titleAfterSecondEnterFrom).toBe(initialTitleFrom);
    expect(titleAfterSecondEnterTo).toBe(initialTitleTo);

    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('[data-ui-name="DateRangePicker.Calendar"]').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(buttons.first()).toBeFocused();

    for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
    await expect(apply).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(reset).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(popper).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    const [initialValue1, initialValue2] = await Promise.all([
      input.nth(2).inputValue(),
      input.nth(3).inputValue(),
    ]);

    await page.keyboard.press('Escape');
    const [value1_1, value2_1] = await Promise.all([
      input.nth(2).inputValue(),
      input.nth(3).inputValue(),
    ]);
    expect(value1_1).toBe(initialValue1);
    expect(value2_1).toBe(initialValue2);

    await page.keyboard.press('Space');
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
    const [value1_4, value2_4] = await Promise.all([
      input.nth(2).inputValue(),
      input.nth(3).inputValue(),
    ]);
    expect(value1_4).toBe(initialValue1);
    expect(value2_4).toBe(initialValue2);

    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Space');

    for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const [value1_6, value2_6] = await Promise.all([
      input.nth(2).inputValue(),
      input.nth(3).inputValue(),
    ]);
    expect(value1_6).not.toBe(value1_4);
    expect(value2_6).not.toBe(value2_4);

    await page.keyboard.press('Space');

    for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(popper).not.toBeVisible();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
    await expect(reset).toBeFocused();

    await page.keyboard.press('Space');
    await page.waitForTimeout(300);
    const [value1_5, value2_5] = await Promise.all([
      input.nth(2).inputValue(),
      input.nth(3).inputValue(),
    ]);
    expect(value1_5).toBe(initialValue1);
    expect(value2_5).toBe(initialValue2);
    await expect(popper).not.toBeVisible();
  });
});

test.describe('Date Range picker with custom ranges', () => {
  test('Verify Range picker with custom ranges styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');

    await page.keyboard.type('0505202310052023');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Date range picker props', () => {
  test('Verify all date range picker props work good', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/day-range-picker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page).toHaveScreenshot();

    const cells = page.locator('[role="gridcell"]');

    await cells.nth(3).hover();
    await expect(page).toHaveScreenshot();

    const apply = page.locator('[data-ui-name="DateRangePicker.Apply"]');

    await apply.hover();
    await expect(page).toHaveScreenshot();
  });

  test('Verify  date range picker period work good', async ({ page }) => {
    const standPath =
      'stories/components/date-picker/tests/examples/day-range-picker-perios-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Week picker', () => {
  test('Verify Week picker trigger when entering date manually', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/week_picker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="DateRangePicker.Trigger"]');
    const screenshotsClip = (await datePicker.first().boundingBox())!;
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

  const setupDatePicker = async (page: any) => {
    const standPath = 'stories/components/date-picker/docs/examples/week_picker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="DateRangePicker.Trigger"]');
    const popper = await page.locator('[data-ui-name="DateRangePicker.Popper"]');

    await page.keyboard.press('Tab');
    await page.keyboard.type('05012020');

    await datePicker.first().click();
    return { datePicker, popper };
  };

  test('Verify week picker interacting by mouse', async ({ page }) => {
    const { datePicker, popper } = await setupDatePicker(page);

    await expect(page).toHaveScreenshot();

    const cells = page.locator('[data-ui-name="CalendarDays.Unit"]');
    await cells.nth(15).click(); // Select a day
    await expect(popper).not.toBeVisible();
  });

  test('Verify week picker interacting by keyboard', async ({ page }) => {
    const { datePicker, popper } = await setupDatePicker(page);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();
  });
});
