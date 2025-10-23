import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Illustration with color', {
    tag: [TAG.PRIORITY_HIGH,
      '@illustration'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/illustration/docs/examples/custom-color.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Illustration sizes', {
    tag: [TAG.PRIORITY_HIGH,
      '@illustration'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/illustration/tests/examples/illustration_sizes.tsx', 'en');

    const expectedDimensions = [
      { width: 40, height: 40 },
      { width: 80, height: 80 },
      { width: 140, height: 140 },
    ];

    const svgs = page.locator('svg');
    const svgCount = await svgs.count();

    for (let i = 0; i < svgCount; i++) {
      const svg = svgs.nth(i);

      const width = await svg.getAttribute('width');
      const height = await svg.getAttribute('height');

      expect(Number(width)).toBe(expectedDimensions[i]?.width);
      expect(Number(height)).toBe(expectedDimensions[i]?.height);
    }
  });
});
