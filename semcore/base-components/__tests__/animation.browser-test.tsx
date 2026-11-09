import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

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
test.describe(`${TAG.FUNCTIONAL}`, () => {
  variants.forEach(({ parent, duration, delay }) => {
    test(`Verify ${parent} animation styles with duration=${duration}, delay=${delay}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@animation',
        '@base-components',
        '@flex-box',
        '@button'],
    }, async ({ page }) => {
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

      await expect(parentLocator).toHaveCSS('animation-duration', `${duration / 1000}s`);
      await expect(parentLocator).toHaveCSS('animation-delay', `${delay / 1000}s`);
      await expect(parentLocator).toHaveCSS('animation-timing-function', 'ease-out');
      await expect(parentLocator).toHaveCSS('display', 'block');
    });
  });
});
