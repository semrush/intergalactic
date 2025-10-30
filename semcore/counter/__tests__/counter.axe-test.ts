import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@color-picker  ${TAG.ACCESSIBILITY}`, () => {
  test('Animated number', async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/animated_number.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('Counter and typography', async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_and_typography.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In button', async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_button.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In dot', async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_dot.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In filters', async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_filters.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In forms', async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_forms.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In limits', async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_limits.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In pills', async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_pills.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
