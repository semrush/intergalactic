import { test, expect } from '@playwright/test';
import { loadPage } from '@semcore/testing-utils/shared/helpers';

const variants = [
  { parent: 'Animation', duration: 500, delay: 0 },
  { parent: 'Animation', duration: 500, delay: 500 },
  { parent: 'Animation', duration: 0, delay: 0 },
  { parent: 'FadeInOut', duration: 500, delay: 0 },
  { parent: 'FadeInOut', duration: 500, delay: 500 },
  { parent: 'FadeInOut', duration: 0, delay: 0 },
  { parent: 'Transform', duration: 500, delay: 0 },
];

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe('@functional @animation', () => {
  variants.forEach(({ parent, duration, delay }) => {
    test(`Check ${parent} duration=${duration}, delay=${delay} @priority-high`, async ({ page }) => {
      await loadPage(
        page,
        'stories/components/base-components/animation/tests/examples/basic-usage.tsx',
        'en',
        {
          visible: true,
          duration,
          delay,
          initialAnimation: true,
          timingFunction: 'ease-out',
        },
      );

      const button = page.getByRole('button', { name: parent });
      await expect(button).toBeVisible();

      const parentLocator = button.locator(`xpath=ancestor::*[@data-ui-name="${parent}"]`);
      await expect(parentLocator).toBeVisible();

      const animationStyles = await parentLocator.evaluate((el) => {
        const style = getComputedStyle(el);
        return {
          animationDelay: style.animationDelay,
          animationDuration: style.animationDuration,
          animationTimingFunction: style.animationTimingFunction,
          display: style.display,
        };
      });

      const expectedDuration = `${duration / 1000}s`;
      const expectedDelay = `${delay / 1000}s`;

      await expect(animationStyles.animationDuration).toBe(expectedDuration);
      await expect(animationStyles.animationDelay).toBe(expectedDelay);
      await expect(animationStyles.animationTimingFunction).toBe('ease-out');
      expect(animationStyles.display).toBe('block');

      await button.click();
      await expect(button).toBeVisible();
    });
  });
});
