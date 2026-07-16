import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@modal ${TAG.NVDA}`, () => {
  test('Users can interact with Modal via NVDA', async ({ page, nvda }) => {
    await loadPage(
      page,
      'stories/components/modal/docs/examples/basic_modal_window_usage.tsx',
      'en',
    );

    if (typeof nvda.interact === 'function') {
      await nvda.interact();
    }

    await nvda.next();

    expect(await nvda.itemText()).toContain('Open modal');
    expect(await nvda.itemText()).toContain('button');

    await nvda.press('Enter');
    await page.waitForTimeout(500);

    expect(await nvda.itemText()).toContain('Do you want to save your changes?');
    expect(await nvda.itemText()).toContain('dialog');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Do you want to save your changes?');
    expect(await nvda.itemText()).toContain('heading');

    await nvda.next();
    await nvda.next();

    expect(await nvda.itemText()).toContain('Save changes');
    expect(await nvda.itemText()).toContain('button');
  });
});
