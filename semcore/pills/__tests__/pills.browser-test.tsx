import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  pills: (page: Page) => page.locator('[data-ui-name="Pills"]'),
  pillsItem: (page: Page) => page.locator('[data-ui-name="Pills.Item"]'),
  pillsItemAddon: (page: Page) => page.locator('[data-ui-name="Pills.Item.Addon"]'),
  pillsItemText: (page: Page) => page.locator('[data-ui-name="Pills.Item.Text"]'),
};

const itemHeight = { m: '28px', l: '40px' };

const expectEachItem = async (page: Page, check: (item: Locator) => Promise<void>) => {
  await expect(locators.pillsItem(page)).not.toHaveCount(0);
  for (const item of await locators.pillsItem(page).all()) {
    await check(item);
  }
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    { disabled: false, size: 'm' },
    { disabled: false, size: 'l' },
  ];
  variables.forEach((item) => {
    test(`Verify Pills with different addons and size=${item.size}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, TAG.KEYBOARD, '@pills',
        '@badge',
        '@base-components',
        '@flex-box',
        '@spin',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/pills/tests/examples/basic_example.tsx', 'en', item);

      await test.step('Verify hover on the first item', async () => {
        await locators.pillsItem(page).first().hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus on the checked item', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus moved by ArrowRight with hover on the second item', async () => {
        await page.keyboard.press('ArrowRight');
        await locators.pillsItem(page).nth(1).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step(`Verify item height for size ${item.size}`, async () => {
        await expectEachItem(page, (pill) => expect(pill).toHaveCSS('height', itemHeight[item.size as keyof typeof itemHeight]));
      });
    });
  });

  const variablesDisabled = [
    { disabled: true, size: 'm' },
    { disabled: true, size: 'l' },
  ];
  variablesDisabled.forEach((item) => {
    test(`Verify disabled Pills with different addons and size=${item.size}`, {
      tag: [TAG.PRIORITY_HIGH, '@pills',
        '@badge',
        '@base-components',
        '@flex-box',
        '@spin',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/pills/tests/examples/basic_example.tsx', 'en', item);

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify pills with tab panel', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, TAG.KEYBOARD, '@pills',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/docs/examples/tabs_example.tsx', 'en');

    await test.step('Verify tab switching', async () => {
      await locators.pillsItem(page).nth(1).click();
      await page.keyboard.press('ArrowRight');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify different amout of pills', {
    tag: [TAG.PRIORITY_HIGH, '@pills',
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/tests/examples/different-amount-of-pills.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Verify pills with counter', {
    tag: [TAG.PRIORITY_HIGH, '@pills',
      '@counter',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/counter/docs/examples/counter_in_pills.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify manual behavior when switching between tabs by keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@pills',
      '@badge',
      '@base-components',
      '@flex-box',
      '@spin',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/tests/examples/basic_example.tsx', 'en', { behavior: 'manual' });

    await test.step('Verify checked tab focused by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.pillsItem(page).nth(1)).toBeFocused();
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify arrows move focus to the next tab without activating it', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.pillsItem(page).nth(2)).toBeFocused();
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('aria-selected', 'false');

      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify space activates focused tab', async () => {
      await page.keyboard.press('Space');
      await expect(locators.pillsItem(page).nth(2)).toBeFocused();
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify enter activates checked tab', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('Enter');
      await expect(locators.pillsItem(page).nth(0)).toBeFocused();
      await expect(locators.pillsItem(page).nth(0)).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify ArrowLeft moves from the first to the last item skipping disabled', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(locators.pillsItem(page).nth(5)).toBeFocused();
    });
  });

  test('Verify manual behavior when switching between tabs by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@pills',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/docs/examples/basic_example.tsx', 'en', { behavior: 'manual' });

    await test.step('Verify tablist roles and attributes', async () => {
      await expect(locators.pills(page)).toHaveAttribute('role', 'tablist');
      await expect(locators.pills(page)).toHaveAttribute('tabindex', '0');
      await expect(locators.pills(page)).toHaveAttribute('aria-labelledby');
    });

    await test.step('Verify tab selects by mouse click', async () => {
      await locators.pillsItem(page).first().click();
      await expect(locators.pillsItem(page).nth(0)).toHaveAttribute('aria-selected', 'true');
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-selected', 'false');
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('aria-selected', 'false');
    });

    await test.step('Verify pills attributes', async () => {
      await expectEachItem(page, async (pill) => {
        await expect(pill).toHaveAttribute('type', 'button');
        await expect(pill).toHaveAttribute('role', 'tab');
      });
      await expect(locators.pillsItem(page).nth(0)).toHaveAttribute('tabindex', '0');
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('tabindex', '-1');
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('tabindex', '-1');

      await expect(locators.pillsItem(page).nth(0)).toHaveAttribute('value', 'like');
    });
  });

  test('Verify auto behavior when switching between tabs by keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@pills',
      '@badge',
      '@base-components',
      '@flex-box',
      '@spin',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/tests/examples/basic_example.tsx', 'en', { behavior: 'auto' });

    await test.step('Verify checked tab focused by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.pillsItem(page).nth(1)).toBeFocused();
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-checked', 'true');
    });

    await test.step('Verify arrows move focus to the next item and activate it', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.pillsItem(page).nth(2)).toBeFocused();
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('aria-checked', 'true');
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-checked', 'false');
    });

    await test.step('Verify ArrowLeft moves from the first to the last item, activates it and skips disabled', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await expect(locators.pillsItem(page).nth(5)).toBeFocused();
      await expect(locators.pillsItem(page).nth(5)).toHaveAttribute('aria-checked', 'true');
    });
  });

  test('Verify auto behavior when switching between tabs by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@pills',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/docs/examples/basic_example.tsx', 'en', { behavior: 'auto' });

    await test.step('Verify radiogroup roles and attributes', async () => {
      await expect(locators.pills(page)).toHaveAttribute('role', 'radiogroup');
      await expect(locators.pills(page)).toHaveAttribute('tabindex', '0');
      await expect(locators.pills(page)).toHaveAttribute('aria-labelledby');
    });

    await test.step('Verify item selected by mouse click', async () => {
      await locators.pillsItem(page).nth(2).click();
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('aria-checked', 'true');
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-checked', 'false');
    });

    await test.step('Verify pills attributes', async () => {
      await expectEachItem(page, async (pill) => {
        await expect(pill).toHaveAttribute('type', 'button');
        await expect(pill).toHaveAttribute('role', 'radio');
      });
      await expect(locators.pillsItem(page).nth(0)).toHaveAttribute('tabindex', '-1');
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('tabindex', '-1');
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('tabindex', '0');
    });
  });
});
