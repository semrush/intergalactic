import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';

test.describe('Notice bubble', () => {
  test('Basic', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/basic_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Completion state', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/completion_state.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Dynamic', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/dynamic_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Failure', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/failure_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('No connection', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/no_connection_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('No connection with action', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/no_connection_notice_with_action.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Not in portal', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/noticebubble_not_in_portal.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Reload action', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/reload_action.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Replace last notice', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/replace_last_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Special events', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/special_events_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Success', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/success_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Undo action', async ({ page }) => {
    const standPath = 'stories/components/notice-bubble/docs/examples/undo_action.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
