import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  option: (page: Page, index?: number) => {
    const base = page.getByRole('option');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dialog: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
    return typeof index === 'number' ? base.nth(index) : base;
  },

};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify Base example margins and paddings', {
    tag: [TAG.PRIORITY_HIGH,
      '@card',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/card/docs/examples/basic_example.tsx', 'en');

    const header = page.locator('[data-ui-name="Card.Header"]');
    const description = page.locator('[data-ui-name="Card.Description"]');
    const title = page.locator('[data-ui-name="Card.Title"]');
    const body = page.locator('[data-ui-name="Card.Body"]');
    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');

    await expect(page).toHaveScreenshot();

    await test.step('Verify header paddings', async () => {
      await expect(header).toHaveCSS('padding-left', '20px');
      await expect(header).toHaveCSS('padding-right', '20px');
      await expect(header).toHaveCSS('padding-top', '20px');
      await expect(header).toHaveCSS('padding-bottom', '12px');
    });

    await test.step('Verify title styles', async () => {
      await expect(title).toHaveCSS('margin-right', '4px');
      await expect(title).toHaveCSS('font-size', '18px');
      await expect(title).toHaveCSS('font-weight', '600');
    });

    await test.step('Verify description margin', async () => {
      await expect(description).toHaveCSS('margin-top', '0px');
    });

    await test.step('Verify body padding', async () => {
      await expect(body).toHaveCSS('padding', '20px');
    });

    await test.step('Verify description tooltip expanded state by mouse', async () => {
      await descriptionTooltipTrigger.click();
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
      await descriptionTooltipTrigger.click();
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'hidden' });
    });

    await test.step('Verify button with hint and description tooltip on focus in header', async () => {
      await page.keyboard.press('Tab');
      await page.getByText('Settings').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify card with ellipsis width:768, height: 800', {
    tag: [TAG.PRIORITY_HIGH,
      '@card',
      '@ellipsis',
    ],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/card/docs/examples/ellipsis.tsx', 'en');

    await expect(page).toHaveScreenshot();
    await page.setViewportSize({ width: 768, height: 800 });
    await expect(page).toHaveScreenshot();
  });

  test('Verify complex card styles', {
    tag: [TAG.PRIORITY_HIGH,
      '@card',
      '@button',
      '@base-trigger',
      '@link-trigger',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/card/docs/examples/complex_example.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await locators.option(page, 0).waitFor({ state: 'visible' });
    await page.keyboard.press('Space');
    await locators.option(page, 0).first().waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify card with different card componens styles', {
    tag: [TAG.PRIORITY_HIGH,
      '@card',
      '@button',
      '@pills'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/card/tests/examples/different-cards.tsx', 'en');

    await page.setViewportSize({ width: 1200, height: 1200 });

    await test.step('Verify card only component', async () => {
      const card = page.locator('[data-testid="card-only"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card description component', async () => {
      const card = page.locator('[data-testid="card-description"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title hintAfter component', async () => {
      const card = page.locator('[data-testid="card-title"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title  description content hintAfter component', async () => {
      const card = page.locator('[data-testid="card-title-description"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title  description content innterHint component', async () => {
      const card = page.locator('[data-testid="card-title-description-innterHint"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title  description content hintAfter innterHint component', async () => {
      const card = page.locator('[data-testid="card-title-content-innerHint"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title description content innterHint tag component', async () => {
      const card = page.locator('[data-testid="card-title-description-content-innerHint-tag-text-styles"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card header title description body component', async () => {
      const card = page.locator('[data-testid="card-header-title-desription-body"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card heder pills body component', async () => {
      const card = page.locator('[data-testid="card-header-pills-body"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });
  });

  test('Verify description tooltip trigger has not unnecessary margins', {
    tag: [TAG.PRIORITY_HIGH,
      '@card',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/card/tests/examples/card_with_description_tooltip_in_body', 'en');

    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const descriptionTooltipTriggerCount = await descriptionTooltipTrigger.count();
    for (let i = 0; i < descriptionTooltipTriggerCount; i++)
      await expect(descriptionTooltipTrigger.nth(i)).toHaveCSS('margin', '0px');
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify base example keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@card',
      '@button'],
  }, async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('Verify tooltip not shown when trigger is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page).first()).toBeFocused();
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    await test.step('Verify tooltip shown on space', async () => {
      await page.keyboard.press('Space');
      await locators.dialog(page).waitFor({ state: 'visible' });
      await expect(locators.button(page).first()).not.toBeFocused();
      await expect(locators.dialog(page)).toBeFocused();
    });

    await test.step('Verify tooltip hidden on Escape', async () => {
      await page.keyboard.press('Escape');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.button(page).first()).toBeFocused();
    });

    await test.step('Verify tooltip opened on Enter', async () => {
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });
      await expect(locators.button(page).first()).not.toBeFocused();
      await expect(locators.dialog(page)).toBeFocused();
    });

    await test.step('Verify tooltip hidden by Tab', async () => {
      await page.keyboard.press('Tab');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.button(page).first()).toBeFocused();
    });

    await test.step('Next control focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 1)).toBeFocused();
    });
  });

  test('Verify complex example keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@card',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/card/docs/examples/complex_example.tsx', 'en');

    const select = page.locator('[data-ui-name="Select"]');
    await test.step('Verify tooltip not shown when trigger is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 0)).toBeFocused();
      await expect(locators.dialog(page)).not.toBeVisible();
    });

    await test.step('Verify button focused on next tab', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 1)).toBeFocused();
      await page.getByText('Hide widget').waitFor({ state: 'visible' });
      await expect(page.getByText('Hide widget')).toHaveCount(1);
      await page.keyboard.press('Escape');
      await page.getByText('Hide widget').waitFor({ state: 'hidden' });
      await expect(page.getByText('Hide widget')).toHaveCount(0);
    });

    await test.step('Verify select focused on next tab', async () => {
      await page.keyboard.press('Tab');
      await expect(select).toBeFocused();
      await page.keyboard.press('Space');

      await expect(locators.option(page)).toHaveCount(3);
      await page.keyboard.press('Enter');
      await expect(locators.option(page)).toHaveCount(0);
    });

    await test.step('Verify prev element focused by shift+Tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 1)).toBeFocused();
    });
  });
});
