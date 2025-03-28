import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { selectOption } from './utils';

test.describe('Filter-Trigger', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/filter-trigger/docs/examples/usage_with_select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // check empty filter trigger
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // check filter trigger with value
    {
      await selectOption(page);

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Accessible name with counter', async ({ page }) => {
    const standPath = 'stories/components/filter-trigger/docs/examples/accessible_name.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // check empty filter trigger
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // check filter trigger with value
    {
      const trigger = page.getByLabel('Material');
      await trigger.click();

      const options = page.getByRole('option');
      await options.nth(0).click();
      await options.nth(1).click();
      await options.nth(2).click();

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});

test.describe('Link-Trigger', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/base-trigger/docs/examples/link-trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // check empty filter trigger
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // check filter trigger with value
    {
      await selectOption(page);

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});

test.describe('Button-Trigger', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // check empty filter trigger
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // check filter trigger with value
    {
      await selectOption(page);

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
