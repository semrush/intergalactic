import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@drag-and-drop ${TAG.NVDA}`, () => {
  test('Users can interact with DragAndDrop cards via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx', 'en');

    await nvda.next();
    await nvda.press('Enter');
    await page.waitForTimeout(500);

    expect(await nvda.itemText()).toContain('expanded. Show table columns, dialog. drag and drop container, grouping. Show table columns, dialog. drag and drop container, grouping. Unique Pageviews, checked, Press Space to grab the element for drag and drop, 1 of 5');

    await nvda.next();

    expect(await nvda.itemText()).toBe('Market traffic widget');

    await nvda.press('Space');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toBe('grabbed');

    await nvda.press('Space');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toBe('dropped');
  });
});
