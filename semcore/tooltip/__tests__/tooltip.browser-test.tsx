import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  tooltip: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Tooltip"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltipTrigger: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Tooltip.Trigger"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltipPopper: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Tooltip.Popper"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  hint: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Hint"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  hintPopper: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Hint.Popper"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  descriptionTooltipTrigger: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  descriptionTooltipPopper: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltipRole: (page: Page) => page.getByRole('tooltip'),
  dialogRole: (page: Page) => page.getByRole('dialog'),
  button: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  buttonLink: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="ButtonLink"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  link: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Link"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  selectTrigger: (page: Page) => page.locator('[data-ui-name="Select.Trigger"]'),
  option: (page: Page, index?: number) => {
    const base = page.getByRole('option');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(TAG.VISUAL, () => {
  test.describe('Tooltip', () => {
    test('Verify Base example', {
      tag: [TAG.PRIORITY_HIGH, '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/basic_usage.tsx', 'en');

      await test.step('Verify tooltip appearance on focus and hover', async () => {
        const trigger = locators.tooltip(page);
        const triggerRect = (await trigger.first().boundingBox())!;

        await page.keyboard.press('Tab');

        await page.mouse.move(
          triggerRect.x + triggerRect.width / 2,
          triggerRect.y + triggerRect.height / 2,
          {
            steps: 5,
          },
        );
        await locators.tooltipRole(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify Nested trigger', {
      tag: [TAG.PRIORITY_HIGH, '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/nested.tsx', 'en');

      await test.step('Verify nested tooltip on focus', async () => {
        await page.keyboard.press('Tab');
        await locators.tooltipRole(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify ignore portal stacking', {
      tag: [TAG.PRIORITY_MEDIUM, '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/ignore_portal_stacking.tsx', 'en');

      await test.step('Verify tooltip stacking behavior', async () => {
        const popper = locators.tooltipPopper(page);
        const button = locators.button(page);

        await button.click();
        await locators.tooltipRole(page).first().waitFor({ state: 'visible' });
        await expect(popper).toHaveCount(2);
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify responsive behavior', async () => {
        await page.setViewportSize({ width: 700, height: 500 });
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify Singleton tooltip shown by keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/singleton.tsx', 'en');

      await test.step('Verify singleton tooltip with keyboard navigation', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await page.keyboard.press('ArrowDown');
        await locators.tooltipRole(page).waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
      });
    });

    const tooltipThemeVariables = [
      { tooltipTheme: 'default' },
      { tooltipTheme: 'warning' },
      { tooltipTheme: 'invert' },
    ];

    tooltipThemeVariables.forEach((item) => {
      test(`Verify theme=${item.tooltipTheme}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@tooltip'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/tooltip/tests/examples/configurable_tooltip.tsx', 'en', item);

        const trigger = locators.tooltip(page);
        const tooltipPopper = locators.tooltipPopper(page);

        await test.step('Verify tooltip appearance', async () => {
          const triggerRect = (await trigger.first().boundingBox())!;
          await page.mouse.move(
            triggerRect.x + triggerRect.width / 2,
            triggerRect.y + triggerRect.height / 2,
            { steps: 5 },
          );
          await tooltipPopper.first().waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });

    const tooltipPlacementVariables = [
      { tooltipPlacement: 'bottom' },
      { tooltipPlacement: 'right' },
    ];

    tooltipPlacementVariables.forEach((item) => {
      test(`Verify placement=${item.tooltipPlacement}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@tooltip'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/tooltip/tests/examples/configurable_tooltip.tsx', 'en', item);

        const trigger = locators.tooltip(page);
        const tooltipPopper = locators.tooltipPopper(page);

        await test.step('Verify tooltip placement', async () => {
          const triggerRect = (await trigger.first().boundingBox())!;
          await page.mouse.move(
            triggerRect.x + triggerRect.width / 2,
            triggerRect.y + triggerRect.height / 2,
            { steps: 5 },
          );
          await tooltipPopper.first().waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Description tooltip', () => {
    test('Verify Informer', {
      tag: [TAG.PRIORITY_HIGH, '@tooltip', '@description-tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/patterns/ux-patterns/informer/docs/examples/basic-usage.tsx', 'en');

      const linkPopper = locators.link(page);

      await test.step('Verify expanded popper', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
        await page.keyboard.press('Enter');
        await linkPopper.waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus inside popper', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify Base example', {
      tag: [TAG.PRIORITY_HIGH, '@tooltip', '@description-tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/basic_usage.tsx', 'en');

      const trigger = locators.descriptionTooltipTrigger(page);
      const linkPopper = locators.link(page);

      await test.step('Verify tooltip shown on mouse click', async () => {
        await trigger.nth(0).click();
        await linkPopper.waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot();
      });
    });

    const descriptionThemeVariables = [
      { descriptionTheme: 'default' },
      { descriptionTheme: 'warning' },
      { descriptionTheme: 'invert' },
    ];

    descriptionThemeVariables.forEach((item) => {
      test(`Verify theme=${item.descriptionTheme}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@tooltip', '@description-tooltip'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/tooltip/tests/examples/configurable_tooltip.tsx', 'en', item);

        const trigger = locators.descriptionTooltipTrigger(page);
        const popper = locators.descriptionTooltipPopper(page);

        await test.step('Verify description tooltip appearance', async () => {
          await trigger.first().click();
          await popper.first().waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('Hint', () => {
    const hintThemeVariables = [
      { hintTheme: 'default' },
      { hintTheme: 'invert' },
    ];

    hintThemeVariables.forEach((item) => {
      test(`Verify theme=${item.hintTheme}`, {
        tag: [TAG.PRIORITY_MEDIUM, '@tooltip', '@hint'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/tooltip/tests/examples/configurable_tooltip.tsx', 'en', item);

        const trigger = locators.hint(page);
        const hintPopper = locators.hintPopper(page);

        await test.step('Verify hint appearance', async () => {
          const triggerRect = (await trigger.first().boundingBox())!;
          await page.mouse.move(
            triggerRect.x + triggerRect.width / 2,
            triggerRect.y + triggerRect.height / 2,
            { steps: 5 },
          );
          await hintPopper.first().waitFor({ state: 'visible' });
          await expect(page).toHaveScreenshot();
        });
      });
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(TAG.FUNCTIONAL, () => {
  test.describe('Tooltip', () => {
    test('Verify mouse interactions with Base example', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/basic_usage.tsx', 'en');

      const trigger = locators.tooltip(page);
      const tooltip = locators.tooltipRole(page);

      await test.step('Verify tooltip shown on hover', async () => {
        const triggerRect = (await trigger.first().boundingBox())!;

        await page.mouse.move(
          triggerRect.x + triggerRect.width / 2,
          triggerRect.y + triggerRect.height / 2,
          {
            steps: 5,
          },
        );
        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltip).toHaveCount(1);
      });

      await test.step('Verify tooltip shown on mouse click', async () => {
        await trigger.nth(1).click();
        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltip).toHaveCount(1);
      });

      await test.step('Verify not closed on 2nd mouse click', async () => {
        await trigger.nth(1).click();
        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltip).toHaveCount(1);
      });
    });

    test('Verify keyboard interactions with Base example', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/basic_usage.tsx', 'en');

      const tooltip = locators.tooltipRole(page);

      await test.step('Verify tooltip shown on focus', async () => {
        await page.keyboard.press('Tab');
        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltip).toHaveCount(1);
      });

      await test.step('Verify tooltip closed on Escape', async () => {
        await page.keyboard.press('Escape');
        await tooltip.waitFor({ state: 'hidden' });
        await expect(tooltip).toHaveCount(0);
      });

      await test.step('Verify tooltip shown on next focus and not closed by Space', async () => {
        await page.keyboard.press('Tab');
        await tooltip.waitFor({ state: 'visible' });
        await expect(tooltip).toHaveCount(1);
        await page.keyboard.press('Space');
        await expect(tooltip).toBeVisible();
        await expect(tooltip).toHaveCount(1);
      });
    });

    test('Verify keyboard interactions with Nested trigger', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/nested.tsx', 'en');

      const buttonLink = locators.buttonLink(page);
      const tooltip = locators.tooltipRole(page);

      await test.step('Verify tooltip shown on focus', async () => {
        await expect(buttonLink).not.toHaveAttribute('aria-describedby');
        await page.keyboard.press('Tab');

        await tooltip.waitFor({ state: 'visible' });
        await expect(buttonLink).toHaveAttribute('aria-describedby');
        await expect(tooltip).toHaveCount(1);
      });

      await test.step('Verify tooltip closed on Escape', async () => {
        await page.keyboard.press('Escape');
        await tooltip.waitFor({ state: 'hidden' });
        await expect(tooltip).toHaveCount(0);
        await expect(buttonLink).not.toHaveAttribute('aria-describedby');
      });
    });

    test('Verify mouse interactions with Nested trigger', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/nested.tsx', 'en');

      const trigger = locators.tooltipTrigger(page);
      const buttonLink = locators.buttonLink(page);
      const popper = locators.tooltipPopper(page);

      await test.step('Verify tooltip shown on mouse hover', async () => {
        await expect(buttonLink).not.toHaveAttribute('aria-describedby');
        await trigger.hover();
        await page.getByText('Hello, stranger!').waitFor({ state: 'visible' });
        await expect(buttonLink).toHaveAttribute('aria-describedby');

        await expect(popper).toBeVisible();
        await expect(popper).toHaveCount(1);
      });

      await test.step('Verify tooltip not close on mouse click', async () => {
        await trigger.click();
        await page.getByText('Hello, stranger!').waitFor({ state: 'visible' });
        await expect(buttonLink).toHaveAttribute('aria-describedby');

        await expect(popper).toBeVisible();
        await expect(popper).toHaveCount(1);
      });
    });

    const tooltipInteractionVariables = [
      { tooltipInteraction: 'hover' },
      { tooltipInteraction: 'click' },
      { tooltipInteraction: 'focus' },
      { tooltipInteraction: 'none' },
    ];

    tooltipInteractionVariables.forEach((item) => {
      test(`Verify interaction=${item.tooltipInteraction}`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@tooltip'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/tooltip/tests/examples/configurable_tooltip.tsx', 'en', item);

        const trigger = locators.tooltip(page);
        const tooltipPopper = locators.tooltipPopper(page);

        if (item.tooltipInteraction === 'hover') {
          await test.step('Verify tooltip shown on hover', async () => {
            const triggerRect = (await trigger.first().boundingBox())!;
            await page.mouse.move(
              triggerRect.x + triggerRect.width / 2,
              triggerRect.y + triggerRect.height / 2,
              { steps: 5 },
            );
            await tooltipPopper.first().waitFor({ state: 'visible' });
            await expect(tooltipPopper).toHaveCount(1);
          });
        } else if (item.tooltipInteraction === 'click') {
          await test.step('Verify tooltip shown on click', async () => {
            await trigger.first().click();
            await tooltipPopper.first().waitFor({ state: 'visible' });
            await expect(tooltipPopper).toHaveCount(1);
          });

          await test.step('Verify tooltip closed on 2nd click', async () => {
            await trigger.first().click();
            await expect(tooltipPopper).toHaveCount(0);
          });
        } else if (item.tooltipInteraction === 'focus') {
          await test.step('Verify tooltip shown on focus', async () => {
            await page.keyboard.press('Tab');
            await tooltipPopper.first().waitFor({ state: 'visible' });
            await expect(tooltipPopper).toHaveCount(1);
          });

          await test.step('Verify tooltip closed on Escape', async () => {
            await page.keyboard.press('Escape');
            await tooltipPopper.first().waitFor({ state: 'hidden' });
            await expect(tooltipPopper).toHaveCount(0);
          });
        } else if (item.tooltipInteraction === 'none') {
          await test.step('Verify tooltip not shown on hover', async () => {
            const triggerRect = (await trigger.first().boundingBox())!;
            await page.mouse.move(
              triggerRect.x + triggerRect.width / 2,
              triggerRect.y + triggerRect.height / 2,
              { steps: 5 },
            );
            await expect(tooltipPopper).toHaveCount(0);
          });

          await test.step('Verify tooltip not shown on click', async () => {
            await trigger.first().click();
            await expect(tooltipPopper).toHaveCount(0);
          });
        }
      });
    });

    test('Verify Singleton tooltip shown by mouse interactions', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/singleton.tsx', 'en');

      const options = locators.option(page);
      const optionsCount = await options.count();
      const tooltip = locators.tooltipRole(page);

      await test.step('Verify singleton tooltip on hover', async () => {
        await locators.selectTrigger(page).click();
        await options.first().waitFor({ state: 'visible' });
        for (let i = 0; i < optionsCount; i++) {
          await expect(options.nth(i)).not.toHaveAttribute('aria-labelledby');
        }

        await options.nth(2).hover();
        await tooltip.waitFor({ state: 'visible' });

        for (let i = 0; i < optionsCount; i++) {
          await expect(options.nth(i)).toHaveAttribute('aria-labelledby');
        }
        await expect(tooltip).toHaveCount(1);
      });
    });
  });

  test.describe('Description tooltip', () => {
    test('Verify keyboard interactions with Informer Example', {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@tooltip', '@description-tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/patterns/ux-patterns/informer/docs/examples/basic-usage.tsx', 'en');

      const trigger = locators.descriptionTooltipTrigger(page);
      const popper = locators.dialogRole(page);
      const linkPopper = locators.link(page);

      await test.step('Verify tab focuses trigger but tooltip not shown', async () => {
        await page.keyboard.press('Tab');

        await expect(trigger.nth(0)).toBeFocused();

        await expect(popper).not.toBeVisible();
        await expect(popper).toHaveCount(0);
      });

      await test.step('Verify Enter expands popper', async () => {
        await page.keyboard.press('Enter');
        await linkPopper.waitFor({ state: 'visible' });

        await expect(trigger.nth(0)).not.toBeFocused();

        await expect(popper).toBeVisible();
        await expect(popper).toHaveCount(1);
        await expect(popper).toBeFocused();
        await expect(linkPopper).not.toBeFocused();
      });

      await test.step('Verify Escape closes popper', async () => {
        await page.keyboard.press('Escape');
        await linkPopper.waitFor({ state: 'hidden' });

        await expect(trigger.nth(0)).toBeFocused();

        await expect(popper).not.toBeVisible();
      });

      await test.step('Verify Space expands popper', async () => {
        await page.keyboard.press('Space');
        await linkPopper.waitFor({ state: 'visible' });

        await expect(trigger.nth(0)).not.toBeFocused();

        await expect(popper).toBeVisible();
        await expect(popper).toHaveCount(1);
        await expect(popper).toBeFocused();
        await expect(linkPopper).not.toBeFocused();
      });

      await test.step('Verify Tab switches focus inside the popper', async () => {
        await page.keyboard.press('Tab');
        await expect(popper).not.toBeFocused();
        await expect(linkPopper).toBeFocused();
      });

      await test.step('Verify Escape closes popper when link focused', async () => {
        await page.keyboard.press('Escape');
        await linkPopper.waitFor({ state: 'hidden' });

        await expect(trigger.nth(0)).toBeFocused();

        await expect(popper).not.toBeVisible();
      });

      await test.step('Verify Tab closes popper', async () => {
        await page.keyboard.press('Enter');
        await linkPopper.waitFor({ state: 'visible' });

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await linkPopper.waitFor({ state: 'hidden' });

        await expect(trigger.nth(0)).toBeFocused();
        await expect(popper).not.toBeVisible();
      });

      await test.step('Verify Tab switch focus to next trigger', async () => {
        await page.keyboard.press('Tab');

        await expect(trigger.nth(1)).toBeFocused();
        await expect(popper).not.toBeVisible();
      });
    });

    test('Verify mouse interactions with Base example', {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@tooltip', '@description-tooltip'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/tooltip/docs/examples/basic_usage.tsx', 'en');

      const trigger = locators.descriptionTooltipTrigger(page);
      const popper = locators.dialogRole(page);
      const linkPopper = locators.link(page);

      await test.step('Verify tooltip not shown on hover', async () => {
        const triggerRect = (await trigger.first().boundingBox())!;

        await page.mouse.move(
          triggerRect.x + triggerRect.width / 2,
          triggerRect.y + triggerRect.height / 2,
          {
            steps: 5,
          },
        );
        await expect(popper).not.toBeVisible();
      });

      await test.step('Verify tooltip shown on mouse click', async () => {
        await trigger.nth(0).click();
        await linkPopper.waitFor({ state: 'visible' });

        await expect(popper).toBeVisible();
        await expect(popper).toHaveCount(1);
      });

      await test.step('Verify tooltip closed on 2nd click', async () => {
        await trigger.nth(0).click();
        await expect(popper).not.toBeVisible();
      });
    });

    const descriptionInteractionVariables = [
      { descriptionInteraction: 'hover' },
      { descriptionInteraction: 'click' },
      { descriptionInteraction: 'focus' },
      { descriptionInteraction: 'none' },
    ];

    descriptionInteractionVariables.forEach((item) => {
      test(`Verify interaction=${item.descriptionInteraction}`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, TAG.KEYBOARD, '@tooltip', '@description-tooltip'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/tooltip/tests/examples/configurable_tooltip.tsx', 'en', item);

        const trigger = locators.descriptionTooltipTrigger(page);
        const popper = locators.descriptionTooltipPopper(page);

        if (item.descriptionInteraction === 'hover') {
          await test.step('Verify description tooltip shown on hover', async () => {
            const triggerRect = (await trigger.first().boundingBox())!;
            await page.mouse.move(
              triggerRect.x + triggerRect.width / 2,
              triggerRect.y + triggerRect.height / 2,
              { steps: 5 },
            );
            await popper.first().waitFor({ state: 'visible' });
            await expect(popper).toBeVisible();
            await expect(popper).toHaveCount(1);
          });

          await test.step('Verify description tooltip closes on mouse leave', async () => {
            await page.mouse.move(0, 0, { steps: 5 });
            await popper.first().waitFor({ state: 'hidden' });
            await expect(popper).not.toBeVisible();
          });
        } else if (item.descriptionInteraction === 'click') {
          await test.step('Verify description tooltip not shown on hover', async () => {
            const triggerRect = (await trigger.first().boundingBox())!;
            await page.mouse.move(
              triggerRect.x + triggerRect.width / 2,
              triggerRect.y + triggerRect.height / 2,
              { steps: 5 },
            );
            await expect(popper).not.toBeVisible();
          });

          await test.step('Verify description tooltip shown on click', async () => {
            await trigger.first().click();
            await popper.first().waitFor({ state: 'visible' });
            await expect(popper).toBeVisible();
            await expect(popper).toHaveCount(1);
          });

          await test.step('Verify description tooltip closed on 2nd click', async () => {
            await trigger.first().click();
            await popper.first().waitFor({ state: 'hidden' });
            await expect(popper).not.toBeVisible();
          });
        } else if (item.descriptionInteraction === 'focus') {
          await test.step('Verify description tooltip shown on focus', async () => {
            for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');
            await popper.first().waitFor({ state: 'visible' });
            await expect(popper).toBeVisible();
            await expect(popper).toHaveCount(1);
          });

          await test.step('Verify description tooltip closed on Escape', async () => {
            await page.keyboard.press('Escape');
            await popper.first().waitFor({ state: 'hidden' });
            await expect(popper).not.toBeVisible();
          });
        } else if (item.descriptionInteraction === 'none') {
          await test.step('Verify description tooltip not shown on hover', async () => {
            const triggerRect = (await trigger.first().boundingBox())!;
            await page.mouse.move(
              triggerRect.x + triggerRect.width / 2,
              triggerRect.y + triggerRect.height / 2,
              { steps: 5 },
            );
            await expect(popper).toHaveCount(0);
          });

          await test.step('Verify description tooltip not shown on click', async () => {
            await trigger.first().click();
            await expect(popper).toHaveCount(0);
          });

          await test.step('Verify description tooltip not shown on focus', async () => {
            await page.keyboard.press('Tab');
            await expect(popper).toHaveCount(0);
          });
        }
      });
    });
  });

  test.describe('Hint', () => {
    const hintThemeVariables = [
      { hintTheme: 'default' },
      { hintTheme: 'invert' },
    ];

    hintThemeVariables.forEach((item) => {
      test(`Verify hint=${item.hintTheme} mouse interaction`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@tooltip', '@hint'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/tooltip/tests/examples/configurable_tooltip.tsx', 'en', item);

        const trigger = locators.hint(page);
        const hintPopper = locators.hintPopper(page);

        await test.step('Verify hint shown on hover', async () => {
          const triggerRect = (await trigger.first().boundingBox())!;
          await page.mouse.move(
            triggerRect.x + triggerRect.width / 2,
            triggerRect.y + triggerRect.height / 2,
            { steps: 5 },
          );
          await hintPopper.first().waitFor({ state: 'visible' });
          await expect(hintPopper).toBeVisible();
          await expect(hintPopper).toHaveCount(1);
          await expect(hintPopper).toHaveAttribute('aria-hidden', 'true');
        });

        await test.step('Verify hint closes on mouse leave', async () => {
          await page.mouse.move(0, 0, { steps: 5 });
          await hintPopper.first().waitFor({ state: 'hidden' });
          await expect(hintPopper).not.toBeVisible();
        });
      });
      test(`Verify hint=${item.hintTheme} keyboard interaction`, {
        tag: [TAG.PRIORITY_MEDIUM, TAG.MOUSE, '@tooltip', '@hint'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/tooltip/tests/examples/configurable_tooltip.tsx', 'en', item);

        const hintPopper = locators.hintPopper(page);

        await test.step('Verify hint shown focus', async () => {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');

          await page.keyboard.press('Tab');

          await hintPopper.first().waitFor({ state: 'visible' });
          await expect(hintPopper).toBeVisible();
          await expect(hintPopper).toHaveCount(1);
          await expect(hintPopper).toHaveAttribute('aria-hidden', 'true');
        });

        await test.step('Verify hint closes on Esc', async () => {
          await page.keyboard.press('Escape');

          await hintPopper.first().waitFor({ state: 'hidden' });
          await expect(hintPopper).not.toBeVisible();
        });
      });
    });
  });
});
