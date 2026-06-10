import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { checkStyle, getCalendarCellDefaultStyles, getCalendarCellSelectedStyles } from './utils';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },

  monthPickerTrigger: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="MonthPicker.Trigger"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  calendar: (page: Page) => page.locator('[data-ui-name="MonthPicker.Calendar"]'),
  weekDaysRow: (page: Page) => page.locator('[data-ui-name="CalendarWeekDays"]'),
  divider: (page: Page) => page.locator('[data-ui-name="Divider"]'),
  cells: (page: Page, index?: number) => {
    const base = page.getByRole('gridcell');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dateRangeHeader: (page: Page) => page.locator('[data-ui-name="MonthPicker.Header"]'),

  popper: (page: Page) => page.getByRole('dialog'),
  title: (page: Page) => page.locator('[data-ui-name="MonthPicker.Title"]'),
  period: (page: Page) => page.locator('[data-ui-name="MonthPicker.Period"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test.describe('Month Picker Trigger', () => {
    test('Verify trigger entering date manually', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

      const screenshotsClip = (await locators.monthPickerTrigger(page, 0).boundingBox())!;
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

    const triggerVariables = [
      { size: 'm', state: 'normal', disabled: false, neighborLocation: 'right' },
      { size: 'l', state: 'normal', disabled: false, neighborLocation: 'right' },
      { size: 'm', state: 'invalid', disabled: false, neighborLocation: 'right' },
      { size: 'm', state: 'valid', disabled: false, neighborLocation: 'left' },
      { size: 'm', state: 'normal', disabled: true, neighborLocation: 'both' },

    ];

    triggerVariables.forEach((item) => {
      test(`Verify trigger size=${item.size} state=${item.state} disabled=${item.disabled} neighborLocation=${item.neighborLocation}`, {
        tag: [TAG.PRIORITY_HIGH,
          '@date-picker'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/date-picker/tests/examples/month-trigger.tsx', 'en', item);
        await page.keyboard.press('Tab');

        const screenshotsClip = (await page.locator('[data-ui-name="Flex"]').first().boundingBox())!;
        screenshotsClip.x -= 8;
        screenshotsClip.y -= 8;
        screenshotsClip.width += 16;
        screenshotsClip.height += 16;
        await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      });
    });
  });

  test.describe('Month picker', () => {
    test('Verify month with styles', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

      const selectedCell = page.locator('[data-ui-name="CalendarMonths.Unit"][class*="Selected"]');
      const defaultCellStyles = await getCalendarCellDefaultStyles(page);
      const selectedCellStyles = await getCalendarCellSelectedStyles(page);

      await test.step('Verify trigger margins', async () => {
        await checkStyle(locators.monthPickerTrigger(page, 0), {
          marginTop: '8px',
        });
      });

      await locators.monthPickerTrigger(page, 0).click();
      await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

      await test.step('Verify style of month cell', async () => {
        const nonSelectedCell = page.locator('[data-ui-name="CalendarMonths.Unit"]:not([class*="Selected"])').first();
        await checkStyle(nonSelectedCell, {
          ...defaultCellStyles,
          margin: '4px 0px 0px',
        });
      });

      await test.step('Verify style of selected date', async () => {
        await checkStyle(selectedCell, {
          ...selectedCellStyles,
          margin: '4px 0px 0px',
          width: '60px',
          height: '32px',
        });
      });
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Month picker', () => {
    test('Verify roles and attributes', {
      tag: [TAG.PRIORITY_HIGH,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

      await test.step('Verify trigger aria label', async () => {
        await expect(locators.monthPickerTrigger(page, 0)).toHaveAttribute('aria-label', 'Date field');
      });

      await test.step('Verify trigger svg attributes', async () => {
        const svg = locators.monthPickerTrigger(page).locator('svg');
        const svgAttributes = [
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

      await locators.monthPickerTrigger(page, 0).click();

      await test.step('Verify popper attributes', async () => {
        const popperAttributes = [
          ['tabindex', '0'],
          ['data-popper-placement', 'bottom-start'],
        ];

        for (const [attr, value] of popperAttributes) {
          await expect(locators.popper(page)).toHaveAttribute(attr, value);
        }
      });

      await test.step('Verify calendar attributes', async () => {
        const calendarAttributes = [
          ['tabindex', '0'],
          ['role', 'grid'],
          ['disabled', ''],
        ];

        for (const [attr, value] of calendarAttributes) {
          await expect(locators.calendar(page)).toHaveAttribute(attr, value);
        }
      });

      await test.step('Verify days attributes', async () => {
        const cellCount = await locators.cells(page).count();

        for (let i = 0; i < cellCount; i++) {
          const cell = locators.cells(page).nth(i);
          const ariaLabel = await cell.getAttribute('aria-label');
          if (!ariaLabel) continue;

          const commonAttributes = [
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

    test('Verify month picker by mouse interaction', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

      const input = page.locator('input[data-ui-name="MonthPicker.Trigger"]');
      const initialValue = await input.inputValue();

      input.fill('012024');

      await test.step('Open and close popper with click', async () => {
        await locators.monthPickerTrigger(page, 0).click();
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        await locators.monthPickerTrigger(page, 0).click();
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

        await locators.monthPickerTrigger(page, 0).click();
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
      });

      const initialTitle = await locators.title(page).textContent();

      await test.step('Navigate months with header buttons', async () => {
        await locators.button(page, 'Previous year').click();
        await expect(locators.title(page)).not.toHaveText(initialTitle!);

        await locators.button(page, 'Next year').click();
        await expect(locators.title(page)).toHaveText(initialTitle!);
      });

      await test.step('Select month and check popper visibility', async () => {
        await locators.cells(page, 3).click();
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      });
      const label = page.locator('label[for="simple-month-picker"]');

      await test.step('Open calendar from label and select another month', async () => {
        await label.click();
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        await locators.cells(page, 4).click();

        const newValue = await input.inputValue();
        await expect(newValue).not.toBe(initialValue);
      });
    });

    test('Month picker keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@date-picker'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

      const input = page.locator('input[data-ui-name="MonthPicker.Trigger"]');
      const initialValue = await input.inputValue();

      await test.step('Open popper with Enter', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        await expect(locators.monthPickerTrigger(page, 0)).not.toBeFocused();
        await expect(locators.popper(page)).toBeFocused();
      });

      await test.step('Close popper with Escape', async () => {
        await page.keyboard.press('Escape');
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

        await expect(input).toBeFocused();
      });

      await test.step('Open popper with Space', async () => {
        await page.keyboard.press('Space');
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });
        await expect(locators.monthPickerTrigger(page, 0)).not.toBeFocused();
      });
      const initialTitle = await locators.title(page).textContent();

      await test.step('Navigate to Previous month and validate change', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Previous year')).toBeFocused();
        await locators.button(page, 'Previous year').hover();
        await page.keyboard.press('Enter');
        const titleAfterFirstEnter = await locators.title(page).textContent();
        expect(titleAfterFirstEnter).not.toBe(initialTitle);
        await expect(locators.title(page)).not.toHaveText(initialTitle!);
      });

      await test.step('Navigate to Next month and validate restore', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Next year')).toBeFocused();

        await page.keyboard.press('Enter');
        const titleAfterSecondEnter = await locators.title(page).textContent();
        expect(titleAfterSecondEnter).toBe(initialTitle);
      });

      await test.step('Navigate to calendar grid', async () => {
        await page.keyboard.press('Shift+Tab');
        await expect(locators.button(page, 'Previous year')).toBeFocused();

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
        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });
      });

      await test.step('Select another month with Space key', async () => {
        await page.keyboard.press('Enter');
        await locators.button(page, 'Previous year').waitFor({ state: 'visible' });

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowRight'); // because of bug UIK-4652
        await page.keyboard.press('Space');

        await locators.button(page, 'Previous year').waitFor({ state: 'hidden' });

        const newValue = await input.inputValue();
        expect(newValue).not.toBe(initialValue);
      });
    });
  });
});
