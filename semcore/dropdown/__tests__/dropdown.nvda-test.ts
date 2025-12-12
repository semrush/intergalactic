import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@dropdown ${TAG.NVDA}`, () => {
  test('Users can interact with Dropdown via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/dropdown/docs/examples/basic_usage.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, button, collapsed, sub Menu, About export');

    await nvda.interact();
    await nvda.press('Enter');
    await page.waitForTimeout(300);

    await nvda.next();

    expect(await nvda.itemText()).toContain('You can export up to 300 records');
  });
});
