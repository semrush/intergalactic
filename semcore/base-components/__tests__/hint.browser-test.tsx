import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visuals', () => {
  const placements = [
    { placement: 'top-start' },
    { placement: 'top' },
    { placement: 'top-end' },
    { placement: 'left-start' },
    { placement: 'left' },
    { placement: 'left-end' },
    { placement: 'right-start' },
    { placement: 'right' },
    { placement: 'right-end' },
    { placement: 'bottom-start' },
    { placement: 'bottom' },
    { placement: 'bottom-end' },
  ];

  placements.forEach((item) => {
    test(`Verify Hint for placements ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/base-components/hint/tests/examples/base-example-props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);
      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.getByText('Export to PDF').waitFor({ state: 'visible' });
      await expect(page.getByText('Export to PDF')).toHaveCount(1);

      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Visuals', () => {
  test('Verify Hint visible ', async ({ page }) => {
    const standPath = 'stories/components/base-components/hint/tests/examples/base-example-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { visible: true });
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.getByText('Export to PDF').waitFor({ state: 'visible' });
    await expect(page.getByText('Export to PDF')).toHaveCount(1);
  });

  test('Verify Hint default visible ', async ({ page }) => {
    const standPath = 'stories/components/base-components/hint/tests/examples/base-example-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { defaultVisible: true });
    await page.setContent(htmlContent);

    await page.getByText('Export to PDF').waitFor({ state: 'visible' });
    await expect(page.getByText('Export to PDF')).toHaveCount(1);

    await page.getByRole('button').hover();
    await page.keyboard.press('Tab');
    await expect(page.getByText('Export to PDF')).toHaveCount(1);
  });
});
