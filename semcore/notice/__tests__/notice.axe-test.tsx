import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@notice ${TAG.ACCESSIBILITY}`, () => {
  test('Verify basic notice accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice/docs/examples/basic_notice.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify custom notice accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice/docs/examples/custom_notice.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify NoticeSmart accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice/docs/examples/noticesmart.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
