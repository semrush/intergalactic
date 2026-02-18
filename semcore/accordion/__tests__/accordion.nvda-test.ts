import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@accordion ${TAG.NVDA}`, () => {
  test('Users can interact with Accordion via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Section 1, region, Hello Section 1');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Section 2');
    expect(await nvda.itemText()).toContain('collapsed');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Section 3');
    expect(await nvda.itemText()).toContain('collapsed');

    await nvda.interact();
    expect(await nvda.itemText()).toContain('heading, level 3, button, collapsed, Section 3');
  });
});
