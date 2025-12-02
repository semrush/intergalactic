import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@modal ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/basic_modal_window_usage.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Basic usage with modal open', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/basic_modal_window_usage.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Changing alignment', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/changing_the_alignment.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Changing alignment with modal open', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/changing_the_alignment.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Big height', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/modal_window_height_is_bigger_than_the_browser_page.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Big height with modal open', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/modal_window_height_is_bigger_than_the_browser_page.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Access to html nodes', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/access_to_internal_html_nodes.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Access to html nodes with modal open', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/access_to_internal_html_nodes.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Modal inside modal', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Modal inside modal with first modal open', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Modal inside modal with both modals open', async ({ page }) => {
    await loadPage(page, 'stories/components/modal/docs/examples/modal_window_inside_a_modal_window.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').nth(1).waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Confirmation modal', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/confirmation-modal-dialog/docs/examples/confirmation-modal-example.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
