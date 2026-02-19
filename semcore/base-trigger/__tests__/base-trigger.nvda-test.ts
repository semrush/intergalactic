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
    expect(await nvda.itemText()).toContain('expanded');
    await nvda.next();

    expect(await nvda.itemText()).toContain('Material, list. Metal, 2 of 4');
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
      expect(await nvda.itemText()).toContain('expanded');
    });

    await test.step('Activate first select and verify menu opens', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toContain('Color, list. Gray, 2 of 9');
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
      expect(await nvda.itemText()).toContain('expanded');
    });

    await test.step('Activate LinkTrigger and verify menu opens', async () => {
      await nvda.next();
      expect(await nvda.itemText()).toContain('Device:, list. Mobile, 2 of 3');
    });
  });
});
