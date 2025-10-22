import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@errors ${TAG.ACCESSIBILITY} `, () => {
  test('Custom error', async ({ page }) => {
    await loadPage(page, 'stories/components/errors/docs/examples/custom-errors.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Templates', async ({ page }) => {
    await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
