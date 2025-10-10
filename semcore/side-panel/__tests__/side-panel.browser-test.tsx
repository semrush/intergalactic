import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variablesPlacement = [
    { placement: 'top' },
    { placement: 'bottom' },
    { placement: 'left' },
    { placement: 'right' },
  ];

  variablesPlacement.forEach((item) => {
    test(`Verify Base example looks good in each placement = ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/side-panel/docs/examples/basic_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const button = page.getByRole('button');
      await button.click();
      await page.locator('[data-ui-name="SidePanel.Close"]').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });

  variablesPlacement.forEach((item) => {
    test(`Verify Side panel with Header and Footer looks good in each placement = ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/side-panel/docs/examples/advanced_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByText('Close').waitFor({ state: 'visible' });

      const header = page.locator('[data-ui-name="SidePanel.Header"]');
      const body = page.locator('[data-ui-name="SidePanel.Body"]');
      const footer = page.locator('[data-ui-name="SidePanel.Footer"]');

      await test.step('Verify header styles', async () => {
        await expect(header).toHaveCSS('padding-left', '24px');
        await expect(header).toHaveCSS('padding-right', '56px');
      });

      await test.step('Verify body styles', async () => {
        await expect(body).toHaveCSS('padding-left', '24px');
        await expect(body).toHaveCSS('padding-right', '24px');
        await expect(body).toHaveCSS('padding-top', '16px');
        await expect(body).toHaveCSS('padding-bottom', '16px');
      });

      await test.step('Verify body styles', async () => {
        await expect(footer).toHaveCSS('padding-top', '8px');
        await expect(footer).toHaveCSS('padding-top', '8px');
      });

      const title = page.locator('h6[data-ui-name="SidePanel.Title"]');
      const box = await title.boundingBox();

      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  variablesPlacement.forEach((item) => {
    test(`Verify Internal component inside positioned correclty in each placement = ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const button = page.getByRole('button');
      const close = page.getByLabel('Close');
      await button.click();
      await close.hover();
      await page.getByText('Close').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });

  variablesPlacement.forEach((item) => {
    test(`Verify Side panel with disabled overlay in each placement = ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByText('Close').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify No Close button when no SidePanel.Close and closable = false', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: false });

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Features').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Close button shown when SidePanel.Close and closable = false', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: false });

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Close button looks good when SidePanel.Close and closable = true', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: true });

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Side panel with Ellipsis and tooltip', async ({ page }) => {
    const standPath = 'stories/components/side-panel/tests/examples/with-ellipsis-and-tooltip.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: true });

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });

    const title = page.locator('h6[data-ui-name="SidePanel.Title"]');
    const box = await title.boundingBox();

    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
    await page.getByText('Heading 6, 16px Heading 6, 16px').nth(1).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify Side panel with Header, Footer, Back and Close keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/advanced_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const dialog = page.getByRole('dialog');
    const close = page.getByLabel('Close');
    const back = page.locator('[data-ui-name="SidePanel.Back"]');
    const footer = page.locator('[data-ui-name="SidePanel.Footer"]');
    const footerButtons = footer.getByRole('button');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByText('Close').waitFor({ state: 'visible' });

    await test.step('Verify panel attributes', async () => {
      await expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    await test.step('Verify focus orted and is looped inside side panel', async () => {
      await expect(close).toHaveAttribute('tabindex', '0');
      await expect(close).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(back).toBeFocused();
      await expect(back).toHaveAttribute('tabindex', '0');
      await expect(back).toHaveAttribute('color', 'text-hint');

      await page.keyboard.press('Tab');
      await expect(footerButtons.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    });

    await test.step('Verify closed by ESC when Close is not focused', async () => {
      await expect(back).toBeFocused();
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      await expect(page.getByRole('button')).toBeFocused();
    });

    await test.step('Verify closed by ESC when Close is focused', async () => {
      await page.keyboard.press('Enter');
      await dialog.waitFor({ state: 'visible' });
      await page.keyboard.press('Space');
      await dialog.waitFor({ state: 'hidden' });
      await expect(page.getByRole('button')).toBeFocused();
    });

    await test.step('Verify closed by click outside the side panels when Close is not focused', async () => {
      await page.keyboard.press('Enter');
      await dialog.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.mouse.click(0, 0);

      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });
  });

  test('Verify Closable Side panel  with Access to internal elements mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const dialog = page.getByRole('dialog');
    const close = page.getByLabel('Close');

    await test.step('Verify modal can be closed by Close click', async () => {
      await page.getByRole('button').click();
      await dialog.waitFor({ state: 'visible' });

      await close.click();
      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.getByRole('button').click();
      await dialog.waitFor({ state: 'visible' });

      await page.mouse.click(0, 0);
      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });

    await test.step('Verify Side panel closed by Escape', async () => {
      await page.getByRole('button').click();
      await dialog.waitFor({ state: 'visible' });

      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });
  });

  test('Verify not closable with interactive inside Side panel mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/disabling_overlay.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: false });

    await page.setContent(htmlContent);
    const dialog = page.getByRole('dialog');

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.getByRole('button').click();
      await dialog.waitFor({ state: 'visible' });

      await page.mouse.click(0, 0);
      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });

    await test.step('Verify modal can be closed Escape', async () => {
      await page.getByRole('button').click();
      await dialog.waitFor({ state: 'visible' });

      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });
  });

  test('Verify not closable with interactive inside Side panel keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/disabling_overlay.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: false });

    await page.setContent(htmlContent);
    const dialog = page.getByRole('dialog');
    const readMore = page.getByRole('button', { name: 'Read more' });

    await test.step('Verify modal can be closed by Escape', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await dialog.waitFor({ state: 'visible' });
      await expect(readMore).toBeFocused();

      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.keyboard.press('Enter');

      await dialog.waitFor({ state: 'visible' });
      await expect(readMore).toBeFocused();

      await page.mouse.click(0, 0);
      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });
  });

  test('Verify not closable without interactive inside Side panel mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: false });

    await page.setContent(htmlContent);
    const dialog = page.getByRole('dialog');
    const close = page.getByLabel('Close');

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.getByRole('button').click();
      await dialog.waitFor({ state: 'visible' });

      await page.mouse.click(0, 0);
      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });

    // commented because of the bug UIK-4034
    // await test.step('Verify modal can be closed Escape', async () => {
    //   await page.getByRole('button').click();
    //   await dialog.waitFor({ state: 'visible' });

    //   await page.keyboard.press('Escape');
    //   await dialog.waitFor({ state: 'hidden' });
    //   await expect(dialog).not.toBeVisible();
    // });
  });

  test('Verify not closable without interactive inside Side panel keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: false });

    await page.setContent(htmlContent);
    const dialog = page.getByRole('dialog');
    const close = page.getByLabel('Close');

    await test.step('Verify modal can be closed by click outside', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await dialog.waitFor({ state: 'visible' });

      await page.mouse.click(0, 0);
      await dialog.waitFor({ state: 'hidden' });
      await expect(dialog).not.toBeVisible();
    });

    // commented because of the bug UIK-4034
    // await test.step('Verify modal can be closed Escape', async () => {
    //         await page.keyboard.press('Enter');
    //   await dialog.waitFor({ state: 'visible' });

    //   await page.keyboard.press('Escape');
    //   await dialog.waitFor({ state: 'hidden' });
    //   await expect(dialog).not.toBeVisible();
    // });
  });
});
