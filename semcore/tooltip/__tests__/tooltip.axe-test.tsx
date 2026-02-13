import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@tooltip ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/tooltip/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify collapsed triggers', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Verify tooltip expanded', async () => {
      {
        await page.keyboard.press('Tab');
        await page.waitForSelector(
          'text="Default tooltip contains short text explaining something about the trigger."',
        );

        const violations = await getAccessibilityViolations({ page });

        expect(violations).toEqual([]);
      }

      {
        await page.keyboard.press('Tab');

        const violations = await getAccessibilityViolations({ page });

        expect(violations).toEqual([]);
      }
    });

    await test.step('Verify descriprion tooltip expanded', async () => {
      {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.waitForSelector('[data-ui-name="Link"]');

        const violations = await getAccessibilityViolations({ page });

        expect(violations).toEqual([]);
      }
    });
  });

  test('Ignore portal stacking', async ({ page }) => {
    await loadPage(page, 'stories/components/tooltip/docs/examples/ignore_portal_stacking.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text="Tooltip with ignoring portals stacking."');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Info icon', async ({ page }) => {
    await loadPage(page, 'stories/components/tooltip/docs/examples/info_icon.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.waitForSelector('text="Content for tooltip"');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Nested', async ({ page }) => {
    await loadPage(page, 'stories/components/tooltip/docs/examples/nested.tsx', 'en');
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
    {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Hello, stranger!"');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Title', async ({ page }) => {
    await loadPage(page, 'stories/components/tooltip/docs/examples/title.tsx', 'en');
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
    {
      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Hello, stranger!"');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Custom background color', async ({ page }) => {
    await loadPage(page, 'stories/components/tooltip/docs/examples/custom_bg_color.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Placement properties', async ({ page }) => {
    await loadPage(page, 'stories/components/tooltip/docs/examples/placement-properties.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test.skip('Role status', async ({ page }) => {
    await loadPage(page, 'stories/components/tooltip/docs/examples/role-status.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Singleton tooltip', async ({ page }) => {
    await loadPage(page, 'stories/components/tooltip/docs/examples/singleton.tsx', 'en');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
