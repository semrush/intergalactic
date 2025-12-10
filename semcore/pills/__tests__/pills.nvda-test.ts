import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@pills ${TAG.NVDA}`, () => {
  test('Users can interact with Pills via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/pills/docs/examples/basic_example.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Your opinion');
    expect(await nvda.itemText()).toContain('radio');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Like');
    expect(await nvda.itemText()).toContain('radio button');
    expect(await nvda.itemText()).toContain('1 of 3');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Don\'t care');
    expect(await nvda.itemText()).toContain('selected');
    expect(await nvda.itemText()).toContain('2 of 3');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Dislike');
    expect(await nvda.itemText()).toContain('radio button');
    expect(await nvda.itemText()).toContain('3 of 3');

    await page.keyboard.press('Space');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('selected');

    await nvda.previous();

    expect(await nvda.itemText()).toContain('2 of 3');
  });
});
