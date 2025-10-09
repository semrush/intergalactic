import type { Page } from '@playwright/test';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';

export const locators = {
  collapse: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="Item.Collapse"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  chevron: (page: Page, index?: number) => {
    const base = page.locator(`svg[data-ui-name="Item.Chevron"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  toggle: (page: Page, index?: number) => {
    const base = page.getByRole('heading');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
 Visual Core — @visual-core
 Basic visual states, hover/focus styles, paddings and margins
===================================================== */

test.describe('@visual-core @accordion', () => {
  const variables = [
    { use: 'primary' },
    { use: 'secondary' },
  ];
  variables.forEach((item) => {
    test(`Verify use=${item.use} styles`, async ({ page }) => {
      await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en', item);

      await test.step('Verify active and normal states', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus and hover states', async () => {
        await page.keyboard.press('Tab');
        await locators.toggle(page, 1).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify toggle margins', async () => {
        const count = await locators.chevron(page).count();
        console.log(count);
        for (let i = 0; i < count; i++) {
          await expect(locators.chevron(page, i)).toHaveCSS('margin-right', '8px');
        }
      });

      await test.step('Verify item padding', async () => {
        const count = await locators.toggle(page).count();
        for (let i = 0; i < count; i++) {
          await expect(await locators.toggle(page, i)).toHaveCSS('padding-bottom', '8px');
        }
      });

      await test.step('Verify h3 tab by default', async () => {
        const count = await locators.toggle(page).count();

        for (let i = 0; i < count; i++) {
          const element = locators.toggle(page, i);
          const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
          expect(tagName).toBe('h3');
        }
      });
    });
  });
});

/* =====================================================
 Visual Extended — @visual-extended
 Custom styles, uncommon dimensions, special examples
===================================================== */

test.describe('@visual-extended @accordion', () => {
  test('Verify accordion with width less than content', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en', { w: '50px' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify custom styles for selected toggle', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/custom_styles.tsx', 'en');
    await locators.toggle(page, 0).click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await locators.collapse(page, 1).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify focus on focusable item inside accordion', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/seo.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
 Functional Core — @functional-core
 Mouse and keyboard interactions with base examples, base props functionality, aria attributes
===================================================== */

test.describe('@functional-core @accordion', () => {
  test('Verify base example keyboard interactions and attributes', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify toggles tabindex', async () => {
      const count = await locators.toggle(page).count();
      for (let i = 0; i < count - 1; i++) {
        await expect(locators.toggle(page, i)).toHaveAttribute('tabindex', '0');
      }
      await expect(locators.toggle(page, count - 1)).toHaveAttribute('tabindex', '-1');
      await expect(locators.toggle(page, count - 1)).toHaveAttribute('disabled');
    });

    await test.step('Verify attributes when first section expanded', async () => {
      await expect(locators.collapse(page)).toHaveCount(1);

      await expect(locators.collapse(page)).toHaveAttribute('aria-labelledby');
      await expect(locators.collapse(page)).toHaveAttribute('aria-hidden', 'false');

      await expect(locators.button(page, 0)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.button(page, 0)).toHaveAttribute('aria-controls');

      await expect(locators.button(page, 1)).toHaveAttribute('aria-expanded', 'false');
      await expect(locators.button(page, 1)).not.toHaveAttribute('aria-controls');

      await expect(locators.button(page, 2)).toHaveAttribute('aria-expanded', 'false');
      await expect(locators.button(page, 2)).not.toHaveAttribute('aria-controls');
      await expect(locators.button(page, 2)).toHaveAttribute('disabled');
    });

    await test.step('Verify icons attributes', async () => {
      const icons = locators.button(page).locator('svg');
      const count = await icons.count();

      for (let i = 0; i < count - 1; i++) {
        await expect(icons.nth(i)).toHaveAttribute('tabindex', '-1');
        await expect(icons.nth(i)).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify focus on toggles by TAB when no interactive elements in item.collapse ', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.toggle(page, 0)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.toggle(page, 1)).toBeFocused();
    });

    await test.step('Verify two sections can be opened', async () => {
      await page.keyboard.press('Space');
      await expect(locators.toggle(page, 1)).toBeFocused();
      await expect(locators.collapse(page)).toHaveCount(2);
      await expect(locators.button(page, 0)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.button(page, 1)).toHaveAttribute('aria-expanded', 'true');
    });

    await test.step('Verify no action by arrows and ESC', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('Escape');
      await expect(locators.toggle(page, 1)).toBeFocused();
      await expect(locators.collapse(page)).toHaveCount(2);
    });

    await test.step('Verify Shift+Tab moves to the prev element', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.toggle(page, 0)).toBeFocused();
      await expect(locators.collapse(page)).toHaveCount(2);
    });

    await test.step('Verify item.collapse closed by Enter', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.toggle(page, 0)).toBeFocused();
      await expect(locators.collapse(page)).toHaveCount(1);
      await expect(locators.button(page, 0)).toHaveAttribute('aria-expanded', 'false');
      await expect(locators.button(page, 1)).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test('Verify base example mouse interactions', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify item collapses by click on text', async () => {
      await locators.button(page, 0).click();
      await expect(locators.collapse(page)).toHaveCount(0);
      await expect(locators.button(page, 0)).toHaveAttribute('aria-expanded', 'false');
    });

    await test.step('Verify item expands by click on icon', async () => {
      await locators.chevron(page, 0).click();
      await expect(locators.collapse(page)).toHaveCount(1);
      await expect(locators.button(page, 0)).toHaveAttribute('aria-expanded', 'true');
    });

    await test.step('Verify two sections expand by mouse click', async () => {
      await locators.button(page, 1).click();
      await expect(locators.collapse(page)).toHaveCount(2);
      await expect(locators.button(page, 0)).toHaveAttribute('aria-expanded', 'true');
      await expect(locators.button(page, 1)).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test('Verify items render in DOM and focusable elements not focused when collapsed with preserveNode prop', async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/seo.tsx', 'en');

    await expect(locators.collapse(page)).toHaveCount(3);
    await page.keyboard.press('Tab');
    await expect(locators.toggle(page, 0)).toBeFocused();
    await page.keyboard.press('Enter');
    await page.getByRole('link').waitFor({ state: 'hidden' });
    await expect(locators.toggle(page, 0)).toBeFocused();
    await expect(locators.collapse(page)).toHaveCount(3);
    await page.keyboard.press('Tab');
    await expect(locators.toggle(page, 2)).toBeFocused();
    if (browserName === 'webkit') return;
    await page.keyboard.press('Space');
    await page.keyboard.press('Tab');
    await page.getByRole('link').waitFor({ state: 'visible' });
    await expect(page.getByRole('link')).toBeFocused();
  });

  test('Verify One section opening keyboard interactions', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/one_section_opening.tsx', 'en');

    await expect(locators.collapse(page)).toHaveCount(0);
    await page.keyboard.press('Tab');
    await expect(locators.toggle(page, 0)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(locators.collapse(page)).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(locators.toggle(page, 1)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(locators.collapse(page)).toHaveCount(1);
    await page.keyboard.press('Shift+Tab');
    await expect(locators.toggle(page, 0)).toBeFocused();
    await page.keyboard.press('Space');
    await expect(locators.collapse(page)).toHaveCount(1);
    await page.keyboard.press('Space');
    await expect(locators.collapse(page)).toHaveCount(0);
  });

  test('Verify One section opening mouse interactions', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/one_section_opening.tsx', 'en');

    await expect(locators.collapse(page)).toHaveCount(0);
    await locators.toggle(page, 0).click();
    await expect(locators.collapse(page)).toHaveCount(1);
    await locators.toggle(page, 1).click();
    await expect(locators.collapse(page)).toHaveCount(1);
    await locators.toggle(page, 0).click();
    await expect(locators.collapse(page)).toHaveCount(1);
    await locators.toggle(page, 0).click();
    await expect(locators.collapse(page)).toHaveCount(0);
  });

  test('Verify section not expands by clicking on the interactive element in toggle', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/tests/examples/button-on-toggle.tsx', 'en');

    await expect(locators.collapse(page)).toHaveCount(0);
    await locators.button(page, 0).click();
    await expect(locators.collapse(page)).toHaveCount(0);

    await page.keyboard.press('Tab');
    await expect(locators.toggle(page, 1)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(locators.collapse(page)).toHaveCount(1);

    await page.keyboard.press('Tab');
    await expect(locators.button(page, 1)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.collapse(page)).toHaveCount(1);
  });

  test('Verify values with different types', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/tests/examples/values.tsx', 'en');

    await expect(page.locator('[data-test-id="number"]')).toBeVisible();
    await expect(page.locator('[data-test-id="string"]')).toBeVisible();

    await locators.toggle(page, 0).click();
    await locators.toggle(page, 1).click();
    await expect(page.locator('[data-test-id="number"]')).not.toBeVisible();
    await expect(page.locator('[data-test-id="string"]')).not.toBeVisible();
  });

  test('Verify default value', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/tests/examples/default-values.tsx', 'en');
    await expect(page.locator('[data-test-id="default-value"]')).toBeVisible();
  });

  test('Verify heading tag', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/heading_tag.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await locators.collapse(page, 0).waitFor({ state: 'visible' });
    const count = await locators.toggle(page).count();

    for (let i = 0; i < count; i++) {
      const element = locators.toggle(page, i);
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('h2');
    }
  });
});

/* =====================================================
 Functional Extended — @functional-extended
 Special props, custom states, not popular cases
===================================================== */

test.describe('@functional-extended @accordion', () => {
  test('Verify overflowHidden=false and defaultHeight=auto', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en', { overflowHidden: false, defaultHeight: 'auto' });

    await expect(locators.collapse(page, 0)).toBeVisible();

    const inlineStyle = await locators.collapse(page, 0).getAttribute('style');
    expect(inlineStyle).toContain('height: auto');

    await locators.toggle(page, 0).click();
    await locators.toggle(page, 0).click();
    await locators.collapse(page, 0).waitFor({ state: 'visible' });
    const inlineStyle2 = await locators.collapse(page, 0).getAttribute('style');
    expect(inlineStyle2).not.toContain('overflow');
  });

  test('Verify overflowHidden=true and defaultHeight=100%', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en', { overflowHidden: true, defaultHeight: '100%' });

    await expect(locators.collapse(page, 0)).toBeVisible();

    const inlineStyle = await (locators.collapse(page, 0)).getAttribute('style');
    expect(inlineStyle).toContain('height: 100%');
    await locators.toggle(page, 0).click();
    await locators.toggle(page, 0).click();
    await locators.collapse(page).waitFor({ state: 'visible' });
    const inlineStyle2 = await (locators.collapse(page, 0)).getAttribute('style');
    expect(inlineStyle2).toContain('overflow: clip');
  });
});
