import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@dropdown-menu ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/basic.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened dropdown check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Dropdown menu', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/dropdown-menu.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened dropdown check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
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

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('StatusItem with results', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx', 'en', { showSearch: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('textbox', { name: 'Search' }).fill('d');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('StatusItem nothing found', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx', 'en', { showSearch: true });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('textbox', { name: 'Search' }).fill('zzz');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('StatusItem loading state', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx', 'en', { showSearch: true, state: 'loading' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('StatusItem error state', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown-menu/tests/examples/dropdown-base-props.tsx', 'en', { showSearch: true, state: 'error' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
