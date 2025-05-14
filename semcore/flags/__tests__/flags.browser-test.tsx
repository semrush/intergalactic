import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test('Flags have correct role and aria-label', async ({ page }) => {
  const standPath = 'stories/components/flags/docs/examples/aria-label.tsx';
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);

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
