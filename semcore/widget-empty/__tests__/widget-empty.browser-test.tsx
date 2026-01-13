import { expect, test, type Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  widgetEmpty: (page: Page) => page.locator('[data-ui-name="WidgetEmpty"]'),
  widgetError: (page: Page) => page.locator('[data-ui-name="WidgetError"]'),
  widgetNoData: (page: Page) => page.locator('[data-ui-name="WidgetNoData"]'),
  image: (page: Page) => page.locator('img'),
  imageContainer: (page: Page) => page.locator('img').locator('..'),
  button: (page: Page, name: string) => page.getByRole('button', { name }),
  link: (page: Page, name: string) => page.getByRole('link', { name }),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(TAG.VISUAL, () => {
  const widgetEmptyVariables = [
    { iconName: 'nexttime', showTitle: true, showDescription: false, title: 'Next time will be better', description: undefined },
    { iconName: 'good', showTitle: false, showDescription: true, title: undefined, description: 'No results found' },
    { iconName: 'nexttime', showTitle: false, showDescription: false, title: undefined, description: undefined },
    { iconName: 'good', showTitle: true, showDescription: true, title: 'Very long title that should wrap to multiple lines when displayed in the widget empty component', description: 'This is a very long description text that demonstrates how the widget empty component handles lengthy content. It should wrap properly and maintain good readability across multiple lines without breaking the layout or causing any visual issues in the component.' },
    { iconName: 'nexttime', showTitle: true, showDescription: true, title: 'Short title', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  ];

  widgetEmptyVariables.forEach((item) => {
    test(`Verify WidgetEmpty with iconName=${item.iconName} showTitle=${item.showTitle} showDescription=${item.showDescription}`, {
      tag: [TAG.PRIORITY_HIGH, '@widget-empty'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/widget-empty/tests/examples/basic_usage.tsx', 'en', item);

      await test.step('Verify default state', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const widgetErrorVariables = [
    { showDescription: false, customDescription: undefined, showChildren: false },
    { showDescription: true, customDescription: 'Try again later. Contact support if needed.', showChildren: true },
    { showDescription: true, customDescription: 'This is a very long error description that explains in great detail what went wrong and provides comprehensive information to help users understand the issue. It includes multiple sentences with detailed explanations about the error condition, potential causes, and recommended steps to resolve the problem. The text should wrap properly across multiple lines while maintaining good readability and visual consistency.', showChildren: false },
  ];

  widgetErrorVariables.forEach((item) => {
    test(`Verify WidgetError with showDescription=${item.showDescription} showChildren=${item.showChildren}`, {
      tag: [TAG.PRIORITY_HIGH, '@widget-empty'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/widget-empty/tests/examples/widget_error_usage.tsx', 'en', item);

      await test.step('Verify default state', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const widgetNoDataVariables = [
    { type: 'nothing-found', showDescription: false, customDescription: undefined, showChildren: false },
    { type: 'line-chart', showDescription: true, customDescription: 'No data available', showChildren: false },
    { type: 'nothing-found', showDescription: false, customDescription: undefined, showChildren: true },
    { type: 'nothing-found', showDescription: true, customDescription: 'This is a very long no data description that explains in great detail why there is no data to display. It includes comprehensive information about what the user might do to get data, potential reasons for the empty state, and helpful guidance to improve their experience. The text should wrap properly across multiple lines while maintaining good readability and visual consistency.', showChildren: false },
  ];

  widgetNoDataVariables.forEach((item) => {
    test(`Verify WidgetNoData with type=${item.type} showDescription=${item.showDescription} showChildren=${item.showChildren}`, {
      tag: [TAG.PRIORITY_HIGH, '@widget-empty'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/widget-empty/tests/examples/widget_nodata_usage.tsx', 'en', item);

      await test.step('Verify default state', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test('Verify WidgetEmpty with actions', {
    tag: [TAG.PRIORITY_HIGH, '@widget-empty'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/custom_examples_actions.tsx', 'en');

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify WidgetEmpty custom examples', {
    tag: [TAG.PRIORITY_MEDIUM, '@widget-empty'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/custom-examples.tsx', 'en');

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test(`Verify WidgetError with i18n`, {
    tag: [TAG.PRIORITY_MEDIUM, '@widget-empty'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/error_example.tsx', 'en');

    await test.step('Verify default state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test(`Verify WidgetNoData with i18n `, {
    tag: [TAG.PRIORITY_MEDIUM, '@widget-empty'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/nodata_example.tsx', 'en');

    await test.step('Verify default state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'hidden' });

      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(TAG.FUNCTIONAL, () => {
  test('Verify WidgetEmpty with actions keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH, '@widget-empty', TAG.KEYBOARD],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/custom_examples_actions.tsx', 'en');

    await test.step('Verify button focus', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Set up [Tool Name]')).toBeFocused();
    });
  });

  test('Verify WidgetError with actions keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH, '@widget-empty', TAG.KEYBOARD],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/error_example.tsx', 'en');

    await test.step('Verify keyboard navigation to first button', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Reload page').first()).toBeFocused();
    });
  });

  test('Verify WidgetNoData with actions keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH, '@widget-empty', TAG.KEYBOARD],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/nodata_example.tsx', 'en');

    await test.step('Verify keyboard navigation to button', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Clear filters')).toBeFocused();
    });
  });
});
