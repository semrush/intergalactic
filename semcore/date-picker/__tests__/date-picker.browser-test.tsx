import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { mockDate, RealDate } from './utils';

test.describe('DatePicker', () => {
  test('single date', async ({ page }) => {
    const standPath = 'website/docs/components/date-picker/examples/datepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // date picker calendar contains title with the current month that will invaldiate screenshots every 30 days
    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
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

  test('validation tooltip', async ({ page }) => {
    const standPath = 'website/docs/components/date-picker/examples/disabled_dates.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.evaluateHandle(() => {
      window.global = window;
      // @ts-ignore
      window.RealDate = window.Date;
    });
    await page.evaluateHandle(mockDate, '2024-06-13T12:00:00.808Z');

    await page.setContent(htmlContent);

    const datePicker = await page.locator('[data-ui-name="DatePicker.Trigger"]');
    const screenshotsClip = (await datePicker.first().boundingBox())!;
    screenshotsClip.x -= 4;
    screenshotsClip.y -= 300;
    screenshotsClip.width += 8;
    screenshotsClip.height += 600;

    await page.keyboard.press('Tab');
    await page.keyboard.type('06');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.type('20');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.type('2024');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.press('Escape');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot({ clip: screenshotsClip });
  });
});
