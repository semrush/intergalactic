import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@date-picker ${TAG.ACCESSIBILITY}`, () => {
  test('Single date', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/datepicker.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Custom date range', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/custom_date_ranges.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Custom day', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/custom_day.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Custom header', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/custom_header.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Reset date', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/reset_date_picker.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // reset picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Date range comparator', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Date range comparator advanced', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/date_range_comparator_advanced_use.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Disabled dates', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/disabled_dates.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Month range comparator', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/month_range_comparator_advanced_use.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Month range picker', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/monthrangepicker.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Trigger and popper', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/trigger_and_popper.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Week picker', async ({ page }) => {
    await loadPage(page, 'stories/components/date-picker/docs/examples/week_picker.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened date picker check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
