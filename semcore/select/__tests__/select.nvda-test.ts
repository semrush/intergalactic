import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@select ${TAG.NVDA}`, () => {
  test('Users can interact with basic Select via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    await test.step('Navigate to select trigger and verify combobox announcement', async () => {
      await nvda.next();
      await nvda.next();
      const trigger = await nvda.itemText();
      // Select trigger should announce as clickable combobox
      expect(trigger).toContain('clickable');
      expect(trigger).toContain('combobox');
      expect(trigger).toContain('collapsed');
    });

    await test.step('Activate select and verify menu opens', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);

      await nvda.next();
      const firstOption = await nvda.itemText();
      // First option should be announced
      expect(firstOption).toContain('Option 0');
      expect(firstOption).toContain('not selected');
      expect(firstOption).toContain('1 of 6');
    });

    await test.step('Navigate through options', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toContain('Option 1');
      expect(nvda.itemText()).toContain('not selected');
      expect(nvda.itemText()).toContain('2 of 6');
    });

    await test.step('Navigate backwards through options', async () => {
      await nvda.previous();
      expect(await nvda.itemText()).toContain('Option 0');
    });
  });

  test.skip('Users can select an option via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/select/docs/examples/basic_usage.tsx', 'en');

    await nvda.next();
    await nvda.next();
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);

    await test.step('Navigate to second option and select it', async () => {
      await nvda.next();
      await nvda.next();
      expect(await nvda.itemText()).toContain('Option 1');

      await page.keyboard.press('Space');
      await page.waitForTimeout(500);

      expect(await nvda.itemText()).toContain('collapsed');
    });
  });

  test.skip('Users can interact with Multiselect via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/select/docs/examples/multiselect.tsx', 'en');

    await test.step('Navigate to multiselect trigger and verify announcement', async () => {
      await nvda.next();
      const trigger = await nvda.itemText();
      expect(trigger).toContain('combobox');
      expect(trigger).toContain('collapsed');
    });

    await test.step('Activate multiselect and verify options with checkboxes', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);

      await nvda.next();
      const firstOption = await nvda.itemText();
      // Multiselect options should announce checkbox
      expect(firstOption).toContain('Option 0');
      expect(firstOption).toContain('not selected');
      expect(firstOption).toContain('1 of 20');
    });

    await test.step('Select option', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(300);

      expect(await nvda.itemText()).toContain('selected');
    });

    await test.step('Close multiselect', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);

      expect(await nvda.itemText()).toContain('collapsed');
    });
  });

  test.skip('Users can interact with Select with search filtering via NVDA', async ({
    page,
    nvda,
  }) => {
    await loadPage(page, 'stories/components/select/docs/examples/options_filtering.tsx', 'en');

    await test.step('Navigate to search input and verify announcement', async () => {
      await nvda.next();
      await nvda.next();
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);

      await nvda.next();
      const searchInput = await nvda.itemText();
      // Search input should be announced with edit role
      expect(searchInput).toContain('edit');
    });

    await test.step('Type in search and verify filtered results', async () => {
      await page.getByRole('searchbox').fill('Apple');
      await page.waitForTimeout(500);

      await nvda.next();
      const filteredOption = await nvda.itemText();
      expect(filteredOption).toContain('Apple');
    });
  });

  test.skip('Users can interact with Select loading state via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/select/docs/examples/loading_state.tsx', 'en');

    await test.step('Navigate to loading ', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toContain('Loading');
    });
  });
});
