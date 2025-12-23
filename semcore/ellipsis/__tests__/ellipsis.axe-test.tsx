import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @ellipsis`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/ellipsis/docs/examples/basic_usage.tsx', 'en');

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
    await loadPage(page, 'stories/components/ellipsis/docs/examples/advanced_use.tsx', 'en');

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
    await loadPage(page, 'stories/components/ellipsis/docs/examples/multiline.tsx', 'en');

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
    await loadPage(page, 'stories/components/ellipsis/docs/examples/multiple_use.tsx', 'en');

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
    await loadPage(page, 'stories/components/ellipsis/docs/examples/tooltip-cursor-anchoring.tsx', 'en');

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
    await loadPage(page, 'stories/components/ellipsis/docs/examples/trimming_type.tsx', 'en');

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
