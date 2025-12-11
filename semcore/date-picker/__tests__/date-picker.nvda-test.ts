import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@date-picker ${TAG.NVDA}`, () => {
  test('Users can interact with DatePicker and DateRangePicker via NVDA', async ({
    page,
    nvda,
  }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/datepicker.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, Date, combo box, collapsed, editable, 06 slash 29 slash 2020');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Jun 29, 2020');

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    // Clear existing date and enter new date
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Backspace');
    }
    await page.keyboard.type('05');
    await page.keyboard.type('29');
    await page.keyboard.type('2000');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('dialog. clickable, button, Previous month');

    await nvda.next();
    await nvda.next();

    expect(await nvda.itemText()).toContain('button, Next month');

    await nvda.next();

    expect(await nvda.itemText()).toContain('table, with 3 rows and 42 columns, row 1, column 1, Sun');

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    // Enter date range (start and end dates)
    await page.keyboard.type('05');
    await page.keyboard.type('29');
    await page.keyboard.type('2000');
    await page.keyboard.type('05');
    await page.keyboard.type('29');
    await page.keyboard.type('2000');
    await page.waitForTimeout(300);
    await nvda.next();
    await nvda.previous();

    expect(await nvda.itemText()).toContain('column 1, Sun');
  });
});
