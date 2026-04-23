import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  header: (page: Page) => page.locator('[data-ui-name="SidePanel.Header"]'),
  body: (page: Page) => page.locator('[data-ui-name="SidePanel.Body"]'),
  footer: (page: Page) => page.locator('[data-ui-name="SidePanel.Footer"]'),
  title: (page: Page) => page.locator('h6[data-ui-name="SidePanel.Title"]'),
  back: (page: Page) => page.locator('[data-ui-name="SidePanel.Back"]'),
  dialog: (page: Page) => page.getByRole('dialog'),

};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesPlacement = [
    { placement: 'top' },
    { placement: 'bottom' },
    { placement: 'left' },
    { placement: 'right' },
  ];

  variablesPlacement.forEach((item) => {
    test(`Verify Base example looks good in each placement = ${item.placement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@side-panel',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/side-panel/docs/examples/basic_example.tsx', 'en', item);

      await locators.button(page).click();
      await locators.button(page, 'Close').waitFor({ state: 'visible', timeout: 500 });
      await page.waitForTimeout(200); // for finish animation

      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });
    test(`Verify Side panel with Header and Footer looks good in each placement = ${item.placement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@side-panel',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/side-panel/docs/examples/advanced_example.tsx', 'en', item);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByText('Close').waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Close')).toBeFocused();

      await test.step('Verify header styles', async () => {
        await expect(locators.header(page)).toHaveCSS('padding-left', '24px');
        await expect(locators.header(page)).toHaveCSS('padding-right', '56px');
      });

      await test.step('Verify body styles', async () => {
        await expect(locators.body(page)).toHaveCSS('padding-left', '24px');
        await expect(locators.body(page)).toHaveCSS('padding-right', '24px');
        await expect(locators.body(page)).toHaveCSS('padding-top', '16px');
        await expect(locators.body(page)).toHaveCSS('padding-bottom', '16px');
      });

      await test.step('Verify body styles', async () => {
        await expect(locators.footer(page)).toHaveCSS('padding-top', '8px');
        await expect(locators.footer(page)).toHaveCSS('padding-top', '8px');
      });

      const box = await locators.title(page).boundingBox();

      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    test(`Verify Internal component inside positioned correclty in each placement = ${item.placement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@side-panel',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx', 'en', item);

      await locators.button(page).click();
      await locators.button(page, 'Close').waitFor({ state: 'visible' });
      await locators.button(page, 'Close').hover();
      await page.getByText('Close').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    test(`Verify Side panel with disabled overlay in each placement = ${item.placement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@side-panel',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx', 'en', item);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.button(page, 'Close')).toBeFocused();
      await page.getByText('Close').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });
  });

  test('Verify No Close button when no SidePanel.Close and closable = false', {
    tag: [TAG.PRIORITY_HIGH,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/basic_example.tsx', 'en', { closable: false });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Features').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Close button shown when SidePanel.Close and closable = false', {
    tag: [TAG.PRIORITY_HIGH,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx', 'en', { closable: false });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });
    await expect(locators.button(page, 'Close')).toBeFocused();

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Close button looks good when SidePanel.Close and closable = true', {
    tag: [TAG.PRIORITY_HIGH,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx', 'en', { closable: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Side panel with Ellipsis and tooltip', {
    tag: [TAG.PRIORITY_HIGH,
      '@side-panel',
      '@ellipsis',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/tests/examples/side-panel-additional-states.tsx', 'en', { ellipsisTitle: true, withTooltipInBody: true, withFooter: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });
    await expect(locators.button(page, 'Close')).toBeFocused();

    const title = page.locator('h6[data-ui-name="SidePanel.Title"]');
    const box = await title.boundingBox();

    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
    await page.locator('[data-ui-name="Hint"]').nth(1).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify Side panel with Header, Footer, Back and Close keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/advanced_example.tsx', 'en');

    const footerButtons = locators.footer(page).getByRole('button');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });
    await expect(locators.button(page, 'Close')).toBeFocused();

    await test.step('Verify panel attributes', async () => {
      await expect(locators.dialog(page)).toHaveAttribute('aria-modal', 'true');
    });

    await test.step('Verify focus orted and is looped inside side panel', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.back(page)).toBeFocused();
      await expect(locators.back(page)).toHaveAttribute('color', 'var(--intergalactic-text-hint, #6c6e79)');

      await page.keyboard.press('Tab');
      await expect(footerButtons.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    });

    await test.step('Verify closed by ESC when Close is not focused', async () => {
      await expect(locators.back(page)).toBeFocused();
      await page.keyboard.press('Escape');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(page.getByRole('button')).toBeFocused();
    });

    await test.step('Verify closed by Activate Close when Close is focused', async () => {
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Close')).toBeFocused();

      await page.keyboard.press('Space');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(page.getByRole('button')).toBeFocused();
    });

    await test.step('Verify closed by click outside the side panels when Close is not focused', async () => {
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Close')).toBeFocused();

      await page.keyboard.press('Tab');
      await page.mouse.click(0, 0);

      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });
  });

  test('Verify Closable Side panel  with Access to internal elements mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx', 'en');

    await test.step('Verify modal can be closed by Close click', async () => {
      await page.getByRole('button').click();
      await locators.dialog(page).waitFor({ state: 'visible' });

      await locators.button(page, 'Close').click();
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.getByRole('button').click();
      await locators.dialog(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(200); // wait for animation to complete

      await page.mouse.click(0, 0);
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    await test.step('Verify Side panel closed by Escape', async () => {
      await page.getByRole('button').click();
      await locators.button(page, 'Close').waitFor({ state: 'visible' });
      await page.waitForTimeout(200); // wait for animation to complete

      await page.keyboard.press('Escape');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });
  });

  test('Verify not closable with interactive inside Side panel mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/disabling_overlay.tsx', 'en', { closable: false });

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.getByRole('button').click();
      await locators.button(page).nth(1).waitFor({ state: 'visible' });

      await page.mouse.click(0, 0);
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    await test.step('Verify modal can be closed Escape', async () => {
      await page.getByRole('button').click();
      await locators.button(page).nth(1).waitFor({ state: 'visible' });
      await page.waitForTimeout(200); // wait for animation to complete

      await page.keyboard.press('Escape');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });
  });

  test('Verify not closable with interactive inside Side panel keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/disabling_overlay.tsx', 'en', { closable: false });

    await test.step('Verify modal can be closed by Escape', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await locators.dialog(page).waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Read more')).toBeFocused();

      await page.keyboard.press('Escape');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.keyboard.press('Enter');

      await locators.dialog(page).waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Read more')).toBeFocused();

      await page.mouse.click(0, 0);
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });
  });

  test('Verify not closable without interactive inside Side panel mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/basic_example.tsx', 'en', { closable: false });

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.getByRole('button').click();
      await locators.dialog(page).waitFor({ state: 'visible' });

      await page.mouse.click(0, 0);
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    // commented because of the bug UIK-4034
    // await test.step('Verify modal can be closed Escape', async () => {
    //   await page.getByRole('button').click();
    //   await locators.dialog(page).waitFor({ state: 'visible' });

    //   await page.keyboard.press('Escape');
    //   await locators.dialog(page).waitFor({ state: 'hidden' });
    //   await expect(locators.dialog(page)).not.toBeVisible();
    // });
  });

  test('Verify not closable without interactive inside Side panel keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/docs/examples/basic_example.tsx', 'en', { closable: false });

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(200); // wait for animation to complete

      await page.mouse.click(0, 0);
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    // commented because of the bug UIK-4034
    // await test.step('Verify modal can be closed Escape', async () => {
    //         await page.keyboard.press('Enter');
    //   await locators.dialog(page).waitFor({ state: 'visible' });

    //   await page.keyboard.press('Escape');
    //   await locators.dialog(page).waitFor({ state: 'hidden' });
    //   await expect(locators.dialog(page)).not.toBeVisible();
    // });
  });

  test('Verify Header increases in height as the content in it increases', async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/tests/examples/side-panel-additional-states.tsx', 'en', { withClose: true, withAdditionalHeaderContent: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });
    await expect(locators.header(page)).toHaveCSS('flex-shrink', '0');
  });
});
