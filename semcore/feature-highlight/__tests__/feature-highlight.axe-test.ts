import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@feature-highlight ${TAG.ACCESSIBILITY}`, () => {
  test('Verify Badge has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/badge.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Button has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/button.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Checkbox has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/checkbox.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Data table has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/data-table.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Input has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/input.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Notice has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/notice.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Notice advanced mode has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/tests/examples/notice/notice-advanced-mode.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Pills has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/pills.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Radio has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/radio.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Select has no Axe issues in closed state', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/select.tsx', 'en');

    await test.step('Verify closed state', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify opened state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'visible' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify closed state after selection', async () => {
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'hidden' });

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('Verify Switch has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/switch.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Verify Tabline has no Axe issues', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-highlight/docs/examples/tabline.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
