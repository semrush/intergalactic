import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Tags styles', () => {
  test('Verify Tag without addons or close  - sizes color and themes', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 1000, height: 1000 });

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

  test('Verify Tag without addon and close disabled - sizes color and themes', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-disabled';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const tag = page.locator('[data-ui-name="Tag"]');
    const count1 = await tag.count();
    for (let i = 0; i < count1; i++) {
      await expect(tag.nth(i)).toHaveAttribute('tabindex', '-1');
      await expect(tag.nth(i)).toHaveAttribute('disabled');
    }
  });

  test('Verify Tag with addons and without close interactive - sizes color and themes', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-addons-interactive.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

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

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify TagContainer without addons and with - close sizes color and themes', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-X.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const close = page.locator('[data-ui-name="TagContainer.Close"]');
    const count = await close.count();
    for (let i = 0; i < count; i++) {
      await expect(close.nth(i)).toHaveAttribute('aria-label', 'Close');
      await expect(close.nth(i)).toHaveAttribute('aria-labelledby');
    }

    const flexPrimary = page.locator('[data-testid="Primary-close"]');
    const tags = flexPrimary.locator('[data-ui-name="Tag"]');

    await tags.nth(4).hover();
    await expect(page).toHaveScreenshot();

    const flexSecondary = page.locator('[data-testid="secondary-close"]');
    const tagsSec = flexSecondary.locator('[data-ui-name="Tag"]');

    await tagsSec.nth(4).hover();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify TagContainer with icon and with close - sizes color and themes', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-icon-and-X.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const close = page.locator('[data-ui-name="TagContainer.Close"]');
    const count = await close.count();
    for (let i = 0; i < count; i++) {
      await expect(close.nth(i)).toHaveAttribute('aria-label', 'Close');
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
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify TagContainer with addons and without close interactive - sizes color and themes', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-interactive.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

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

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify TagContainer with addon and with close interactive - sizes color and themes', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-and-X-interactive';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

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
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify TagContainer with addon and with close disabled - sizes color and themes', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-and-X-disabled';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const tagContainer = page.locator('[data-ui-name="TagContainer.Tag"]');
    const count1 = await tagContainer.count();
    for (let i = 0; i < count1; i++) {
      await expect(tagContainer.nth(i)).toHaveAttribute('tabindex', '-1');
      await expect(tagContainer.nth(i)).toHaveAttribute('disabled');
    }
  });

  test('Verify TagContainer with addon and with close active - sizes color and themes', async ({ page }) => {
    const standPath = 'stories/components/tag/tests/examples/styles-themes-sizes-with-addon-and-X-active-part';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const flexPrimary = page.locator('[data-testid="Primary-base"]');
    const tagContaiterClosePr = flexPrimary.locator('[data-ui-name="TagContainer.Close"]');

    await tagContaiterClosePr.first().hover();
    await expect(page).toHaveScreenshot();

    const flexSecondary = page.locator('[data-testid="secondary-base"]');
    const tagContaiterCloseSec = flexSecondary.locator('[data-ui-name="TagContainer.Close"]');

    await tagContaiterCloseSec.first().hover();
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});
