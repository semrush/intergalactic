import { expect, test, type Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  menu: (page: Page) => page.locator('[data-ui-name="Select.Menu"]'),
  options: (page: Page) => page.locator('[data-ui-name="Select.Option"]'),
  trigger: (page: Page) => page.locator('[data-ui-name="Select.Trigger"]'),
  input: (page: Page) => page.locator('input'),
  optionByText: (page: Page, text: string) => page.locator(`text=${text}`),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(TAG.VISUAL, () => {
  test('Verify AutoSuggest keyboard navigation states', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx', 'en');

    await test.step('Verify navigation between options visual state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.type('a');
      await locators.options(page).first().waitFor({ state: 'visible' });

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify selected state', async () => {
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify AutoSuggest mouse navigation states', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select', '@input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx', 'en');

    const input = locators.input(page);
    const inputRect = (await input.boundingBox())!;
    const inputCoords = [inputRect.x + inputRect.width / 2, inputRect.y + inputRect.height / 2];

    await test.step('Verify menu with options visual state', async () => {
      await page.mouse.click(inputCoords[0], inputCoords[1]);
      await page.keyboard.type('a');
      await locators.options(page).first().waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify selected state', async () => {
      await test.step('Verify selected option highlighted visual state', async () => {
        const persianOption = locators.optionByText(page, 'persian');
        const persianOptionRect = (await persianOption.boundingBox())!;
        const persianOptionCoords = [
          persianOptionRect.x + persianOptionRect.width / 2,
          persianOptionRect.y + persianOptionRect.height / 2,
        ];

        await page.mouse.click(persianOptionCoords[0], persianOptionCoords[1]);
        await locators.options(page).first().waitFor({ state: 'hidden' });

        await page.mouse.click(inputCoords[0], inputCoords[1]);
        await locators.options(page).first().waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot();
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
  test('Verify AutoSuggest keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx', 'en');

    await test.step('Verify menu not expanded when nothing entered', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await expect(locators.menu(page)).not.toBeVisible();
    });

    await test.step('Verify menu appears when character entered but nothing is selected', async () => {
      await page.keyboard.type('a');
      await locators.options(page).first().waitFor({ state: 'visible' });

      const count = await locators.options(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.options(page).nth(i)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.options(page).nth(i)).not.toHaveClass(/selected/);
      }
    });

    await test.step('Verify option not selected and menu closed by Escape', async () => {
      await page.waitForTimeout(200);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Escape');

      await expect(locators.menu(page)).not.toBeVisible();
      await expect(locators.trigger(page)).toHaveAttribute('value', 'a');

      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      const count = await locators.options(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.options(page).nth(i)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.options(page).nth(i)).not.toHaveClass(/selected/);
      }
    });

    await test.step('Verify option selected and menu closed by Enter', async () => {
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveAttribute('value', 'ragdoll');
    });

    await test.step('Verify selected value is shown without selected option styling', async () => {
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.options(page).first()).toHaveText(/ragdoll/);
      await expect(locators.options(page).first()).toHaveAttribute('aria-selected', 'false');
      await expect(locators.options(page).first()).not.toHaveClass(/selected/);
      await expect(locators.options(page).first()).not.toHaveClass(/highlighted/);
    });

    await test.step('Verify exact match keeps menu opened without selected option styling', async () => {
      for (let i = 0; i < 'ragdoll'.length; i++) {
        await page.keyboard.press('Backspace');
      }
      await page.keyboard.type('persian');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.options(page).first()).toHaveText(/persian/);
      await expect(locators.options(page).first()).toHaveAttribute('aria-selected', 'false');
      await expect(locators.options(page).first()).not.toHaveClass(/selected/);
      await page.keyboard.press('Enter');
      await expect(locators.menu(page)).toBeVisible();
      await expect(locators.options(page).first()).toHaveText(/persian/);
      await expect(locators.options(page).first()).toHaveAttribute('aria-selected', 'false');
      await expect(locators.options(page).first()).not.toHaveClass(/selected/);
    });
  });

  test('Verify AutoSuggest mouse navigation', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select', '@input'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx', 'en');

    const input = locators.input(page);
    const inputRect = (await input.boundingBox())!;
    const inputCoords = [inputRect.x + inputRect.width / 2, inputRect.y + inputRect.height / 2];

    await test.step('Verify menu not expanded when nothing entered', async () => {
      await page.mouse.click(inputCoords[0], inputCoords[1]);
      await expect(locators.menu(page)).not.toBeVisible();
    });

    await test.step('Verify menu expanded when character entered', async () => {
      await page.keyboard.type('a');
      await locators.options(page).first().waitFor({ state: 'visible' });

      await expect(locators.menu(page)).toBeVisible();
      const count = await locators.options(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.options(page).nth(i)).toHaveAttribute('aria-selected', 'false');
        await expect(locators.options(page).nth(i)).not.toHaveClass(/selected/);
      }
    });

    await test.step('Verify menu closed when option clicked', async () => {
      const persianOption = locators.optionByText(page, 'persian');
      const persianOptionRect = (await persianOption.boundingBox())!;
      const persianOptionCoords = [
        persianOptionRect.x + persianOptionRect.width / 2,
        persianOptionRect.y + persianOptionRect.height / 2,
      ];

      await page.mouse.click(persianOptionCoords[0], persianOptionCoords[1]);
      await locators.options(page).first().waitFor({ state: 'hidden' });

      await expect(persianOption).toHaveCount(0);
      await expect(locators.trigger(page)).toHaveAttribute('value', 'persian');
    });

    await test.step('Verify menu opened without selected option styling', async () => {
      await page.mouse.click(inputCoords[0], inputCoords[1]);
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.trigger(page)).toHaveAttribute('value', 'persian');

      await expect(locators.options(page).first()).toHaveText(/persian/);
      await expect(locators.options(page).first()).toHaveAttribute('aria-selected', 'false');
      await expect(locators.options(page).first()).not.toHaveClass(/selected/);
      await expect(locators.options(page).first()).not.toHaveClass(/highlighted/);
    });
  });
});
