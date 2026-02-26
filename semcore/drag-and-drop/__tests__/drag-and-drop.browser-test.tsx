import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  menuItems: (page: Page, index?: number) => {
    const base = page.getByRole('menuitemcheckbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dragAndDropContainer: (page: Page) => page.locator('[data-ui-name="DragAndDrop"]'),
  dropZone: (page: Page) => page.locator('[data-ui-name="DragAndDrop.DropZone"]'),
  draggable: (page: Page) => page.locator('[data-ui-name="DragAndDrop.Draggable"]'),
};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  const variables = [
    { placement: false },
    { placement: 'top' },
    { placement: 'bottom' },
    { placement: 'left' },
    { placement: 'right' },
  ];
  variables.forEach((item) => {
    test(`Verify Dnd when drag-and-drop marker position is ${item.placement}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@drag-and-drop',
        '@card'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/drag-and-drop/tests/examples/with-cards-all-props.tsx', 'en', item);

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

  test('Verify DnD in DD menu when interacting by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@drag-and-drop',
      '@button',
      '@dropdown-menu',
      '@counter'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx', 'en');

    await locators.button(page).click();
    await locators.menuItems(page, 0).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await locators.menuItems(page, 1).hover();
    await expect(page).toHaveScreenshot();

    await locators.menuItems(page, 1).dragTo(locators.menuItems(page, 4));
    // Wait for drag animation and DOM update to complete
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot();
  });

  test('Verify DnD in DD menu when interacting by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@drag-and-drop',
      '@button',
      '@dropdown-menu',
      '@counter'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await locators.menuItems(page, 0).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();
    await page.waitForTimeout(200);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();
  });

  test('Verify DnD in Tab panel', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@drag-and-drop',
      '@counter',
      '@flags',
      '@tab-panel'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/drag-and-drop/tests/examples/with_tabpanel.tsx', 'en');

    await locators.draggable(page).nth(1).hover();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test.describe('With cards', () => {
    test('Verify mouse interactions with draggable cards', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@drag-and-drop',
        '@card'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_cards.tsx', 'en');

      const draggableMarketTraffic = page.locator('[aria-label="Market traffic widget"]');
      const allItems = locators.dragAndDropContainer(page).locator('> *');

      await test.step('Verify attributes', async () => {
        await expect(locators.dragAndDropContainer(page)).toHaveAttribute('role', 'group');
        const dropCount = await locators.dropZone(page).count();
        for (let i = 0; i < dropCount; i++) {
          await expect(locators.dropZone(page).nth(i)).toHaveAttribute('role', 'group');
          await expect(locators.dropZone(page).nth(i)).toHaveAttribute('draggable', 'false');
        }
        const dragCount = await locators.draggable(page).count();
        for (let i = 0; i < dragCount; i++) {
          await expect(locators.draggable(page).nth(i)).toHaveAttribute('role', 'group');
          await expect(locators.draggable(page).nth(i)).toHaveAttribute('draggable', 'true');
          await expect(locators.draggable(page).nth(i)).toHaveAttribute('tabindex', '0');
          await expect(locators.draggable(page).nth(i)).toHaveAttribute('aria-describedby');
        }
      });

      await test.step('Verify graggable items can be moved to the drop zone', async () => {
        await draggableMarketTraffic.waitFor({ state: 'visible' });
        await draggableMarketTraffic.dragTo(locators.dropZone(page).nth(0));
        // Wait for DOM to update after drag operation
        await expect.poll(
          async () => await allItems.first().getAttribute('data-ui-name'),
          {
            timeout: 3000,
          },
        ).toBe('DragAndDrop.Draggable');
      });
    });

    test('Verify keyboard interactions with draggable cards', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@drag-and-drop',
        '@card'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_cards.tsx', 'en');

      const allItems = locators.dragAndDropContainer(page).locator('> *');

      await page.keyboard.press('Tab');
      await expect(locators.dropZone(page).first()).toBeFocused();
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200); // added timeout because of slow animation of this component
      await expect(locators.draggable(page).first()).toBeFocused();
      await test.step('Verify graggable items can be moved to the drop zone', async () => {
        await page.keyboard.press('Space');
        await page.waitForTimeout(100);

        await expect(locators.draggable(page).first()).toHaveClass(/keyboardDragging/, { timeout: 200 });
        await expect(page.getByRole('alert')).toHaveCount(1);
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(100);

        await page.keyboard.press('Space');
        await page.waitForTimeout(200);

        await expect(locators.draggable(page).first()).toBeFocused();

        // Skip this check on webkit - drag and drop doesn't work properly with keyboard navigation
        if (browserName !== 'webkit') {
          await expect(allItems.first()).toHaveAttribute('data-ui-name', 'DragAndDrop.Draggable');
        }
      });

      await test.step('Verify Escape cancels moving', async () => {
        await page.keyboard.press('Space');
        await expect(page.getByRole('alert')).toHaveCount(1);
        await page.keyboard.press('Escape');
        await expect(page.getByRole('alert')).toHaveCount(0);
        await expect(locators.draggable(page).first()).toBeFocused();
        await page.keyboard.press('ArrowRight');
        await expect(allItems.first()).toHaveAttribute('data-ui-name', 'DragAndDrop.Draggable');
      });
    });
  });

  test.describe('With dropdown', () => {
    test('Verify mouse interactions when dnd in dropdown', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@drag-and-drop',
        '@button',
        '@dropdown-menu',
        '@counter'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx', 'en');

      await locators.button(page).click();
      await locators.menuItems(page, 1).waitFor({ state: 'visible' });
      const itemsCount = await locators.menuItems(page).count();
      await test.step('Verify attributes', async () => {
        for (let i = 0; i < itemsCount; i++) {
          await expect(locators.menuItems(page, i)).toHaveAttribute('draggable', 'true');
        }
      });
      await test.step('Verify items can be moved by mouse', async () => {
        await locators.menuItems(page, 0).dragTo(locators.menuItems(page, 4));
        await expect(locators.menuItems(page).last()).toHaveText('Unique Pageviews');
      });

      await test.step('Verify items can be checked and unchecked', async () => {
        await expect(locators.menuItems(page).last()).toHaveAttribute('aria-checked', 'true');
        await locators.menuItems(page).last().click();
        await expect(locators.menuItems(page).last()).toHaveAttribute('aria-checked', 'false');
      });

      await test.step('Verify select all works', async () => {
        await page.getByRole('button', { name: 'Select all' }).click();
        for (let i = 0; i < itemsCount; i++) {
          await expect(locators.menuItems(page, i)).toHaveAttribute('aria-checked', 'true');
        }
      });

      await test.step('Verify deselect all works', async () => {
        await page.getByRole('button', { name: 'Deselect all' }).click();
        for (let i = 0; i < itemsCount; i++) {
          await expect(locators.menuItems(page, i)).toHaveAttribute('aria-checked', 'false');
        }
      });

      await test.step('Verify reset to default works', async () => {
        await locators.button(page, 'Reset to default').click();
        await expect(locators.menuItems(page).last()).toHaveAttribute('aria-checked', 'true');
        await expect(locators.menuItems(page).last()).toHaveText('Unique Pageviews');
        await expect(locators.menuItems(page, 0)).toHaveAttribute('aria-checked', 'false');
      });
    });

    test('Verify keyboard interactions when dnd in dropdown', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@drag-and-drop',
        '@button',
        '@dropdown-menu',
        '@counter'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/drag-and-drop/docs/examples/with_dropdownmenu.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.menuItems(page, 1).waitFor({ state: 'visible' });
      await expect(locators.menuItems(page, 0)).toBeFocused();

      await test.step('Verify items can be moved by keyboard', async () => {
        await page.keyboard.press('Space');

        await expect.poll(
          async () => {
            return await locators.menuItems(page, 0).getAttribute('class');
          },
          {
            timeout: 200,
          },
        ).toMatch(/keyboardDragging/);

        for (let i = 0; i < 4; i++) {
          await page.keyboard.press('ArrowDown');
          await page.waitForTimeout(50);
        }
        await page.keyboard.press('Space');

        await expect(locators.menuItems(page).last()).toHaveText('Unique Pageviews');
        await expect(locators.menuItems(page).last()).toBeFocused();
      });

      await test.step('Verify items can be unchecked when grabbed', async () => {
        await page.keyboard.press('Space');
        await page.keyboard.press('Enter');
        await expect(locators.menuItems(page).last()).toHaveAttribute('aria-checked', 'false');
        await page.keyboard.press('Escape');
        await expect(locators.menuItems(page).last()).toHaveText('Unique Pageviews');
        await expect(locators.menuItems(page).last()).toBeFocused();
      });

      await test.step('Verify Focus order', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Reset to default')).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(locators.menuItems(page).last()).toBeFocused();
      });

      await test.step('Verify Reset to default returns checkoxes in initial state', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.button(page, 'Reset to default')).toBeFocused();

        await page.keyboard.press('Enter');
        await expect(locators.menuItems(page).last()).toHaveAttribute('aria-checked', 'true');
      });

      await test.step('Verify Select all works and does not affect order after drag and drop', async () => {
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: 'Select all' })).toBeFocused();
        await page.keyboard.press('Enter');

        const itemsCount = await locators.menuItems(page).count();
        for (let i = 0; i < itemsCount; i++) {
          await expect(locators.menuItems(page, i)).toHaveAttribute('aria-checked', 'true');
        }
      });

      await test.step('Verify Closing dd menu and opening again save order', async () => {
        await page.keyboard.press('Escape');
        await locators.menuItems(page, 1).waitFor({ state: 'hidden' });
        await page.keyboard.press('Enter');
        await locators.menuItems(page, 1).waitFor({ state: 'visible' });

        const itemsCount = await locators.menuItems(page).count();
        for (let i = 0; i < itemsCount; i++) {
          await expect(locators.menuItems(page, i)).toHaveAttribute('aria-checked', 'true');
        }
        await expect(locators.menuItems(page).last()).toHaveText('Unique Pageviews');
      });
    });
  });
});
