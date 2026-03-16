import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@link ${TAG.ACCESSIBILITY}`, () => {
  test('Link inside the content', async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_in_content.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Link without text', async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_without_text.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Link disabled', async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_disabled.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Link addon', async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_addon.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Link with ellipsis', async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/links_with_ellipsis.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Link color', async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/color_links.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Link as button', async ({ page }) => {
    await loadPage(page, 'stories/components/link/docs/examples/link_as_button.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
