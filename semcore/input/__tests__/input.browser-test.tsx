import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  input: (page: Page) => page.getByRole('textbox'),
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
  addon: (page: Page) => page.locator('[data-ui-name="Input.Addon"]'),
  control: (page: Page) => page.locator('[data-ui-name="Input"]'),
};

const getWrapClip = async (page: Page) => {
  const clip = (await page.getByTestId('wrap').first().boundingBox())!;
  return { x: clip.x - 4, y: clip.y - 4, width: clip.width + 8, height: clip.height + 8 };
};

const controlHeight = { m: '32px', l: '44px' };
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variablesActive = [
    { size: 'm', state: 'normal', disabled: false, autoFocus: true, readOnly: false, placeholder: 'Placeholder', w: undefined },
    { size: 'm', state: 'valid', disabled: false, autoFocus: false, readOnly: false, placeholder: undefined, w: 200 },
    { size: 'm', state: 'invalid', disabled: false, autoFocus: false, readOnly: false, placeholder: 'Placeholder', w: 150 },

    { size: 'l', state: 'normal', disabled: false, autoFocus: false, readOnly: false, placeholder: undefined, w: 200 },
    { size: 'l', state: 'valid', disabled: false, autoFocus: false, readOnly: false, placeholder: 'Placeholder', w: 120 },
    { size: 'l', state: 'invalid', disabled: false, autoFocus: true, readOnly: false, placeholder: 'Placeholder', w: undefined },

    { size: 'm', state: 'normal', disabled: true, autoFocus: false, readOnly: false, placeholder: 'Placeholder', w: 200 },
    { size: 'l', state: 'valid', disabled: true, autoFocus: true, readOnly: false, placeholder: undefined, w: undefined },
    { size: 'm', state: 'invalid', disabled: true, autoFocus: false, readOnly: false, placeholder: 'Placeholder', w: 120 },

    { size: 'm', state: 'normal', disabled: false, autoFocus: false, readOnly: true, placeholder: 'Placeholder', w: 200 },
    { size: 'l', state: 'valid', disabled: false, autoFocus: true, readOnly: true, placeholder: undefined, w: undefined },
    { size: 'l', state: 'invalid', disabled: false, autoFocus: false, readOnly: true, placeholder: 'Placeholder', w: 120 },

    { size: 'm', state: 'normal', disabled: true, autoFocus: false, readOnly: true, placeholder: 'Placeholder', w: 120 },
  ];
  variablesActive.forEach((item) => {
    test(`Verify input base state=${item.size} state=${item.state} disabled=${item.disabled} readOnly=${item.readOnly} autoFocus=${item.autoFocus} placeholder = ${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@input',
        '@badge',
        '@base-components',
        '@flex-box',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input/tests/examples/input-base-example.tsx', 'en', item);
      const clip = await getWrapClip(page);
      const focusStep = item.disabled ? test.step.skip : test.step;

      await test.step('Verify default', async () => {
        await expect(page).toHaveScreenshot({ clip });
      });

      await test.step(`Verify ${item.size} height`, async () => {
        await expect(locators.control(page)).not.toHaveCount(0);
        for (const control of await locators.control(page).all()) {
          await expect(control).toHaveCSS('height', controlHeight[item.size as keyof typeof controlHeight]);
        }
      });

      await focusStep(item.readOnly ? 'Verify readOnly focused' : 'Verify focused', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot({ clip });
        if (!item.readOnly) await page.keyboard.press('k');
      });
    });

    test(`Verify input with neighbor-location state=${item.size} state=${item.state} disabled=${item.disabled} readOnly=${item.readOnly} autoFocus=${item.autoFocus} placeholder = ${item.placeholder}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@input',
        '@badge',
        '@base-components',
        '@button',
        '@button-link',
        '@flex-box',
        '@neighbor-location'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input/tests/examples/input-with-neighborlocation.tsx', 'en', item);
      const clip = await getWrapClip(page);
      const focusStep = item.disabled ? test.step.skip : test.step;

      await test.step('Verify default', async () => {
        await expect(page).toHaveScreenshot({ clip });
      });

      await focusStep(item.readOnly ? 'Verify readOnly focused' : 'Verify focused', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot({ clip });
        if (!item.readOnly) await page.keyboard.press('k');
      });
    });
  });

  test('Verify Input with submit button', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@tooltip',
      '@base-components',
      '@button',
      '@button-link',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx', 'en');

    await test.step('Verify submit button focused with hint', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('Hello world');
      await page.keyboard.press('Tab');
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify password input', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@button',
      '@tooltip',
      '@base-components',
      '@button-link',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/password_input.tsx', 'en');

    await test.step('Verify shown password with hint', async () => {
      await locators.addon(page).locator('button').click();
      await locators.hint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify input loading state ', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@spin',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/loading_state_in_the_input.tsx', 'en');

    await test.step('Verify loading addon attributes', async () => {
      await expect(locators.addon(page)).toHaveAttribute('role', 'status');
      await expect(locators.addon(page)).toHaveAttribute('aria-live', 'polite');
    });

    await test.step('Verify focused input with text', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('Hello world');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify input after focus moved out', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Input Text with addon keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Long text in input is not always truncated in Firefox');
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_text_addon.tsx', 'en');

    await test.step('Verify long text is truncated in the first input', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('Hello world Hello world Hello world Hello world');
      await page.keyboard.press('Tab');
      await page.keyboard.type('Hello world');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Input with counter and badge keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@tag',
      '@badge',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_other_component_inside.tsx', 'en');

    await test.step('Verify focused input with text', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('Hello world');
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify focus return back to Input after keyboard interactions with Close button', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@button',
      '@base-components',
      '@button-link',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_the_clearing_ability.tsx', 'en');

    const addonButton = page.locator('[data-ui-name="Input.Addon"] button');
    await test.step('Verify focus return back to Input by Enter press on Close button', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).toBeFocused();

      await page.keyboard.type('Focus test');
      await addonButton.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await expect(locators.input(page)).not.toBeFocused();
      await expect(addonButton).toBeFocused();

      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toBeFocused();
      await expect(addonButton).toBeHidden();
      await expect(locators.input(page)).toHaveValue('');
    });

    await test.step('Verify focus return back to Input by Space press on Close button', async () => {
      await page.keyboard.type('Focus test');
      await addonButton.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await expect(locators.input(page)).not.toBeFocused();
      await expect(addonButton).toBeFocused();

      await page.keyboard.press('Space');

      await expect(locators.input(page)).toBeFocused();
      await expect(addonButton).toBeHidden();
      await expect(locators.input(page)).toHaveValue('');
    });
  });

  test('Verify Input with submit button keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@button',
      '@tooltip',
      '@base-components',
      '@button-link',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');
    await test.step('Verify focus return back to Input by Enter press on Submit button', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).toBeFocused();
      await expect(locators.input(page)).toHaveAttribute('type', 'text');

      await page.keyboard.type('Hello world');
      await expect(locators.input(page)).toHaveValue('Hello world');

      await page.keyboard.press('Tab');
      await expect(hintTrigger).toBeFocused();
      await page.getByText('Submit').waitFor({ state: 'visible' });

      await page.keyboard.press('Enter');

      await expect(locators.input(page)).toHaveValue('');
      await expect(locators.input(page)).toBeFocused();
      await expect(hintTrigger).toBeHidden();
    });

    await test.step('Verify focus return back to Input by Space press on Submit button', async () => {
      await page.keyboard.type('Hello world');
      await expect(locators.input(page)).toHaveValue('Hello world');

      await page.keyboard.press('Tab');
      await expect(hintTrigger).toBeFocused();
      await page.getByText('Submit').waitFor({ state: 'visible' });
      await page.keyboard.press('Space');

      await expect(locators.input(page)).toHaveValue('');
      await expect(locators.input(page)).toBeFocused();
      await expect(hintTrigger).toBeHidden();
    });
  });

  test('Verify Input with submit button mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input',
      '@button',
      '@tooltip',
      '@base-components',
      '@button-link',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');

    await test.step('Verify Submit button appears after typing', async () => {
      await locators.input(page).click();
      await expect(locators.input(page)).toBeFocused();
      await page.keyboard.type('Hello world');
      await expect(locators.input(page)).toHaveValue('Hello world');
      await expect(hintTrigger).toBeVisible();
    });

    await test.step('Verify hint on Submit hover keeps the value', async () => {
      await hintTrigger.hover();
      await page.getByText('Submit').waitFor({ state: 'visible' });
      await expect(locators.input(page)).toHaveValue('Hello world');
    });

    await test.step('Verify Submit click clears the value and focuses input', async () => {
      await hintTrigger.click();
      await expect(locators.input(page)).toHaveValue('');
      await expect(locators.input(page)).toBeFocused();
      await expect(hintTrigger).toBeHidden();
    });
  });

  test('Verify password input keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@button',
      '@tooltip',
      '@base-components',
      '@button-link',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/password_input.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');

    await test.step('Verify input focused by Tab and its attributes', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).toBeFocused();
      await expect(hintTrigger).toBeVisible();
      await expect(hintTrigger).not.toBeFocused();
      await expect(locators.input(page)).toHaveAttribute('autocomplete', 'current-password');
      await expect(locators.input(page)).toHaveAttribute('value', 'I_like_cats');
    });

    await test.step('Verify value can be cleared and typed', async () => {
      await page.keyboard.press('Backspace');
      await expect(locators.input(page)).toHaveValue('');
      await page.keyboard.type('Hello world');
      await expect(locators.input(page)).toHaveValue('Hello world');
    });

    await test.step('Verify Show password toggles by Enter', async () => {
      await page.keyboard.press('Tab');
      await expect(hintTrigger).toBeFocused();
      await page.getByText('Show password').waitFor({ state: 'visible' });
      await page.keyboard.down('Enter');
      await expect(locators.input(page)).toHaveValue('Hello world');
      await page.getByText('Hide password').waitFor({ state: 'visible' });
      await expect(hintTrigger).toBeVisible();
    });

    await test.step('Verify Shift+Tab returns focus to input', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.input(page)).toBeFocused();
    });
  });

  test('Verify password input mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input',
      '@button',
      '@tooltip',
      '@base-components',
      '@button-link',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/password_input.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');

    await test.step('Verify initial attributes', async () => {
      await expect(hintTrigger).toBeVisible();
      await expect(locators.input(page)).toHaveAttribute('autocomplete', 'current-password');
      await expect(locators.input(page)).toHaveAttribute('value', 'I_like_cats');
    });

    await test.step('Verify Show password hint on hover', async () => {
      await hintTrigger.hover();
      await page.getByText('Show password').waitFor({ state: 'visible' });
      await expect(locators.input(page)).not.toBeFocused();
      await expect(hintTrigger).not.toBeFocused();
    });

    await test.step('Verify click toggles password and focuses input', async () => {
      await hintTrigger.click();
      await expect(locators.input(page)).toHaveValue('I_like_cats');
      await page.getByText('Hide password').waitFor({ state: 'visible' });
      await expect(locators.input(page)).toBeFocused();
      await expect(hintTrigger).not.toBeFocused();
    });

    await test.step('Verify click on input keeps the value', async () => {
      await locators.input(page).click();
      await expect(locators.input(page)).toHaveValue('I_like_cats');
      await expect(locators.input(page)).toBeFocused();
      await expect(hintTrigger).not.toBeFocused();
    });
  });

  test('Verify Input Text addon mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_text_addon.tsx', 'en');

    await test.step('Verify input focused by click on the addon', async () => {
      await locators.addon(page).first().click();
      await expect(locators.input(page).first()).toBeFocused();
      await expect(locators.addon(page).first()).not.toBeFocused();
      await page.keyboard.type('Hello world');
    });

    await test.step('Verify second input focused by click on it', async () => {
      await locators.input(page).nth(1).click();
      await expect(locators.input(page).first()).not.toBeFocused();
      await expect(locators.input(page).nth(1)).toBeFocused();
      await expect(locators.addon(page).nth(1)).not.toBeFocused();
    });
  });

  test('Verify Input with counter and badge mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input',
      '@tag',
      '@badge',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_other_component_inside.tsx', 'en');

    await test.step('Verify input focused by click on the addon', async () => {
      await locators.addon(page).first().click();
      await expect(locators.input(page).first()).toBeFocused();
      await expect(locators.addon(page).first()).not.toBeFocused();
      await page.keyboard.type('Hello world');
    });

    await test.step('Verify second input focused by click on it', async () => {
      await locators.input(page).nth(1).click();
      await expect(locators.input(page).first()).not.toBeFocused();
      await expect(locators.input(page).nth(1)).toBeFocused();
      await expect(locators.addon(page).nth(1)).not.toBeFocused();
    });
  });

  test('Verify Input multiple addon focus order', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@button',
      '@tooltip',
      '@link',
      '@base-components',
      '@button-link',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_multiple_addons.tsx', 'en');

    const hintTrigger = locators.addon(page).locator('button');
    const link = page.locator('[data-ui-name="Link"]');

    await test.step('Verify input focused first', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).toBeFocused();
      await expect(hintTrigger).not.toBeFocused();
      await expect(link).not.toBeFocused();
    });

    await test.step('Verify link focused next', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).not.toBeFocused();
      await expect(link).toBeFocused();
      await expect(hintTrigger).not.toBeFocused();
    });

    await test.step('Verify addon button focused last', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).not.toBeFocused();
      await expect(link).not.toBeFocused();
      await expect(hintTrigger).toBeFocused();
    });

    await test.step('Verify Shift+Tab returns focus to link', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.input(page)).not.toBeFocused();
      await expect(link).toBeFocused();
      await expect(hintTrigger).not.toBeFocused();
    });
  });
});
