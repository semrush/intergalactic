import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@switch ${TAG.NVDA}`, () => {
  test('Users can interact with Switch via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/switch/docs/examples/basic_example.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('check box, checked, Receive updates');

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('not checked');
  });
});
