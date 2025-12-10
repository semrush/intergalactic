import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@progress-bar ${TAG.NVDA}`, () => {
  test('Users can interact with ProgressBar via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/progress-bar/docs/examples/basic-usage.tsx', 'en');

    await nvda.next();
    expect(await nvda.itemText()).toContain('clickable, Basic Progress Bar example, progress bar, 0 of 2000');
  });
});
