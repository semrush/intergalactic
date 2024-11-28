import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Basic notice - Render ', () => {
  test('Open notice by keyboard click', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/basic_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 50));
    await expect(page).toHaveScreenshot();
  });

  test('Open notice by mouse click', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/basic_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const buttonText = page.locator('[data-ui-name="Button.Text"]:has-text("Show basic notice")');
    await buttonText.click();
    await new Promise((resolve) => setTimeout(resolve, 50));
    await expect(page).toHaveScreenshot();
  });

  test('Open 2 notices by 2 keyboard clicks', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/basic_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 50));
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Focus management - Render', () => {
  test('Open notice by keyboard click', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/undo_action.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    // the X button focused on the notice
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 50));
    await expect(page).toHaveScreenshot();
    //the focus returns to the trigger
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(page).toHaveScreenshot();
  });

  test('Open notice by mouse click', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/undo_action.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const buttonText = page.locator(
      '[data-ui-name="Button.Text"]:has-text("Show notice with undo action")',
    );
    await buttonText.click();
    await new Promise((resolve) => setTimeout(resolve, 50));
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Replace last notice - functional', () => {
  test('The notice is visible and replaces by keyboard', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/replace_last_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 50));
    const noticeBubble = page.locator('[data-ui-name="NoticeBubbleContainer"]');
    await expect(noticeBubble).toBeVisible();
    await expect(noticeBubble).toContainText('Link 1 was moved to');
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect(noticeBubble).toContainText('Link 2 was moved to');
  });

  test('The notice is visible and replaces by mouse', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/replace_last_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const buttonText = page.locator('[data-ui-name="Button.Text"]:has-text("Show basic notice")');
    await buttonText.click();
    await new Promise((resolve) => setTimeout(resolve, 50));
    const noticeBubble = page.locator('[data-ui-name="NoticeBubbleContainer"]');
    await expect(noticeBubble).toBeVisible();
    await expect(noticeBubble).toContainText('Link 1 was moved to');
    await buttonText.click();
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect(noticeBubble).toContainText('Link 2 was moved to');
  });
});
