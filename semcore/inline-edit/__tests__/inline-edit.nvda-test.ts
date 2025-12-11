import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@inline-edit ${TAG.NVDA}`, () => {
  test('Users can interact with InlineEdit via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/simple_use.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, button, Edit:Martin Eden');

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('Author, Edit:Martin Eden');

    // Clear existing text and type new value
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Backspace');
    }
    await page.keyboard.type('Algernon');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('Edit:Algernon');

    // Test canceling edit with Escape
    await nvda.press('Enter');
    await page.waitForTimeout(300);

    await page.keyboard.type('Hello world?');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('Algernon');
  });
});
