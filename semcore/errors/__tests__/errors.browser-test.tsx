import { expect, test, type Page, type Locator } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  async function expectScreenshotOf(page: Page, locator: Locator, name?: string) {
    const box = await locator.boundingBox();
    if (!box) throw new Error('Element not found or not visible');
    await expect(page).toHaveScreenshot(`${name}.png`, { clip: box });
  }

  test('Veriry error templates', {
    tag: [TAG.PRIORITY_HIGH,
      '@errors',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en');
    await page.setViewportSize({ width: 1280, height: 2500 });

    await expectScreenshotOf(page, page.locator('[data-ui-name="AccessDenied"]'), 'AccessDenied');
    await expectScreenshotOf(page, page.locator('[data-ui-name="Maintenance"]'), 'Maintenance');
    await expectScreenshotOf(page, page.locator('[data-ui-name="PageNotFound"]'), 'PageNotFound');
    await expectScreenshotOf(page, page.locator('[data-ui-name="ProjectNotFound"]'), 'ProjectNotFound');
    await expectScreenshotOf(page, page.locator('[data-ui-name="PageError"]'), 'PageError');
  });

  test('Veriry error templates when screen width is 648px', {
    tag: [TAG.PRIORITY_HIGH,
      '@errors',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en');
    await page.setViewportSize({ width: 648, height: 2700 });

    await expectScreenshotOf(page, page.locator('[data-ui-name="AccessDenied"]'), 'AccessDenied648px');
    await expectScreenshotOf(page, page.locator('[data-ui-name="Maintenance"]'), 'Maintenance648px');
    await expectScreenshotOf(page, page.locator('[data-ui-name="PageNotFound"]'), 'PageNotFound648px');
    await expectScreenshotOf(page, page.locator('[data-ui-name="ProjectNotFound"]'), 'ProjectNotFound648px');
    await expectScreenshotOf(page, page.locator('[data-ui-name="PageError"]'), 'PageError648px');
  });

  test('Veriry custom error states', {
    tag: [TAG.PRIORITY_HIGH,
      '@errors',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/errors/tests/examples/custom-error-cases.tsx', 'en');

    await page.setViewportSize({ width: 1280, height: 2500 });

    await expectScreenshotOf(page, page.locator('[data-testid="title-description"]'), 'Custom-title-description');
    await expectScreenshotOf(page, page.locator('[data-testid="icon-title-controls"]'), 'Custom-icon-title-controls');
    await expectScreenshotOf(page, page.locator('[data-testid="description-controls"]'), 'Custom-description-controls');
    await expectScreenshotOf(page, page.locator('[data-testid="icon-title-description"]'), 'Custom-icon-title-description');
    await expectScreenshotOf(page, page.locator('[data-testid="title-description-controls"]'), 'Custom-title-description-controls');
    await expectScreenshotOf(page, page.locator('[data-testid="icon-title-description-controls"]'), 'Custom-icon-title-description-controls');
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  const variables = [
    { titleTag: 'h1', homeLink: 'test1' },
    { titleTag: 'h2', homeLink: 'test1' },
    { titleTag: 'h3', homeLink: 'test1' },
    { titleTag: 'h4', homeLink: undefined },
    { titleTag: 'h5', homeLink: undefined },
    { titleTag: 'p', homeLink: undefined },
  ];
  variables.forEach((item) => {
    test(`Verify Errors with titleTag=${item.titleTag} homeLink= ${item.homeLink}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@errors',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en', item);

      const errorBlocks = [
        page.locator('[data-ui-name="AccessDenied"]'),
        page.locator('[data-ui-name="Maintenance"]'),
        page.locator('[data-ui-name="PageNotFound"]'),
        page.locator('[data-ui-name="ProjectNotFound"]'),
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
          const text = (await title.textContent()) ?? '';
          await expect(block.getByRole('heading', { level })).toHaveText(text);
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
    test(`Verify Maintenance with toolName=${item.toolName}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@errors',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en', item);

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
    test(`Verify projectNotFound with projectsLink=${item.projectsLink} contactLink=${item.contactsLink}  supportTeamLink=${item.supportTeamLink}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@errors',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en', item);

      const projectNotFoundBlock = page.locator('[data-ui-name="ProjectNotFound"]');
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
