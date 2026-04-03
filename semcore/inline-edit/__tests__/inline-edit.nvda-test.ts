import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@inline-edit ${TAG.NVDA}`, () => {
  test('Users can interact with InlineEdit via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/simple_use.tsx', 'en');
    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, button, Edit: Martin Eden');

    await nvda.next();
    expect(await nvda.itemText()).toContain('button, Edit: Martin Eden');

    await nvda.interact();
    await nvda.press('Enter');

    expect(await nvda.itemText()).toContain('Author:, edit, has auto complete, Martin Eden, Save, button, Cancel');
  });
});
