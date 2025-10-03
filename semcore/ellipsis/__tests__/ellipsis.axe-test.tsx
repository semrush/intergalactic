import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';

test.describe('Ellipsis', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/ellipsis/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened tooltip check
    {
      const ellipsisContent = page.getByRole('link');
      const box = await ellipsisContent.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Advanced use', async ({ page }) => {
    const standPath = 'stories/components/ellipsis/docs/examples/advanced_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened tooltip check
    {
      const ellipsisContent = page.locator('[data-ui-name="Ellipsis.Content"]');
      const box = await ellipsisContent.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Multiline in card ', async ({ page }) => {
    const standPath = 'stories/components/ellipsis/docs/examples/multiline.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened tooltip check
    {
      const ellipsisContent = page.locator('[data-ui-name="Ellipsis"]');
      const box = await ellipsisContent.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Multiple use in table', async ({ page }) => {
    const standPath = 'stories/components/ellipsis/docs/examples/multiple_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened tooltip check
    {
      const ellipsisContent = page.locator('[data-ui-name="Tooltip"]');
      const box = await ellipsisContent.first().boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Cursor anchoring', async ({ page }) => {
    const standPath = 'stories/components/ellipsis/docs/examples/tooltip-cursor-anchoring.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened tooltip check
    {
      const ellipsisContent = page.locator('[data-ui-name="Ellipsis.Content"]');
      const box = await ellipsisContent.first().boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Trimming type', async ({ page }) => {
    const standPath = 'stories/components/ellipsis/docs/examples/trimming_type.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened tooltip check
    {
      const ellipsisContent = page.locator('[data-ui-name="Tooltip"]');
      const box = await ellipsisContent.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
