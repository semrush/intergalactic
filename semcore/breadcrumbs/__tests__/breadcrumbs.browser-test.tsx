import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Styles', () => {
  test('Verify styles of links and icons', async ({ page, browserName }) => {
    const standPath = 'stories/components/breadcrumbs/docs/examples/usage_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const breadcrumbLinks = page.locator('[data-ui-name="Ellipsis.Content"]');
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
      for (const link of await breadcrumbLinks.all()) {
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

  test('Verify base truncation', async ({ page }) => {
    const standPath = 'stories/components/breadcrumbs/tests/examples/item-truncation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const breadcrumbLinks = page.locator('[data-ui-name="Breadcrumbs.Item"]');
    await breadcrumbLinks.first().hover();
    await expect(page).toHaveScreenshot();
  });

  test('Verify ellipsis truncation in end', async ({ page }) => {
    const standPath = 'stories/components/breadcrumbs/docs/examples/usage_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const breadcrumbLinks = page.locator('[data-ui-name="Ellipsis.Content"]');
    const lastItem = page.locator('[aria-current="page"]');

    await expect(breadcrumbLinks.first()).not.toHaveAttribute('aria-describedby', /popper/);
    await breadcrumbLinks.first().hover();
    await expect(breadcrumbLinks.first()).not.toHaveAttribute('aria-describedby', /popper/);

    await expect(breadcrumbLinks.nth(1)).not.toHaveAttribute('aria-describedby', /popper/);
    await breadcrumbLinks.nth(1).hover();
    await expect(breadcrumbLinks.nth(1)).toHaveAttribute('aria-describedby', /popper/);

    await lastItem.hover();
    await expect(breadcrumbLinks.nth(1)).not.toHaveAttribute('aria-describedby', /popper/);

    await page.keyboard.press('Tab');
    await expect(breadcrumbLinks.first()).not.toHaveAttribute('aria-describedby', /popper/);

    await page.keyboard.press('Tab');
    await expect(breadcrumbLinks.nth(1)).toHaveAttribute('aria-describedby', /popper/);
  });

  test('Verify ellipsis truncation in middle', async ({ page }) => {
    const standPath = 'stories/components/breadcrumbs/advanced/examples/trim_middle.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const breadcrumbLinks = page.locator('[data-ui-name="Box"]');
    const lastItem = page.locator('[aria-current="page"]');

    await expect(breadcrumbLinks.first()).not.toHaveAttribute('aria-describedby', /popper/);
    await breadcrumbLinks.first().hover();
    await expect(breadcrumbLinks.first()).toHaveAttribute('aria-describedby', /popper/);

    await expect(breadcrumbLinks.nth(1)).not.toHaveAttribute('aria-describedby', /popper/);
    await breadcrumbLinks.nth(1).hover();
    await expect(breadcrumbLinks.nth(1)).toHaveAttribute('aria-describedby', /popper/);

    await lastItem.hover();
    await expect(breadcrumbLinks.nth(1)).not.toHaveAttribute('aria-describedby', /popper/);

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Attributes', () => {
  test('Default attributes', async ({ page }) => {
    const standPath = 'stories/components/breadcrumbs/advanced/examples/trim_middle.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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

  test('Custom aria-label and items are links', async ({ page }) => {
    const standPath = 'stories/components/breadcrumbs/docs/examples/redefining_a_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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

test.describe('Keyboard and mouse interactions', () => {
  test('Verify links focused and active item not focused by keyboard', async ({
    page,
    browserName,
  }) => {
    const standPath = 'stories/components/breadcrumbs/docs/examples/usage_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const breadcrumbLinks = page.locator('[data-ui-name="Ellipsis.Content"]');
    const lastItem = page.locator('[aria-current="page"]');

    await page.keyboard.press('Tab');
    await expect(breadcrumbLinks.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(breadcrumbLinks.nth(1)).toBeFocused();
    breadcrumbLinks.nth(1).hover();
    await expect(breadcrumbLinks.nth(1)).toHaveAttribute('aria-describedby', /popper/);

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Escape');
    await expect(breadcrumbLinks.nth(1)).toBeFocused();
    await expect(breadcrumbLinks.nth(1)).not.toHaveAttribute('aria-describedby', /popper/);

    await page.keyboard.press('Shift+Tab');
    await expect(breadcrumbLinks.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    if (browserName === 'firefox') {
      await expect(breadcrumbLinks.first()).not.toBeFocused();
      await expect(breadcrumbLinks.nth(1)).toBeFocused();
    } else {
      await expect(breadcrumbLinks.first()).not.toBeFocused();
      await expect(breadcrumbLinks.nth(1)).not.toBeFocused();
      await expect(lastItem).not.toBeFocused();
    }
  });

  test('Verify few active not focused and custom styles when focus active', async ({ page }) => {
    const standPath = 'stories/components/breadcrumbs/tests/examples/edge-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="one-active"]')).not.toBeFocused();
    await expect(page.locator('[data-testid="second-active"]')).not.toBeFocused();

    await expect(page.locator('[data-testid="first-cust-separator"]')).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="second-cust-separator"]')).not.toBeFocused();
    await expect(page.locator('[data-testid="active-cust-separator"]')).not.toBeFocused();
    await expect(page.locator('[data-testid="style-cust-separator"]')).toBeFocused();

    await expect(page).toHaveScreenshot();
  });
});
