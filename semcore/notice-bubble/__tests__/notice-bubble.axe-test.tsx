import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@notice-bubble ${TAG.ACCESSIBILITY}`, () => {
  test('Verify basic notice bubble accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/basic_notice.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify completion state accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/completion_state.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify dynamic notice accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/dynamic_notice.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify failure notice accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/failure_notice.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify no connection notice accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/no_connection_notice.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify no connection with action accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/no_connection_notice_with_action.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify notice bubble not in portal accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/noticebubble_not_in_portal.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify reload action accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/reload_action.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify replace last notice accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/replace_last_notice.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify special events notice accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/special_events_notice.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify success notice accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/success_notice.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify undo action accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-bubble/docs/examples/undo_action.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="Animation"]').waitFor();

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
