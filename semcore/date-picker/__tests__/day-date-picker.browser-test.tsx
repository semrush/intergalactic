import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { mockDate, RealDate } from './utils';

test.describe('DaypickerTrigger', () => {
  test('Trigger - entering date manually', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const screenshotsClip = (await datePicker.first().boundingBox())!;
    screenshotsClip.x -= 4;
    screenshotsClip.y -= 4;
    screenshotsClip.width += 8;
    screenshotsClip.height += 8;

    await page.keyboard.press('Tab');
    await page.keyboard.type('05');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.type('29');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.type('2000');
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

  test('Trigger states and props', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    //snapshot

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    //shanpshot

    await page.keyboard.press('Tab');
    //shanpshot
  });
});

test.describe('DayPicker with today button', () => {
  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // trigger
    const datePickerTrigger = await page.locator('[data-ui-name="DatePicker.Trigger"]');

    await test.step('Verify trigger aria label', async () => {
      const ariaLabel = await datePickerTrigger.first().getAttribute('aria-label');
      expect(ariaLabel).toBe('Date field'); // ожидаемое значение
    });

    await test.step('Verify trigger svg attributes', async () => {
      const svg = datePickerTrigger.locator('svg');
      await expect(svg).toHaveAttribute('tabindex', '-1');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
      await expect(svg).toHaveAttribute('width', '16');
      await expect(svg).toHaveAttribute('height', '16');
    });

    const inputTriggr = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    await test.step('Verify input trigger  attributes', async () => {
      await expect(inputTriggr).toHaveAttribute('tabindex', '0');
      await expect(inputTriggr).toHaveAttribute('aria-invalid', 'false');
      await expect(inputTriggr).toHaveAttribute('role', 'combobox');
      await expect(inputTriggr).toHaveAttribute('aria-label', 'Date');
      await expect(inputTriggr).toHaveAttribute('inputmode', 'numeric');
    });

    //
    datePickerTrigger.first().click();
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');

    await test.step('Verify popper attributes', async () => {
      await expect(popper).toHaveAttribute('tabindex', '0');
      await expect(popper).toHaveAttribute('role', 'dialog');
      await expect(popper).toHaveAttribute('data-popper-placement', 'bottom-start');
    });

    await test.step('Verify popper header attributes', async () => {
      const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
      await expect(headPrev).toHaveAttribute('tabindex', '0');
      await expect(headPrev).toHaveAttribute('type', 'button');
      await expect(headPrev).toHaveAttribute('aria-label', 'Previous month');

      const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
      await expect(headTitle).toHaveAttribute('aria-live', 'polite');

      const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
      await expect(headNext).toHaveAttribute('tabindex', '0');
      await expect(headNext).toHaveAttribute('type', 'button');
      await expect(headNext).toHaveAttribute('aria-label', 'Next month');
    });

    await test.step('Verify  calendar attributes', async () => {
      const calendar = page.locator('[data-ui-name="DatePicker.Calendar"]');
      await expect(calendar).toHaveAttribute('tabindex', '0');
      await expect(calendar).toHaveAttribute('role', 'grid');
      await expect(calendar).toHaveAttribute('disabled', '');
    });

    await test.step('Verify weekdays attributes', async () => {
      const weekDaysRow = await page.locator('[data-ui-name="CalendarWeekDays"]');

      const parentRole = await weekDaysRow.getAttribute('role');
      expect(parentRole).toBe('row'); // ожидаемое значение роли для родительского элемента

      const weekDays = await weekDaysRow.locator('[data-ui-name="CalendarWeekDays.Unit"]');

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

        const dayRole = await day.getAttribute('role');
        expect(dayRole).toBe('columnheader'); // ожидаемое значение роли для каждого дня

        const ariaLabel = await day.getAttribute('aria-label');
        expect(ariaLabel).toBe(daysOfWeek[i]); // проверка, что aria-label соответствует дню недели

        const dayText = await day.textContent();
        expect(dayText).toBe(daysOfWeek[i].slice(0, 3)); // проверка, что текст соответствует первому сокращению дня недели (Sun, Mon, Tue и т.д.)
      }
    });

    await test.step('Verify days attributes', async () => {
      const cells = page.locator('[role="gridcell"]');
      const cellCount = await cells.count();

      for (let i = 0; i < cellCount; i++) {
        const cell = cells.nth(i);

        // Пропускаем пустые ячейки без aria-label
        const ariaLabel = await cell.getAttribute('aria-label');
        if (!ariaLabel) continue;

        // Проверка роли
        await expect(cell).toHaveAttribute('role', 'gridcell');

        // Проверка остальных aria-атрибутов
        await expect(cell).toHaveAttribute('aria-colindex');
        await expect(cell).toHaveAttribute('aria-rowindex');
        await expect(cell).toHaveAttribute('aria-selected', 'false');
        await expect(cell).toHaveAttribute('aria-hidden', 'false');

        // Проверка disabled/aria-disabled в зависимости от месяца
        const date = new Date(ariaLabel);
        const month = date.getMonth();
        const isCurrentMonth = month === 5;

        const hasDisabledAttr = (await cell.getAttribute('disabled')) !== null;
        const ariaDisabled = await cell.getAttribute('aria-disabled');

        if (isCurrentMonth) {
          expect(hasDisabledAttr).toBe(false);
          expect(ariaDisabled).toBe('false');
        } else {
          expect(hasDisabledAttr).toBe(true);
          expect(ariaDisabled).toBe('false'); // как указано, всегда false
        }

        // Проверка текста
        const text = await cell.textContent();
        expect(text?.trim()).not.toBe('');
      }
    });

    await test.step('Verify divider attributes', async () => {
      const divider = page.locator('[data-ui-name="Divider"]');
      await expect(divider).toHaveAttribute('orientation', 'horizontal');
      await expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
      await expect(divider).toHaveAttribute('role', 'separator');
    });

    await test.step('Verify today attributes', async () => {
      const today = page.locator('[data-ui-name="Button"]');
      await expect(today).toHaveAttribute('type', 'button');
      await expect(today).toHaveAttribute('tabindex', '0');
    });
  });

  test('Verify datepicker with Today  styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const prevButton = page.locator('[data-ui-name="DatePicker.Prev"]');
    const cells = page.locator('[role="gridcell"]');

    await test.step('Verify trigger margins', async () => {
      const marginTop = await datePickerTrigger.first().evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.marginTop;
      });
      expect(marginTop).toBe('8px'); // ожидаемое значение
    });

    await test.step('Verify date picker popper', async () => {
      await datePickerTrigger.first().click();
      //await expect(page).toHaveScreenshot();
    });

    await test.step('Verify header button hover', async () => {
      await prevButton.hover();
      // await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover disabled date', async () => {
      const color = await cells.first().evaluate((el) => getComputedStyle(el).color);
      const backgroundColor = await cells
        .first()
        .evaluate((el) => getComputedStyle(el).backgroundColor);
      const margin = await cells.first().evaluate((el) => getComputedStyle(el).margin);

      // Здесь укажи ожидаемые значения в зависимости от темы или дизайна
      expect(color).toBe('rgb(25, 27, 35)'); // пример: серый для disabled
      expect(backgroundColor).toBe('rgb(255, 255, 255)'); // пример: прозрачный фон
      expect(margin).toBe('4px 0px 0px'); // пример: серый для disabled
    });

    await test.step('Verify style of available  date', async () => {
      const color = await cells.nth(2).evaluate((el) => getComputedStyle(el).color);
      const backgroundColor = await cells
        .nth(2)
        .evaluate((el) => getComputedStyle(el).backgroundColor);
      const margin = await cells.nth(2).evaluate((el) => getComputedStyle(el).margin);

      // Здесь укажи ожидаемые значения в зависимости от темы или дизайна
      expect(color).toBe('rgb(25, 27, 35)'); // пример: серый для disabled
      expect(backgroundColor).toBe('rgb(255, 255, 255)'); // пример: прозрачный фон
      expect(margin).toBe('4px 0px 0px'); // пример: серый для disabled
    });

    await test.step('Verify hover  style of available  date', async () => {
      cells.nth(2).hover;
      //shapshot
    });

    const cell = page.locator(
      '[data-ui-name="CalendarDays.Unit"][class*="__startSelected_"][class*="__endSelected_"]',
    );

    await test.step('Verify  style of selected date', async () => {
      const color = await cell.evaluate((el) => getComputedStyle(el).color);
      const backgroundColor = await cell.evaluate((el) => getComputedStyle(el).backgroundColor);
      const margin = await cell.evaluate((el) => getComputedStyle(el).margin);
      const width = await cell.evaluate((el) => getComputedStyle(el).width);
      const height = await cell.evaluate((el) => getComputedStyle(el).height);

      expect(color).toBe('rgb(255, 255, 255)');
      expect(backgroundColor).toBe('rgb(43, 179, 255)');
      expect(margin).toBe('4px 0px 0px');
      expect(width).toBe('32px');
      expect(height).toBe('32px');
    });

    await test.step('Verify  hover style of selected date', async () => {
      cell.hover();
      //snapshot
    });

    await test.step('Verify hover style for today button', async () => {
      await page.locator('[data-ui-name="Button"]').hover();
      //snapshot
    });
  });

  test('Action with datepicker and today button by mouse', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    // Сохраняем текущее значение
    const initialValue = await input.inputValue();

    await datePicker.first().click();
    await expect(popper).toBeVisible();
    await datePicker.first().click();
    await expect(popper).not.toBeVisible();

    await datePicker.first().click();

    const initialTitle = await headTitle.textContent();

    // Кликаем по кнопке "Previous month"
    await headPrev.click();

    // Ждём пока title обновится
    await expect(headTitle).not.toHaveText(initialTitle!);

    await headNext.click();
    await expect(headTitle).toHaveText(initialTitle!);

    const cells = page.locator('[role="gridcell"]');
    await cells.nth(10).click();
    await expect(popper).not.toBeVisible();
    const newValue = await input.inputValue();
    expect(newValue).not.toBe(initialValue);

    await datePicker.first().click();
    todayButton.click();
    await expect(popper).not.toBeVisible();
    const newValue2 = await input.inputValue();
    expect(newValue2).not.toBe(newValue);
  });

  test('Datepicker and today button keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    // Сохраняем текущее значение
    const initialValue = await input.inputValue();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(popper).not.toBeVisible();
    await expect(input).toBeFocused();

    await page.keyboard.press('Space');
    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(headPrev).toBeFocused();
    await headPrev.hover();
    const initialTitle = await headTitle.textContent();

    //snapshot

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterFirstEnter = await headTitle.textContent();
    expect(titleAfterFirstEnter).not.toBe(initialTitle);

    await expect(headTitle).not.toHaveText(initialTitle!);

    await page.keyboard.press('Tab');
    await expect(headNext).toBeFocused();

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterSecondEnter = await headTitle.textContent();
    expect(titleAfterSecondEnter).toBe(initialTitle);

    await page.keyboard.press('Shift+Tab');
    await expect(headPrev).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(page.locator('[data-ui-name="DatePicker.Calendar"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(todayButton).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('[data-ui-name="DatePicker.Calendar"]')).toBeFocused();

    await page.keyboard.press('ArrowUp');
    //snapshot

    const highlighted = page.locator('[data-ui-name="CalendarDays.Unit"][class*="highlighted"]');
    await expect(highlighted).toBeVisible();

    const activeElementHandle = await page.evaluateHandle(() => document.activeElement);
    const isFocusedElementHighlighted = await highlighted.evaluate(
      (el, active) => el === active,
      activeElementHandle,
    );

    expect(isFocusedElementHighlighted).toBe(true);

    await page.keyboard.press('Enter');

    await expect(popper).not.toBeVisible();
    const newValue = await input.inputValue();
    expect(newValue).not.toBe(initialValue);

    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Space');

    await expect(popper).not.toBeVisible();
    const newValue2 = await input.inputValue();
    expect(newValue2).not.toBe(newValue);

    await page.keyboard.press('Enter');
    await page.keyboard.press('Shift+Tab');
    await expect(todayButton).toBeFocused();
    await page.keyboard.press('Enter'); // space don;t work - bug!

    await expect(popper).not.toBeVisible();
    const newValue3 = await input.inputValue();
    expect(newValue3).not.toBe(newValue2);
  });
});

test.describe('DayPicker with custom days', () => {
  test('Verify custom days roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/custom_day_test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // trigger
    const datePickerTrigger = await page.locator('[data-ui-name="DatePicker.Trigger"]');

    await test.step('Verify trigger aria label', async () => {
      const ariaLabel = await datePickerTrigger.first().getAttribute('aria-label');
      expect(ariaLabel).toBe('Date field'); // ожидаемое значение
    });

    await test.step('Verify trigger svg attributes', async () => {
      const svg = datePickerTrigger.locator('svg');
      await expect(svg).toHaveAttribute('tabindex', '-1');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
      await expect(svg).toHaveAttribute('width', '16');
      await expect(svg).toHaveAttribute('height', '16');
    });

    const inputTriggr = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    await test.step('Verify input trigger  attributes', async () => {
      await expect(inputTriggr).toHaveAttribute('tabindex', '0');
      await expect(inputTriggr).toHaveAttribute('aria-invalid', 'false');
      await expect(inputTriggr).toHaveAttribute('role', 'combobox');
      await expect(inputTriggr).toHaveAttribute('aria-label', 'Date');
      await expect(inputTriggr).toHaveAttribute('inputmode', 'numeric');
    });

    //
    datePickerTrigger.first().click();
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');

    await test.step('Verify popper attributes', async () => {
      await expect(popper).toHaveAttribute('tabindex', '0');
      await expect(popper).toHaveAttribute('role', 'dialog');
      await expect(popper).toHaveAttribute('data-popper-placement', 'bottom-start');
    });

    await test.step('Verify popper header attributes', async () => {
      const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
      await expect(headPrev).toHaveAttribute('tabindex', '0');
      await expect(headPrev).toHaveAttribute('type', 'button');
      await expect(headPrev).toHaveAttribute('aria-label', 'Previous month');

      const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
      await expect(headTitle).toHaveAttribute('aria-live', 'polite');

      const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
      await expect(headNext).toHaveAttribute('tabindex', '0');
      await expect(headNext).toHaveAttribute('type', 'button');
      await expect(headNext).toHaveAttribute('aria-label', 'Next month');
    });

    await test.step('Verify  calendar attributes', async () => {
      const calendar = page.locator('[data-ui-name="DatePicker.Calendar"]');
      await expect(calendar).toHaveAttribute('tabindex', '0');
      await expect(calendar).toHaveAttribute('role', 'grid');
      await expect(calendar).toHaveAttribute('disabled', '');
    });

    await test.step('Verify weekdays attributes', async () => {
      const weekDaysRow = await page.locator('[data-ui-name="CalendarWeekDays"]');

      const parentRole = await weekDaysRow.getAttribute('role');
      expect(parentRole).toBe('row'); // ожидаемое значение роли для родительского элемента

      const weekDays = await weekDaysRow.locator('[data-ui-name="CalendarWeekDays.Unit"]');

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

        const dayRole = await day.getAttribute('role');
        expect(dayRole).toBe('columnheader'); // ожидаемое значение роли для каждого дня

        const ariaLabel = await day.getAttribute('aria-label');
        expect(ariaLabel).toBe(daysOfWeek[i]); // проверка, что aria-label соответствует дню недели

        const dayText = await day.textContent();
        expect(dayText).toBe(daysOfWeek[i].slice(0, 3)); // проверка, что текст соответствует первому сокращению дня недели (Sun, Mon, Tue и т.д.)
      }
    });

    await test.step('Verify days attributes', async () => {
      const cells = page.locator('[role="gridcell"]');
      const cellCount = await cells.count();

      for (let i = 0; i < cellCount; i++) {
        const cell = cells.nth(i);

        // Пропускаем пустые ячейки без aria-label
        const ariaLabel = await cell.getAttribute('aria-label');
        if (!ariaLabel) continue;

        // Проверка роли
        await expect(cell).toHaveAttribute('role', 'gridcell');

        // Проверка остальных aria-атрибутов
        await expect(cell).toHaveAttribute('aria-colindex');
        await expect(cell).toHaveAttribute('aria-rowindex');
        await expect(cell).toHaveAttribute('aria-selected', 'false');
        await expect(cell).toHaveAttribute('aria-hidden', 'false');

        // Проверка disabled/aria-disabled в зависимости от месяца
        const date = new Date(ariaLabel);
        const month = date.getMonth();
        const isCurrentMonth = month === 5;

        const hasDisabledAttr = (await cell.getAttribute('disabled')) !== null;
        const ariaDisabled = await cell.getAttribute('aria-disabled');

        if (isCurrentMonth) {
          expect(hasDisabledAttr).toBe(false);
          expect(ariaDisabled).toBe('false');
        } else {
          expect(hasDisabledAttr).toBe(true);
          expect(ariaDisabled).toBe('false'); // как указано, всегда false
        }

        // Проверка текста
        const text = await cell.textContent();
        expect(text?.trim()).not.toBe('');
      }
    });
  });

  test('Verify datepicker custom days styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/custom_day_test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const prevButton = page.locator('[data-ui-name="DatePicker.Prev"]');
    const cells = page.locator('[role="gridcell"]');

    await test.step('Verify trigger margins', async () => {
      const marginTop = await datePickerTrigger.first().evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.marginTop;
      });
      expect(marginTop).toBe('8px'); // ожидаемое значение
    });

    await test.step('Verify date picker popper', async () => {
      await datePickerTrigger.first().click();
      //await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover disabled date', async () => {
      const color = await cells.first().evaluate((el) => getComputedStyle(el).color);
      const backgroundColor = await cells
        .first()
        .evaluate((el) => getComputedStyle(el).backgroundColor);
      const margin = await cells.first().evaluate((el) => getComputedStyle(el).margin);

      // Здесь укажи ожидаемые значения в зависимости от темы или дизайна
      expect(color).toBe('rgb(25, 27, 35)'); // пример: серый для disabled
      expect(backgroundColor).toBe('rgb(255, 255, 255)'); // пример: прозрачный фон
      expect(margin).toBe('4px 0px 0px'); // пример: серый для disabled
    });

    await test.step('Verify style of available  date', async () => {
      const color = await cells.nth(2).evaluate((el) => getComputedStyle(el).color);
      const backgroundColor = await cells
        .nth(2)
        .evaluate((el) => getComputedStyle(el).backgroundColor);
      const margin = await cells.nth(2).evaluate((el) => getComputedStyle(el).margin);

      // Здесь укажи ожидаемые значения в зависимости от темы или дизайна
      expect(color).toBe('rgb(25, 27, 35)'); // пример: серый для disabled
      expect(backgroundColor).toBe('rgb(255, 255, 255)'); // пример: прозрачный фон
      expect(margin).toBe('4px 0px 0px'); // пример: серый для disabled
    });

    await test.step('Verify hover  style of available  date', async () => {
      cells.nth(2).hover;
      //shapshot
    });

    const cell = page.locator(
      '[data-ui-name="CalendarDays.Unit"][class*="__startSelected_"][class*="__endSelected_"]',
    );
    await test.step('Verify  style of selected date', async () => {
      const color = await cell.evaluate((el) => getComputedStyle(el).color);
      const backgroundColor = await cell.evaluate((el) => getComputedStyle(el).backgroundColor);
      const margin = await cell.evaluate((el) => getComputedStyle(el).margin);
      const width = await cell.evaluate((el) => getComputedStyle(el).width);
      const height = await cell.evaluate((el) => getComputedStyle(el).height);

      expect(color).toBe('rgb(255, 255, 255)');
      expect(backgroundColor).toBe('rgb(43, 179, 255)');
      expect(margin).toBe('4px 0px 0px');
      expect(width).toBe('32px');
    });
  });

  test('Verify custom days can be selected by the mouse', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/custom_day_test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    // Сохраняем текущее значение
    const initialValue = await input.inputValue();

    await datePicker.first().click();
    await expect(popper).toBeVisible();
    await datePicker.first().click();
    await expect(popper).not.toBeVisible();

    await datePicker.first().click();

    const initialTitle = await headTitle.textContent();

    // Кликаем по кнопке "Previous month"
    await headPrev.click();

    // Ждём пока title обновится
    await expect(headTitle).not.toHaveText(initialTitle!);

    await headNext.click();
    await expect(headTitle).toHaveText(initialTitle!);

    const cells = page.locator('[role="gridcell"]');
    await cells.nth(10).click();
    await expect(popper).not.toBeVisible();
    const newValue = await input.inputValue();
    expect(newValue).not.toBe(initialValue);
  });

  test('Verify custom days by keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/custom_day_test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    // Сохраняем текущее значение
    const initialValue = await input.inputValue();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(popper).not.toBeVisible();
    await expect(input).toBeFocused();

    await page.keyboard.press('Space');
    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(headPrev).toBeFocused();
    await headPrev.hover();
    const initialTitle = await headTitle.textContent();

    //snapshot

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterFirstEnter = await headTitle.textContent();
    expect(titleAfterFirstEnter).not.toBe(initialTitle);

    await expect(headTitle).not.toHaveText(initialTitle!);

    await page.keyboard.press('Tab');
    await expect(headNext).toBeFocused();

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterSecondEnter = await headTitle.textContent();
    expect(titleAfterSecondEnter).toBe(initialTitle);

    await page.keyboard.press('Shift+Tab');
    await expect(headPrev).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(page.locator('[data-ui-name="DatePicker.Calendar"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(popper).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(headNext).toBeFocused();

    await page.keyboard.press('ArrowDown');
    //snapshot

    const highlighted = page.locator('[data-ui-name="CalendarDays.Unit"][class*="highlighted"]');
    await expect(highlighted).toBeVisible();

    const activeElementHandle = await page.evaluateHandle(() => document.activeElement);
    const isFocusedElementHighlighted = await highlighted.evaluate(
      (el, active) => el === active,
      activeElementHandle,
    );

    expect(isFocusedElementHighlighted).toBe(true);

    await page.keyboard.press('Enter');

    await expect(popper).not.toBeVisible();
    const newValue = await input.inputValue();
    expect(newValue).not.toBe(initialValue);

    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Space');

    await expect(popper).not.toBeVisible();
    const newValue2 = await input.inputValue();
    expect(newValue2).not.toBe(newValue);
  });
});

test.describe('DayPikcer with trigger and popper', () => {
  test('Verify mouse nteractions when component uses expanded trigger and popper', async ({
    page,
  }) => {
    const standPath = 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    // Сохраняем текущее значение
    const initialValue = await input.inputValue();

    await datePicker.first().click();
    await expect(popper).toBeVisible();
    await datePicker.first().click();
    await expect(popper).not.toBeVisible();

    await input.fill('04042022');

    await datePicker.first().click();
    //snapshot

    const initialTitle = await headTitle.textContent();

    await headPrev.click();
    await expect(headTitle).not.toHaveText(initialTitle!);

    await headNext.click();
    await expect(headTitle).toHaveText(initialTitle!);

    const cells = page.locator('[role="gridcell"]');
    await cells.nth(10).click();
    await expect(popper).not.toBeVisible();
    const newValue = await input.inputValue();
    expect(newValue).not.toBe(initialValue);
  });

  test('Verify keyboard nteractions when component uses expanded trigger and popper', async ({
    page,
  }) => {
    const standPath = 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    // Сохраняем текущее значение
    const initialValue = await input.inputValue();

    await page.keyboard.press('Tab');
    await input.fill('04042022');

    await page.keyboard.press('Enter');
    //snapshot
    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(popper).not.toBeVisible();
    await expect(input).toBeFocused();

    await page.keyboard.press('Space');
    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(headPrev).toBeFocused();
    await headPrev.hover();
    const initialTitle = await headTitle.textContent();

    //snapshot

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterFirstEnter = await headTitle.textContent();
    expect(titleAfterFirstEnter).not.toBe(initialTitle);

    await expect(headTitle).not.toHaveText(initialTitle!);

    await page.keyboard.press('Tab');
    await expect(headNext).toBeFocused();

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterSecondEnter = await headTitle.textContent();
    expect(titleAfterSecondEnter).toBe(initialTitle);

    await page.keyboard.press('Shift+Tab');
    await expect(headPrev).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(page.locator('[data-ui-name="DatePicker.Calendar"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(todayButton).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('[data-ui-name="DatePicker.Calendar"]')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    //snapshot

    const highlighted = page.locator('[data-ui-name="CalendarDays.Unit"][class*="highlighted"]');
    await expect(highlighted).toBeVisible();

    const activeElementHandle = await page.evaluateHandle(() => document.activeElement);
    const isFocusedElementHighlighted = await highlighted.evaluate(
      (el, active) => el === active,
      activeElementHandle,
    );

    expect(isFocusedElementHighlighted).toBe(true);

    await page.keyboard.press('Enter');

    await expect(popper).not.toBeVisible();
    const newValue = await input.inputValue();
    expect(newValue).not.toBe(initialValue);

    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Space');

    await expect(popper).not.toBeVisible();
    const newValue2 = await input.inputValue();
    expect(newValue2).not.toBe(newValue);
  });
});

test.describe('Disabled dates and Validation', () => {
  test('validation tooltip', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/disabled_dates.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.evaluateHandle(() => {
      window.global = window;
      // @ts-ignore
      window.RealDate = window.Date;
    });
    await page.evaluateHandle(mockDate, '2024-06-13T12:00:00.808Z');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = await page.locator('[data-ui-name="DatePicker.Popper"]');
    const tooltip = await page.locator('[data-ui-name="Tooltip"]');

    await page.keyboard.press('Tab');
    await page.keyboard.type('06');
    await page.keyboard.type('20');

    await page.keyboard.type('2024');
    await expect(datePicker).toHaveAttribute('aria-invalid', 'true');
    await expect(datePicker).toHaveAttribute('aria-haspopop', 'true');

    // await expect(page).toHaveScreenshot();
    await page.keyboard.press('Backspace');
    await page.keyboard.type('24');
    await expect(datePicker).toHaveAttribute('aria-invalid', 'true');
    await page.keyboard.press('Enter');
    await expect(popper).toBeVisible();
    // await expect(page).toHaveScreenshot();

    await page.keyboard.press('Escape');
    await expect(tooltip).toBeVisible();
    await expect(popper).not.toBeVisible();
    // await expect(page).toHaveScreenshot();

    await page.keyboard.press('Escape');
    await expect(tooltip).not.toBeVisible();
    await expect(datePicker).toHaveAttribute('aria-invalid', 'true');
  });

  test('Verify mouse nteractions when component uses expanded trigger and popper', async ({
    page,
  }) => {
    const standPath = 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    // Сохраняем текущее значение
    const initialValue = await input.inputValue();

    await datePicker.first().click();
    await expect(popper).toBeVisible();
    await datePicker.first().click();
    await expect(popper).not.toBeVisible();

    await input.fill('04042022');

    await datePicker.first().click();
    //snapshot

    const initialTitle = await headTitle.textContent();

    await headPrev.click();
    await expect(headTitle).not.toHaveText(initialTitle!);

    await headNext.click();
    await expect(headTitle).toHaveText(initialTitle!);

    const cells = page.locator('[role="gridcell"]');
    await cells.nth(10).click();
    await expect(popper).not.toBeVisible();
    const newValue = await input.inputValue();
    expect(newValue).not.toBe(initialValue);
  });

  test('Verify keyboard nteractions when component uses expanded trigger and popper', async ({
    page,
  }) => {
    const standPath = 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DatePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DatePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DatePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DatePicker.Next"]');
    const todayButton = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');

    // Сохраняем текущее значение
    const initialValue = await input.inputValue();

    await page.keyboard.press('Tab');
    await input.fill('04042022');

    await page.keyboard.press('Enter');
    //snapshot
    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(popper).not.toBeVisible();
    await expect(input).toBeFocused();

    await page.keyboard.press('Space');
    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(headPrev).toBeFocused();
    await headPrev.hover();
    const initialTitle = await headTitle.textContent();

    //snapshot

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterFirstEnter = await headTitle.textContent();
    expect(titleAfterFirstEnter).not.toBe(initialTitle);

    await expect(headTitle).not.toHaveText(initialTitle!);

    await page.keyboard.press('Tab');
    await expect(headNext).toBeFocused();

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterSecondEnter = await headTitle.textContent();
    expect(titleAfterSecondEnter).toBe(initialTitle);

    await page.keyboard.press('Shift+Tab');
    await expect(headPrev).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(page.locator('[data-ui-name="DatePicker.Calendar"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(todayButton).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('[data-ui-name="DatePicker.Calendar"]')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    //snapshot

    const highlighted = page.locator('[data-ui-name="CalendarDays.Unit"][class*="highlighted"]');
    await expect(highlighted).toBeVisible();

    const activeElementHandle = await page.evaluateHandle(() => document.activeElement);
    const isFocusedElementHighlighted = await highlighted.evaluate(
      (el, active) => el === active,
      activeElementHandle,
    );

    expect(isFocusedElementHighlighted).toBe(true);

    await page.keyboard.press('Enter');

    await expect(popper).not.toBeVisible();
    const newValue = await input.inputValue();
    expect(newValue).not.toBe(initialValue);

    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Space');

    await expect(popper).not.toBeVisible();
    const newValue2 = await input.inputValue();
    expect(newValue2).not.toBe(newValue);
  });
});
