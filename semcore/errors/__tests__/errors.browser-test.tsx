import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, type Page, type Locator } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  async function expectScreenshotOf(page: Page, locator: Locator, name?: string) {
    const box = await locator.boundingBox();
    if (!box) throw new Error('Element not found or not visible');
    await expect(page).toHaveScreenshot(`${name}.png`, { clip: box });
  }

  test('Templates', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/global-errors/docs/examples/templates.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setViewportSize({ width: 1280, height: 2500 });
    await page.setContent(htmlContent);

    await expectScreenshotOf(page, page.locator('[data-ui-name="AccessDenied"]'), 'AccessDenied');
    await expectScreenshotOf(page, page.locator('[data-ui-name="Maintenance"]').nth(0), 'Maintenance');
    await expectScreenshotOf(page, page.locator('[data-ui-name="Maintenance"]').nth(1), 'PageNotFound');
    await expectScreenshotOf(page, page.locator('[data-ui-name="Maintenance"]').nth(2), 'ProjectNotFound');
    await expectScreenshotOf(page, page.locator('[data-ui-name="PageError"]'), 'PageError');
  });
});

test.describe('Functional', () => {
  const variables = [
    { titleTag: 'h1', homeLink: 'test1' },
    { titleTag: 'h2', homeLink: 'test1' },
    { titleTag: 'h3', homeLink: 'test1' },
    { titleTag: 'h4', homeLink: undefined },
    { titleTag: 'h5', homeLink: undefined },
    { titleTag: 'p', homeLink: undefined },
  ];
  variables.forEach((item) => {
    test(`Verify Errors with titleTag=${item.titleTag} homeLink= ${item.homeLink} toolName=${item.toolName} `, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/global-errors/docs/examples/templates.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      // список всех блоков с ошибками, у которых есть Error.Title
      const errorBlocks = [
        page.locator('[data-ui-name="AccessDenied"]'),
        page.locator('[data-ui-name="Maintenance"]').nth(0),
        page.locator('[data-ui-name="Maintenance"]').nth(1),
        page.locator('[data-ui-name="Maintenance"]').nth(2),
        page.locator('[data-ui-name="PageError"]'),
      ];

      for (let i = 0; i < errorBlocks.length; i++) {
        const block = errorBlocks[i];
        const title = block.locator('[data-ui-name="Error.Title"]');

        await expect(title).toBeVisible();

        // проверяем тег
        const tagName = await title.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe(item.titleTag);

        if (/^h[1-6]$/.test(item.titleTag)) {
          const level = Number(item.titleTag[1]);
          // проверяем heading внутри текущего блока
          await expect(block.getByRole('heading', { level })).toHaveText(
            await title.textContent(),
          );
        } else if (item.titleTag === 'p') {
          expect(tagName).toBe('p');
          const role = await title.getAttribute('role');
          expect(role).not.toBe('heading');
        }

        // проверка ссылки "Go to homepage" только для нужных блоков
        if (i <= 2) { // AccessDenied, Maintenance 0, Maintenance 1
          const homepageLink = block.getByRole('link', { name: 'Go to homepage' });
          if (item.homeLink) {
            await expect(homepageLink).toHaveAttribute('href', item.homeLink);
          } else {
            await expect(homepageLink).toHaveAttribute('href', '/');
          }
        }
      }
    });
  });

  const toolName = [
    { toolName: 'Test test test' },
    { toolName: 'Tool1' },
    { toolName: undefined },
  ];
  toolName.forEach((item) => {
    test(`Verify Maintenance with toolName=${item.toolName}  `, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/global-errors/docs/examples/templates.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const maintenance = page.locator('[data-ui-name="Maintenance"]').nth(0);
      const title = maintenance.locator('[data-ui-name="Error.Title"]');

      await expect(title).toBeVisible();

      const text = await title.textContent();

      if (item.toolName) {
        expect(text).toContain(item.toolName);
      } else {
        expect(text).toContain('Intergalactic');
      }
    });
  });

  const projectNotFound = [
    { toolName: 'Test test test' },
    { toolName: 'Tool1' },
    { toolName: undefined },
  ];
  projectNotFound.forEach((item) => {
    test(`Verify projectNotFound with toolName=${item.toolName}  `, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/global-errors/docs/examples/templates.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const maintenance = page.locator('[data-ui-name="Maintenance"]').nth(0);
      const title = maintenance.locator('[data-ui-name="Error.Title"]');

      await expect(title).toBeVisible();

      const text = await title.textContent();

      if (item.toolName) {
        expect(text).toContain(item.toolName);
      } else {
        expect(text).toContain('Intergalactic');
      }
    });
  });
});
