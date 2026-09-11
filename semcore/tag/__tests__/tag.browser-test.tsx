import type { Page } from '@playwright/test';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  tag: (page: Page) => page.locator('[data-ui-name="Tag"]'),
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
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
  test.describe('Base states and styles', () => {
    const tagVariables = [
      // Base tags without addons (sizes m, l, xl). `color` is only supported by the primary theme.
      { size: 'm', theme: 'primary', color: 'gray-500', disabled: false, interactive: false, showAddonLeft: false, showAddonRight: false, useTagContainer: false, showClose: false },
      { size: 'l', theme: 'secondary', disabled: false, interactive: false, showAddonLeft: false, showAddonRight: false, useTagContainer: false, showClose: false },
      { size: 'xl', theme: 'additional', disabled: false, interactive: false, showAddonLeft: false, showAddonRight: false, useTagContainer: false, showClose: false },

      // Disabled state - pairwise with theme/color
      { size: 'm', theme: 'primary', color: 'salad-500', disabled: true, interactive: false, showAddonLeft: false, showAddonRight: false, useTagContainer: false, showClose: false },
      { size: 'm', theme: 'additional', disabled: true, interactive: false, showAddonLeft: false, showAddonRight: false, useTagContainer: false, showClose: false },

      // Invert on a dark background - all three themes, pairwise with sizes
      { size: 'm', theme: 'primary', invert: true, color: 'blue-500', disabled: false, interactive: false, showAddonLeft: false, showAddonRight: false, useTagContainer: false, showClose: false },
      { size: 'l', theme: 'secondary', invert: true, disabled: false, interactive: false, showAddonLeft: false, showAddonRight: false, useTagContainer: false, showClose: false },
      { size: 'xl', theme: 'additional', invert: true, disabled: false, interactive: false, showAddonLeft: true, showAddonRight: false, useTagContainer: false, showClose: false },

      // Interactive with addons
      { size: 'm', theme: 'primary', color: 'orange-500', disabled: false, interactive: true, showAddonLeft: true, showAddonRight: true, useTagContainer: false, showClose: false },
      { size: 'm', theme: 'secondary', disabled: false, interactive: true, showAddonLeft: true, showAddonRight: true, useTagContainer: false, showClose: false },
      { size: 'm', theme: 'additional', disabled: false, interactive: true, showAddonLeft: true, showAddonRight: true, useTagContainer: false, showClose: false },

      // TagContainer with close button
      { size: 'm', theme: 'primary', color: 'pink-500', disabled: false, interactive: false, showAddonLeft: false, showAddonRight: false, useTagContainer: true, showClose: true },
      { size: 'm', theme: 'secondary', disabled: false, interactive: false, showAddonLeft: false, showAddonRight: false, useTagContainer: true, showClose: true },

      // TagContainer with icon and close
      { size: 'm', theme: 'primary', color: 'white-500', disabled: false, interactive: false, showAddonLeft: true, showAddonRight: false, useTagContainer: true, showClose: true },

      // TagContainer disabled with icon and close
      { size: 'm', theme: 'primary', color: 'blue-500', disabled: true, interactive: true, showAddonLeft: true, showAddonRight: false, useTagContainer: true, showClose: true },

      // TagContainer invert, interactive with icon and close - all three themes
      { size: 'm', theme: 'primary', invert: true, color: 'violet-500', disabled: false, interactive: true, showAddonLeft: true, showAddonRight: false, useTagContainer: true, showClose: true },
      { size: 'm', theme: 'secondary', invert: true, disabled: false, interactive: true, showAddonLeft: true, showAddonRight: false, useTagContainer: true, showClose: true },
      { size: 'm', theme: 'additional', invert: true, disabled: false, interactive: true, showAddonLeft: true, showAddonRight: false, useTagContainer: true, showClose: true },

      // TagContainer interactive with addons without close
      { size: 'm', theme: 'primary', color: 'green-500', disabled: false, interactive: true, showAddonLeft: true, showAddonRight: true, useTagContainer: true, showClose: false },
      { size: 'm', theme: 'secondary', disabled: false, interactive: true, showAddonLeft: true, showAddonRight: true, useTagContainer: true, showClose: false },
      { size: 'm', theme: 'additional', disabled: false, interactive: true, showAddonLeft: true, showAddonRight: true, useTagContainer: true, showClose: false },

      // TagContainer interactive with addon and close
      { size: 'm', theme: 'primary', color: 'yellow-500', disabled: false, interactive: true, showAddonLeft: true, showAddonRight: false, useTagContainer: true, showClose: true },

      // TagContainer disabled with addon and close - pairwise themes
      { size: 'm', theme: 'secondary', disabled: true, interactive: false, showAddonLeft: true, showAddonRight: false, useTagContainer: true, showClose: true },

      // TagContainer active with addon and close - pairwise themes
      { size: 'm', theme: 'primary', color: 'violet-500', disabled: false, active: true, interactive: false, showAddonLeft: true, showAddonRight: false, useTagContainer: true, showClose: true },
      { size: 'm', theme: 'additional', invert: true, disabled: false, active: true, interactive: false, showAddonLeft: true, showAddonRight: false, useTagContainer: true, showClose: true },
    ];

    tagVariables.forEach((item) => {
      const description = `Verify Tag size ${item.size}, theme ${item.theme}, ` +
        `invert ${item.invert || false}, ` +
        `color ${item.color || 'default'}, ` +
        `disabled ${item.disabled}, active ${item.active || false}, ` +
        `interactive ${item.interactive}, ` +
        `addons L:${item.showAddonLeft} R:${item.showAddonRight}, ` +
        `container ${item.useTagContainer}, close ${item.showClose}`;

      const tags = [TAG.PRIORITY_HIGH, '@tag'];

      test(description, {
        tag: tags,
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/tag/tests/examples/basic_usage.tsx', 'en', item);

        const box = page.locator('[data-ui-name="Box"]');

        await test.step('Verify default state', async () => {
          await expect(box).toHaveScreenshot();
        });

        if (item.interactive && !item.disabled) {
          await test.step('Verify hover state', async () => {
            const tag = item.useTagContainer && item.showClose
              ? locators.tagContainerTag(page)
              : locators.tag(page);

            await tag.hover();
            await expect(box).toHaveScreenshot();
          });
          await test.step('Verify focus state', async () => {
            await page.keyboard.press('Tab');
            await expect(box).toHaveScreenshot();
            if (item.showClose) {
              await page.keyboard.press('Tab');
              await expect(box).toHaveScreenshot();
            }
          });
        }

        if (item.showAddonLeft || item.showAddonRight) {
          await test.step('Verify tag text padding with addons', async () => {
            const tagText = locators.tagText(page);
            await expect(tagText).toHaveCSS('padding-left', '4px');
            if (item.showAddonRight) {
              await expect(tagText).toHaveCSS('padding-right', '4px');
            }
          });
        }
      });
    });
  });

  test('Verify grouping More than 5 tags', {
    tag: [TAG.PRIORITY_MEDIUM, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/docs/examples/grouping_tags_more.tsx', 'en');
    await expect(page).toHaveScreenshot();
  });

  test('Verify tag with ellipsis visual', {
    tag: [TAG.PRIORITY_MEDIUM, '@tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/tag-with-ellipsis.tsx', 'en');
    await expect(page).toHaveScreenshot();
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
    });

    await test.step('Verify removing tag with Space key', async () => {
      await page.keyboard.press('Space');
      await expect(tags).toHaveCount(1);
      await expect(close.first()).not.toBeFocused();
    });
  });

  test('Verify tag with ellipsis hint appearing', {
    tag: [TAG.PRIORITY_MEDIUM, '@tag'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/tag/tests/examples/tag-with-ellipsis.tsx', 'en');
    if (browserName == 'webkit') test.skip();
    await locators.tag(page).first().waitFor({ state: 'visible' });

    await locators.tag(page).first().hover();
    await locators.hint(page).waitFor({ state: 'visible' });
    await expect(locators.hint(page)).toHaveCount(1);
  });
});
