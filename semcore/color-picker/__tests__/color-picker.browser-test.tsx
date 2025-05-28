import { expect, test, Locator, Page } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

export async function expectAttributes(
  locator: Locator,
  attributes: Record<string, string | RegExp>,
) {
  for (const [name, value] of Object.entries(attributes)) {
    await expect(locator).toHaveAttribute(name, value);
  }
}

test.describe('Color-picker', () => {
  function getColorPickerLocators(page: any) {
    return {
      trigger: page.locator('[data-ui-name="ColorPicker.Trigger"]'),
      popper: page.locator('[data-ui-name="ColorPicker.Popper"]'),
      colors: page.locator('[data-ui-name="ColorPicker.Colors"]'),
      divider: page.locator('[data-ui-name="Divider"]'),
      palette: page.locator('[data-ui-name="PaletteManager.Colors"]'),
      inputColor: page.locator('[data-ui-name="PaletteManager.InputColor"]'),
      addColor: page.locator('[data-ui-name="Input.Addon"]').first(),
      clearColor: page.locator('[data-ui-name="Input.Addon"]').nth(1),
      addButton: page.getByRole('button'),
      colorItems: page.locator('[data-ui-name="ColorPicker.Item"]'),
      paletteItem: page.locator('[data-ui-name="PaletteManager.Item"]'),
    };
  }

  test('Roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/color-picker/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    await test.step('Verify trigger attributes when popper not expanded', async () => {
      await expectAttributes(locators.trigger, {
        'aria-expanded': 'false',
        'aria-label': 'Color field',
        'aria-haspopup': 'dialog',
        role: 'combobox',
      });
      await expect(locators.trigger).not.toHaveAttribute('aria-controls', /popper/);
    });

    await test.step('Verify trigger attributes when popper expanded', async () => {
      await locators.trigger.click();
      await expectAttributes(locators.trigger, {
        'aria-expanded': 'true',
        'aria-label': 'Color field',
        'aria-haspopup': 'dialog',
        role: 'combobox',
      });
      await expect(locators.trigger).toHaveAttribute('aria-controls', /popper/);
    });

    await test.step('Verify popper attributes', async () => {
      await expect(locators.popper).toBeVisible();
      await expectAttributes(locators.popper, {
        'aria-label': 'Colors palette',
        role: 'dialog',
      });
    });

    await test.step('Verify preset colors attributes', async () => {
      await expectAttributes(locators.colors, {
        'aria-label': 'Preset colors',
        role: 'listbox',
        'aria-orientation': 'horizontal',
      });
    });

    await test.step('Verify colors list attributes', async () => {
      const items = page.locator('[data-ui-name="ColorPicker.Item"]');
      await expectAttributes(items.first(), {
        'aria-selected': 'true',
        'aria-label': 'Clear color',
      });
      const svg = items.first().locator('svg');
      await expect(svg).toHaveCount(1);

      for (const item of await items.all()) {
        await expectAttributes(item, {
          role: 'option',
        });
      }
    });

    await test.step('Verify divider attributes', async () => {
      await expectAttributes(locators.divider, {
        role: 'separator',
        'aria-orientation': 'horizontal',
      });
    });

    await test.step('Verify palette manager attributes', async () => {
      await expectAttributes(locators.palette, {
        role: 'listbox',
        'aria-orientation': 'horizontal',
        'aria-label': 'Custom preset colors',
      });
    });

    await test.step('Verify input attributes', async () => {
      await expect(locators.addButton).toHaveAttribute('aria-label', 'Add color');

      const addButtonSvg = locators.addButton.locator('svg');
      await expectAttributes(addButtonSvg, {
        tabindex: '-1',
        'aria-hidden': 'true',
      });

      await expectAttributes(locators.inputColor, {
        'aria-invalid': 'false',
        'aria-label': 'Custom color, HEX format',
      });

      await expectAttributes(locators.addColor, {
        'aria-hidden': 'true',
        'aria-label': 'Add color to the list of custom colors',
        role: 'button',
      });

      const addSvg = locators.addColor.locator('svg');
      await expectAttributes(addSvg, {
        tabindex: '-1',
        'aria-hidden': 'true',
      });

      await expectAttributes(locators.clearColor, {
        'aria-hidden': 'true',
        'aria-label': 'Clear custom color field',
        role: 'button',
      });

      const clearSvg = locators.clearColor.locator('svg');
      await expectAttributes(clearSvg, {
        tabindex: '-1',
        'aria-hidden': 'true',
      });
    });

    await test.step('Verify palette item attributes', async () => {
      await locators.inputColor.fill('000');
      await locators.addColor.click();

      const paletteItem = page.locator('[data-ui-name="PaletteManager.Item"]');
      await expect(paletteItem).toHaveCount(1);

      await expectAttributes(paletteItem, {
        'aria-label': '#000',
        'aria-selected': 'false',
        role: 'option',
      });

      await paletteItem.click();
      await locators.trigger.click();
      await locators.inputColor.fill('000');
      await locators.addColor.click();

      await expect(paletteItem).toHaveAttribute('aria-selected', 'true');

      await locators.inputColor.fill('vdnsjkv');

      await expectAttributes(locators.inputColor, {
        'aria-invalid': 'true',
        'aria-label': 'Custom color, HEX format',
      });

      const paletteClose = paletteItem.locator('svg');
      await expectAttributes(paletteClose, {
        tabindex: '-1',
        'aria-hidden': 'true',
      });
    });
  });

  test('Styles', async ({ page }) => {
    const standPath = 'stories/components/color-picker/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    const getComputedStyles = (locator: any, props: string[]) =>
      locator.evaluate((el: any, props: any) => {
        const computed = window.getComputedStyle(el);
        return props.reduce((acc: any, prop: any) => {
          acc[prop] = computed[prop as keyof CSSStyleDeclaration];
          return acc;
        }, {});
      }, props);

    await test.step('Verify trigger styles', async () => {
      const triggerCircle = page.locator('[data-ui-name="Box"][class*="TriggerCircle"]');
      const triggerBox = await triggerCircle.boundingBox();
      expect(triggerBox).not.toBeNull();
      if (triggerBox) {
        expect(triggerBox.width).toBe(18);
        expect(triggerBox.height).toBe(18);
      }
    });

    await locators.trigger.click();

    await test.step('Verify popper styles', async () => {
      const paddings = await getComputedStyles(locators.popper, [
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
      ]);
      expect(paddings).toEqual({
        paddingTop: '16px',
        paddingRight: '16px',
        paddingBottom: '16px',
        paddingLeft: '16px',
      });
    });

    await test.step('Verify color items styles', async () => {
      const items = page.locator('[data-ui-name="ColorPicker.Item"]');
      const firstSvg = items.first().locator('svg');
      await expect(firstSvg).toHaveCount(1);
      await expect(firstSvg).toHaveAttribute('width', '17');
      await expect(firstSvg).toHaveAttribute('height', '17');

      const count = await items.count();
      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        const box = await item.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
          expect(Math.round(box.width)).toBeGreaterThanOrEqual(26);
          expect(Math.round(box.height)).toBeGreaterThanOrEqual(26);
        }
      }

      const gap = await locators.colors.evaluate((node: any) => window.getComputedStyle(node).gap);
      expect(gap).toBe('4px');
    });

    await test.step('Verify divider styles', async () => {
      const dividerStyles = await getComputedStyles(locators.divider, [
        'marginTop',
        'marginBottom',
      ]);
      expect(dividerStyles.marginTop).toBe('12px');
      expect(dividerStyles.marginBottom).toBe('12px');
    });

    await test.step('Verify input styles', async () => {
      const wrapperStyles = await getComputedStyles(page.locator('[data-ui-name="Input"]'), [
        'width',
        'marginLeft',
      ]);
      expect(wrapperStyles.width).toBe('135px');
      expect(wrapperStyles.marginLeft).toBe('4px');
    });

    await test.step('Verify add color styles', async () => {
      await expect(locators.addColor).toHaveAttribute('aria-hidden', 'true');
      await expect(locators.addColor).toBeHidden();
      const confirmStyles = await getComputedStyles(locators.addColor, ['paddingRight']);
      expect(confirmStyles.paddingRight).toBe('4px');

      const confirmIcon = locators.addColor.locator('[data-ui-name="Check"]');
      await expect(confirmIcon).toHaveAttribute('width', '16');
      await expect(confirmIcon).toHaveAttribute('height', '16');
    });

    await test.step('Verify clear color styles', async () => {
      const clearStyles = await getComputedStyles(locators.clearColor, ['paddingLeft']);
      expect(clearStyles.paddingLeft).toBe('4px');

      const clearIcon = locators.clearColor.locator('[data-ui-name="Close"]');
      await expect(clearIcon).toHaveAttribute('width', '16');
      await expect(clearIcon).toHaveAttribute('height', '16');
    });

    await test.step('Verify palette manager color styles', async () => {
      await locators.inputColor.fill('000');
      await locators.addColor.click();

      const paletteItem = page.locator('[data-ui-name="PaletteManager.Item"]');
      const paletteBox = await paletteItem.boundingBox();
      expect(paletteBox).not.toBeNull();
      if (paletteBox) {
        expect(paletteBox.width).toBe(28);
        expect(paletteBox.height).toBe(28);
      }

      const paletteIcon = paletteItem.locator('svg');
      await expect(paletteIcon).toHaveAttribute('width', '16');
      await expect(paletteIcon).toHaveAttribute('height', '16');

      const itemColorBox = page.locator('[data-ui-name="Box"][class*="ItemColor"]');
      const itemColorBoxBounding = await itemColorBox.boundingBox();
      expect(itemColorBoxBounding).not.toBeNull();
      if (itemColorBoxBounding) {
        expect(itemColorBoxBounding.width).toBeLessThanOrEqual(22);
        expect(itemColorBoxBounding.height).toBeLessThanOrEqual(22);
      }
    });
  });

  test('Default item states for active and background colors', async ({ page }) => {
    const standPath = 'stories/components/color-picker/tests/examples/label-and-color-expanded.tsx';

    const htmlContent = await e2eStandToHtml(standPath, 'en');
    const locators = getColorPickerLocators(page);
    await page.setContent(htmlContent);

    await new Promise((resolve) => setTimeout(resolve, 500));
    await test.step('Verify normal and active for background and text color', async () => {
      await expect(page).toHaveScreenshot();
    });
    const colorPoppers = page.getByRole('dialog');

    await test.step('Verify hover on No background color ', async () => {
      const items = colorPoppers.first().getByRole('option');
      await items.first().hover();
      await new Promise((resolve) => setTimeout(resolve, 300));
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover on text color ', async () => {
      const items = colorPoppers.nth(1).getByRole('option');
      await items.nth(2).hover();
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover on Add color button ', async () => {
      await locators.addButton.first().hover();
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(page).toHaveScreenshot();
    });
  });

  test('Custom colors states ', async ({ page }) => {
    const standPath = 'stories/components/color-picker/docs/examples/predefined_palette.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    await expect(locators.trigger.first()).toHaveAttribute(
      'aria-label',
      'Color field, current color is #98848D',
    );

    await locators.trigger.first().click();

    const colorCustom = page.locator('[data-ui-name="PaletteManager.Item"]');

    await test.step('Verify hover state for Palette custom color', async () => {
      await colorCustom.first().hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify active state of Palette custom color ', async () => {
      await colorCustom.first().click();
      await expect(locators.trigger.first()).toHaveAttribute(
        'aria-label',
        'Color field, current color is #8649E6',
      );

      await locators.trigger.first().click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify mouse navigation when No palette', async ({ page }) => {
    const standPath = 'stories/components/color-picker/tests/examples/base-no-palette-manager.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    const trigger = page.getByRole('combobox').first();
    await trigger.click();

    await expect(trigger).toHaveAttribute('aria-label', 'Color field');

    await expect(locators.popper).toBeVisible();
    await trigger.click();
    await expect(locators.popper).not.toBeVisible();
    await expect(trigger).toHaveAttribute('aria-label', 'Color field');

    const colorItems = page.locator('[data-ui-name="ColorPicker.Item"]');
    await trigger.click();
    await colorItems.nth(4).click();
    await expect(locators.popper).not.toBeVisible();
    await expect(trigger).toHaveAttribute('aria-label', 'Color field, current color is #F67CF2');

    await trigger.click();
    await colorItems.first().click();
    await expect(locators.popper).not.toBeVisible();
    await expect(trigger).toHaveAttribute('aria-label', 'Color field');

    await trigger.click();

    await page.keyboard.press('Escape');
    await expect(locators.popper).not.toBeVisible();
    await expect(trigger).toHaveAttribute('aria-label', 'Color field');
    await expect(trigger).toBeFocused();
  });

  test('Verify Keyboard navigation when No palette', async ({ page }) => {
    const standPath = 'stories/components/color-picker/tests/examples/base-no-palette-manager.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    await page.keyboard.press('Tab');
    await locators.trigger.hover();
    await expect(locators.trigger).toBeFocused();
    await expect(page).toHaveScreenshot();

    await expect(locators.trigger).toHaveAttribute('aria-label', 'Color field');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);

    await expect(locators.popper).toBeVisible();
    await expect(locators.popper).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(locators.popper).not.toBeVisible();
    await expect(locators.trigger).toHaveAttribute('aria-label', 'Color field');

    await page.keyboard.press('Space');
    await page.waitForTimeout(100);
    const colorItems = page.locator('[data-ui-name="ColorPicker.Item"]');
    await page.keyboard.press('Tab');
    await colorItems.first().hover();
    await expect(colorItems.first()).toBeFocused();

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');
    await expect(locators.popper).not.toBeVisible();
    await expect(locators.trigger).toHaveAttribute('aria-label', 'Color field');

    await page.keyboard.press('Space');
    await page.waitForTimeout(100);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Space');
    await expect(locators.trigger).toHaveAttribute(
      'aria-label',
      'Color field, current color is #F67CF2',
    );

    await page.keyboard.press('Space');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await page.keyboard.press('Escape');
    await expect(locators.popper).toBeVisible();
    await page.waitForTimeout(100);
    await page.keyboard.press('Escape');
    await expect(locators.popper).not.toBeVisible();
    await page.keyboard.press('Space');
    await locators.trigger.click();
    await expect(locators.popper).not.toBeVisible();
  });

  test('Verify mouse navigation when palette manager presents', async ({ page }) => {
    const standPath = 'stories/components/color-picker/docs/examples/palettemanager.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    const trigger = page.getByRole('combobox').first();
    await trigger.click();

    await expect(trigger).toHaveAttribute('aria-label', 'Color field');

    await expect(locators.popper).toBeVisible();

    //verify input focused by click on add
    await locators.addButton.click();

    await expect(locators.inputColor).toBeFocused();

    //input validation
    await locators.inputColor.fill('++');
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot();

    await expect(locators.addColor).toBeVisible();
    await expect(locators.clearColor).toBeVisible();

    await locators.addColor.click();
    await expect(locators.popper).toBeVisible();
    await expect(locators.inputColor).toBeFocused();

    await expect(locators.palette).toBeEmpty();

    await locators.clearColor.click();
    await expect(locators.popper).toBeVisible();
    await expect(locators.inputColor).toBeFocused();
    await expect(locators.palette).toBeEmpty();

    await expect(locators.inputColor).toHaveAttribute('aria-invalid', 'true');

    await expect(locators.inputColor).toBeEmpty();

    await locators.inputColor.fill('999');
    await page.waitForTimeout(300);
    await expect(locators.inputColor).toHaveAttribute('aria-invalid', 'false');
    await locators.addColor.click();
    await expect(locators.palette).not.toBeEmpty();
    await expect(locators.palette.locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(1);
    await expect(locators.inputColor).toBeEmpty();

    await locators.inputColor.fill('666');
    await locators.addColor.click();
    await expect(locators.palette.locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(2);

    await page.locator('[data-name="Close"]').nth(1).click();
    await expect(locators.palette.locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(1);

    await locators.palette.locator('[data-ui-name="PaletteManager.Item"]').click();

    await expect(locators.popper).not.toBeVisible();
    await page.waitForTimeout(200);
    await expect(locators.trigger).toHaveAttribute('value', '#999');
  });

  test('Verify keyboard navigation when palette manager presents', async ({ page }) => {
    const standPath = 'stories/components/color-picker/docs/examples/palettemanager.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const items = page.locator('[data-ui-name="ColorPicker.Item"]');
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
      await expect(items.nth(i)).toBeFocused();
    }

    await page.keyboard.press('Tab');

    await expect(locators.inputColor).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(locators.popper).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(locators.inputColor).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.inputColor).toBeFocused();

    await locators.inputColor.fill('666');
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter');
    await expect(locators.inputColor).toHaveAttribute('aria-invalid', 'false');
    await expect(locators.palette).not.toBeEmpty();
    await expect(locators.palette.locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(1);
    await expect(locators.inputColor).toBeEmpty();

    await locators.inputColor.fill('111');
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter');
    await locators.addColor.click();
    await expect(locators.palette.locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(2);

    await locators.inputColor.fill('++');
    await page.waitForTimeout(200);
    await expect(locators.inputColor).toHaveAttribute('aria-invalid', 'true');

    await expect(locators.addColor).toBeVisible();
    await expect(locators.clearColor).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(locators.inputColor).toBeFocused();
    await expect(locators.palette.locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(2);

    await expect(locators.inputColor).toBeFocused();

    await expect(locators.inputColor).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(page).toHaveScreenshot();
    await expect(locators.inputColor).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');

    await expect(locators.popper).not.toBeVisible();
    await page.waitForTimeout(100);
    await expect(locators.trigger).toHaveAttribute('value', '#111');
  });

  test('Verify ColorPicker.Colors props', async ({ page }) => {
    const standPath = 'stories/components/color-picker/tests/examples/color-picker-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const colorItem = page.getByRole('option', { name: '#008000' });

    await colorItem.click();

    await locators.trigger.click();

    await expect(page).toHaveScreenshot();
  });

  test('Verify Colors and Palette.Manager props', async ({ page }) => {
    const standPath =
      'stories/components/color-picker/tests/examples/colors-and-palette-manager-colors-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    await test.step('Verify paletter manager when colors defaultColors and onColorsChange pre set', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      const colorItems = page.locator(
        '[data-ui-name="ColorPicker.Colors"] [data-ui-name="ColorPicker.Item"]',
      );
      await expect(colorItems).toHaveCount(7);

      const expectedColors = [
        'Clear color',
        '#8649E1',
        '#FF5733',
        '#27D3E7',
        '#2D747C',
        '#6ad0de',
        '#6E2D7C',
      ];

      for (let i = 0; i < expectedColors.length; i++) {
        await expect(colorItems.nth(i)).toHaveAttribute('aria-label', expectedColors[i]);
      }

      const expectedPaletteColors = ['#8649E6', '#8649E7', '#8649E8'];

      const paletteItems = page.locator(
        '[data-ui-name="PaletteManager.Colors"] [data-ui-name="PaletteManager.Item"]',
      );
      await expect(paletteItems).toHaveCount(3);

      for (let i = 0; i < expectedPaletteColors.length; i++) {
        await expect(paletteItems.nth(i)).toHaveAttribute('aria-label', expectedPaletteColors[i]);
      }

      await paletteItems.nth(1).locator('[data-name="Close"]').click();
      await expect(paletteItems).toHaveCount(2);

      await locators.inputColor.fill('888');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(paletteItems).toHaveCount(3);

      await paletteItems.nth(2).click();
      await page.waitForTimeout(100);

      await locators.trigger.first().click();
      await page.waitForTimeout(100);

      await expect(paletteItems.nth(2)).toHaveAttribute('aria-selected', 'true');
      await locators.trigger.first().click();
      await page.waitForTimeout(100);
    });

    await test.step('Verify paletter manager when defaultColors and onColorsChange pre set', async () => {
      await locators.trigger.nth(1).click();

      const colorItems = page.locator(
        '[data-ui-name="ColorPicker.Colors"] [data-ui-name="ColorPicker.Item"]',
      );
      await expect(colorItems).toHaveCount(10);

      const expectedColors = [
        'Clear color',
        '#8649E1',
        '#FF5733',
        '#98848D',
        '#8E3B29',
        '#B0E727',
        '#27D3E7',
        '#2D747C',
        '#6ad0de',
        '#6E2D7C',
      ];

      for (let i = 0; i < expectedColors.length; i++) {
        await expect(colorItems.nth(i)).toHaveAttribute('aria-label', expectedColors[i]);
      }

      const expectedPaletteColors = ['#00FF00', '#0000FF'];

      const paletteItems = page.locator(
        '[data-ui-name="PaletteManager.Colors"] [data-ui-name="PaletteManager.Item"]',
      );
      await expect(paletteItems).toHaveCount(2);

      for (let i = 0; i < expectedPaletteColors.length; i++) {
        await expect(paletteItems.nth(i)).toHaveAttribute('aria-label', expectedPaletteColors[i]);
      }

      await paletteItems.nth(1).locator('[data-name="Close"]').click();
      await expect(paletteItems).toHaveCount(1);

      await locators.inputColor.fill('888');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(paletteItems).toHaveCount(2);

      await paletteItems.nth(1).click();
      await page.waitForTimeout(100);
      await locators.trigger.nth(1).click();
      await page.waitForTimeout(100);
      await expect(paletteItems.nth(1)).toHaveAttribute('aria-selected', 'true');
    });
  });

  test('Verify ColorPicker.Item PaletteManager.Item and ColorPicker.Input props', async ({
    page,
  }) => {
    const standPath =
      'stories/components/color-picker/tests/examples/input-color-and-items-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    const colorItems = page.locator(
      '[data-ui-name="ColorPicker.Colors"] [data-ui-name="ColorPicker.Item"]',
    );
    await colorItems.nth(3).hover();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();

    const paletteNonEditableItems = page
      .locator('[data-ui-name="PaletteManager.Colors"]')
      .first()
      .locator('[data-ui-name="PaletteManager.Item"]');
    await paletteNonEditableItems.nth(1).hover();
    await expect(paletteNonEditableItems).toHaveCount(3);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();

    locators.inputColor.first().click();
    locators.addColor.first().click();
    await expect(paletteNonEditableItems).toHaveCount(4);
    await paletteNonEditableItems.nth(3).click();
    await expect(locators.popper).not.toBeVisible();
    await page.waitForTimeout(100);
    locators.trigger.first().click();
    await expect(paletteNonEditableItems.nth(3)).toHaveAttribute('aria-selected', 'true');
  });

  test('Verify trigger variations and mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/color-picker/tests/examples/triggers.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    await test.step('Verify mouse interaction with tag trigger', async () => {
      locators.trigger.first().click();
      await expect(locators.popper).toBeVisible();
      locators.trigger.first().click();
      await expect(locators.popper).not.toBeVisible();
      await page.locator('[data-ui-name="Input.Value"]').click();
      await expect(locators.popper).not.toBeVisible();
    });

    await test.step('Verify mouse interaction with button trigger', async () => {
      locators.trigger.nth(1).click();
      await expect(locators.popper).toBeVisible();
      locators.trigger.nth(1).click();
      await expect(locators.popper).not.toBeVisible();
    });
  });

  test('Verify trigger variations and keyboards interactions', async ({ page }) => {
    const standPath = 'stories/components/color-picker/tests/examples/triggers.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const locators = getColorPickerLocators(page);

    await test.step('Verify keyboard interaction with tag trigger', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.trigger.first()).toBeFocused();
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Enter');
      await expect(locators.popper).toBeVisible();
      await expect(locators.trigger.first()).not.toBeFocused();

      await page.keyboard.press('Escape');
      await expect(locators.trigger.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByPlaceholder('Tag name')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.getByPlaceholder('Tag name')).toBeFocused();
      await expect(locators.popper).not.toBeVisible();
    });

    await test.step('Verify mouse interaction with button trigger', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.trigger.nth(1)).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.popper).toBeVisible();
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Escape');
      await expect(locators.popper).not.toBeVisible();
      await expect(locators.trigger.nth(1)).toBeFocused();
    });
  });
});
