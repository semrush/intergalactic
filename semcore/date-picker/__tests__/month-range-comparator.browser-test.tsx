import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('MonthRangeComparator range', () => {
  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator(
      'button[data-ui-name="MonthDateRangeComparator.Trigger"]',
    );

    await test.step('Verify trigger attributes', async () => {
      await expect(datePickerTrigger).toHaveAttribute('tabindex', '0');
      await expect(datePickerTrigger).toHaveAttribute('aria-haspopup', 'dialog');
      await expect(datePickerTrigger).toHaveAttribute('role', 'button');
      await expect(datePickerTrigger).toHaveAttribute('type', 'button');
    });

    await test.step('Verify trigger svg attributes', async () => {
      const svg = datePickerTrigger.locator('svg');
      await expect(svg).toHaveAttribute('tabindex', '-1');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
      await expect(svg).toHaveAttribute('width', '16');
      await expect(svg).toHaveAttribute('height', '16');
    });

    // Trigger click to open the popper
    datePickerTrigger.click();
    const popper = page.locator('[data-ui-name="MonthDateRangeComparator.Popper"]');

    await test.step('Verify popper attributes', async () => {
      await expect(popper).toHaveAttribute('tabindex', '0');
      await expect(popper).toHaveAttribute('role', 'dialog');
      await expect(popper).toHaveAttribute('data-popper-placement', 'bottom-start');
    });

    await test.step('Verify popper input attributes', async () => {
      const inputValue = page.locator('[data-ui-name="MonthDateRangeComparator.ValueDateRange"]');
      await expect(inputValue.first()).toHaveAttribute('aria-label', 'Date field');

      const compareValue = page.locator(
        '[data-ui-name="MonthDateRangeComparator.CompareDateRange"]',
      );
      await expect(compareValue.first()).toHaveAttribute('aria-label', 'Date field');
      await expect(compareValue.first()).toHaveAttribute('disabled', '');

      const checkbox = page.locator('[data-ui-name="Checkbox.Value"]');
      await expect(checkbox).toHaveAttribute('type', 'checkbox');
      await expect(checkbox).toHaveAttribute('aria-invalid', 'false');

      const inputsValue = page.locator(
        'input[data-ui-name="MonthDateRangeComparator.ValueDateRange"]',
      );
      const count = await inputsValue.count();

      for (let i = 0; i < count; i++) {
        const input = inputsValue.nth(i);
        await expect(input).toHaveAttribute('type', 'text');
        await expect(input).toHaveAttribute('inputmode', 'numeric');
        await expect(input).toHaveAttribute('aria-invalid', 'false');
      }

      const compareValueInputs = page.locator(
        'input[data-ui-name="MonthDateRangeComparator.CompareDateRange"]',
      );
      const count1 = await compareValueInputs.count();

      for (let i = 0; i < count1; i++) {
        const input = compareValueInputs.nth(i);
        await expect(input).toHaveAttribute('type', 'text');
        await expect(input).toHaveAttribute('inputmode', 'numeric');
        await expect(input).toHaveAttribute('aria-invalid', 'false');
      }

      const calendars = page.locator('[data-name="Calendar"]');
      const count2 = await calendars.count();

      for (let i = 0; i < count2; i++) {
        const calendar = calendars.nth(i);
        await expect(calendar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify calendar header attributes', async () => {
      const headPrev = page.locator('[data-ui-name="MonthDateRangeComparator.Prev"]');
      await expect(headPrev).toHaveAttribute('type', 'button');
      await expect(headPrev).toHaveAttribute('aria-label', 'Previous year');

      const headTitle = page.locator('[data-ui-name="MonthDateRangeComparator.Title"]');
      await expect(headTitle.first()).toHaveAttribute('aria-live', 'polite');
      await expect(headTitle.nth(1)).toHaveAttribute('aria-live', 'polite');

      const headNext = page.locator('[data-ui-name="MonthDateRangeComparator.Next"]');
      await expect(headNext).toHaveAttribute('type', 'button');
      await expect(headNext).toHaveAttribute('aria-label', 'Next year');
    });

    await test.step('Verify calendar attributes', async () => {
      const calendars = page.locator('[data-ui-name="MonthDateRangeComparator.Calendar"]');
      const count = await calendars.count();

      for (let i = 0; i < count; i++) {
        const calendar = calendars.nth(i);
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

    const periodButtons = page.locator(
      '[data-ui-name="MonthDateRangeComparator.Periods.Options"] button',
    );

    await test.step('Verify Period buttons attributes', async () => {
      const count = await periodButtons.count();

      for (let i = 0; i < count; i++) {
        const button = periodButtons.nth(i);
        await expect(button).toHaveAttribute('type', 'button');
        await expect(button).toHaveAttribute('role', 'option');
      }
    });

    await test.step('Verify Apply button attributes', async () => {
      const apply = page.locator('[data-ui-name="MonthDateRangeComparator.Apply"]');
      await expect(apply).toHaveAttribute('type', 'button');
    });

    await test.step('Verify Reset button attributes', async () => {
      const reset = page.locator('[data-ui-name="MonthDateRangeComparator.Reset"]');
      await expect(reset).toHaveAttribute('type', 'button');
    });
  });

  test('Verify month range comparator styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="MonthDateRangeComparator.Trigger"]');
    const header = page.locator('[data-ui-name="MonthDateRangeComparator.Header"]');
    const calendars = page.locator('[data-name="Calendar"]');
    const cells = page.locator('[data-ui-name="CalendarMonths.Unit"]');
    const apply = page.locator('[data-ui-name="MonthDateRangeComparator.Apply"]');

    const checkStyle = async (element: any, expectedStyles: Record<string, string>) => {
      for (const [property, expectedValue] of Object.entries(expectedStyles)) {
        const actualValue = await element.evaluate(
          (el: any, property: any) => getComputedStyle(el)[property],
          property,
        );
        expect(actualValue).toBe(expectedValue);
      }
    };

    await trigger.click();
    await page.waitForTimeout(300);

    await test.step('Verify header and calendar styles', async () => {
      await checkStyle(header, { padding: '16px' });

      const count = await calendars.count();
      for (let i = 0; i < count; i++) {
        const calendar = calendars.nth(i);
        await expect(calendar).toHaveAttribute('width', '16');
        await expect(calendar).toHaveAttribute('height', '16');
        await checkStyle(calendar, {
          paddingLeft: '8px',
          paddingRight: '8px',
        });
      }
    });

    await test.step('Verify style of available date', async () => {
      const cell = cells.nth(2);
      await checkStyle(cell, {
        color: 'rgb(25, 27, 35)',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '4px 0px 0px',
      });
    });

    await cells.nth(10).click();
    await cells.nth(11).click();
    await apply.click();

    await trigger.click();

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
      await checkStyle(apply, {
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(0, 143, 248)',
      });
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

    return `${month}/${year}`;
  }

  test('Month range comparator mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="MonthDateRangeComparator.Trigger"]');
    const popper = page.locator('[data-ui-name="MonthDateRangeComparator.Popper"]');
    const headPrev = page.locator('[data-ui-name="MonthDateRangeComparator.Prev"]');
    const headTitle = page.locator('[data-ui-name="MonthDateRangeComparator.Title"]');
    const headNext = page.locator('[data-ui-name="MonthDateRangeComparator.Next"]');
    const buttons = page.locator('[data-ui-name="Button"]');
    const inputFrom = page.locator('input[data-ui-name="MonthDateRangeComparator.ValueDateRange"]');
    const inputTo = page.locator('input[data-ui-name="MonthDateRangeComparator.CompareDateRange"]');
    const toggle = page.locator('[data-ui-name="MonthDateRangeComparator.CompareToggle"]');
    const apply = page.locator('[data-ui-name="MonthDateRangeComparator.Apply"]');
    const reset = page.locator('[data-ui-name="MonthDateRangeComparator.Reset"]');

    await datePicker.click();
    await expect(popper).toBeVisible();
    await page.waitForTimeout(300);
    await datePicker.click();
    await expect(popper).not.toBeVisible();
    await page.waitForTimeout(100);

    await datePicker.click();
    await page.waitForTimeout(300);

    const initialTitle1 = await headTitle.first().textContent();
    const initialTitle2 = await headTitle.nth(1).textContent();

    await headPrev.click();

    await expect(headTitle.first()).not.toHaveText(initialTitle1!);
    await expect(headTitle.nth(1)).not.toHaveText(initialTitle2!);

    await headNext.click();
    await expect(headTitle.first()).toHaveText(initialTitle1!);
    await expect(headTitle.nth(1)).toHaveText(initialTitle2!);

    const cells = page.locator('[role="gridcell"]');

    await cells.nth(10).click();
    const inputValue_1 = await inputFrom.nth(0).inputValue();
    const inputValue_2 = await inputFrom.nth(1).inputValue();
    const calendarAriaLabel = await cells.nth(10).getAttribute('aria-label');
    const expectedInputValue = formatAriaLabelToInputValue(calendarAriaLabel);

    await expect(inputValue_1).toBe(expectedInputValue);
    await expect(inputValue_2).toBe('');

    await expect(popper).toBeVisible();
    await cells.nth(15).click();
    const inputValue_22 = await inputFrom.nth(1).inputValue();

    const calendarAriaLabel22 = await cells.nth(15).getAttribute('aria-label');
    const expectedInputValue22 = formatAriaLabelToInputValue(calendarAriaLabel22);
    await expect(inputValue_22).toBe(expectedInputValue22);

    await expect(popper).toBeVisible();

    await cells.nth(15).click();
    await page.waitForTimeout(300);
    const inputValue15_1 = await inputFrom.nth(0).inputValue();
    const inputValue15_2 = await inputFrom.nth(1).inputValue();

    await expect(inputValue15_1).toBe(expectedInputValue22);
    await expect(inputValue15_2).toBe('');

    await cells.nth(15).click();
    const inputValue_15_3 = await inputFrom.nth(0).inputValue();
    const inputValue15_3 = await inputFrom.nth(1).inputValue();
    await expect(inputValue_15_3).toBe(expectedInputValue22);
    await expect(inputValue15_3).toBe(expectedInputValue22);

    await toggle.click();

    await cells.nth(5).click();
    const inputValueTo_1 = await inputTo.nth(0).inputValue();
    const inputValueTo_2 = await inputTo.nth(1).inputValue();

    const calendarAriaLabel_1 = await cells.nth(5).getAttribute('aria-label');
    const expectedInputValue50 = formatAriaLabelToInputValue(calendarAriaLabel_1);

    await expect(inputValueTo_1).toBe(expectedInputValue50);
    await expect(inputValueTo_2).toBe('');

    await cells.nth(8).click();

    const inputValueTo_11 = await inputTo.nth(0).inputValue();
    const inputValueTo_21 = await inputTo.nth(1).inputValue();

    const calendarAriaLabel_2 = await cells.nth(8).getAttribute('aria-label');
    const expectedInputValue55 = formatAriaLabelToInputValue(calendarAriaLabel_2);

    await expect(inputValueTo_11).toBe(expectedInputValue50);
    await expect(inputValueTo_21).toBe(expectedInputValue55);

    await apply.click();
    await expect(popper).not.toBeVisible();
    await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).not.toHaveText(
      'Select date ranges',
    );

    await datePicker.click();
    await page.waitForTimeout(200);
    await reset.click();
    await expect(popper).not.toBeVisible();
    await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).toHaveText(
      'Select date ranges',
    );

    await datePicker.click();
    await page.waitForTimeout(200);
    await buttons.nth(1).click();
    await expect(popper).toBeVisible();
    await apply.click();
    await expect(popper).not.toBeVisible();
    await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).not.toHaveText(
      'Select date ranges',
    );

    await datePicker.click();
    await page.waitForTimeout(200);
    await inputFrom.first().fill('05.2022');
    await inputFrom.nth(1).fill('08.2022');
    await toggle.click();
    await inputTo.first().fill('06.2022');
    await inputTo.nth(1).fill('10.2022');
    await apply.click();
    await page.waitForTimeout(100);
    await expect(page).toHaveScreenshot();

    await datePicker.click();
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Month range comparator keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="MonthDateRangeComparator.Trigger"]');
    const popper = page.locator('[data-ui-name="MonthDateRangeComparator.Popper"]');
    const headPrev = page.locator('[data-ui-name="MonthDateRangeComparator.Prev"]');
    const headTitle = page.locator('[data-ui-name="MonthDateRangeComparator.Title"]');
    const headNext = page.locator('[data-ui-name="MonthDateRangeComparator.Next"]');
    const buttons = page.locator('[data-ui-name="Button"]');
    const inputFrom = page.locator('input[data-ui-name="MonthDateRangeComparator.ValueDateRange"]');
    const inputTo = page.locator('input[data-ui-name="MonthDateRangeComparator.CompareDateRange"]');
    const apply = page.locator('[data-ui-name="MonthDateRangeComparator.Apply"]');
    const reset = page.locator('[data-ui-name="MonthDateRangeComparator.Reset"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await datePicker.hover();
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(popper).toBeVisible();

    await expect(datePicker).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(popper).not.toBeVisible();

    await page.keyboard.press('Space');
    await page.waitForTimeout(300);
    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('To Date field').first()).toBeFocused();

    if (browserName === 'webkit') return; // works not ctable in test browser

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Checkbox.Value"]')).toBeFocused();

    const [initialTitleFrom, initialTitleTo] = await Promise.all([
      headTitle.first().textContent(),
      headTitle.nth(1).textContent(),
    ]);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter'); // space doesn't work - bug!
    await page.waitForTimeout(50);

    const [titleAfterFirstEnterFrom, titleAfterFirstEnterTo] = await Promise.all([
      headTitle.first().textContent(),
      headTitle.nth(1).textContent(),
    ]);

    expect(titleAfterFirstEnterFrom).not.toBe(initialTitleFrom);
    expect(titleAfterFirstEnterTo).not.toBe(initialTitleTo);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(headNext).toBeFocused();

    await page.keyboard.press('Enter'); // space doesn't work - bug!
    await page.waitForTimeout(50);

    const [titleAfterSecondEnterFrom, titleAfterSecondEnterTo] = await Promise.all([
      headTitle.first().textContent(),
      headTitle.nth(1).textContent(),
    ]);
    expect(titleAfterSecondEnterFrom).toBe(initialTitleFrom);
    expect(titleAfterSecondEnterTo).toBe(initialTitleTo);

    await page.keyboard.press('Shift+Tab');
    await expect(
      page.locator('[data-ui-name="MonthDateRangeComparator.Calendar"]').first(),
    ).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(50);
    await expect(buttons.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(50);
    await expect(apply).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(reset).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(popper).toBeFocused();

    const [initialFrom1, initialFrom2] = await Promise.all([
      inputFrom.nth(0).inputValue(),
      inputFrom.nth(1).inputValue(),
    ]);

    await page.keyboard.press('ArrowLeft');

    const [afterLeftFrom1, afterLeftFrom2] = await Promise.all([
      inputFrom.nth(0).inputValue(),
      inputFrom.nth(1).inputValue(),
    ]);

    expect(afterLeftFrom1).toBe(initialFrom1);
    expect(afterLeftFrom2).toBe(initialFrom2);

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Space');
    await page.waitForTimeout(50);

    const [afterUpFrom1, afterUpFrom2] = await Promise.all([
      inputFrom.nth(0).inputValue(),
      inputFrom.nth(1).inputValue(),
    ]);

    expect(afterUpFrom1).not.toBe(afterLeftFrom1);
    expect(afterUpFrom2).toBe(afterLeftFrom2);

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Space');
    await page.waitForTimeout(100);

    const [afterRightFrom1, afterRightFrom2] = await Promise.all([
      inputFrom.nth(0).inputValue(),
      inputFrom.nth(1).inputValue(),
    ]);

    expect(afterRightFrom1).toBe(afterUpFrom1);
    expect(afterRightFrom2).not.toBe(afterUpFrom2);

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');

    await page.keyboard.press('Space');
    await page.waitForTimeout(100);

    await page.keyboard.press('Tab');
    await expect(
      page.locator('[data-ui-name="MonthDateRangeComparator.CompareDateRange"]').nth(2),
    ).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(headPrev).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowLeft');

    const [initialTo1, initialTo2] = await Promise.all([
      inputTo.nth(0).inputValue(),
      inputTo.nth(1).inputValue(),
    ]);

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Space');

    const [afterUpTo1, afterUpTo2] = await Promise.all([
      inputTo.nth(0).inputValue(),
      inputTo.nth(1).inputValue(),
    ]);

    expect(afterUpTo1).not.toBe(initialTo1);
    expect(afterUpTo2).toBe(initialTo2);

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Space');
    await page.waitForTimeout(50);

    const [afterRightTo1, afterRightTo2] = await Promise.all([
      inputTo.nth(0).inputValue(),
      inputTo.nth(1).inputValue(),
    ]);

    expect(afterRightTo1).toBe(afterUpTo1);
    expect(afterRightTo2).not.toBe(afterUpTo2);

    const [finalFrom1, finalFrom2] = await Promise.all([
      inputFrom.nth(0).inputValue(),
      inputFrom.nth(1).inputValue(),
    ]);

    expect(finalFrom1).toBe(afterRightFrom1);
    expect(finalFrom2).toBe(afterRightFrom2);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(apply).toBeFocused();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(50);
    await expect(popper).not.toBeVisible();

    await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).not.toHaveText(
      'Select date ranges',
    );

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    for (let i = 0; i < 14; i++) await page.keyboard.press('Tab');
    await expect(reset).toBeFocused();

    await page.keyboard.press('Space');
    await page.waitForTimeout(300);

    await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').nth(1)).toHaveText(
      'Select date ranges',
    );
  });
});

test.describe('Month Range comparator with advanced use', () => {
  test('Verify mouse intearctions and styles of advanced use', async ({ page }) => {
    const standPath =
      'stories/components/date-picker/docs/examples/month_range_comparator_advanced_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="MonthDateRangeComparator.Trigger"]');
    const from = page.locator('[data-ui-name="MonthDateRangeComparator.ValueDateRange"]').first();
    const inputFrom = page.locator('input[data-ui-name="MonthDateRangeComparator.ValueDateRange"]');
    const to = page.locator('[data-ui-name="MonthDateRangeComparator.CompareDateRange"]').first();
    const inputTo = page.locator('input[data-ui-name="MonthDateRangeComparator.CompareDateRange"]');
    const toggle = page.locator('[data-ui-name="MonthDateRangeComparator.CompareToggle"]');
    const apply = page.locator('[data-ui-name="MonthDateRangeComparator.Apply"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await from.click();
    await inputFrom.first().fill('052022');
    await inputFrom.nth(1).fill('072022');

    await toggle.click();
    await to.click();
    await inputTo.first().fill('012023');
    await inputTo.nth(1).fill('082023');

    await apply.click();

    await datePicker.click();
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot();
  });
});
