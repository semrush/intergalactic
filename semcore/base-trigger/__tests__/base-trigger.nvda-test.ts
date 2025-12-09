import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@base-trigger ${TAG.NVDA}`, () => {
  test('Users can interact with FilterTrigger with accessible name via NVDA', async ({
    page,
    nvda,
  }) => {
    await loadPage(
      page,
      'stories/components/base-trigger/docs/filter-trigger/examples/accessible_name.tsx',
      'en',
    );

    await nvda.next();

    // NVDA announces combobox role, state, and accessible label
    expect(await nvda.itemText()).toBe('clickable, Material, combo box, collapsed');
  });

  test('Users can interact with FilterTrigger with Select via NVDA', async ({
    page,
    nvda,
  }) => {
    await loadPage(
      page,
      'stories/components/base-trigger/docs/filter-trigger/examples/usage_with_select.tsx',
      'en',
    );

    await test.step('Navigate to first select and verify announcement', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toBe('clickable, combo box, collapsed');
    });

    await test.step('Activate first select and verify menu opens', async () => {
      await nvda.next();
      page.keyboard.press('Space');
      await page.getByRole('option').first().waitFor({ state: 'visible' });

      await nvda.next();
      const menuItem = await nvda.itemText();
      // Menu items should announce as clickable options
      expect(menuItem).toContain('clickable');
    });
  });

  test('Users can interact with LinkTrigger via NVDA', async ({ page, nvda }) => {
    await loadPage(
      page,
      'stories/components/base-trigger/docs/link-trigger/examples/link-trigger.tsx',
      'en',
    );

    await test.step('Navigate to LinkTrigger and verify announcement', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toBe('combo box, collapsed, Select option');
    });

    await test.step('Activate LinkTrigger and verify menu opens', async () => {
      await nvda.next();
      page.keyboard.press('Space');
      await page.getByRole('option').first().waitFor({ state: 'visible' });

      await nvda.next();

      const announcement = await nvda.itemText();
      expect(announcement).toContain('Desktop');
    });
  });
});
