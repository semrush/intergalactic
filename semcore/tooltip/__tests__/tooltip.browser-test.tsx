import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Tooltip - Visual', () => {
  test('Verify Tooltip Hint and DescriptionTooltip styles', async ({ page }) => {
    const standPath = 'stories/components/tooltip/tests/examples/tooltip-styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const hintPopper = page.locator('[data-ui-name="Hint.Popper"]');

    const tooltipPopper = page.locator('[data-ui-name="Tooltip.Popper"]');
    await tooltipPopper.nth(3).waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot();

    const descriptionTooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

    await hintPopper.first().waitFor();

    await expect(page).toHaveScreenshot();

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

  test('Verify Base example', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Tooltip"]');

    const triggerRect = (await trigger.first().boundingBox())!;

    await page.keyboard.press('Tab');

    await page.mouse.move(
      triggerRect.x + triggerRect.width / 2,
      triggerRect.y + triggerRect.height / 2,
      {
        steps: 5,
      },
    );
    await page.getByText(
      'Default tooltip contains short text explaining something about the trigger.',
    ).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Nested trigger', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/nested.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.getByText('Hello, stranger!').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify ignore portal stacking', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/ignore_portal_stacking.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const popper = await page.locator('[data-ui-name="Tooltip.Popper"]');
    const button = page.locator('[data-ui-name="Button"]');

    await button.click();
    await page.getByText('Tooltip with ignoring portals stacking.').first().waitFor({ state: 'visible' });
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
    await page.getByText('Option 1 description').waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});

test.describe('Tooltip - Functional', () => {
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
      await page.getByText(
        'Default tooltip contains short text explaining something about the trigger.',
      ).waitFor({ state: 'visible' });

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });

    await test.step('Verify tooltip shown on mouse click', async () => {
      await trigger.nth(1).click();
      await page.getByText(
        'Default tooltip contains short text explaining something about the trigger.',
      ).waitFor({ state: 'visible' });

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

    const popper = await page.locator('[data-ui-name="Tooltip.Popper"]');

    await test.step('Verify tooltip shown on focus', async () => {
      await page.keyboard.press('Tab');

      await page.getByText(
        'Default tooltip contains short text explaining something about the trigger.',
      ).waitFor({ state: 'visible' });

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });

    await test.step('Verify tooltip hide on escape', async () => {
      await page.keyboard.press('Escape');
      await expect(popper).not.toBeVisible();
      await expect(popper).toHaveCount(0);
    });

    await test.step('Verify tooltip shown on next focus and not closed by space', async () => {
      await page.keyboard.press('Tab');
      await page.getByText(
        'Default tooltip contains short text explaining something about the trigger.',
      ).waitFor({ state: 'visible' });

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);

      await page.keyboard.press('Space');

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });
  });

  test('Verify keyboard interactions with Nested trigger', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/nested.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const buttonLink = page.locator('[data-ui-name="ButtonLink"]');
    const popper = await page.locator('[data-ui-name="Tooltip.Popper"]');

    await test.step('Verify tooltip shown on focus', async () => {
      await expect(buttonLink).not.toHaveAttribute('aria-describedby');
      await page.keyboard.press('Tab');

      await page.getByText('Hello, stranger!').waitFor({ state: 'visible' });
      await expect(buttonLink).toHaveAttribute('aria-describedby');

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });

    await test.step('Verify tooltip hide on escape', async () => {
      await page.keyboard.press('Escape');
      await page.getByText('Hello, stranger!').waitFor({ state: 'hidden' });
      await expect(popper).toHaveCount(0);
      await expect(buttonLink).not.toHaveAttribute('aria-describedby');
    });
  });

  test('Verify mouse interactions with Nested trigger', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/nested.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-ui-name="Tooltip.Trigger"]');
    const buttonLink = page.locator('[data-ui-name="ButtonLink"]');
    const popper = await page.locator('[data-ui-name="Tooltip.Popper"]');

    await test.step('Verify tooltip shown on mouse hover', async () => {
      await expect(buttonLink).not.toHaveAttribute('aria-describedby');
      await trigger.hover();
      await page.getByText('Hello, stranger!').waitFor({ state: 'visible' });
      await expect(buttonLink).toHaveAttribute('aria-describedby');

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });

    await test.step('Verify tooltip not close on mouse click', async () => {
      await trigger.click();
      await page.getByText('Hello, stranger!').waitFor({ state: 'visible' });
      await expect(buttonLink).toHaveAttribute('aria-describedby');

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });
  });

  test('Verify Singleton tooltip shown by mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/tooltip/docs/examples/singleton.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const options = page.getByRole('option');
    const optionsCount = await options.count();
    await page.locator('[data-ui-name="Select.Trigger"]').click();
    await options.first().waitFor({ state: 'visible' });
    for (let i = 0; i < optionsCount; i++) {
      await expect(options.nth(i)).not.toHaveAttribute('aria-labelledby');
    }

    await page.locator('[data-ui-name="Select.Option"]').nth(2).hover();
    await page.getByText('Option 2 description').waitFor({ state: 'visible' });

    for (let i = 0; i < optionsCount; i++) {
      await expect(options.nth(i)).toHaveAttribute('aria-labelledby');
    }
    await expect(page.getByRole('tooltip')).toHaveCount(1);
  });
});

test.describe('Description tooltip - Visual', () => {
  test('Verify Informer ', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/informer/docs/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const linkPopper = page.locator('[data-ui-name="Link"]');

    await test.step('Verify expanded popper', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Enter');
      await linkPopper.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focus inside popper', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Base example', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-ui-name="DescriptionTooltip.Trigger"]');
    const linkPopper = page.locator('[data-ui-name="Link"]');

    await test.step('Verify tooltip shown on mouse click', async () => {
      await trigger.nth(0).click();
      await linkPopper.waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Description tooltip - Functional', () => {
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
      await linkPopper.waitFor({ state: 'visible' });

      await expect(trigger.nth(0)).not.toBeFocused();

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
      await expect(popper).toBeFocused();
      await expect(linkPopper).not.toBeFocused();
    });

    await test.step('Verify escape closes popper', async () => {
      await page.keyboard.press('Escape');
      await linkPopper.waitFor({ state: 'hidden' });

      await expect(trigger.nth(0)).toBeFocused();

      await expect(popper).not.toBeVisible();
    });

    await test.step('Verify space expands popper', async () => {
      await page.keyboard.press('Space');
      await linkPopper.waitFor({ state: 'visible' });

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
    });

    await test.step('Verify escape closes popper when link focused', async () => {
      await page.keyboard.press('Escape');
      await linkPopper.waitFor({ state: 'hidden' });

      await expect(trigger.nth(0)).toBeFocused();

      await expect(popper).not.toBeVisible();
    });

    await test.step('Verify tabs close popper', async () => {
      await page.keyboard.press('Enter');
      await linkPopper.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await linkPopper.waitFor({ state: 'hidden' });

      await expect(trigger.nth(0)).toBeFocused();
      await expect(popper).not.toBeVisible();
    });

    await test.step('Verify tabs switch focus to next trigger popper', async () => {
      await page.keyboard.press('Tab');

      await expect(trigger.nth(1)).toBeFocused();
      await expect(popper).not.toBeVisible();
    });
  });

  test('Verify mouse interactions with Base example', async ({ page }) => {
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
      await linkPopper.waitFor({ state: 'visible' });

      await expect(popper).toBeVisible();
      await expect(popper).toHaveCount(1);
    });

    await test.step('Verify tooltip close on 2nd click', async () => {
      await trigger.nth(0).click();
      await expect(popper).not.toBeVisible();
    });
  });
});

test.describe('Hint - Visual', () => {
  test('Verify mouse interactions with Base example', async ({ page }) => {
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

      await page.getByText('Export to PDF').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify tooltip shown on hover of non-interactive element', async () => {
      const triggerRect = (await trigger.nth(1).boundingBox())!;

      await page.mouse.move(
        triggerRect.x + triggerRect.width / 2,
        triggerRect.y + triggerRect.height / 2,
        { steps: 5 },
      );

      await page.getByText('You confirmed your email').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });
});

test.describe('Hint - Functional', () => {
  test('Verify keyboard interactions with Base example', async ({ page }) => {
    const standPath = 'stories/components/tooltip/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = await page.locator('[data-ui-name="Hint"]');

    await test.step('Verify tooltip shown on Tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(trigger.nth(0)).toBeFocused();
      await expect(page.getByText('Export to PDF')).toHaveCount(1);
    });

    await test.step('Verify tooltip on non interactive not shown by Tab ', async () => {
      await page.keyboard.press('Escape');
      await expect(page.getByText('Export to PDF')).toHaveCount(0);

      await page.keyboard.press('Tab');
      await expect(trigger.nth(1)).not.toBeFocused();
      await expect(page.getByText('You confirmed your email')).toHaveCount(0);
    });
  });
});
