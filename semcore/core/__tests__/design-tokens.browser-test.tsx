import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  button: (page: Page, name: string) => page.getByRole('button', { name }),
  parentDiv: (page: Page, button: ReturnType<Page['getByRole']>) => button.locator('..'),
  switch: (page: Page) => page.locator('[data-ui-name="Switch"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify tokens apply for switch and svg', {
    tag: [TAG.PRIORITY_HIGH, '@design-tokens'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/utils/design-tokens/docs/examples/tokens-with-custom-component.tsx', 'en');

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify state after switch toggle', async () => {
      await locators.switch(page).click();
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Theme providers', () => {
    test('Verify violet primary control theme', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@design-tokens'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/utils/design-tokens/docs/examples/themeprovider.tsx', 'en');

      const button = locators.button(page, 'Violet primary control theme');
      const parentDiv = locators.parentDiv(page, button);

      await test.step('Verify CSS custom properties', async () => {
        const primaryInfoColor = await parentDiv.evaluate((el) =>
          getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info'),
        );
        const primaryInfoHoverColor = await parentDiv.evaluate((el) =>
          getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info-hover'),
        );
        const primaryInfoActiveColor = await parentDiv.evaluate((el) =>
          getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info-active'),
        );

        expect(primaryInfoColor).toBe('#8649e1');
        expect(primaryInfoHoverColor).toBe('#5925ab');
        expect(primaryInfoActiveColor).toBe('#5925ab');
      });

      await test.step('Verify initial button background color', async () => {
        const initialColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(initialColor).toBe('rgb(134, 73, 225)'); // #8649e1 in rgb
      });

      if (browserName !== 'firefox') {
        await test.step('Verify hover state color', async () => {
          // hover works weird on ff
          await button.hover();
          const hoverColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
          expect(hoverColor).toBe('rgb(89, 37, 171)'); // #5925ab in rgb
        });
      }

      await test.step('Verify active state color on mouse down', async () => {
        const buttonBox = await button.boundingBox();
        if (buttonBox) {
          await page.mouse.move(buttonBox.x + buttonBox.width / 2, buttonBox.y + buttonBox.height / 2);
          await page.mouse.down();

          // Wait for active state to be applied
          await expect(button).toHaveCSS('background-color', 'rgb(89, 37, 171)', { timeout: 1000 });

          const clickColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
          expect(clickColor).toBe('rgb(89, 37, 171)'); // #5925ab in rgb

          await page.mouse.up();
        }
      });
    });

    test('Verify grey primary control theme', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@design-tokens'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/utils/design-tokens/docs/examples/themeprovider.tsx', 'en');

      const button = locators.button(page, 'Gray primary control theme');
      const parentDiv = locators.parentDiv(page, button);

      await test.step('Verify CSS custom properties', async () => {
        const primaryInfoColor = await parentDiv.evaluate((el) =>
          getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info'),
        );
        const primaryInfoHoverColor = await parentDiv.evaluate((el) =>
          getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info-hover'),
        );
        const primaryInfoActiveColor = await parentDiv.evaluate((el) =>
          getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info-active'),
        );

        expect(primaryInfoColor).toBe('#6c6e79');
        expect(primaryInfoHoverColor).toBe('#484a54');
        expect(primaryInfoActiveColor).toBe('#2b2e38');
      });

      await test.step('Verify initial button background color', async () => {
        const initialColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(initialColor).toBe('rgb(108, 110, 121)'); // #6c6e79 in rgb
      });

      if (browserName !== 'firefox') {
        await test.step('Verify hover state color', async () => {
          // hover works weird on ff
          await button.hover();
          const hoverColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
          expect(hoverColor).toBe('rgb(72, 74, 84)'); // #484a54 in rgb
        });
      }

      await test.step('Verify active state color on mouse down', async () => {
        const buttonBox = await button.boundingBox();
        if (buttonBox) {
          await page.mouse.move(buttonBox.x + buttonBox.width / 2, buttonBox.y + buttonBox.height / 2);
          await page.mouse.down();

          // Wait for active state to be applied
          await expect(button).toHaveCSS('background-color', 'rgb(43, 46, 56)', { timeout: 1000 });

          const clickColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
          expect(clickColor).toBe('rgb(43, 46, 56)'); // #2b2e38 in rgb

          await page.mouse.up();
        }
      });
    });
  });
});
