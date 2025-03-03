import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Popper', () => {
  test('Verify Focus lock wotks in dropdown', async ({ page }) => {
    const standPath = 'stories/components/popper/tests/examples/dropdown.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.mouse.click(1, 1);

    await page.keyboard.press('Tab');

    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('popper')).not.toBeFocused();
      await expect(page.getByTestId('input-in-popper').getByPlaceholder('Password')).toBeFocused();
    }
  });

  test('Veiryf Focus lock works with disablePortal', async ({ page, browserName }) => {
    if (browserName === 'firefox') return; //"This test for some reason doesn't work in FF - it puts focus on the last input after the first click",

    const standPath = 'stories/components/popper/tests/examples/disable-portal.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.mouse.click(1, 1);

    await page.keyboard.press('Tab');

    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
      await expect(page.getByTestId('popper')).not.toBeFocused();
      await expect(page.getByTestId('input-in-popper').getByPlaceholder('Password')).toBeFocused();
    }
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

  test.describe('label', () => {
    test('referenced', async ({ page }) => {
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

    test('wrapped', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/label-wrapped.tsx';
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
    test('wrapped with disable portal', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/label-wrapped-disable-portal.tsx';
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
  });
  test('page resizing', async ({ page }) => {
    const standPath = 'stories/components/popper/tests/examples/page-resizing.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const popper = await page.locator('text=Popper');
    const popperY = (await popper.boundingBox())!.y;

    const resizeButton = await page.locator('text=Change height');
    await resizeButton.click();

    await new Promise((resolve) => setTimeout(resolve, 20));

    const newPopperY = (await popper.boundingBox())!.y;

    expect(Math.round(newPopperY)).toBeCloseTo(Math.round(popperY));
  });

  test.describe('hover interaction', () => {
    test.use({ hasTouch: true });
    test('with mouse', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/hover-interaction.tsx';
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
    });
    test('with touch', async ({ page }) => {
      const standPath = 'stories/components/popper/tests/examples/hover-interaction.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const triggerLocator = await page.locator('text=Trigger');
      const popperLocator = await page.locator('text=Popper');

      const triggerRect = (await triggerLocator.boundingBox())!;

      await page.touchscreen.tap(
        triggerRect.x + triggerRect.width / 2,
        triggerRect.y + triggerRect.height / 2,
      );

      await expect(popperLocator).toHaveCount(1);
    });
  });
  test('works well with multiple focusables inside of trigger', async ({ page }) => {
    const standPath = 'stories/components/popper/tests/examples/multiple-focusables-in-trigger.tsx';
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

  test('Should open popper second time', async ({ page }) => {
    const standPath = 'stories/components/popper/tests/examples/focus-interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const before = page.locator('button[data-position="before"]');
    await page.keyboard.press('Tab');
    await expect(before).toBeFocused();

    const popperLocator = page.locator('text=Some content in popper');
    await expect(popperLocator).toHaveCount(0);

    await new Promise((resolve) => setTimeout(resolve, 50));
    await page.keyboard.press('Tab');

    await expect(popperLocator).toHaveCount(1);
    await expect(page).toHaveScreenshot();

    await new Promise((resolve) => setTimeout(resolve, 50));
    await page.keyboard.press('Shift+Tab');

    await expect(popperLocator).toHaveCount(0);
    await expect(before).toBeFocused();
    await expect(page).toHaveScreenshot();

    await new Promise((resolve) => setTimeout(resolve, 50));
    await page.keyboard.press('Tab');

    await expect(popperLocator).toHaveCount(1);
    await expect(page).toHaveScreenshot();
  });
});
