import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Tooltip, Hint, Description tooltip', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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

    await test.step('Verify hint expanded', async () => {
      {
        await page.keyboard.press('Tab');
        await page.waitForSelector('text="Export to PDF"');

        const violations = await getAccessibilityViolations({ page });

        expect(violations).toEqual([]);
      }
      {
        await page.locator('[data-name="CheckAlt"]').hover();
        await page.waitForSelector('text="You confirmed your email"');
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      }
    });

    await test.step('Verify desctiprion tooltip expanded', async () => {
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
    const standPath = 'stories/components/tooltip/docs/examples/ignore_portal_stacking.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForSelector('text="Tooltip with ignoring portals stacking."');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Info icon', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/info_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.waitForSelector('text="Content for tooltip"');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Nested', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/nested.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
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
    const standPath = 'stories/components/tooltip/docs/examples/title.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
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
});
