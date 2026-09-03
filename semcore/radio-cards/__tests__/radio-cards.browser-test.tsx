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
  /* The `loading` prop swaps the text addon for a Skeleton, rendered as an SVG with role='img'. */
  skeleton: (page: Page, cardIndex: number) =>
    locators.cardLabel(page, cardIndex).locator('[data-ui-name="SkeletonSVG"]'),
  textAddon: (page: Page, cardIndex: number) =>
    locators.cardLabel(page, cardIndex).locator('[class*="SRadioItemHeaderRightAddon"]'),
  /*
    Both the card text and the addon render as Text, and only the addon has a style of its
    own to key on - so the text is taken as the first Text inside the header container.
  */
  cardText: (page: Page, cardIndex: number) =>
    locators
      .cardLabel(page, cardIndex)
      .locator('[class*="SRadioItemHeaderInnerContainer"] [data-ui-name="Text"]')
      .first(),
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

  test('Verify loading state renders a skeleton in place of the text addon', {
    tag: [TAG.PRIORITY_HIGH, '@radio-cards'],
  }, async ({ page }) => {
    /* Card 1 carries the longest text addon, so the fixed 24x16 skeleton is easiest to eyeball there. */
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { loadingCard: '1' });

    await locators.skeleton(page, 0).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot('loading-state.png');
  });

  test('Verify the skeleton wraps together with a long text', {
    tag: [TAG.PRIORITY_MEDIUM, '@radio-cards'],
  }, async ({ page }) => {
    await page.setViewportSize({ width: 780, height: 500 });

    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', {
      text: 'Lost and Vital backlinks that need restoring right now across all domains',
      loadingCard: '4',
    });

    await locators.skeleton(page, 3).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot('loading-state-with-wrapped-text.png');
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
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { disabledCard: 'none' });

    await test.step('ArrowLeft moves to the previous card', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.card(page, 1)).toBeFocused();

      await page.keyboard.press('ArrowLeft');

      await expect(locators.card(page, 0)).toBeFocused();
      await expect(locators.card(page, 0)).toBeChecked();
    });

    /*
      RadioCards relies on native radio group navigation, and engines disagree at the
      edges: Chromium and Firefox cycle, while WebKit clamps on the first/last card.
      See the a11y docs - wrap-around is documented but not guaranteed in WebKit.
    */
    if (browserName === 'webkit') {
      await test.step('ArrowLeft on the first card keeps the selection (WebKit clamps)', async () => {
        await page.keyboard.press('ArrowLeft');

        await expect(locators.card(page, 0)).toBeFocused();
        await expect(locators.card(page, 0)).toBeChecked();
      });

      return;
    }

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
      await expect(cards.nth(index)).toHaveAttribute('disabled', '');
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

  test('Verify loading card swaps its text addon for a skeleton', {
    tag: [TAG.PRIORITY_HIGH, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { loadingCard: '1', disabledCard: 'none' });

    await test.step('The loading card shows a skeleton and drops the addon text', async () => {
      await expect(locators.skeleton(page, 0)).toHaveCount(1);
      await expect(locators.cardLabel(page, 0)).not.toContainText('~90,000,000');
    });

    await test.step('The skeleton is announced as a loading image', async () => {
      await expect(locators.skeleton(page, 0)).toHaveRole('img');
    });

    await test.step('The card text itself is untouched', async () => {
      await expect(locators.cardLabel(page, 0)).toContainText('All');
    });

    await test.step('Sibling cards keep their text addons and have no skeleton', async () => {
      for (const [index, addon] of [[1, '300'], [2, '100']] as const) {
        await expect(locators.skeleton(page, index)).toHaveCount(0);
        await expect(locators.cardLabel(page, index)).toContainText(addon);
      }
    });
  });

  test('Verify loading card stays selectable with the mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { loadingCard: '1', disabledCard: 'none' });

    await expect(locators.card(page, 0)).not.toBeDisabled();
    await expect(locators.cardLabel(page, 0)).not.toHaveCSS('pointer-events', 'none');

    await locators.cardLabel(page, 0).click();

    await expect(locators.card(page, 0)).toBeChecked();
    await expect(locators.card(page, 1)).not.toBeChecked();

    await test.step('The skeleton survives selection', async () => {
      await expect(locators.skeleton(page, 0)).toHaveCount(1);
    });
  });

  test('Verify loading card stays in the keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio-cards'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { loadingCard: '1', disabledCard: 'none' });

    await test.step('Tab still lands on the checked card', async () => {
      await page.keyboard.press('Tab');

      await expect(locators.card(page, 1)).toBeFocused();
      await expect(locators.card(page, 1)).toBeChecked();
    });

    await test.step('ArrowLeft reaches the loading card and selects it', async () => {
      await page.keyboard.press('ArrowLeft');

      await expect(locators.card(page, 0)).toBeFocused();
      await expect(locators.card(page, 0)).toBeChecked();
      await expect(locators.skeleton(page, 0)).toHaveCount(1);
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
