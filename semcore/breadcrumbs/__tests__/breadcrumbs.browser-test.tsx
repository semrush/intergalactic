import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify links and icons styles', {
    tag: [`${TAG.PRIORITY_HIGH},
        @breadcrumbs,
        @ellipsis`],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/breadcrumbs/docs/examples/usage_example.tsx', 'en');

    const breadcrumbLinks = page.locator('a[data-ui-name="Breadcrumbs.Item"]');
    const chevronIcons = page.locator('[data-ui-name="ChevronRight"]');
    const lastItem = page.locator('[aria-current="page"]');

    const expectedLinkStyles = {
      fontSize: '14px',
      color: 'rgb(108, 110, 121)',
      cursor: 'pointer',
    };

    const expectedHoverStyles = {
      color: 'rgb(25, 27, 35)',
      textDecoration: 'underline',
    };

    const expectedLastItemStyles = {
      fontSize: '14px',
      color: 'rgb(25, 27, 35)',
      cursor: 'default',
    };

    const expectedChevronColor = 'rgb(169, 171, 182)';
    const expectedSeparatorMargin = '8px';

    await test.step('Verify active item style', async () => {
      const lastItemStyles = await lastItem.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          color: styles.color,
          cursor: styles.cursor,
        };
      });
      expect(lastItemStyles).toMatchObject(expectedLastItemStyles);
    });

    await test.step('Verify links in normal and hover states', async () => {
      const links = await breadcrumbLinks.all();
      for (const link of links) {
        const styles = await link.evaluate((el) => {
          const computed = getComputedStyle(el);
          return {
            fontSize: computed.fontSize,
            color: computed.color,
            cursor: computed.cursor,
          };
        });
        expect(styles).toMatchObject(expectedLinkStyles);

        if (browserName !== 'firefox') {
          // ff works weird on hover in non debug mode
          await link.hover();
          const hoverStyles = await link.evaluate((el) => {
            const computed = getComputedStyle(el);
            return {
              color: computed.color,
              textDecoration: computed.textDecorationLine || computed.textDecoration,
            };
          });
          expect(hoverStyles).toMatchObject(expectedHoverStyles);
        }
      }

      await breadcrumbLinks.first().hover();

      await expect(page).toHaveScreenshot();
    });
    await test.step('Verify separator styles', async () => {
      for (const icon of await chevronIcons.all()) {
        const color = await icon.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe(expectedChevronColor);

        const marginLeft = await icon.evaluate(
          (el) => getComputedStyle(el.parentElement!).marginLeft,
        );
        expect(marginLeft).toBe(expectedSeparatorMargin);
      }
    });
  });

  const variables = [
    { active: true },
    { active: false },
  ];
  variables.forEach((item) => {
    test(`Verify base truncation and last item is active=${item.active}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@breadcrumbs'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/breadcrumbs/tests/examples/item-truncation.tsx', 'en', item);

      const breadcrumbLinks = page.locator('[data-ui-name="Breadcrumbs.Item"]');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await breadcrumbLinks.first().hover();
      await expect(page).toHaveScreenshot();
      if (!item.active) {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      }
    });

    test(`Verify ellipsis in the middle and last item is active=${item.active}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@breadcrumbs',
        '@ellipis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/breadcrumbs/advanced/examples/trim_middle.tsx', 'en', item);

      const breadcrumbLinks = page.locator('[data-ui-name="Tooltip"]');
      const status = page.getByRole('status');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await breadcrumbLinks.nth(1).hover();
      await status.waitFor({ state: 'attached' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify ellipsis in the end', {
    tag: [TAG.PRIORITY_HIGH,
      '@breadcrumbs',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/docs/examples/usage_example.tsx', 'en');

    const breadcrumbLinks = page.locator('[data-ui-name="Ellipsis.Content"]');
    const status = page.getByRole('status');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await breadcrumbLinks.nth(1).hover();
    await status.waitFor({ state: 'attached' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify custom styles and separator', {
    tag: [TAG.PRIORITY_MEDIUM,
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
      TAG.KEYBOARD,
      '@breadcrumbs',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/docs/examples/usage_example.tsx', 'en');

    const breadcrumbLinks = page.getByRole('link');
    const lastItem = page.locator('[aria-current="page"]');
    const status = page.getByRole('status');

    const count = await breadcrumbLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(status).toHaveCount(0);
      await expect(breadcrumbLinks.nth(i).first()).not.toHaveAttribute('aria-describedby', /popper/);
    }

    await breadcrumbLinks.first().hover();
    for (let i = 0; i < count; i++) {
      await expect(status).toHaveCount(0);
      await expect(breadcrumbLinks.nth(i).first()).not.toHaveAttribute('aria-describedby', /popper/);
    }

    await breadcrumbLinks.nth(1).hover();
    await expect(breadcrumbLinks.nth(0)).not.toHaveAttribute('aria-describedby', /popper/);
    await expect(breadcrumbLinks.nth(1)).toHaveAttribute('aria-describedby', /popper/);
    await expect(status).toHaveCount(1);

    await lastItem.hover();
    for (let i = 0; i < count; i++) {
      await expect(status).toHaveCount(0);
      await expect(breadcrumbLinks.nth(i).first()).not.toHaveAttribute('aria-describedby', /popper/);
    }

    await page.keyboard.press('Tab');
    for (let i = 0; i < count; i++) {
      await expect(status).toHaveCount(0);
      await expect(breadcrumbLinks.nth(i).first()).not.toHaveAttribute('aria-describedby', /popper/);
    }

    await page.keyboard.press('Tab');
    await expect(breadcrumbLinks.nth(0)).not.toHaveAttribute('aria-describedby', /popper/);
    await expect(breadcrumbLinks.nth(1)).toHaveAttribute('aria-describedby', /popper/);
    await expect(status).toHaveCount(1);
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

      const count = await breadcrumbLinks.count();
      for (let i = 0; i < count; i++) {
        await expect(status).toHaveCount(0);
        await expect(breadcrumbLinks.nth(i).first()).not.toHaveAttribute('aria-describedby', /popper/);
      }
      await breadcrumbLinks.first().hover();
      await expect(breadcrumbLinks.first()).toHaveAttribute('aria-describedby', /popper/);
      await expect(status).toHaveCount(1);
      await expect(breadcrumbLinks.nth(1)).not.toHaveAttribute('aria-describedby', /popper/);

      await breadcrumbLinks.nth(1).hover();
      await expect(breadcrumbLinks.first()).not.toHaveAttribute('aria-describedby', /popper/);
      await expect(status).toHaveCount(1);
      await expect(breadcrumbLinks.nth(1)).toHaveAttribute('aria-describedby', /popper/);

      if (item.active) {
        await lastItem.hover();
        for (let i = 0; i < count; i++) {
          await expect(status).toHaveCount(0);
          await expect(breadcrumbLinks.nth(i).first()).not.toHaveAttribute('aria-describedby', /popper/);
        }
      } else {
        await breadcrumbLinks.nth(2).hover();
        for (let i = 0; i < count - 1; i++) {
          await expect(breadcrumbLinks.nth(i).first()).not.toHaveAttribute('aria-describedby', /popper/);
          await expect(breadcrumbLinks.nth(2)).toHaveAttribute('aria-describedby', /popper/);
          await expect(status).toHaveCount(1);
        }
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

      const nav = page.locator('nav');
      await expect(nav).toHaveAttribute('data-ui-name', 'Breadcrumbs');
      await expect(nav).toHaveAttribute('aria-label', 'Breadcrumbs');

      const separator = page.locator('nav > div');

      const separatorCount = await separator.count();
      for (let i = 0; i < separatorCount; i++) {
        await expect(separator.nth(i)).toHaveAttribute('aria-hidden', 'true');
        const svg = separator.nth(i).locator('svg');
        await expect(svg).toHaveAttribute('aria-hidden', 'true');
        await expect(svg).toHaveAttribute('tabindex', '-1');
        await expect(svg).toHaveAttribute('hidden', '');
      }

      const list = page.locator('nav > li');

      const listCount = await list.count();
      for (let i = 0; i < listCount; i++) {
        const item = list.nth(i);
        await expect(item).toHaveAttribute('role', 'listitem');
        await expect(item).toHaveAttribute('level', `${i + 1}`);
      }

      const currentItem = page.locator('nav ol > li').nth(2).locator('span');
      await expect(currentItem).toHaveAttribute('aria-current', 'page');
      await expect(currentItem).toHaveAttribute('tabindex', '-1');
    });

    test('Verify attributes when custom aria-label and items are links', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@breadcrumbs',
        '@link'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/breadcrumbs/docs/examples/redefining_a_tag.tsx', 'en');

      const nav = page.locator('nav');
      await expect(nav).toHaveAttribute('data-ui-name', 'Breadcrumbs');
      await expect(nav).toHaveAttribute('aria-label', 'Redefining tag example');

      const separator = page.locator('nav > div');

      const separatorCount = await separator.count();
      for (let i = 0; i < separatorCount; i++) {
        await expect(separator.nth(i)).toHaveAttribute('aria-hidden', 'true');
        const svg = separator.nth(i).locator('svg');
        await expect(svg).toHaveAttribute('aria-hidden', 'true');
        await expect(svg).toHaveAttribute('tabindex', '-1');
        await expect(svg).toHaveAttribute('hidden', '');
      }

      const list = page.locator('nav > li');

      const listCount = await list.count();
      for (let i = 0; i < listCount; i++) {
        const item = list.nth(i);
        await expect(item).toHaveAttribute('role', 'listitem');
        await expect(item).toHaveAttribute('level', `${i + 1}`);
      }

      const currentItem = page.locator('nav ol > li').nth(2).locator('span');
      await expect(currentItem).toHaveAttribute('aria-current', 'page');
      await expect(currentItem).toHaveAttribute('tabindex', '-1');
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
