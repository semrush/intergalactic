import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@select ${TAG.NVDA}`, () => {
  test('Users can interact with basic Select via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    await test.step('Navigate to select trigger and verify combobox announcement', async () => {
      await nvda.next();
      const trigger = await nvda.itemText();
      expect(trigger).toContain('combo box, collapsed');
    });

    await test.step('Activate select and verify menu opens', async () => {
      await nvda.press('Tab');
      await nvda.press('Space');
      await page.waitForTimeout(500);

      await nvda.next();
      const firstOption = await nvda.itemText();
      expect(firstOption).toContain('Basic select, list');
    });

    await test.step('Navigate through options', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toContain('Option 2, 3 of 6');
    });

    await test.step('Navigate backwards through options', async () => {
      await nvda.previous();
      expect(await nvda.itemText()).toContain('Option 1, 2 of 6');
    });
  });

  test('Users can interact with Multiselect via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/select/docs/examples/multiselect.tsx', 'en');

    await test.step('Navigate to multiselect trigger and verify announcement', async () => {
      await nvda.next();
      const trigger = await nvda.itemText();
      expect(trigger).toContain('combo box, collapsed');
    });

    await test.step('Activate multiselect and verify options with checkboxes', async () => {
      await nvda.press('Tab');
      await nvda.press('Space');
      await page.waitForTimeout(500);

      await nvda.next();
      const firstOption = await nvda.itemText();
      expect(firstOption).toContain('Multiselect, list');
    });

    await test.step('Navigate through options', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toContain('Option 2, 3 of 20');
    });

    await test.step('Navigate through options', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toContain('Option 2, 4 of 20');
    });
  });

  test('Users can interact with Select loading state via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/select/docs/examples/loading_state.tsx', 'en');

    await test.step('Navigate to loading ', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toContain('Loading');
    });
  });
});
