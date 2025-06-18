import { platform } from 'os';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual tests', () => {
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
      test(`Verify InputTags normal ${item.state} and ${item.size} size unfocused and focused`, async ({ page }) => {
        const standPath = 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const inputValue = page.locator('[data-ui-name="InputTags.Value"]');
        await expect(page).toHaveScreenshot();
        await inputValue.click();
        await expect(page).toHaveScreenshot();

        const input_tags_m = page.locator('div[data-ui-name="InputTags"][class*="size_m"]');
        const input_tags_l = page.locator('div[data-ui-name="InputTags"][class*="size_l"]');

        await test.step('Verify inputTagsM styles', async () => {
          const count = await input_tags_m.count();
          for (let i = 0; i < count; i++) {
            await expect(input_tags_m.nth(i)).toHaveCSS('padding-left', '6px');
            await expect(input_tags_m.nth(i)).toHaveCSS('padding-right', '6px');
          }
        });

        await test.step('Verify inputTagsL styles', async () => {
          const count = await input_tags_l.count();
          for (let i = 0; i < count; i++) {
            await expect(input_tags_l.nth(i)).toHaveCSS('padding-left', '10px');
            await expect(input_tags_l.nth(i)).toHaveCSS('padding-right', '10px');
          }
        });

        await test.step('Verify InputTags.Tag styles', async () => {
          const li = page.locator('li[data-ui-name="InputTags.Tag"]');
          const count = await li.count();
          for (let i = 0; i < count; i++) {
            await expect(li.nth(i)).toHaveCSS('padding', '0px');
            await expect(li.nth(i)).toHaveCSS('margin', '2px');
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
      test(`Verify InputTags.Tag ${item.theme} and ${item.size} size and disabled ${item.disabled} and editable ${item.editable} `, async ({ page }) => {
        const standPath = 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
        const inputClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');

        const locator = page.locator('li[data-ui-name="InputTags.Tag"]');

        const firstClass = await locator.first().getAttribute('class');

        if (firstClass?.includes('disabled')) {
          await expect(page).toHaveScreenshot();
          return;
        }

        if (firstClass?.includes('interactive')) {
          await inputText.nth(1).hover();
          await expect(page).toHaveScreenshot();

          await locator.nth(2).click();
        } else {
          await inputClose.nth(1).hover();
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
      test(`Verify InputTags.Tag with addon ${item.theme} and ${item.size} size and disabled ${item.disabled} and interactive ${item.interactive} `, async ({ page }) => {
        const standPath = 'stories/components/input-tags/tests/examples/tags-with-addons.tsx';
        const htmlContent = await e2eStandToHtml(standPath, 'en', item);

        await page.setContent(htmlContent);

        const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');

        const locator = page.locator('li[data-ui-name="InputTags.Tag"]');

        const firstClass = await locator.first().getAttribute('class');

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
    test('Verify tags can be added removed and edited by mouse', async ({ page }) => {
      const standPath = 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

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

    test('Verify wrapping emails in tags without width limitation and email validation', async ({ page }) => {
      const standPath = 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const tag = page.locator('li[data-ui-name="InputTags.Tag"]');
      const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
      const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
      const inputValue = page.locator('[data-ui-name="InputTags.Value"]');

      await test.step('Verify hover states', async () => {
        await inputValue.click();
        const count = await tag.count();
        await page.keyboard.type('TestTestTestTestTestTestTestTestTestTestTestTest@Test.Test');
        await page.keyboard.press('Enter');

        await page.keyboard.type('Test2');
        await page.keyboard.press('Tab');

        await page.keyboard.type('Social media');
        await page.keyboard.press('Shift+Tab');

        await tagClose.first().hover();
        await page.keyboard.press('Shift+Tab');
        await tagClose.nth(count - 1).hover();
        await expect(page).toHaveScreenshot();
        await inputText.first().hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify focus on last X moves and looks good', async () => {
        await page.keyboard.press('Shift+Tab');

        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify Data from the select visual states when interacting by mouse', async ({ page }) => {
      const standPath = 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const label = page.locator('[data-ui-name="Text"]');
      const menus = page.locator('[data-ui-name="Select.Option"]');

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
        await menus.first().click();
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify Data from the select visual states when interacting by keyboard', async ({ page }) => {
      const standPath = 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const menus = page.locator('[data-ui-name="Select.Option"]');

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
        while (await menus.count() > 0) {
          await page.keyboard.press('Enter');
        }
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify input tag with default value', async ({ page }) => {
      const standPath = 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', { 'defaultValue': 'Test', 'use:value': undefined });

      await page.setContent(htmlContent);

      const tag = page.locator('li[data-ui-name="InputTags.Tag"]');
      const label = page.locator('[data-ui-name="Text"]');

      await expect(page).toHaveScreenshot();
      await label.click();
      await expect(page).toHaveScreenshot();
      const tagCountPrev = await tag.count();
      await page.keyboard.press('Enter');
      await expect(tag).toHaveCount(tagCountPrev + 1);
    });
  });
});

test.describe('Functional tests', () => {
  test('Verify tags can be added removed and edited by mouse', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const ul = page.locator('ul');
    const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
    const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
    const label = page.locator('[data-ui-name="Text"]');
    const inputValue = page.locator('[data-ui-name="InputTags.Value"]');

    await test.step('Verify attributes', async () => {
      await expect(ul).toHaveAttribute('aria-label', 'Social media');
      const count = await inputText.count();
      for (let i = 0; i < count; i++) {
        await expect(inputText.nth(i)).toHaveAttribute('aria-describedby');
        await expect(inputText.nth(i)).toHaveAttribute('tabindex', '0');
      }
    });

    await test.step('Verify focused and cursor set by click on label', async () => {
      await label.click();
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify adding new tag by Space Tab Enter and ShiftTab', async () => {
      const count = await inputText.count();
      await page.keyboard.type('Test');
      await page.keyboard.press('Enter');
      await expect(inputText).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.press('Tab');
      await expect(inputText).toHaveCount(count + 2);

      await page.keyboard.type('Social media with a very long name');
      await page.keyboard.press('Shift+Tab');
      await expect(inputText).toHaveCount(count + 3);

      await page.keyboard.type('Hello');
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await expect(inputText).toHaveCount(count + 4);
    });

    await test.step('Verify editing mode enaled by click on text', async () => {
      await inputText.first().click();
      await expect(inputValue).toHaveAttribute('value', 'TikTok');
      await inputText.nth(2).click();
      await expect(inputValue).toHaveAttribute('value', 'Instagram');

      // editing and save
      await page.keyboard.type('Test');
      await page.keyboard.press('Enter');
      const count = await inputText.count();
      await expect(inputText.nth(count - 1)).toHaveText('InstagramTest');

      // no edit and press enter
      await inputText.first().click();
      await page.keyboard.press('Enter');
      await expect(inputText.nth(count - 1)).toHaveText('Facebook');

      /// ctrl a and remove editing
      await inputText.first().click();

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Enter');
      await expect(inputValue).toHaveAttribute('value', '');
    });

    await test.step('Verify adding and edditing by click on the tag', async () => {
      await page.keyboard.type('TikTokTest');
      await inputText.nth(0).click();
      await expect(inputValue).toHaveAttribute('value', 'Social media with a very long name');

      const count = await inputText.count();
      await expect(inputText.nth(count - 1)).toHaveText('TikTokTest');
      await page.keyboard.press('Enter');
    });

    await test.step('Verify tag removes by click X', async () => {
      while (await tagClose.count() > 0) {
        await tagClose.first().click();
      }

      await expect(tagClose).toHaveCount(0);
    });
  });

  test('Verify tags can be added removed and edited by keyboard', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const tag = page.locator('li[data-ui-name="InputTags.Tag"]');
    const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
    const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
    const inputValue = page.locator('[data-ui-name="InputTags.Value"]');

    await test.step('Verify 1st Tag Text focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(inputValue).not.toBeFocused();
      await expect(inputText.first()).toBeFocused();
      await expect(tagClose.first()).not.toBeFocused();
    });

    await test.step('Verify Tag Close can be focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(inputValue).not.toBeFocused();
      await expect(inputText.first()).not.toBeFocused();
      await expect(tagClose.first()).toBeFocused();
    });

    await test.step('Verify removing 1st tag by Enter', async () => {
      const initialCount = await tag.count();

      await page.keyboard.press('Enter');
      const newCount = await tag.count();

      expect(newCount).toBe(initialCount - 1);

      await expect(inputValue).not.toBeFocused();
      await expect(inputText.first()).not.toBeFocused();
      await expect(tagClose.first()).toBeFocused();
    });

    await test.step('Verify removing 1st tag by Space', async () => {
      const initialCount = await tag.count();

      await page.keyboard.press('Space');
      const newCount = await tag.count();

      expect(newCount).toBe(initialCount - 1);

      await expect(inputValue).not.toBeFocused();
      await expect(inputText.first()).not.toBeFocused();
      await expect(tagClose.first()).toBeFocused();
    });

    await test.step('Verify Tag Text focused by Shift+ Tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(inputValue).not.toBeFocused();
      await expect(inputText.first()).toBeFocused();
      await expect(tagClose.first()).not.toBeFocused();
    });

    await test.step('Verify next Tag Text focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(inputValue).not.toBeFocused();
      await expect(inputText.nth(1)).toBeFocused();
      await expect(tagClose.nth(1)).not.toBeFocused();
    });

    await test.step('Verify input tag focused and сursor in value by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(inputValue).toBeFocused();
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify adding new tag by entering special symbols', async () => {
      const count = await tag.count();
      await page.keyboard.type('Test');
      await page.keyboard.type(',');
      await expect(tag).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.type(';');
      await expect(inputText).toHaveCount(count + 2);

      await page.keyboard.type('Social media with a very long name');
      await page.keyboard.type('|');
      await expect(inputText).toHaveCount(count + 3);
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify editing mode when press Enter or Space on tag Text', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      const count1 = await tag.count();
      await expect(inputText.nth(count1 - 1)).toBeFocused();

      await page.keyboard.press('Enter');

      await expect(inputValue).toHaveAttribute('value', 'Social media with a very long name');
      await expect(tag).toHaveCount(count1 - 1);
      await page.keyboard.type('Test2');
      await page.keyboard.press('|');
      await expect(inputText.nth(count1 - 1)).toHaveText('Social media with a very long nameTest2');
      await expect(tag).toHaveCount(count1);

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(inputValue).not.toBeFocused();
      await page.keyboard.press('Space');
      await expect(inputValue).toHaveAttribute('value', 'Social media with a very long nameTest2 ');

      if (platform() === 'darwin') {
        await page.keyboard.press('Meta+A');
      } else {
        await page.keyboard.press('Control+A');
      }
      await page.keyboard.press('Backspace');
      await expect(inputValue).toHaveAttribute('value', '');
    });

    await test.step('Verify editing mode By press Backspace', async () => {
      const count1 = await tag.count();

      await page.keyboard.press('Backspace');
      await expect(tag).toHaveCount(count1 - 1);

      await expect(inputValue).toHaveAttribute('value', 'Test2 ');

      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('|');
      await expect(inputText.nth(count1 - 1)).toHaveText('Test');
    });
  });

  test('Verify wrapping emails in tags without width limitation and email validation mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const ul = page.locator('ul');
    const tag = page.locator('li[data-ui-name="InputTags.Tag"]');
    const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
    const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
    const label = page.locator('[data-ui-name="Text"]');
    const inputValue = page.locator('[data-ui-name="InputTags.Value"]');

    await test.step('Verify focused and cursor set by click on input value', async () => {
      await inputValue.click();
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify adding correct and wrong emails tag by Space Tab Enter and ShiftTab', async () => {
      const count = await tag.count();
      await page.keyboard.type('TestTestTestTestTestTestTestTestTestTestTestTest@Test.Test');
      await page.keyboard.press('Enter');
      await expect(tag).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.press('Tab');
      await expect(tag).toHaveCount(count + 2);

      await page.keyboard.type('Social media');
      await page.keyboard.press('Shift+Tab');
      await expect(tag).toHaveCount(count + 3);

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

  test('Verify wrapping emails in tags without width limitation and email validation keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/wrapping_email_in_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const tag = page.locator('li[data-ui-name="InputTags.Tag"]');
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
      const initialCount = await tag.count();

      await page.keyboard.press('Enter');
      const newCount = await tag.count();

      expect(newCount).toBe(initialCount - 1);

      await expect(inputValue).not.toBeFocused();
      await expect(inputText.first()).not.toBeFocused();
      await expect(tagClose.first()).toBeFocused();
    });

    await test.step('Verify removing 1st tag by Space', async () => {
      const initialCount = await tag.count();

      await page.keyboard.press('Space');
      const newCount = await tag.count();

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
      const count = await tag.count();
      await page.keyboard.type('Test');
      await page.keyboard.type(',');
      await expect(tag).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.type(';');
      await expect(inputText).toHaveCount(count + 2);

      await page.keyboard.type('Social media with a very long name');
      await page.keyboard.type('|');
      await expect(inputText).toHaveCount(count + 3);
      await expect(inputValue).toBeFocused();
    });
  });

  test('Verify Data from the select and be added and removed by mouse', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const ul = page.locator('ul');
    const tag = page.locator('li[data-ui-name="InputTags.Tag"]');
    const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
    const label = page.locator('[data-ui-name="Text"]');
    const inputValue = page.locator('[data-ui-name="InputTags.Value"]');
    const menus = page.locator('[data-ui-name="Select.Option"]');

    await test.step('Verify attributes', async () => {
      await expect(ul).toHaveAttribute('aria-label', 'Social media');
      await expect(inputValue).toHaveAttribute('aria-invalid', 'false');
      await expect(inputValue).toHaveAttribute('aria-expanded', 'false');
      await expect(inputValue).toHaveAttribute('aria-autocomplete', 'list');
      await expect(inputValue).toHaveAttribute('value', '');
    });

    await test.step('Verify focused and menu opened by click on label', async () => {
      await label.click();
      await expect(inputValue).toHaveAttribute('aria-expanded', 'true');
      await page.waitForSelector('text="LinkedIn"');
      await expect(inputValue).toBeFocused();

      const count = await menus.count();
      for (let i = 0; i < count; i++) {
        await expect(menus.nth(i)).not.toHaveClass(/highlighted/);
      }
      await expect(tag).toHaveCount(0);
    });

    await test.step('Verify nothing found state', async () => {
      await page.keyboard.type('TE');
      await page.waitForSelector('text="Nothing found"');
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify menu item focused when entered data', async () => {
      await page.keyboard.press('Backspace');
      await page.waitForSelector('text="TikTok"');
      await expect(inputValue).toBeFocused();
      await expect(menus.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify menu item focused removed data', async () => {
      await page.keyboard.press('Backspace');
      await page.waitForSelector('text="LinkedIn"');
      await expect(inputValue).toBeFocused();
      await expect(menus.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify menu item can be selected by click', async () => {
      await expect(menus).toHaveCount(4);
      await menus.first().click();
      await expect(tag).toHaveCount(1);
      await expect(menus).toHaveCount(3);
    });

    await test.step('Verify all menu items can be selected by click', async () => {
      while (await menus.count() > 0) {
        await menus.first().click();
      }

      await expect(menus).toHaveCount(0);
      await expect(tag).toHaveCount(4);
    });

    await test.step('Verify tag removes by click X', async () => {
      while (await tagClose.count() > 0) {
        await tagClose.first().click();
      }
      const count = await menus.count();
      for (let i = 0; i < count; i++) {
        await expect(menus.nth(i)).not.toHaveClass(/highlighted/);
      }
      await expect(tag).toHaveCount(0);
    });
  });

  test('Verify Data from the select and be added and removed by keyboard', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/select_for_tag_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const tag = page.locator('li[data-ui-name="InputTags.Tag"]');
    const tagClose = page.locator('[data-ui-name="InputTags.Tag.Close"]');
    const inputValue = page.locator('[data-ui-name="InputTags.Value"]');
    const menus = page.locator('[data-ui-name="Select.Option"]');

    await test.step('Verify input focused and menu expanded by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(inputValue).toBeFocused();
      await page.waitForSelector('text="LinkedIn"');
      await expect(menus.nth(0)).toHaveClass(/highlighted/);

      const count = await menus.count();
      for (let i = 1; i < count; i++) {
        await expect(menus.nth(i)).not.toHaveClass(/highlighted/);
      }
    });

    await test.step('Verify menu hidden by ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(inputValue).toBeFocused();
      await expect(menus.nth(0)).not.toBeVisible();
    });

    await test.step('Verify input focused and menu expanded by Enter', async () => {
      await page.keyboard.press('Enter');
      await expect(inputValue).toBeFocused();
      await page.waitForSelector('text="LinkedIn"');
      await expect(menus.nth(0)).toHaveClass(/highlighted/);

      const count = await menus.count();
      for (let i = 1; i < count; i++) {
        await expect(menus.nth(i)).not.toHaveClass(/highlighted/);
      }
    });

    await test.step('Verify tag added by Enter', async () => {
      await expect(menus).toHaveCount(4);
      await page.keyboard.press('Enter');
      await expect(tag).toHaveCount(1);
      await expect(menus).toHaveCount(3);

      await page.keyboard.press('Enter');
      await expect(tag).toHaveCount(2);
      await expect(menus).toHaveCount(2);
    });

    await test.step('Verify nothing found state', async () => {
      await page.keyboard.press('Space');
      await page.waitForSelector('text="Nothing found"');
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify focus By Shift+Tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.waitForSelector('text="TikTok"');
      await expect(inputValue).not.toBeFocused();
      await expect(tagClose.nth(1)).toBeFocused();
      await expect(menus.nth(0)).toHaveClass(/highlighted/);

      await page.keyboard.press('Shift+Tab');
      await expect(inputValue).not.toBeFocused();
      await expect(tagClose.nth(0)).toBeFocused();
      await expect(menus.nth(0)).toHaveClass(/highlighted/);
    });

    await test.step('Verify focus By Tab', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="TikTok"');
      await expect(inputValue).not.toBeFocused();
      await expect(tagClose.nth(1)).toBeFocused();
      await expect(menus.nth(0)).toHaveClass(/highlighted/);

      await page.keyboard.press('Tab');
      await expect(inputValue).toBeFocused();
      await expect(menus.nth(0)).toHaveClass(/highlighted/);
    });

    await test.step('Verify Removing tag', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await expect(menus.nth(0)).not.toHaveClass(/highlighted/);
      await expect(inputValue).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');
      await expect(menus.nth(0)).not.toHaveClass(/highlighted/);
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify Adding tag', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(menus.nth(0)).toHaveClass(/highlighted/);
      await expect(inputValue).toBeFocused();

      while (await menus.count() > 0) {
        await page.keyboard.press('Enter');
      }

      await expect(menus).toHaveCount(0);
      await expect(tag).toHaveCount(4);
    });
  });

  test('Verify adding tags with custom delimiters', async ({ page }) => {
    const standPath = 'stories/components/input-tags/docs/examples/entering_and_editing_tags.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { delimiters: [']', '/', '['] });

    await page.setContent(htmlContent);

    const tag = page.locator('li[data-ui-name="InputTags.Tag"]');
    const inputText = page.locator('[data-ui-name="InputTags.Tag.Text"]');
    const inputValue = page.locator('[data-ui-name="InputTags.Value"]');

    await test.step('Verify adding new tag by entering custom delimiters', async () => {
      await inputValue.click();
      const count = await tag.count();
      await page.keyboard.type('Test');
      await page.keyboard.type(']');
      await expect(tag).toHaveCount(count + 1);

      await page.keyboard.type('Test2');
      await page.keyboard.type('/');
      await expect(inputText).toHaveCount(count + 2);

      await page.keyboard.type('Social media with a very long name');
      await page.keyboard.type(']');
      await expect(inputText).toHaveCount(count + 3);
      await expect(inputValue).toBeFocused();
    });

    await test.step('Verify default special symbols delimiters dont work', async () => {
      const count = await tag.count();
      await page.keyboard.type('Test');
      await page.keyboard.type(',');
      await expect(tag).toHaveCount(count);
      await expect(inputValue).toHaveAttribute('value', 'Test,');

      await page.keyboard.type(';');
      await expect(inputText).toHaveCount(count);
      await expect(inputValue).toHaveAttribute('value', 'Test,;');

      await page.keyboard.type('|');
      await expect(inputText).toHaveCount(count);
      await expect(inputValue).toHaveAttribute('value', 'Test,;|');
    });

    await test.step('Verify enter adds tag', async () => {
      const count = await tag.count();
      await page.keyboard.press('Enter');
      await expect(tag).toHaveCount(count + 1);
      await expect(inputValue).toHaveAttribute('value', '');
    });

    await test.step('Verify Tab not adds tag', async () => {
      const count = await tag.count();
      await page.keyboard.type('Test');

      await page.keyboard.press('Tab');
      await expect(tag).toHaveCount(count);
      await expect(inputValue).toHaveAttribute('value', 'Test');
    });
  });
});
