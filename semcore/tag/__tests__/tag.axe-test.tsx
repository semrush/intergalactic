import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@tag ${TAG.ACCESSIBILITY}`, () => {
  test('Adding tag', async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/adding_tag.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Custom tag color', async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/custom_tag_color.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Editing tag', async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/editing_tag.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Grouping tags less', async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/grouping_tags_less.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Grouping tags more', async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/grouping_tags_more.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Removing tag', async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/removing_tag.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Tag addon', async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/tag_addon.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
