import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Tags sizes color and themes', () => {
  test('Verify Tag without addons or close', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });

    const flex = page.locator('[data-testid="Primary-base"]');
    const tags = flex.locator('[data-ui-name="Tag"]');
    // m size
    await expect(tags.first()).toHaveCSS(
      'height',
      '20px',
    );
    // l size
    await expect(tags.nth(1)).toHaveCSS(
      'height',
      '28px',
    );
    // xl size
    await expect(tags.nth(2)).toHaveCSS(
      'height',
      '40px',
    );
    await expect(page).toHaveScreenshot();
  });

  test('Verify Tag without addon and close disabled', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-disabled';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });
    await expect(page).toHaveScreenshot();

    const tag = page.locator('[data-ui-name="Tag"]');
    const count1 = await tag.count();
    for (let i = 0; i < count1; i++) {
      await expect(tag.nth(i)).toHaveAttribute('tabindex', '-1');
      await expect(tag.nth(i)).toHaveAttribute('disabled');
    }
  });

  test('Verify Tag with addons and without close interactive', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-addons-interactive.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });

    await expect(page).toHaveScreenshot();

    const tagText = page.locator('[data-ui-name="Tag.Text"]');
    const count1 = await tagText.count();
    for (let i = 0; i < count1; i++) {
      await expect(tagText.nth(i)).toHaveAttribute('tabindex', '-1');
      await expect(tagText.nth(i)).toHaveCSS(
        'padding-left',
        '4px',
      );
      await expect(tagText.nth(i)).toHaveCSS(
        'padding-right',
        '4px',
      );
    }

    const flexPrimary = page.locator('[data-testid="Primary-base"]');
    const tags = flexPrimary.locator('[data-ui-name="Tag"]');

    await tags.nth(4).hover();
    await expect(page).toHaveScreenshot();

    const flexSecondary = page.locator('[data-testid="Secondary-base"]');
    const tagsSec = flexSecondary.locator('[data-ui-name="Tag"]');

    await tagsSec.nth(4).hover();
    await expect(page).toHaveScreenshot();

    const flexAdditional = page.locator('[data-testid="additional-base"]');
    const tagsAdd = flexAdditional.locator('[data-ui-name="Tag"]');

    await tagsAdd.nth(4).hover();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Grouping Tags', () => {
  test('Verify grouping Less than 5 tags', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/grouping_tags_less.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const flex = page.locator('[data-ui-name="Flex"]');
    await expect(flex).toHaveAttribute('role', 'group');
    await expect(page).toHaveScreenshot();
  });

  test('Verify grouping More than 5 tags', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/grouping_tags_more.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const flex = page.locator('ul[data-ui-name="Flex"]');
    const tags = flex.locator('li[data-ui-name="Tag"]');
    await expect(tags).toHaveCount(5);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Tags container sizes color and themes', () => {
  test('Verify TagContainer without addons and with close', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-X.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });

    await expect(page).toHaveScreenshot();

    const close = page.locator('[data-ui-name="TagContainer.Close"]');
    const count = await close.count();
    for (let i = 0; i < count; i++) {
      await expect(close.nth(i)).toHaveAttribute('aria-label', 'Delete');
      await expect(close.nth(i)).toHaveAttribute('aria-labelledby');
    }

    const flexPrimary = page.locator('[data-testid="Primary-close"]');
    const tags = flexPrimary.locator('[data-ui-name="TagContainer.Tag"]');

    await tags.nth(4).hover();
    await expect(page).toHaveScreenshot();

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

  test('Verify TagContainer with icon and with close', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-icon-and-X.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });

    await expect(page).toHaveScreenshot();

    const close = page.locator('[data-ui-name="TagContainer.Close"]');
    const count = await close.count();
    for (let i = 0; i < count; i++) {
      await expect(close.nth(i)).toHaveAttribute('aria-label', 'Delete');
      await expect(close.nth(i)).toHaveAttribute('aria-labelledby');
    }

    const tagText = page.locator('[data-ui-name="Tag.Text"]');
    const count1 = await close.count();
    for (let i = 0; i < count1; i++) {
      await expect(tagText.nth(i)).toHaveAttribute('tabindex', '-1');
      await expect(tagText.nth(i)).toHaveCSS(
        'padding-left',
        '4px',
      );
    }

    const flexPrimary = page.locator('[data-testid="Primary-base"]');
    const tags = flexPrimary.locator('[data-ui-name="TagContainer.Close"]');

    await tags.nth(4).hover();
    await expect(page).toHaveScreenshot();

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

  test('Verify TagContainer intearctive with icon and with disabled close', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-icon-and-disabled-X.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify TagContainer with addons and without close interactive', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-interactive.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });

    await expect(page).toHaveScreenshot();

    const tagText = page.locator('[data-ui-name="Tag.Text"]');
    const count1 = await tagText.count();
    for (let i = 0; i < count1; i++) {
      await expect(tagText.nth(i)).toHaveAttribute('tabindex', '-1');
      await expect(tagText.nth(i)).toHaveCSS(
        'padding-left',
        '4px',
      );
      await expect(tagText.nth(i)).toHaveCSS(
        'padding-right',
        '4px',
      );
    }

    const flexPrimary = page.locator('[data-testid="Primary-base"]');
    const tags = flexPrimary.locator('[data-ui-name="TagContainer.Tag"]');

    await tags.nth(4).hover();
    await expect(page).toHaveScreenshot();

    const flexSecondary = page.locator('[data-testid="secondary-base"]');
    const tagsSec = flexSecondary.locator('[data-ui-name="TagContainer.Tag"]');

    await tagsSec.nth(4).hover();
    await expect(page).toHaveScreenshot();

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

  test('Verify TagContainer with addon and with close interactive', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-and-X-interactive';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });

    await expect(page).toHaveScreenshot();

    const tagText = page.locator('[data-ui-name="Tag.Text"]');
    const count1 = await tagText.count();
    for (let i = 0; i < count1; i++) {
      await expect(tagText.nth(i)).toHaveAttribute('tabindex', '-1');
      await expect(tagText.nth(i)).toHaveCSS(
        'padding-left',
        '4px',
      );
    }

    const flexPrimary = page.locator('[data-testid="Primary-base"]');
    const tagContaiterPr = flexPrimary.locator('[data-ui-name="TagContainer.Tag"]');
    const tagContaiterClosePr = flexPrimary.locator('[data-ui-name="TagContainer.Close"]');

    await tagContaiterPr.nth(4).hover();
    await expect(page).toHaveScreenshot();

    await tagContaiterClosePr.nth(4).hover();
    await expect(page).toHaveScreenshot();

    const flexSecondary = page.locator('[data-testid="secondary-base"]');
    const tagContaiterSec = flexSecondary.locator('[data-ui-name="TagContainer.Tag"]');
    const tagContaiterCloseSec = flexSecondary.locator('[data-ui-name="TagContainer.Close"]');

    await tagContaiterSec.nth(4).hover();
    await expect(page).toHaveScreenshot();

    await tagContaiterCloseSec.nth(4).hover();
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify TagContainer with addon and with close disabled', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-and-X-disabled';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });

    await expect(page).toHaveScreenshot();

    const tagContainer = page.locator('[data-ui-name="TagContainer.Tag"]');
    const count1 = await tagContainer.count();
    for (let i = 0; i < count1; i++) {
      await expect(tagContainer.nth(i)).toHaveAttribute('tabindex', '-1');
      await expect(tagContainer.nth(i)).toHaveAttribute('disabled');
    }
  });

  test('Verify TagContainer with addon and with close active', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-and-X-active-part';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 700, height: 1300 });

    await expect(page).toHaveScreenshot();

    const flexPrimary = page.locator('[data-testid="Primary-base"]');
    const tagContaiterClosePr = flexPrimary.locator('[data-ui-name="TagContainer.Close"]');

    await tagContaiterClosePr.first().hover();
    await expect(page).toHaveScreenshot();

    const flexSecondary = page.locator('[data-testid="secondary-base"]');
    const tagContaiterCloseSec = flexSecondary.locator('[data-ui-name="TagContainer.Close"]');

    await tagContaiterCloseSec.first().hover();
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Tag interactions', () => {
  test('Verify Editing tag when tag by mouse inside inline-edit', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/editing_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const inlineEditView = page.locator('[data-ui-name="InlineEdit.View"]');
    const tag = inlineEditView.locator('span[data-ui-name="Tag.Text"]');
    const save = page.getByLabel('Save');
    const cancel = page.getByLabel('Cancel');

    await expect(tag).toHaveText('Default tag');
    await inlineEditView.click();

    await page.keyboard.type('Test');
    await cancel.click();
    await expect(tag).toHaveText('Default tag');

    await inlineEditView.click();
    await page.keyboard.type('Test');
    await save.click();
    await expect(tag).toHaveText('Default tag'); // bug in example

    await inlineEditView.click();
    await page.keyboard.type('Test');
    await page.keyboard.press('Enter');

    await expect(tag).toHaveText('Default tagTest');
  });

  test('Verify Editing tag when tag by keyboard inside inline-edit', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/editing_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const inlineEditView = page.locator('[data-ui-name="InlineEdit.View"]');
    const tag = inlineEditView.locator('span[data-ui-name="Tag.Text"]');

    await expect(tag).toHaveText('Default tag');
    await page.keyboard.press('Tab');

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Enter');
    await page.keyboard.type('Test');
    await page.keyboard.press('Escape');
    await expect(tag).toHaveText('Default tag');

    await page.keyboard.press('Enter');
    await page.keyboard.type('Test Test Test');
    await page.keyboard.press('Enter');

    await expect(tag).toHaveText('Default tag');// bug
  });

  test('Verify Removing tags by mouse', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/removing_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const tags = page.locator('[data-ui-name="TagContainer"]');
    const close = page.locator('[data-ui-name="TagContainer.Close"]');

    await expect(tags).toHaveCount(3);
    await close.nth(1).click();
    await expect(tags).toHaveCount(2);
    await close.nth(0).click();
    await expect(tags).toHaveCount(1);
    await close.nth(0).click();
    await expect(tags).toHaveCount(0);
  });

  test('Verify Removing tags by keyboard', async ({ page }) => {
    const standPath = 'stories/components/tag/docs/examples/removing_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const tags = page.locator('[data-ui-name="TagContainer"]');
    const close = page.locator('[data-ui-name="TagContainer.Close"]');

    await page.keyboard.press('Tab');
    await expect(tags).toHaveCount(3);
    await expect(close.first()).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(tags).toHaveCount(2);
    await expect(close.first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(close.nth(1)).toBeFocused();
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Space');

    await expect(tags).toHaveCount(1);
    await expect(close.first()).not.toBeFocused();
  });
});
