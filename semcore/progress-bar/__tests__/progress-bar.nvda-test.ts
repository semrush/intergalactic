import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@progress-bar ${TAG.NVDA}`, () => {
  test('Users can interact with ProgressBar via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/progress-bar/docs/examples/basic-usage.tsx', 'en');

    const initial = await nvda.next();
    expect(initial).toContain('clickable, Basic Progress Bar example, progress bar, 0 of 2000');

    await test.step('Check that text changes', async () => {
      // Wait for loading state to appear
      await page.waitForTimeout(500);

      await nvda.next();
      await nvda.previous();

      const loading = await nvda.itemText();
      // Button should announce loading state or be disabled during loading
      expect(loading).not.toBe(initial);
    });
  });
});
