import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@dropdown ${TAG.NVDA}`, () => {
  test('Users can interact with Dropdown via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/dropdown/docs/examples/basic_usage.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, button, collapsed, opens dialog, About export');

    await nvda.interact();
    await nvda.press('Enter');

    await nvda.next();

    expect(await nvda.itemText()).toContain('You can export up to 300 records');
  });
});
