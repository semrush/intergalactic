import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variables = [
    { placement: false },
    { placement: 'top' },
    { placement: 'bottom' },
    { placement: 'left' },
    { placement: 'right' },
  ];
  variables.forEach((item) => {
    test(`Verify Dnd when drag-and-drop marker position is ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/drag-and-drop/tests/examples/with-cards-all-props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.locator('[data-ui-name="Card.Header"]').nth(1).hover();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify DnD in DD menu when interacting by mouse', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const dragAndDropTrigger = page.getByRole('button');
    const menuItems = page.getByRole('menuitemcheckbox');
    await dragAndDropTrigger.click();
    await menuItems.first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await menuItems.nth(1).hover();
    await expect(page).toHaveScreenshot();

    await menuItems.nth(1).dragTo(menuItems.nth(4));
    await expect(page).toHaveScreenshot();
  });

  test('Verify DnD in DD menu when interacting by keyboard', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const menuItems = page.getByRole('menuitemcheckbox');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await menuItems.first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();
  });

  test('Verify DnD in Tab panel', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/tests/examples/with_tabpanel.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const items = page.locator('[data-ui-name="DragAndDrop.Draggable"]');
    await items.nth(1).hover();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional - With cards', () => {
  test('Verify mouse interactions with draggable cards', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_cards.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const dragAndDropContainer = page.locator('[data-ui-name="DragAndDrop"]');
    const dropZone = page.locator('[data-ui-name="DragAndDrop.DropZone"]');
    const draggable = page.locator('div[data-ui-name="DragAndDrop.Draggable"]');

    const draggableMarketTraffic = page.locator('[aria-label="Market traffic widget"]');
    const allItems = dragAndDropContainer.locator('> *');

    await test.step('Verify attributes', async () => {
      await expect(dragAndDropContainer).toHaveAttribute('role', 'group');
      const dropCount = await dropZone.count();
      for (let i = 0; i < dropCount; i++) {
        await expect(dropZone.nth(i)).toHaveAttribute('role', 'group');
        await expect(dropZone.nth(i)).toHaveAttribute('draggable', 'false');
      }
      const dragCount = await draggable.count();
      for (let i = 0; i < dragCount; i++) {
        await expect(draggable.nth(i)).toHaveAttribute('role', 'group');
        await expect(draggable.nth(i)).toHaveAttribute('draggable', 'true');
        await expect(draggable.nth(i)).toHaveAttribute('tabindex', '0');
        await expect(draggable.nth(i)).toHaveAttribute('aria-describedby');
      }
    });

    await test.step('Verify graggable items can be moved to the drop zone', async () => {
      await draggableMarketTraffic.waitFor({ state: 'visible' });
      await draggableMarketTraffic.dragTo(dropZone.nth(0));
      await expect(allItems.first()).toHaveAttribute('data-ui-name', 'DragAndDrop.Draggable');
    });
  });

  test('Verify keyboard interactions with draggable cards', async ({ page, browserName }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_cards.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    if (browserName === 'webkit') return;
    const dragAndDropContainer = page.locator('[data-ui-name="DragAndDrop"]');
    const dropZone = page.locator('[data-ui-name="DragAndDrop.DropZone"]');
    const draggable = page.locator('div[data-ui-name="DragAndDrop.Draggable"]');
    const allItems = dragAndDropContainer.locator('> *');

    await page.keyboard.press('Tab');
    await expect(dropZone.first()).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(draggable.first()).toBeFocused();
    await test.step('Verify graggable items can be moved to the drop zone', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);
      await expect(page.getByRole('alert')).toHaveCount(1);
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(100);
      await page.keyboard.press('Space');
      await expect(draggable.first()).toBeFocused();

      const firstItem = allItems.first();
      await expect(firstItem).toHaveAttribute('data-ui-name', 'DragAndDrop.Draggable');
    });

    await test.step('Verify Escape cancels moving', async () => {
      await page.keyboard.press('Space');
      await expect(page.getByRole('alert')).toHaveCount(1);
      await page.keyboard.press('Escape');
      await expect(page.getByRole('alert')).toHaveCount(0);
      await expect(draggable.first()).toBeFocused();
      await page.keyboard.press('ArrowRight');
      const firstItem = allItems.first();
      await expect(firstItem).toHaveAttribute('data-ui-name', 'DragAndDrop.Draggable');
    });
  });
});

test.describe('Functional - With dropdown', () => {
  test('Verify mouse interactions when dnd in dropdown', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const dragAndDropTrigger = page.getByRole('button');
    const DDMenuItems = page.getByRole('menuitemcheckbox');

    await dragAndDropTrigger.click();
    await DDMenuItems.nth(1).waitFor({ state: 'visible' });
    const itemsCount = await DDMenuItems.count();
    await test.step('Verify attributes', async () => {
      for (let i = 0; i < itemsCount; i++) {
        await expect(DDMenuItems.nth(i)).toHaveAttribute('draggable', 'true');
      }
    });
    await test.step('Verify items can be moved by mouse', async () => {
      await DDMenuItems.nth(0).dragTo(DDMenuItems.nth(4));
      await expect(DDMenuItems.last()).toHaveText('Unique Pageviews');
    });

    await test.step('Verify items can be checked and unchecked', async () => {
      await expect(DDMenuItems.last()).toHaveAttribute('aria-checked', 'true');
      await DDMenuItems.last().click();
      await expect(DDMenuItems.last()).toHaveAttribute('aria-checked', 'false');
    });

    await test.step('Verify select all works', async () => {
      await page.getByRole('button', { name: 'Select all' }).click();
      for (let i = 0; i < itemsCount; i++) {
        await expect(DDMenuItems.nth(i)).toHaveAttribute('aria-checked', 'true');
      }
    });

    await test.step('Verify deselect all works', async () => {
      await page.getByRole('button', { name: 'Deselect all' }).click();
      for (let i = 0; i < itemsCount; i++) {
        await expect(DDMenuItems.nth(i)).toHaveAttribute('aria-checked', 'false');
      }
    });

    await test.step('Verify reset to default works', async () => {
      await page.getByRole('button', { name: 'Reset to default' }).click();
      await expect(DDMenuItems.last()).toHaveAttribute('aria-checked', 'true');
      await expect(DDMenuItems.last()).toHaveText('Unique Pageviews');
      await expect(DDMenuItems.first()).toHaveAttribute('aria-checked', 'false');
    });
  });

  test('Verify keyboard interactions when dnd in dropdown', async ({ page }) => {
    const standPath = 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const DDMenuItems = page.getByRole('menuitemcheckbox');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await DDMenuItems.nth(1).waitFor({ state: 'visible' });
    await expect(DDMenuItems.nth(0)).toBeFocused();

    await test.step('Verify items can be moved by keyboard', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);

      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(100);
      }
      await page.keyboard.press('Space');

      await expect(DDMenuItems.last()).toHaveText('Unique Pageviews');
      await expect(DDMenuItems.last()).toBeFocused();
    });

    await test.step('Verify items can be unchecked when grabbed', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Enter');
      await expect(DDMenuItems.last()).toHaveAttribute('aria-checked', 'false');
      await page.keyboard.press('Escape');
      await expect(DDMenuItems.last()).toHaveText('Unique Pageviews');
      await expect(DDMenuItems.last()).toBeFocused();
    });

    await test.step('Verify Focus order', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Reset to default' })).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(DDMenuItems.last()).toBeFocused();
    });

    await test.step('Verify Reset to default returns checkoxes in initial state', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Reset to default' })).toBeFocused();

      await page.keyboard.press('Enter');
      await expect(DDMenuItems.last()).toHaveAttribute('aria-checked', 'true');
    });

    await test.step('Verify Select all works and does not affect order after drag and drop', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Select all' })).toBeFocused();
      await page.keyboard.press('Enter');

      const itemsCount = await DDMenuItems.count();
      for (let i = 0; i < itemsCount; i++) {
        await expect(DDMenuItems.nth(i)).toHaveAttribute('aria-checked', 'true');
      }
    });

    await test.step('Verify Closing dd menu and opening again save order', async () => {
      await page.keyboard.press('Escape');
      await DDMenuItems.nth(1).waitFor({ state: 'hidden' });
      await page.keyboard.press('Enter');
      await DDMenuItems.nth(1).waitFor({ state: 'visible' });

      const itemsCount = await DDMenuItems.count();
      for (let i = 0; i < itemsCount; i++) {
        await expect(DDMenuItems.nth(i)).toHaveAttribute('aria-checked', 'true');
      }
      await expect(DDMenuItems.last()).toHaveText('Unique Pageviews');
    });
  });
});
