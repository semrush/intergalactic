import { expect, test, type Page, type Locator } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  async function expectScreenshotOf(page: Page, locator: Locator, name: string) {
    const box = await locator.boundingBox();
    if (!box) throw new Error('Element not found or not visible');
    await expect(page).toHaveScreenshot(`${name}.png`, { clip: box });
  }

  const templates = ['AccessDenied', 'Maintenance', 'PageNotFound', 'ProjectNotFound', 'PageError'];

  test('Verify error templates', {
    tag: [TAG.PRIORITY_HIGH,
      '@errors',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en');
    await page.setViewportSize({ width: 1280, height: 2500 });

    for (const template of templates) {
      await test.step(`Verify ${template}`, async () => {
        await expectScreenshotOf(page, page.locator(`[data-ui-name="${template}"]`), template);
      });
    }
  });

  test('Verify error templates when screen width is 648px', {
    tag: [TAG.PRIORITY_HIGH,
      '@errors',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en');
    await page.setViewportSize({ width: 648, height: 2700 });

    for (const template of templates) {
      await test.step(`Verify ${template}`, async () => {
        await expectScreenshotOf(page, page.locator(`[data-ui-name="${template}"]`), `${template}648px`);
      });
    }
  });

  test('Verify custom error states', {
    tag: [TAG.PRIORITY_HIGH,
      '@errors',
      '@button',
      '@base-components',
      '@flex-box'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/errors/tests/examples/custom-error-cases.tsx', 'en');
    await page.setViewportSize({ width: 1280, height: 2500 });

    const cases = [
      'title-description',
      'icon-title-controls',
      'description-controls',
      'icon-title-description',
      'title-description-controls',
      'icon-title-description-controls',
    ];
    for (const testId of cases) {
      await test.step(`Verify ${testId}`, async () => {
        await expectScreenshotOf(page, page.getByTestId(testId), `Custom-${testId}`);
      });
    }
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  const templatesWithHomeLink = ['AccessDenied', 'Maintenance', 'PageNotFound'];
  const templates = [...templatesWithHomeLink, 'ProjectNotFound', 'PageError'];

  const variables = [
    { titleTag: 'h1', homeLink: 'test1' },
    { titleTag: 'h2', homeLink: 'test1' },
    { titleTag: 'h3', homeLink: 'test1' },
    { titleTag: 'h4', homeLink: undefined },
    { titleTag: 'h5', homeLink: undefined },
    { titleTag: 'p', homeLink: undefined },
  ];
  variables.forEach((item) => {
    test(`Verify Errors with titleTag=${item.titleTag} homeLink=${item.homeLink}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@errors',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en', item);

      for (const template of templates) {
        const block = page.locator(`[data-ui-name="${template}"]`);
        const title = block.locator('[data-ui-name="Error.Title"]');

        await test.step(`Verify ${template} title is <${item.titleTag}>`, async () => {
          await expect(title).toBeVisible();
          await expect(title).toHaveJSProperty('tagName', item.titleTag.toUpperCase());

          if (item.titleTag === 'p') {
            await expect(title).not.toHaveAttribute('role', 'heading');
          } else {
            const level = Number(item.titleTag[1]);
            await expect(block.getByRole('heading', { level })).toHaveText((await title.textContent()) ?? '');
          }
        });

        if (templatesWithHomeLink.includes(template)) {
          await test.step(`Verify ${template} homepage link`, async () => {
            await expect(block.getByRole('link', { name: 'Go to homepage' })).toHaveAttribute('href', item.homeLink ?? '/');
          });
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

      const title = page.locator('[data-ui-name="Maintenance"]').locator('[data-ui-name="Error.Title"]');
      await expect(title).toContainText(item.toolName ?? 'Intergalactic');
    });
  });

  const projectNotFound = [
    { projectsLink: undefined, contactsLink: undefined, supportTeamLink: undefined },
    { projectsLink: 'projectsLink', contactsLink: 'contactLink', supportTeamLink: 'supportTeamLink' },
  ];
  projectNotFound.forEach((item) => {
    test(`Verify projectNotFound with projectsLink=${item.projectsLink} contactLink=${item.contactsLink} supportTeamLink=${item.supportTeamLink}`, {
      tag: [TAG.PRIORITY_HIGH,
        '@errors',
        '@button'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/errors/docs/examples/templates.tsx', 'en', item);

      const projectNotFoundBlock = page.locator('[data-ui-name="ProjectNotFound"]');
      const controls = projectNotFoundBlock.locator('[data-ui-name="Error.Controls"]');
      const description = projectNotFoundBlock.locator('[data-ui-name="Error.Description"]');

      await expect(controls.getByRole('link').nth(0)).toHaveAttribute('href', item.projectsLink ?? '/projects');
      await expect(controls.getByRole('link').nth(1)).toHaveAttribute('href', item.contactsLink ?? '/company/contacts');
      await expect(description.locator('a')).toHaveAttribute('href', item.supportTeamLink ?? '/company/contacts');
    });
  });
});
