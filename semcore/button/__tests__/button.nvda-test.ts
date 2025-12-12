import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@button ${TAG.NVDA}`, () => {
  test(`Users can interact with Button with only Addons via NVDA`, async ({
    page,
    nvda,
  }) => {
    await loadPage(page, 'stories/components/button/docs/examples/button_with_icon.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toBe('clickable, button, Confirm');
  });

  test(`Users can interact with Button with only addon props`, async ({
    page,
    nvda,
  }) => {
    await loadPage(page, 'stories/components/button/docs/examples/button_accessibility.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toBe('clickable, button, Confirm action, button, Close notification');
  });

  test(`Users can interact with Button with loading state via NVDA`, async ({
    page,
    nvda,
  }) => {
    await loadPage(page, 'stories/components/button/docs/examples/button_with_loading.tsx', 'en');

    await test.step('Navigate to button and verify initial state', async () => {
      await nvda.next();
      const buttonText = await nvda.itemText();
      expect(buttonText).toContain('button');
      expect(buttonText).toContain('busy');
      expect(buttonText).toContain('Loading...');
    });
  });
});
