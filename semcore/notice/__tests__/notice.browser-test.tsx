import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Notice - Functional', () => {
  test('Verify Feedback notice closed by action button', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const askMeLaterButton = page.getByRole('button', { name: 'Ask me later' });
    await expect(page.locator('[data-ui-name="Notice"]')).toBeVisible();
    await askMeLaterButton.click();
    await expect(page.locator('[data-ui-name="Notice"]')).not.toBeVisible();
  });
});

test.describe('Notice - Visual', () => {
  test('Verify roles and attributes ans styles', async ({ page, browserName }) => {
    const standPath = 'stories/components/notice/docs/examples/basic_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const notices = await page.locator('[data-ui-name="Notice"]').all();
    const closes = await page.locator('[data-ui-name="Notice.Close"]').all();
    for (const notice of notices) {
      const classAttribute = await notice.getAttribute('class');
      const roleAttribute = await notice.getAttribute('role');

      if (classAttribute?.includes('mute')) {
        expect(roleAttribute).toBeNull();
      } else {
        expect(roleAttribute).toBe('region');
      }
      expect(notice).toHaveAttribute('aria-label');
    }
    for (const close of closes) {
      expect(close).toHaveAttribute('aria-label', 'Close notification');
      expect(close).toHaveAttribute('tabindex', '0');
    }

    const noticeContent = page.locator('[data-ui-name="Notice.Content"]');
    const title = noticeContent.first().locator('[data-ui-name="Notice.Title"]');
    await expect(title).toHaveCSS('margin-top', '2px');
    await expect(title).toHaveCSS('margin-bottom', '2px');

    const text = noticeContent.first().locator('[data-ui-name="Notice.Text"]');
    await expect(text).toHaveCSS('margin-top', '4px');
    await expect(text).toHaveCSS('margin-bottom', '4px');
  });

  test('Verify different pairs of sub-components', async ({ page, browserName }) => {
    const standPath = 'stories/components/notice/tests/examples/notice_with_different_states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 1600, height: 1000 });

    await expect(page).toHaveScreenshot();
  });

  test('Verify notice with big illustrations', async ({ page, browserName }) => {
    const standPath = 'stories/components/notice/tests/examples/notice_big_illustration.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 1600, height: 1000 });

    await expect(page).toHaveScreenshot();
  });

  test('Verify notice with medium illustrations', async ({ page, browserName }) => {
    const standPath = 'stories/components/notice/tests/examples/notice_medium_illustration.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 1600, height: 1000 });

    await expect(page).toHaveScreenshot();
  });

  test('Verify notice with small illustrations', async ({ page, browserName }) => {
    const standPath = 'stories/components/notice/tests/examples/notice_small_illustration.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 1600, height: 1000 });

    await expect(page).toHaveScreenshot();
  });

  test('Verify Feedback notice ', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('NoticeSmart - Vusial', () => {
  test('Verify NoticeSmart after mouse and keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/notice/docs/examples/noticesmart.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const closes = await page.locator('[data-ui-name="Notice.Close"]');
    const closeNotif = page.getByText('Close notification');
    await page.keyboard.press('Tab');
    await closeNotif.first().waitFor({ state: 'visible' });

    await closes.nth(1).hover();
    await closeNotif.nth(1).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Enter');
    await closes.first().click();

    await expect(page).toHaveScreenshot();
  });
});

test.describe('NoticeSmart - Functional', () => {
  test('Verify NoticeSmart roles and attributes', async ({ page, browserName }) => {
    const standPath = 'stories/components/notice/docs/examples/noticesmart.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const notices = await page.locator('[data-ui-name="NoticeSmart"]').all();
    const closes = await page.locator('[data-ui-name="Notice.Close"]').all();
    for (const notice of notices) {
      const classAttribute = await notice.getAttribute('class');
      const roleAttribute = await notice.getAttribute('role');

      if (classAttribute?.includes('mute')) {
        expect(roleAttribute).toBeNull();
        expect(notice).not.toHaveAttribute('aria-label');
      } else {
        expect(roleAttribute).toBe('region');
      }
    }
    for (const close of closes) {
      expect(close).toHaveAttribute('aria-label', 'Close notification');
      expect(close).toHaveAttribute('tabindex', '0');
    }
  });

  test('Verify NoticeSmart interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/notice/docs/examples/noticesmart.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const closes = await page.locator('[data-ui-name="Notice.Close"]');
    await page.keyboard.press('Tab');
    await expect(closes.first()).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page.getByLabel('New tool announcement')).not.toBeVisible();
    await closes.first().click();
    await expect(page.getByLabel('New feature announcement')).not.toBeVisible();
    await expect(page.getByLabel('New feature announcement')).not.toBeVisible();
    await expect(page.locator('[data-ui-name="Notice.Label"][color="muted"]')).not.toBeVisible();
  });
});
