import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('DatePicker', () => {
  test('single date', async ({ page }) => {
    const standPath = 'website/docs/components/date-picker/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.InputTrigger"]');
    const screenshotsClip = (await datePicker.first().boundingBox())!;
    screenshotsClip.x -= 4;
    screenshotsClip.y -= 4;
    screenshotsClip.width += 8;
    screenshotsClip.height += 8;

    await page.keyboard.press('Tab');
    await page.keyboard.type('05');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.type('29');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.type('2000');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
  });
});
