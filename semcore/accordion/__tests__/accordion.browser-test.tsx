import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

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
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    { use: 'primary' },
    { use: 'secondary' },
  ];
  variables.forEach((item) => {
    test(`Verify use=${item.use}`, {
      tag: [
        TAG.PRIORITY_HIGH,
        '@accordion'],
    },
    async ({ page }) => {
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
        for (let i = 0; i < count; i++) {
          await expect(locators.chevron(page, i)).toHaveCSS('margin-right', '8px');
        }
      });

      await test.step('Verify item padding', async () => {
        const count = await locators.toggle(page).count();
        for (let i = 0; i < count; i++) {
          await expect(locators.toggle(page, i)).toHaveCSS('padding-bottom', '8px');
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

  test('Verify accordion width < content', {
    tag: [
      TAG.PRIORITY_MEDIUM,
      '@accordion'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en', { w: '50px' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify custom styles for selected toggle ', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@accordion'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/custom_styles.tsx', 'en');
    await locators.toggle(page, 0).click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await locators.collapse(page, 1).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify focus on focusable item inside accordion', {
    tag: [
      TAG.PRIORITY_MEDIUM,
      '@accordion'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/seo.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify base example keyboard interactions and attributes', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@accordion'],
  }, async ({ page }) => {
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

  test('Verify base example mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@accordion'],
  }, async ({ page }) => {
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

  test('Verify items render in DOM and focusable elements not focused when collapsed with preserveNode prop', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@accordion'],
  }, async ({ page, browserName }) => {
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

  test('Verify One section opening by keyboard ', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@accordion'],
  }, async ({ page }) => {
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

  test('Verify One section opening by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@accordion'],
  }, async ({ page }) => {
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

  test('Verify section not expands by mouse  and keyboard activation on the interactive element in toggle', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@accordion'],
  }, async ({ page }) => {
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

  test('Verify values with different types', {
    tag: [TAG.PRIORITY_HIGH,
      '@accordion'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/tests/examples/values.tsx', 'en');

    await expect(page.locator('[data-test-id="number"]')).toBeVisible();
    await expect(page.locator('[data-test-id="string"]')).toBeVisible();

    await locators.toggle(page, 0).click();
    await locators.toggle(page, 1).click();
    await expect(page.locator('[data-test-id="number"]')).not.toBeVisible();
    await expect(page.locator('[data-test-id="string"]')).not.toBeVisible();
  });

  test('Verify default value', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@accordion'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/tests/examples/default-values.tsx', 'en');
    await expect(page.locator('[data-test-id="default-value"]')).toBeVisible();
  });

  test('Verify heading tag',
    {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@accordion'],
    }, async ({ page }) => {
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

  test('Verify overflowHidden=false and defaultHeight=auto', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@accordion'],
  }, async ({ page }) => {
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

  test('Verify overflowHidden=true and defaultHeight=100%', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@accordion'],
  }, async ({ page }) => {
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

  test('Verify accordion animation collapse props', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@accordion',
      '@base-components',
      '@animation'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/tests/examples/accordion-collapse-duration.tsx', 'en');

    const count = await locators.toggle(page).count();
    for (let i = 0; i < count; i++) {
      await locators.button(page, i).click();
      await locators.collapse(page).waitFor({ state: 'visible' });

      const animationDelay = await locators.collapse(page).evaluate((el) => {
        const style = getComputedStyle(el);
        return style.animationDelay;
      });

      const animationDuration = await locators.collapse(page).evaluate((el) => {
        const style = getComputedStyle(el);
        return style.animationDuration;
      });

      if (i === 0) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0.5s');
      } else if (i === 1) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0.5s');
      } else if (i === 2) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0s');
      } else if (i === 3) {
        expect(animationDelay).toBe('0s');
        expect(animationDuration).toBe('0.2s');
      }
      await locators.button(page, i).click();
      await locators.collapse(page).waitFor({ state: 'hidden' });
    }
  });
});
