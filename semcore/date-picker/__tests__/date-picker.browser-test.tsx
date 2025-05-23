import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Date Picker Trigger', () => {
  test('Verify trigger states when entering date manually', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const screenshotsClip = (await datePicker.first().boundingBox())!;
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
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
  });

  test('Verify trigger states and props', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/day-trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('DayPicker with today button', () => {
  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="DatePicker.Trigger"]');
    const inputTrigger = page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');

    await test.step('Verify trigger aria label', async () => {
      await expect(datePickerTrigger.first()).toHaveAttribute('aria-label', 'Date field');
    });

    await test.step('Verify trigger SVG attributes', async () => {
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

    await datePickerTrigger.first().click();

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
      const headerLocators = [
        {
          locator: '[data-ui-name="DatePicker.Prev"]',
          attrs: [
            ['type', 'button'],
            ['aria-label', 'Previous month'],
          ],
        },
        { locator: '[data-ui-name="DatePicker.Title"]', attrs: [['aria-live', 'polite']] },
        {
          locator: '[data-ui-name="DatePicker.Next"]',
          attrs: [
            ['type', 'button'],
            ['aria-label', 'Next month'],
          ],
        },
      ];

      for (const { locator, attrs } of headerLocators) {
        const element = page.locator(locator);
        for (const [attr, value] of attrs) {
          await expect(element).toHaveAttribute(attr, value);
        }
      }
    });

    await test.step('Verify calendar attributes', async () => {
      const calendar = page.locator('[data-ui-name="DatePicker.Calendar"]');
      await expect(calendar).toHaveAttribute('tabindex', '0');
      await expect(calendar).toHaveAttribute('role', 'grid');
      await expect(calendar).toHaveAttribute('disabled', '');
    });

    await test.step('Verify weekdays attributes', async () => {
      const weekDaysRow = page.locator('[data-ui-name="CalendarWeekDays"]');
      await expect(weekDaysRow).toHaveAttribute('role', 'row');

      const weekDays = weekDaysRow.locator('[data-ui-name="CalendarWeekDays.Unit"]');
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
      const divider = page.locator('[data-ui-name="Divider"]');
      const dividerAttributes = [
        ['orientation', 'horizontal'],
        ['aria-orientation', 'horizontal'],
        ['role', 'separator'],
      ];

      for (const [attr, value] of dividerAttributes) {
        await expect(divider).toHaveAttribute(attr, value);
      }
    });

    await test.step('Verify today button attributes', async () => {
      const todayButton = page.locator('[data-ui-name="Button"]');
      const todayAttributes = [['type', 'button']];

      for (const [attr, value] of todayAttributes) {
        await expect(todayButton).toHaveAttribute(attr, value);
      }
    });
  });

  test('Verify datepicker with Today button styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="DatePicker.Trigger"]');
    const prevButton = page.locator('[data-ui-name="DatePicker.Prev"]');
    const cells = page.locator('[role="gridcell"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const selectedCell = page.locator('[data-ui-name="CalendarDays.Unit"][class*="Selected"]');

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
      await checkStyle(datePickerTrigger.first(), { marginTop: '8px' });
    });

    await test.step('Verify header button hover', async () => {
      await datePickerTrigger.first().click();
      await prevButton.hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify disabled date styles', async () => {
      await checkStyle(cells.first(), {
        color: 'rgb(25, 27, 35)',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '4px 0px 0px',
      });
    });

    await test.step('Verify style of available date', async () => {
      await checkStyle(cells.nth(2), {
        color: 'rgb(25, 27, 35)',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '4px 0px 0px',
      });
    });

    await test.step('Verify hover style of available date', async () => {
      await cells.nth(8).hover();
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
      await todayButton.hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify datepicker with today button by mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="DatePicker.Trigger"]').first();
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const cells = page.locator('[role="gridcell"]');

    const initialValue = await input.inputValue();

    await test.step('Open and close datepicker popper', async () => {
      await datePickerTrigger.click();
      await expect(popper).toBeVisible();

      await datePickerTrigger.click();
      await expect(popper).not.toBeVisible();

      await datePickerTrigger.click();
      await expect(popper).toBeVisible();
    });

    await test.step('Navigate months and verify title changes', async () => {
      const initialTitle = await headTitle.textContent();

      await headPrev.click();
      await expect(headTitle).not.toHaveText(initialTitle!);

      await headNext.click();
      await expect(headTitle).toHaveText(initialTitle!);
    });

    await test.step('Select date and today and input value changes', async () => {
      await cells.nth(15).click();
      await expect(popper).not.toBeVisible();

      const newValue = await input.inputValue();
      expect(newValue).not.toBe(initialValue);

      await datePickerTrigger.click();
      await todayButton.click();
      await expect(popper).not.toBeVisible();

      const finalValue = await input.inputValue();
      expect(finalValue).not.toBe(newValue);
    });
  });

  test('Verify datepicker with today button by keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="DatePicker.Trigger"]').first();
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const prev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const title = page.locator('[data-ui-name="DatePicker.Title"]');
    const next = page.locator('[data-ui-name="DatePicker.Next"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const calendar = page.locator('[data-ui-name="DatePicker.Calendar"]');
    const highlightedCell = page.locator(
      '[data-ui-name="CalendarDays.Unit"][class*="highlighted"]',
    );

    const initialValue = await input.inputValue();

    await test.step('Open datepicker with Enter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      await expect(popper).toBeVisible();
      await expect(trigger).not.toBeFocused();
      await expect(popper).toBeFocused();
    });

    await test.step('Close datepicker with Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(popper).not.toBeVisible();
      await expect(input).toBeFocused();
    });

    await test.step('Reopen datepicker with Space', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);
      await expect(popper).toBeVisible();
      await expect(trigger).not.toBeFocused();
      await expect(popper).toBeFocused();
    });

    await test.step('Navigate to prev button and change month', async () => {
      await page.keyboard.press('Tab');
      await expect(prev).toBeFocused();
      await prev.hover();
      const initialTitle = await title.textContent();

      await page.keyboard.press('Enter');
      const titleAfterFirstEnter = await title.textContent();
      expect(titleAfterFirstEnter).not.toBe(initialTitle);
      await expect(title).not.toHaveText(initialTitle!);

      await page.keyboard.press('Tab');
      await expect(next).toBeFocused();

      await page.keyboard.press('Enter');
      const titleAfterSecondEnter = await title.textContent();
      expect(titleAfterSecondEnter).toBe(initialTitle);
    });

    await test.step('Navigate to calendar and today button', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(prev).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(calendar).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(todayButton).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(calendar).toBeFocused();
    });

    await test.step('Navigate in calendar and select date', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(highlightedCell).toBeVisible();

      const activeElementHandle = await page.evaluateHandle(() => document.activeElement);
      const isFocusedElementHighlighted = await highlightedCell.evaluate(
        (el, active) => el === active,
        activeElementHandle,
      );
      expect(isFocusedElementHighlighted).toBe(true);

      await page.keyboard.press('Enter');
      await expect(popper).not.toBeVisible();

      const newValue = await input.inputValue();
      expect(newValue).not.toBe(initialValue);

      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Space');

      await expect(popper).not.toBeVisible();
      const newValue2 = await input.inputValue();
      expect(newValue2).not.toBe(newValue);
    });

    await test.step('Select today by Today button', async () => {
      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      await page.keyboard.press('Shift+Tab');
      await expect(todayButton).toBeFocused();
      const newValue2 = await input.inputValue();

      await page.keyboard.press('Enter');
      await expect(popper).not.toBeVisible();

      const newValue3 = await input.inputValue();
      expect(newValue3).not.toBe(newValue2);
    });
  });
});

test.describe('DayPicker with custom days', () => {
  test('Verify custom days roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/custom_day_test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="DatePicker.Trigger"]');

    await test.step('Verify trigger SVG attributes', async () => {
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

    const triggerAttributes = [{ name: 'aria-label', value: 'Date field' }];

    await test.step('Verify trigger attributes', async () => {
      for (const { name, value } of triggerAttributes) {
        await expect(datePickerTrigger.nth(0)).toHaveAttribute(name, value);
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
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    await datePickerTrigger.first().click();

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
      const headerButtons = [
        { selector: '[data-ui-name="DatePicker.Prev"]', ariaLabel: 'Previous month' },
        { selector: '[data-ui-name="DatePicker.Next"]', ariaLabel: 'Next month' },
      ];

      for (const { selector, ariaLabel } of headerButtons) {
        const button = page.locator(selector);
        await expect(button).toHaveAttribute('type', 'button');
        await expect(button).toHaveAttribute('aria-label', ariaLabel);
      }

      const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
      await expect(headTitle).toHaveAttribute('aria-live', 'polite');
    });

    const weekDaysAttributes = [{ name: 'role', value: 'row' }];

    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    await test.step('Verify popper header attributes', async () => {
      const headerLocators = [
        {
          locator: '[data-ui-name="DatePicker.Prev"]',
          attrs: [
            ['type', 'button'],
            ['aria-label', 'Previous month'],
          ],
        },
        { locator: '[data-ui-name="DatePicker.Title"]', attrs: [['aria-live', 'polite']] },
        {
          locator: '[data-ui-name="DatePicker.Next"]',
          attrs: [
            ['type', 'button'],
            ['aria-label', 'Next month'],
          ],
        },
      ];

      for (const { locator, attrs } of headerLocators) {
        const element = page.locator(locator);
        for (const [attr, value] of attrs) {
          await expect(element).toHaveAttribute(attr, value);
        }
      }
    });

    await test.step('Verify calendar attributes', async () => {
      const calendar = page.locator('[data-ui-name="DatePicker.Calendar"]');
      await expect(calendar).toHaveAttribute('tabindex', '0');
      await expect(calendar).toHaveAttribute('role', 'grid');
      await expect(calendar).toHaveAttribute('disabled', '');
    });

    await test.step('Verify weekdays attributes', async () => {
      const weekDaysRow = page.locator('[data-ui-name="CalendarWeekDays"]');
      await expect(weekDaysRow).toHaveAttribute('role', 'row');

      const weekDays = weekDaysRow.locator('[data-ui-name="CalendarWeekDays.Unit"]');
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
  });

  test('Verify datepicker with custom days styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/custom_day_test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="DatePicker.Trigger"]');
    const cells = page.locator('[role="gridcell"]');
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
      await datePickerTrigger.first().click();
      await checkStyle(datePickerTrigger.first(), { marginTop: '8px' });
    });

    await test.step('Verify hover disabled date', async () => {
      await checkStyle(cells.first(), {
        color: 'rgb(25, 27, 35)',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '4px 0px 0px',
      });
    });

    await test.step('Verify style of available date', async () => {
      await checkStyle(cells.nth(10), {
        color: 'rgb(25, 27, 35)',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '4px 0px 0px',
      });
    });

    await test.step('Verify hover style of available date', async () => {
      await datePickerTrigger.first().click();
      page.locator('input[data-ui-name="DatePicker.Trigger"]').fill('05.05.2024');
      await datePickerTrigger.first().click();
      await page.waitForTimeout(300);
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

  test('Verify custom days can be selected by the mouse', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/custom_day_test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="DatePicker.Trigger"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const cells = page.locator('[role="gridcell"]');

    const initialValue = await input.inputValue();

    await test.step('Open and close datepicker by clicking trigger', async () => {
      await datePicker.first().click();
      await expect(popper).toBeVisible();

      await datePicker.first().click();
      await expect(popper).not.toBeVisible();
    });

    await test.step('Reopen datepicker', async () => {
      await datePicker.first().click();
      await expect(popper).toBeVisible();
    });

    await test.step('Navigate months and verify title change', async () => {
      const initialTitle = await headTitle.textContent();

      await headPrev.click();
      await expect(headTitle).not.toHaveText(initialTitle!);

      await headNext.click();
      await expect(headTitle).toHaveText(initialTitle!);
    });

    await test.step('Select a day and verify input value changes', async () => {
      await cells.nth(10).click();
      await expect(popper).not.toBeVisible();

      const newValue = await input.inputValue();
      expect(newValue).not.toBe(initialValue);
    });
  });

  test('Verify custom days by keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/custom_day_test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="DatePicker.Trigger"]').first();
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const calendar = page.locator('[data-ui-name="DatePicker.Calendar"]');
    const highlightedCell = page.locator(
      '[data-ui-name="CalendarDays.Unit"][class*="highlighted"]',
    );

    const initialValue = await input.inputValue();

    await test.step('Open datepicker with Enter key', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(popper).toBeVisible();
      await expect(datePicker).not.toBeFocused();
      await expect(popper).toBeFocused();
    });

    await test.step('Close datepicker with Escape key', async () => {
      await page.keyboard.press('Escape');
      await expect(popper).not.toBeVisible();
      await expect(input).toBeFocused();
    });

    await test.step('Reopen datepicker with Space key', async () => {
      await page.keyboard.press('Space');
      await expect(popper).toBeVisible();
      await expect(datePicker).not.toBeFocused();
      await expect(popper).toBeFocused();
    });
    const initialTitle = await headTitle.textContent();

    await test.step('Navigate to previous month and validate title change', async () => {
      await page.keyboard.press('Tab');
      await expect(headPrev).toBeFocused();
      await headPrev.hover();
      await page.keyboard.press('Enter'); // Space doesn't work — bug
      const titleAfterFirstEnter = await headTitle.textContent();
      expect(titleAfterFirstEnter).not.toBe(initialTitle);
      await expect(headTitle).not.toHaveText(initialTitle!);
    });

    await test.step('Navigate to next month and validate title restored', async () => {
      await page.keyboard.press('Tab');
      await expect(headNext).toBeFocused();

      await page.keyboard.press('Enter'); // Space doesn't work — bug
      const titleAfterSecondEnter = await headTitle.textContent();
      expect(titleAfterSecondEnter).toBe(initialTitle);
    });

    await test.step('Navigate to calendar and today button', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(headPrev).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(calendar).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(popper).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(headNext).toBeFocused();
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
      await expect(popper).not.toBeVisible();

      const newValue = await input.inputValue();
      expect(newValue).not.toBe(initialValue);
    });

    await test.step('Select another date after reopening', async () => {
      await page.keyboard.press('Enter');

      const newValue = await input.inputValue();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Space');
      await expect(popper).not.toBeVisible();

      const newValue2 = await input.inputValue();
      expect(newValue2).not.toBe(newValue);
    });
  });
});

test.describe('DayPikcer trigger and popper', () => {
  test('Verify mouse interactions when component uses expanded trigger and popper', async ({
    page,
  }) => {
    const standPath = 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="DatePicker.Trigger"]').first();
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const cells = page.locator('[role="gridcell"]');

    const initialValue = await input.inputValue();

    await test.step('Toggle popper visibility with click', async () => {
      await datePicker.click();
      await expect(popper).toBeVisible();

      await datePicker.click();
      await expect(popper).not.toBeVisible();
    });

    await test.step('Fill input manually and open calendar', async () => {
      await input.fill('04042022');
      await datePicker.click();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Navigate months and validate title change', async () => {
      const initialTitle = await headTitle.textContent();

      await headPrev.click();
      await expect(headTitle).not.toHaveText(initialTitle!);

      await headNext.click();
      await expect(headTitle).toHaveText(initialTitle!);
    });

    await test.step('Select a date and validate input value change', async () => {
      await cells.nth(10).click();
      await expect(popper).not.toBeVisible();

      const newValue = await input.inputValue();
      expect(newValue).not.toBe(initialValue);
    });
  });

  test('Verify keyboard interactions when component uses expanded trigger and popper', async ({
    page,
  }) => {
    const standPath = 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="DatePicker.Trigger"]').first();
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const calendar = page.locator('[data-ui-name="DatePicker.Calendar"]');
    const highlighted = page.locator('[data-ui-name="CalendarDays.Unit"][class*="highlighted"]');

    const initialValue = await input.inputValue();

    await test.step('Focus DatePicker and fill date manually', async () => {
      await page.keyboard.press('Tab');
      await input.fill('04042022');
    });

    await test.step('Open popper with Enter key and check focus', async () => {
      await page.keyboard.press('Enter');
      await expect(popper).toBeVisible();
      await expect(datePicker).not.toBeFocused();
      await expect(popper).toBeFocused();
    });

    await test.step('Close popper with Escape key and check focus', async () => {
      await page.keyboard.press('Escape');
      await expect(popper).not.toBeVisible();
      await expect(input).toBeFocused();
    });

    await test.step('Reopen popper with Space key and check focus', async () => {
      await page.keyboard.press('Space');
      await expect(popper).toBeVisible();
      await expect(datePicker).not.toBeFocused();
      await expect(popper).toBeFocused();
    });
    const initialTitle = await headTitle.textContent();

    await test.step('Navigate to previous month and validate title change', async () => {
      await page.keyboard.press('Tab');
      await expect(headPrev).toBeFocused();
      await headPrev.hover();
      await page.keyboard.press('Enter'); // space doesn't work - bug
      const titleAfterFirstEnter = await headTitle.textContent();
      expect(titleAfterFirstEnter).not.toBe(initialTitle);
      await expect(headTitle).not.toHaveText(initialTitle!);
    });

    await test.step('Navigate to next month and validate title reset', async () => {
      await page.keyboard.press('Tab');
      await expect(headNext).toBeFocused();
      await page.keyboard.press('Enter'); // space doesn't work - bug
      const titleAfterSecondEnter = await headTitle.textContent();
      expect(titleAfterSecondEnter).toBe(initialTitle);
    });

    await test.step('Navigate to calendar and today button', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(headPrev).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(calendar).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(todayButton).toBeFocused();
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Shift+Tab');
      await expect(calendar).toBeFocused();
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
      await expect(popper).not.toBeVisible();

      const newValue = await input.inputValue();
      expect(newValue).not.toBe(initialValue);
    });

    await test.step('Quick navigation and selection with keyboard', async () => {
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const newValue = await input.inputValue();
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Space');

      await expect(popper).not.toBeVisible();
      const newValue2 = await input.inputValue();
      expect(newValue2).not.toBe(newValue);
    });
  });
});

test.describe('Disabled dates and Validation', () => {
  test('Verify validation tooltip', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/disabled_dates.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePicker = page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const tooltip = page.getByRole('tooltip', { name: 'January 1 of this year is off' });

    await page.keyboard.press('Tab');
    await page.keyboard.type('06');
    await page.keyboard.type('20');
    await expect(datePicker).toHaveAttribute('aria-invalid', 'false');

    await page.keyboard.type('7875');
    await page.waitForTimeout(250);
    await expect(datePicker).toHaveAttribute('aria-invalid', 'true');
    await expect(datePicker).toHaveAttribute('aria-haspopup', 'true');

    await page.keyboard.press('Backspace');
    await page.keyboard.type('24');
    await expect(datePicker).toHaveAttribute('aria-invalid', 'true');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(50);
    await expect(tooltip).toBeVisible();
    await expect(popper).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(tooltip).toBeVisible();
    await expect(popper).not.toBeVisible();

    await page.keyboard.press('Escape'); // bug
    await expect(tooltip).toBeVisible();
    await expect(datePicker).toHaveAttribute('aria-invalid', 'true');
  });

  test('Verify keyboard interactions when disabled dates and validation tooltip', async ({
    page,
  }) => {
    const standPath = 'stories/components/date-picker/docs/examples/disabled_dates.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    await test.step('Navigate to date picker and fill the input with a date', async () => {
      await page.keyboard.press('Tab');
      await input.fill('04/24/2025');
      await page.keyboard.press('Enter');
    });

    await test.step('Verify popper visibility and focus', async () => {
      await expect(popper).toBeVisible();
      await expect(datePicker.first()).not.toBeFocused();
      await expect(popper).toBeFocused();
    });

    await test.step('Close popper with Escape and check input focus', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Escape');
      await expect(popper).not.toBeVisible();
      await expect(input).toBeFocused();
    });

    await test.step('Open popper with Space and check focus', async () => {
      await page.keyboard.press('Space');
      await expect(popper).toBeVisible();
      await expect(datePicker.first()).not.toBeFocused();
      await expect(popper).toBeFocused();
    });
    const initialTitle = await headTitle.textContent();

    await test.step('Navigate to previous month and check title', async () => {
      await page.keyboard.press('Tab');
      await expect(headPrev).toBeFocused();
      await page.keyboard.press('Enter'); // space doesn't work - bug!
      const titleAfterFirstEnter = await headTitle.textContent();
      expect(titleAfterFirstEnter).not.toBe(initialTitle);
      await expect(headTitle).not.toHaveText(initialTitle!);
    });

    await test.step('Navigate to next month and validate title reset', async () => {
      await page.keyboard.press('Tab');
      await expect(headNext).toBeFocused();
      await page.keyboard.press('Enter'); // space doesn't work - bug!
      const titleAfterSecondEnter = await headTitle.textContent();
      expect(titleAfterSecondEnter).toBe(initialTitle);
    });

    await test.step('Navigate between prev and next month with Tab and Shift+Tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(headPrev).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="DatePicker.Calendar"]')).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(headNext).toBeFocused();
    });

    await test.step('Navigate down in the calendar and verify highlighted date', async () => {
      await page.keyboard.press('ArrowDown');
      const highlighted = page.locator('[data-ui-name="CalendarDays.Unit"][class*="highlighted"]');
      await expect(highlighted).toBeVisible();
    });
  });
});

test.describe('Calendar props and date picker', () => {
  test('Verify all calendar props work good', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/calendar_props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.type('03032025');

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify all date picker props work good', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/date-picker-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await page.keyboard.press('Tab');
    const prevButton = page.locator('[data-ui-name="DatePicker.Prev"]');
    await prevButton.hover();
    await expect(page).toHaveScreenshot();
  });
});
