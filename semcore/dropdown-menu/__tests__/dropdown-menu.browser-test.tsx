import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Dropdown-menu', () => {
  test('Should render white shadows in list', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/the_second_method.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const ddMenu = await page.locator('#dropdown-menu-children-items');

    await ddMenu.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Dropdown-menu - Item actions', () => {
  test('Keyboard interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/item_actions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    //1st item focused when Menu expands
    const ddMenu = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    await page.keyboard.press('Tab');
    await expect(ddMenu).toBeFocused();

    const Menu = await page.locator('[data-ui-name="DropdownMenu.Popper"]');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await expect(ddMenu).not.toBeFocused();
    await expect(Menu).toBeVisible();
    const Item1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Menu item 1")');
    await expect(Item1).toBeFocused();
    await expect(page).toHaveScreenshot();

    //All item focused when it containd button addons, addons not focused
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    const Item3 = page.locator(
      '[data-ui-name="DropdownMenu.Item.Content"]:has-text("Menu item 3")',
    );
    await expect(Item3).toBeFocused();
    const MathPlus = page.locator(
      '[data-ui-name="DropdownMenu.Item"][aria-label="Add new"][role="menuitem"]',
    );
    const Trash = page.locator(
      '[data-ui-name="DropdownMenu.Item"][aria-label="Delete"][role="menuitem"]',
    );
    await expect(MathPlus).not.toBeFocused();
    await expect(Trash).not.toBeFocused();

    //Enter focuses addons and they have hints
    await page.keyboard.press('Enter');
    await expect(MathPlus).toBeFocused();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowRight');
    await expect(Trash).toBeFocused();

    //Escape returns focus in menu item, hints hidden
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await expect(Item3).toBeFocused();
    await expect(MathPlus).not.toBeFocused();
    await expect(Trash).not.toBeFocused();

    //Submenu expands but not focused automatically
    await page.keyboard.press('ArrowDown');
    const Item4 = page.locator('[data-ui-name="DropdownMenu.Item.Content"][role="menuitem"]', {
      hasText: 'Menu item 4',
    });
    await expect(Item4).toBeFocused();
    const Add = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Add")');
    await expect(Add).toBeVisible();
    await expect(Add).not.toBeFocused();
    await expect(page).toHaveScreenshot();

    //Focus on submenu item by Enter
    await page.keyboard.press('Enter');
    await expect(Item4).not.toBeFocused();
    await expect(Add).toBeFocused();

    //Return and close all menus
    await page.keyboard.press('Escape');
    await expect(Item4).toBeFocused();
    await expect(Add).not.toBeVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await expect(ddMenu).toBeFocused();
    await expect(Menu).not.toBeVisible();
  });
});

test.describe('Dropdown-menu - Nested menus with focusable elements', () => {
  test('Keyboard interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/nested_with_focusable.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    //1st item focused when Menu expands and submenu displayed
    const ddMenu = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    await page.keyboard.press('Tab');
    await expect(ddMenu).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(ddMenu).not.toBeFocused();
    const Item1 = page.locator('[data-ui-name="DropdownMenu.Item.Content"]:has-text("Item 1")');
    const SubItem1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Item 4.1.1")');
    await expect(Item1).toBeFocused();
    await expect(SubItem1).not.toBeFocused();

    //3rd item focused and 3rd submenu shown + visual regression
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
    const Item3 = page.locator('[data-ui-name="DropdownMenu.Item.Content"]:has-text("Item 3")');
    await expect(Item3).toBeFocused();
    await expect(SubItem1).not.toBeFocused();

    //1rd item  submenu focused
    await page.keyboard.press('Enter');
    await expect(SubItem1).toBeFocused();

    //navigation  inside the sumbenu
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Dropdown-menu - On Visible controlled', () => {
  test('Keyboard interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/tests/examples/on-visible-2nd.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    //1st item focused when Menu expands
    const ddMenu = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    await page.keyboard.press('Tab');
    await expect(ddMenu).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(ddMenu).not.toBeFocused();
    const Item1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("save")');
    await expect(Item1).toBeFocused();

    //2nd item focused by 1st click on down
    await page.keyboard.press('ArrowDown');
    const Item2 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("rename")');
    await expect(Item2).toBeFocused();
  });
});
