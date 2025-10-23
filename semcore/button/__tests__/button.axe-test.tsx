import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@button ${TAG.ACCESSIBILITY}`, () => {
  test('Addons', async ({ page }) => {
    await loadPage(page, 'stories/components/button/docs/examples/addons.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Buttons accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/button/docs/examples/button_accessibility.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Buttons with icon', async ({ page }) => {
    await loadPage(page, 'stories/components/button/docs/examples/button_with_icon.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Buttons with loading', async ({ page }) => {
    await loadPage(page, 'stories/components/button/docs/examples/button_with_loading.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe(`@button @button-link ${TAG.ACCESSIBILITY}`, () => {
  test('Base example', async ({ page }) => {
    await loadPage(page, 'stories/components/button/docs/examples/button_link.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
