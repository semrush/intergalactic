import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
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

    expect(await nvda.itemText()).toBe('Start time');

    await nvda.next();

    expect(await nvda.itemText()).toBe('Minutes');

    await nvda.next();

    expect(await nvda.itemText()).toBe('button , AM');

    await nvda.previous();
    await nvda.previous();

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    await page.keyboard.type('04');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);

    await page.keyboard.type('20');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('Time input');
    expect(await nvda.itemText()).toContain('4:20 AM');
  });
});
