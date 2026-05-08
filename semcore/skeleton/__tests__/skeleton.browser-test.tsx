import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  skeleton: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="SkeletonSVG"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Button"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify text initial loading styles', {
    tag: [TAG.PRIORITY_HIGH, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/skeleton/docs/examples/text_initial_loading.tsx', 'en');

    await locators.skeleton(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await expect(locators.skeleton(page)).toHaveAttribute('preserveAspectRatio', 'none');

    const styleAttr = await locators.skeleton(page).getAttribute('style');
    expect(styleAttr).toContain('2000ms');

    await locators.button(page).click();
    await expect(locators.skeleton(page)).not.toBeVisible();
  });

  test('Verify skeleton for charts', {
    tag: [TAG.PRIORITY_HIGH, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/skeleton/docs/examples/skeleton_examples_for_charts.tsx', 'en');

    const card = page.locator('[data-ui-name="Card"]');
    const count = await card.count();

    for (let i = 0; i < count; i++) {
      const currentCard = card.nth(i);
      const title = await currentCard.locator('[data-ui-name="Card.Title"]').textContent();

      await currentCard.scrollIntoViewIfNeeded();
      await expect(currentCard).toBeVisible();

      const clip = await currentCard.boundingBox();
      if (!clip) {
        throw new Error(`Card "${title}" is not available for screenshot`);
      }

      await expect(page).toHaveScreenshot(`${title}.png`, { clip });
    }
  });

  const themeVariables = [
    { theme: 'dark', amount: 1, duration: 0 },
    { theme: 'invert', amount: 1, duration: 0 },
    { theme: 'dark', amount: 3, duration: 0 },
    { theme: 'invert', amount: 5, width: '60%', duration: 0 },
  ];
  themeVariables.forEach((item) => {
    test(`Verify theme=${item.theme}, amount=${item.amount}`, {
      tag: [TAG.PRIORITY_HIGH, '@skeleton'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/skeleton/tests/examples/skeleton-themes.tsx', 'en', item);

      await test.step('Verify skeleton visibility', async () => {
        await expect(locators.skeleton(page, 0)).toBeVisible();
      });

      await test.step('Verify screenshot', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify observeParentSize prop styles', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/skeleton/tests/examples/observe-parent-size.tsx', 'en');

    const styleAttr = await locators.skeleton(page, 1).getAttribute('style');
    await expect(locators.skeleton(page, 0)).toHaveAttribute('width', '100%');
    expect(styleAttr).toContain('300px');

    await locators.button(page).click();
    await page.waitForTimeout(100);
    await expect(locators.skeleton(page, 0)).toHaveAttribute('width', '100%');
    expect(styleAttr).toContain('300px');
    await expect(page).toHaveScreenshot();
  });

  test('Verify usage with other elements styles', {
    tag: [TAG.PRIORITY_MEDIUM, '@skeleton'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/skeleton/docs/examples/usage_with_other_elements.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });
});
