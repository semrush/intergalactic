import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  checkboxText: (page: Page) =>
    page.locator('[data-ui-name="Checkbox.Text"]'),
  checkboxValue: (page: Page) => page.locator('[data-ui-name="Checkbox.Value"]'),
  valueCheckmark: (page: Page) => page.locator('[data-ui-name="Value.CheckMark"]'),
  checkbox: (page: Page) => page.locator('[data-ui-name="Checkbox"]'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variables = [

    { size: 'm', state: 'normal', theme: undefined, color: undefined, checked: false, disabled: false, indeterminate: false },
    { size: 'm', state: 'invalid', theme: undefined, color: undefined, checked: false, disabled: false, indeterminate: false },
    { size: 'm', state: 'normal', theme: 'pink', color: undefined, checked: false, disabled: false, indeterminate: false },
    { size: 'm', state: 'normal', theme: undefined, color: 'violet', checked: false, disabled: false, indeterminate: false },

    { size: 'l', state: 'normal', theme: undefined, color: undefined, checked: false, disabled: false, indeterminate: false },
    { size: 'l', state: 'invalid', theme: undefined, color: undefined, checked: false, disabled: false, indeterminate: false },
    { size: 'l', state: 'normal', theme: 'pink', color: undefined, checked: false, disabled: false, indeterminate: false },
    { size: 'l', state: 'normal', theme: undefined, color: 'violet', checked: false, disabled: false, indeterminate: false },

    // checked
    { size: 'm', state: 'normal', theme: undefined, color: undefined, checked: true, disabled: false, indeterminate: false },
    { size: 'l', state: 'invalid', theme: undefined, color: undefined, checked: true, disabled: false, indeterminate: false },
    { size: 'm', state: 'normal', theme: 'pink', color: undefined, checked: true, disabled: false, indeterminate: false },
    { size: 'l', state: 'normal', theme: undefined, color: 'violet', checked: true, disabled: false, indeterminate: false },

    // disabled
    { size: 'm', state: 'normal', theme: undefined, color: undefined, checked: true, disabled: true, indeterminate: false },
    { size: 'l', state: 'invalid', theme: undefined, color: undefined, checked: true, disabled: true, indeterminate: false },
    { size: 'm', state: 'normal', theme: 'pink', color: undefined, checked: true, disabled: true, indeterminate: false },
    { size: 'l', state: 'normal', theme: undefined, color: 'violet', checked: true, disabled: true, indeterminate: false },

    // indeterminate
    { size: 'm', state: 'normal', theme: undefined, color: undefined, checked: false, disabled: true, indeterminate: true },
    { size: 'l', state: 'invalid', theme: undefined, color: undefined, checked: false, disabled: true, indeterminate: true },
    { size: 'm', state: 'normal', theme: 'pink', color: undefined, checked: false, disabled: false, indeterminate: true },
    { size: 'l', state: 'normal', theme: undefined, color: 'violet', checked: false, disabled: false, indeterminate: true },

  ];

  variables.forEach((item) => {
    test(`Verify size=${item.size} state=${item.state} theme=${item.theme} color=${item.color} disabled=${item.disabled} checked=${item.checked} indeterminate=${item.indeterminate}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@checkbox', '@base-components', '@flex-box', '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/checkbox/tests/examples/states.tsx', 'en', item);

      // verify L checkbox styles
      if (item.size == 'l') {
        await expect(locators.valueCheckmark(page)).toHaveCSS(
          'height',
          '20px',
        );
        await expect(locators.valueCheckmark(page)).toHaveCSS(
          'width',
          '20px',
        );
        await expect(locators.checkboxText(page)).toHaveCSS(
          'margin-left',
          '8px',
        );
        await expect(locators.checkboxText(page)).toHaveCSS(
          'font-size',
          '16px',
        );
      } else { // verify M checkbox styles
        await expect(locators.valueCheckmark(page)).toHaveCSS(
          'height',
          '16px',
        );
        await expect(locators.valueCheckmark(page)).toHaveCSS(
          'width',
          '16px',
        );
        await expect(locators.checkboxText(page)).toHaveCSS(
          'margin-left',
          '6px',
        );
        await expect(locators.checkboxText(page)).toHaveCSS(
          'font-size',
          '14px',
        );
      }
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-test-id="checkbox"]')).toHaveScreenshot();
    });
  });

  test('Verify checkbox group styles', {
    tag: [TAG.PRIORITY_HIGH,
      '@checkbox', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/tests/examples/groups.tsx', 'en');

    const m = page.locator('[data-testid="m"]');
    const l = page.locator('[data-testid="l"]');
    await test.step('Verify m group checkbox margins', async () => {
      await expect(m.locator('[data-ui-name="Checkbox"]').nth(2)).toHaveCSS(
        'margin-bottom',
        '12px',
      );
    });

    await test.step('Verify l group checkbox margins', async () => {
      await expect(l.locator('[data-ui-name="Checkbox"]').nth(2)).toHaveCSS(
        'margin-bottom',
        '12px',
      );
    });
  });

  test('Verify Partial selection mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@checkbox', '@base-components', '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/partial_selection.tsx', 'en');

    const checkboxText = page.locator('[data-ui-name="Checkbox.Text"]');
    const valueCheckmark = page.locator('[data-ui-name="Value.CheckMark"]');

    await test.step('Verify indeterminate state', async () => {
      await valueCheckmark.first().click();
      await checkboxText.nth(2).click();

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Partial selection keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@checkbox', '@base-components', '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/partial_selection.tsx', 'en');

    await test.step('Verify group gets indeterminate when one item checked', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Checkbox with onther elements keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@checkbox',
      '@link',
      '@tooltip', '@base-components', '@flex-box', '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/checkbox_with_other_components.tsx', 'en');

    await test.step('Verify Focusable element focused after checkbox', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    });

    await test.step('Verify interactions with Focusable element not check checkbox', async () => {
      await page.keyboard.press('Space');

      await page.keyboard.press('Escape');
    });

    await test.step('Verify focus on 2nd checkbox by tab', async () => {
      await page.keyboard.press('Tab');
    });

    await test.step('Verify focus on prev by shift+tab', async () => {
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify focus on element after 2nd checkbox', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify Checkbox group mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@checkbox', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify checkbox checked when clicking on label ', async () => {
      await locators.checkboxText(page).first().click();
      await expect(locators.checkbox(page).first()).toHaveClass(/checked/);
      await expect(locators.checkbox(page).first()).toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).first()).toHaveClass(/checked/);
    });

    await test.step('Verify checkbox checked when clicking on checkbox ', async () => {
      await locators.valueCheckmark(page).nth(1).click();
      await expect(locators.checkbox(page).first()).toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).first()).toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).first()).toHaveClass(/checked/);
      await expect(locators.checkbox(page).nth(1)).toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(1)).toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(1)).toHaveClass(/checked/);
    });

    await test.step('Verify checkbox unchecked when clicking on label ', async () => {
      await locators.checkboxText(page).first().click();
      await expect(locators.checkbox(page).first()).not.toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).first()).not.toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).first()).not.toHaveClass(/checked/);
      await expect(locators.checkbox(page).nth(1)).toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(1)).toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(1)).toHaveClass(/checked/);
    });

    await test.step('Verify checkbox unchecked when clicking on checkbox ', async () => {
      await locators.valueCheckmark(page).nth(1).click();
      await expect(locators.checkbox(page).first()).not.toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).first()).not.toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).first()).not.toHaveClass(/checked/);
      await expect(locators.checkbox(page).nth(1)).not.toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(1)).not.toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(1)).not.toHaveClass(/checked/);
    });
  });

  test('Verify Checkbox group keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@checkbox', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify focus on 1st checkbox by tab ', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.checkboxValue(page).first()).toBeFocused();
    });

    await test.step('Verify arrows dont move focus', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(locators.checkboxValue(page).first()).toBeFocused();

      await page.keyboard.press('ArrowLeft');
      await expect(locators.checkboxValue(page).first()).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(locators.checkboxValue(page).first()).toBeFocused();

      await page.keyboard.press('ArrowUp');

      await expect(locators.checkboxValue(page).first()).toBeFocused();
    });

    await test.step('Verify focus on 2nd checkbox by tab ', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.checkboxValue(page).nth(1)).toBeFocused();
    });

    await test.step('Verify checkbox checked when pressing Space ', async () => {
      await page.keyboard.press('Space');
      await expect(locators.checkbox(page).nth(1)).toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(1)).toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(1)).toHaveClass(/checked/);
    });

    await test.step('Verify No action by enter', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.checkbox(page).nth(1)).toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(1)).toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(1)).toHaveClass(/checked/);
    });

    await test.step('Verify checkbox unchecked when clicking Space', async () => {
      await page.keyboard.press('Space');
      await expect(locators.checkbox(page).nth(1)).not.toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(1)).not.toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(1)).not.toHaveClass(/checked/);
    });
  });

  test('Verify Partial selection mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@checkbox', '@base-components', '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/partial_selection.tsx', 'en');

    await test.step('Verify all checkboxes checked when clicking on group label', async () => {
      await locators.checkboxText(page).first().click();

      const count1 = await locators.checkboxText(page).count();
      for (let i = 0; i < count1; i++) {
        await expect(locators.checkbox(page).nth(i)).toHaveClass(/checked/);
        await expect(locators.checkboxValue(page).nth(i)).toHaveClass(/checked/);
        await expect(locators.valueCheckmark(page).nth(i)).toHaveClass(/checked/);
      }
    });

    await test.step('Verify all checkboxes unchecked when clicking on group label', async () => {
      await locators.valueCheckmark(page).first().click();

      const count1 = await locators.checkboxText(page).count();
      for (let i = 0; i < count1; i++) {
        await expect(locators.checkbox(page).nth(i)).not.toHaveClass(/checked/);
        await expect(locators.checkboxValue(page).nth(i)).not.toHaveClass(/checked/);
        await expect(locators.valueCheckmark(page).nth(i)).not.toHaveClass(/checked/);
      }
    });

    await test.step('Verify group gets indeterminate when one item checked', async () => {
      await locators.checkboxText(page).nth(2).click();

      await expect(locators.checkbox(page).nth(0)).toHaveClass(/indeterminate/);
      await expect(locators.checkboxValue(page).nth(0)).toHaveClass(/indeterminate/);
      await expect(locators.valueCheckmark(page).nth(0)).toHaveClass(/indeterminate/);

      await expect(locators.checkbox(page).nth(2)).toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(2)).toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(2)).toHaveClass(/checked/);
    });

    await test.step('Verify all checkboxes checked when clicking indeterminate on group label', async () => {
      await locators.valueCheckmark(page).first().click();

      const count1 = await locators.checkboxText(page).count();
      for (let i = 0; i < count1; i++) {
        await expect(locators.checkbox(page).nth(i)).toHaveClass(/checked/);
        await expect(locators.checkboxValue(page).nth(i)).toHaveClass(/checked/);
        await expect(locators.valueCheckmark(page).nth(i)).toHaveClass(/checked/);
      }
    });

    await test.step('Verify group gets indeterminate when one item unchecked', async () => {
      await locators.checkboxText(page).nth(2).click();

      await expect(locators.checkbox(page).nth(0)).toHaveClass(/indeterminate/);
      await expect(locators.checkboxValue(page).nth(0)).toHaveClass(/indeterminate/);
      await expect(locators.valueCheckmark(page).nth(0)).toHaveClass(/indeterminate/);

      await expect(locators.checkbox(page).nth(2)).not.toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(2)).not.toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(2)).not.toHaveClass(/checked/);
    });
  });

  test('Verify Partial selection keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@checkbox', '@base-components', '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/partial_selection.tsx', 'en');

    await test.step('Verify all checkboxes checked when pressing group', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      const count1 = await locators.checkboxText(page).count();
      for (let i = 0; i < count1; i++) {
        await expect(locators.checkbox(page).nth(i)).toHaveClass(/checked/);
        await expect(locators.checkboxValue(page).nth(i)).toHaveClass(/checked/);
        await expect(locators.valueCheckmark(page).nth(i)).toHaveClass(/checked/);
      }
    });

    await test.step('Verify all checkboxes unchecked when pressing group', async () => {
      await page.keyboard.press('Space');
      const count1 = await locators.checkboxText(page).count();
      for (let i = 0; i < count1; i++) {
        await expect(locators.checkbox(page).nth(i)).not.toHaveClass(/checked/);
        await expect(locators.checkboxValue(page).nth(i)).not.toHaveClass(/checked/);
        await expect(locators.valueCheckmark(page).nth(i)).not.toHaveClass(/checked/);
      }
    });

    await test.step('Verify group gets indeterminate when one item checked', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(locators.checkbox(page).nth(0)).toHaveClass(/indeterminate/);
      await expect(locators.checkboxValue(page).nth(0)).toHaveClass(/indeterminate/);
      await expect(locators.valueCheckmark(page).nth(0)).toHaveClass(/indeterminate/);

      await expect(locators.checkbox(page).nth(2)).toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(2)).toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(2)).toHaveClass(/checked/);
    });

    await test.step('Verify all checkboxes checked when clicking indeterminate on group label', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');

      const count1 = await locators.checkboxText(page).count();
      for (let i = 0; i < count1; i++) {
        await expect(locators.checkbox(page).nth(i)).toHaveClass(/checked/);
        await expect(locators.checkboxValue(page).nth(i)).toHaveClass(/checked/);
        await expect(locators.valueCheckmark(page).nth(i)).toHaveClass(/checked/);
      }
    });

    await test.step('Verify group gets indeterminate when one item unchecked', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(locators.checkbox(page).nth(0)).toHaveClass(/indeterminate/);
      await expect(locators.checkboxValue(page).nth(0)).toHaveClass(/indeterminate/);
      await expect(locators.valueCheckmark(page).nth(0)).toHaveClass(/indeterminate/);

      await expect(locators.checkbox(page).nth(1)).not.toHaveClass(/checked/);
      await expect(locators.checkboxValue(page).nth(1)).not.toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(1)).not.toHaveClass(/checked/);
    });
  });

  test('Verify Checkbox with onther elements keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@checkbox',
      '@link',
      '@tooltip', '@base-components', '@flex-box', '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/checkbox_with_other_components.tsx', 'en');

    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const link = page.locator('[data-ui-name="Link"]');

    await test.step('Verify Focusable element focused after checkbox', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.checkboxValue(page).first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.checkboxValue(page).first()).not.toBeFocused();
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Verify interactions with Focusable element not check checkbox', async () => {
      await page.keyboard.press('Space');
      await expect(locators.checkboxValue(page).first()).not.toBeFocused();

      await page.keyboard.press('Escape');
      await expect(locators.checkboxValue(page).first()).not.toBeFocused();
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Verify focus on 2nd checkbox by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.checkboxValue(page).nth(1)).toBeFocused();
    });

    await test.step('Verify focus on prev by shift+tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.checkboxValue(page).nth(1)).not.toBeFocused();
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Verify focus on element after 2nd checkbox', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.checkboxValue(page).nth(1)).not.toBeFocused();
      await expect(link).toBeFocused();
    });
  });

  test('Verify Checkbox with onther elements mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@checkbox',
      '@link',
      '@tooltip', '@base-components', '@flex-box', '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/checkbox_with_other_components.tsx', 'en');

    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');

    await test.step('Verify clicking on Focusable element not activate checkbox', async () => {
      await descriptionTooltipTrigger.click();

      const count1 = await locators.checkboxText(page).count();
      for (let i = 0; i < count1; i++) {
        await expect(locators.checkbox(page).nth(i)).not.toHaveClass(/checked/);
        await expect(locators.checkboxValue(page).nth(i)).not.toHaveClass(/checked/);
        await expect(locators.valueCheckmark(page).nth(i)).not.toHaveClass(/checked/);
      }
    });

    await test.step('Verify clicking on label checks checkbox', async () => {
      await page.locator('label:has-text("Option 2")').click();

      await expect(locators.checkbox(page).nth(1)).not.toHaveClass(/checked/);

      await expect(locators.checkboxValue(page).nth(1)).toHaveClass(/checked/);
      await expect(locators.valueCheckmark(page).nth(1)).toHaveClass(/checked/);
    });
  });
});
