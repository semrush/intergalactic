import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, type Page, type Locator } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  async function expectScreenshotOf(page: Page, locator: Locator, name?: string) {
    const box = await locator.boundingBox();
    if (!box) throw new Error('Element not found or not visible');
    await expect(page).toHaveScreenshot(`${name}.png`, { clip: box });
  }

  test('Veriry error templates', async ({ page }) => {
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

  test('Veriry custom error states', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/global-errors/tests/examples/custom-error-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setViewportSize({ width: 1280, height: 2500 });
    await page.setContent(htmlContent);

    await expectScreenshotOf(page, page.locator('[data-testid="title-description"]'), 'title-description');
    await expectScreenshotOf(page, page.locator('[data-testid="icon-title-controls"]'), 'icon-title-controls');
    await expectScreenshotOf(page, page.locator('[data-testid="description-controls"]'), 'description-controls');
    await expectScreenshotOf(page, page.locator('[data-testid="icon-title-description"]'), 'icon-title-description');
    await expectScreenshotOf(page, page.locator('[data-testid="title-description-controls"]'), 'title-description-controls');
    await expectScreenshotOf(page, page.locator('[data-testid="icon-title-description-controls"]'), 'icon-title-description-controls');
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
    test(`Verify Errors with titleTag=${item.titleTag} homeLink= ${item.homeLink}`, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/global-errors/docs/examples/templates.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

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

        const tagName = await title.evaluate((el) => el.tagName.toLowerCase());
        expect(tagName).toBe(item.titleTag);

        if (/^h[1-6]$/.test(item.titleTag)) {
          const level = Number(item.titleTag[1]);
          await expect(block.getByRole('heading', { level })).toHaveText(
            await title.textContent(),
          );
        } else if (item.titleTag === 'p') {
          expect(tagName).toBe('p');
          const role = await title.getAttribute('role');
          expect(role).not.toBe('heading');
        }

        if (i <= 2) {
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
    { projectsLink: undefined, contactsLink: undefined, supportTeamLink: undefined },
    { projectsLink: 'projectsLink', contactsLink: 'contactLink', supportTeamLink: 'supportTeamLink' },
  ];
  projectNotFound.forEach((item) => {
    test(`Verify projectNotFound with projectsLink=${item.projectsLink} contactLink=${item.contactsLink}  supportTeamLink=${item.supportTeamLink}`, async ({ page }) => {
      const standPath = 'stories/patterns/ux-patterns/global-errors/docs/examples/templates.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const projectNotFoundBlock = page.locator('[data-ui-name="Maintenance"]').nth(2);
      const controls = projectNotFoundBlock.locator('[data-ui-name="Error.Controls"]');
      const description = projectNotFoundBlock.locator('[data-ui-name="Error.Description"]');

      const projects = controls.getByRole('link').nth(0);
      const contact = controls.getByRole('link').nth(1);
      const supportTeam = description.locator('a');

      if (item.projectsLink) {
        await expect(projects).toHaveAttribute('href', item.projectsLink);
      } else {
        await expect(projects).toHaveAttribute('href', '/projects');
      }

      if (item.contactsLink) {
        await expect(contact).toHaveAttribute('href', item.contactsLink);
      } else {
        await expect(contact).toHaveAttribute('href', '/company/contacts');
      }

      if (item.supportTeamLink) {
        await expect(supportTeam).toHaveAttribute('href', item.supportTeamLink);
      } else {
        await expect(supportTeam).toHaveAttribute('href', '/company/contacts');
      }
    });
  });
});
