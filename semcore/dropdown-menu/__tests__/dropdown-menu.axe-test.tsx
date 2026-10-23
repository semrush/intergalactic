import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@dropdown-menu ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/basic.tsx', 'en');

    await test.step('Verify closed menu', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify opened menu', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('Dropdown menu', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/dropdown-menu.tsx', 'en');

    await test.step('Verify closed menu', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify opened menu', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('Nested', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/nested.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Nested with focusable', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/nested_with_focusable.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('List item types', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/list_item_types.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Item actions', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/item_actions.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Selectable radio items', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/selectable_radio_items.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Multiselect items', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/multiselect_items.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('The second method', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/the_second_method.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Sticky group', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/sticky_groups.tsx', 'en');
    const search = page.locator('input[data-ui-name="InputSearch"]');

    await test.step('Verify opened menu', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify StatusItem with results', async () => {
      await search.fill('Project 1');
      await expect(page.getByRole('status')).not.toHaveCount(0);
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify StatusItem nothing found', async () => {
      await search.fill('zzz');
      await expect(page.getByText('Nothing found').first()).toBeVisible();
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });
});
