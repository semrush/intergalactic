import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Popper', () => {
  test('Focus lock', async ({ page }) => {
    const standPath = 'semcore/core/__tests__/popper-stands/dropdown.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.mouse.click(1, 1);

    await page.keyboard.press('Tab');

    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
      await page.waitForFunction(() => {
        const focusedElement = document.activeElement;
        return (
          focusedElement?.matches('[data-testid="popper"]') ||
          focusedElement?.matches('[data-testid="input-in-popper"]')
        );
      });
    }
  });
  test('Focus lock with disablePortal', async ({ page, browserName }) => {
    test.skip(
      browserName === 'firefox',
      "This test for some reason doesn't work in FF - it puts focus on the last input after the first click",
    );

    const standPath = 'semcore/core/__tests__/popper-stands/disable-portal.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.mouse.click(1, 1);

    await page.keyboard.press('Tab');

    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
      await page.waitForFunction(() => {
        const focusedElement = document.activeElement;
        return (
          focusedElement?.matches('[data-testid="popper"]') ||
          focusedElement?.matches('[data-testid="input-in-popper"]')
        );
      });
    }
  });
  test('cursor anchoring', async ({ page }) => {
    const standPath = 'semcore/core/__tests__/popper-stands/cursor-anchoring.tsx';
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
      const standPath = 'semcore/core/__tests__/popper-stands/label-referenced.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const option1Locator = await page.locator('text=Option 1');
      const option3Locator = await page.locator('text=Option 3');

      await expect(option3Locator).toHaveCount(0);

      await page.locator('label').click();

      await expect(option3Locator).toHaveCount(1);

      await option1Locator.click();

      await expect(option3Locator).toHaveCount(0);
    });
    test('wrapped', async ({ page }) => {
      const standPath = 'semcore/core/__tests__/popper-stands/label-wrapped.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const option1Locator = await page.locator('text=Option 1');
      const option3Locator = await page.locator('text=Option 3');

      await expect(option3Locator).toHaveCount(0);

      await page.locator('label').click();

      await expect(option3Locator).toHaveCount(1);

      await option1Locator.click();

      await expect(option3Locator).toHaveCount(0);
    });
    test('wrapped with disable portal', async ({ page }) => {
      const standPath = 'semcore/core/__tests__/popper-stands/label-wrapped-disable-portal.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const option1Locator = await page.locator('text=Option 1');
      const option3Locator = await page.locator('text=Option 3');

      await expect(option3Locator).toHaveCount(0);

      await page.locator('label').click();

      await expect(option3Locator).toHaveCount(1);

      await option1Locator.click();

      await expect(option3Locator).toHaveCount(0);
    });
  });
  test('page resizing', async ({ page }) => {
    const standPath = 'semcore/core/__tests__/popper-stands/page-resizing.tsx';
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
    test('with mouse', async ({ page }) => {
      const standPath = 'semcore/core/__tests__/popper-stands/hover-interaction.tsx';
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
      const standPath = 'semcore/core/__tests__/popper-stands/hover-interaction.tsx';
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
    const standPath = 'semcore/core/__tests__/popper-stands/multiple-focusables-in-trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstInput = await page.locator('input[data-position="before"]');
    const secondInput = await page.locator('input[data-position="after"]');
    firstInput.focus();

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
    const standPath = 'semcore/core/__tests__/popper-stands/focus-interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const before = page.locator('button[data-position="before"]');
    await before.focus();

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
