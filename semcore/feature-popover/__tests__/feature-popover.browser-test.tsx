import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const placement = [
    { placement: 'auto-start' },
    { placement: 'auto' },
    { placement: 'auto-end' },
    { placement: 'top-start' },
    { placement: 'top' },
    { placement: 'top-end' },
    { placement: 'right-start' },
    { placement: 'right' },
    { placement: 'right-end' },
    { placement: 'bottom-end' },
    { placement: 'bottom' },
    { placement: 'bottom-start' },
    { placement: 'left-end' },
    { placement: 'left' },
    { placement: 'left-start' },

  ];
  placement.forEach((item) => {
    test(`Verify Feature popover when placement = ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/feature-popover/tests/examples/base-usage-with-all-props.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      const featurePopoverPopper = page.locator('[data-ui-name="FeaturePopover.Popper"]');
      const close = page.locator('[aria-label="Close"]');
      const hint = page.getByText('Close');
      await featurePopoverPopper.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await test.step('Verify visual regression when focus inside feature popover', async () => {
        await page.keyboard.press('Tab');
        await expect(close).toBeFocused();
        await hint.waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      });
    });
  });

  const closeIcon = [
    { closeIcon: true, theme: 'accent' },
    { closeIcon: false, theme: 'accent' },
    { closeIcon: true, theme: 'neutral' },
    { closeIcon: false, theme: 'neutral' },

  ];
  closeIcon.forEach((item) => {
    test(`Verify Feature popover styles with closeIcon = ${item.closeIcon} and theme = ${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/feature-popover/docs/examples/Basic.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);
      const spot = page.locator('[data-ui-name="FeaturePopover.Spot"]');

      const featurePopoverPopper = page.locator('[data-ui-name="FeaturePopover.Popper"]');
      await featurePopoverPopper.waitFor({ state: 'visible' });

      await test.step('Verify spot styles', async () => {
        await expect(spot).toHaveCSS('width', '12px');
        await expect(spot).toHaveCSS('height', '12px');
      });

      await test.step('Verify Feature Popover Popper styles', async () => {
        await expect(featurePopoverPopper).toHaveCSS('padding-left', '16px');
        await expect(featurePopoverPopper).toHaveCSS('padding-top', '16px');
        await expect(featurePopoverPopper).toHaveCSS('padding-bottom', '16px');
        await expect(featurePopoverPopper).toHaveCSS('padding-right', '40px');
      });

      await test.step('Verify visual regression', async () => {
        await expect(page).toHaveScreenshot();
      });
    });
  });

  test(`Verify Feature popover styles with medium illustration`, async ({ page }) => {
    const standPath = 'stories/components/feature-popover/tests/examples/base-usage-with-medium-illustration';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const featurePopoverPopper = page.locator('[data-ui-name="FeaturePopover.Popper"]');
    await featurePopoverPopper.waitFor({ state: 'visible' });
    const close = page.locator('[aria-label="Close"]');
    const hint = page.getByText('Close');
    await close.hover();
    await hint.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify Base example with Close keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/feature-popover/docs/examples/Basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const featurePopoverTrigger = page.locator('[data-ui-name="FeaturePopover.Trigger"]');
    const ddTrigger = page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const featurePopoverPopper = page.locator('[data-ui-name="FeaturePopover.Popper"]');
    await featurePopoverPopper.waitFor({ state: 'visible' });
    const popper = page.getByRole('dialog');
    const close = page.locator('[aria-label="Close"]');
    const hint = page.getByText('Close');

    await test.step('Verify trigger attributes', async () => {
      await expect(featurePopoverTrigger).toHaveAttribute('aria-haspopup', 'false');
    });

    await test.step('Verify popper focused when opened', async () => {
      await expect(popper).toBeFocused();
    });

    await test.step('Verify popper attributes', async () => {
      await expect(popper).toHaveAttribute('tabindex', '0');
      await expect(popper).toHaveAttribute('data-popper-placement');
    });
    await test.step('Verify close button focused by Tab', async () => {
      await page.keyboard.press('Tab');
      await expect(close).toBeFocused();
      await hint.waitFor({ state: 'visible' });
    });

    await test.step('Verify Feature Popper closed by Close button activating ', async () => {
      await page.keyboard.press('Enter');
      await featurePopoverPopper.waitFor({ state: 'hidden' });
      await expect(ddTrigger).toBeFocused();
    });

    await test.step('Verify Feature Popper not opened again by activating the trigger', async () => {
      await page.keyboard.press('Enter');
      await expect(featurePopoverPopper).toHaveCount(0);
      await page.keyboard.press('Escape');
      await expect(featurePopoverPopper).toHaveCount(0);
    });

    await test.step('Verify Feature Popper opened and focused when reload page again', async () => {
      await page.setContent(htmlContent);
      await featurePopoverPopper.waitFor({ state: 'visible' });
      await expect(popper).toBeFocused();
    });

    await test.step('Verify Feature Popper closed by ESC when focus is on the other focusable element inside ', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await featurePopoverPopper.waitFor({ state: 'hidden' });
      await expect(ddTrigger).toBeFocused();
    });

    await test.step('Verify focus in not looped inside Feature Popover and focused goes to next button when disablePortal = true', async () => {
      await page.setContent(htmlContent);
      await featurePopoverPopper.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(featurePopoverPopper).toBeVisible();
      await expect(page.getByRole('button', { name: 'Reload page' })).toBeFocused();
    });
  });

  test('Verify Base example without Close keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/feature-popover/docs/examples/Basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closeIcon: false });

    await page.setContent(htmlContent);
    const ddTrigger = page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const featurePopoverPopper = page.locator('[data-ui-name="FeaturePopover.Popper"]');
    await featurePopoverPopper.waitFor({ state: 'visible' });
    const popper = page.locator('[data-ui-name="Popper.Popper"]');

    await test.step('Verify popper focused when shown', async () => {
      await expect(popper).toBeFocused();
    });

    await test.step('Verify next focusable element focused by Tab pressing ', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Next' })).toBeFocused();
    });

    await test.step('Verify Feature Popper closed by Escape', async () => {
      await page.keyboard.press('Escape');
      await featurePopoverPopper.waitFor({ state: 'hidden' });
      await expect(ddTrigger).toBeFocused();
    });

    await test.step('Verify Feature Popper not opened again by activating the trigger', async () => {
      await page.keyboard.press('Enter');
      await expect(featurePopoverPopper).toHaveCount(0);
      await page.keyboard.press('Escape');
      await expect(featurePopoverPopper).toHaveCount(0);
    });
  });

  test('Verify Base example with Close mouse interactions', async ({ page }) => {
    const standPath = 'stories/components/feature-popover/docs/examples/Basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const ddTrigger = page.locator('[data-ui-name="DropdownMenu.Trigger"]');
    const gotIt = page.getByText('Next');
    const featurePopoverPopper = page.locator('[data-ui-name="FeaturePopover.Popper"]');
    await featurePopoverPopper.waitFor({ state: 'visible' });
    const popper = page.getByRole('dialog');
    const close = page.locator('[aria-label="Close"]');
    const hint = page.getByText('Close');

    await test.step('Verify Hint on hover Close', async () => {
      await close.hover();
      await hint.waitFor({ state: 'visible' });
      await expect(hint).toHaveCount(1);
    });

    await test.step('Verify Feature Popper closed by click on Close button', async () => {
      await close.click();
      await featurePopoverPopper.waitFor({ state: 'hidden' });
      await expect(featurePopoverPopper).toHaveCount(0);
    });

    await test.step('Verify Feature Popper not shown again by click on the trigger', async () => {
      await ddTrigger.click();
      await expect(featurePopoverPopper).toHaveCount(0);
    });

    await test.step('Verify Feature Popper closed by pressing Other button', async () => {
      await page.setContent(htmlContent);
      await featurePopoverPopper.waitFor({ state: 'visible' });
      await gotIt.click();
      await featurePopoverPopper.waitFor({ state: 'hidden' });
      await expect(featurePopoverPopper).toHaveCount(0);
    });

    await test.step('Verify Feature Popper not closed by clicking outside', async () => {
      await page.setContent(htmlContent);
      await featurePopoverPopper.waitFor({ state: 'visible' });
      await page.mouse.click(0, 0);
      await expect(popper).not.toBeFocused();
      await page.keyboard.press('Escape');
      await expect(featurePopoverPopper).toHaveCount(1);
    });

    await test.step('Verify Feature Popper closed by clicking on trigger', async () => {
      await ddTrigger.click();
      await featurePopoverPopper.waitFor({ state: 'visible' });
      await expect(featurePopoverPopper).toHaveCount(0);
    });
  });

  test('Verify Focus order when disablePortal = false', async ({ page }) => {
    const standPath = 'stories/components/feature-popover/tests/examples/base-usage-with-all-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { disablePortal: false });

    await page.setContent(htmlContent);
    const featurePopoverPopper = page.locator('[data-ui-name="FeaturePopover.Popper"]');
    await featurePopoverPopper.waitFor({ state: 'visible' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(featurePopoverPopper).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reload page' })).not.toBeFocused();
  });
});
