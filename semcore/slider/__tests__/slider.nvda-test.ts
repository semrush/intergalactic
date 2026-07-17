import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@slider ${TAG.NVDA}`, () => {
  test('Users can interact with Slider via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/slider/docs/examples/slider_with_options.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('slider');
    expect(await nvda.itemText()).toContain('Medium');

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    await nvda.press('ArrowLeft');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('Small');
  });
});
