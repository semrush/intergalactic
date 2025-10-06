import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual tests', () => {
  test('Verify Base example margins and paddings', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const header = page.locator('[data-ui-name="Card.Header"]');
    const description = page.locator('[data-ui-name="Card.Description"]');
    const title = page.locator('[data-ui-name="Card.Title"]');
    const body = page.locator('[data-ui-name="Card.Body"]');
    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');

    await expect(page).toHaveScreenshot();

    await test.step('Verify header paddings', async () => {
      await expect(header).toHaveCSS('padding-left', '20px');
      await expect(header).toHaveCSS('padding-right', '20px');
      await expect(header).toHaveCSS('padding-top', '8px');
      await expect(header).toHaveCSS('padding-bottom', '8px');
    });

    await test.step('Verify title styles', async () => {
      await expect(title).toHaveCSS('margin-right', '4px');
      await expect(title).toHaveCSS('font-size', '16px');
      await expect(title).toHaveCSS('font-weight', '700');
    });

    await test.step('Verify description margin', async () => {
      await expect(description).toHaveCSS('margin-top', '8px');
    });

    await test.step('Verify body padding', async () => {
      await expect(body).toHaveCSS('padding', '20px');
    });

    await test.step('Verify description tooltip trigger margins', async () => {
      await expect(descriptionTooltipTrigger).toHaveCSS('margin-top', '4px');
      await expect(descriptionTooltipTrigger).toHaveCSS('margin-left', '4px');
      await expect(descriptionTooltipTrigger).toHaveCSS('margin-right', '4px');
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

  test('Verify card with ellipsis width:768, height: 800', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/ellipsis.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
    await page.setViewportSize({ width: 768, height: 800 });
    await expect(page).toHaveScreenshot();
  });

  test('Verify complex card styles', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/complex_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Select.Option"]').first().waitFor({ state: 'visible' });
    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Select.Option"]').first().waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify card with different card componens styles', async ({ page }) => {
    const standPath = 'stories/components/card/tests/examples/different-cards.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 1200, height: 1200 });

    await test.step('Verify card only component', async () => {
      const card = await page.locator('[data-testid="card-only"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card description component', async () => {
      const card = await page.locator('[data-testid="card-description"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title hintAfter component', async () => {
      const card = await page.locator('[data-testid="card-title"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title  description content hintAfter component', async () => {
      const card = await page.locator('[data-testid="card-title-description"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title  description content innterHint component', async () => {
      const card = await page.locator('[data-testid="card-title-description-innterHint"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title  description content hintAfter innterHint component', async () => {
      const card = await page.locator('[data-testid="card-title-content-innerHint"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card title description content innterHint tag component', async () => {
      const card = await page.locator('[data-testid="card-title-description-content-innerHint-tag-text-styles"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card header title description body component', async () => {
      const card = await page.locator('[data-testid="card-header-title-desription-body"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });

    await test.step('Verify card heder pills body component', async () => {
      const card = await page.locator('[data-testid="card-header-pills-body"]');
      const screenshotsClip = (await card.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });
    });
  });

  test('Verify description tooltip trigger has not unnecessary margins', async ({ page }) => {
    const standPath = 'stories/components/card/tests/examples/card_with_description_tooltip_in_body.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const descriptionTooltipTriggerCount = await descriptionTooltipTrigger.count();
    for (let i = 0; i < descriptionTooltipTriggerCount; i++)
      await expect(descriptionTooltipTrigger.nth(i)).toHaveCSS('margin', '0px');
  });
});

test.describe('Functional', () => {
  test('Verify base example keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const descriptionTooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

    await test.step('Verify tooltip not shown when trigger is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(descriptionTooltipTrigger).toBeFocused();
      await expect(descriptionTooltipPopper).not.toBeVisible();
    });

    await test.step('Verify tooltip shown on space', async () => {
      await page.keyboard.press('Space');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
      await expect(descriptionTooltipTrigger).not.toBeFocused();
      await expect(descriptionTooltipPopper).toBeFocused();
    });

    await test.step('Verify tooltip hidden on Escape', async () => {
      await page.keyboard.press('Escape');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'hidden' });
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Verify tooltip opened on Enter', async () => {
      await page.keyboard.press('Enter');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
      await expect(descriptionTooltipTrigger).not.toBeFocused();
      await expect(descriptionTooltipPopper).toBeFocused();
    });

    await test.step('Verify tooltip hidden by Tab', async () => {
      await page.keyboard.press('Tab');
      await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'hidden' });
      await expect(descriptionTooltipTrigger).toBeFocused();
    });

    await test.step('Next control focused by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-ui-name="Button"]')).toBeFocused();
    });
  });

  test('Verify complex example keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/card/docs/examples/complex_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const descriptionTooltipTrigger = page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const descriptionTooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');
    const button = page.locator('[data-ui-name="Button"]');
    const select = page.locator('[data-ui-name="Select"]');
    await test.step('Verify tooltip not shown when trigger is focused', async () => {
      await page.keyboard.press('Tab');
      await expect(descriptionTooltipTrigger).toBeFocused();
      await expect(descriptionTooltipPopper).not.toBeVisible();
    });

    await test.step('Verify button focused on next tab', async () => {
      await page.keyboard.press('Tab');
      await expect(button).toBeFocused();
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

      await expect(page.locator('[data-ui-name="Select.Option"]')).toHaveCount(3);
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-ui-name="Select.Option"]')).toHaveCount(0);
    });

    await test.step('Verify prev element focused by shift+Tab', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(button).toBeFocused();
    });
  });
});
