import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { mockDate, RealDate } from './utils';

test.describe('Date Range Trigger', () => {
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
    await page.keyboard.press('Tab');
    await page.keyboard.type('05');
    await page.keyboard.type('29');
    await page.keyboard.type('20');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.type('20');
    await page.keyboard.type('05');
    await page.keyboard.type('29');
    await page.keyboard.type('2020');
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
    const standPath = 'stories/components/date-picker/tests/examples/day-range-trigger.tsx';
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

test.describe('DayPicker standart date ranges', () => {
  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // trigger
    const datePickerTrigger =  page.locator('[data-ui-name="DateRangePicker.Trigger"]').nth(4);

    await test.step('Verify trigger aria label', async () => {
      const ariaLabel = await datePickerTrigger.getAttribute('aria-label');
      expect(ariaLabel).toBe('Date field'); // ожидаемое значение
    });

    await test.step('Verify trigger svg attributes', async () => {
      const svg = datePickerTrigger.locator('svg');
      await expect(svg).toHaveAttribute('tabindex', '-1');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
      await expect(svg).toHaveAttribute('width', '16');
      await expect(svg).toHaveAttribute('height', '16');
    });

    const inputTriggr = page.locator('input[data-ui-name="DateRangePicker.Trigger"]');

    await test.step('Verify from date trigger  attributes', async () => {
      await expect(inputTriggr.nth(2)).toHaveAttribute('tabindex', '0');
      await expect(inputTriggr.nth(2)).toHaveAttribute('aria-invalid', 'false');
      await expect(inputTriggr.nth(2)).toHaveAttribute('aria-haspopup', 'dialog');
      await expect(inputTriggr.nth(2)).toHaveAttribute('aria-expanded', 'false');
      await expect(inputTriggr.nth(2)).toHaveAttribute('role', 'combobox');
      await expect(inputTriggr.nth(2)).toHaveAttribute('aria-label', 'From date');
      await expect(inputTriggr.nth(2)).toHaveAttribute('inputmode', 'numeric');
    });

    await test.step('Verify to date trigger  attributes', async () => {
      await expect(inputTriggr.nth(3)).toHaveAttribute('tabindex', '0');
      await expect(inputTriggr.nth(3)).toHaveAttribute('aria-invalid', 'false');
      await expect(inputTriggr.nth(3)).toHaveAttribute('aria-haspopup', 'dialog');
      await expect(inputTriggr.nth(3)).toHaveAttribute('aria-expanded', 'false');
      await expect(inputTriggr.nth(3)).toHaveAttribute('role', 'combobox');
      await expect(inputTriggr.nth(3)).toHaveAttribute('aria-label', 'To Date field');
      await expect(inputTriggr.nth(3)).toHaveAttribute('inputmode', 'numeric');
    });

    //
    datePickerTrigger.click();
    const popper = page.locator('[data-ui-name="DateRangePicker.Popper"]');

    await test.step('Verify popper attributes', async () => {
      await expect(popper).toHaveAttribute('tabindex', '0');
      await expect(popper).toHaveAttribute('role', 'dialog');
      await expect(popper).toHaveAttribute('data-popper-placement', 'bottom-start');
    });

    const header = page.locator('[data-ui-name="DateRangePicker.Header"]');
    await test.step('Verify popper header attributes', async () => {
      const headPrev = header.first().locator('[data-ui-name="DateRangePicker.Prev"]');
      await expect(headPrev).toHaveAttribute('tabindex', '0');
      await expect(headPrev).toHaveAttribute('type', 'button');
      await expect(headPrev).toHaveAttribute('aria-label', 'Previous month');

      const headTitle = header.first().locator('[data-ui-name="DateRangePicker.Title"]');
      await expect(headTitle).toHaveAttribute('aria-live', 'polite');

      const headNext = header.nth(1).locator('[data-ui-name="DateRangePicker.Next"]');
      await expect(headNext).toHaveAttribute('tabindex', '0');
      await expect(headNext).toHaveAttribute('type', 'button');
      await expect(headNext).toHaveAttribute('aria-label', 'Next month');

      const headTitleTo = header.nth(1).locator('[data-ui-name="DateRangePicker.Title"]');
      await expect(headTitleTo).not.toHaveAttribute('aria-live', 'polite');
    });

    await test.step('Verify  calendar attributes', async () => {
      const calendars = page.locator('[data-ui-name="DateRangePicker.Calendar"]');
      const count = await calendars.count();

  for (let i = 0; i < count; i++) {
    const calendar = calendars.nth(i);
    await expect(calendar).toHaveAttribute('role', 'grid');
    await expect(calendar).toHaveAttribute('disabled', '');
  }

  await expect(calendars.first()).toHaveAttribute('tabindex', '0');
  await expect(calendars.nth(1)).toHaveAttribute('tabindex', '-1');
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
    
        await expect(weekDaysRow).toHaveAttribute('role', 'row'); // проверка роли родительского элемента
    
        const weekDays = weekDaysRow.locator('[data-ui-name="CalendarWeekDays.Unit"]');
        const unitCount = await weekDays.count();
        expect(unitCount).toBe(daysOfWeek.length); // на всякий случай убедимся, что 7 дней
    
        for (let i = 0; i < daysOfWeek.length; i++) {
          const day = weekDays.nth(i);
    
          await expect(day).toHaveAttribute('role', 'columnheader'); // роль для единицы недели
          await expect(day).toHaveAttribute('aria-label', daysOfWeek[i]); // полное название дня
    
          const text = (await day.textContent())?.trim();
          expect(text).toBe(daysOfWeek[i].slice(0, 3)); // Sun, Mon и т.д.
        }
      }
    });

    await test.step('Verify days attributes', async () => {
      const cells = page.locator('[data-ui-name="CalendarDays.Unit"]');
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

        // Проверка disabled/aria-disabled в зависимости от месяца
        const date = new Date(ariaLabel);
        const month = date.getMonth();
        const isCurrentMonth = month === 5;

        const hasDisabledAttr = (await cell.getAttribute('disabled')) !== null;
        const ariaDisabled = await cell.getAttribute('aria-disabled');

        if (isCurrentMonth) {
          expect(hasDisabledAttr).toBe(false);
          expect(ariaDisabled).toBe('false');
        } 

        // Проверка текста
        const text = await cell.textContent();
        expect(text?.trim()).not.toBe('');
      }
    });

    await test.step('Verify divider attributes', async () => {
      const divider = page.locator('[data-ui-name="Divider"]');
      await expect(divider).toHaveAttribute('orientation', 'vertical');
      await expect(divider).toHaveAttribute('aria-orientation', 'vertical');
      await expect(divider).toHaveAttribute('role', 'separator');
    });

    const period = page.locator('[data-ui-name="DateRangePicker.Period"]');

    await test.step('Verify DateRangePicker.Period attributes', async () => {
      await expect(period).toHaveAttribute('role', 'listbox');
      await expect(period).toHaveAttribute('aria-label', 'Presets');
    });

    const periodButtons = page.locator('[data-ui-name="DateRangePicker.Period"][data-ui-name="Button"]');

    await test.step('Verify DateRangePicker.Period attributes', async () => {
      const count = await periodButtons.count();

      for (let i = 0; i < count; i++) {
       const button = periodButtons.nth(i);
     await expect(button).toHaveAttribute('type', 'button');
     await expect(button).toHaveAttribute('role', 'option');
      await expect(button).toHaveAttribute('tabindex', '0');
      }
    });

    await test.step('Verify DateRangePicker.Apply attributes', async () => {
      const apply = page.locator('[data-ui-name="DateRangePicker.Apply"]');
     await expect(apply).toHaveAttribute('type', 'button');
      await expect(apply).toHaveAttribute('tabindex', '0');
    
    });

    await test.step('Verify DateRangePicker.Apply attributes', async () => {
      const apply = page.locator('[data-ui-name="DateRangePicker.Reset"]');
     await expect(apply).toHaveAttribute('type', 'button');
      await expect(apply).toHaveAttribute('tabindex', '0');
    
    });

    
  });

  test('Verify daterangepicker  styles', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePickerTrigger = await page.locator('[data-ui-name="DateRangePicker.Trigger"]').nth(4);
    const prevButton = page.locator('[data-ui-name="DateRangePicker.Prev"]');
    const cells = page.locator('[data-ui-name="CalendarDays.Unit"]');
    const apply = page.locator('[data-ui-name="DateRangePicker.Apply"]');


    await test.step('Verify trigger margins', async () => {
      const marginTop = await datePickerTrigger.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.marginTop;
      });
      expect(marginTop).toBe('8px'); // ожидаемое значение
    });

    await test.step('Verify svg dimentions', async () => {
      const svg = datePickerTrigger.locator('svg');
      const paddingLeft = await svg.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.paddingLeft;
      });
      const paddingRight = await svg.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.paddingRight;
      });
      expect(paddingLeft).toBe('8px'); // ожидаемое значение
      expect(paddingRight).toBe('8px'); 

      await expect(svg).toHaveAttribute('width', '16');
      await expect(svg).toHaveAttribute('height', '16');

    });

    await test.step('Verify trigger separatoe padding', async () => {
    const saparator = page.locator('[data-ui-name="DateRange.RangeSep"]').nth(1);
    const paddingRight = await saparator.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.paddingRight;
    });
    expect(paddingRight).toBe('8px'); // ожидаемое значение
  });

    await test.step('Verify date picker popper', async () => {
      await datePickerTrigger.click();
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

    await cells.nth(10).click();
    await cells.nth(11).click();
    await apply.click();
    await datePickerTrigger.click();
    const cell = page.locator(
      '[data-ui-name="CalendarDays.Unit"][class*="Selected"]',
    );

    await test.step('Verify  style of selected date', async () => {
      const color = await cell.nth(1).evaluate((el) => getComputedStyle(el).color);
      const backgroundColor = await cell.nth(1).evaluate((el) => getComputedStyle(el).backgroundColor);
      const margin = await cell.nth(1).evaluate((el) => getComputedStyle(el).margin);
      const width = await cell.nth(1).evaluate((el) => getComputedStyle(el).width);
      const height = await cell.nth(1).evaluate((el) => getComputedStyle(el).height);

      // expect(color).toBe('rgb(255, 255, 255)');
      // expect(backgroundColor).toBe('rgb(67, 186, 255)');
      expect(margin).toBe('4px 0px 0px');
      expect(width).toBe('32px');
      expect(height).toBe('32px');
    });

    await test.step('Verify  hover style of selected date', async () => {
      cell.nth(1).hover();
      //snapshot
    });

    await test.step('Verify hover style for period picker button', async () => {
      await page.locator('[data-ui-name="Button"]').nth(1).hover();
      //snapshot
    });

    await test.step('Verify  style for Applu picker button', async () => {
      const apply= page.locator('[data-ui-name="DateRangePicker.Apply"]');
      const color = await apply.evaluate((el) => getComputedStyle(el).color);
      const backgroundColor = await apply.evaluate((el) => getComputedStyle(el).backgroundColor);

      expect(color).toBe('rgb(255, 255, 255)');
      expect(backgroundColor).toBe('rgb(0, 143, 248)');
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

    const initialValueFrom = await datePicker.nth(2).inputValue();
    const initialValueTo = await datePicker.nth(3).inputValue();
    // Сохраняем текущее значение
  


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

  test('Daterangepicker  keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DateRangePicker.Trigger"]');
    const popper = page.locator('[data-ui-name="DateRangePicker.Popper"]');
    const headPrev = page.locator('[data-ui-name="DateRangePicker.Prev"]');
    const headTitle = page.locator('[data-ui-name="DateRangePicker.Title"]');
    const headNext = page.locator('[data-ui-name="DateRangePicker.Next"]');
    const buttons = page.locator('[data-ui-name="Button"]');
    const input = page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const apply = page.locator('[data-ui-name="DateRangePicker.Apply"]');
    const reset = page.locator('[data-ui-name="DateRangePicker.Reset"]');

   

    // Сохраняем текущее значение


    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(popper).toBeVisible();

    await expect(datePicker.nth(4)).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(popper).not.toBeVisible();
    //await expect(input.nth(3)).toBeFocused();

    await page.keyboard.press('Space');
    await expect(popper).toBeVisible();
    await expect(datePicker.nth(4)).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(headPrev).toBeFocused();
    await headPrev.hover();
    const initialTitleFrom = await headTitle.first().textContent();
    const initialTitleTo = await headTitle.nth(1).textContent();

    //snapshot

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterFirstEnterFrom =  await headTitle.first().textContent();
    const titleAfterFirstEnterTo =  await headTitle.nth(1).textContent();
    expect(titleAfterFirstEnterFrom).not.toBe(initialTitleFrom);
    expect(titleAfterFirstEnterTo).not.toBe(initialTitleTo);

    expect(titleAfterFirstEnterFrom).not.toBe(initialTitleFrom);
    expect(titleAfterFirstEnterTo).not.toBe(initialTitleTo);


    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(headNext).toBeFocused();

    await page.keyboard.press('Enter'); // space don't work - bug!
    const titleAfterSecondEnterFrom =  await headTitle.first().textContent();
    const titleAfterSecondEnterTo =  await headTitle.nth(1).textContent();
    expect(titleAfterSecondEnterFrom).toBe(initialTitleFrom);
    expect(titleAfterSecondEnterTo).toBe(initialTitleTo);

    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('[data-ui-name="DatePicker.Calendar"]').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(buttons.first()).toBeFocused();


    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(apply).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(reset).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(popper).toBeFocused();

    await page.keyboard.press('ArrowLeft');

    const initialValue1 = await input.nth(2).inputValue();
    const initialValue2 = await input.nth(3).inputValue();

    await page.keyboard.press('Escape');

    const initialValue1_1 = await input.nth(2).inputValue();
    const initialValue2_1 = await input.nth(3).inputValue();

    expect(initialValue1_1).toBe(initialValue1);
    expect(initialValue2_1).toBe(initialValue2);
   
    await page.keyboard.press('Space');

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Space');

    const initialValue1_2 = await input.nth(2).inputValue();
    const initialValue2_2 = await input.nth(3).inputValue();

    expect(initialValue1_2).not.toBe(initialValue1_1);
    expect(initialValue2_2).toBe(initialValue2);

    await page.keyboard.press('Space');

    const initialValue1_3 = await input.nth(2).inputValue();
    const initialValue2_3 = await input.nth(3).inputValue();

    expect(initialValue1_3).toBe(initialValue1_2);
    expect(initialValue2_3).not.toBe(initialValue2_2);


    await page.keyboard.press('Escape');

    const initialValue1_4 = await input.nth(2).inputValue();
    const initialValue2_4 = await input.nth(3).inputValue();

    expect(initialValue1_4).toBe(initialValue1);
    expect(initialValue2_4).toBe(initialValue2);


    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Space');

    //snapshot

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Enter');

    await page.keyboard.press('Space');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const initialValue1_5 = await input.nth(2).inputValue();
    const initialValue2_5 = await input.nth(3).inputValue();

    expect(initialValue1_5).toBe(initialValue1);
    expect(initialValue2_5).toBe(initialValue2);

    await expect(popper).not.toBeVisible();

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
  test('Verify validation tooltip', async ({ page }) => {
    const standPath = 'stories/components/date-picker/docs/examples/disabled_dates.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('input[data-ui-name="DatePicker.Trigger"]');
    const popper = await page.locator('[data-ui-name="DatePicker.Popper"]');
    const tooltip = await page.getByRole('tooltip', { name: 'January 1 of this year is off' });

    await page.keyboard.press('Tab');
    await page.keyboard.type('06');
    await page.keyboard.type('20');
    await expect(datePicker).toHaveAttribute('aria-invalid', 'false');

    await page.keyboard.type('2024');
    await expect(datePicker).toHaveAttribute('aria-invalid', 'true');
    await expect(datePicker).toHaveAttribute('aria-haspopup', 'true');

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

    await page.keyboard.press('Escape'); // bug??
    await expect(tooltip).toBeVisible();
    await expect(datePicker).toHaveAttribute('aria-invalid', 'true');
  });

  test('Verify mouse interactions when disabled dates and validation tooltip', async ({
    page,
  }) => {
    const standPath = 'stories/components/date-picker/docs/examples/disabled_dates.tsx';
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

    await input.fill('04/24/2025');

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

  test('Verify keyboard interactions when disabled dates and validation tooltip', async ({
    page,
  }) => {
    const standPath = 'stories/components/date-picker/docs/examples/disabled_dates.tsx';
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
    await input.fill('04/24/2025');

    await page.keyboard.press('Enter');

    await expect(popper).toBeVisible();
    await expect(datePicker.first()).not.toBeFocused();
    await expect(popper).toBeFocused();
    await page.keyboard.press('ArrowRight');
 //snapshot

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

    await page.keyboard.press('Shift+Tab');
    await expect(headNext).toBeFocused();

    await page.keyboard.press('ArrowDown');
    //snapshot

    const highlighted = page.locator('[data-ui-name="CalendarDays.Unit"][class*="highlighted"]');
    await expect(highlighted).toBeVisible();
  });
});


test.describe('Calendar props', () => {
  test('Verify all calendar props work good', async ({ page }) => {
    const standPath = 'stories/components/date-picker/tests/examples/calendar_props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // await expect(page).toHaveScreenshot();
});

});