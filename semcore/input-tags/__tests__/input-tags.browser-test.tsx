import { platform } from 'os';

import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  options: (page: Page) => page.getByRole('option'),
  inputValue: (page: Page) => page.locator('[data-ui-name="InputTags.Value"]'),
  tag: (page: Page) => page.locator('li[data-ui-name="InputTags.Tag"]'),
  inputText: (page: Page) => page.locator('[data-ui-name="InputTags.Tag.Text"]'),
  inputClose: (page: Page) => page.locator('[data-ui-name="InputTags.Tag.Close"]'),
};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test.describe('Base states and styles', () => {
    const variables = [
      { state: 'normal', size: 'm' },
      { state: 'valid', size: 'm' },
      { state: 'invalid', size: 'm' },
      { state: 'normal', size: 'l' },
      { state: 'valid', size: 'l' },
      { state: 'invalid', size: 'l' },
    ];
    variables.forEach((item) => {
      test(`Verify InputTags normal ${item.state} and ${item.size} size unfocused and focused`, {
        tag: [TAG.PRIORITY_HIGH,
          '@input-tags',
          '@ellipsis'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx', 'en', item);

        await expect(page).toHaveScreenshot();
        await locators.inputValue(page).click();
        await expect(page).toHaveScreenshot();

        const input_tags_m = page.locator('div[data-ui-name="InputTags"][class*="size_m"]');
        const input_tags_l = page.locator('div[data-ui-name="InputTags"][class*="size_l"]');

        await test.step('Verify inputTagsM styles', async () => {
          const count = await input_tags_m.count();
          for (let i = 0; i < count; i++) {
            await expect(input_tags_m.nth(i)).toHaveCSS('padding-left', '4px');
            await expect(input_tags_m.nth(i)).toHaveCSS('padding-right', '6px');
          }
        });

        await test.step('Verify inputTagsL styles', async () => {
          const count = await input_tags_l.count();
          for (let i = 0; i < count; i++) {
            await expect(input_tags_l.nth(i)).toHaveCSS('padding-left', '8px');
            await expect(input_tags_l.nth(i)).toHaveCSS('padding-right', '10px');
          }
        });

        await test.step('Verify InputTags.Tag styles', async () => {
          const count = await locators.tag(page).count();
          for (let i = 0; i < count; i++) {
            await expect(locators.tag(page).nth(i)).toHaveCSS('margin', '2px');
          }
        });

        await test.step('Verify TagContainer.Tag styles', async () => {
          const tagContainer = page.locator('li[data-ui-name="TagContainer.Tag"]');
          const count = await tagContainer.count();
          for (let i = 0; i < count; i++) {
            await expect(tagContainer.nth(i)).toHaveCSS('padding-left', '4px');
            await expect(tagContainer.nth(i)).toHaveCSS('padding-right', '4px');
            await expect(tagContainer.nth(i)).toHaveCSS('border', '1px');
            await expect(tagContainer.nth(i)).toHaveAttribute('tabindex', '-1');
          }
        });

        await test.step('Verify TagContainer.Tag styles', async () => {
          const tagText = page.locator('span[data-ui-name="Tag.Text"]');
          const count = await tagText.count();
          for (let i = 0; i < count; i++) {
            await expect(tagText.nth(i)).toHaveCSS('padding-left', '4px');
            await expect(tagText.nth(i)).toHaveCSS('padding-right', '0px');
            await expect(tagText.nth(i)).toHaveAttribute('tabindex', '-1');
          }
        });

        await test.step('Verify InputTags.Value styles', async () => {
          const tagValue = page.locator('span[data-ui-name="InputTags.Value"]');
          const count = await tagValue.count();
          for (let i = 0; i < count; i++) {
            await expect(tagValue.nth(i)).toHaveCSS('margin-left', '2px');
            await expect(tagValue.nth(i)).toHaveCSS('margin-right', '2px');
          }
        });
      });
    });

    const variablesEmail = [
      { theme: 'primary', size: 'l', disabled: true },
      { theme: 'secondary', size: 'm', disabled: false },
      { theme: 'primary', size: 'xl', disabled: true },
      { theme: 'primary', size: 'xl', disabled: false, editable: true },
    ];

    variablesEmail.forEach((item) => {
      test(`Verify InputTags.Tag ${item.theme} and ${item.size} size and disabled ${item.disabled} and editable ${item.editable} `, {
        tag: [TAG.PRIORITY_HIGH,
          '@input-tags'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx', 'en', item);

        const firstClass = await locators.tag(page).first().getAttribute('class');

        if (firstClass?.includes('disabled')) {
          await expect(page).toHaveScreenshot();
          return;
        }

        if (firstClass?.includes('interactive')) {
          await locators.inputText(page).nth(1).hover();
          await expect(page).toHaveScreenshot();

          await locators.tag(page).nth(2).click();
        } else {
          await locators.inputClose(page).nth(1).hover();
          await expect(page).toHaveScreenshot();
        }
      });
    });

    const variablesAddons = [
      { theme: 'primary', size: 'l', disabled: true },
      { theme: 'secondary', size: 'm', disabled: false },
      { theme: 'primary', size: 'xl', disabled: true, interactive: true },
      { theme: 'primary', size: 'xl', disabled: false, interactive: true },
    ];

    variablesAddons.forEach((item) => {
      test(`Verify InputTags.Tag with addon ${item.theme} and ${item.size} size and disabled ${item.disabled} and interactive ${item.interactive} `, {
        tag: [TAG.PRIORITY_HIGH,
          '@input-tags',
          '@icon'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/input-tags/tests/examples/tags-with-addons.tsx', 'en', item);

        const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
        const firstClass = await locators.tag(page).first().getAttribute('class');

        if (firstClass?.includes('disabled')) {
          await expect(page).toHaveScreenshot();
          return;
        } else {
          await inputText.nth(1).hover();
          await expect(page).toHaveScreenshot();
        }
      });
    });
  });

  test.describe('Input-tags visual states after mouse and keyboard interactions in examples', () => {
    test('Verify tags can be added removed and edited by mouse', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@input-tags',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx', 'en');

      const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
      const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
      const label = page.locator('[data-ui-name="Text"]');

      await test.step('Verify tags hover states and ellipsis appearing', async () => {
        await label.click();
        await inputText.first().hover();
        await expect(page).toHaveScreenshot();
        await inputText.nth(4).hover();

        await page.waitForSelector('text="Social media with a very long name"');
        await expect(page).toHaveScreenshot();
        await tagClose.first().hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify adding and edditing by click on the tag', async () => {
        await page.keyboard.type('TikTokTest');
        await inputText.nth(0).click();
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify wrapping emails in tags without width limitation and email validation', {
      tag: [TAG.PRIORITY_HIGH,
        '@input-tags'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx', 'en');

      await test.step('Verify hover states', async () => {
        await locators.inputValue(page).click();
        const count = await locators.tag(page).count();
        await page.keyboard.type('TestTestTestTestTestTestTestTestTestTestTestTest@Test.Test');
        await page.keyboard.press('Enter');

        await page.keyboard.type('Test2');
        await page.keyboard.press('Tab');

        await page.keyboard.type('Social media');
        await page.keyboard.press('Shift+Tab');

        await locators.inputClose(page).first().hover();
        await page.keyboard.press('Shift+Tab');
        await locators.inputClose(page).nth(count - 1).hover();
        await expect(page).toHaveScreenshot();
        await locators.inputText(page).first().hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus on last X moves and looks good', async () => {
        await page.keyboard.press('Shift+Tab');

        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify Data from the select visual states when interacting by mouse', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@input-tags',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx', 'en');

      const label = page.locator('[data-ui-name="Text"]');

      await test.step('Verify focused and menu opened by click on label', async () => {
        await label.click();
        await page.waitForSelector('text="LinkedIn"');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify menu item focused when entered data', async () => {
        await page.keyboard.press('Backspace');
        await page.waitForSelector('text="TikTok"');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify menu item can be selected by click', async () => {
        await locators.options(page).first().click();
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify Data from the select visual states when interacting by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@input-tags',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx', 'en');

      await test.step('Verify nothing found state', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Space');
        await page.waitForSelector('text="Nothing found"');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus By Shift+Tab', async () => {
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify Adding tag', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        while (await locators.options(page).count() > 0) {
          await page.keyboard.press('Enter');
        }
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify input tag with default value', {
      tag: [TAG.PRIORITY_MEDIUM,
        '@input-tags',
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx', 'en', { defaultValue: 'default value add something', value: undefined });

      const label = page.locator('[data-ui-name="Text"]');

      await expect(page).toHaveScreenshot();
      await label.click();
      await expect(page).toHaveScreenshot();
      const tagCountPrev = await locators.tag(page).count();
      await page.keyboard.press('Enter');
      await expect(locators.tag(page)).toHaveCount(tagCountPrev + 1);
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify tags can be added removed and edited by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input-tags',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx', 'en');

    const ul = page.locator('ul');
    const label = page.locator('[data-ui-name="Text"]');

    await test.step('Verify attributes', async () => {
      await expect(ul).toHaveAttribute('aria-label', 'Social media');
      const count = await locators.inputText(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.inputText(page).nth(i)).toHaveAttribute('aria-describedby');
        await expect(locators.inputText(page).nth(i)).toHaveAttribute('tabindex', '0');
      }
    });

    await test.step('Verify focused and cursor set by click on label', async () => {
      await label.click();
      await expect(locators.inputValue(page)).toBeFocused();
    });

    await test.step('Verify adding new tag by Space Tab Enter and ShiftTab', async () => {
      const count = await locators.inputText(page).count();
      await page.keyboard.type('Test');
      await page.keyboard.press('Enter');
      await expect(locators.inputText(page)).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.press('Tab');
      await expect(locators.inputText(page)).toHaveCount(count + 2);

      await page.keyboard.type('1111');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.inputText(page)).toHaveCount(count + 3);

      await page.keyboard.type('Hello');
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await expect(locators.inputText(page)).toHaveCount(count + 4);
    });

    await test.step('Verify editing mode enaled by click on text', async () => {
      await locators.inputText(page).first().click();
      await expect(locators.inputValue(page)).toHaveAttribute('value', 'TikTok');
      await locators.inputText(page).nth(2).click();
      await expect(locators.inputValue(page)).toHaveAttribute('value', 'Instagram');

      // editing and save
      await page.keyboard.type('Test');
      await page.keyboard.press('Enter');
      const count = await locators.inputText(page).count();
      await expect(locators.inputText(page).nth(count - 1)).toHaveText('InstagramTest');

      // no edit and press enter
      await locators.inputText(page).first().click();
      await page.keyboard.press('Enter');
      await expect(locators.inputText(page).nth(count - 1)).toHaveText('Facebook');

      /// ctrl a and remove editing
      await locators.inputText(page).first().click();

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Enter');
      await expect(locators.inputValue(page)).toHaveAttribute('value', '');
    });

    await test.step('Verify adding and edditing by click on the tag', async () => {
      await page.keyboard.type('TikTokTest');
      await locators.inputText(page).nth(0).click();
      await expect(locators.inputValue(page)).toHaveAttribute('value', 'Social media with a very long name');

      const count = await locators.inputText(page).count();
      await expect(locators.inputText(page).nth(count - 1)).toHaveText('TikTokTest');
      await page.keyboard.press('Enter');
    });

    await test.step('Verify tag removes by click X', async () => {
      while (await locators.inputClose(page).count() > 0) {
        await locators.inputClose(page).first().click();
      }

      await expect(locators.inputClose(page)).toHaveCount(0);
    });
  });

  test('Verify tags can be added removed and edited by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input-tags',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx', 'en');

    await test.step('Verify 1st Tag Text focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.inputValue(page)).not.toBeFocused();
      await expect(locators.inputText(page).first()).toBeFocused();
      await expect(locators.inputClose(page).first()).not.toBeFocused();
    });

    await test.step('Verify Tag Close can be focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.inputValue(page)).not.toBeFocused();
      await expect(locators.inputText(page).first()).not.toBeFocused();
      await expect(locators.inputClose(page).first()).toBeFocused();
    });

    await test.step('Verify removing 1st tag by Enter', async () => {
      const initialCount = await locators.tag(page).count();

      await page.keyboard.press('Enter');
      const newCount = await locators.tag(page).count();

      expect(newCount).toBe(initialCount - 1);

      await expect(locators.inputValue(page)).not.toBeFocused();
      await expect(locators.inputClose(page).first()).not.toBeFocused();
      await expect(locators.inputText(page).first()).toBeFocused();
    });

    await test.step('Verify removing 1st tag by Space', async () => {
      const initialCount = await locators.tag(page).count();
      await page.keyboard.press('Tab');

      await page.keyboard.press('Space');
      const newCount = await locators.tag(page).count();

      expect(newCount).toBe(initialCount - 1);

      await expect(locators.inputValue(page)).not.toBeFocused();
      await expect(locators.inputText(page).first()).toBeFocused();
      await expect(locators.inputClose(page).first()).not.toBeFocused();
    });

    await test.step('Verify next Tag Text focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.inputValue(page)).not.toBeFocused();
      await expect(locators.inputText(page).nth(1)).toBeFocused();
      await expect(locators.inputClose(page).nth(1)).not.toBeFocused();
    });

    await test.step('Verify input tag focused and сursor in value by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.inputValue(page)).toBeFocused();
      await expect(locators.inputValue(page)).toBeFocused();
    });

    await test.step('Verify adding new tag by entering special symbols', async () => {
      const count = await locators.tag(page).count();
      await page.keyboard.type('Test');
      await page.keyboard.type(',');
      await expect(locators.tag(page)).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.type(';');
      await expect(locators.inputText(page)).toHaveCount(count + 2);

      await page.keyboard.type('Social media with a very long name');
      await page.keyboard.type('|');
      await expect(locators.inputText(page)).toHaveCount(count + 3);
      await expect(locators.inputValue(page)).toBeFocused();
    });

    await test.step('Verify editing mode when press Enter or Space on tag Text', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      const count1 = await locators.tag(page).count();
      await expect(locators.inputText(page).nth(count1 - 1)).toBeFocused();

      await page.keyboard.press('Enter');

      await expect(locators.inputValue(page)).toHaveAttribute('value', 'Social media with a very long name');
      await expect(locators.tag(page)).toHaveCount(count1 - 1);
      await page.keyboard.type('Test2');
      await page.keyboard.press('|');
      await expect(locators.inputText(page).nth(count1 - 1)).toHaveText('Social media with a very long nameTest2');
      await expect(locators.tag(page)).toHaveCount(count1);

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.inputValue(page)).not.toBeFocused();
      await page.keyboard.press('Space');
      await expect(locators.inputValue(page)).toHaveAttribute('value', 'Social media with a very long nameTest2 ');

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.press('Backspace');
      await expect(locators.inputValue(page)).toHaveAttribute('value', '');
    });

    await test.step('Verify editing mode By press Backspace', async () => {
      const count1 = await locators.tag(page).count();

      await page.keyboard.press('Backspace');
      await expect(locators.tag(page)).toHaveCount(count1 - 1);

      await expect(locators.inputValue(page)).toHaveAttribute('value', 'Test2 ');

      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('|');
      await expect(locators.inputText(page).nth(count1 - 1)).toHaveText('Test');
    });

    await test.step('Verify entered text is pasted when paste action happened', async () => {
      const bufferedText = 'Buffer';
      const typedValue = 'Test';
      const tagCount = await locators.tag(page).count();

      await page.keyboard.type(typedValue);
      await locators.inputValue(page).evaluate((el, text) => {
        const event = new Event('paste', { bubbles: true, cancelable: true });
        (event as any).clipboardData = {
          getData: (type: string) => (type === 'text/plain' ? text : ''),
          types: ['text/plain'],
        };
        el.dispatchEvent(event);
      }, bufferedText);

      await expect(locators.tag(page)).toHaveCount(tagCount + 2);
      await expect(locators.inputValue(page)).toBeEmpty();
    });
  });

  test('Verify wrapping emails in tags without width limitation and email validation mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      '@input-tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx', 'en');

    const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
    const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
    const inputValue = page.locator('[data-ui-name="InputTags.Value"]');

    await test.step('Verify focused and cursor set by click on input value', async () => {
      await inputValue.click();
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify adding correct and wrong emails tag by Space Tab Enter and ShiftTab', async () => {
      const count = await locators.tag(page).count();
      await page.keyboard.type('TestTestTestTestTestTestTestTestTestTestTestTest@Test.Test');
      await page.keyboard.press('Enter');
      await expect(locators.tag(page)).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.press('Tab');
      await expect(locators.tag(page)).toHaveCount(count + 2);

      await page.keyboard.type('Social media');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.tag(page)).toHaveCount(count + 3);

      // 2 spaces don't work in this examples, possibly bug in the example
      // await page.keyboard.type('Hello@gmail.com');
      // await page.keyboard.press('Space');
      // await page.keyboard.press('Space');
      // await expect(tag).toHaveCount(count + 4);
    });

    await test.step('Verify editing mode not enaled by click on text', async () => {
      await inputText.first().click();

      await expect(inputValue).toHaveAttribute('value', '');
    });

    await test.step('Verify tag removes by click X', async () => {
      while (await tagClose.count() > 0) {
        await tagClose.first().click();
      }

      await expect(tagClose).toHaveCount(0);
    });
  });

  test('Verify wrapping emails in tags without width limitation and email validation keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      '@input-tag'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx', 'en');

    const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
    const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
    const inputValue = page.locator('[data-ui-name="InputTags.Value"]');

    await test.step('Verify 1st Tag Close focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(inputValue).not.toBeFocused();
      await expect(inputText.first()).not.toBeFocused();
      await expect(tagClose.first()).toBeFocused();
      await expect(inputValue).not.toBeFocused();
    });

    await test.step('Verify removing 1st tag by Enter', async () => {
      const initialCount = await locators.tag(page).count();

      await page.keyboard.press('Enter');
      const newCount = await locators.tag(page).count();

      expect(newCount).toBe(initialCount - 1);

      await expect(inputValue).not.toBeFocused();
      await expect(inputText.first()).not.toBeFocused();
      await expect(tagClose.first()).toBeFocused();
    });

    await test.step('Verify removing 1st tag by Space', async () => {
      const initialCount = await locators.tag(page).count();

      await page.keyboard.press('Space');
      const newCount = await locators.tag(page).count();

      expect(newCount).toBe(initialCount - 1);

      await expect(inputValue).not.toBeFocused();
      await expect(inputText.first()).not.toBeFocused();
      await expect(tagClose.first()).toBeFocused();
    });

    await test.step('Verify next Tag Close  Text focused by Tab', async () => {
      await page.keyboard.press('Tab');

      await expect(inputValue).not.toBeFocused();
      await expect(tagClose.nth(1)).toBeFocused();
    });

    await test.step('Verify Prev Tag close focused by Shift+ Tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(inputValue).not.toBeFocused();
      await expect(tagClose.first()).toBeFocused();
    });

    await test.step('Verify input tag focused and fursor in value by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify adding new tag by entering special symbols', async () => {
      const count = await locators.tag(page).count();
      await page.keyboard.type('Test');
      await page.keyboard.type(',');
      await expect(locators.tag(page)).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.type(';');
      await expect(inputText).toHaveCount(count + 2);

      await page.keyboard.type('Social media with a very long name');
      await page.keyboard.type('|');
      await expect(inputText).toHaveCount(count + 3);
      await expect(inputValue).toBeFocused();
    });
  });

  test('Verify Data from the select and be added and removed by mouse', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input-tags',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx', 'en');

    const ul = page.locator('ul');
    const label = page.locator('[data-ui-name="Text"]');

    await test.step('Verify attributes', async () => {
      await expect(ul).toHaveAttribute('aria-label', 'Social media');
      await expect(locators.inputValue(page)).toHaveAttribute('aria-invalid', 'false');
      await expect(locators.inputValue(page)).toHaveAttribute('aria-expanded', 'false');
      await expect(locators.inputValue(page)).toHaveAttribute('aria-autocomplete', 'list');
      await expect(locators.inputValue(page)).toHaveAttribute('value', '');
    });

    await test.step('Verify focused and menu opened by click on label', async () => {
      await label.click();
      await expect(locators.inputValue(page)).toHaveAttribute('aria-expanded', 'true');
      await page.waitForSelector('text="LinkedIn"');
      await expect(locators.inputValue(page)).toBeFocused();

      const count = await locators.options(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.options(page).nth(i)).not.toHaveClass(/highlighted/);
      }
      await expect(locators.tag(page)).toHaveCount(0);
    });

    await test.step('Verify nothing found state', async () => {
      await page.keyboard.type('TE');
      await page.waitForSelector('text="Nothing found"');
      await expect(locators.inputValue(page)).toBeFocused();
    });

    await test.step('Verify menu item not focused when entered data', async () => {
      await page.keyboard.press('Backspace');
      await page.waitForSelector('text="TikTok"');
      await expect(locators.inputValue(page)).toBeFocused();
      await expect(locators.options(page).first()).not.toHaveClass(/highlighted/);
    });

    await test.step('Verify menu item focused after press down', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(locators.inputValue(page)).toBeFocused();
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify menu item focused removed data', async () => {
      await page.keyboard.press('Backspace');
      await page.waitForSelector('text="LinkedIn"');
      await expect(locators.inputValue(page)).toBeFocused();
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify menu item can be selected by click', async () => {
      await expect(locators.options(page)).toHaveCount(4);
      await locators.options(page).first().click();
      await expect(locators.tag(page)).toHaveCount(1);
      await expect(locators.options(page)).toHaveCount(3);
    });

    await test.step('Verify all menu items can be selected by click', async () => {
      while (await locators.options(page).count() > 0) {
        await locators.options(page).first().click();
      }

      await expect(locators.options(page)).toHaveCount(0);
      await expect(locators.tag(page)).toHaveCount(4);
    });

    await test.step('Verify tag removes by click X', async () => {
      while (await locators.inputClose(page).count() > 0) {
        await locators.inputClose(page).first().click();
      }
      const count = await locators.options(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.options(page).nth(i)).not.toHaveClass(/highlighted/);
      }
      await expect(locators.tag(page)).toHaveCount(0);
    });
  });

  test('Verify Data from the select and be added and removed by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input-tags',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx', 'en');

    await test.step('Verify input focused and menu expanded by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.inputValue(page)).toBeFocused();
      await page.waitForSelector('text="LinkedIn"');
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);

      const count = await locators.options(page).count();
      for (let i = 1; i < count; i++) {
        await expect(locators.options(page).nth(i)).not.toHaveClass(/highlighted/);
      }
    });

    await test.step('Verify menu hidden by ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.inputValue(page)).toBeFocused();
      await expect(locators.options(page).nth(0)).not.toBeVisible();
    });

    await test.step('Verify input focused and menu expanded by Enter', async () => {
      await page.keyboard.press('Enter');
      await expect(locators.inputValue(page)).toBeFocused();
      await page.waitForSelector('text="LinkedIn"');
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);

      const count = await locators.options(page).count();
      for (let i = 1; i < count; i++) {
        await expect(locators.options(page).nth(i)).not.toHaveClass(/highlighted/);
      }
    });

    await test.step('Verify tag added by Enter', async () => {
      await expect(locators.options(page)).toHaveCount(4);
      await page.keyboard.press('Enter');
      await expect(locators.tag(page)).toHaveCount(1);
      await expect(locators.options(page)).toHaveCount(3);

      await page.keyboard.press('Enter');
      await expect(locators.tag(page)).toHaveCount(2);
      await expect(locators.options(page)).toHaveCount(2);
    });

    await test.step('Verify nothing found state', async () => {
      await page.keyboard.press('Space');
      await page.waitForSelector('text="Nothing found"');
      await expect(locators.inputValue(page)).toBeFocused();
    });

    await test.step('Verify focus By Shift+Tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.waitForSelector('text="TikTok"');
      await expect(locators.inputValue(page)).not.toBeFocused();
      await expect(locators.inputClose(page).nth(1)).toBeFocused();
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);

      await page.keyboard.press('Shift+Tab');
      await expect(locators.inputValue(page)).not.toBeFocused();
      await expect(locators.inputClose(page).nth(0)).toBeFocused();
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);
    });

    await test.step('Verify focus By Tab', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="TikTok"');
      await expect(locators.inputValue(page)).not.toBeFocused();
      await expect(locators.inputClose(page).nth(1)).toBeFocused();
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);

      await page.keyboard.press('Tab');
      await expect(locators.inputValue(page)).toBeFocused();
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);
    });

    await test.step('Verify Removing tag', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await expect(locators.options(page).nth(0)).not.toHaveClass(/highlighted/);
      await expect(locators.inputValue(page)).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');
      await expect(locators.options(page).nth(0)).not.toHaveClass(/highlighted/);
      await expect(locators.inputValue(page)).toBeFocused();
    });

    await test.step('Verify Adding tag', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(locators.options(page).nth(0)).toHaveClass(/highlighted/);
      await expect(locators.inputValue(page)).toBeFocused();

      while (await locators.options(page).count() > 0) {
        await page.keyboard.press('Enter');
      }

      await expect(locators.options(page)).toHaveCount(0);
      await expect(locators.tag(page)).toHaveCount(4);
    });
  });

  test('Verify adding tags with custom delimiters', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input-tags',
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx', 'en', { delimiters: [']', '/', '['] });

    await test.step('Verify adding new tag by entering custom delimiters', async () => {
      await locators.inputValue(page).click();
      const count = await locators.tag(page).count();
      await page.keyboard.type('Test');
      await page.keyboard.type(']');
      await expect(locators.tag(page)).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.type('/');
      await expect(locators.inputText(page)).toHaveCount(count + 2);

      await page.keyboard.type('Social media with a very long name');
      await page.keyboard.type(']');
      await expect(locators.inputText(page)).toHaveCount(count + 3);
      await expect(locators.inputValue(page)).toBeFocused();
    });

    await test.step('Verify default special symbols delimiters dont work', async () => {
      const count = await locators.tag(page).count();
      await page.keyboard.type('Test');
      await page.keyboard.type(',');
      await expect(locators.tag(page)).toHaveCount(count);
      await expect(locators.inputValue(page)).toHaveAttribute('value', 'Test,');

      await page.keyboard.type(';');
      await expect(locators.inputText(page)).toHaveCount(count);
      await expect(locators.inputValue(page)).toHaveAttribute('value', 'Test,;');

      await page.keyboard.type('|');
      await expect(locators.inputText(page)).toHaveCount(count);
      await expect(locators.inputValue(page)).toHaveAttribute('value', 'Test,;|');
    });

    await test.step('Verify enter adds tag', async () => {
      const count = await locators.tag(page).count();
      await page.keyboard.press('Enter');
      await expect(locators.tag(page)).toHaveCount(count + 1);
      await expect(locators.inputValue(page)).toHaveAttribute('value', '');
    });

    await test.step('Verify Tab not adds tag', async () => {
      const count = await locators.tag(page).count();
      await page.keyboard.type('Test');

      await page.keyboard.press('Tab');
      await expect(locators.tag(page)).toHaveCount(count);
      await expect(locators.inputValue(page)).toHaveAttribute('value', 'Test');
    });
  });
});
