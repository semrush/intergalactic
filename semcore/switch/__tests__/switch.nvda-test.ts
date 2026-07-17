import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@switch ${TAG.NVDA}`, () => {
  test('Users can read via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/switch/docs/examples/basic_example.tsx', 'en');

    await nvda.next();
    await nvda.next();

    expect(await nvda.itemText()).toContain('Receive updates');
    await nvda.press('Enter');
    await page.waitForTimeout(300);

    await nvda.press('Enter');
    await page.waitForTimeout(300);
    expect(await nvda.itemText()).toContain('on');
  });
});
