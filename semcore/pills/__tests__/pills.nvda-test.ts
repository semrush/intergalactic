import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@pills ${TAG.NVDA}`, () => {
  test('Users can interact with Pills via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/pills/docs/examples/basic_example.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, grouping, radio button, not checked, Like');
    expect(await nvda.itemText()).toContain('radio');

    await nvda.next();

    expect(await nvda.itemText()).toContain('radio button, checked, Don\'t care');

    await nvda.next();

    expect(await nvda.itemText()).toContain('radio button, not checked, Dislike');
  });
});
