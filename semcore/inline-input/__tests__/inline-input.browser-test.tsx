import { platform } from 'os';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('InlineInput styles', () => {
  test('Verify states and styles', async ({ page }) => {
    const standPath = 'stories/components/inline-input/tests/examples/styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 1600, height: 800 });

    await test.step('Verify default with controls', async () => {
      const flex = await page.locator('[data-testid="default"]');
      const value = flex.locator('[data-ui-name="InlineInput.Value"]');
      const confirm = flex.locator('[data-ui-name="InlineInput.ConfirmControl"]');
      const cancel = flex.locator('[data-ui-name="InlineInput.CancelControl"]');

      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await expect(value.first()).toHaveCSS('padding', '0px 4px');
      await expect(confirm.first()).toHaveCSS('padding', '0px 4px');
      await expect(cancel.first()).toHaveCSS('padding', '0px 4px');
    });

    await test.step('Verify default with addon', async () => {
      const flex = await page.locator('[data-testid="addons"]');
      const value = flex.locator('[data-ui-name="InlineInput.Value"]');
      const confirm = flex.locator('[data-ui-name="InlineInput.ConfirmControl"]');
      const cancel = flex.locator('[data-ui-name="InlineInput.CancelControl"]');
      const addon = flex.locator('[data-ui-name="InlineInput.Addon"]');

      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await value.first().click();
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await expect(value.first()).toHaveCSS('padding', '0px 4px');
      await expect(confirm.first()).toHaveCSS('padding', '0px 4px');
      await expect(cancel.first()).toHaveCSS('padding', '0px 4px');
      await expect(addon.first()).toHaveCSS('padding', '0px 4px');
    });

    await test.step('Verify default with addon', async () => {
      const flex = await page.locator('[data-testid="no-controls"]');
      const value = flex.locator('[data-ui-name="InlineInput.Value"]');
      const input = flex.locator('[data-ui-name="InlineInput"]');
      const inputLine = flex.locator('div[class*="Underline"]');

      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await value.first().click();
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await expect(value.first()).toHaveCSS('padding', '0px 4px');
      await expect(input.first()).toHaveCSS('align-items', 'center');
      await expect(input.first()).toHaveCSS('vertical-align', 'middle');
      await expect(input.first()).toHaveCSS('padding', '1px');
      await expect(input.first()).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      await expect(inputLine.first()).toHaveCSS('border-bottom', '1px solid rgb(196, 199, 207)');
    });
  });

  test('Verify custom icon and text', async ({ page }) => {
    const standPath = 'stories/components/inline-input/tests/examples/with-custom-text.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.waitForSelector('text="For love"');
    await expect(page).toHaveScreenshot();

    await page.locator('[data-ui-name="InlineInput.CancelControl"]').hover();
    await page.waitForSelector('text="DRAIN THE SWAMP!"');

    await expect(page).toHaveScreenshot();
  });
});

test.describe('InlineInput interactions', () => {
  test('Verify onBlurBehavior by mouse', async ({ page }) => {
    const standPath = 'stories/components/inline-input/tests/examples/on-blur-behavior-test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const confirm = page.locator('[data-testid="onBlurBehavior-confirm"]');
    const cancel = page.locator('[data-testid="onBlurBehavior-cancel"]');
    const none = page.locator('[data-testid="onBlurBehavior-none"]');

    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });

    await test.step('Verify onBlurBehavior-confirm', async () => {
      await confirm.click();

      await cancel.click();

      await page.waitForTimeout(100);

      const confirmLogs = logs.filter((log) => log.includes('Confirm'));
      expect(confirmLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });

    await test.step('Verify onBlurBehavior-cancel', async () => {
      await confirm.click();

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });

    await test.step('Verify onBlurBehavior-none', async () => {
      await none.click();
      await confirm.click();

      await page.waitForTimeout(100);

      const confirmLogs = logs.filter((log) => log.includes('Confirm'));
      expect(confirmLogs.length).toBe(2);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });
  });

  test('Verify onBlurBehavior by keyboard', async ({ page }) => {
    const standPath = 'stories/components/inline-input/tests/examples/on-blur-behavior-test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });

    await test.step('Verify onBlurBehavior-cancel', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });

    await test.step('Verify onBlurBehavior-confirm', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.waitForTimeout(100);

      const confirmLogs = logs.filter((log) => log.includes('Confirm'));
      expect(confirmLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });

    await test.step('Verify onBlurBehavior-none', async () => {
      await page.keyboard.press('Shift+Tab');

      await page.waitForTimeout(100);

      const confirmLogs = logs.filter((log) => log.includes('Confirm'));
      expect(confirmLogs.length).toBe(1);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);

      const onChangeLogs = logs.filter((log) => log.includes('Change'));
      expect(onChangeLogs.length).toBe(0);
    });
  });

  test('Verify Confirm and Cancel and onChange activate by mouse', async ({ page }) => {
    const standPath = 'stories/components/inline-input/tests/examples/on-blur-behavior-test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const confirm = page.locator('[data-testid="onBlurBehavior-confirm"]');
    const save = confirm.locator('[data-ui-name="InlineInput.ConfirmControl"]');
    const cancel = confirm.locator('[data-ui-name="InlineInput.CancelControl"]');

    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });

    await test.step('Verify onChange activates when entering new', async () => {
      await confirm.click();

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.type('Test');

      await page.waitForTimeout(100);

      const onCahngeLogs = logs.filter((log) => log.includes('Change'));
      expect(onCahngeLogs.length).toBe(4);
    });

    await test.step('Verify event sent on Save', async () => {
      await save.click();

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Confirm'));
      expect(cancelLogs.length).toBe(1);
    });

    await test.step('Verify event sent on Save', async () => {
      await cancel.click();

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(1);
    });
  });

  test('Verify Confirm and Cancel and onChange activate by keyboard', async ({ page }) => {
    const standPath = 'stories/components/inline-input/tests/examples/on-blur-behavior-test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const confirm = page.locator('[data-testid="onBlurBehavior-confirm"]');
    const save = confirm.locator('[data-ui-name="InlineInput.ConfirmControl"]');
    const cancel = confirm.locator('[data-ui-name="InlineInput.CancelControl"]');

    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });

    await test.step('Verify onChange activates when removinf data', async () => {
      await page.keyboard.press('Tab');

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.press('Backspace');

      await page.waitForTimeout(100);

      const onCahngeLogs = logs.filter((log) => log.includes('Change'));
      expect(onCahngeLogs.length).toBe(1);
    });

    await test.step('Verify onChange activates when entering data', async () => {
      await page.keyboard.type('Test');

      await page.waitForTimeout(100);

      const onCahngeLogs = logs.filter((log) => log.includes('Change'));
      expect(onCahngeLogs.length).toBe(5);
    });

    await test.step('Verify event sent on Enter', async () => {
      await page.keyboard.press('Enter');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Confirm'));
      expect(cancelLogs.length).toBe(1);
    });

    await test.step('Verify event sent on Escape', async () => {
      await page.keyboard.press('Escape');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Confirm'));
      expect(cancelLogs.length).toBe(1);
    });

    await test.step('Verify event sent on Save', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Confirm'));
      expect(cancelLogs.length).toBe(2);
    });

    await test.step('Verify event sent on Cancel', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await page.waitForTimeout(100);

      const cancelLogs = logs.filter((log) => log.includes('Cancel'));
      expect(cancelLogs.length).toBe(2);
    });
  });

  test('Verify Basic usage mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const inlineInput = page.locator('[data-ui-name="InlineInput"]');
    const addon = page.locator('[data-ui-name="InlineInput.Addon"]');
    const value = page.locator('[data-ui-name="InlineInput.Value"]');

    const save = inlineInput.locator('[data-ui-name="InlineInput.ConfirmControl"]');
    const cancel = inlineInput.locator('[data-ui-name="InlineInput.CancelControl"]');

    await test.step('Verify input focuses when clicking on addon', async () => {
      await expect(value).toHaveAttribute('value', 'John Doe');

      await addon.click();

      await expect(value).toBeFocused();
      await save.hover();
      await page.waitForSelector('text="Save"');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focuse removes when clicking on button', async () => {
      await save.click();
      await expect(value).not.toBeFocused();
    });

    await test.step('Verify focused when clicking on value', async () => {
      await value.click();
      await expect(value).toBeFocused();

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.type('Test');
      await expect(value).toHaveAttribute('value', 'Test');
    });
  });

  test('Verify Basic usage keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const inlineInput = page.locator('[data-ui-name="InlineInput"]');
    const addon = page.locator('[data-ui-name="InlineInput.Addon"]');
    const value = page.locator('[data-ui-name="InlineInput.Value"]');

    const save = inlineInput.getByLabel('Save');
    const cancel = inlineInput.getByLabel('Cancel');

    await test.step('Verify input focues when pressing Tab', async () => {
      await expect(value).toHaveAttribute('value', 'John Doe');

      await page.keyboard.press('Tab');
      await expect(value).toBeFocused();

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify stay focused when clicking on Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(value).toBeFocused();
    });

    await test.step('Verify stay focused when clicking on Arrows', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(value).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await expect(value).toBeFocused();
    });

    await test.step('Verify entering value', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.type('Test');
      await expect(value).toHaveAttribute('value', ' TestJohn Doe');
    });

    await test.step('Verify addons focused when pressing Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(value).not.toBeFocused();
      await expect(save).toBeFocused();
      await page.waitForSelector('text="Save"');
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await expect(value).not.toBeFocused();
      await expect(save).not.toBeFocused();
      await expect(cancel).toBeFocused();
      await page.waitForSelector('text="Cancel"');

      await page.keyboard.press('Shift+Tab');
      await page.waitForSelector('text="Save"');
      await save.hover();
      await expect(value).not.toBeFocused();
      await expect(save).toBeFocused();
    });
  });

  test('Verify Inheriting text size', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/inheriting_text_size.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const inlineEditView = page.locator('[data-ui-name="InlineEdit.View"]');
    const inlineInput = page.locator('[data-ui-name="InlineInput"]');
    const addon = page.locator('[data-ui-name="InlineInput.Addon"]');
    const value = page.locator('[data-ui-name="InlineInput.Value"]');
    const spinLocator = page.locator('[data-ui-name="Spin"]');

    const save = inlineInput.locator('[data-ui-name="InlineInput.ConfirmControl"]');
    const cancel = inlineInput.locator('[data-ui-name="InlineInput.CancelControl"]');

    await test.step('Verify view when activating inline input', async () => {
      await expect(inlineInput).toHaveCount(0);
      await inlineEditView.click();
      await expect(value).toBeFocused();
      await expect(inlineInput).toHaveCount(1);

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.type('Once upon a time in a distant galaxy far, far away, there existed a legendary creature known as the Intergalactic Whale.');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify size changes according to entered content', async () => {
      await page.keyboard.press('Enter');
      await expect(value).not.toBeFocused();
      await expect(spinLocator).toBeVisible({ timeout: 1500 });
      await inlineEditView.click();

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Number-only input mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/number-only_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const inlineInput = page.locator('[data-ui-name="InlineInput"]');
    const addon = page.locator('[data-ui-name="InlineInput.Addon"]');
    const value = page.locator('[data-ui-name="InlineInput.NumberValue"]');

    const save = inlineInput.locator('[data-ui-name="InlineInput.ConfirmControl"]');
    const increment = page.locator('[aria-label="increment"]');
    const decrement = page.locator('[aria-label="decrement"]');

    await test.step('Verify input focues when clicking on addon', async () => {
      await expect(value).toHaveAttribute('value', '100');

      await addon.click();

      await expect(value).toBeFocused();
      await save.hover();
      await page.waitForSelector('text="Save"');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus moved when clicking on button', async () => {
      await save.click();
      await expect(value).not.toBeFocused();
    });

    await test.step('Verify focused when clicking on value and impossible to enter text', async () => {
      await value.click();
      await expect(value).toBeFocused();

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }

      await page.keyboard.type('Test');
      await expect(value).toHaveAttribute('value', '100');
    });

    await test.step('Verify input number attributes', async () => {
      await expect(value).toHaveAttribute('type', 'text');
      await expect(value).toHaveAttribute('autocomplete', 'off');
      await expect(value).toHaveAttribute('inputmode', 'numeric');
      await expect(value).toHaveAttribute('step', '1');
    });

    await test.step('Verify value changes when clicking on controls', async () => {
      await save.click();

      await increment.click();
      await expect(value).toBeFocused();

      await increment.click();
      await increment.click();
      await expect(value).toHaveAttribute('value', '103');

      await decrement.click();
      await expect(value).toHaveAttribute('value', '102');
    });
  });

  test('Verify Number-only input keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/number-only_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const inlineInput = page.locator('[data-ui-name="InlineInput"]');
    const value = page.locator('[data-ui-name="InlineInput.NumberValue"]');

    const save = inlineInput.getByLabel('Save');

    await test.step('Verify input focues when pressing Tab', async () => {
      await expect(value).toHaveAttribute('value', '100');

      await page.keyboard.press('Tab');
      await expect(value).toBeFocused();
      await save.hover();
      await page.waitForSelector('text="Save"');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focused when clicking on Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(value).toBeFocused();
    });

    await test.step('Verify value and focus when clicking on Arrows', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(value).toHaveAttribute('value', '100');
      await expect(value).toBeFocused();
      await page.keyboard.press('ArrowLeft');
      await expect(value).toHaveAttribute('value', '100');
      await expect(value).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(value).toBeFocused();
      await expect(value).toHaveAttribute('value', '103');
      await page.keyboard.press('ArrowDown');
      await expect(value).toBeFocused();
      await expect(value).toHaveAttribute('value', '102');
    });

    await test.step('Verify addons focused when pressing Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(value).not.toBeFocused();
      await expect(save).toBeFocused();
      await page.waitForSelector('text="Save"');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Shift+Tab');
      await expect(value).toBeFocused();
    });
  });

  test('Verify that elements are focusable when disabled = false', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const input = page.locator('[data-ui-name="InlineInput.Value"]');
    const confirmControl = page.locator('[data-ui-name="InlineInput.ConfirmControl"] button');
    const cancelControl = page.locator('[data-ui-name="InlineInput.CancelControl"] button');

    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();
    await expect(confirmControl).not.toBeFocused();
    await expect(cancelControl).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(input).not.toBeFocused();
    await expect(confirmControl).toBeFocused();
    await expect(cancelControl).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(input).not.toBeFocused();
    await expect(confirmControl).not.toBeFocused();
    await expect(cancelControl).toBeFocused();
  });

  test('Verify that elements aren\'t focusable when disabled = true', async ({ page }) => {
    const standPath = 'stories/components/inline-input/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { disabled: true });
    await page.setContent(htmlContent);

    const input = page.locator('[data-ui-name="InlineInput.Value"]');
    const confirmControl = page.locator('[data-ui-name="InlineInput.ConfirmControl"] button');
    const cancelControl = page.locator('[data-ui-name="InlineInput.CancelControl"] button');

    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Tab');
      await expect(input).not.toBeFocused();
      await expect(confirmControl).not.toBeFocused();
      await expect(cancelControl).not.toBeFocused();
    }

    await input.click({ force: true });
    await expect(input).not.toBeFocused();
  });
});
