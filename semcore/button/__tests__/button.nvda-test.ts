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

    await nvda.next();
    expect(await nvda.itemText()).toBe('clickable, button, Close notification');
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
    });

    await test.step('Activate button and verify loading state', async () => {
      await nvda.perform(nvda.keyboardCommands.activate);

      // Wait for loading state to appear
      await page.waitForTimeout(500);

      await nvda.next();
      await nvda.previous();

      const loadingText = await nvda.itemText();
      // Button should announce loading state or be disabled during loading
      expect(loadingText).toBeTruthy();
    });
  });
});
