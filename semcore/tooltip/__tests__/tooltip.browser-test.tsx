import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Styles', () => {
  test('Verify Tooltip Hint and DescriptionTooltip styles', async ({ page }) => {
    const standPath = 'stories/components/tooltip/tests/examples/tooltip-styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot();

    const hintPopper = page.locator('[data-ui-name="Hint.Popper"]');

    const tooltipPopper = page.locator('[data-ui-name="Tooltip.Popper"]');

    const descriptionTooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

    await test.step('Verify hint popper styles', async () => {
      const count1 = await hintPopper.count();
      for (let i = 0; i < count1; i++) {
        await expect(hintPopper.nth(i)).toHaveCSS('padding', '12px');

        await expect(hintPopper.nth(i)).toHaveCSS('border-radius', '6px');
      }
    });

    await test.step('Verify tooltip popper styles', async () => {
      const count1 = await tooltipPopper.count();
      for (let i = 0; i < count1; i++) {
        await expect(tooltipPopper.nth(i)).toHaveCSS('padding', '12px');

        await expect(tooltipPopper.nth(i)).toHaveCSS('border-radius', '6px');
      }
    });

    await test.step('Verify description tooltip popper styles', async () => {
      const count1 = await descriptionTooltipPopper.count();
      for (let i = 0; i < count1; i++) {
        await expect(descriptionTooltipPopper.nth(i)).toHaveCSS('padding', '12px');

        await expect(descriptionTooltipPopper.nth(i)).toHaveCSS('border-radius', '6px');
      }
    });
  });
});

test.describe('Tooltip interactions', () => {
  test('Verify mouse interactions with Base example', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-ui-name="Tooltip"]');
    const popper = await page.locator('[data-ui-name="Tooltip.Popper"]');

    await test.step('Verify tooltip shown on hover', async () => {
      const triggerRect = (await trigger.first().boundingBox())!;

      await page.mouse.move(
        triggerRect.x + triggerRect.width / 2,
        triggerRect.y + triggerRect.height / 2,
        {
          steps: 5,
        },
      );
      await page.waitForSelector(
        'text="Default tooltip contains short text explaining something about the trigger."',
      );

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip shown on mouse click', async () => {
      await trigger.nth(1).click();
      await page.waitForSelector(
        'text="Default tooltip contains short text explaining something about the trigger."',
      );

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });

    await test.step('Verify not hide on 2nd mouse click', async () => {
      await trigger.nth(1).click();
      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });
  });

  test('Verify keyboard interactions with Base example', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-ui-name="Tooltip"]');
    const popper = await page.locator('[data-ui-name="Tooltip.Popper"]');

    await test.step('Verify tooltip shown on focus', async () => {
      await page.keyboard.press('Tab');

      await page.waitForSelector(
        'text="Default tooltip contains short text explaining something about the trigger."',
      );

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip hide on escape', async () => {
      await page.keyboard.press('Escape');
      await expect(popper).not.toBeVisible();
      await expect(popper).toHaveCount(0);
    });

    await test.step('Verify tooltip shown on next focus and not closed by space', async () => {
      await page.keyboard.press('Tab');
      await page.waitForSelector(
        'text="Default tooltip contains short text explaining something about the trigger."',
      );

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);

      await page.keyboard.press('Space');

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });
  });

  test('Verify keyboard interactions with Nested trigger accessibility', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/nested.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-ui-name="Tooltip.Trigger"]');
    const buttonLink = page.locator('[data-ui-name="ButtonLink"]');
    const popper = await page.locator('[data-ui-name="Tooltip.Popper"]');

    await test.step('Verify tooltip shown on focus', async () => {
      await expect(buttonLink).not.toHaveAttribute('aria-describedby');
      await page.keyboard.press('Tab');

      await page.waitForSelector('text="Hello, stranger!"');
      await expect(buttonLink).toHaveAttribute('aria-describedby');

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip hide on escape', async () => {
      await page.keyboard.press('Escape');
      await expect(popper).not.toBeVisible();
      await expect(popper).toHaveCount(0);
      await expect(buttonLink).not.toHaveAttribute('aria-describedby');
    });
  });

  test('Verify mouse interactions with Nested trigger accessibility', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/nested.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-ui-name="Tooltip.Trigger"]');
    const buttonLink = page.locator('[data-ui-name="ButtonLink"]');
    const popper = await page.locator('[data-ui-name="Tooltip.Popper"]');

    await test.step('Verify tooltip shown on mouse hover', async () => {
      await expect(buttonLink).not.toHaveAttribute('aria-describedby');
      await trigger.hover();
      await page.waitForSelector('text="Hello, stranger!"');
      await expect(buttonLink).toHaveAttribute('aria-describedby');

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });

    await test.step('Verify tooltip not close on mouse hover', async () => {
      await trigger.click();
      await page.waitForSelector('text="Hello, stranger!"');
      await expect(buttonLink).toHaveAttribute('aria-describedby');

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });
  });

  test('Verify ignore portal stacking', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/ignore_portal_stacking.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-ui-name="Tooltip"]');
    const popper = await page.locator('[data-ui-name="Tooltip.Popper"]');
    const button = page.locator('[data-ui-name="Button"]');

    await button.click();
    await page.waitForSelector('text="Tooltip with ignoring portals stacking."');
    await expect(popper).toHaveCount(2);
    await expect(page).toHaveScreenshot();

    await page.setViewportSize({ width: 700, height: 500 });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Singleton tooltip shown by keyboard interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/tooltip/docs/examples/singleton.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.waitForSelector('text="Option 1 description"');

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Singleton tooltip shown by mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/tooltip/docs/examples/singleton.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.locator('[data-ui-name="Select.Trigger"]').click();
    await page.waitForSelector('text="Option 1"');

    await page.locator('[data-ui-name="Select.Option"]').nth(2).hover();
    await page.waitForSelector('text="Option 2 description"');

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});

test.describe('Description tooltip', () => {
  test('Verify keyboard interactions with Informer Example', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/informer/docs/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const popper = await page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

    const linkPopper = page.locator('[data-ui-name="Link"]');

    await test.step('Verify tab focuses trigger but tooltip not shown', async () => {
      await page.keyboard.press('Tab');

      await expect(trigger.nth(0)).toBeFocused();

      await expect(popper).not.toBeVisible();
      await expect(popper).toHaveCount(0);
    });

    await test.step('Verify enter expandes popper', async () => {
      await page.keyboard.press('Enter');

      await expect(trigger.nth(0)).not.toBeFocused();

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
      await expect(popper).toBeFocused();
      await expect(linkPopper).not.toBeFocused();
    });

    await test.step('Verify escape h0des popper', async () => {
      await page.keyboard.press('Escape');

      await expect(trigger.nth(0)).toBeFocused();

      await expect(popper).not.toBeVisible();
    });

    await test.step('Verify space expands popper', async () => {
      await page.keyboard.press('Space');

      await expect(trigger.nth(0)).not.toBeFocused();

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
      await expect(popper).toBeFocused();
      await expect(linkPopper).not.toBeFocused();
    });

    await test.step('Verify tab switches focus indide the popper', async () => {
      await page.keyboard.press('Tab');
      await expect(popper).not.toBeFocused();
      await expect(linkPopper).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify escape closes popper when link focused', async () => {
      await page.keyboard.press('Escape');
      await expect(trigger.nth(0)).toBeFocused();

      await expect(popper).not.toBeVisible();
    });

    await test.step('Verify tabs close popper', async () => {
      await page.keyboard.press('Enter');
      await page.waitForSelector('text="peregrine falcon"');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(trigger.nth(0)).toBeFocused();

      await expect(popper).not.toBeVisible();
    });

    await test.step('Verify tabs switch focus to next trigger popper', async () => {
      await page.keyboard.press('Tab');

      await expect(trigger.nth(1)).toBeFocused();
      await expect(popper).not.toBeVisible();
    });
  });

  test('Verify mouse interactions with Description tooltip Base example', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const popper = await page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

    const linkPopper = page.locator('[data-ui-name="Link"]');

    await test.step('Verify tooltip not shown on hover', async () => {
      const triggerRect = (await trigger.first().boundingBox())!;

      await page.mouse.move(
        triggerRect.x + triggerRect.width / 2,
        triggerRect.y + triggerRect.height / 2,
        {
          steps: 5,
        },
      );
      await expect(popper).not.toBeVisible();
    });

    await test.step('Verify tooltip shown on mouse click', async () => {
      await trigger.nth(0).click();
      await page.waitForSelector('text="peregrine falcon"');

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });

    await test.step('Verify tooltip close on 2nd click', async () => {
      await trigger.nth(0).click();
      await expect(popper).not.toBeVisible();
    });
  });
});

test.describe('Hint', () => {
  test('Verify mouse interactions with Hint Base example', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = await page.locator('[data-ui-name="Hint"]');

    await test.step('Verify tooltip shown on hover of interactive element', async () => {
      const triggerRect = (await trigger.nth(0).boundingBox())!;

      await page.mouse.move(
        triggerRect.x + triggerRect.width / 2,
        triggerRect.y + triggerRect.height / 2,
        { steps: 5 },
      );

      await page.waitForSelector('text="Export to PDF"');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip shown on hover of non-interactive element', async () => {
      const triggerRect = (await trigger.nth(1).boundingBox())!;

      await page.mouse.move(
        triggerRect.x + triggerRect.width / 2,
        triggerRect.y + triggerRect.height / 2,
        { steps: 5 },
      );

      await page.waitForSelector('text="You confirmed your email"');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify keyboard interactions with Hint Base example', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = await page.locator('[data-ui-name="Hint"]');

    await test.step('Verify tooltip shown on Tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(trigger.nth(0)).toBeFocused();
      await page.waitForSelector('text="Export to PDF"');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip shown after Escape and Tab again', async () => {
      await page.keyboard.press('Escape');
      await page.keyboard.press('Tab');
      await expect(trigger.nth(1)).not.toBeFocused();
    });
  });
});
