import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@slider ${TAG.ACCESSIBILITY}`, () => {
  test('Slider with options', async ({ page }) => {
    await loadPage(page, 'stories/components/slider/docs/examples/slider_with_options.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    const filtered = violations.filter((v) => v.id !== 'button-name');
    expect(filtered).toEqual([]);
  });

  test('Numeric slider', async ({ page }) => {
    await loadPage(page, 'stories/components/slider/docs/examples/numeric_slider.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    const filtered = violations.filter((v) => v.id !== 'button-name');
    expect(filtered).toEqual([]);
  });

  test('Customized options view', async ({ page }) => {
    await loadPage(page, 'stories/components/slider/docs/examples/customized_options_view.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    const filtered = violations.filter((v) => v.id !== 'button-name');
    expect(filtered).toEqual([]);
  });
});
