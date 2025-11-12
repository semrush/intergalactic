import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @switch`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/switch/docs/examples/basic_example.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
  test('Basic example with icon', async ({ page }) => {
    await loadPage(page, 'stories/components/switch/docs/examples/basic_example_with_icon.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
  test('External label', async ({ page }) => {
    await loadPage(page, 'stories/components/switch/docs/examples/external_label.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
});
