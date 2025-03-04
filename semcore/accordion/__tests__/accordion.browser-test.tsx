import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Basic usage', () => {
  test('Handles with keyboard', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const subsection = page.getByText('Hello section');
    await expect(subsection).toHaveCount(1);

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();
    await expect(subsection).toHaveCount(0);

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Space');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Handles with mouse', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const section1Header = await page.locator('text=Section 1', { hasNotText: 'Hello Section 1' });
    const section2Header = await page.locator('text=Section 2', { hasNotText: 'Hello Section 2' });
    const subsection = page.getByText('Hello section');
    await expect(page).toHaveScreenshot();

    await section1Header.first().click();
    await expect(page).toHaveScreenshot();

    await section1Header.click();
    await expect(page).toHaveScreenshot();
    await section2Header.click();
    await expect(subsection).toHaveCount(2);
  });
});

test.describe('Seo with preserveNode', () => {
  test('Should skip focusable elements in collapsed items even with preserveNode prop', async ({
    page,
  }) => {
    const standPath = 'stories/components/accordion/docs/examples/seo.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page.getByRole('heading', { name: 'Section 1' })).toBeFocused();
    const subsection = page.getByText('Hello section');
    await expect(subsection).toHaveCount(3);

    // to the link in first item
    await page.keyboard.press('Tab');
    // to the third toggle item (skip the link in the second item)
    await page.keyboard.press('Tab');
    await expect(page.getByRole('heading', { name: 'Section 3' })).toBeFocused();
  });
});

test.describe('Non compact', () => {
  test('Handles with keyboard', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/non_compact.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.locator('text=Section 1');
    await page.keyboard.press('Tab');

    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Handles with mouse', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/non_compact.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const section1Header = await page.locator('text=Section 1', { hasNotText: 'Hello Section 1' });

    await section1Header.first().click();
    await expect(page).toHaveScreenshot();

    await section1Header.click();
    await expect(page).toHaveScreenshot();
  });
});

test.describe('One section opening', () => {
  test('Handles with keyboard', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/one_section_opening.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const section1header = page.getByRole('heading', { name: 'Section 1' });
    const section2header = page.getByRole('heading', { name: 'Section 2' });
    await page.keyboard.press('Tab');
    const section1collapsed = page.locator('text=Hello Section 1');
    const section2collapsed = page.locator('text=Hello Section 2');
    await expect(section1header).toBeFocused();
    await expect(section1collapsed).toHaveCount(0);
    await page.keyboard.press('Enter');
    await expect(section1collapsed).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(section2header).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(section1collapsed).toHaveCount(0);
    await expect(section2collapsed).toHaveCount(1);
  });
});
