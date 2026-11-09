import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const expectBreadcrumbsStructure = async (page: Page, { ariaLabel, itemsCount }: { ariaLabel: string; itemsCount: number }) => {
  const nav = page.locator('nav');

  await test.step('Verify nav landmark', async () => {
    await expect(nav).toHaveAttribute('data-ui-name', 'Breadcrumbs');
    await expect(nav).toHaveAttribute('aria-label', ariaLabel);
  });

  await test.step('Verify ordered list items', async () => {
    await expect(nav.locator(':scope > ol > li')).toHaveCount(itemsCount);
  });

  await test.step('Verify separators are hidden from assistive technologies', async () => {
    const separators = nav.locator(':scope > ol > div');
    await expect(separators).toHaveCount(itemsCount);
    for (const separator of await separators.all()) {
      await expect(separator).toHaveAttribute('aria-hidden', 'true');
      await expect(separator.locator('svg')).toHaveAttribute('aria-hidden', 'true');
    }
  });
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify links and icons styles', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@breadcrumbs',
      '@ellipsis'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/breadcrumbs/docs/examples/usage_example.tsx', 'en');

    const breadcrumbLinks = page.locator('a[data-ui-name="Breadcrumbs.Item"]');
    const lastItem = page.locator('[aria-current="page"]');

    await test.step('Verify active item style', async () => {
      await expect(lastItem).toHaveCSS('font-size', '14px');
      await expect(lastItem).toHaveCSS('cursor', 'default');
    });

    await test.step('Verify links in normal state', async () => {
      for (const link of await breadcrumbLinks.all()) {
        await expect(link).toHaveCSS('font-size', '14px');
        await expect(link).toHaveCSS('cursor', 'pointer');
      }
    });

    const hoverStep = browserName === 'firefox' ? test.step.skip : test.step;
    await hoverStep('Verify links are underlined on hover (Firefox drops synthetic hover before style read)', async () => {
      for (const link of await breadcrumbLinks.all()) {
        await link.hover();
        await expect(link).toHaveCSS('text-decoration-line', 'underline');
      }
    });

    await test.step('Verify hovered first link snapshot', async () => {
      await breadcrumbLinks.first().hover();
      await expect(page).toHaveScreenshot();
    });
  });

  const variables = [
    { active: true },
    { active: false },
  ];
  variables.forEach((item) => {
    test(`Verify base truncation and last item is active=${item.active}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@breadcrumbs',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/breadcrumbs/tests/examples/item-truncation.tsx', 'en', item);

      const breadcrumbLinks = page.locator('[data-ui-name="Breadcrumbs.Item"]');
      const hint = page.locator('[data-ui-name="Hint"]');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await breadcrumbLinks.first().hover();
      await hint.first().waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
      if (!item.active) {
        await page.keyboard.press('Tab');
        await hint.nth(1).waitFor({ state: 'visible' });

        await expect(page).toHaveScreenshot();
      }
    });

    test(`Verify ellipsis in the middle and last item is active=${item.active}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        TAG.MOUSE,
        '@breadcrumbs',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/breadcrumbs/advanced/examples/trim_middle.tsx', 'en', item);
      await page.waitForTimeout(200); // wait for finish ellipsis calculation
      const breadcrumb0 = page.locator('[data-ui-name="Breadcrumbs.Item"]').nth(0);
      const breadcrumb = page.locator('[data-ui-name="Breadcrumbs.Item"]').nth(1);
      const hint = page.locator('[data-ui-name="Hint"]');

      await page.keyboard.press('Tab');
      await expect(breadcrumb0).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(breadcrumb).toBeFocused();
      await breadcrumb.hover();
      await hint.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify ellipsis in the end', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      TAG.MOUSE,
      '@breadcrumbs',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/docs/examples/usage_example.tsx', 'en');
    await page.waitForTimeout(200); // wait for finish ellipsis calculation
    const breadcrumb0 = page.locator('[data-ui-name="Breadcrumbs.Item"]').nth(0);
    const breadcrumb = page.locator('[data-ui-name="Breadcrumbs.Item"]').nth(1);
    const hint = page.locator('[data-ui-name="Hint"]');

    await page.keyboard.press('Tab');
    await expect(breadcrumb0).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(breadcrumb).toBeFocused();

    await breadcrumb.hover();
    await hint.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify custom styles and separator', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@breadcrumbs'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/tests/examples/edge-cases.tsx', 'en');

    await page.keyboard.press('Tab');
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
  test('Verify ellipsis truncation in the end', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@breadcrumbs',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/docs/examples/usage_example.tsx', 'en');

    const breadcrumbLinks = page.getByRole('link');
    const lastItem = page.locator('[aria-current="page"]');
    const status = page.getByRole('status');
    const hint = page.locator('[data-ui-name="Hint"]');

    await breadcrumbLinks.first().hover();
    await expect(hint).toHaveCount(0);

    await breadcrumbLinks.nth(1).hover();
    await expect(hint).toHaveCount(1);
    await expect(status).toHaveCount(0);

    await lastItem.hover();
    await expect(hint).toHaveCount(0);
    await expect(status).toHaveCount(0);
  });

  const variables = [
    { active: true },
    { active: false },
  ];
  variables.forEach((item) => {
    test(`Verify ellipsis in the middle and last item is active=${item.active}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@breadcrumbs',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/breadcrumbs/advanced/examples/trim_middle.tsx', 'en', item);

      const breadcrumbLinks = page.getByRole('link');
      const lastItem = page.locator('[aria-current="page"]');
      const status = page.getByRole('status');
      const hint = page.locator('[data-ui-name="Hint"]');

      await breadcrumbLinks.first().hover();
      await expect(hint).toHaveCount(0);

      await breadcrumbLinks.nth(1).hover();
      await expect(hint).toHaveCount(1);
      await expect(status).toHaveCount(0);

      if (item.active) {
        await lastItem.hover();
        await expect(hint).toHaveCount(1);
        await expect(status).toHaveCount(0);
      }
    });
  });

  test.describe('Attributes', () => {
    test('Verify Default attributes', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@breadcrumbs',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/breadcrumbs/advanced/examples/trim_middle.tsx', 'en');

      await expectBreadcrumbsStructure(page, { ariaLabel: 'Breadcrumbs', itemsCount: 3 });

      await test.step('Verify current item is not focusable', async () => {
        const currentItem = page.locator('nav ol > li').nth(2).locator('span').first();
        await expect(currentItem).toHaveAttribute('tabindex', '-1');
      });
    });

    test('Verify attributes when custom aria-label and items are links', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@breadcrumbs',
        '@link'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/breadcrumbs/docs/examples/redefining_a_tag.tsx', 'en');

      await expectBreadcrumbsStructure(page, { ariaLabel: 'Redefining tag example', itemsCount: 3 });

      await test.step('Verify current item is marked as page and not focusable', async () => {
        const currentItem = page.locator('nav ol > li').nth(2).locator('span');
        await expect(currentItem).toHaveAttribute('aria-current', 'page');
        await expect(currentItem).toHaveAttribute('tabindex', '-1');
      });
    });
  });

  test('Verify focus by keyboard when last item is active', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@breadcrumbs',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/docs/examples/usage_example.tsx', 'en');

    const breadcrumbLinks = page.locator('[data-ui-name="Breadcrumbs.Item"]');
    const lastItem = page.locator('[aria-current="page"]');
    await page.keyboard.press('Tab');
    await expect(breadcrumbLinks.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(breadcrumbLinks.nth(1)).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(breadcrumbLinks.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(lastItem).not.toBeFocused();
  });

  test('Verify focus by keyboard when last item is not active', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@breadcrumbs'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/tests/examples/item-truncation.tsx', 'en', { active: false });

    const breadcrumbItems = page.locator('[data-ui-name="Breadcrumbs.Item"]');
    await page.keyboard.press('Tab');
    await expect(breadcrumbItems.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(breadcrumbItems.nth(1)).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(breadcrumbItems.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(breadcrumbItems.nth(2)).toBeFocused();
  });

  test('Verify keyboard navigation when few active elements and custom separator', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@breadcrumbs'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/tests/examples/edge-cases.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="one-active"]')).not.toBeFocused();
    await expect(page.locator('[data-testid="second-active"]')).not.toBeFocused();

    await expect(page.locator('[data-testid="first-cust-separator"]')).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="second-cust-separator"]')).not.toBeFocused();
    await expect(page.locator('[data-testid="active-cust-separator"]')).not.toBeFocused();
    await expect(page.locator('[data-testid="style-cust-separator"]')).toBeFocused();
  });
});
