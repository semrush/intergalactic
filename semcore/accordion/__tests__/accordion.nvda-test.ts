import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@accordion ${TAG.NVDA}`, () => {
  test('Users can interact with Accordion via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Section 1');
    expect(await nvda.itemText()).toContain('expanded');
    expect(await nvda.itemText()).toContain('button');

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('Section 1');
    expect(await nvda.itemText()).toContain('collapsed');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Section 2');
    expect(await nvda.itemText()).toContain('collapsed');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Section 3');
    expect(await nvda.itemText()).toContain('collapsed');

    await nvda.previous();
    await nvda.previous();

    expect(await nvda.itemText()).toContain('Section 1');
    expect(await nvda.itemText()).toContain('collapsed');

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('expanded');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Hello Section 1');

    await nvda.previous();

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('collapsed');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Section 2');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Section 3');

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('Section 3');
    expect(await nvda.itemText()).toContain('collapsed');
  });
});
