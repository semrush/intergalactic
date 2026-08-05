import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@select ${TAG.ACCESSIBILITY}`, () => {
  test.describe('Select', () => {
    test('Basic usage', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Custom selected label', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/custom_selected_label.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Controlled and uncontrolled mode', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/controlled_and_uncontrolled_modes.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Open Controlled mode', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Select option in Controlled mode and open Uncontrolled mode', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Select option in Uncontrolled', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Trigger Customization', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/trigger_customization.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Open select from Button Link', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Trigger Customization Deep', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/trigger_customization_deep.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Open select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Menu Customization With Notice', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/menu_customization.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Open select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Loading state', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/loading_state.tsx', 'en');

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    test('Sticky group', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/sticky_groups.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Open select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });
  });

  test.describe('Option', () => {
    test('Options', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/options.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Select option', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Options Filtering', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/options_filtering.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Advanced Filtering Control', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/advanced_filtering_control.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });
  });

  test.describe('Multiselect', () => {
    test('Multiselect', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/multiselect.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Select option', async () => {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Sorting Multiselect Options', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/sorting_multiselect_options.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Render function', async ({ page }) => {
      await loadPage(page, 'stories/components/select/docs/examples/render_function.tsx', 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });
  });

  test.describe('StatusItem', () => {
    const statusItemStory = 'stories/components/select/tests/examples/on_change_input_search.tsx';

    test('Result count', async ({ page }) => {
      await loadPage(page, statusItemStory, 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select with matching results', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });
        await page.keyboard.type('grape');

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Nothing found', async ({ page }) => {
      await loadPage(page, statusItemStory, 'en');

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select with no matches', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.getByRole('option').first().waitFor({ state: 'visible' });
        await page.keyboard.type('zzz');

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Loading state', async ({ page }) => {
      await loadPage(page, statusItemStory, 'en', { state: 'loading' });

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });

    test('Error state', async ({ page }) => {
      await loadPage(page, statusItemStory, 'en', { state: 'error' });

      await test.step('Default state', async () => {
        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });

      await test.step('Opened select', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        const violations = await getAccessibilityViolations({ page });
        expect(violations).toEqual([]);
      });
    });
  });
});
