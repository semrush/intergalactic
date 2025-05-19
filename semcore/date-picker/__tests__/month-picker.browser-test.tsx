import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Month Picker Trigger', () => {
  test('Verify trigger entering date manually', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="MonthPicker.Trigger"]');
    const screenshotsClip = (await datePicker.first().boundingBox())!;
    screenshotsClip.x -= 4;
    screenshotsClip.y -= 4;
    screenshotsClip.width += 8;
    screenshotsClip.height += 8;

    await page.keyboard.press('Tab');
    await page.keyboard.type('052000');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
  });

  test('Verify trigger states and props', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/month-trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Month picker', () => {
  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="MonthPicker.Trigger"]');

    await test.step('Verify trigger aria label', async () => {
      await expect(datePickerTrigger.first()).toHaveAttribute('aria-label', 'Date field');
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

    const inputTrigger = page.locator('input[data-ui-name="MonthPicker.Trigger"]');

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
    const popper = page.locator('[data-ui-name="MonthPicker.Popper"]');

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
          locator: '[data-ui-name="MonthPicker.Prev"]',
          attrs: [
            ['type', 'button'],
            ['aria-label', 'Previous year'],
          ],
        },
        { locator: '[data-ui-name="MonthPicker.Title"]', attrs: [['aria-live', 'polite']] },
        {
          locator: '[data-ui-name="MonthPicker.Next"]',
          attrs: [
            ['type', 'button'],
            ['aria-label', 'Next year'],
          ],
        },
      ];

      for (const { locator, attrs } of headerAttributes) {
        const element = page.locator(locator);
        for (const [attr, value] of attrs) {
          await expect(element).toHaveAttribute(attr, value);
        }
      }
    });

    await test.step('Verify calendar attributes', async () => {
      const calendar = page.locator('[data-ui-name="MonthPicker.Calendar"]');
      const calendarAttributes = [
        ['tabindex', '0'],
        ['role', 'grid'],
        ['disabled', ''],
      ];

      for (const [attr, value] of calendarAttributes) {
        await expect(calendar).toHaveAttribute(attr, value);
      }
    });

    await test.step('Verify days attributes', async () => {
      const cells = page.locator('[role="gridcell"]');
      const cellCount = await cells.count();

      for (let i = 0; i < cellCount; i++) {
        const cell = cells.nth(i);
        const ariaLabel = await cell.getAttribute('aria-label');
        if (!ariaLabel) continue;

        const commonAttributes = [
          ['role', 'gridcell'],
          ['aria-selected', 'false'],
          ['aria-hidden', 'false'],
        ];

        for (const [attr, value] of commonAttributes) {
          await expect(cell).toHaveAttribute(attr, value);
        }

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

        // Text content check
        const text = await cell.textContent();
        expect(text?.trim()).not.toBe('');
      }
    });
  });

  test('Verify month with styles', async ({ page, browserName }) => {
    const standPath = 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = page.locator('[data-ui-name="MonthPicker.Trigger"]');
    const prevButton = page.locator('[data-ui-name="MonthPicker.Prev"]');
    const cells = page.locator('[role="gridcell"]');
    const selectedCell = page.locator('[data-ui-name="CalendarMonths.Unit"][class*="Selected"]');

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
      await checkStyle(datePickerTrigger.first(), {
        marginTop: '8px',
      });
    });

    await datePickerTrigger.first().click();

    await test.step('Verify style of month cell', async () => {
      await checkStyle(cells.nth(2), {
        color: 'rgb(25, 27, 35)',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '4px 0px 0px',
      });
    });

    await test.step('Verify style of selected date', async () => {
      await checkStyle(selectedCell, {
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(43, 179, 255)',
        margin: '4px 0px 0px',
        width: '60px',
        height: '32px',
      });
    });
  });

  test('Verify month picker by mouse interaction', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="MonthPicker.Trigger"]');
    const popper = page.locator('[data-ui-name="MonthPicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="MonthPicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="MonthPicker.Title"]');
    const headNext = page.locator('[data-ui-name="MonthPicker.Next"]');
    const input = page.locator('input[data-ui-name="MonthPicker.Trigger"]');
    const initialValue = await input.inputValue();

    input.fill('012024');

    await test.step('Open and close popper with click', async () => {
      await datePicker.first().click();
      await page.waitForTimeout(300);
      await expect(popper).toBeVisible();
      await datePicker.first().click();
      await expect(popper).not.toBeVisible();
      await datePicker.first().click();
      await page.waitForTimeout(300);
    });

    const initialTitle = await headTitle.textContent();

    await test.step('Navigate months with header buttons', async () => {
      await headPrev.click();
      await expect(headTitle).not.toHaveText(initialTitle!);

      await headNext.click();
      await expect(headTitle).toHaveText(initialTitle!);
    });

    const cells = page.locator('[role="gridcell"]');

    await test.step('Select month and check popper visibility', async () => {
      await cells.nth(3).click();
      await expect(popper).not.toBeVisible();
    });
    const label = page.locator('label[for="simple-month-picker"]');

    await test.step('Open calendar from label and select another month', async () => {
      await label.click();
      await expect(popper).toBeVisible();

      await cells.nth(4).click();

      const newValue = await input.inputValue();
      await expect(newValue).not.toBe(initialValue);
    });

    await test.step('Enter date manually and open popper', async () => {
      await page.locator('input[data-ui-name="MonthPicker.Trigger"]').fill('05.2024');
      await label.click();
      await expect(popper).toBeVisible();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Month picker keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/monthrangepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = page.locator('[data-ui-name="MonthPicker.Trigger"]');
    const popper = page.locator('[data-ui-name="MonthPicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="MonthPicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="MonthPicker.Title"]');
    const headNext = page.locator('[data-ui-name="MonthPicker.Next"]');
    const input = page.locator('input[data-ui-name="MonthPicker.Trigger"]');
    const initialValue = await input.inputValue();

    await test.step('Open popper with Enter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(popper).toBeVisible();
      await expect(datePicker.first()).not.toBeFocused();
      await expect(popper).toBeFocused();
    });

    await test.step('Close popper with Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(popper).not.toBeVisible();
      await expect(input).toBeFocused();
    });

    await test.step('Open popper with Space', async () => {
      await page.keyboard.press('Space');
      await expect(popper).toBeVisible();
      await expect(datePicker.first()).not.toBeFocused();
      await expect(popper).toBeFocused();
    });
    const initialTitle = await headTitle.textContent();

    await test.step('Navigate to Previous month and validate change', async () => {
      await page.keyboard.press('Tab');
      await expect(headPrev).toBeFocused();
      await headPrev.hover();
      await page.keyboard.press('Enter');
      const titleAfterFirstEnter = await headTitle.textContent();
      expect(titleAfterFirstEnter).not.toBe(initialTitle);
      await expect(headTitle).not.toHaveText(initialTitle!);
    });

    await test.step('Navigate to Next month and validate restore', async () => {
      await page.keyboard.press('Tab');
      await expect(headNext).toBeFocused();

      await page.keyboard.press('Enter');
      const titleAfterSecondEnter = await headTitle.textContent();
      expect(titleAfterSecondEnter).toBe(initialTitle);
    });

    await test.step('Navigate to calendar grid', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(headPrev).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="MonthPicker.Calendar"]')).toBeFocused();
    });

    await test.step('Navigate months and select via keyboard', async () => {
      await page.keyboard.press('ArrowLeft');

      const highlighted = page.locator(
        '[data-ui-name="CalendarMonths.Unit"][class*="highlighted"]',
      );
      await expect(highlighted).toBeVisible();

      const activeElementHandle = await page.evaluateHandle(() => document.activeElement);
      const isFocusedElementHighlighted = await highlighted.evaluate(
        (el, active) => el === active,
        activeElementHandle,
      );
      expect(isFocusedElementHighlighted).toBe(true);

      await page.keyboard.press('Enter');
      await expect(popper).not.toBeVisible();
    });

    await test.step('Select another month with Space key', async () => {
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Space');

      await expect(popper).not.toBeVisible();
      const newValue = await input.inputValue();
      expect(newValue).not.toBe(initialValue);
    });
  });
});
