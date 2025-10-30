import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Flags have correct role and aria-label', {
    tag: [TAG.PRIORITY_HIGH,
      '@flags'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/flags/docs/examples/aria-label.tsx', 'en');

    const expectedLabels: Record<string, string> = {
      US: 'United States',
      DE: 'Germany',
      ES: 'Spain',
      FR: 'France',
      IT: 'Italy',
    };

    const flags = page.locator('[data-ui-name="Flags"]');
    const count = await flags.count();

    for (let i = 0; i < count; i++) {
      const flag = flags.nth(i);
      const code = await flag.getAttribute('name');
      const role = await flag.getAttribute('role');
      const ariaLabel = await flag.getAttribute('aria-label');

      expect(role).toBe('img');
      expect(code).toBeTruthy();
      // @ts-ignore
      expect(ariaLabel).toBe(expectedLabels[code]);
    }
  });
});
