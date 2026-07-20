import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  pills: (page: Page) => page.locator('[data-ui-name="Pills"]'),
  pillsItem: (page: Page) => page.locator('[data-ui-name="Pills.Item"]'),
  pillsItemAddon: (page: Page) => page.locator('[data-ui-name="Pills.Item.Addon"]'),
  pillsItemText: (page: Page) => page.locator('[data-ui-name="Pills.Item.Text"]'),
  sizeM: (page: Page) => page.locator('[data-ui-name="Pills"][class*="size_m"]'),
  sizeL: (page: Page) => page.locator('[data-ui-name="Pills"][class*="size_l"]'),
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
      tag: [TAG.PRIORITY_HIGH, '@pills'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/pills/tests/examples/basic_example.tsx', 'en', item);

      await test.step('Verify hover and focus states', async () => {
        await locators.pillsItem(page).first().hover();
        await expect(page).toHaveScreenshot();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();

        await page.keyboard.press('ArrowRight');
        await locators.pillsItem(page).nth(1).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify pills sizes styles', async () => {
        if ((await locators.sizeM(page).count()) > 0) {
          await expect(locators.pillsItem(page).nth(0).locator('[data-ui-name="Pills.Item.Addon"]').first()).toHaveCSS('margin-left', '8px');
          await expect(locators.pillsItem(page).nth(0).locator('[data-ui-name="Pills.Item.Addon"]').nth(1)).toHaveCSS('margin-right', '8px');

          await expect(locators.pillsItem(page).nth(0).locator('[data-ui-name="Pills.Item.Text"]')).toHaveCSS('margin-right', '8px');
          await expect(locators.pillsItem(page).nth(0).locator('[data-ui-name="Pills.Item.Text"]')).toHaveCSS('margin-left', '8px');

          await expect(locators.pillsItemText(page).nth(1)).toHaveCSS('margin-left', '8px');
          await expect(locators.pillsItemText(page).nth(1)).toHaveCSS('margin-right', '8px');

          const count = await locators.pillsItem(page).count();
          for (let i = 0; i < count; i++)
            await expect(locators.pillsItem(page).nth(i)).toHaveCSS('height', '32px');
        } else if ((await locators.sizeL(page).count()) > 0) {
          await expect(locators.pillsItem(page).nth(0).locator('[data-ui-name="Pills.Item.Addon"]').first()).toHaveCSS('margin-left', '12px');
          await expect(locators.pillsItem(page).nth(0).locator('[data-ui-name="Pills.Item.Addon"]').nth(1)).toHaveCSS('margin-right', '12px');

          await expect(locators.pillsItem(page).nth(0).locator('[data-ui-name="Pills.Item.Text"]')).toHaveCSS('margin-right', '8px');
          await expect(locators.pillsItem(page).nth(0).locator('[data-ui-name="Pills.Item.Text"]')).toHaveCSS('margin-left', '8px');

          await expect(locators.pillsItemText(page).nth(1)).toHaveCSS('margin-left', '12px');
          await expect(locators.pillsItemText(page).nth(1)).toHaveCSS('margin-right', '12px');
          const count = await locators.pillsItem(page).count();
          for (let i = 0; i < count; i++)
            await expect(locators.pillsItem(page).nth(i)).toHaveCSS('height', '44px');
        }
      });
    });
  });

  const variablesDisabled = [
    { disabled: true, size: 'm' },
    { disabled: true, size: 'l' },
  ];
  variablesDisabled.forEach((item) => {
    test(`Verify disabled Pills with different addons and size=${item.size}`, {
      tag: [TAG.PRIORITY_HIGH, '@pills'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/pills/tests/examples/basic_example.tsx', 'en', item);

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify custom pills', {
    tag: [TAG.PRIORITY_HIGH, '@pills'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/docs/examples/custom_pills_example.tsx', 'en');

    await test.step('Verify hover state', async () => {
      await locators.pillsItem(page).nth(1).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus state', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify navigation and hover', async () => {
      await page.keyboard.press('ArrowRight');
      await locators.pillsItem(page).nth(1).hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify pills with tab panel', {
    tag: [TAG.PRIORITY_HIGH, '@pills'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/docs/examples/tabs_example.tsx', 'en');

    await test.step('Verify tab switching', async () => {
      await locators.pillsItem(page).nth(1).click();
      await page.keyboard.press('ArrowRight');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify different amout of pills', {
    tag: [TAG.PRIORITY_HIGH, '@pills'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/tests/examples/different-amount-of-pills.tsx', 'en');

    await expect(page).toHaveScreenshot();
  });

  test('Verify pills with counter', {
    tag: [TAG.PRIORITY_HIGH, '@pills'],
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
  test('Verify manual behavior when swicthing between tabs by keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@pills'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/tests/examples/basic_example.tsx', 'en', { behavior: 'manual' });

    await test.step('Verify checked tab focused by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.pillsItem(page).nth(1)).toBeFocused();
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify arrows switch to the next tab but not activate them', async () => {
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

    await test.step('Verify arrow switched from fisrt to last and disabled is not focused', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(locators.pillsItem(page).nth(5)).toBeFocused();
    });
  });

  test('Verify manual behavior when swicthing between tabs by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@pills'],
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
      const count = await locators.pillsItem(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.pillsItem(page).nth(i)).toHaveAttribute('type', 'button');
        await expect(locators.pillsItem(page).nth(i)).toHaveAttribute('role', 'tab');
      }
      await expect(locators.pillsItem(page).nth(0)).toHaveAttribute('tabindex', '0');
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('tabindex', '-1');
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('tabindex', '-1');

      await expect(locators.pillsItem(page).nth(0)).toHaveAttribute('value', 'like');
    });
  });

  test('Verify auto behavior when swicthing between tabs by keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@pills'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/tests/examples/basic_example.tsx', 'en', { behavior: 'auto' });

    await test.step('Verify checked tab focused by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.pillsItem(page).nth(1)).toBeFocused();
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-checked', 'true');
    });

    await test.step('Verify arrows switch to the next tab and not activate them', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.pillsItem(page).nth(2)).toBeFocused();
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('aria-checked', 'true');
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-checked', 'false');
    });

    await test.step('Verify arrow switched from fisrt to last and activetes it  and disabled is not focused', async () => {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await expect(locators.pillsItem(page).nth(5)).toBeFocused();
      await expect(locators.pillsItem(page).nth(5)).toHaveAttribute('aria-checked', 'true');
    });
  });

  test('Verify auto behavior when swicthing between tabs by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@pills'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/pills/docs/examples/basic_example.tsx', 'en', { behavior: 'auto' });

    await test.step('Verify tablist roles and attributes', async () => {
      await expect(locators.pills(page)).toHaveAttribute('role', 'radiogroup');
      await expect(locators.pills(page)).toHaveAttribute('tabindex', '0');
      await expect(locators.pills(page)).toHaveAttribute('aria-labelledby');
    });

    await test.step('Verify arrows switch to the next tab and not activate them', async () => {
      await locators.pillsItem(page).nth(2).click();
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('aria-checked', 'true');
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('aria-checked', 'false');
    });

    await test.step('Verify pills attributes', async () => {
      const count = await locators.pillsItem(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.pillsItem(page).nth(i)).toHaveAttribute('type', 'button');
        await expect(locators.pillsItem(page).nth(i)).toHaveAttribute('role', 'radio');
      }
      await expect(locators.pillsItem(page).nth(0)).toHaveAttribute('tabindex', '-1');
      await expect(locators.pillsItem(page).nth(1)).toHaveAttribute('tabindex', '-1');
      await expect(locators.pillsItem(page).nth(2)).toHaveAttribute('tabindex', '0');
    });
  });
});
