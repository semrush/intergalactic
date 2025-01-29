import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Basic usage', () => {
  test('Check props', async ({ page }) => {
    const standPath = 'stories/components/animation/tests/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const animationDiv = page.locator('[data-ui-name="Animation"]');


    const animationStyles = await animationDiv.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        animationDelay: style.animationDelay,
        animationDuration: style.animationDuration,
        animationFillMode: style.animationFillMode,
        animationTimingFunction: style.animationTimingFunction,
        display: style.display,
      };
    });

    // Assertions for each property
    expect(animationStyles.animationDelay).toBe('0s');
    expect(animationStyles.animationDuration).toBe('0.5s');
    expect(animationStyles.animationFillMode).toBe('both');
    expect(animationStyles.animationTimingFunction).toBe('ease-out');
    expect(animationStyles.display).toBe('block');
  });
});
