import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  group: (page: Page) => page.getByRole('radiogroup'),
  card: (page: Page, index?: number) => {
    const base = page.getByRole('radio');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify default, hover, focus and disabled states', {
    tag: [TAG.PRIORITY_HIGH, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en');

    await test.step('Verify initial render with a selected card', async () => {
      await expect(page).toHaveScreenshot('initial-render-with-selected-card.png');
    });

    await test.step('Verify hover state', async () => {
      await locators.card(page, 0).hover();
      await expect(page).toHaveScreenshot('hover-state.png');
    });

    await test.step('Verify focus state', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot('focus-state.png');
    });

    await test.step('Verify disabled card opacity', async () => {
      await expect(locators.card(page, 2)).toHaveCSS('opacity', '0.4');
    });
  });

  test('Verify selected state after click', {
    tag: [TAG.PRIORITY_HIGH, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en');

    await locators.card(page, 3).click();
    await expect(page).toHaveScreenshot('selected-state-after-click.png');
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify click selects a card', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en');

    await test.step('Click on first card selects it', async () => {
      await locators.card(page, 0).click();

      await expect(locators.card(page, 0)).toHaveAttribute('aria-checked', 'true');
      await expect(locators.card(page, 1)).toHaveAttribute('aria-checked', 'false');
    });
  });

  test('Verify disabled card cannot be selected', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en');

    await expect(locators.card(page, 2)).toHaveAttribute('aria-disabled', 'true');
    await expect(locators.card(page, 2)).toHaveCSS('pointer-events', 'none');
  });

  test('Verify roving tabindex', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en');

    await test.step('Only the selected card is tabbable', async () => {
      await expect(locators.card(page, 0)).toHaveAttribute('tabindex', '-1');
      await expect(locators.card(page, 1)).toHaveAttribute('tabindex', '0');
      await expect(locators.card(page, 3)).toHaveAttribute('tabindex', '-1');
    });

    await test.step('ArrowRight skips the disabled card and moves to the next enabled one', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.card(page, 1)).toBeFocused();

      await page.keyboard.press('ArrowRight');

      await expect(locators.card(page, 3)).toBeFocused();
      await expect(locators.card(page, 3)).toHaveAttribute('aria-checked', 'true');
    });
  });

  // TODO: cover ArrowLeft wrap-around, group `disabled` prop, and uncontrolled usage without an initial `value`
});
