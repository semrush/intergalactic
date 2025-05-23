import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import type { Page } from '@playwright/test';

// Utility for setting up content
async function setupPage(page: Page, standPath: string) {
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.setContent(htmlContent);
}

// Reusable keyboard actions
async function openNoticeByKeyboard(page: Page) {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
}

const locators = {
  closeButton: (page: Page) => page.getByLabel('Close'),
  closeHint: (page: Page) => page.getByText('Close'),
  buttonTrigger: (page: Page, text: string) =>
    page.locator(`[data-ui-name="Button"]`, { hasText: text }),
  successNotice: (page: Page, text: string) =>
    page.locator(`div[data-ui-name="Flex"] div[class^='___SMessage']`, { hasText: text }),
};

test.describe('Basic notice with Interactive element', () => {
  test('Open notice by keyboard click', async ({ page }) => {
    await setupPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx');

    // the X button focused on the notice with interactive element
    await openNoticeByKeyboard(page);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(locators.closeButton(page)).toBeFocused();
    await new Promise((resolve) => setTimeout(resolve, 250));
    await expect(locators.closeHint(page)).toBeVisible();
    await expect(page).toHaveScreenshot();

    //the focus returns to the trigger by press enter
    await page.keyboard.press('Enter');
    const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');
    await expect(buttonTrigger).toBeFocused();

    //еhe focus returns to the trigger by 2 escapes - 1st closes hint, 2nd-notice
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(buttonTrigger).toBeFocused();
  });

  test('Open notice by mouse click', async ({ page }) => {
    await setupPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx');

    const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');
    await buttonTrigger.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(page).toHaveScreenshot();
  });

  test('Open 2 notices by 2 keyboard clicks - return focus by shift tab', async ({ page }) => {
    await setupPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx');

    await openNoticeByKeyboard(page);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await page.keyboard.press('Shift+Tab');
    await expect(locators.buttonTrigger(page, 'Show basic notice')).toBeFocused();
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect(locators.closeHint(page)).toBeVisible();
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Success notice without Interactive element ', () => {
  test('Open notice by keyboard click', async ({ page }) => {
    await setupPage(page, 'stories/components/notice-bubble/docs/examples/success_notice.tsx');

    //the X button is not focused on the notice
    await openNoticeByKeyboard(page);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const successNotice = locators.successNotice(
      page,
      'Keyword was successfully moved to Keyword Analyzer!',
    );
    const buttonTrigger = locators.buttonTrigger(page, 'Show success notice');
    await expect(successNotice).toBeVisible();
    const closeButton = locators.closeButton(page);
    await expect(closeButton).not.toBeFocused();
    await expect(buttonTrigger).toBeFocused();
    await expect(page).toHaveScreenshot();
  });

  test('Open notice by mouse click', async ({ page }) => {
    await setupPage(page, 'stories/components/notice-bubble/docs/examples/success_notice.tsx');

    const buttonText = locators.buttonTrigger(page, 'Show success notice');
    await buttonText.click();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const successNotice = locators.successNotice(
      page,
      'Keyword was successfully moved to Keyword Analyzer!',
    );
    await expect(successNotice).toBeVisible();
    await expect(page).toHaveScreenshot();
  });

  test('Open 2 notices by 2 keyboard clicks - 2 enters', async ({ page }) => {
    await setupPage(page, 'stories/components/notice-bubble/docs/examples/success_notice.tsx');

    //the focus is on the trigger always
    await openNoticeByKeyboard(page);
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Replace last notice', () => {
  test('The notice is visible and replaces by keyboard', async ({ page }) => {
    await setupPage(page, 'stories/components/notice-bubble/docs/examples/replace_last_notice.tsx');

    await openNoticeByKeyboard(page);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const noticeBubble = page.locator('[data-ui-name="NoticeBubbleContainer"]');
    await expect(noticeBubble).toBeVisible();
    await expect(noticeBubble).toContainText('Link 1 was moved to');
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(noticeBubble).toContainText('Link 2 was moved to');
  });

  test('The notice is visible and replaces by mouse', async ({ page }) => {
    await setupPage(page, 'stories/components/notice-bubble/docs/examples/replace_last_notice.tsx');

    const buttonTrigger = locators.buttonTrigger(page, 'Show basic notice');
    await buttonTrigger.click();
    await new Promise((resolve) => setTimeout(resolve, 200));
    const noticeBubble = page.locator('[data-ui-name="NoticeBubbleContainer"]');
    await expect(noticeBubble).toBeVisible();
    await expect(noticeBubble).toContainText('Link 1 was moved to');
    await buttonTrigger.click();
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect(noticeBubble).toContainText('Link 2 was moved to');
  });
});

test.describe('Notice with illustration', () => {
  test('The illustraction looks good and positioned correclty', async ({ page }) => {
    await setupPage(
      page,
      'stories/components/notice-bubble/docs/examples/special_events_notice.tsx',
    );

    await openNoticeByKeyboard(page);
    await new Promise((resolve) => setTimeout(resolve, 250));
    const mailSentIcon = page.locator('svg[data-ui-name="MailSent"]');

    // Validate the dimensions of the SVG
    await expect(mailSentIcon).toHaveAttribute('width', '80');
    await expect(mailSentIcon).toHaveAttribute('height', '80');
    await new Promise((resolve) => setTimeout(resolve, 250));
    await expect(page).toHaveScreenshot();
  });
});
