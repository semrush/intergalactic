import { expect, test } from '@semcore/testing-utils/playwright';
import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  colors: (page: Page, index?: number) => {
    const base = page.getByRole('listbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  color: (page: Page, index?: number) => {
    const base = page.getByRole('option');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dialog: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  trigger: (page: Page, index?: number) => {
    const base = page.getByRole('combobox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  divider: (page: Page, index?: number) => {
    const base = page.getByRole('separator');
    return typeof index === 'number' ? base.nth(index) : base;
  },

  addColor: (page: Page) => page.locator('[data-ui-name="Input.Addon"]').first(),
  clearColor: (page: Page) => page.locator('[data-ui-name="Input.Addon"]').nth(1),
  inputColor: (page: Page, index?: number) => {
    const base = page.getByRole('textbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  palette: (page: Page) => page.locator('[data-ui-name="PaletteManager.Colors"]'),
  paletteItem: (page: Page) => page.locator('[data-ui-name="PaletteManager.Item"]'),
};

export async function expectAttributes(
  locator: Locator,
  attributes: Record<string, string | RegExp>,
) {
  for (const [name, value] of Object.entries(attributes)) {
    await expect(locator).toHaveAttribute(name, value);
  }
}

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify Keyboard navigation when No palette', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/base-no-palette-manager.tsx', 'en');

    await page.keyboard.press('Tab');
    await locators.trigger(page, 0).hover();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');
    await locators.color(page, 0).waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await locators.color(page, 0).first().hover();
    await page.getByText('Clear color').waitFor({ state: 'visible' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.getByText('#fdc23c').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify input validation in palette manager', {
    tag: [TAG.PRIORITY_HIGH,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/palettemanager.tsx', 'en');

    await locators.trigger(page, 0).click();

    await locators.color(page, 0).waitFor({ state: 'visible' });

    // verify input focused by click on add
    await locators.button(page, 'Add color').click();
    await expect(locators.inputColor(page)).toBeFocused();

    // input validation
    await locators.inputColor(page).fill('++');
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot();
  });

  test('Verify base styles', {
    tag: [TAG.PRIORITY_HIGH,
      '@color-picker'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/basic_example.tsx', 'en');

    const getComputedStyles = (locator: any, props: string[]) =>
      locator.evaluate((el: any, props: any) => {
        const computed = window.getComputedStyle(el);
        return props.reduce((acc: any, prop: any) => {
          acc[prop] = computed[prop as keyof CSSStyleDeclaration];
          return acc;
        }, {});
      }, props);

    const getCssVarColor = (varName: string, fallback: string) =>
      page.evaluate(({ name, fallback }) => {
        const probe = document.createElement('div');
        probe.style.background = `var(${name}, ${fallback})`;
        document.body.appendChild(probe);
        const color = window.getComputedStyle(probe).backgroundColor;
        probe.remove();
        return color;
      }, { name: varName, fallback });

    await test.step('Verify trigger styles', async () => {
      const triggerCircle = locators.trigger(page).locator('[data-ui-name="Flex"]');
      const triggerBox = await triggerCircle.boundingBox();
      expect(triggerBox).not.toBeNull();
      if (triggerBox) {
        expect(triggerBox.width).toBe(18);
        expect(triggerBox.height).toBe(18);
      }
    });

    await locators.trigger(page).click();
    await locators.color(page, 0).waitFor({ state: 'visible' });

    await test.step('Verify popper styles', async () => {
      const paddings = await getComputedStyles(locators.dialog(page), [
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
      const count = await locators.color(page).count();
      for (let i = 0; i < count; i++) {
        const item = locators.color(page, i);
        await expect(item).toHaveCSS('width', '26px');
        await expect(item).toHaveCSS('height', '26px');
      }
    });

    await test.step('Verify divider styles', async () => {
      const dividerStyles = await getComputedStyles(locators.divider(page), [
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
      await expect(locators.addColor(page)).toHaveAttribute('aria-hidden', 'true');
      await expect(locators.addColor(page)).toBeHidden();

      const confirmIcon = locators.addColor(page).locator('[data-ui-name="Check"]');
      await expect(confirmIcon).toHaveAttribute('width', '16');
      await expect(confirmIcon).toHaveAttribute('height', '16');
    });

    await test.step('Verify clear color styles', async () => {
      const clearIcon = locators.clearColor(page).locator('[data-ui-name="Close"]');
      await expect(clearIcon).toHaveAttribute('width', '16');
      await expect(clearIcon).toHaveAttribute('height', '16');
    });

    if (browserName === 'firefox') return; //  hover doesn't work well in playwright browsers
    await test.step('Verify palette manager color styles', async () => {
      const addButton = page.getByRole('button').first();
      const hoverBackgroundColor = await getCssVarColor(
        '--intergalactic-control-tertiary-neutral-hover',
        'oklch(0.176 0.033 175.6 / 0.056)',
      );
      const activeBackgroundColor = await getCssVarColor(
        '--intergalactic-control-tertiary-neutral-active',
        'oklch(0.176 0.033 175.7 / 0.084)',
      );

      await addButton.hover();

      const addButtonHoverStateStyles = await getComputedStyles(addButton, [
        'backgroundColor',
      ]);

      expect(addButtonHoverStateStyles.backgroundColor).toBe(hoverBackgroundColor);

      await page.mouse.down();

      const addButtonActiveStateStyles = await getComputedStyles(addButton, [
        'backgroundColor',
      ]);

      expect(addButtonActiveStateStyles.backgroundColor).toBe(activeBackgroundColor);

      await page.mouse.up();

      await locators.inputColor(page).fill('000');
      await locators.addColor(page).click();

      const paletteBox = await locators.paletteItem(page).boundingBox();
      expect(paletteBox).not.toBeNull();
      if (paletteBox) {
        expect(paletteBox.width).toBe(28);
        expect(paletteBox.height).toBe(28);
      }

      const paletteIcon = locators.paletteItem(page).locator('svg');
      await expect(paletteIcon).toHaveAttribute('width', '10');
      await expect(paletteIcon).toHaveAttribute('height', '10');

      const itemColorBox = page.locator('[data-ui-name="Box"][class*="ItemColor"]');
      const itemColorBoxBounding = await itemColorBox.boundingBox();
      expect(itemColorBoxBounding).not.toBeNull();
      if (itemColorBoxBounding) {
        expect(itemColorBoxBounding.width).toBeLessThanOrEqual(22);
        expect(itemColorBoxBounding.height).toBeLessThanOrEqual(22);
      }
    });
  });

  test('Verify default item states for active and background colors', {
    tag: [TAG.PRIORITY_HIGH,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/label-and-color-expanded.tsx', 'en');

    await locators.dialog(page, 3).waitFor({ state: 'visible' });

    await test.step('Verify normal and active for background and text color', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover on No background color ', async () => {
      const items = locators.dialog(page, 0).getByRole('option');
      await items.first().hover();
      await page.getByText('Clear color').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover on text color ', async () => {
      const items = locators.dialog(page, 1).getByRole('option');
      await items.nth(1).hover();
      await page.getByText('#008ff8').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover on Add color button ', async () => {
      await locators.button(page, 'Add color').first().hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify predefined palette ', {
    tag: [TAG.PRIORITY_HIGH,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/predefined_palette.tsx', 'en');

    await locators.trigger(page, 0).click();
    await locators.color(page, 0).waitFor({ state: 'visible' });

    await test.step('Verify hover state for Palette custom color', async () => {
      await locators.paletteItem(page).first().hover();
      await page.getByText('#4C4AA4').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify active state of Palette custom color ', async () => {
      await locators.paletteItem(page).first().click();
      await locators.color(page, 0).waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();

      await locators.trigger(page, 0).click();
      await locators.color(page, 0).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify ColorPicker.Colors', {
    tag: [TAG.PRIORITY_HIGH,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/color-picker-props.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.color(page, 0).waitFor({ state: 'visible' });
    await locators.color(page, 4).click();
    await locators.color(page, 0).waitFor({ state: 'hidden' });

    await page.keyboard.press('Enter');
    await locators.color(page, 0).waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot();
  });

  test('Verify ColorPicker.Item PaletteManager.Item and ColorPicker.Input', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/input-color-and-items-props.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.color(page, 0).waitFor({ state: 'visible' });

    await locators.color(page, 3).hover();

    await page.getByText('#8E3B29').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await locators.paletteItem(page).nth(1).hover();
    await page.getByText('#0000FF').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify trigger variations keyboards interactions', {
    tag: [TAG.PRIORITY_HIGH,
      '@color-picker',
      '@input',
      '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/triggers.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.color(page, 0).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify Roles and attributes', {
    tag: [TAG.PRIORITY_HIGH,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/basic_example.tsx', 'en');

    await test.step('Verify trigger attributes when popper not expanded', async () => {
      await expectAttributes(locators.trigger(page), {
        'aria-expanded': 'false',
        'aria-label': 'Color field',
        'aria-haspopup': 'dialog',
      });
      await expect(locators.trigger(page)).not.toHaveAttribute('aria-controls', /popper/);
    });

    await test.step('Verify trigger attributes when popper expanded', async () => {
      await locators.trigger(page).click();
      await locators.color(page, 0).waitFor({ state: 'visible' });
      await expectAttributes(locators.trigger(page), {
        'aria-expanded': 'true',
        'aria-label': 'Color field',
        'aria-haspopup': 'dialog',
      });
      await expect(locators.trigger(page)).toHaveAttribute('aria-controls', /popper/);
    });

    await test.step('Verify popper attributes', async () => {
      await expect(locators.dialog(page)).toBeVisible();
      await expectAttributes(locators.dialog(page), {
        'aria-label': 'Colors palette',
      });
    });

    await test.step('Verify preset colors attributes', async () => {
      await expectAttributes(locators.colors(page, 0), {
        'aria-label': 'Preset colors',
        'aria-orientation': 'horizontal',
      });
    });

    await test.step('Verify colors list attributes', async () => {
      const colors = locators.color(page);
      await expectAttributes(colors.first(), {
        'aria-selected': 'true',
        'aria-label': 'Clear color',
      });
    });

    await test.step('Verify divider attributes', async () => {
      await expectAttributes(locators.divider(page), {
        'role': 'separator',
        'aria-orientation': 'horizontal',
      });
    });

    await test.step('Verify palette manager attributes', async () => {
      await expectAttributes(locators.palette(page), {
        'role': 'listbox',
        'aria-orientation': 'horizontal',
        'aria-label': 'Custom preset colors',
      });
    });

    await test.step('Verify input attributes', async () => {
      await expectAttributes(locators.inputColor(page, 0), {
        'aria-invalid': 'false',
        'aria-label': 'Custom color, HEX format',
      });

      await expectAttributes(locators.addColor(page), {
        'aria-hidden': 'true',
        'aria-label': 'Add color to the list of custom colors',
      });

      await expectAttributes(locators.clearColor(page), {
        'aria-hidden': 'true',
        'aria-label': 'Clear custom color field',
      });
    });

    await test.step('Verify palette item attributes', async () => {
      await locators.inputColor(page).fill('000');
      await locators.addColor(page).waitFor({ state: 'visible' });
      await locators.addColor(page).click();

      await expect(locators.paletteItem(page)).toHaveCount(1);

      await expectAttributes(locators.paletteItem(page), {
        'aria-label': '#000',
        'aria-selected': 'false',
      });

      await locators.paletteItem(page).click();
      await locators.color(page, 0).waitFor({ state: 'hidden' });

      await locators.trigger(page).click();
      await locators.color(page, 0).waitFor({ state: 'visible' });

      await locators.inputColor(page).fill('000');
      await locators.addColor(page).waitFor({ state: 'visible' });
      await locators.addColor(page).click();

      await expect(locators.paletteItem(page)).toHaveAttribute('aria-selected', 'true');

      await locators.inputColor(page).fill('vdnsjkv');

      await expectAttributes(locators.inputColor(page), {
        'aria-invalid': 'true',
        'aria-label': 'Custom color, HEX format',
      });

      const paletteClose = locators.paletteItem(page).locator('svg');
      await expectAttributes(paletteClose, { 'aria-hidden': 'true' });
    });
  });

  test('Verify mouse navigation when No palette', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/base-no-palette-manager.tsx', 'en');

    await locators.trigger(page, 0).click();
    await locators.color(page, 0).waitFor({ state: 'visible' });
    await expect(locators.trigger(page, 0)).toHaveAttribute('aria-label', 'Color field');
    await expect(locators.dialog(page)).toBeVisible();

    await locators.trigger(page, 0).click();
    await locators.color(page, 0).waitFor({ state: 'hidden' });
    await expect(locators.dialog(page)).not.toBeVisible();
    await expect(locators.trigger(page, 0)).toHaveAttribute('aria-label', 'Color field');

    await locators.trigger(page, 0).click();
    await locators.color(page, 4).click();
    await locators.color(page, 0).waitFor({ state: 'visible' });
    await expect(locators.trigger(page, 0)).toHaveAttribute('aria-label', 'Color field, current color is #fdc23c');

    await locators.trigger(page, 0).click();
    await locators.color(page, 0).click();
    await locators.color(page, 0).waitFor({ state: 'hidden' });
    await expect(locators.trigger(page, 0)).toHaveAttribute('aria-label', 'Color field');

    await locators.trigger(page, 0).click();
    await locators.color(page, 0).waitFor({ state: 'visible' });

    await page.keyboard.press('Escape');
    await locators.color(page, 0).waitFor({ state: 'visible' });
    await expect(locators.trigger(page, 0)).toHaveAttribute('aria-label', 'Color field');
    await expect(locators.trigger(page, 0)).toBeFocused();
  });

  test('Verify Keyboard navigation when No palette', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/base-no-palette-manager.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.trigger(page)).toBeFocused();

    await expect(locators.trigger(page, 0)).toHaveAttribute('aria-label', 'Color field');
    await page.keyboard.press('Enter');
    await locators.color(page, 0).waitFor({ state: 'visible' });

    await expect(locators.dialog(page)).toBeFocused();
    await page.keyboard.press('Escape');
    await locators.color(page, 0).waitFor({ state: 'hidden' });
    await expect(locators.trigger(page, 0)).toHaveAttribute('aria-label', 'Color field');
    await expect(locators.trigger(page, 0)).toBeFocused();

    await page.keyboard.press('Space');
    await expect(locators.dialog(page)).toBeFocused();

    await locators.color(page, 0).waitFor({ state: 'visible' });

    await page.keyboard.press('Tab');
    await page.getByText('Clear color').waitFor({ state: 'visible' });

    await page.keyboard.press('Space');
    await locators.color(page, 0).waitFor({ state: 'hidden' });
    await expect(locators.trigger(page, 0)).toBeFocused();

    await expect(locators.trigger(page)).toHaveAttribute('aria-label', 'Color field');

    await page.keyboard.press('Space');
    await expect(locators.dialog(page)).toBeFocused();

    await locators.color(page, 0).waitFor({ state: 'visible' });
    for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await locators.color(page, 0).waitFor({ state: 'hidden' });
    await expect(locators.trigger(page, 0)).toBeFocused();

    await expect(locators.trigger(page)).toHaveAttribute(
      'aria-label',
      'Color field, current color is #fdc23c',
    );

    await page.keyboard.press('Space');
    await locators.color(page, 0).waitFor({ state: 'visible' });
    await expect(locators.dialog(page)).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await expect(locators.dialog(page)).toBeVisible();

    await page.keyboard.press('Escape');
    await locators.color(page, 0).waitFor({ state: 'hidden' });
    await expect(locators.trigger(page, 0)).toBeFocused();

    await page.keyboard.press('Space');
    await locators.trigger(page, 0).click();
    await expect(locators.dialog(page)).not.toBeVisible();
  });

  test('Verify mouse navigation when palette manager presents', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/palettemanager.tsx', 'en');

    await locators.trigger(page, 0).click();
    await locators.color(page, 0).waitFor({ state: 'visible' });

    // verify input focused by click on add
    await locators.button(page, 'Add color').click();
    await expect(locators.inputColor(page)).toBeFocused();

    // input validation
    await locators.inputColor(page).fill('++');
    await page.waitForTimeout(100);

    await expect(locators.addColor(page)).toBeVisible();
    await expect(locators.clearColor(page)).toBeVisible();

    await locators.button(page, 'Add color').click();
    await expect(locators.dialog(page)).toBeVisible();
    await expect(locators.inputColor(page)).toBeFocused();

    await expect(locators.palette(page)).toBeEmpty();

    await locators.clearColor(page).click();
    await expect(locators.inputColor(page)).toBeFocused();
    await expect(locators.palette(page)).toBeEmpty();
    await expect(locators.inputColor(page)).toHaveAttribute('aria-invalid', 'false');
    await expect(locators.inputColor(page)).toBeEmpty();

    await locators.inputColor(page).fill('999');
    await page.waitForTimeout(300);
    await expect(locators.inputColor(page)).toHaveAttribute('aria-invalid', 'false');

    await locators.addColor(page).click();
    await expect(locators.palette(page)).not.toBeEmpty();
    await expect(locators.palette(page).locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(1);
    await expect(locators.inputColor(page)).toBeEmpty();

    await locators.inputColor(page).fill('666');
    await locators.addColor(page).click();
    await expect(locators.palette(page).locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(2);

    await page.locator('[data-name="Close"]').nth(1).click();
    await expect(locators.palette(page).locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(1);

    await locators.palette(page).locator('[data-ui-name="PaletteManager.Item"]').click();
    await locators.color(page, 0).waitFor({ state: 'hidden' });
    await expect(locators.trigger(page, 0)).toHaveAttribute('value', '#999');
  });

  test('Verify keyboard navigation when palette manager presents', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/palettemanager.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.color(page, 0).waitFor({ state: 'visible' });

    const count = await locators.color(page).count();

    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
      await expect(locators.color(page).nth(i)).toBeFocused();
    }

    await page.keyboard.press('Tab');

    await expect(locators.inputColor(page)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(locators.dialog(page)).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(locators.inputColor(page)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.inputColor(page)).toBeFocused();

    await locators.inputColor(page).fill('666');
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter');
    await expect(locators.inputColor(page)).toHaveAttribute('aria-invalid', 'false');
    await expect(locators.palette(page)).not.toBeEmpty();
    await expect(locators.palette(page).locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(1);
    await expect(locators.inputColor(page)).toBeEmpty();

    await locators.inputColor(page).fill('111');
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter');
    await locators.addColor(page).click();
    await expect(locators.palette(page).locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(2);

    await locators.inputColor(page).fill('++');
    await page.waitForTimeout(200);
    await expect(locators.inputColor(page)).toHaveAttribute('aria-invalid', 'true');

    await expect(locators.addColor(page)).toBeVisible();
    await expect(locators.clearColor(page)).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(locators.inputColor(page)).toBeFocused();
    await expect(locators.palette(page).locator('[data-ui-name="PaletteManager.Item"]')).toHaveCount(2);

    await expect(locators.inputColor(page)).toBeFocused();

    await expect(locators.inputColor(page)).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(locators.inputColor(page)).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');

    await locators.color(page, 0).waitFor({ state: 'hidden' });
    await expect(locators.trigger(page, 0)).toHaveAttribute('value', '#111');
  });

  test('Verify Colors and Palette.Manager props', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@color-picker'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/colors-and-palette-manager-colors-props.tsx', 'en');

    await test.step('Verify paletter manager when colors defaultColors and onColorsChange pre set', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.color(page, 0).waitFor({ state: 'visible' });

      await expect(page.locator('[data-ui-name="ColorPicker.Item"]')).toHaveCount(7);

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
        await expect(locators.color(page).nth(i)).toHaveAttribute('aria-label', expectedColors[i]);
      }

      const expectedPaletteColors = ['#8649E6', '#8649E7', '#8649E8'];

      await expect(locators.paletteItem(page)).toHaveCount(3);

      for (let i = 0; i < expectedPaletteColors.length; i++) {
        await expect(locators.paletteItem(page).nth(i)).toHaveAttribute('aria-label', expectedPaletteColors[i]);
      }

      await locators.paletteItem(page).nth(1).locator('[data-name="Close"]').click();
      await expect(locators.paletteItem(page)).toHaveCount(2);

      await locators.inputColor(page).fill('888');
      await page.keyboard.press('Enter');
      await expect(locators.paletteItem(page)).toHaveCount(3);

      await locators.paletteItem(page).nth(2).click();
      await locators.paletteItem(page).nth(2).waitFor({ state: 'hidden' });

      await locators.trigger(page, 0).click();
      await locators.paletteItem(page).nth(2).waitFor({ state: 'visible' });

      await expect(locators.paletteItem(page).nth(2)).toHaveAttribute('aria-selected', 'true');
      await locators.trigger(page, 0).click();
      await locators.paletteItem(page).nth(2).waitFor({ state: 'hidden' });
    });

    await test.step('Verify paletter manager when defaultColors and onColorsChange pre set', async () => {
      await locators.trigger(page, 1).click();
      await locators.color(page, 0).waitFor({ state: 'visible' });

      await expect(page.locator('[data-ui-name="ColorPicker.Item"]')).toHaveCount(10);

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
        await expect(locators.color(page).nth(i)).toHaveAttribute('aria-label', expectedColors[i]);
      }

      const expectedPaletteColors = ['#00FF00', '#0000FF'];

      await expect(locators.paletteItem(page)).toHaveCount(2);

      for (let i = 0; i < expectedPaletteColors.length; i++) {
        await expect(locators.paletteItem(page).nth(i)).toHaveAttribute('aria-label', expectedPaletteColors[i]);
      }

      await locators.paletteItem(page).nth(1).locator('[data-name="Close"]').click();
      await expect(locators.paletteItem(page)).toHaveCount(1);

      await locators.inputColor(page).fill('888');
      await page.keyboard.press('Enter');
      await expect(locators.paletteItem(page)).toHaveCount(2);
      await locators.paletteItem(page).nth(1).click();
      await locators.paletteItem(page).nth(1).waitFor({ state: 'hidden' });
      await locators.trigger(page, 1).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await expect(locators.paletteItem(page).nth(1)).toHaveAttribute('aria-selected', 'false');
    });
  });

  test('Verify trigger variations mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@color-picker',
      '@input',
      '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/triggers.tsx', 'en');

    await test.step('Verify mouse interaction with tag trigger', async () => {
      locators.trigger(page, 0).click();
      await locators.color(page, 0).waitFor({ state: 'visible' });

      locators.trigger(page, 0).click();
      await locators.color(page, 0).waitFor({ state: 'hidden' });

      await page.locator('[data-ui-name="Input.Value"]').click();
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    await test.step('Verify mouse interaction with button trigger', async () => {
      locators.trigger(page, 1).click();
      await locators.color(page, 0).waitFor({ state: 'visible' });
      locators.trigger(page, 1).click();
      await locators.color(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.dialog(page)).not.toBeVisible();
    });
  });

  test('Verify trigger variations keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.FUNCTIONAL,
      '@color-picker',
      '@input',
      '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/tests/examples/triggers.tsx', 'en');

    await test.step('Verify keyboard interaction with tag trigger', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.trigger(page, 0)).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.color(page, 0).waitFor({ state: 'visible' });
      await expect(locators.trigger(page, 0)).not.toBeFocused();

      await page.keyboard.press('Escape');
      await locators.color(page, 0).waitFor({ state: 'hidden' });

      await expect(locators.trigger(page, 0)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByPlaceholder('Tag name')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.getByPlaceholder('Tag name')).toBeFocused();
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    await test.step('Verify mouse interaction with button trigger', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.trigger(page, 1)).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.color(page, 0).waitFor({ state: 'visible' });

      await page.keyboard.press('Escape');
      await locators.color(page, 0).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page, 1)).toBeFocused();
    });
  });
});
