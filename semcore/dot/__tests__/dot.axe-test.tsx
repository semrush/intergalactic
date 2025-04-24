import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

//bug UIK-3605
test.describe('Dot', () => {
  test.skip('Dot with animation', async ({ page }) => {
    const standPath = 'stories/components/dot/docs/examples/example_of_dot_animation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
