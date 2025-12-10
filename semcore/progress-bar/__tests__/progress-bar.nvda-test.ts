import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@progress-bar ${TAG.NVDA}`, () => {
  test('Users can interact with ProgressBar via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/progress-bar/docs/examples/basic-usage.tsx', 'en');

    await nvda.next();

    for (let i = 0; i < 10; i++) {
      expect(await nvda.itemText()).toContain('% progress indicator');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  });
});
