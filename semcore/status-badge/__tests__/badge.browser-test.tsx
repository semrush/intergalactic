import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test(`Verify status badge types`, {
    tag: [TAG.PRIORITY_HIGH, '@status-badge'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/status-badge/docs/examples/badge_main_types', 'en');
    await expect(page).toHaveScreenshot();
  });
});
