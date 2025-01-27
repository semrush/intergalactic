import {
  expect,
  getAccessibilityViolations,
  test,
  type Page,
} from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

async function checkByAxe(page: Page) {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  const violations = await getAccessibilityViolations({ page });

  return violations;
}

test.describe('Dropdown-menu', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
    expect(await checkByAxe(page)).toEqual([]);
  });

  test('Nested', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/nested.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    expect(await checkByAxe(page)).toEqual([]);
  });
  test('Nested with focusable', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/nested_with_focusable.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    expect(await checkByAxe(page)).toEqual([]);
  });
  test('List item types', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/list_item_types.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    expect(await checkByAxe(page)).toEqual([]);
  });
  test('Item actions', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/item_actions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    expect(await checkByAxe(page)).toEqual([]);
  });

  test('Selectable radio items', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/selectable_radio_items.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    expect(await checkByAxe(page)).toEqual([]);
  });

  test('Multiselect items', async ({ page }) => {
    const standPath = 'stories/components/dropdown-menu/docs/examples/multiselect_items.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    expect(await checkByAxe(page)).toEqual([]);
  });
});
