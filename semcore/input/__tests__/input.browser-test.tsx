import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Functional', () => {
  test('Verify focus return back to Input after keyboard interactions with Close button', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/input_with_the_clearing_ability.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const input = await page.locator('input');
    const addonButton = await page.locator('[data-ui-name="Input.Addon"] button');
    await test.step('Verify focus return back to Input by Enter press on Close button', async () => {
      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();

      await page.keyboard.type('Focus test');
      await addonButton.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await expect(input).not.toBeFocused();
      await expect(addonButton).toBeFocused();

      await page.keyboard.press('Enter');

      await expect(input).toBeFocused();
      await expect(addonButton).toBeHidden();
      expect(await input.inputValue()).toBe('');
    });
    await test.step('Verify focus return back to Input by Enter press on Close button ', async () => {
      await page.keyboard.type('Focus test');
      await addonButton.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await expect(input).not.toBeFocused();
      await expect(addonButton).toBeFocused();

      await page.keyboard.press('Space');

      await expect(input).toBeFocused();
      await expect(addonButton).toBeHidden();
      expect(await input.inputValue()).toBe('');
    });
  });

  test('Verify Input with submit button keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocator = page.locator('input');
    const hint = page.locator('[data-ui-name="Hint"]');
    await test.step('Verify focus return back to Input by Enter press on Submit button ', async () => {
      await page.keyboard.press('Tab');
      await expect(inputLocator).toBeFocused();
      await expect(inputLocator).toHaveAttribute('type', 'text');

      await page.keyboard.type('Hello world');
      await expect(await inputLocator.inputValue()).toBe('Hello world');

      await page.keyboard.press('Tab');
      await expect(hint).toBeFocused();
      await page.getByText('Submit').waitFor({ state: 'visible' });

      await page.keyboard.press('Enter');

      await expect(await inputLocator.inputValue()).toBe('');
      await expect(inputLocator).toBeFocused();
      await expect(hint).not.toBeVisible();
    });

    await test.step('Verify focus return back to Input by Space press on Submit button ', async () => {
      await page.keyboard.type('Hello world');
      await expect(await inputLocator.inputValue()).toBe('Hello world');

      await page.keyboard.press('Tab');
      await expect(hint).toBeFocused();
      await page.getByText('Submit').waitFor({ state: 'visible' });
      await page.keyboard.press('Space');

      await expect(await inputLocator.inputValue()).toBe('');
      await expect(inputLocator).toBeFocused();
      await expect(hint).not.toBeVisible();
    });
  });

  test('Verify Input with submit button mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocator = page.locator('input');
    const hint = page.locator('[data-ui-name="Hint"]');

    await inputLocator.click();
    await expect(inputLocator).toBeFocused();

    await page.keyboard.type('Hello world');
    await expect(await inputLocator.inputValue()).toBe('Hello world');

    await expect(hint).toBeVisible();

    await hint.hover();
    await page.getByText('Submit').waitFor({ state: 'visible' });
    await expect(await inputLocator.inputValue()).toBe('Hello world');

    await hint.click();
    await expect(await inputLocator.inputValue()).toBe('');
    await expect(inputLocator).toBeFocused();
    await expect(hint).not.toBeVisible();
  });

  test('Verify password input keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/password_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocator = await page.locator('input');
    const hint = page.locator('[data-ui-name="Hint"]');

    await page.keyboard.press('Tab');
    await expect(inputLocator).toBeFocused();
    await expect(hint).toBeVisible();
    await expect(hint).not.toBeFocused();

    await expect(inputLocator).toHaveAttribute('autocomplete', 'current-password');
    await expect(inputLocator).toHaveAttribute('value', 'I_like_cats');

    await page.keyboard.press('Backspace');
    await expect(await inputLocator.inputValue()).toBe('');

    await page.keyboard.type('Hello world');
    await expect(await inputLocator.inputValue()).toBe('Hello world');

    await page.keyboard.press('Tab');
    await expect(hint).toBeFocused();
    await page.getByText('Show password').waitFor({ state: 'visible' });

    await page.keyboard.down('Enter');

    await expect(await inputLocator.inputValue()).toBe('Hello world');
    await page.getByText('Hide password').waitFor({ state: 'visible' });
    await expect(hint).toBeVisible();

    await page.keyboard.press('Shift+Tab');
    await expect(inputLocator).toBeFocused();
  });

  test('Verify password input mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/password_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocator = page.locator('input');
    const hint = page.locator('[data-ui-name="Hint"]');

    await expect(hint).toBeVisible();

    await expect(inputLocator).toHaveAttribute('autocomplete', 'current-password');
    await expect(inputLocator).toHaveAttribute('value', 'I_like_cats');

    await hint.hover();
    await page.getByText('Show password').waitFor({ state: 'visible' });
    await expect(inputLocator).not.toBeFocused();
    await expect(hint).not.toBeFocused();

    await hint.click();
    await expect(await inputLocator.inputValue()).toBe('I_like_cats');
    await page.getByText('Hide password').waitFor({ state: 'visible' });
    await expect(inputLocator).toBeFocused();
    await expect(hint).not.toBeFocused();

    await inputLocator.click();
    await expect(await inputLocator.inputValue()).toBe('I_like_cats');
    await expect(inputLocator).toBeFocused();
    await expect(hint).not.toBeFocused();
  });

  test('Verify Input Text addon mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/input_with_a_text_addon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocator = page.locator('input');
    const addon = page.locator('[data-ui-name="Input.Addon"]');

    // input focused by click on the text addon
    await addon.first().click();
    await expect(inputLocator.first()).toBeFocused();
    await expect(addon.first()).not.toBeFocused();
    await page.keyboard.type('Hello world');
    // input focused by click on the input

    await inputLocator.nth(1).click();
    await expect(inputLocator.first()).not.toBeFocused();
    await expect(inputLocator.nth(1)).toBeFocused();
    await expect(addon.nth(1)).not.toBeFocused();
  });

  test('Verify Input with counter and badge mouse interactions', async ({ page }) => {
    const standPath =
      'stories/components/input/docs/examples/input_with_other_component_inside.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocator = await page.locator('input');
    const addon = page.locator('[data-ui-name="Input.Addon"]');

    // input focused by click on the text addon
    await addon.first().click();
    await expect(inputLocator.first()).toBeFocused();
    await expect(addon.first()).not.toBeFocused();
    await page.keyboard.type('Hello world');
    // input focused by click on the input

    await inputLocator.nth(1).click();
    await expect(inputLocator.first()).not.toBeFocused();
    await expect(inputLocator.nth(1)).toBeFocused();
    await expect(addon.nth(1)).not.toBeFocused();
  });

  test('Verify Input multiple addon focus order', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/input_with_multiple_addons.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocator = await page.locator('input');
    const hint = page.locator('[data-ui-name="Hint"]');
    const link = page.locator('[data-ui-name="Link"]');

    await page.keyboard.press('Tab');
    await expect(inputLocator).toBeFocused();
    await expect(hint).not.toBeFocused();
    await expect(link).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(inputLocator).not.toBeFocused();
    await expect(link).toBeFocused();
    await expect(hint).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(inputLocator).not.toBeFocused();
    await expect(link).not.toBeFocused();
    await expect(hint).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(inputLocator).not.toBeFocused();
    await expect(link).toBeFocused();
    await expect(hint).not.toBeFocused();
  });
});

test.describe('Visual', () => {
  test('Verify input states and styles', async ({ page }) => {
    const standPath = 'stories/components/input/tests/examples/input-styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify Default ', async () => {
      const flex = await page.locator('[data-testid="Default"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      // disabled not focused
      await page.keyboard.press('Tab');
      await expect(flex.locator('[placeholder="l-size"]')).toBeFocused();

      // readOnly focused but without cursor
      await page.keyboard.press('Tab');
      await expect(flex.locator('[placeholder="l-readOnly"]')).toBeFocused();

      // invalid focused
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      // valid focused
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify m styles ', async () => {
      const flex = await page.locator('[data-testid="Default"]');
      const m = flex.locator('[placeholder="m-size"]');
      await expect(m).toHaveCSS('padding', '0px 8px');
      await expect(m).toHaveCSS('height', '26px');
    });

    await test.step('Verify l styles ', async () => {
      const flex = await page.locator('[data-testid="Default"]');
      const l = flex.locator('[placeholder="l-size"]');
      await expect(l).toHaveCSS('padding', '0px 12px');
      await expect(l).toHaveCSS('height', '38px');
    });

    await test.step('Verify with Left Addon ', async () => {
      const flex = await page.locator('[data-testid="Left-addon"]');
      await flex.locator('[placeholder="m-size"]').click();
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      // disabled not focused
      await page.keyboard.press('Tab');
      await expect(flex.locator('[placeholder="l-size"]')).toBeFocused();

      // readOnly focused but without cursor
      await page.keyboard.press('Tab');
      await expect(flex.locator('[placeholder="l-readOnly"]')).toBeFocused();

      // invalid focused
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      // valid focused
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify with Left and Right Addon ', async () => {
      const flex = await page.locator('[data-testid="Left-right-addon"]');
      await flex.locator('[placeholder="m-size"]').click();
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      // disabled not focused
      await page.keyboard.press('Tab');
      await expect(flex.locator('[placeholder="l-size"]')).toBeFocused();

      // readOnly focused but without cursor
      await page.keyboard.press('Tab');
      await expect(flex.locator('[placeholder="l-readOnly"]')).toBeFocused();

      // invalid focused
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      // valid focused
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify with Right Addon ', async () => {
      const flex = await page.locator('[data-testid="Right-addon"]');
      await flex.locator('[placeholder="m-size"]').click();
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
      // disabled not focused
      await page.keyboard.press('Tab');
      await expect(flex.locator('[placeholder="l-size"]')).toBeFocused();

      // readOnly focused but without cursor
      await page.keyboard.press('Tab');
      await expect(flex.locator('[placeholder="l-readOnly"]')).toBeFocused();

      // invalid focused
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      // valid focused
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });
  });

  test('Verify input with neighbor location', async ({ page }) => {
    const standPath = 'stories/components/input/tests/examples/with-neighborlocation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Input with submit button', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await page.keyboard.press('Tab');
    await page.getByText('Submit').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify password input', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/password_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const hint = page.locator('[data-ui-name="Hint"]');
    await hint.click();
    await page.getByText('Hide password').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify input loading state ', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/loading_state_in_the_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const addon = page.locator('[data-ui-name="Input.Addon"]');

    await expect(addon).toHaveAttribute('role', 'status');
    await expect(addon).toHaveAttribute('aria-live', 'polite');

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await expect(addon).not.toBeFocused();
  });

  test('Verify Input Text with addon keyboard interactions', async ({ page, browserName }) => {
    if (browserName === 'firefox') return; // issue - long text in input not alwasy truncated in ff

    const standPath = 'stories/components/input/docs/examples/input_with_a_text_addon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const inputLocator = await page.locator('input');
    const addon = page.locator('[data-ui-name="Input.Addon"]');

    await page.keyboard.press('Tab');
    await expect(inputLocator.first()).toBeFocused();
    await expect(addon.first()).not.toBeFocused();
    await page.keyboard.type('Hello world Hello world Hello world Hello world');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Input with counter and badge keyboard interactions', async ({ page }) => {
    const standPath =
      'stories/components/input/docs/examples/input_with_other_component_inside.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const inputLocator = page.locator('input');
    const addon = page.locator('[data-ui-name="Input.Addon"]');

    await page.keyboard.press('Tab');
    await expect(inputLocator.first()).toBeFocused();
    await expect(addon.first()).not.toBeFocused();
    await page.keyboard.type('Hello world');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('UX pattern - Visual', () => {
  test('Verify login form', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/default-log-in-form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const tooltip = page.getByRole('tooltip');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Enter');
    await tooltip.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.type('test@test.test');
    await tooltip.waitFor({ state: 'hidden' });
    await page.keyboard.press('Tab');
    await tooltip.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('UX pattern - Functional', () => {
  test('Verify login form', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/default-log-in-form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const textboxes = page.getByRole('textbox');
    const tooltip = page.getByRole('tooltip');
    const submit = page.getByRole('button');
    await page.keyboard.press('Tab');
    await expect(textboxes.first()).toBeFocused();
    await expect(textboxes.first()).toHaveAttribute('aria-invalid', 'false');
    await expect(textboxes.first()).toHaveAttribute('name', 'email');
    await expect(textboxes.first()).toHaveAttribute('id', 'email');
    await expect(textboxes.first()).toHaveAttribute('autocomplite', 'email');

    await page.keyboard.press('Tab');

    await expect(textboxes.last()).toBeFocused();
    await expect(textboxes.last()).toHaveAttribute('aria-invalid', 'false');
    await expect(textboxes.last()).toHaveAttribute('name', 'password');
    await expect(textboxes.last()).toHaveAttribute('id', 'password');
    await expect(textboxes.last()).toHaveAttribute('autocomplite', 'current-password');

    await page.keyboard.press('Tab');
    await expect(submit).toBeFocused();

    await page.keyboard.press('Enter');
    await tooltip.waitFor({ state: 'visible' });
    await expect(textboxes.first()).toBeFocused();
    await expect(tooltip).toHaveValue('Email is required');
    await expect(textboxes.first()).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.type('tes');
    await tooltip.waitFor({ state: 'visible' });
    await expect(tooltip).toHaveValue('Email is not valid');
    await expect(textboxes.first()).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.type('t@test.test');
    await tooltip.waitFor({ state: 'hidden' });
    await expect(textboxes.first()).toHaveAttribute('aria-invalid', 'false');

    await page.keyboard.press('Tab');
    await tooltip.waitFor({ state: 'visible' });
    await expect(tooltip).toHaveValue('Password is required');
    await expect(textboxes.last()).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.type('Qwe');
    await expect(tooltip).toHaveValue('Password must have at least 8 characters');
    await expect(textboxes.last()).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.type('Qwerty');
    await tooltip.waitFor({ state: 'hidden' });
    await expect(textboxes.last()).toHaveAttribute('aria-invalid', 'false');

    await page.keyboard.press('Shift+ab');
    await expect(tooltip).toHaveCount(0);
  });
});
