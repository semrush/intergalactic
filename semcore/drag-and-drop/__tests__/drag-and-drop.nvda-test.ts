import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@drag-and-drop ${TAG.NVDA}`, () => {
  test('Users can interact with DragAndDrop cards via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx', 'en');

    await nvda.next();
    await nvda.press('Enter');
    await page.waitForTimeout(500);

    const openLog = (await nvda.spokenPhraseLog()).join(' ');
    expect(openLog).toContain('Show table columns, dialog');
    expect(openLog).toContain(
      'Unique Pageviews, checked, Press Space to grab the element for drag and drop, 1 of 5',
    );

    await nvda.next();

    expect(await nvda.itemText()).toBe('Unique Visitors, not checked, Press Space to grab the element for drag and drop, 2 of 5');

    await nvda.press('Space');

    expect(await nvda.itemText()).toBe('space. alert, Unique Visitors grabbed. Current position: 2 out of 5. Use the arrows to change the position, Space to apply the new position, Escape to cancel.');

    await nvda.press('ArrowDown');
    await nvda.press('Space');

    expect(await nvda.itemText()).toBe('space. Position 3 applied. Unique Visitors, not checked, Press Space to grab the element for drag and drop, 3 of 5');
  });
});
