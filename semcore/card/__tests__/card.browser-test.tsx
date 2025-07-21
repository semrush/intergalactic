import { platform } from 'os';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual tests', () => {
  test('Verify Base example margins and paddings', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const header = page.locator('[data-ui-name="Card.Header"]');
    const description = page.locator('[data-ui-name="Card.Description"]');
    const title = page.locator('[data-ui-name="Card.Title"]');
    const body = page.locator('[data-ui-name="Card.Body"]');
    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');

    await expect(page).toHaveScreenshot();

    await test.step('Verify header paddings', async () => {
      await expect(header).toHaveCSS('padding-left', '20px');
      await expect(header).toHaveCSS('padding-right', '20px');
      await expect(header).toHaveCSS('padding-top', '8px');
      await expect(header).toHaveCSS('padding-bottom', '8px');
    });

    await test.step('Verify title styles', async () => {
      await expect(title).toHaveCSS('margin-right', '4px');
      await expect(title).toHaveCSS('font-size', '16px');
      await expect(title).toHaveCSS('font-weight', '700');
    });

    await test.step('Verify description margin', async () => {
      await expect(description).toHaveCSS('margin-top', '8px');
    });

    await test.step('Verify body padding', async () => {
      await expect(body).toHaveCSS('padding', '20px');
    });

    await test.step('Verify description tooltip trigger margins', async () => {
      await expect(descriptionTooltipTrigger).toHaveCSS('margin-top', '2px');
      await expect(descriptionTooltipTrigger).toHaveCSS('margin-left', '4px');
      await expect(descriptionTooltipTrigger).toHaveCSS('margin-right', '4px');
    });

    await test.step('Verify description tooltip expanded state by mouse', async () => {
      await descriptionTooltipTrigger.click();
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
      await descriptionTooltipTrigger.click();
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'hidden' });
    });

    await test.step('Verify button with hint and description tooltip on focus in header', async () => {
      await page.keyboard.press('Tab');
      await page.getByText('Settings').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify card with ellipsis width:1200, height: 800', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/ellipsis.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.setViewportSize({ width: 1200, height: 800 });
    const title = page.locator('[data-ui-name="Card.Title"]');

    await title.hover();
    await expect(page).toHaveScreenshot();
  });

  test('Verify card with ellipsis width:768, height: 800', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/ellipsis.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.setViewportSize({ width: 768, height: 800 });
    const title = page.locator('[data-ui-name="Card.Title"]');

    await title.hover();
    await page.locator('[data-ui-name="Tooltip"]').first().waitFor({ state: 'visible' });
    await expect(page.locator('[data-ui-name="Tooltip"]').first()).toBeVisible();
    await expect(page).toHaveScreenshot();
  });

  test('Verify complex card styles', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/complex_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Select.Option"]').first().waitFor({ state: 'visible' });
    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Select.Option"]').first().waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify card with different card componens styles', async ({ page }) => {
    const standPath = 'stories/components/card/tests/examples/different-cards.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await test.step('Verify card only component', async () => {
      const card = await page.locator('[data-testid="card-only"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card description component', async () => {
      const card = await page.locator('[data-testid="card-description"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title hintAfter component', async () => {
      const card = await page.locator('[data-testid="card-title-hintAfter"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title  description content hintAfter component', async () => {
      const card = await page.locator('[data-testid="card-title-description-hintAfter"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title  description content innterHint component', async () => {
      const card = await page.locator('[data-testid="card-title-description-innterHint"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title  description content hintAfter innterHint component', async () => {
      const card = await page.locator('[data-testid="card-title-content-hintAfter-innerHint"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title description content innterHint tag component', async () => {
      const card = await page.locator('[data-testid="card-title-description-content-innerHint-tag-text-styles"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card header title description body component', async () => {
      const card = await page.locator('[data-testid="data-testid="card-header-title-desription-body"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card heder pills body component', async () => {
      const card = await page.locator('[data-testid="card-header-pills-body"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });
  });
});

test.describe('Functional', () => {
  test('Verify base example keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const descriptionTooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

    await test.step('Verify tooltip not shown when trigger is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(descriptionTooltipTrigger).toBeFocused();
      await expect(descriptionTooltipPopper).not.toBeVisible();
    });

    await test.step('Verify tooltip shown on space', async () => {
      await page.keyboard.press('Space');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
      await expect(descriptionTooltipTrigger).not.toBeFocused();
      await expect(descriptionTooltipPopper).toBeFocused();
    });

    await test.step('Verify tooltip hidden on Escape', async () => {
      await page.keyboard.press('Escape');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'hidden' });
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Verify tooltip opened on Enter', async () => {
      await page.keyboard.press('Enter');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
      await expect(descriptionTooltipTrigger).not.toBeFocused();
      await expect(descriptionTooltipPopper).toBeFocused();
    });

    await test.step('Verify tooltip hidden by Tab', async () => {
      await page.keyboard.press('Tab');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'hidden' });
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Next control focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="Button"]')).toBeFocused();
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

    await test.step('Verify menu item not focused when entered data', async () => {
      await page.keyboard.press('Backspace');
      await page.waitForSelector('text="TikTok"');
      await expect(inputValue).toBeFocused();
      await expect(menus.first()).not.toHaveClass(/highlighted/);
    });

    await test.step('Verify menu item focused after press down', async () => {
      await page.keyboard.press('ArrowDown');
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
