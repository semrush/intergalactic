import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Popper', () => {
  test.describe('Focus Lock', () => {
    test('Verify Focus lock without disablePortal', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/dropdown-no-disable-portal.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await page.mouse.click(1, 1);

      await page.keyboard.press('Tab');

      for (let i = 0; i < 50; i++) {
        await page.keyboard.press('Tab');
        await expect(page.getByTestId('popper')).not.toBeFocused();
        await expect(
          page.getByTestId('input-in-popper').getByPlaceholder('Password'),
        ).toBeFocused();
      }
    });

    test('Verify Focus lock with disablePortal', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/dropdown-disable-portal.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await page.mouse.click(1, 1);

      await page.keyboard.press('Tab');

      for (let i = 0; i < 50; i++) {
        await page.keyboard.press('Tab');
        await expect(page.getByTestId('popper')).not.toBeFocused();
        await expect(page.getByTestId('input-in-popper')).toBeFocused();
      }
    });
  });

  test('Verify popper position for cursor anchoring functionality', async ({ page }) => {
    const standPath = 'stories/components/popper/tests/examples/cursor-anchoring.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-testid="trigger"]');
    const popper = await page.locator('[data-testid="popper"]');

    const triggerRect = (await trigger.boundingBox())!;
    const triggerRightBottomCorner = [
      triggerRect.x + triggerRect.width,
      triggerRect.y + triggerRect.height,
    ];
    const triggerLeftBottomCorner = [triggerRect.x, triggerRect.y + triggerRect.height];

    await page.mouse.move(triggerRightBottomCorner[0] + 10, triggerRightBottomCorner[1] + 10);
    await page.mouse.move(triggerRightBottomCorner[0] - 10, triggerRightBottomCorner[1] - 10, {
      steps: 10,
    });

    let popperRect = (await popper.boundingBox())!;
    expect(popperRect.x).toBeGreaterThan(triggerRect.x + triggerRect.width * (4 / 5));

    await page.mouse.move(triggerLeftBottomCorner[0] - 10, triggerLeftBottomCorner[1] + 10);
    await new Promise((r) => setTimeout(r, 1000));
    await page.mouse.move(triggerLeftBottomCorner[0] + 10, triggerLeftBottomCorner[1] - 10, {
      steps: 10,
    });

    popperRect = (await popper.boundingBox())!;
    expect(popperRect.x).toBeLessThan(triggerRect.x + triggerRect.width * (1 / 5));
  });

  test.describe('Label fucntionality', () => {
    test('Verify Referenced label', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/label-referenced.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const option1Locator = await page.locator('text=Option 1');
      const option3Locator = await page.locator('text=Option 3');

      await expect(option3Locator).toHaveCount(0);

      await page.locator('label').click();

      await expect(option3Locator).toHaveCount(1);

      await option1Locator.click();

      await expect(option3Locator).toHaveCount(0);
      await expect(option1Locator).toHaveCount(1);
    });

    test('Verify Wrapped label', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/label-wrapped.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const option1Locator = page.locator('text=Option 1');
      const option3Locator = page.locator('text=Option 3');

      await expect(option3Locator).toHaveCount(0);

      await page.locator('label').click();

      await expect(option3Locator).toHaveCount(1);

      await option1Locator.click();

      await expect(option3Locator).toHaveCount(0);
      await expect(option1Locator).toHaveCount(1);
    });

    test('Verify wrapped label with disable portal', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/label-wrapped-disable-portal.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const option1Locator = page.locator('text=Option 1');
      const option3Locator = page.locator('text=Option 3');

      await expect(option3Locator).toHaveCount(0);

      await page.locator('label').click();

      await expect(option3Locator).toHaveCount(1);

      await option1Locator.click();

      await expect(option3Locator).toHaveCount(0);
      await expect(option1Locator).toHaveCount(1);
    });
  });

  test('Verify popper dynamic and fixed position with Page resizing', async ({ page }) => {
    const standPath = 'stories/components/popper/tests/examples/page-resizing.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const popperD = page.locator('text=Popper');
    const popperF = page.locator('text=Fixed');
    const popperDY = (await popperD.boundingBox())!.y;
    const popperFY = (await popperF.boundingBox())!.y;

    const resizeButton = page.locator('text=Change height');
    await resizeButton.click();

    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(page).toHaveScreenshot();
    const newPoppeDY = (await popperD.boundingBox())!.y;
    const newPoppeFY = (await popperF.boundingBox())!.y;

    expect(Math.round(newPoppeDY)).toBeCloseTo(Math.round(popperDY));
    await expect(popperFY).toEqual(newPoppeFY);
  });

  test('Verify popper position with OffSet prop', async ({ page }) => {
    const standPath = 'stories/components/popper/tests/examples/offSet.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('text=Open popper');
    await trigger.click();
    await expect(page).toHaveScreenshot();
  });

  test('Verify popper when OutsideClick cancels hide', async ({ page }) => {
    const standPath = 'stories/components/popper/docs/examples/click-outside.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('text=Open popper');
    const popper = await page.locator('text=Attached content');
    await trigger.click();
    await expect(popper).toHaveCount(1);

    await page.keyboard.press('Escape');
    await expect(popper).toHaveCount(0);

    await trigger.click();
    await expect(popper).toHaveCount(1);
    await trigger.click();
    await expect(popper).toHaveCount(0);

    await trigger.click();

    const rootBox = await page.locator('div').first().boundingBox();
    if (!rootBox) {
      return;
    }

    const clickX = rootBox.x + rootBox.width - 10;
    const clickY = rootBox.y + 10;
    for (let i = 0; i < 20; i++) {
      await page.mouse.click(clickX, clickY);
      await expect(popper).toHaveCount(1);
    }
  });

  test('Verify onVisibleChange prop', async ({ page }) => {
    const standPath = 'stories/components/popper/docs/examples/show-hide.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const triggerControlled = await page.getByText('Controlled', { exact: true });
    const triggerUncontrolled = await page.locator('text=Uncontrolled');

    const popperControlled = page.locator('[data-popper-placement="right"]');
    const popperUncontrolled = page.locator('[data-popper-placement="left"]');
    await triggerControlled.click();
    await expect(popperControlled).toHaveCount(1);
    await triggerControlled.click();
    await expect(popperControlled).toHaveCount(0);

    await triggerControlled.click();
    await triggerUncontrolled.click();
    await expect(popperControlled).toHaveCount(0);
    await expect(popperUncontrolled).toHaveCount(1);
    await triggerUncontrolled.click();
    await expect(popperUncontrolled).toHaveCount(0);
    await triggerUncontrolled.click();
    await expect(popperUncontrolled).toHaveCount(1);

    await triggerControlled.click();
    await expect(popperControlled).toHaveCount(1);
    await expect(popperUncontrolled).toHaveCount(0);

    await page.keyboard.press('Escape');
    await expect(popperControlled).toHaveCount(0);
    await expect(popperUncontrolled).toHaveCount(0);

    await triggerUncontrolled.click();
    await page.keyboard.press('Escape');
    await expect(popperControlled).toHaveCount(0);
    await expect(popperUncontrolled).toHaveCount(0);

    await triggerControlled.click();
    await triggerControlled.click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(popperUncontrolled).toHaveCount(1);

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    await expect(popperUncontrolled).toHaveCount(1);
    await expect(popperControlled).toHaveCount(1);

    await page.keyboard.press('Enter');
    await expect(popperUncontrolled).toHaveCount(1);
    await expect(popperControlled).toHaveCount(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await expect(popperUncontrolled).toHaveCount(0);
    await expect(popperControlled).toHaveCount(0);
  });

  test('Verify placement prop', async ({ page }) => {
    const standPath = 'stories/components/popper/docs/examples/placement.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.getByText('TOP START', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="top-start"]')).toHaveCount(1);
    await expect(page).toHaveScreenshot();

    await page.getByText('TOP', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="top"]')).toHaveCount(1);

    await page.getByText('TOP END', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="top-end"]')).toHaveCount(1);

    page.getByText('RIGHT START', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="right-start"]')).toHaveCount(1);

    await page.getByText('RIGHT', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="right"]')).toHaveCount(1);
    await expect(page).toHaveScreenshot();

    page.getByText('RIGHT END', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="right-end"]')).toHaveCount(1);

    page.getByText('BOTTOM START', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="bottom-start"]')).toHaveCount(1);

    await page.getByText('BOTTOM', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="bottom"]')).toHaveCount(1);

    page.getByText('BOTTOM END', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="bottom-end"]')).toHaveCount(1);
    await expect(page).toHaveScreenshot();

    page.getByText('LEFT START', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="right-start"]')).toHaveCount(1);

    await page.getByText('LEFT', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="right"]')).toHaveCount(1);

    page.getByText('LEFT END', { exact: true }).hover();
    await expect(page.locator('[data-popper-placement="right-end"]')).toHaveCount(1);
  });

  test('Verify focus when disableEnforceFocus prop enabled', async ({ page, browserName }) => {
    const standPath = 'stories/components/popper/tests/examples/disableEnforceFocus.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    if (browserName === 'firefox') return; // skipped for ff because focus order is other
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');

    await expect(page.getByRole('button', { name: 'Open popper' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('input-out-popper').getByPlaceholder('Password')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('input-in-popper').getByPlaceholder('Password')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.getByTestId('input-in-popper').getByPlaceholder('Password'),
    ).not.toBeFocused();
  });

  test('Verify popper when disabled and focusLoop props set', async ({ page, browserName }) => {
    const standPath = 'stories/components/popper/tests/examples/some-more-props-test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');

    await expect(page.getByRole('button', { name: 'Disabled popper' })).toBeFocused();
    await page.keyboard.press('Enter');
    const popperLocator = page.locator('text=Attached content');
    await expect(popperLocator).toHaveCount(0);

    await page.keyboard.press('Tab');
    const popperTrigger = page.getByRole('button', { name: 'focusLoop' });
    await expect(popperTrigger).toBeFocused();
    await page.keyboard.press('Enter');
    const popperLocator2 = page.locator('[data-testid="popper"]');
    await expect(popperLocator2).toHaveCount(1);
    const input = page.getByTestId('input-in-popper').getByPlaceholder('Password');
    await expect(popperTrigger).toBeFocused();
    await expect(input).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(popperTrigger).not.toBeFocused();
    await expect(input).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(popperLocator2).toHaveCount(0);
    await expect(popperTrigger).toBeFocused();
  });

  test.describe('Interactions', () => {
    test.use({ hasTouch: true });
    test('Hover - Verify popper appears by Hover', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/interaction-hover.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const triggerLocator = await page.locator('text=Trigger');
      const popperLocator = await page.locator('text=Popper');

      const triggerRect = (await triggerLocator.boundingBox())!;

      await page.mouse.move(
        triggerRect.x + triggerRect.width / 2,
        triggerRect.y + triggerRect.height / 2,
        { steps: 5 },
      );

      await expect(popperLocator).toHaveCount(1);
      await expect(popperLocator).not.toBeFocused();
    });

    test.skip('Verify popper appears by Touch', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/interaction-hover.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await new Promise((resolve) => setTimeout(resolve, 250));

      const triggerLocator = await page.locator('text=Trigger');
      const popperLocator = await page.locator('text=Popper');

      // const triggerRect = (await triggerLocator.boundingBox())!;
      await triggerLocator.tap();
      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect(popperLocator).toBeVisible();
    });

    test('Click - Verify popper appearing', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/interaction-click.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const triggerLocator = await page.locator('text=Trigger');
      const popperLocator = await page.locator('text=Popper');

      const buttonLocator = await page.locator('button[data-testid="button"]');
      const before = page.locator('button[data-position="before"]');
      const after = page.locator('button[data-position="after"]');

      const popperLocator2 = page.locator('text=Some content in popper');

      await triggerLocator.hover();
      await expect(popperLocator).toHaveCount(0);

      await triggerLocator.click();

      await expect(popperLocator).toHaveCount(1);
      await expect(popperLocator).not.toBeFocused();

      await triggerLocator.click();
      await expect(popperLocator).toHaveCount(0);

      await buttonLocator.hover();
      await expect(popperLocator2).toHaveCount(0);

      await buttonLocator.click();
      await expect(popperLocator2).toHaveCount(1);
      await expect(popperLocator).not.toBeFocused();

      await before.click();
      await expect(popperLocator2).toHaveCount(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(popperLocator2).toHaveCount(1);
      await expect(popperLocator).not.toBeFocused();
    });

    test('None - Verify popper doesnt appear', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/interaction-none.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const triggerLocator = await page.locator('text=Trigger');
      const popperLocator = await page.locator('text=Popper');

      const buttonLocator = await page.locator('button[data-testid="button"]');
      const before = page.locator('button[data-position="before"]');
      const after = page.locator('button[data-position="after"]');

      const popperLocator2 = page.locator('text=Some content in popper');

      await triggerLocator.hover();
      await expect(popperLocator).toHaveCount(0);

      await triggerLocator.click();

      await expect(popperLocator).toHaveCount(0);

      await triggerLocator.click();
      await expect(popperLocator).toHaveCount(0);

      await buttonLocator.hover();
      await expect(popperLocator2).toHaveCount(0);

      await buttonLocator.click();
      await expect(popperLocator2).toHaveCount(0);

      await before.click();
      await expect(popperLocator2).toHaveCount(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(popperLocator2).toHaveCount(0);
    });

    test('Focus - Verify popper appearing', async ({ page, browserName }) => {
      const standPath = 'stories/components/popper/tests/examples/interaction-focus.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const before = page.locator('button[data-position="before"]');
      const after = page.locator('button[data-position="after"]');
      const buttonLocator = await page.locator('button[data-testid="button"]');
      const popperLocator = page.locator('text=Some content in popper');
      await before.click();
      await expect(popperLocator).toHaveCount(0);

      await buttonLocator.hover();
      await expect(popperLocator).toHaveCount(0);

      await buttonLocator.click();

      await expect(popperLocator).toHaveCount(1);

      await new Promise((resolve) => setTimeout(resolve, 50));
      if (browserName === 'webkit') {
        // added this if bacuse shift+tab doesnt move focus on prev element of webkit
        await page.keyboard.press('Tab');
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Shift+Tab');
      } else await page.keyboard.press('Shift+Tab');

      await expect(popperLocator).toHaveCount(0);
      await expect(before).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
      await expect(popperLocator).toHaveCount(1);

      await page.keyboard.press('Tab');
      await expect(popperLocator).toHaveCount(0);
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Escape');
      await expect(popperLocator).toHaveCount(0);
      await page.keyboard.press('Enter');
      await expect(popperLocator).toHaveCount(1);
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await expect(popperLocator).not.toBeVisible();
      await expect(after).toBeFocused();
    });

    test('Verify popper visibility when focusable elements on trigger and after trigger', async ({
      page,
    }) => {
      const standPath =
        'stories/components/popper/tests/examples/multiple-focusables-in-trigger.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const firstInput = await page.locator('input[data-position="before"]');
      const secondInput = await page.locator('input[data-position="after"]');
      await page.keyboard.press('Tab');
      await expect(firstInput).toBeFocused();

      const optionLocator = await page.locator('text=Option 1');
      await expect(optionLocator).toHaveCount(0);

      await new Promise((resolve) => setTimeout(resolve, 50));
      await page.keyboard.press('Tab');

      await expect(optionLocator).toHaveCount(1);

      await new Promise((resolve) => setTimeout(resolve, 50));
      await page.keyboard.press('Tab');

      await expect(optionLocator).toHaveCount(1);

      await new Promise((resolve) => setTimeout(resolve, 50));
      await page.keyboard.press('Tab');

      await expect(optionLocator).toHaveCount(1);

      await new Promise((resolve) => setTimeout(resolve, 50));
      await page.keyboard.press('Tab');

      await expect(optionLocator).toHaveCount(0);

      await expect(secondInput).toBeFocused();
    });

    test('Verify popper with render function', async ({ page, browserName }) => {
      const standPath = 'stories/components/popper/docs/examples/render-functions.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const buttonTrigger = page.getByRole('button', { name: 'Open popper' });
      const closePopper = page.getByRole('button', { name: 'Close popper' });
      const triggerPopper = page.getByText('Attach trigger');
      const popperLocator = page.locator('[data-ui-name="Popper.Popper"]');
      await expect(popperLocator).toHaveCount(0);

      //mouse interactions
      await buttonTrigger.hover();
      await expect(popperLocator).toHaveCount(0);
      await buttonTrigger.click();
      await expect(popperLocator).toHaveCount(1);
      await triggerPopper.click();
      await expect(popperLocator).toHaveCount(0);
      await triggerPopper.hover();
      await expect(popperLocator).toHaveCount(0);
      await triggerPopper.click();
      await expect(popperLocator).toHaveCount(1);
      await buttonTrigger.click();
      await expect(popperLocator).toHaveCount(0);
      await triggerPopper.click();
      await closePopper.click();
      await expect(popperLocator).toHaveCount(0);

      //keyboard interactions
      await page.mouse.click(1, 1);
      await page.keyboard.press('Tab');
      await expect(buttonTrigger).toBeFocused();
      await expect(popperLocator).toHaveCount(0);
      await page.keyboard.press('Enter');
      await expect(buttonTrigger).toBeFocused();
      await expect(popperLocator).toHaveCount(1);
      await page.keyboard.press('Tab');
      await expect(closePopper).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(popperLocator).toHaveCount(0);

      //the focus not returns to trigger in ff and webkit
      if (browserName === 'chromium') await expect(buttonTrigger).toBeFocused();
    });
  });
});
