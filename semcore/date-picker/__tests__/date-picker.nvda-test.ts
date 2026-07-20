import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@date-picker ${TAG.NVDA}`, () => {
  test('Users can interact with DatePicker and DateRangePicker via NVDA', async ({
    page,
    nvda,
  }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/datepicker.tsx', 'en');

    await nvda.press('Tab');

    expect(await nvda.itemText()).toContain('Date, combo box, collapsed, has auto complete, editable, MM slash DD slash YYYY, 06 slash 29 slash 2020');

    await nvda.next();
    expect(await nvda.itemText()).toContain('06 slash 29 slash 2020');

    await nvda.next();
    expect(await nvda.itemText()).toContain('June 2020');

    await nvda.next();

    expect(await nvda.itemText()).toContain('button, Next month');

    await nvda.next();

    expect(await nvda.itemText()).toContain('table, with 3 rows and 42 columns, row 1, column 1, Sun');
  });
});
