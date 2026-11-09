import type { Page } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  accordion: (page: Page) => page.locator(`[data-ui-name="Accordion"]`),
  item: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="Accordion.Item"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  collapse: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="Item.Collapse"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  collapseContainer: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="Item.Collapse"] > [data-ui-name="Box"]`);
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
  toggleButton: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="Item.ToggleButton"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [
    {
      use: 'primary',
      chevronOrder: '1',
      toggleButtonGap: '8px',
      togglePadding: '8px 16px 8px 20px',
    },
    {
      use: 'secondary',
      chevronOrder: '0',
      toggleButtonGap: '4px',
      togglePadding: '8px 2px',
    },
  ];
  variables.forEach((item) => {
    test(`Verify use=${item.use}`, {
      tag: [
        TAG.PRIORITY_HIGH,
        '@accordion'],
    },
    async ({ page }) => {
      await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en', { use: item.use });

      await test.step('Verify active and normal states', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus and hover states', async () => {
        await page.keyboard.press('Tab');
        await locators.toggle(page, 1).hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify chevron order and no own margin', async () => {
        const count = await locators.chevron(page).count();
        for (let i = 0; i < count; i++) {
          await expect(locators.chevron(page, i)).toHaveCSS('order', item.chevronOrder);
          await expect(locators.chevron(page, i)).toHaveCSS('margin-right', '0px');
        }
      });

      await test.step('Verify gap between chevron and label', async () => {
        const count = await locators.toggleButton(page).count();
        for (let i = 0; i < count; i++) {
          await expect(locators.toggleButton(page, i)).toHaveCSS('column-gap', item.toggleButtonGap);
        }
      });

      await test.step('Verify toggle padding', async () => {
        const count = await locators.toggle(page).count();
        for (let i = 0; i < count; i++) {
          await expect(locators.toggle(page, i)).toHaveCSS('padding', item.togglePadding);
        }
      });

      await test.step('Verify accordion stacks items in a column with a gap', async () => {
        await expect(locators.accordion(page)).toHaveCSS('flex-direction', 'column');
        await expect(locators.accordion(page)).toHaveCSS('row-gap', '2px');
      });

      await test.step('Verify collapse content padding', async () => {
        await expect(locators.collapseContainer(page, 0)).toHaveCSS('padding', '12px 20px');
      });
    });
  });

  test('Verify accordion width < content', {
    tag: [
      TAG.PRIORITY_LOW,
      '@accordion'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en', { w: '50px' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify selected item styles in primary accordion', {
    tag: [TAG.PRIORITY_HIGH,
      '@accordion'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/primary_accordion.tsx', 'en');

    await test.step('Verify collapsed item keeps all corners rounded', async () => {
      await expect(locators.item(page, 0)).toHaveCSS('border-radius', '8px');
      await expect(locators.toggle(page, 0)).toHaveCSS('border-bottom-left-radius', '8px');
      await expect(locators.toggle(page, 0)).toHaveCSS('border-bottom-right-radius', '8px');
    });

    await locators.toggle(page, 0).click();
    await locators.collapse(page, 0).waitFor({ state: 'visible' });

    await test.step('Verify expanded toggle squares its bottom corners', async () => {
      await expect(locators.toggle(page, 0)).toHaveCSS('border-bottom-left-radius', '0px');
      await expect(locators.toggle(page, 0)).toHaveCSS('border-bottom-right-radius', '0px');
    });

    await test.step('Verify accent bar (item ::before) fades in on the expanded item', async () => {
      await expect
        .poll(async () =>
          locators.item(page, 0).evaluate((el) => getComputedStyle(el, '::before').opacity),
        )
        .toBe('1');

      const width = await locators
        .item(page, 0)
        .evaluate((el) => getComputedStyle(el, '::before').width);

      expect(width).toBe('2px');
    });

    await test.step('Verify expanded state snapshot', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify corners are restored after collapsing', async () => {
      await locators.toggle(page, 0).click();
      await locators.collapse(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.toggle(page, 0)).toHaveCSS('border-bottom-left-radius', '8px');
      await expect(locators.toggle(page, 0)).toHaveCSS('border-bottom-right-radius', '8px');
    });

    await test.step('Verify accent bar (item ::before) fades out after collapsing', async () => {
      await expect
        .poll(async () =>
          locators.item(page, 0).evaluate((el) => getComputedStyle(el, '::before').opacity),
        )
        .toBe('0');
    });
  });

  test('Verify focus on focusable item inside accordion', {
    tag: [
      TAG.PRIORITY_MEDIUM,
      '@accordion',
      '@base-components',
      '@flex-box'],
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
      '@accordion',
      '@base-components',
      '@flex-box'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/seo.tsx', 'en');

    await test.step('Verify all sections are rendered in DOM', async () => {
      await expect(locators.collapse(page)).toHaveCount(3);
    });

    await test.step('Verify collapsed section stays in DOM and its link is skipped by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.toggle(page, 0)).toBeFocused();
      await page.keyboard.press('Enter');
      await page.getByRole('link').waitFor({ state: 'hidden' });
      await expect(locators.toggle(page, 0)).toBeFocused();
      await expect(locators.collapse(page)).toHaveCount(3);
      await page.keyboard.press('Tab');
      await expect(locators.toggle(page, 2)).toBeFocused();
    });

    const linkFocusStep = browserName === 'webkit' ? test.step.skip : test.step;
    await linkFocusStep('Verify link in expanded section is focused by Tab (WebKit skips links on Tab)', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Tab');
      await page.getByRole('link').waitFor({ state: 'visible' });
      await expect(page.getByRole('link')).toBeFocused();
    });
  });

  test('Verify one section opening by keyboard', {
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

  test('Verify one section opening by mouse', {
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

  test('Verify section does not expand by mouse and keyboard activation of the interactive element in toggle', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@accordion',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/tests/examples/button-on-toggle.tsx', 'en');

    const buttonInToggle = (index: number) => page.getByTestId(`button_in_toggle_${index}`);

    await expect(locators.collapse(page)).toHaveCount(0);
    await buttonInToggle(1).click();
    await expect(locators.collapse(page)).toHaveCount(0);

    await page.keyboard.press('Tab');
    await expect(locators.toggle(page, 1)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(locators.collapse(page)).toHaveCount(1);

    await page.keyboard.press('Tab');
    await expect(buttonInToggle(2)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.collapse(page)).toHaveCount(1);
  });

  test('Verify values with different types and defaultValue', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@accordion',
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/tests/examples/values.tsx', 'en');

    await test.step('Verify sections with number and string values are expanded', async () => {
      await expect(page.locator('[data-test-id="number"]')).toBeVisible();
      await expect(page.locator('[data-test-id="string"]')).toBeVisible();
    });

    await test.step('Verify sections with number and string values collapse by click', async () => {
      await locators.toggle(page, 0).click();
      await locators.toggle(page, 1).click();
      await expect(page.locator('[data-test-id="number"]')).not.toBeVisible();
      await expect(page.locator('[data-test-id="string"]')).not.toBeVisible();
    });

    await test.step('Verify non-array defaultValue expands the matching section', async () => {
      await expect(page.locator('[data-test-id="default-value"]')).toBeVisible();
    });
  });

  test('Verify toggle heading tag', {
    tag: [TAG.PRIORITY_HIGH,
      '@accordion'],
  }, async ({ page }) => {
    await test.step('Verify toggles are h3 by default', async () => {
      await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en');
      await expect(page.getByRole('heading', { level: 3 })).toHaveCount(await locators.toggle(page).count());
    });

    await test.step('Verify toggles are h2 with tag="h2"', async () => {
      await loadPage(page, 'stories/components/accordion/docs/examples/heading_tag.tsx', 'en');
      await expect(page.getByRole('heading', { level: 2 })).toHaveCount(await locators.toggle(page).count());
    });
  });

  const collapseLayoutCases = [
    { overflowHidden: false, defaultHeight: 'auto', overflowClip: false },
    { overflowHidden: true, defaultHeight: '100%', overflowClip: true },
  ];
  collapseLayoutCases.forEach(({ overflowHidden, defaultHeight, overflowClip }) => {
    test(`Verify overflowHidden=${overflowHidden} and defaultHeight=${defaultHeight}`, {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@accordion'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en', { overflowHidden, defaultHeight });

      await test.step(`Verify expanded section has height: ${defaultHeight}`, async () => {
        await expect(locators.collapse(page, 0)).toBeVisible();
        await expect(locators.collapse(page, 0)).toHaveAttribute('style', new RegExp(`height: ${defaultHeight}`));
      });

      await test.step(`Verify overflow is ${overflowClip ? 'clipped' : 'not set'} after collapse and expand`, async () => {
        await locators.toggle(page, 0).click();
        await locators.toggle(page, 0).click();
        await locators.collapse(page, 0).waitFor({ state: 'visible' });

        if (overflowClip) {
          await expect(locators.collapse(page, 0)).toHaveAttribute('style', /overflow: clip/);
        } else {
          await expect(locators.collapse(page, 0)).not.toHaveAttribute('style', /overflow/);
        }
      });
    });
  });

  test('Verify accordion animation collapse props', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@accordion',
      '@base-components',
      '@animation',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/tests/examples/accordion-collapse-duration.tsx', 'en');

    const cases = [
      { label: 'Duration 500', duration: '0.5s' },
      { label: 'Duration 500 Delay 500', duration: '0.5s' },
      { label: 'Duration 0', duration: '0s' },
      { label: 'Default', duration: '0.2s' },
      { label: 'Accordion duration 300', duration: '0.3s' },
    ];

    for (const { label, duration } of cases) {
      await test.step(`Verify "${label}" section has animation-duration ${duration}`, async () => {
        const toggleButton = page.getByRole('button', { name: label, exact: true });
        const section = page.getByRole('region', { name: label, exact: true, includeHidden: true });

        await toggleButton.click();
        await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
        await expect(section).toHaveCSS('animation-duration', duration);

        await toggleButton.click();
        await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
        await expect(section).toHaveCount(0);
      });
    }
  });
});
