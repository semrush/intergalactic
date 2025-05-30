import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Notice', () => {
  test('Verify roles fot themes', async ({ page, browserName }) => {
    const standPath = 'stories/components/notice/docs/examples/basic_notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const notices = await page.locator('[data-ui-name="Notice"]').all();

    for (const notice of notices) {
      const classAttribute = await notice.getAttribute('class');
      const roleAttribute = await notice.getAttribute('role');

      if (classAttribute?.includes('mute')) {
        expect(roleAttribute).toBeNull();
      } else {
        expect(roleAttribute).toBe('region');
      }
    }
  });
});
