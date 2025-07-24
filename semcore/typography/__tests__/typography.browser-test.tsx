import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Blockquote - Visual', () => {
  test('Verify Blockquote looks good with and without author props', async ({ page }) => {
    const standPath = 'stories/components/typography/tests/examples/blockquote.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const blockquotes = await page.locator('blockquote');

    await expect(blockquotes).toHaveCount(2);

    for (let i = 0; i < 2; i++) {
      const blockquote = blockquotes.nth(i);
      await expect(blockquote).not.toBeEmpty();
    }

    await expect(blockquotes.first()).toHaveCSS('margin-top', '18px');
    await expect(blockquotes.first()).toHaveCSS('margin-bottom', '18px');

    await expect(blockquotes.nth(1)).toHaveCSS('margin-top', '20px');
    await expect(blockquotes.nth(1)).toHaveCSS('margin-bottom', '20px');

    const cite = blockquotes.nth(0).locator('cite');
    await expect(cite).toHaveText('Roy Batty');

    await expect(page).toHaveScreenshot();
  });
});

test.describe('List- Visual', () => {
  test('Verify List supports custom marker and Item content ', async ({ page }) => {
    const standPath = 'stories/components/typography/docs/examples/list-with-custom-bullets.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify format text nested lists', async ({ page }) => {
    const standPath = 'stories/components/typography/docs/examples/formattext-nested-lists.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify List with custom bullets ', async ({ page }) => {
    const standPath = 'stories/components/typography/docs/examples/list-with-custom-content.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify nested list and default marked ', async ({ page }) => {
    const standPath = 'stories/components/typography/tests/examples/nested-list.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const list = await page.locator('ul[data-ui-name="List"]').first();
    await expect(list).toHaveAttribute('role', 'list');

    const listItems = await page.locator('li[data-ui-name="List.Item"]');
    for (let i = 0; i < (await listItems.count()); i++) {
      await expect(listItems.nth(i)).toHaveAttribute('role', 'listitem');
    }

    const markers = await page.locator('span[class*="SMarker"]');

    await expect(markers).toHaveCount((await listItems.count()) - 1);

    for (let i = 0; i < (await markers.count()); i++) {
      await expect(markers.nth(i)).toHaveAttribute('aria-hidden', 'true');
    }

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Text - Visual', () => {
  test('Verify text styles with tags', async ({
    page,
  }) => {
    const standPath = 'stories/components/typography/docs/examples/text-styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify Additional information styles', async ({
    page,
  }) => {
    const standPath = 'stories/components/typography/docs/examples/additional-information.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify Native typography tags', async ({
    page,
  }) => {
    const standPath = 'stories/components/typography/docs/examples/native-typography-tags.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  const cases = [
    // noWrap condition
    { noWrap: true, display: 'block', w: 100, size: 900 },

    // textAlign condition
    { textAlign: 'left', display: 'block', inline: true, w: 200 },
    { textAlign: 'center', display: 'block', inline: true, w: 200 },
    { textAlign: 'right', display: 'block', inline: true, w: 200 },

    // size and fontSize together
    { size: 100, fontSize: 20 },

    // main coverage
    { bold: true, italic: false, size: 200, use: 'primary' },
    { bold: false, italic: true, size: 300 },
    { semibold: true, lowercase: true, size: 400 },
    { semibold: false, medium: true, size: 500 },
    { underline: true, lineThrough: false, size: 600 },
    { underline: false, lineThrough: true, size: 700 },
    { uppercase: true, size: 800 },
    { capitalize: true, use: 'secondary' },
    { color: 'red', fontSize: '20px' },
    { lineHeight: '20px', fontWeight: 900, fontSize: '40px' },
    { inline: true, monospace: true, fontSize: '60px' },
    { use: 'secondary', capitalize: true, disabled: true },
  ];

  cases.forEach((item) => {
    const title = 'Verify Text with ' + Object.entries(item)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join(', ');

    test(title, async ({ page }) => {
      const standPath =
        'stories/components/typography/tests/examples/text-with-diff-combimations.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
    });
  });
});
