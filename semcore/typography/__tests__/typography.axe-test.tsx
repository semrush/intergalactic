import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@typography ${TAG.ACCESSIBILITY}`, () => {
  test('Verify Blockquote with and without author have no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/tests/examples/blockquote.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify all list types have no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/tests/examples/list-axe-test.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify heading and paragraphs have no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/tests/examples/text-font-size-and-weight-headers-and-paragrapsh.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify basic typography usage has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/basic-usage.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify main headings have no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/headings-main.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify other headings have no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/headings-other.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify paragraphs have no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/paragraphs.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify list with custom bullets has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/list-with-custom-bullets.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify list with custom content has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/list-with-custom-content.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify FormatText nested lists have no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/formattext-nested-lists.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify text styles have no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/text-styles.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify text colors have no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/typography/docs/examples/text-colors.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
