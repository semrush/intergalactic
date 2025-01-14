import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('With cards', () => {
  test('Mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_cards.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const dragAndDropContainer = page.locator('div[data-ui-name="DragAndDrop"]');
    const draggableCard = page.locator(
      'div[data-ui-name="DragAndDrop.Draggable"][aria-label="Market traffic widget"]',
    );
    const firstFlexBlock = page
      .locator('div[data-ui-name="Flex"]:has-text("Place widget here")')
      .first();

    await expect(draggableCard).toBeVisible();
    await expect(firstFlexBlock).toBeVisible();

    await draggableCard.dragTo(firstFlexBlock);

    await expect(draggableCard).toBeVisible();
    await expect(firstFlexBlock).toBeVisible();

    const allItems = dragAndDropContainer.locator('> *');
    const firstItem = allItems.first();
    await expect(firstItem).toHaveAttribute('data-ui-name', 'DragAndDrop.Draggable');
  });

  test('Keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_cards.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const dragAndDropContainer = page.locator('div[data-ui-name="DragAndDrop"]');
    const draggableCard = page.locator(
      'div[data-ui-name="DragAndDrop.Draggable"][aria-label="Market traffic widget"]',
    );
    const firstFlexBlock = page
      .locator('div[data-ui-name="Flex"]:has-text("Place widget here")')
      .first();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(draggableCard).toBeFocused();
    await expect(firstFlexBlock).not.toBeFocused();

    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(50);
    await page.keyboard.press('Space');
    await expect(draggableCard).toBeFocused();
    await expect(firstFlexBlock).not.toBeFocused();

    const allItems = dragAndDropContainer.locator('> *');
    const firstItem = allItems.first();
    await expect(firstItem).toHaveAttribute('data-ui-name', 'DragAndDrop.Draggable');
  });
});

test.describe('With dropdown', () => {
  test('Mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const dragAndDropTrigger = page.getByRole('button', { name: 'Manage columns 2/' });
    await dragAndDropTrigger.click();
    const DDMenu = page.locator('div[data-ui-name="DropdownMenu.Popper"]');
    await expect(DDMenu).toBeVisible();
    const uniquePageviewsItem = page.locator(
      'div[data-ui-name="DropdownMenu.Item"]:has-text("Unique Pageviews")',
    );
    const mobileItem = page.locator('div[data-ui-name="DropdownMenu.Item"]:has-text("Mobile")');

    await uniquePageviewsItem.dragTo(mobileItem);

    await expect(uniquePageviewsItem).toBeVisible();
    await expect(mobileItem).toBeVisible();

    const dragAndDropContainer = page.locator('div[data-ui-name="DragAndDrop"]');
    const dropdownItems = dragAndDropContainer.locator('div[data-ui-name="DropdownMenu.Item"]');

    await expect(dropdownItems.last()).toHaveText('Unique Pageviews');
  });

  test('Keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await page.keyboard.press('Space');
    await page.waitForTimeout(10);

    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);
    }
    await page.keyboard.press('Space');
    const dragAndDropContainer = page.locator('div[data-ui-name="DragAndDrop"]');
    const dropdownItems = dragAndDropContainer.locator('div[data-ui-name="DropdownMenu.Item"]');

    await expect(dropdownItems.last()).toHaveText('Unique Pageviews');
  });
});
