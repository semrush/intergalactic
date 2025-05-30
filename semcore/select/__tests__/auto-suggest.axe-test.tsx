import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('AutoSuggest', () => {
  test('Combobox', async ({ page }) => {
    const standPath = 'stories/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // default check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened select check
    {
      await page.keyboard.press('Tab');

      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('AutoSuggest', async ({ page }) => {
    const standPath = 'stories/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // default check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened select check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.type('a');
      await page.waitForSelector('text=persian');
      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Controlled and uncontrolled mode', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/controlled_and_uncontrolled_modes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // default check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // open Controlled mode
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // select option in Controlled mode and open Uncontrolled mode
    {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 100));
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // select option in Unontrolled 
    {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Trigger Customization', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/trigger_customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // default check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // open select from Button Link
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

  });

  test('Trigger Customization Deep', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/trigger_customization_deep.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // default check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // open select
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

  });

  test('Menu Customization With Notice', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/dropdownmenu_customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // default check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // open select
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

  });

  test('Loading state', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/loading_state.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // default check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // open select
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await new Promise((resolve) => setTimeout(resolve, 100));

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

  });
});

