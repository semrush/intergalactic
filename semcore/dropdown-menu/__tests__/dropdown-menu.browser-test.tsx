import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Dropdown-menu', () => {
  test('Should render white shadows in list', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/the_second_method.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    const menuItem5 = page.getByRole('menuitem', { name: 'Menu item 5' });
    await expect(menuItem5).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(menuItem5).toBeFocused();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowDown');
    const menuItem6 = page.getByRole('menuitem', { name: 'Menu item 6' });
    await expect(menuItem6).toBeFocused();
    await expect(page).toHaveScreenshot();
  });
  test('Should close by second click on trigger', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    await expect(page.getByRole('menu')).toBeVisible();

    const button = page.locator('button', { hasText: 'Actions' });
    await button.click();

    await page.waitForTimeout(500);
    await expect(page.getByRole('menu')).not.toBeVisible();
  });
});

test.describe('Dropdown-menu - Item actions', () => {
  test('Keyboard interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/item_actions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    //1st item focused when Menu expands
    const ddMenu = page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    await page.keyboard.press('Tab');
    await expect(ddMenu).toBeFocused();

    const Menu = page.locator('[data-ui-name="DropdownMenu.Popper"]');
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
    await page.keyboard.press('ArrowRight');
    await expect(MathPlus).toBeFocused();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowRight');
    await expect(Trash).toBeFocused();

    //Escape returns focus in menu item, hints hidden
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
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
    await expect(Add).not.toBeVisible();
    await expect(page).toHaveScreenshot();

    //Focus on submenu item by Enter
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await expect(Item4).not.toBeFocused();
    await expect(Add).toBeVisible();
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

    //1st item focused when Menu expands and submenu don't displayed
    const ddMenu = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    await page.keyboard.press('Tab');
    await expect(ddMenu).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(ddMenu).not.toBeFocused();
    const Item1 = page.locator('[data-ui-name="DropdownMenu.Item.Content"]:has-text("Item 1")');
    const SubItem1 = page.locator('[data-ui-name="DropdownMenu.Item"]:has-text("Item 4.1.1")');
    await expect(Item1).toBeFocused();
    await expect(SubItem1).not.toBeVisible();

    //3rd item focused and 3rd submenu shown + visual regression
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
    const Item3 = page.locator('[data-ui-name="DropdownMenu.Item.Content"]:has-text("Item 3")');
    await expect(Item3).toBeFocused();

    //1st item  submenu focused
    await page.keyboard.press('Enter');
    await expect(SubItem1).toBeVisible();
    await expect(SubItem1).toBeFocused();

    //Input number focused and focus not loast by clicking up/down
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    const input1 = page.locator('input[data-ui-name="InputNumber.Value"][placeholder="1"]');
    await expect(input1).toBeFocused();

    //Apply btn focused and focus not loast by clicking up/down
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    const button = page.locator('button[data-ui-name="Button"]:has-text("Apply")');
    await expect(button).toBeFocused();
    await expect(SubItem1).not.toBeFocused();
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

test.describe('Dropdown-menu - Selectable radio items', () => {
  test('Keyboard interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/selectable_radio_items.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    //1st item focused when Menu expands
    const ddMenuTrigger = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    await page.keyboard.press('Tab');
    await expect(ddMenuTrigger).toBeFocused();
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 250));
    await expect(ddMenuTrigger).not.toBeFocused();
    const Item1 = page
      .locator('[data-ui-name="DropdownMenu.Item.Content"]')
      .filter({ hasText: /^Menu item 1$/ });
    await expect(Item1).toBeFocused();

    //The DD closed by Enter (no focus on intercative element)
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 250));
    await expect(ddMenuTrigger).toBeFocused();
    await expect(Item1).not.toBeVisible();
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 250));

    //Focus on interactive element by right arrow
    await page.keyboard.press('ArrowRight');
    await new Promise((resolve) => setTimeout(resolve, 500));
    const deleteButton1 = page
      .locator('[data-ui-name="DropdownMenu.Item"]')
      .filter({ hasText: /^Menu item 1$/ })
      .locator('button[aria-label="Delete item"]');
    await expect(deleteButton1).toBeFocused();
    await expect(page).toHaveScreenshot();

    //Remove focus on interactive element by left arrow
    await page.keyboard.press('ArrowLeft');
    await expect(deleteButton1).not.toBeFocused();
    await expect(Item1).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    await page.keyboard.press('Escape');
    await expect(ddMenuTrigger).toBeFocused();
    await expect(Item1).not.toBeVisible();
    await expect(ddMenuTrigger).toBeFocused();
  });
});

test.describe('Dropdown-menu - Multiselect items', () => {
  test('Keyboard interaction', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/multiselect_items.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    //1st item focused when Menu expands
    const ddMenuTrigger = await page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    await page.keyboard.press('Tab');
    await expect(ddMenuTrigger).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(ddMenuTrigger).not.toBeFocused();
    const Item1 = page
      .locator('[data-ui-name="DropdownMenu.Item"]')
      .filter({ hasText: /^Menu item 1$/ });
    const Item2 = page
      .locator('[data-ui-name="DropdownMenu.Item"]')
      .filter({ hasText: /^Menu item 2$/ });
    await Item1.waitFor({ state: 'visible' });
    await expect(Item1).toBeFocused();

    //The DD not closed by Enter, the item unchecks
    await page.keyboard.press('Enter');
    await expect(Item1).not.toBeChecked();
    await expect(Item2).toBeChecked();
    await expect(page).toHaveScreenshot();

    //Click up arrow and focus on last item
    await page.keyboard.press('ArrowUp');
    const Item10 = page
      .locator('[data-ui-name="DropdownMenu.Item"]')
      .filter({ hasText: /^Menu item 10$/ });
    await Item10.waitFor({ state: 'visible' });
    await expect(Item10).toBeFocused();
    await expect(page).toHaveScreenshot();

    //Check last item and close menu by eas
    await page.keyboard.press('Space');
    await expect(Item10).toBeChecked();
    await page.keyboard.press('Escape');
    await expect(Item10).not.toBeVisible();
    await expect(ddMenuTrigger).toBeFocused();

    //open menu and focus on the first selected item
    await page.keyboard.press('Enter');
    await Item2.waitFor({ state: 'visible' });
    await expect(Item2).toBeFocused();
    await expect(Item2).toBeChecked();
    await expect(ddMenuTrigger).not.toBeFocused();
  });
});

test.describe('Dropdown-menu - Virtual scroll', () => {
  test('Keyboard interaction', async ({ page, browserName }) => {
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

    if (browserName === 'firefox') return; //because of bug on firefox UIK-3349
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

  test('Mouse interaction', async ({ page, browserName }) => {
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
