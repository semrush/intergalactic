import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

const checkStyles = async (element: any, styles: Record<string, string>) => {
  for (const [property, value] of Object.entries(styles) as [string, string][]) {
    await expect(element).toHaveCSS(property, value);
  }
};

test.describe('Dropdown menu base', () => {
  test('Verify render white shadows in list', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/the_second_method.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const popper = page.locator('[data-ui-name="DropdownMenu.Popper"]');
    const ddMenu = page.locator('[data-ui-name="DropdownMenu.Menu"]');
    const items = page.locator(
      '[data-ui-name="DropdownMenu.Group"] [data-ui-name="DropdownMenu.Item"]',
    );
    const dropdownItemWithTitle = page.locator(
      '[data-ui-name="ScrollArea.Container"] >> [data-ui-name="Dropdown.Item"]:not(:has([data-ui-name="DropdownMenu.Group"] *))',
    );

    await test.step('Verify attributes of trigger', async () => {
      await expect(trigger).toHaveAttribute('role', 'button');
      await expect(trigger).toHaveAttribute('aria-haspopup', 'true');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 500));

    await test.step('Verify attributes expanded trigger', async () => {
      await expect(trigger).toHaveAttribute('role', 'button');
      await expect(trigger).toHaveAttribute('aria-haspopup', 'true');
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect(trigger).toHaveAttribute('aria-controls');
    });

    await test.step('Verify popper attributes', async () => {
      await expect(popper).toHaveAttribute('tabindex', '-1');
      await expect(popper).toHaveAttribute('data-popper-placement', 'bottom-start');
    });

    await test.step('Verify popper attributes', async () => {
      await expect(ddMenu).toHaveAttribute('role', 'menu');
      await expect(ddMenu).toHaveAttribute('aria-label');
    });

    await test.step('Verify item with titles attributes', async () => {
      await expect(dropdownItemWithTitle).toHaveAttribute('aria-hidden', 'true');
    });

    await test.step('Verify group attributes', async () => {
      const group = page.locator('[data-ui-name="DropdownMenu.Group"]');
      await expect(group).toHaveAttribute('role', 'group');
      await expect(group).toHaveAttribute('aria-labelledby');
      await expect(group).toHaveAttribute('aria-describedby');
    });

    await test.step('Verify items in group attributes', async () => {
      const count1 = await items.count();

      await expect(items.nth(0)).toHaveAttribute('role', 'menuitem');
      await expect(items.nth(0)).toHaveAttribute('tabindex', '0');

      for (let i = 1; i < count1; i++) {
        await expect(items.nth(i)).toHaveAttribute('role', 'menuitem');
        await expect(items.nth(i)).toHaveAttribute('tabindex', '-1');
      }
    });

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(items.nth(4)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(items.nth(4)).toBeFocused();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowDown');
    await expect(items.nth(5)).toBeFocused();
    await expect(page).toHaveScreenshot();
  });

  test('Verify mouse interactions with Base dropdown menu', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const button = page.locator('button', { hasText: 'Actions' });
    const menu = page.getByRole('menu');

    await test.step('Verify opens by mouse click on tirgger', async () => {
      await button.click();
      await menu.waitFor();
      await expect(menu).toBeVisible();
    });

    await test.step('Verify non closed by click on the menu item', async () => {
      await page.getByRole('menuitem').first().click();
      await expect(menu).toBeVisible();
    });

    await test.step('Verify closes by trigger click', async () => {
      await button.click();
      await menu.waitFor();
      await expect(menu).not.toBeVisible();
    });
  });

  test('Verify keyboard interactions with Base dropdown menu', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const menu = page.getByRole('menu');
    const items = page.getByRole('menuitem');

    await test.step('Verify opens by Enter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await menu.waitFor();
      await expect(menu).toBeVisible();
    });

    await test.step('Verify closed by Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
    });

    await test.step('Verify opens by Space', async () => {
      await page.keyboard.press('Space');
      await menu.waitFor();
      await expect(menu).toBeVisible();
    });

    await test.step('Verify opens by ArrowDown', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await menu.waitFor();
      await expect(menu).toBeVisible();
      await expect(items.first()).toBeFocused();
    });

    await test.step('Verify opens by ArrowUp', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowUp');
      await menu.waitFor();
      await expect(menu).toBeVisible();
      await expect(items.first()).toBeFocused();
    });

    await test.step('Verify Tab not swicthes focus', async () => {
      await page.keyboard.press('Tab');
      await expect(menu).toBeVisible();
      await expect(items.first()).toBeFocused();
    });

    await test.step('Verify ArrowNavigation', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(menu).toBeVisible();
      await expect(items.nth(3)).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');
      await expect(items.first()).toBeFocused();
    });
  });

  test('Verify sizes and styles of dd menu', async ({ page, browserName }) => {
    const standPath = 'stories/components/dropdown-menu/tests/examples/sizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.waitForTimeout(100);

    const ddM = page.locator('[data-ui-name="DropdownMenu.Menu"][data-testid="m-size"]');
    const ddL = page.locator('[data-ui-name="DropdownMenu.Menu"][data-testid="l-size"]');

    const mItems = ddM.locator('[data-ui-name="DropdownMenu.Item"]');
    const lItems = ddL.locator('[data-ui-name="DropdownMenu.Item"]');

    await test.step('Verify styles of M size', async () => {
      const count1 = await mItems.count();

      for (let i = 0; i < count1; i++) {
        await checkStyles(mItems.nth(i), {
          'font-size': '14px',
          'min-height': '32px',
          'padding': '6px 8px',
          'background-color': 'rgba(0, 0, 0, 0)',
        });
      }
    });

    await test.step('Verify styles of L size', async () => {
      const count1 = await mItems.count();

      for (let i = 0; i < count1; i++) {
        await checkStyles(lItems.nth(i), {
          'font-size': '16px',
          'min-height': '40px',
          'padding': '8px 12px',
          'background-color': 'rgba(0, 0, 0, 0)',
        });
      }
    });

    await test.step('Verify disabled styles', async () => {
      await checkStyles(mItems.first(), {
        opacity: '0.3',
      });
      await checkStyles(lItems.first(), {
        opacity: '0.3',
      });
    });
    if (browserName === 'firefox') return;
    await test.step('Verify hover styles', async () => {
      await mItems.nth(1).hover();
      await checkStyles(mItems.nth(1), {
        'background-color': 'rgb(244, 245, 249)',
      });
      await lItems.nth(1).hover();
      await checkStyles(lItems.nth(1), {
        'background-color': 'rgb(244, 245, 249)',
      });
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Width of dd menu', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/tests/examples/dd-width.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot();
  });

  test('Verify keyboard interactions dd menu with notice and interactive item inside', async ({
    page,
  }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/dropdown-menu.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const menu = page.getByRole('menu');
    const items = page.getByRole('menuitem');
    const link = page.getByRole('link');

    await test.step('Verify opens by Enter and first item focused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await menu.waitFor();
      await expect(menu).toBeVisible();
      await expect(items.first()).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify cant switch to interactive element by arrows', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(items.nth(2)).toBeFocused();
    });

    await test.step('Verify switch beiween interactive elements by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(link).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(items.nth(2)).toBeFocused();
    });

    await test.step('Verify closed by escape when focus on notice', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await expect(menu).not.toBeVisible();
    });
  });
});

test.describe('Menu item types and elements inside', () => {
  test('Verify hint badges icons and counter styles in menus ', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/tests/examples/list_item_types.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const button = page.locator('button');
    const menu = page.getByRole('menu');
    const items = page.locator(
      '[data-ui-name="DropdownMenu.Group"] [data-ui-name="DropdownMenu.Item"]',
    );

    await button.click();
    await menu.waitFor();
    await expect(menu).toBeVisible();

    await test.step('Verify item woth hint L size', async () => {
      await checkStyles(items.nth(1), {
        'font-size': '16px',
        'min-height': '40px',
        'padding': '8px 12px',
        'background-color': 'rgba(0, 0, 0, 0)',
      });
    });

    await test.step('Verify item woth hint M size', async () => {
      await checkStyles(items.nth(2), {
        'font-size': '14px',
        'min-height': '32px',
        'padding': '6px 8px',
        'background-color': 'rgba(0, 0, 0, 0)',
      });
    });

    await test.step('Verify padding between item and icon', async () => {
      const ItemAddon = items.nth(3).locator('[data-ui-name="DropdownMenu.Item.Text"]');
      await checkStyles(ItemAddon, {
        'margin-left': '4px',
      });
    });

    await test.step('Verify padding between item badge', async () => {
      const ItemAddon = items.nth(4).locator('[data-ui-name="DropdownMenu.Item.Text"]');
      await checkStyles(ItemAddon, {
        'margin-right': '4px',
      });
    });

    await test.step('Verify tooltip on hover', async () => {
      await items.nth(4).hover();
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify closed by trigger click', async () => {
      await button.click();
      await expect(menu).not.toBeVisible();
    });
  });
});

test.describe('Item actions', () => {
  test('Verify Keyboard interaction when items have action buttons', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/item_actions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const ddMenuTrigger = page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const menu = page.locator('[data-ui-name="DropdownMenu.Popper"]');

    const MathPlus = page.locator(
      '[data-ui-name="DropdownMenu.Item"][aria-label="Add new"][role="menuitem"]',
    );
    const Trash = page.locator(
      '[data-ui-name="DropdownMenu.Item"][aria-label="Delete"][role="menuitem"]',
    );
    const Item3 = page.locator(
      '[data-ui-name="DropdownMenu.Item.Content"]:has-text("Menu item 3")',
    );

    await test.step('Verify 1st item focused when menu expanded by Enter', async () => {
      await page.keyboard.press('Tab');
      await expect(ddMenuTrigger).toBeFocused();

      await page.keyboard.press('Enter');
      await menu.waitFor();
      await expect(ddMenuTrigger).not.toBeFocused();
      await expect(menu).toBeVisible();
      const Item1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Menu item 1")');
      await expect(Item1).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify 1st item focused when menu expanded ArrowDown', async () => {
      await page.keyboard.press('Escape');
      await expect(ddMenuTrigger).toBeFocused();

      await page.keyboard.press('Enter');
      await menu.waitFor();
      await expect(ddMenuTrigger).not.toBeFocused();
      await expect(menu).toBeVisible();
      const Item1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Menu item 1")');
      await expect(Item1).toBeFocused();
    });

    await test.step('Verify item focused but items inside not focused when navigate to item', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(Item3).toBeFocused();
      await expect(MathPlus).not.toBeFocused();
      await expect(Trash).not.toBeFocused();
    });

    await test.step('Verify enter not switch focus', async () => {
      await page.keyboard.press('Enter');
      await expect(MathPlus).not.toBeFocused();
      await expect(Trash).not.toBeFocused();
    });

    await test.step('Verify focus swicthes by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(MathPlus).toBeFocused();
      await expect(Trash).not.toBeFocused();
      await page.keyboard.press('Escape');
    });
    await test.step('Verify focus swicthes by ArrowRight', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(MathPlus).toBeFocused();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowRight');
      await expect(Trash).toBeFocused();
    });

    await test.step('Verify Escape returns to the menu item', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
      await expect(Item3).toBeFocused();
      await expect(MathPlus).not.toBeFocused();
      await expect(Trash).not.toBeFocused();
    });

    const Item4 = page.locator('[data-ui-name="DropdownMenu.Item.Content"][role="menuitem"]', {
      hasText: 'Menu item 4',
    });
    const Add = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Add")');

    await test.step('Verify submenu not expands automatically', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(Item4).toBeFocused();
      await expect(Add).not.toBeVisible();
    });

    await test.step('Verify submenu expands by enter', async () => {
      await page.keyboard.press('Enter');
      await Add.waitFor();
      await expect(Item4).not.toBeFocused();
      await expect(Add).toBeVisible();
      await expect(Add).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify submenu expands by ArrowRight', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
      await page.keyboard.press('ArrowRight');
      await Add.waitFor();
      await expect(Item4).not.toBeFocused();
      await expect(Add).toBeVisible();
      await expect(Add).toBeFocused();
    });

    await test.step('Verify escape retuns and closes all submenus', async () => {
      await page.keyboard.press('Escape');
      await expect(Item4).toBeFocused();
      await expect(Add).not.toBeVisible();
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      await expect(ddMenuTrigger).toBeFocused();
      await expect(menu).not.toBeVisible();
    });
  });
});

test.describe('Nested menus with focusable elements', () => {
  test('Verify Keyboard interaction in nested menus', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/nested_with_focusable.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const ddMenu = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const items = page.locator('[data-ui-name="DropdownMenu.Item.Content"]');
    const SubItem1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Item 4.1.1")');
    const input1 = page.locator('input[data-ui-name="InputNumber.Value"][placeholder="1"]');
    const button = page.locator('button[data-ui-name="Button"]:has-text("Apply")');

    await test.step('Verify 1st item focused when Menu expands and submenu dont displayed', async () => {
      await page.keyboard.press('Tab');
      await expect(ddMenu).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(ddMenu).not.toBeFocused();

      await expect(items.first()).toBeFocused();
      await expect(SubItem1).not.toBeVisible();
    });

    await test.step('Verify 3rd item focused and 3rd submenu shown', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(500);
      await expect(items.nth(2)).toBeFocused();
    });

    await test.step('Verify 1st item  submenu focused', async () => {
      await page.keyboard.press('Enter');
      await expect(SubItem1).toBeVisible();
      await expect(SubItem1).toBeFocused();
    });

    await test.step('Verify Input number focused and focus not lost by clicking up/down', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await expect(input1).toBeFocused();
    });

    await test.step('Verify Apply btn focused and focus not loast by clicking up/down', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await expect(button).toBeFocused();
      await expect(SubItem1).not.toBeFocused();
    });

    await test.step('Verify closed by ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(button).not.toBeFocused();
      await expect(items.nth(2)).toBeFocused();
      await page.keyboard.press('Escape');
      await new Promise((resolve) => setTimeout(resolve, 200));
      await expect(page.locator('[data-ui-name="DropdownMenu"]')).not.toBeVisible();
    });
  });
});

test.describe('On Visible controlled', () => {
  test('Verify Keyboard interaction when On Visible controlled', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/tests/examples/on-visible-2nd.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    // 1st item focused when Menu expands
    const ddMenuTrigger = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const menu = page.getByRole('menu');
    await page.keyboard.press('Tab');
    await expect(ddMenuTrigger).toBeFocused();
    await page.keyboard.press('Enter');
    await menu.waitFor();
    await expect(ddMenuTrigger).not.toBeFocused();
    const Item1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("save")');
    await expect(Item1).toBeFocused();

    // 2nd item focused by 1st click on down
    await page.keyboard.press('ArrowDown');
    const Item2 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("rename")');
    await expect(Item2).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
  });

  test('Verify mouse interaction when On Visible controlled', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/tests/examples/on-visible-2nd.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const ddMenuTrigger = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const menu = page.getByRole('menu');
    await ddMenuTrigger.click();
    await menu.waitFor();
    await expect(menu).toBeVisible();

    await ddMenuTrigger.click();
    await expect(menu).not.toBeVisible();
  });
});

test.describe('Selectable radio items', () => {
  test('Verify Selectable radio keyboard interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/selectable_radio_items.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const ddMenuTrigger = page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const items = page.locator('[data-ui-name="DropdownMenu.Item.Content"]');
    const deleteButton1 = page.locator('[aria-label="Delete item"]').nth(0);
    const menu = page.locator('[data-ui-name="DropdownMenu.Menu"]');

    await test.step('Verify 1st item focused when menu expanded', async () => {
      await page.keyboard.press('Tab');
      await expect(ddMenuTrigger).toBeFocused();
      await page.keyboard.press('Enter');
      await menu.waitFor();
      await expect(ddMenuTrigger).not.toBeFocused();
      await expect(items.first()).toBeFocused();
    });

    const contentItems = page.locator('[data-ui-name="DropdownMenu.Item.Content"]');

    await test.step('Verify items in group attributes', async () => {
      await expect(contentItems.nth(0)).toHaveAttribute('aria-checked', 'true');
      await expect(contentItems.nth(0)).toHaveAttribute('aria-haspopup', 'true');
      await expect(contentItems.nth(0)).toHaveAttribute('role', 'menuitemradio');
      await expect(contentItems.nth(0)).toHaveAttribute('tabindex', '0');
      await expect(contentItems.nth(0)).toHaveAttribute('aria-describedby');

      const count1 = await contentItems.count();

      for (let i = 1; i < count1; i++) {
        await expect(contentItems.nth(i)).toHaveAttribute('aria-haspopup', 'true');
        await expect(contentItems.nth(i)).toHaveAttribute('role', 'menuitemradio');
        await expect(contentItems.nth(i)).toHaveAttribute('tabindex', '-1');
        await expect(contentItems.nth(i)).toHaveAttribute('aria-describedby');
      }
    });

    await test.step('Verify menu closed by enter when interactive icon not focused', async () => {
      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(ddMenuTrigger).toBeFocused();
      await expect(items.first()).not.toBeVisible();
      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    await test.step('Verify interactive item focused by right arrow', async () => {
      await page.keyboard.press('ArrowRight');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(deleteButton1).toBeFocused();
      await expect(deleteButton1).toHaveAttribute('tabindex', '0');
      await expect(deleteButton1).toHaveAttribute('role', 'menuitem');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Left Arrow switches focus from interactive item to menu item', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(deleteButton1).not.toBeFocused();
      await expect(items.first()).toBeFocused();
    });

    await test.step('Verify escape closes all tooltips and menu', async () => {
      await page.keyboard.press('ArrowRight');
      await new Promise((resolve) => setTimeout(resolve, 200));
      await page.keyboard.press('Escape');
      await new Promise((resolve) => setTimeout(resolve, 100));
      await page.keyboard.press('Escape');
      await new Promise((resolve) => setTimeout(resolve, 100));
      await page.keyboard.press('Escape');
      await expect(ddMenuTrigger).toBeFocused();
      await expect(items.first()).not.toBeVisible();
      await expect(ddMenuTrigger).toBeFocused();
    });
  });

  test('Verify Selectable radio mouse interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/selectable_radio_items.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const ddMenuTrigger = page.getByRole('button');
    const items = page.locator('[data-ui-name="DropdownMenu.Item.Content"]');

    const deleteButton4 = page.locator('[aria-label="Delete item"]').nth(3);
    const menu = page.locator('[data-ui-name="DropdownMenu.Menu"]');

    await test.step('Verify opened by trigger click', async () => {
      await ddMenuTrigger.click();
      await menu.waitFor();
      await expect(ddMenuTrigger).not.toBeFocused();
      await expect(items.first()).toBeFocused();
    });

    await test.step('Verify menu closed click on item', async () => {
      await items.nth(4).click();
      await expect(items.first()).not.toBeVisible();
    });

    await test.step('Verify prev selected item selected and tooltip shown on hover', async () => {
      await ddMenuTrigger.click();
      await menu.waitFor();
      await deleteButton4.hover();
      await new Promise((resolve) => setTimeout(resolve, 500));
      // snapshot
    });

    await test.step('Verify menu not closed by click on addon', async () => {
      await deleteButton4.click();
      await expect(menu).toBeVisible();
    });
  });

  test('Verify styles of selectable radio items menu', async ({ page, browserName }) => {
    const standPath = 'stories/components/dropdown-menu/tests/examples/sizes-selectable.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.waitForTimeout(100);

    const ddM = page.locator('[data-ui-name="DropdownMenu.Menu"][data-testid="m-size"]');
    const ddL = page.locator('[data-ui-name="DropdownMenu.Menu"][data-testid="l-size"]');
    const ddDisabed = page.locator('[data-ui-name="DropdownMenu.Menu"][data-testid="m-disabled"]');

    const mItems = ddM.locator('[data-ui-name="DropdownMenu.Item"]:not([role="menuitem"])');
    const lItems = ddL.locator('[data-ui-name="DropdownMenu.Item"]:not([role="menuitem"])');
    const disabledItems = ddDisabed.locator(
      '[data-ui-name="DropdownMenu.Item"]:not([role="menuitem"])',
    );

    await test.step('Verify styles of m group title and subtitle', async () => {
      const titleSubtitleGroup = ddM.locator(
        '[data-ui-name="Dropdown.Item"]:not(:has(:scope > [data-ui-name="DropdownMenu.Group"]))',
      );
      const elements = titleSubtitleGroup.locator('[data-ui-name="Flex"]');
      await checkStyles(elements.first(), {
        'font-size': '14px',
        'font-weight': '700',
      });

      await checkStyles(elements.nth(1), {
        'font-size': '14px',
        'font-weight': '400',
      });
    });

    await test.step('Verify styles of M size', async () => {
      await checkStyles(mItems.first(), {
        'font-size': '14px',
        'min-height': '32px',
        'padding': '6px 8px',
        'background-color': 'rgba(196, 229, 254, 0.7)',
      });

      const count1 = await mItems.count();

      for (let i = 1; i < count1; i++) {
        await checkStyles(mItems.nth(i), {
          'font-size': '14px',
          'min-height': '32px',
          'padding': '6px 8px',
          'background-color': 'rgba(0, 0, 0, 0)',
        });
      }
    });

    await test.step('Verify styles of L group title and subtitle', async () => {
      const titleSubtitleGroup = ddL.locator(
        '[data-ui-name="Dropdown.Item"]:not(:has(:scope > [data-ui-name="DropdownMenu.Group"]))',
      );
      const elements = titleSubtitleGroup.locator('[data-ui-name="Flex"]');
      await checkStyles(elements.first(), {
        'font-size': '16px',
        'font-weight': '700',
      });

      await checkStyles(elements.nth(1), {
        'font-size': '16px',
        'font-weight': '400',
      });
    });
    await test.step('Verify styles of L size', async () => {
      await checkStyles(mItems.first(), {
        'font-size': '14px',
        'min-height': '32px',
        'padding': '6px 8px',
        'background-color': 'rgba(196, 229, 254, 0.7)',
      });

      const count1 = await mItems.count();

      for (let i = 1; i < count1; i++) {
        await checkStyles(lItems.nth(i), {
          'font-size': '16px',
          'min-height': '40px',
          'padding': '8px 12px',
          'background-color': 'rgba(0, 0, 0, 0)',
        });
      }
    });

    await test.step('Verify disabled styles', async () => {
      await checkStyles(disabledItems.first(), {
        opacity: '0.3',
      });
    });

    if (browserName === 'firefox') return;
    await test.step('Verify hover styles', async () => {
      await mItems.nth(0).hover();
      await checkStyles(mItems.nth(0), {
        'background-color': 'rgb(196, 229, 254)',
      });
      await mItems.nth(1).hover();
      await checkStyles(mItems.nth(1), {
        'background-color': 'rgb(244, 245, 249)',
      });

      // snapshot
    });
  });
});

test.describe('Multiselect items', () => {
  test('Verify Multiselect items keyboard interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/multiselect_items.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const ddMenuTrigger = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const items = page.locator('[data-ui-name="DropdownMenu.Item"]');
    const menu = page.getByRole('menu');

    await test.step('Verify 1st item focused when menu expanded', async () => {
      await page.keyboard.press('Tab');
      await expect(ddMenuTrigger).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(ddMenuTrigger).not.toBeFocused();
      await items.first().waitFor({ state: 'visible' });
      await expect(items.first()).toBeFocused();
    });

    await test.step('Verify items attributes', async () => {
      await expect(items.nth(0)).toHaveAttribute('aria-checked', 'true');
      await expect(items.nth(0)).toHaveAttribute('tabindex', '0');
      await expect(items.nth(0)).toHaveAttribute('role', 'menuitemcheckbox');
      const count1 = await items.count();
      for (let i = 1; i < count1; i++) {
        await expect(items.nth(i)).toHaveAttribute('role', 'menuitemcheckbox');
        await expect(items.nth(i)).toHaveAttribute('tabindex', '-1');
      }
    });

    await test.step('Verify enter checks item and menu is not closed', async () => {
      await page.keyboard.press('Enter');
      await expect(items.first()).not.toBeChecked();
      await expect(items.nth(1)).toBeChecked();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify arrows navigation', async () => {
      await page.keyboard.press('ArrowUp');
      await items.nth(9).waitFor({ state: 'visible' });
      await expect(items.nth(9)).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify escape closes menu', async () => {
      await page.keyboard.press('Space');
      await expect(items.nth(9)).toBeChecked();
      await page.keyboard.press('Escape');
      await expect(items.nth(9)).not.toBeVisible();
      await expect(ddMenuTrigger).toBeFocused();
    });

    await test.step('Verify last checked item checked when menu reopened', async () => {
      await page.keyboard.press('Enter');
      await items.nth(1).waitFor({ state: 'visible' });
      await expect(items.nth(1)).toBeFocused();
      await expect(items.nth(1)).toBeChecked();
      await expect(ddMenuTrigger).not.toBeFocused();
    });
  });

  test('Verify Multiselect items mouse interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/multiselect_items.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const ddMenuTrigger = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const items = page.locator('[data-ui-name="DropdownMenu.Item"]');
    const menu = page.getByRole('menu');

    await test.step('Verify clicking on items check them', async () => {
      await ddMenuTrigger.click();
      await menu.waitFor();
      await expect(items.first()).toBeChecked();
      await expect(items.nth(1)).toBeChecked();

      await items.first().click();
      await expect(items.first()).not.toBeChecked();

      await items.nth(2).click();
      await expect(items.nth(2)).toBeChecked();
      await items.nth(3).click();

      await expect(items.nth(2)).toBeChecked();
      await items.nth(3).click();
      await expect(items.nth(1)).toBeChecked();
    });

    await test.step('Verify checking state saved when close and reopen the menu', async () => {
      await ddMenuTrigger.click();
      await ddMenuTrigger.click();
      await menu.waitFor();

      await expect(items.first()).not.toBeChecked();
      await expect(items.nth(2)).toBeChecked();
      await expect(items.nth(2)).toBeChecked();
      await expect(items.nth(1)).toBeChecked();
    });
  });

  test('Verify styles of Multiselect items', async ({ page, browserName }) => {
    const standPath = 'stories/components/dropdown-menu/tests/examples/sizes-multiselect.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.waitForTimeout(100);

    const ddM = page.locator('[data-ui-name="DropdownMenu.Menu"][data-testid="m-size"]');
    const ddL = page.locator('[data-ui-name="DropdownMenu.Menu"][data-testid="l-size"]');
    const ddDisabed = page.locator('[data-ui-name="DropdownMenu.Menu"][data-testid="m-disabled"]');

    const mItems = ddM.locator(
      '[data-ui-name="DropdownMenu.Group"][data-ui-name="DropdownMenu.Item"]',
    );
    const lItems = ddL.locator(
      '[data-ui-name="DropdownMenu.Group"][data-ui-name="DropdownMenu.Item"]',
    );
    const disabledItems = ddDisabed.locator('[data-ui-name="DropdownMenu.Item"]');

    await test.step('Verify styles of M size', async () => {
      const count1 = await mItems.count();

      for (let i = 0; i < count1; i++) {
        await checkStyles(mItems.nth(i), {
          'font-size': '14px',
          'min-height': '32px',
          'padding': '6px 8px',
          'background-color': 'rgba(0, 0, 0, 0)',
        });
      }
    });

    await test.step('Verify styles of L size', async () => {
      const count1 = await mItems.count();

      for (let i = 0; i < count1; i++) {
        await checkStyles(lItems.nth(i), {
          'font-size': '16px',
          'min-height': '40px',
          'padding': '8px 12px',
          'background-color': 'rgba(0, 0, 0, 0)',
        });
      }
    });

    await test.step('Verify disabled styles', async () => {
      await checkStyles(disabledItems.nth(1), {
        opacity: '0.3',
      });
    });

    // snapshot
  });
});

test.describe('Virtual scroll', () => {
  test('Verify keyboard scroll', async ({ page, browserName }) => {
    const standPath = 'stories/components/dropdown-menu/advanced/examples/project-selector.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const ddMenuTrigger = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    await page.keyboard.press('Tab');
    await expect(ddMenuTrigger).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(ddMenuTrigger).not.toBeFocused();
    const project33 = page.getByRole('menuitemradio', { name: 'project 33' });
    const project32 = page.getByRole('menuitemradio', { name: 'project 32' });
    await project33.waitFor({ state: 'visible' });
    await expect(project33).toBeFocused();
    await expect(project32).not.toBeFocused();

    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    const project36 = page.getByRole('menuitemradio', { name: 'project 36' });
    await expect(project36).toBeFocused();
    await expect(project33).not.toBeFocused();
    await expect(page).toHaveScreenshot();

    if (browserName === 'firefox') return; // because of bug on firefox UIK-3349
    await page.keyboard.press('Tab');
    const createProject = page.getByRole('button', { name: 'Create new project' });
    await expect(createProject).toBeFocused();
    await expect(project36).not.toBeFocused();

    await page.keyboard.press('Tab');
    const input = page.locator('input[data-ui-name="Input.Value"]');
    await expect(input).toBeFocused();
    await expect(createProject).not.toBeFocused();
    await expect(project36).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(project36).toBeFocused();

    await page.keyboard.press('Space');
    await expect(ddMenuTrigger).toHaveText('project 36');

    await page.keyboard.press('ArrowDown');
    await project36.waitFor({ state: 'visible' });
    await expect(project36).toBeFocused();
  });

  test('Verify Mouse scroll', async ({ page, browserName }) => {
    const standPath = 'stories/components/dropdown-menu/advanced/examples/project-selector.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const ddMenuTrigger = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    await ddMenuTrigger.click();
    await expect(ddMenuTrigger).not.toBeFocused();
    const project33 = page.getByRole('menuitemradio', { name: 'project 33' });
    const project32 = page.getByRole('menuitemradio', { name: 'project 32' });
    await project33.waitFor({ state: 'visible' });
    await expect(project33).toHaveAttribute('aria-checked', 'true');
    await expect(project32).toHaveAttribute('aria-checked', 'false');
    await expect(project32).not.toBeFocused();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    const project36 = page.getByRole('menuitemradio', { name: 'project 36' });
    await expect(project36).toBeFocused();
    await expect(project36).toHaveAttribute('aria-checked', 'false');
    await project36.click();
    await expect(ddMenuTrigger).toHaveText('project 36');
    await ddMenuTrigger.click();
    const project43 = page.locator(
      '[data-ui-name="DropdownMenu.Item.Hint"]:has-text("project 43")',
    );

    await project43.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const project43item = page.getByRole('menuitemradio', { name: 'project 36' });
    await expect(project43item).toBeVisible();
    if (browserName === 'firefox') return; // every scroll on ff differs on some pixels(not stable) so visual regression skipped for it
    await expect(page).toHaveScreenshot();
  });
});
