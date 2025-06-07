import { platform } from 'os';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('InlineEdit', () => {
  test('Verify Base exmaple keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/inline-edit/docs/examples/simple_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const inlineEditView = page.locator('[data-ui-name="InlineEdit.View"]');
    const inlineEditEdit = page.locator('[data-ui-name="InlineEdit.Edit"]');
    const randomText = Math.random().toString().substring(2);
    const editIcons = inlineEditView.locator('svg');
    const check = page.locator('[data-name="Check"]');
    const close = page.locator('[data-name="Close"]');

    const inlineEdit = page.locator('[data-ui-name="InlineEdit"]');

    await test.step('Verify inline view mode attributes', async () => {
      await expect(inlineEditView).toHaveAttribute('tabindex', '0');
      await expect(inlineEditView).toHaveAttribute('role', 'button');
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Martin Eden');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
    });

    await test.step('Verify inline focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(inlineEditView).toBeFocused();
      await expect(inlineEditEdit).toHaveCount(0);
    });

    await test.step('Verify enter activated edit mode', async () => {
      await page.keyboard.press('Enter');
      await expect(inlineEditView).toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(1);
    });

    await test.step('Verify edit mode skipped by ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
    });

    await test.step('Verify space activated edit mode', async () => {
      await page.keyboard.press('Space');
      await expect(inlineEditView).toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(1);
    });

    await test.step('Verify escape not saves text updates', async () => {
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type(randomText);
      await page.keyboard.press('Escape');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Martin Eden');
    });

    await test.step('Verify enter saves text updates', async () => {
      await page.keyboard.press('Space');
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type(randomText);
      await page.keyboard.press('Enter');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', `Edit: ${randomText}`);
    });

    await test.step('Verify confirm updates value and returns to edit mode', async () => {
      await page.keyboard.press('Space');
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type('Test Test Test');
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Save"');
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Enter');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Test Test Test');
      await expect(inlineEditView).toBeFocused();
    });

    await test.step('Verify cancel updates value and returns to edit mode', async () => {
      await page.keyboard.press('Space');
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Cancel"');
      await page.keyboard.press('Enter');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Test Test Test');
      await expect(inlineEditView).toBeFocused();
    });

    await test.step('Verify empty state', async () => {
      await page.keyboard.press('Space');
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Enter');

      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: ');
      await expect(inlineEditView).toBeFocused();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Base exmaple mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/inline-edit/docs/examples/simple_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const inlineEditView = page.locator('[data-ui-name="InlineEdit.View"]');
    const inlineEditEdit = page.locator('[data-ui-name="InlineEdit.Edit"]');
    const randomText = Math.random().toString().substring(2);
    const editIcon = inlineEditView.locator('svg');
    const check = page.locator('[data-name="Check"]');
    const close = page.locator('[data-name="Close"]');

    const inlineEdit = page.locator('[data-ui-name="InlineEdit"]');

    await test.step('Verify Edit mode activated by mouse click', async () => {
      await inlineEdit.click();
      await expect(inlineEditEdit).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Edit mode activated by icon click', async () => {
      await check.click();
      await expect(inlineEditEdit).toHaveCount(0);
      await editIcon.click();
      await expect(inlineEditEdit).toHaveCount(1);
    });

    await test.step('Verify click on Close not saves text updates and returns to edit mode', async () => {
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type(randomText);
      await close.hover();
      await page.waitForSelector('text="Cancel"');
      await close.click();
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Martin Eden');
    });

    await test.step('Verify click on Confirm updates value and returns to edit mode', async () => {
      await inlineEdit.click();
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type('Test Test Test');
      await expect(page).toHaveScreenshot();

      await check.click();
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Test Test Test');
      await expect(inlineEditView).toBeFocused();
    });

    await test.step('Verify empty state', async () => {
      await inlineEdit.click();
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.press('Backspace');
      await check.click();
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: ');
      await expect(inlineEditView).toBeFocused();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify inline input interactions after page scrolling', async ({ page }) => {
    const standPath = 'stories/components/inline-edit/docs/examples/simple_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    const newLines = Array(100)
      .fill(0)
      .map(() => '<br/>')
      .join('');
    await page.setContent(newLines + htmlContent);

    await page.mouse.wheel(0, 10_000);

    const randomText = Math.random().toString().substring(2);
    const initialText = await (await page.locator('[data-ui-name="InlineEdit"]')).textContent();

    await page.click('[data-ui-name="InlineEdit"]');
    await page.type('input', randomText);
    await page.click('[data-ui-name="InlineInput.CancelControl"]');

    const textContent = await (await page.locator('[data-ui-name="InlineEdit"]')).textContent();
    await expect(textContent?.replace(/\s+SaveCancel$/, '').trim()).toBe(initialText?.trim());
  });

  test('Verify Editable tag keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/inline-edit/docs/examples/editable_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const inlineEditView = page.locator('[data-ui-name="InlineEdit.View"]');
    const inlineEditEdit = page.locator('[data-ui-name="InlineEdit.Edit"]');
    const randomText = Math.random().toString().substring(2);
    const tagContainer = page.locator('[data-ui-name="TagContainer.Tag"]');
    const tagContainerClose = page.locator('[data-ui-name="TagContainer.Close"]');

    await test.step('Verify inline view mode attributes', async () => {
      await expect(inlineEditView).toHaveAttribute('tabindex', '-1');
      await expect(inlineEditView).toHaveAttribute('role');
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Default tag');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
    });

    await test.step('Verify tag focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(inlineEditView).not.toBeFocused();
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(tagContainer).toBeFocused();
    });

    await test.step('Verify tag closefocused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(inlineEditView).not.toBeFocused();
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(tagContainer).not.toBeFocused();
      await expect(tagContainerClose).toBeFocused();
    });

    await test.step('Verify tag focused by shift+tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(inlineEditView).not.toBeFocused();
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(tagContainer).toBeFocused();
    });

    await test.step('Verify enter on tag activated edit mode', async () => {
      await page.keyboard.press('Enter');
      await expect(inlineEditView).toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(1);
    });

    await test.step('Verify edit mode skipped by ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
    });

    await test.step('Verify space activated edit mode', async () => {
      await page.keyboard.press('Space');
      await expect(inlineEditView).toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(1);
    });

    await test.step('Verify escape not saves text updates', async () => {
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type(randomText);
      await page.keyboard.press('Escape');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Default tag');
    });

    await test.step('Verify enter saves text updates', async () => {
      await page.keyboard.press('Space');
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type(randomText);
      await page.keyboard.press('Enter');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', `Edit: ${randomText}`);
    });

    await test.step('Verify confirm updates value and returns to edit mode', async () => {
      await page.keyboard.press('Space');
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type('Test Test Test');
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Save"');
      await page.keyboard.press('Enter');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Test Test Test');
      await expect(tagContainer).toBeFocused();
    });

    await test.step('Verify cancel updates value and returns to edit mode', async () => {
      await page.keyboard.press('Space');
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Cancel"');
      await page.keyboard.press('Enter');
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Test');
      await expect(tagContainer).toBeFocused();
    });

    if (browserName === 'chromium')
      await test.step('Verify tab removes from  edit mode', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
        await expect(inlineEditEdit).toHaveCount(0);
        await expect(tagContainer).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(tagContainerClose).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(tagContainerClose).toBeFocused();
      });
  });

  test('Verify Editable tag mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/inline-edit/docs/examples/editable_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const inlineEditView = page.locator('[data-ui-name="InlineEdit.View"]');
    const inlineEditEdit = page.locator('[data-ui-name="InlineEdit.Edit"]');
    const randomText = Math.random().toString().substring(2);
    const check = page.getByLabel('Save');
    const close = page.getByLabel('Cancel');
    const inlineEdit = page.locator('[data-ui-name="InlineEdit"]');

    await test.step('Verify Edit mode activated by mouse click', async () => {
      await inlineEdit.click();
      await expect(inlineEditEdit).toHaveCount(1);
    });

    await test.step('Verify click on Close not saves text updates and returns to edit mode', async () => {
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type(randomText);
      await close.hover();
      await page.waitForSelector('text="Cancel"');
      await close.click();
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Default tag');
    });

    await test.step('Verify click on Confirm updates value and returns to edit mode', async () => {
      await inlineEdit.click();
      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.type('Test Test Test');
      await check.hover();
      await page.waitForSelector('text="Save"');
      await expect(page).toHaveScreenshot();

      await check.click();
      await expect(inlineEditView).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(0);
      await expect(inlineEditView).toHaveAttribute('aria-label', 'Edit: Default tag');
    });
  });

  test('Verify Pseudo network mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/inline-edit/docs/examples/pseudo_network_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const check = page.getByLabel('Save');
    const close = page.getByLabel('Cancel');
    const spinLocator = page.locator('[data-ui-name="Spin"]');
    const inlineEdit = page.locator('[data-ui-name="InlineEdit"]');
    const textSpan = page.locator('span[data-ui-name="Text"]');

    await test.step('Verify spin is shown on Save click', async () => {
      await inlineEdit.click();
      await check.click();

      await expect(spinLocator).toBeVisible({ timeout: 1500 });
      await expect(spinLocator).toBeHidden({ timeout: 5000 });
    });

    await test.step('Verify spin is NOT shown on Cancel click', async () => {
      await inlineEdit.click();
      await close.hover();
      await page.waitForSelector('text="Cancel"');

      await close.click();

      await expect(spinLocator).toBeHidden({ timeout: 1500 });
    });

    await test.step('Verify spin is shown on outside text click', async () => {
      await inlineEdit.click();

      const target = await textSpan.boundingBox();
      if (target) {
        await page.mouse.click(target.x + 5, target.y + 5);
      }

      await expect(spinLocator).toBeVisible({ timeout: 1500 });
      await expect(spinLocator).toBeHidden({ timeout: 5000 });
    });
  });

  test('Verify Pseudo network keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/inline-edit/docs/examples/pseudo_network_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const spinLocator = page.locator('[data-ui-name="Spin"]');

    await test.step('Verify spin is NOT shown on Escape', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');

      await expect(spinLocator).toBeHidden({ timeout: 1500 });
    });

    await test.step('Verify spin is shown on Save', async () => {
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await expect(spinLocator).toBeVisible({ timeout: 1500 });
      await expect(spinLocator).toBeHidden({ timeout: 5000 });
    });

    await test.step('Verify spin is NOT shown on Cancel', async () => {
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await expect(spinLocator).toBeHidden({ timeout: 1500 });
    });

    await test.step('Verify spin is shown on Enter', async () => {
      await page.keyboard.press('Enter');
      await page.keyboard.press('Enter');

      await expect(spinLocator).toBeVisible({ timeout: 1500 });
    });
  });

  test('Verify edit and view settings functionality', async ({ page }) => {
    const standPath = 'stories/components/inline-edit/tests/examples/test_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const inlineEditView = page.locator('[data-ui-name="InlineEdit.View"]');
    const inlineEditEdit = page.locator('[data-ui-name="InlineEdit.Edit"]');

    await expect(page).toHaveScreenshot();
    await test.step('Verify no edit when edit disabled', async () => {
      await inlineEditView.first().click();
      await expect(inlineEditView.first()).not.toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(1);
    });

    await test.step('Verify edit shown when edit enabled', async () => {
      await inlineEditView.nth(1).click();
      await expect(inlineEditView.nth(1)).toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(2);
    });

    await test.step('Verify edit shown when has styles', async () => {
      await inlineEditView.nth(2).click();
      await expect(inlineEditView.nth(2)).toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(3);
    });

    await test.step('Verify edit hidden when view enabled', async () => {
      await inlineEditEdit.nth(2).click();
      await expect(inlineEditView.nth(3)).toHaveAttribute('aria-hidden', 'true');
      await expect(inlineEditEdit).toHaveCount(3);
    });

    await expect(page).toHaveScreenshot();
  });
});
