import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
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
    expect(await nvda.itemText()).toContain('clickable, Material, combo box, collapsed');
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
      expect(await nvda.itemText()).toContain('clickable, combo box, collapsed');
    });

    await test.step('Activate first select and verify menu opens', async () => {
      await nvda.perform(nvda.keyboardCommands.activate);
      await page.waitForTimeout(500);
      await nvda.next();
      await nvda.next();
      expect(await nvda.itemText()).toContain('Color, list');

      await nvda.next();
      expect(await nvda.itemText()).toContain('Gray, 2 of 9');
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
      expect(await nvda.itemText()).toContain('clickable, combo box, collapsed, Select option');
    });

    await test.step('Activate LinkTrigger and verify menu opens', async () => {
      await nvda.perform(nvda.keyboardCommands.activate);
      await page.waitForTimeout(500);
      await nvda.next();
      await nvda.next();
      expect(await nvda.itemText()).toContain('Device:, list');
      await nvda.next();
      expect(await nvda.itemText()).toContain('Mobile, 2 of 3');
    });
  });
});
