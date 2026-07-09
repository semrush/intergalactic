import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@time-picker ${TAG.NVDA}`, () => {
  test('Users can interact with TimePicker via NVDA', async ({ page, nvda }) => {
    await loadPage(
      page,
      'stories/components/time-picker/docs/examples/expanded_access_to_all_the_components.tsx',
      'en',
    );

    await nvda.next();

    expect(await nvda.itemText()).toBe('clickable, Start time Select, grouping, Hours, combo box, collapsed, has auto complete, editable, 00');

    await nvda.next();

    expect(await nvda.itemText()).toBe('Minutes, combo box, collapsed, has auto complete, editable, 00');

    await nvda.next();

    expect(await nvda.itemText()).toBe('button, AM');

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('PM. Time period changed to PM');
  });
});
