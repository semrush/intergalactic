import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('DateRangeComparator range', () => {
  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = page
      .locator('button[data-ui-name="DateRangeComparator.Trigger"]')
      .first();
    const triggerAttributes = [
      { name: 'tabindex', value: '0' },
      { name: 'aria-haspopup', value: 'dialog' },
      { name: 'role', value: 'button' },
      { name: 'type', value: 'button' },
    ];

    await test.step('Verify trigger attributes', async () => {
      for (const { name, value } of triggerAttributes) {
        await expect(datePickerTrigger).toHaveAttribute(name, value);
      }
    });

    await test.step('Verify trigger svg attributes', async () => {
      const svg = datePickerTrigger.locator('svg');
      const svgAttributes = [
        { name: 'tabindex', value: '-1' },
        { name: 'aria-hidden', value: 'true' },
        { name: 'width', value: '16' },
        { name: 'height', value: '16' },
      ];
      for (const { name, value } of svgAttributes) {
        await expect(svg).toHaveAttribute(name, value);
      }
    });

    datePickerTrigger.click();
    const popper = page.locator('[data-ui-name="DateRangeComparator.Popper"]');
    const popperAttributes = [
      { name: 'tabindex', value: '0' },
      { name: 'role', value: 'dialog' },
      { name: 'data-popper-placement', value: 'bottom-start' },
    ];

    await test.step('Verify popper attributes', async () => {
      for (const { name, value } of popperAttributes) {
        await expect(popper).toHaveAttribute(name, value);
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

      const inputValues = page.locator('input[data-ui-name="DateRangeComparator.ValueDateRange"]');
      const compareValues = page.locator(
        'input[data-ui-name="DateRangeComparator.CompareDateRange"]',
      );

      const inputAttributesCommon = [
        { name: 'type', value: 'text' },
        { name: 'inputmode', value: 'numeric' },
        { name: 'aria-invalid', value: 'false' },
      ];

      const inputs = [inputValues, compareValues];

      for (const locator of inputs) {
        const count = await locator.count();
        for (let i = 0; i < count; i++) {
          const input = locator.nth(i);
          for (const { name, value } of inputAttributesCommon) {
            await expect(input).toHaveAttribute(name, value);
          }
        }
      }

      const calendars = page.locator('[data-name="Calendar"]');
      const calendarAttributes = [
        { name: 'tabindex', value: '-1' },
        { name: 'aria-hidden', value: 'true' },
      ];

      for (let i = 0; i < (await calendars.count()); i++) {
        const calendar = calendars.nth(i);
        for (const { name, value } of calendarAttributes) {
          await expect(calendar).toHaveAttribute(name, value);
        }
      }
    });

    await test.step('Verify calendar header attributes', async () => {
      const headerButtons = [
        { selector: '[data-ui-name="DateRangeComparator.Prev"]', ariaLabel: 'Previous month' },
        { selector: '[data-ui-name="DateRangeComparator.Next"]', ariaLabel: 'Next month' },
      ];

      for (const { selector, ariaLabel } of headerButtons) {
        const button = page.locator(selector);
        await expect(button).toHaveAttribute('type', 'button');
        await expect(button).toHaveAttribute('aria-label', ariaLabel);
      }

      const headTitle = page.locator('[data-ui-name="DateRangeComparator.Title"]');
      await expect(headTitle.first()).toHaveAttribute('aria-live', 'polite');
      await expect(headTitle.nth(1)).toHaveAttribute('aria-live', 'polite');
    });

    await test.step('Verify calendar attributes', async () => {
      const calendars = page.locator('[data-ui-name="DateRangeComparator.Calendar"]');
      const calendarAttributes = [
        { name: 'role', value: 'grid' },
        { name: 'disabled', value: '' },
      ];

      for (let i = 0; i < (await calendars.count()); i++) {
        const calendar = calendars.nth(i);
        for (const { name, value } of calendarAttributes) {
          await expect(calendar).toHaveAttribute(name, value);
        }

        const weekDaysrow = calendar.locator('[data-ui-name="CalendarWeekDays"]');
        await expect(weekDaysrow).toHaveAttribute('role', 'row');

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

    const period = page.locator('[data-ui-name="DateRangeComparator.Periods.Options"]');
    await test.step('Verify Period attributes', async () => {
      await expect(period).toHaveAttribute('role', 'listbox');
      await expect(period).toHaveAttribute('aria-label', 'Presets');
    });

    const periodButtons = page.locator(
      '[data-ui-name="DateRangeComparator.Periods.Options"][data-ui-name="Button"]',
    );
    await test.step('Verify Period button attributes', async () => {
      const count = await periodButtons.count();
      for (let i = 0; i < count; i++) {
        const button = periodButtons.nth(i);
        await expect(button).toHaveAttribute('type', 'button');
        await expect(button).toHaveAttribute('role', 'option');
        await expect(button).toHaveAttribute('tabindex', '0');
      }
    });

    const applyButton = page.locator('[data-ui-name="DateRangeComparator.Apply"]');
    await test.step('Verify Apply button attributes', async () => {
      await expect(applyButton).toHaveAttribute('type', 'button');
    });

    const resetButton = page.locator('[data-ui-name="DateRangeComparator.Reset"]');
    await test.step('Verify Reset button attributes', async () => {
      await expect(resetButton).toHaveAttribute('type', 'button');
    });
  });

  test('Verify date range comparator styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="DateRangeComparator.Trigger"]');
    const dateRangeHeader = page.locator('[data-ui-name="DateRangeComparator.Header"]');
    const calendars = page.locator('[data-name="Calendar"]');
    const cells = page.locator('[data-ui-name="CalendarDays.Unit"]');
    const applyButton = page.locator('[data-ui-name="DateRangeComparator.Apply"]');
    const selectedCell = page.locator('[data-ui-name="CalendarDays.Unit"][class*="Selected"]');

    // Helper to check multiple style properties
    const checkStyle = async (element: any, expectedStyles: any) => {
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

    await test.step('Verify header margins and calendar paddings', async () => {
      await checkStyle(dateRangeHeader, { padding: '16px' });

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
      await checkStyle(cells.nth(2), {
        color: 'rgb(25, 27, 35)',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '4px 0px 0px',
      });
    });

    await test.step('Select dates', async () => {
      await cells.nth(10).click();
      await cells.nth(11).click();
      await applyButton.click();
      await trigger.click();
    });

    await test.step('Verify style of selected date', async () => {
      await checkStyle(selectedCell.nth(0), {
        margin: '4px 0px 0px',
        width: '32px',
        height: '32px',
      });
    });

    await test.step('Verify style for Apply picker button', async () => {
      await checkStyle(applyButton, {
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

    return `${month}/${day}/${year}`;
  }

  test('Verify Date comparator range mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="DateRangeComparator.Trigger"]');
    const popper = page.locator('[data-ui-name="DateRangeComparator.Popper"]');
    const headPrev = page.locator('[data-ui-name="DateRangeComparator.Prev"]');
    const headTitle = page.locator('[data-ui-name="DateRangeComparator.Title"]');
    const headNext = page.locator('[data-ui-name="DateRangeComparator.Next"]');
    const buttons = page.locator('[data-ui-name="Button"]');
    const inputFrom = page.locator('input[data-ui-name="DateRangeComparator.ValueDateRange"]');
    const inputTo = page.locator('input[data-ui-name="DateRangeComparator.CompareDateRange"]');
    const toggle = page.locator('[data-ui-name="DateRangeComparator.CompareToggle"]');
    const apply = page.locator('[data-ui-name="DateRangeComparator.Apply"]');
    const reset = page.locator('[data-ui-name="DateRangeComparator.Reset"]');
    const cells = page.locator('[role="gridcell"]');

    let initialTitle1: string | null = '';
    let initialTitle2: string | null = '';
    let expectedInputValue = '';
    let expectedInputValue22 = '';
    let expectedInputValue50 = '';
    let expectedInputValue55 = '';

    await test.step('Open and close calendar', async () => {
      await datePicker.click();
      await page.waitForTimeout(200);
      await expect(popper).toBeVisible();
      await datePicker.click();
      await expect(popper).not.toBeVisible();
      await datePicker.click();
      await page.waitForTimeout(200);
    });

    await test.step('Navigate months using header buttons', async () => {
      initialTitle1 = await headTitle.first().textContent();
      initialTitle2 = await headTitle.nth(1).textContent();

      await headPrev.click();
      await expect(headTitle.first()).not.toHaveText(initialTitle1!);
      await expect(headTitle.nth(1)).not.toHaveText(initialTitle2!);

      await headNext.click();
      await expect(headTitle.first()).toHaveText(initialTitle1!);
      await expect(headTitle.nth(1)).toHaveText(initialTitle2!);
    });

    await test.step('Select first date in from input', async () => {
      await cells.nth(10).click();
      await page.waitForTimeout(50);
      const inputValue_1 = await inputFrom.nth(0).inputValue();
      const inputValue_2 = await inputFrom.nth(1).inputValue();
      const calendarAriaLabel = await cells.nth(10).getAttribute('aria-label');

      expectedInputValue = formatAriaLabelToInputValue(calendarAriaLabel);

      await expect(inputValue_1).toBe(expectedInputValue);
      await expect(inputValue_2).toBe('');
    });

    await test.step('Select second date in from input', async () => {
      await expect(popper).toBeVisible();
      await cells.nth(15).click();
      await page.waitForTimeout(50);
      const inputValue_2 = await inputFrom.nth(1).inputValue();
      const calendarAriaLabel22 = await cells.nth(15).getAttribute('aria-label');

      expectedInputValue22 = formatAriaLabelToInputValue(calendarAriaLabel22);
      await expect(inputValue_2).toBe(expectedInputValue22);
    });

    await test.step('Reset from input values by clicking same cell', async () => {
      await expect(popper).toBeVisible();
      await cells.nth(15).click();
      await page.waitForTimeout(100);

      const inputValue1 = await inputFrom.nth(0).inputValue();
      const inputValue2 = await inputFrom.nth(1).inputValue();

      await expect(inputValue1).toBe(expectedInputValue22);
      await expect(inputValue2).toBe('');
    });

    await test.step('Confirm both from inputs set to same date', async () => {
      await cells.nth(15).click();

      const inputValue1 = await inputFrom.nth(0).inputValue();
      const inputValue2 = await inputFrom.nth(1).inputValue();

      await expect(inputValue1).toBe(expectedInputValue22);
      await expect(inputValue2).toBe(expectedInputValue22);
    });

    await test.step('Switch to "compare" mode', async () => {
      await toggle.click();
    });

    await test.step('Select first date in to input', async () => {
      await cells.nth(50).click();
      await page.waitForTimeout(50);
      const inputValue1 = await inputTo.nth(0).inputValue();
      const inputValue2 = await inputTo.nth(1).inputValue();
      const calendarAriaLabel50 = await cells.nth(50).getAttribute('aria-label');

      expectedInputValue50 = formatAriaLabelToInputValue(calendarAriaLabel50);

      await expect(inputValue1).toBe(expectedInputValue50);
      await expect(inputValue2).toBe('');
    });

    await test.step('Select second date in to input', async () => {
      await cells.nth(55).click();
      await page.waitForTimeout(50);
      const inputValue1 = await inputTo.nth(0).inputValue();
      const inputValue2 = await inputTo.nth(1).inputValue();
      const calendarAriaLabel55 = await cells.nth(55).getAttribute('aria-label');

      expectedInputValue55 = formatAriaLabelToInputValue(calendarAriaLabel55);

      await expect(inputValue1).toBe(expectedInputValue50);
      await expect(inputValue2).toBe(expectedInputValue55);
    });

    await test.step('Apply selection and close calendar', async () => {
      await apply.click();
      await page.waitForTimeout(50);
      await expect(popper).not.toBeVisible();
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').first()).not.toHaveText(
        'Select date ranges',
      );
    });

    await test.step('Reset selections', async () => {
      await datePicker.click();
      await page.waitForTimeout(200);
      await reset.click();
      await expect(popper).not.toBeVisible();
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').first()).toHaveText(
        'Select date ranges',
      );
    });

    await test.step('Open calendar and close with Sange selection', async () => {
      await datePicker.click();
      await page.waitForTimeout(200);
      await buttons.nth(1).click();
      await expect(popper).toBeVisible();
      await apply.click();
      await expect(popper).not.toBeVisible();
      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').first()).not.toHaveText(
        'Select date ranges',
      );
    });
  });

  test('Verify Date range comparator keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
    await page.setContent(await e2eStandToHtml(standPath, 'en'));

    const getInputValues = async (locator: any) => ({
      from: await locator.nth(0).inputValue(),
      to: await locator.nth(1).inputValue(),
    });

    const datePicker = page.locator('[data-ui-name="DateRangeComparator.Trigger"]');
    const popper = page.locator('[data-ui-name="DateRangeComparator.Popper"]');
    const headTitle = page.locator('[data-ui-name="DateRangeComparator.Title"]');
    const inputFrom = page.locator('input[data-ui-name="DateRangeComparator.ValueDateRange"]');
    const inputTo = page.locator('input[data-ui-name="DateRangeComparator.CompareDateRange"]');
    const apply = page.locator('[data-ui-name="DateRangeComparator.Apply"]');
    const reset = page.locator('[data-ui-name="DateRangeComparator.Reset"]');
    const headPrev = page.locator('[data-ui-name="DateRangeComparator.Prev"]');
    const headNext = page.locator('[data-ui-name="DateRangeComparator.Next"]');

    if (browserName === 'webkit') return;

    await test.step('Open and close calendar using keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);

      await page.keyboard.press('Tab');
      await page.keyboard.type('04042024');
      await page.keyboard.type('04042024');

      for (let i = 0; i < 9; i++) await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      await expect(popper).not.toBeVisible();
      await expect(datePicker).toBeFocused();

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
    });

    await test.step('Navigate months backwards and forwards', async () => {
      const initial = {
        from: await headTitle.first().textContent(),
        to: await headTitle.nth(1).textContent(),
      };

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(headPrev).toBeFocused();
      await page.keyboard.press('Enter');

      const changed = {
        from: await headTitle.first().textContent(),
        to: await headTitle.nth(1).textContent(),
      };

      expect(changed.from).not.toBe(initial.from);
      expect(changed.to).not.toBe(initial.to);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(headNext).toBeFocused();
      await page.keyboard.press('Enter');

      const reverted = {
        from: await headTitle.first().textContent(),
        to: await headTitle.nth(1).textContent(),
      };

      expect(reverted.from).toBe(initial.from);
      expect(reverted.to).toBe(initial.to);
    });

    await test.step('Select From dates with keyboard', async () => {
      const initial = await getInputValues(inputFrom);

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      const unchanged = await getInputValues(inputFrom);
      expect(unchanged).toEqual(initial);

      await page.keyboard.press('Space');
      await page.waitForTimeout(50);

      const changed = await getInputValues(inputFrom);
      expect(changed.from).not.toBe(initial.from);
      expect(changed.to).not.toBe(initial.to);

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Space');

      const final = await getInputValues(inputFrom);
      expect(final.from).toBe(changed.from);
      expect(final.to).not.toBe(initial.to);
    });

    await test.step('Switch to Compare mode and select To dates', async () => {
      for (let i = 0; i < 3; i++) await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);

      for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const initial = await getInputValues(inputTo);
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Space');

      const mid = await getInputValues(inputTo);
      expect(mid.from).not.toBe(initial.from);
      expect(mid.to).toBe(initial.to);

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Space');

      const final = await getInputValues(inputTo);
      expect(final.from).toBe(mid.from);
      expect(final.to).not.toBe(mid.to);
    });

    await test.step('Apply and reset selected dates', async () => {
      for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
      await expect(apply).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(popper).not.toBeVisible();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);

      for (let i = 0; i < 14; i++) await page.keyboard.press('Tab');
      await expect(reset).toBeFocused();
      await page.keyboard.press('Space');
      await page.waitForTimeout(300);

      await expect(page.locator('[data-ui-name="LinkTrigger.Text"]').first()).toHaveText(
        'Select date ranges',
      );
    });
  });
});

test.describe('Date Range comparator with advanced use', () => {
  test('Verify mouse intearctions and styles of advanced use', async ({ page }) => {
    const standPath =
      'stories/components/date-picker/docs/examples/date_range_comparator_advanced_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="DateRangeComparator.Trigger"]');
    const from = page.locator('[data-ui-name="DateRangeComparator.ValueDateRange"]').first();
    const inputFrom = page.locator('input[data-ui-name="DateRangeComparator.ValueDateRange"]');
    const to = page.locator('[data-ui-name="DateRangeComparator.CompareDateRange"]').first();
    const inputTo = page.locator('input[data-ui-name="DateRangeComparator.CompareDateRange"]');
    const toggle = page.locator('[data-ui-name="DateRangeComparator.CompareToggle"]');
    const apply = page.locator('[data-ui-name="DateRangeComparator.Apply"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    await from.click();
    await inputFrom.first().fill('05052023');
    await inputFrom.nth(1).fill('05202023');

    await toggle.click();
    await to.click();
    await inputTo.first().fill('05012023');
    await inputTo.nth(1).fill('05182023');

    await apply.click();

    await datePicker.click();
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Date range comparator props', () => {
  test('Verify all date range comparator props work good', async ({ page, browserName }) => {
    if (browserName === 'webkit') return; //skipped for webkit because of unstable focus outline on the dialog
    const standPath =
      'stories/components/date-picker/tests/examples/date-range-comparator-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    const cells = page.locator('[role="gridcell"]');

    await cells.nth(20).hover();
    await expect(page).toHaveScreenshot();
  });
});
