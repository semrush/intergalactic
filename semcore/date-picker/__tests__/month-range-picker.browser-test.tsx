import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Month Range Trigger', () => {
  test('Verify trigger when entering date manually', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="MonthRangePicker.Trigger"]');
    const screenshotsClip = (await datePicker.nth(1).boundingBox())!;
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

  test('Verify trigger states and props', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/month-range-trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/date_range_comparator.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator(
      'button[data-ui-name="MonthDateRangeComparator.Trigger"]',
    );

    await test.step('Verify trigger attributes', async () => {
      const attributes = [
        ['tabindex', '0'],
        ['aria-haspopup', 'dialog'],
        ['role', 'button'],
        ['type', 'button'],
      ];

      for (const [attr, value] of attributes) {
        await expect(datePickerTrigger).toHaveAttribute(attr, value);
      }
    });

    await test.step('Verify trigger svg attributes', async () => {
      const svg = datePickerTrigger.locator('svg');
      const svgAttributes = [
        ['tabindex', '-1'],
        ['aria-hidden', 'true'],
        ['width', '16'],
        ['height', '16'],
      ];

      for (const [attr, value] of svgAttributes) {
        await expect(svg).toHaveAttribute(attr, value);
      }
    });

    await datePickerTrigger.click();
    const popper = page.locator('[data-ui-name="MonthDateRangeComparator.Popper"]');

    await test.step('Verify popper attributes', async () => {
      const attributes = [
        ['role', 'dialog'],
        ['data-popper-placement', 'bottom-start'],
      ];

      for (const [attr, value] of attributes) {
        await expect(popper).toHaveAttribute(attr, value);
      }
    });

    await test.step('Verify popper input attributes', async () => {
      const inputValue = page.locator('[data-ui-name="MonthDateRangeComparator.ValueDateRange"]');
      const compareValue = page.locator(
        '[data-ui-name="MonthDateRangeComparator.CompareDateRange"]',
      );
      const checkbox = page.locator('[data-ui-name="Checkbox.Value"]');

      await expect(inputValue.first()).toHaveAttribute('aria-label', 'Date field');
      await expect(compareValue.first()).toHaveAttribute('aria-label', 'Date field');
      await expect(compareValue.first()).toHaveAttribute('disabled', '');

      const checkboxAttributes = [
        ['type', 'checkbox'],
        ['aria-invalid', 'false'],
      ];
      for (const [attr, value] of checkboxAttributes) {
        await expect(checkbox).toHaveAttribute(attr, value);
      }

      const inputsValue = page.locator(
        'input[data-ui-name="MonthDateRangeComparator.ValueDateRange"]',
      );
      const inputsCompare = page.locator(
        'input[data-ui-name="MonthDateRangeComparator.CompareDateRange"]',
      );

      const checkInputAttributes = async (locator: any, tabindex: string) => {
        const count = await locator.count();
        for (let i = 0; i < count; i++) {
          const input = locator.nth(i);
          const attributes = [
            ['type', 'text'],
            ['inputmode', 'numeric'],
            ['aria-invalid', 'false'],
          ];
          for (const [attr, value] of attributes) {
            await expect(input).toHaveAttribute(attr, value);
          }
        }
      };

      const calendars = page.locator('[data-name="Calendar"]');
      const calendarCount = await calendars.count();
      for (let i = 0; i < calendarCount; i++) {
        const calendar = calendars.nth(i);
        await expect(calendar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify calendar header attributes', async () => {
      const headPrev = page.locator('[data-ui-name="MonthDateRangeComparator.Prev"]');
      const headTitle = page.locator('[data-ui-name="MonthDateRangeComparator.Title"]');
      const headNext = page.locator('[data-ui-name="MonthDateRangeComparator.Next"]');

      const prevAttributes = [
        ['type', 'button'],
        ['aria-label', 'Previous year'],
      ];
      const nextAttributes = [
        ['type', 'button'],
        ['aria-label', 'Next year'],
      ];

      for (const [attr, value] of prevAttributes) {
        await expect(headPrev).toHaveAttribute(attr, value);
      }

      for (const [attr, value] of nextAttributes) {
        await expect(headNext).toHaveAttribute(attr, value);
      }

      await expect(headTitle.first()).toHaveAttribute('aria-live', 'polite');
      await expect(headTitle.nth(1)).toHaveAttribute('aria-live', 'polite');
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
      const period = page.locator('[data-ui-name="MonthDateRangeComparator.Periods.Options"]');
      const attributes = [
        ['role', 'listbox'],
        ['aria-label', 'Presets'],
      ];
      for (const [attr, value] of attributes) {
        await expect(period).toHaveAttribute(attr, value);
      }
    });

    await test.step('Verify Period buttons attributes', async () => {
      const periodButtons = page.locator(
        '[data-ui-name="MonthDateRangeComparator.Periods.Options"] button',
      );
      const count = await periodButtons.count();

      for (let i = 0; i < count; i++) {
        const button = periodButtons.nth(i);
        const attributes = [
          ['type', 'button'],
          ['role', 'option'],
        ];
        for (const [attr, value] of attributes) {
          await expect(button).toHaveAttribute(attr, value);
        }
      }
    });

    await test.step('Verify Apply and Reset button attributes', async () => {
      const apply = page.locator('[data-ui-name="MonthDateRangeComparator.Apply"]');
      const reset = page.locator('[data-ui-name="MonthDateRangeComparator.Reset"]');

      const buttons = [apply, reset];
      for (const button of buttons) {
        await expect(button).toHaveAttribute('type', 'button');
      }
    });
  });

  test('Verify Month RangePicker styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="MonthRangePicker.Trigger"]').first();
    const prevButton = page.locator('[data-ui-name="MonthRangePicker.Prev"]');
    const cells = page.locator('[data-ui-name="CalendarMonths.Unit"]');
    const applyButton = page.locator('[data-ui-name="MonthRangePicker.Apply"]');
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

    await test.step('Verify trigger margins', async () => {
      await checkStyle(datePickerTrigger, { marginTop: '8px' });
    });

    await test.step('Verify SVG dimensions and paddings', async () => {
      const svg = datePickerTrigger.locator('svg');
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
      await datePickerTrigger.click();

      await checkStyle(cells.first(), {
        color: 'rgb(25, 27, 35)',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '4px 0px 0px',
      });
    });

    await test.step('Verify available date style', async () => {
      await checkStyle(cells.nth(2), {
        color: 'rgb(25, 27, 35)',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '4px 0px 0px',
      });
    });

    await test.step('Select range and open popper again', async () => {
      await cells.nth(10).click();
      await cells.nth(11).click();
      await applyButton.click();
      await datePickerTrigger.click();
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

    return `${month}/${year}`;
  }

  test('Verify Month RangePicker mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="MonthRangePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="MonthRangePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="MonthRangePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="MonthRangePicker.Title"]');
    const headNext = page.locator('[data-ui-name="MonthRangePicker.Next"]');
    const buttons = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="MonthRangePicker.Trigger"]');
    const apply = page.locator('[data-ui-name="MonthRangePicker.Apply"]');
    const reset = page.locator('[data-ui-name="MonthRangePicker.Reset"]');
    const cells = page.locator('[role="gridcell"]');

    await test.step('Open and close the date picker', async () => {
      await datePicker.nth(2).click();
      await expect(popper).toBeVisible();

      await datePicker.nth(3).click();
      await expect(popper).not.toBeVisible();
    });

    await test.step('Navigate months via header buttons', async () => {
      await datePicker.first().click();
      await page.waitForTimeout(300);

      const title1 = await headTitle.first().textContent();
      const title2 = await headTitle.nth(1).textContent();

      await headPrev.click();
      await expect(headTitle.first()).not.toHaveText(title1!);
      await expect(headTitle.nth(1)).not.toHaveText(title2!);

      await headNext.click();
      await expect(headTitle.first()).toHaveText(title1!);
      await expect(headTitle.nth(1)).toHaveText(title2!);
    });

    await test.step('Select start and end dates', async () => {
      await cells.nth(10).click();
      const label10 = await cells.nth(10).getAttribute('aria-label');
      await expect(input.nth(0)).toHaveValue(formatAriaLabelToInputValue(label10));

      await cells.nth(15).click();
      const label15 = await cells.nth(15).getAttribute('aria-label');
      await expect(input.nth(1)).toHaveValue(formatAriaLabelToInputValue(label15));
    });

    await test.step('Reselect start date and reset end', async () => {
      await cells.nth(15).click();
      await page.waitForTimeout(300);
      const label = await cells.nth(15).getAttribute('aria-label');

      await expect(input.nth(0)).toHaveValue(formatAriaLabelToInputValue(label));
      await expect(input.nth(1)).toHaveValue('');

      await cells.nth(15).click();
      await expect(input.nth(1)).toHaveValue(formatAriaLabelToInputValue(label));
    });

    await test.step('Select new date range', async () => {
      await cells.nth(17).click();
      const label17 = await cells.nth(17).getAttribute('aria-label');
      await expect(input.nth(0)).toHaveValue(formatAriaLabelToInputValue(label17));
      await expect(input.nth(1)).toHaveValue('');

      await cells.nth(20).click();
      const label20 = await cells.nth(20).getAttribute('aria-label');
      await expect(input.nth(1)).toHaveValue(formatAriaLabelToInputValue(label20));
    });

    await test.step('Click outside resets input values', async () => {
      await datePicker.nth(2).click();
      await expect(input.nth(0)).toHaveValue('');
      await expect(input.nth(1)).toHaveValue('');
    });

    await test.step('Apply a selected range', async () => {
      await datePicker.nth(2).click();
      await page.waitForTimeout(200);

      await cells.nth(5).click();
      await cells.nth(7).click();
      await apply.click();

      const startLabel = await cells.nth(5).getAttribute('aria-label');
      const endLabel = await cells.nth(7).getAttribute('aria-label');
      await expect(input.nth(0)).toHaveValue(formatAriaLabelToInputValue(startLabel));
      await expect(input.nth(1)).toHaveValue(formatAriaLabelToInputValue(endLabel));
    });

    await test.step('Reset via Reset button', async () => {
      await datePicker.nth(2).click();
      await page.waitForTimeout(200);

      await reset.click();
      await expect(input.nth(0)).toHaveValue('');
      await expect(input.nth(1)).toHaveValue('');
      await expect(popper).not.toBeVisible();
    });

    await test.step('Quick select today’s range', async () => {
      await datePicker.nth(2).click();
      await buttons.nth(3).click();

      await expect(input.nth(0)).not.toHaveValue('');
      await expect(input.nth(1)).not.toHaveValue('');
    });
  });

  test('Verify Month RangePicker keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const popper = page.locator('[data-ui-name="MonthRangePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="MonthRangePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="MonthRangePicker.Title"]');
    const headNext = page.locator('[data-ui-name="MonthRangePicker.Next"]');
    const buttons = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="MonthRangePicker.Trigger"]');
    const apply = page.locator('[data-ui-name="MonthRangePicker.Apply"]');
    const reset = page.locator('[data-ui-name="MonthRangePicker.Reset"]');

    const pressTab = async (times = 1) => {
      for (let i = 0; i < times; i++) {
        await page.keyboard.press('Tab');
      }
    };

    await test.step('Open popper using Enter key', async () => {
      await pressTab(3);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      await expect(popper).toBeVisible();
      await expect(popper).toBeFocused();
    });

    await test.step('Close popper using Escape key', async () => {
      await page.keyboard.press('Escape');
      await expect(popper).not.toBeVisible();
    });

    await test.step('Reopen popper using Space key', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);
      await expect(popper).toBeVisible();
      await expect(popper).toBeFocused();
    });

    await test.step('Navigate header controls with keyboard', async () => {
      await pressTab(1); // Focus Prev
      await expect(headPrev).toBeFocused();

      const [initialFrom, initialTo] = await Promise.all([
        headTitle.first().textContent(),
        headTitle.nth(1).textContent(),
      ]);

      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);

      const [updatedFrom, updatedTo] = await Promise.all([
        headTitle.first().textContent(),
        headTitle.nth(1).textContent(),
      ]);

      expect(updatedFrom).not.toBe(initialFrom);
      expect(updatedTo).not.toBe(initialTo);

      await pressTab(2); // Focus Next
      await expect(headNext).toBeFocused();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);

      await expect(headTitle.first()).toHaveText(initialFrom!);
      await expect(headTitle.nth(1)).toHaveText(initialTo!);
    });

    await test.step('Tab through calendar and action buttons', async () => {
      await page.keyboard.press('Shift+Tab'); // Calendar
      await expect(
        page.locator('[data-ui-name="MonthRangePicker.Calendar"]').first(),
      ).toBeFocused();

      await pressTab(2); //period button
      await expect(buttons.first()).toBeFocused();

      await pressTab(4); // Apply
      await expect(apply).toBeFocused();

      await pressTab(1); // Reset
      await expect(reset).toBeFocused();
    });

    await test.step('Select range using arrow keys and keyboard', async () => {
      await page.keyboard.press('Tab'); // Back to grid

      const [initialLeft, initialRight] = await Promise.all([
        input.nth(0).inputValue(),
        input.nth(1).inputValue(),
      ]);

      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Escape');

      await page.keyboard.press('Space');
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Space');
      await page.waitForTimeout(50);
      const [start, middle] = await Promise.all([
        input.nth(0).inputValue(),
        input.nth(1).inputValue(),
      ]);

      if (browserName !== 'webkit') {
        //works unstable on webkit in non debug mode
        expect(start).not.toBe(initialLeft);
        expect(middle).toBe(initialRight);
      }
      await page.keyboard.press('Space');
      await page.waitForTimeout(50);

      const [confirmedStart, confirmedEnd] = await Promise.all([
        input.nth(0).inputValue(),
        input.nth(1).inputValue(),
      ]);
      if (browserName !== 'webkit') {
        //wprks unstable on webkit in non debug mode
        expect(confirmedStart).toBe(start);
        expect(confirmedEnd).not.toBe(middle);
      }
      await page.keyboard.press('Escape');

      const [resetStart, resetEnd] = await Promise.all([
        input.nth(0).inputValue(),
        input.nth(1).inputValue(),
      ]);

      expect(resetStart).toBe(initialLeft);
      expect(resetEnd).toBe(initialRight);
    });

    await test.step('Apply range via keyboard interaction', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Space');

      await pressTab(6);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);

      const [left, right] = await Promise.all([
        input.nth(0).inputValue(),
        input.nth(1).inputValue(),
      ]);

      expect(left).not.toBe('');
      expect(right).not.toBe('');
    });

    await test.step('Reset range using keyboard', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(300);

      await pressTab(8); // Focus Reset
      await page.keyboard.press('Enter');

      const [left, right] = await Promise.all([
        input.nth(0).inputValue(),
        input.nth(1).inputValue(),
      ]);

      expect(left).toBe('');
      expect(right).toBe('');
      await expect(popper).not.toBeVisible();
    });
  });
});
