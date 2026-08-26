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
  backButton: (page: Page) => page.locator('h6[data-ui-name="SidePanel.Title"] [data-ui-name="ButtonLink"]'),
  titleText: (page: Page) => page.locator('h6[data-ui-name="SidePanel.Title"] [data-ui-name="Text"]'),
  dialog: (page: Page) => page.getByRole('dialog'),
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),

};

const collectRuntimeErrors = (page: Page) => {
  const errors: string[] = [];

  page.on('console', (msg) => {
    const text = msg.text();

    if (msg.type() === 'error' && !text.includes('ReactDOM.render is no longer supported')) {
      errors.push(text);
    }
  });

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  return errors;
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

      await expect(page).toHaveScreenshot();
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
      await locators.hint(page).waitFor({ state: 'visible' });

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
      await expect(page).toHaveScreenshot();
    });

    test(`Verify Internal component inside positioned correclty in each placement = ${item.placement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@side-panel',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx', 'en', item);

      await locators.button(page).click();
      await locators.button(page, 'Read more').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });

    test(`Verify Side panel with disabled overlay in each placement = ${item.placement}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@side-panel',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/side-panel/docs/examples/disabling_overlay.tsx', 'en', item);

      await locators.button(page).click();
      await page.getByText('SidePanel Title').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
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
    await page.getByText('SidePanel Title').waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Close button shown when SidePanel.Close and closable = false', {
    tag: [TAG.PRIORITY_HIGH,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/tests/examples/side-panel-additional-states.tsx', 'en', { withClose: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(locators.button(page, 'Close', 0)).toBeFocused();
    await locators.hint(page).waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Close button looks good when SidePanel.Close and closable = true', {
    tag: [TAG.PRIORITY_HIGH,
      '@side-panel',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/side-panel/tests/examples/side-panel-additional-states.tsx', 'en', { withClose: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });
    await locators.hint(page).waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Side panel with Ellipsis and tooltip', {
    tag: [TAG.PRIORITY_HIGH,
      '@side-panel',
      '@ellipsis',
      '@tooltip'],
  }, async ({ page }) => {
    const titleText = 'Heading 6, 16px Heading 6, 16px';

    await loadPage(page, 'stories/components/side-panel/tests/examples/side-panel-additional-states.tsx', 'en', {
      ellipsisTitle: true,
      withTooltipInBody: true,
      withFooter: true,
      animationsDisabled: true,
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(locators.button(page, 'Close')).toBeFocused();
    await locators.hint(page).filter({ hasText: 'Close' }).waitFor({ state: 'visible' });

    await expect(locators.title(page)).toHaveText(titleText);

    // Ellipsis lives on the Text inside SidePanel.Title, the title itself has ellipsis={false}.
    const titleTextNode = locators.titleText(page);
    await expect.poll(async () => {
      return titleTextNode.evaluate((el) => el.scrollWidth > el.clientWidth);
    }).toBe(true);

    await titleTextNode.hover();
    await locators.hint(page).filter({ hasText: titleText }).waitFor({ state: 'visible' });
    await page.waitForFunction((expectedText) => {
      const titleHint = Array.from(document.querySelectorAll<HTMLElement>('[data-ui-name="Hint"]'))
        .find((hint) => hint.textContent?.includes(expectedText));

      return titleHint && getComputedStyle(titleHint).opacity === '1';
    }, titleText);
    await expect(locators.hint(page)).toHaveCount(2);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify back button stays intact while long title text truncates via ellipsis', {
    tag: [TAG.PRIORITY_HIGH, '@side-panel', '@ellipsis', '@button'],
  }, async ({ page }) => {
    await loadPage(
      page,
      'stories/components/side-panel/tests/examples/side-panel-additional-states.tsx',
      'en',
      {
        ellipsisTitle: true,
        withFooter: true,
        animationsDisabled: true,
      },
    );

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.backButton(page).waitFor({ state: 'visible' });

    await test.step('Back control is a single icon-only ButtonLink inside the title', async () => {
      await expect(locators.backButton(page)).toHaveCount(1);
      await expect(locators.backButton(page).locator('[data-ui-name="ButtonLink.Text"]'))
        .toHaveCount(0);
    });

    await test.step('Title text is truncated', async () => {
      await expect.poll(async () => {
        return locators.titleText(page).evaluate((el) => el.scrollWidth > el.clientWidth);
      }).toBe(true);
    });

    await test.step('Back button keeps its full width and is not squeezed by the title', async () => {
      const backBox = await locators.backButton(page).boundingBox();
      expect(backBox!.width).toBeGreaterThan(0);

      const isBackTruncated = await locators.backButton(page).evaluate(
        (el) => el.scrollWidth > el.clientWidth,
      );
      expect(isBackTruncated).toBe(false);
    });
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
      await expect(locators.backButton(page)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(footerButtons.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    });

    await test.step('Verify closed by ESC when Close is not focused', async () => {
      await expect(locators.backButton(page)).toBeFocused();
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
    await loadPage(page, 'stories/components/side-panel/tests/examples/side-panel-additional-states.tsx', 'en', { withClose: true });

    await test.step('Verify modal can be closed by Close click', async () => {
      await page.getByRole('button').click();
      await locators.dialog(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(200); // wait for animation to complete

      await locators.button(page, 'Close', 0).click({ force: true });
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
      await locators.button(page, 'Close', 0).waitFor({ state: 'visible' });
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
    await loadPage(page, 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx', 'en', { closable: false });

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
    await loadPage(page, 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx', 'en', { closable: false });

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

  test('Verify SidePanel title appears asynchronously in header', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@side-panel',
      '@ellipsis'],
  }, async ({ page }) => {
    const asyncTitle = 'My Article Title';
    const errors = collectRuntimeErrors(page);

    await loadPage(page, 'stories/components/side-panel/tests/examples/async-title-in-header.tsx', 'en');

    await page.getByRole('button', { name: 'Show SidePanel with async title' }).click();
    const dialog = locators.dialog(page);
    const title = dialog.locator('h6[data-ui-name="SidePanel.Title"]');

    await dialog.waitFor({ state: 'visible' });
    await expect(title).toHaveText('', { timeout: 1000 });

    await expect(title).toHaveText(asyncTitle, { timeout: 2000 });

    await title.hover();
    await expect(locators.hint(page)).toHaveText(asyncTitle);

    expect(errors).toEqual([]);
  });

  test('Verify SidePanel title clears asynchronously in header', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@side-panel',
      '@ellipsis'],
  }, async ({ page }) => {
    const initialTitle = 'My Article Title';
    const errors = collectRuntimeErrors(page);

    await loadPage(page, 'stories/components/side-panel/tests/examples/async-title-in-header.tsx', 'en');

    await page.getByRole('button', { name: 'Show SidePanel with cleared title' }).click();
    const dialog = locators.dialog(page);
    const title = dialog.locator('h6[data-ui-name="SidePanel.Title"]');

    await dialog.waitFor({ state: 'visible' });
    await expect(title).toHaveText(initialTitle, { timeout: 1000 });

    await expect(title).toHaveText('', { timeout: 2000 });
    await expect(locators.hint(page)).toHaveCount(0);

    expect(errors).toEqual([]);
  });
});
