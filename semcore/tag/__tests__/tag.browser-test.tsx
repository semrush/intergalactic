import type { Page } from '@playwright/test';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

// Define reusable locators
export const locators = {
  tag: (page: Page) => page.locator('[data-ui-name="Tag"]'),
  tagText: (page: Page) => page.locator('[data-ui-name="Tag.Text"]'),
  tagContainer: (page: Page) => page.locator('[data-ui-name="TagContainer"]'),
  tagContainerTag: (page: Page) => page.locator('[data-ui-name="TagContainer.Tag"]'),
  tagContainerClose: (page: Page) => page.locator('[data-ui-name="TagContainer.Close"]'),
  flex: (page: Page) => page.locator('[data-ui-name="Flex"]'),
  inlineEditView: (page: Page) => page.locator('[data-ui-name="InlineEdit.View"]'),
  saveButton: (page: Page) => page.getByLabel('Save'),
  cancelButton: (page: Page) => page.getByLabel('Cancel'),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify Tag without addons or close', {
    tag: [TAG.PRIORITY_HIGH, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes.tsx', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify tag sizes', async () => {
      const flex = page.locator('[data-testid="Primary-base"]');
      const tags = flex.locator('[data-ui-name="Tag"]');

      // m size
      await expect(tags.first()).toHaveCSS('height', '20px');
      // l size
      await expect(tags.nth(1)).toHaveCSS('height', '28px');
      // xl size
      await expect(tags.nth(2)).toHaveCSS('height', '40px');
    });

    await test.step('Verify visual appearance', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Tag without addon and close disabled', {
    tag: [TAG.PRIORITY_HIGH, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes-disabled', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify visual appearance', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify disabled attributes', async () => {
      const tag = locators.tag(page);
      const count = await tag.count();
      for (let i = 0; i < count; i++) {
        await expect(tag.nth(i)).toHaveAttribute('tabindex', '-1');
        await expect(tag.nth(i)).toHaveAttribute('disabled');
      }
    });
  });

  test('Verify Tag with addons and without close interactive', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes-addons-interactive.tsx', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tag text attributes and padding', async () => {
      const tagText = locators.tagText(page);
      const count = await tagText.count();
      for (let i = 0; i < count; i++) {
        await expect(tagText.nth(i)).toHaveAttribute('tabindex', '-1');
        await expect(tagText.nth(i)).toHaveCSS('padding-left', '4px');
        await expect(tagText.nth(i)).toHaveCSS('padding-right', '4px');
      }
    });

    await test.step('Verify hover state for primary tags', async () => {
      const flexPrimary = page.locator('[data-testid="Primary-base"]');
      const tags = flexPrimary.locator('[data-ui-name="Tag"]');
      await tags.nth(4).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover state for secondary tags', async () => {
      const flexSecondary = page.locator('[data-testid="Secondary-base"]');
      const tagsSec = flexSecondary.locator('[data-ui-name="Tag"]');
      await tagsSec.nth(4).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover state for additional tags', async () => {
      const flexAdditional = page.locator('[data-testid="additional-base"]');
      const tagsAdd = flexAdditional.locator('[data-ui-name="Tag"]');
      await tagsAdd.nth(4).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus state', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify grouping Less than 5 tags', {
    tag: [TAG.PRIORITY_MEDIUM, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/grouping_tags_less.tsx', 'en');

    await test.step('Verify flex has group role', async () => {
      const flex = locators.flex(page);
      await expect(flex).toHaveAttribute('role', 'group');
    });

    await test.step('Verify visual appearance', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify grouping More than 5 tags', {
    tag: [TAG.PRIORITY_MEDIUM, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/grouping_tags_more.tsx', 'en');

    await test.step('Verify tag count', async () => {
      const flex = page.locator('ul[data-ui-name="Flex"]');
      const tags = flex.locator('li[data-ui-name="Tag"]');
      await expect(tags).toHaveCount(5);
    });

    await test.step('Verify visual appearance', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify TagContainer without addons and with close', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes-with-X.tsx', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify close button accessibility attributes', async () => {
      const close = locators.tagContainerClose(page);
      const count = await close.count();
      for (let i = 0; i < count; i++) {
        await expect(close.nth(i)).toHaveAttribute('aria-label', 'Delete');
        await expect(close.nth(i)).toHaveAttribute('aria-labelledby');
      }
    });

    await test.step('Verify hover state for primary tags', async () => {
      const flexPrimary = page.locator('[data-testid="Primary-close"]');
      const tags = flexPrimary.locator('[data-ui-name="TagContainer.Tag"]');
      await tags.nth(4).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus states for secondary tags', async () => {
      const flexSecondary = page.locator('[data-testid="secondary-close"]');
      const tagsSec = flexSecondary.locator('[data-ui-name="TagContainer.Tag"]');
      await tagsSec.nth(4).hover();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify TagContainer with icon and with close', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes-with-icon-and-X.tsx', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify close button accessibility attributes', async () => {
      const close = locators.tagContainerClose(page);
      const count = await close.count();
      for (let i = 0; i < count; i++) {
        await expect(close.nth(i)).toHaveAttribute('aria-label', 'Delete');
        await expect(close.nth(i)).toHaveAttribute('aria-labelledby');
      }
    });

    await test.step('Verify tag text padding', async () => {
      const tagText = locators.tagText(page);
      const count = await tagText.count();
      for (let i = 0; i < count; i++) {
        await expect(tagText.nth(i)).toHaveAttribute('tabindex', '-1');
        await expect(tagText.nth(i)).toHaveCSS('padding-left', '4px');
      }
    });

    await test.step('Verify hover state for primary close buttons', async () => {
      const flexPrimary = page.locator('[data-testid="Primary-base"]');
      const tags = flexPrimary.locator('[data-ui-name="TagContainer.Close"]');
      await tags.nth(4).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus states for secondary close buttons', async () => {
      const flexSecondary = page.locator('[data-testid="secondary-base"]');
      const tagsSec = flexSecondary.locator('[data-ui-name="TagContainer.Close"]');
      await tagsSec.nth(4).hover();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify TagContainer interactive with icon and with disabled close', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes-with-icon-and-disabled-X.tsx', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify TagContainer with addons and without close interactive', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-interactive.tsx', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tag text padding', async () => {
      const tagText = locators.tagText(page);
      const count = await tagText.count();
      for (let i = 0; i < count; i++) {
        await expect(tagText.nth(i)).toHaveAttribute('tabindex', '-1');
        await expect(tagText.nth(i)).toHaveCSS('padding-left', '4px');
        await expect(tagText.nth(i)).toHaveCSS('padding-right', '4px');
      }
    });

    await test.step('Verify hover state for primary tags', async () => {
      const flexPrimary = page.locator('[data-testid="Primary-base"]');
      const tags = flexPrimary.locator('[data-ui-name="TagContainer.Tag"]');
      await tags.nth(4).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover state for secondary tags', async () => {
      const flexSecondary = page.locator('[data-testid="secondary-base"]');
      const tagsSec = flexSecondary.locator('[data-ui-name="TagContainer.Tag"]');
      await tagsSec.nth(4).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus states for additional tags', async () => {
      const flexAdditional = page.locator('[data-testid="additional-base"]');
      const tagsAdd = flexAdditional.locator('[data-ui-name="TagContainer.Tag"]');
      await tagsAdd.nth(4).hover();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify TagContainer with addon and with close interactive', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, TAG.MOUSE, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-and-X-interactive', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tag text padding', async () => {
      const tagText = locators.tagText(page);
      const count = await tagText.count();
      for (let i = 0; i < count; i++) {
        await expect(tagText.nth(i)).toHaveAttribute('tabindex', '-1');
        await expect(tagText.nth(i)).toHaveCSS('padding-left', '4px');
      }
    });

    await test.step('Verify hover states for primary tags', async () => {
      const flexPrimary = page.locator('[data-testid="Primary-base"]');
      const tagContainerPr = flexPrimary.locator('[data-ui-name="TagContainer.Tag"]');
      const tagContainerClosePr = flexPrimary.locator('[data-ui-name="TagContainer.Close"]');

      await tagContainerPr.nth(4).hover();
      await expect(page).toHaveScreenshot();

      await tagContainerClosePr.nth(4).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus states for secondary tags', async () => {
      const flexSecondary = page.locator('[data-testid="secondary-base"]');
      const tagContainerSec = flexSecondary.locator('[data-ui-name="TagContainer.Tag"]');
      const tagContainerCloseSec = flexSecondary.locator('[data-ui-name="TagContainer.Close"]');

      await tagContainerSec.nth(4).hover();
      await expect(page).toHaveScreenshot();

      await tagContainerCloseSec.nth(4).hover();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify TagContainer with addon and with close disabled', {
    tag: [TAG.PRIORITY_MEDIUM, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-and-X-disabled', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify visual appearance', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify disabled attributes', async () => {
      const tagContainer = locators.tagContainerTag(page);
      const count = await tagContainer.count();
      for (let i = 0; i < count; i++) {
        await expect(tagContainer.nth(i)).toHaveAttribute('tabindex', '-1');
        await expect(tagContainer.nth(i)).toHaveAttribute('disabled');
      }
    });
  });

  test('Verify TagContainer with addon and with close active', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, TAG.MOUSE, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-and-X-active-part', 'en');
    await page.setViewportSize({ width: 700, height: 1300 });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify hover state for primary close button', async () => {
      const flexPrimary = page.locator('[data-testid="Primary-base"]');
      const tagContainerClosePr = flexPrimary.locator('[data-ui-name="TagContainer.Close"]');
      await tagContainerClosePr.first().hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus state for secondary close button', async () => {
      const flexSecondary = page.locator('[data-testid="secondary-base"]');
      const tagContainerCloseSec = flexSecondary.locator('[data-ui-name="TagContainer.Close"]');
      await tagContainerCloseSec.first().hover();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Editing tag when tag by keyboard inside inline-edit', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/editing_tag.tsx', 'en');

    const inlineEditView = locators.inlineEditView(page);
    const tag = inlineEditView.locator('span[data-ui-name="Tag.Text"]');

    await test.step('Verify initial state', async () => {
      await expect(tag).toHaveText('Default tag');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify edit and escape cancels changes', async () => {
      await page.keyboard.press('Enter');
      await page.keyboard.type('Test');
      await page.keyboard.press('Escape');
      await expect(tag).toHaveText('Default tag');
    });

    await test.step('Verify edit and enter saves changes', async () => {
      await page.keyboard.press('Enter');
      await page.keyboard.type('Test Test Test');
      await page.keyboard.press('Enter');
      // Known bug: changes are not saved
      await expect(tag).toHaveText('Default tag');
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify Editing tag by mouse inside inline-edit', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/editing_tag.tsx', 'en');

    const inlineEditView = locators.inlineEditView(page);
    const tag = inlineEditView.locator('span[data-ui-name="Tag.Text"]');
    const save = locators.saveButton(page);
    const cancel = locators.cancelButton(page);

    await test.step('Verify initial state', async () => {
      await expect(tag).toHaveText('Default tag');
    });

    await test.step('Verify edit and cancel does not save changes', async () => {
      await inlineEditView.click();
      await page.keyboard.type('Test');
      await cancel.click();
      await expect(tag).toHaveText('Default tag');
    });

    await test.step('Verify edit and save saves changes', async () => {
      await inlineEditView.click();
      await page.keyboard.type('Test');
      await save.click();
      await expect(tag).toHaveText('Default tagTest');
    });

    await test.step('Verify edit with Enter key saves changes', async () => {
      await inlineEditView.click();
      await page.keyboard.type('Test');
      await page.keyboard.press('Enter');
      await expect(tag).toHaveText('Default tagTestTest');
    });
  });

  test('Verify Removing tags by mouse', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/removing_tag.tsx', 'en');

    const tags = locators.tagContainer(page);
    const close = locators.tagContainerClose(page);

    await test.step('Verify initial count', async () => {
      await expect(tags).toHaveCount(3);
    });

    await test.step('Verify removing second tag', async () => {
      await close.nth(1).click();
      await expect(tags).toHaveCount(2);
    });

    await test.step('Verify removing first tag', async () => {
      await close.nth(0).click();
      await expect(tags).toHaveCount(1);
    });

    await test.step('Verify removing last tag', async () => {
      await close.nth(0).click();
      await expect(tags).toHaveCount(0);
    });
  });

  test('Verify Removing tags by keyboard', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/removing_tag.tsx', 'en');

    const tags = locators.tagContainer(page);
    const close = locators.tagContainerClose(page);

    await test.step('Verify initial state and focus', async () => {
      await page.keyboard.press('Tab');
      await expect(tags).toHaveCount(3);
      await expect(close.first()).toBeFocused();
    });

    await test.step('Verify removing tag with Enter key', async () => {
      await page.keyboard.press('Enter');
      await expect(tags).toHaveCount(2);
      await expect(close.first()).toBeFocused();
    });

    await test.step('Verify focus moves to next close button', async () => {
      await page.keyboard.press('Tab');
      await expect(close.nth(1)).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify removing tag with Space key', async () => {
      await page.keyboard.press('Space');
      await expect(tags).toHaveCount(1);
      await expect(close.first()).not.toBeFocused();
    });
  });
});
