import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';

test.describe('Tag', () => {
  test('Adding tag', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/adding_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Custom tag color', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/custom_tag_color.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Editing tag', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/editing_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Grouping tags less', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/grouping_tags_less.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Grouping tags more', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/grouping_tags_more.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Removing tag', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/removing_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Tag addon', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/tag_addon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
