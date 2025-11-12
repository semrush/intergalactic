import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @time-picker`, () => {
  test('Datepicker and timepicker', async ({ page }) => {
    await loadPage(page, 'stories/components/time-picker/docs/examples/expanded_access_to_all_the_components.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe(`${TAG.ACCESSIBILITY} @time-picker @date-picker`, () => {
  test('Datepicker and timepicker', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/datepicker-and-timepicker.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
