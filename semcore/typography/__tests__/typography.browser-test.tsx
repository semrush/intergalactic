import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Blockquote', () => {
  test('Verify Blockquote looks good with and without author props', async ({
    page,
  }) => {
    const standPath = 'stories/components/typography/tests/examples/blockquote.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

  // Получаем все элементы blockquote
  const blockquotes = await page.locator('blockquote');

  // Проверяем количество цитат
  await expect(blockquotes).toHaveCount(2);

  for (let i = 0; i < 2; i++) {
    const blockquote = blockquotes.nth(i);

    // Проверяем, что внутри есть текст
    await expect(blockquote).not.toBeEmpty();
  }

      // Проверяем margin-top
      await expect(blockquotes.first()).toHaveCSS('margin-top', '18px');

      // Проверяем margin-bottom
      await expect(blockquotes.first()).toHaveCSS('margin-bottom', '18px');

      // Проверяем margin-top
      await expect(blockquotes.nth(1)).toHaveCSS('margin-top', '20px');

      // Проверяем margin-bottom
      await expect(blockquotes.nth(1)).toHaveCSS('margin-bottom', '20px');

  // Проверяем, что первый blockquote содержит <cite>
  const cite = blockquotes.nth(0).locator('cite');
  await expect(cite).toHaveText('Roy Batty');

    await expect(page).toHaveScreenshot();
  });
});

test.describe('List', () => {
    test('Verify List supports custom marker and Item content ', async ({
      page,
    }) => {
      const standPath = 'stories/components/typography/docs/examples/list-with-custom-content.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
    });
  
    test('Verify nested list and default marked ', async ({ page }) => {
        const standPath = 'stories/components/typography/tests/examples/nested-list.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
  
      await page.setContent(htmlContent);

        // Проверяем, что список имеет role="list"
  const list = await page.locator('[data-ui-name="List"]').first();
  await expect(list).toHaveAttribute('role', 'list');

  // Проверяем, что все элементы списка имеют role="listitem"
  const listItems = await page.locator('[data-ui-name="List.Item"]');
  for (let i = 0; i < (await listItems.count()); i++) {
    await expect(listItems.nth(i)).toHaveAttribute('role', 'listitem');
  }

  // Проверяем, что все маркеры имеют aria-hidden="true"
  const markers = await page.locator('[class*="SMarker"]');

// Проверяем, что количество маркеров = количеству listItems - 1
await expect(markers).toHaveCount((await listItems.count()) - 1);

// Проверяем, что у каждого маркера установлен aria-hidden="true"
for (let i = 0; i < (await markers.count()); i++) {
  await expect(markers.nth(i)).toHaveAttribute('aria-hidden', 'true');
}

      await expect(page).toHaveScreenshot();
    });
  
  });


  test.describe('Text', () => {
    test('Verify bold, semibold, medium, italic, underline, monospace, lineThrough, uppercase, lowercase, capitalize, color styles', async ({
      page,
    }) => {
      const standPath = 'stories/components/typography/docs/examples/text-styles.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
          await expect(page).toHaveScreenshot();
     
    });
  
    test('Verify size and font-weight work well for headers and paragrapsh', async ({ page }) => {
        const standPath = 'stories/components/typography/tests/examples/text-font-size-and-weight-headers-and-paragrapsh.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
  
      await page.setContent(htmlContent);


      await expect(page).toHaveScreenshot();
    });

    test('Verify fontSize, lineHeight, textAlign, use, disabled, noWrap props', async ({ page }) => {
        const standPath = 'stories/components/typography/tests/examples/text-with-diff-combimations.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
  
      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  
  });

