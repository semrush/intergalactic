import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  group: (page: Page) => page.getByRole('radiogroup'),
  /* The radio itself is a visually hidden native <input type='radio'>. */
  card: (page: Page, index?: number) => {
    const base = page.getByRole('radio');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  /*
    The visible card is the <label> wrapping the input - all card styling
    (hover, selected, disabled, focus ring) lives here, not on the input.
  */
  cardLabel: (page: Page, index?: number) => {
    const base = page.getByRole('radiogroup').locator('label');
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
      await locators.cardLabel(page, 0).hover();
      await expect(page).toHaveScreenshot('hover-state.png');
    });

    await test.step('Verify focus state', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot('focus-state.png');
    });

    await test.step('Verify disabled card opacity', async () => {
      await expect(locators.cardLabel(page, 2)).toHaveCSS('opacity', '0.4');
    });
  });

  test('Verify selected state after click', {
    tag: [TAG.PRIORITY_HIGH, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en');

    await locators.cardLabel(page, 3).click();
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
      await locators.cardLabel(page, 0).click();

      await expect(locators.card(page, 0)).toBeChecked();
      await expect(locators.card(page, 1)).not.toBeChecked();
    });
  });

  test('Verify disabled card cannot be selected', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en');

    await expect(locators.card(page, 2)).toBeDisabled();
    await expect(locators.card(page, 2)).not.toBeChecked();
    await expect(locators.cardLabel(page, 2)).toHaveCSS('pointer-events', 'none');
  });

  /*
    RadioCards renders native <input type='radio'> elements sharing one `name`, so
    focus behaves per the native radio group: a single Tab stop lands on the checked
    radio, and arrow keys move focus and selection together, skipping disabled cards.
    Nothing sets a `tabindex` attribute, so this is asserted via focus, not attributes.
  */
  test('Verify a single tab stop lands on the checked card', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en');

    await test.step('Tab focuses the checked card, not the first one', async () => {
      await page.keyboard.press('Tab');

      await expect(locators.card(page, 1)).toBeFocused();
      await expect(locators.card(page, 1)).toBeChecked();
    });

    /*
      Tab moves focus past the group, and the stand has nothing focusable after it.
      Where focus lands then is browser-specific: Chromium/WebKit reset
      document.activeElement to <body>, while Firefox keeps it on the last focused
      element. So assert only that Tab did not step onto another card.
    */
    await test.step('Tab again does not move focus between cards', async () => {
      await page.keyboard.press('Tab');

      for (const index of [0, 2, 3]) {
        await expect(locators.card(page, index)).not.toBeFocused();
      }
    });
  });

  test('Verify ArrowRight skips the disabled card', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.card(page, 1)).toBeFocused();

    await page.keyboard.press('ArrowRight');

    await expect(locators.card(page, 3)).toBeFocused();
    await expect(locators.card(page, 3)).toBeChecked();
    await expect(locators.card(page, 2)).not.toBeChecked();
  });

  test('Verify ArrowLeft navigation and wrap-around', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { disabledCard: 'none' });

    await test.step('ArrowLeft moves to the previous card', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.card(page, 1)).toBeFocused();

      await page.keyboard.press('ArrowLeft');

      await expect(locators.card(page, 0)).toBeFocused();
      await expect(locators.card(page, 0)).toBeChecked();
    });

    await test.step('ArrowLeft on the first card wraps around to the last one', async () => {
      await page.keyboard.press('ArrowLeft');

      await expect(locators.card(page, 3)).toBeFocused();
      await expect(locators.card(page, 3)).toBeChecked();
    });

    await test.step('ArrowRight on the last card wraps around to the first one', async () => {
      await page.keyboard.press('ArrowRight');

      await expect(locators.card(page, 0)).toBeFocused();
      await expect(locators.card(page, 0)).toBeChecked();
    });
  });

  test('Verify group disabled prop disables every card', {
    tag: [TAG.PRIORITY_HIGH, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { disabled: true });

    await expect(locators.group(page)).toHaveAttribute('aria-disabled', 'true');

    const cards = locators.card(page);
    const count = await cards.count();

    for (let index = 0; index < count; index++) {
      await expect(cards.nth(index)).toBeDisabled();
    }
  });

  test('Verify uncontrolled usage with defaultValue', {
    tag: [TAG.PRIORITY_HIGH, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { uncontrolled: true, defaultValue: '2', disabledCard: 'none' });

    await test.step('defaultValue defines the initially selected card', async () => {
      await expect(locators.card(page, 1)).toBeChecked();
      await expect(locators.card(page, 0)).not.toBeChecked();
    });

    await test.step('selection is still managed by the component itself', async () => {
      await locators.cardLabel(page, 3).click();

      await expect(locators.card(page, 3)).toBeChecked();
      await expect(locators.card(page, 1)).not.toBeChecked();
    });
  });

  test('Verify uncontrolled usage without an initial value', {
    tag: [TAG.PRIORITY_HIGH, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { uncontrolled: true, disabledCard: 'none' });

    await test.step('no card is selected on initial render', async () => {
      const cards = locators.card(page);
      const count = await cards.count();

      for (let index = 0; index < count; index++) {
        await expect(cards.nth(index)).not.toBeChecked();
      }
    });

    await test.step('the first click selects a card', async () => {
      await locators.cardLabel(page, 0).click();

      await expect(locators.card(page, 0)).toBeChecked();
    });
  });
});
