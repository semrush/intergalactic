import { expect, Page, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

async function checkAriaMaxValue(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuemax');
  const attrValue = await scrollBar.getAttribute('aria-valuemax');
  expect(attrValue).not.toBeNull();
  const value = Number(attrValue);
  expect(Number.isNaN(value)).toBe(false);
  expect(value).toBeGreaterThan(0);
  return value;
}

async function checkAriaNowValue(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuenow');
  const attrValue = await scrollBar.getAttribute('aria-valuenow');
  expect(attrValue).not.toBeNull();
  const value = Number(attrValue);
  expect(Number.isNaN(value)).toBe(false);
  return value;
}

async function checkScrollNowIncreased(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuenow');
  const nowValue = await scrollBar.getAttribute('aria-valuenow');
  expect(nowValue).not.toBeNull();
  const nowNumber = Number(nowValue);
  expect(Number.isNaN(nowNumber)).toBe(false);
  expect(nowNumber).toBeGreaterThan(0);
  return nowNumber;
}

test.describe('ScrollArea - Basic Usage', () => {
  test('Verify keyboard scroll and attributes ', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const scrollContainer = await page.locator('[data-ui-name="ScrollArea.Container"]');
    await expect(scrollContainer).toHaveAttribute('tabindex', '0');
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    await expect(scrollBar).toHaveAttribute('role', 'scrollbar');
    await expect(scrollBar).toHaveAttribute('aria-orientation', 'vertical');
    await expect(scrollBar).toHaveAttribute('aria-valuenow', '0');
    await expect(scrollBar).toHaveAttribute('aria-valuemax');
    const attrValue = await scrollBar.getAttribute('aria-valuemax');

    const initialValue = await checkAriaMaxValue(scrollBar);

    await page.keyboard.press('Tab');
    await expect(scrollContainer).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await expect(scrollBar).toHaveAttribute('aria-valuenow');

    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);

    await expect(page).toHaveScreenshot();
  });

  test('Verify mouse scroll', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const container = await page.locator('[data-ui-name="ScrollArea.Container"]');
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const initialValue = await checkAriaMaxValue(scrollBar);
    await container.hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    // check that aria-valuenow > 0 because it differs a bit on each browser and screen size
    const nowNumber = await checkScrollNowIncreased(scrollBar);
    expect(nowNumber).toBeLessThanOrEqual(initialValue);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});

test.describe('ScrollArea - Reverse amd synch scrolls', () => {
  test(' Verify keyboard scroll', async ({ page }) => {
    const standPath =
      'stories/components/scroll-area/docs/examples/synchronized_reverse_scroll_on_two_different_screens.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const mainDiv = page.locator('#main-reverse-title').locator('..'); // parent container
    const scrollBarMain = mainDiv.locator('[data-ui-name="ScrollArea.Bar"]');
    const containerMain = mainDiv.locator('[data-ui-name="ScrollArea.Container"]');

    const reverseDiv = page.locator('#control-reverse-title').locator('..'); // parent container
    const scrollBarReverse = reverseDiv.locator('[data-ui-name="ScrollArea.Bar"]');
    const containerReverse = reverseDiv.locator('[data-ui-name="ScrollArea.Container"]');

    const mainNowValue = await checkAriaNowValue(scrollBarMain);
    expect(mainNowValue).toEqual(0);

    const reverseNowValue = await checkAriaNowValue(scrollBarReverse);
    const reverseMaxValue = await checkAriaMaxValue(scrollBarReverse);
    expect(reverseMaxValue).toEqual(reverseNowValue);

    await page.keyboard.press('Tab');
    await expect(containerMain).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const nowMainNumber = await checkScrollNowIncreased(scrollBarMain);
    expect(mainNowValue).toBeLessThanOrEqual(nowMainNumber);

    const reverseValueNow = await checkAriaNowValue(scrollBarReverse);
    expect(reverseValueNow).toBeLessThan(reverseMaxValue);

    await page.keyboard.press('Tab');
    await expect(containerReverse).toBeFocused();
    await page.keyboard.press('ArrowDown');

    const nowMainNumber2 = await checkScrollNowIncreased(scrollBarMain);
    expect(nowMainNumber2).toEqual(nowMainNumber);
  });

  test('Verify mouse scroll ', async ({ page }) => {
    const standPath =
      'stories/components/scroll-area/docs/examples/synchronized_scroll_on_two_different_screens.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const mainDiv = page.locator('#main-title').locator('..'); // parent container
    const scrollBarMain = mainDiv.locator('[data-ui-name="ScrollArea.Bar"]');
    const containerMain = mainDiv.locator('[data-ui-name="ScrollArea.Container"]');

    const reverseDiv = page.locator('#control-title').locator('..'); // parent container
    const scrollBarReverse = reverseDiv.locator('[data-ui-name="ScrollArea.Bar"]');
    const containerReverse = reverseDiv.locator('[data-ui-name="ScrollArea.Container"]');

    const mainNowValue = await checkAriaNowValue(scrollBarMain);
    expect(mainNowValue).toEqual(0);

    const synchNowValue = await checkAriaNowValue(scrollBarReverse);
    expect(synchNowValue).toEqual(0);

    await containerMain.hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);

    const nowMainValueNew = await checkScrollNowIncreased(scrollBarMain);
    expect(mainNowValue).toBeLessThan(nowMainValueNew);
    const synchNowValueNew = await checkAriaNowValue(scrollBarReverse);
    expect(synchNowValue).toBeLessThan(synchNowValueNew);

    expect(nowMainValueNew).toEqual(synchNowValueNew);

    await containerReverse.hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);

    const nowMainValueNew2 = await checkScrollNowIncreased(scrollBarMain);
    expect(nowMainValueNew2).toEqual(nowMainValueNew);
    const synchNowValueNew2 = await checkAriaNowValue(scrollBarReverse);
    expect(synchNowValueNew).toBeLessThan(synchNowValueNew2);
  });
});

test.describe('ScrollArea - Dynamic Virtual List', () => {
  test('Verify scroll bar increases and keyboard scroll works ', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/docs/examples/dynamic_virtual_list.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const scrollContainer = page.getByRole('grid');

    const mainNowValue = await checkAriaNowValue(scrollBar);
    expect(mainNowValue).toEqual(0);
    const mainMaxValue = await checkAriaMaxValue(scrollBar);
    expect(mainMaxValue).toEqual(220);

    await page.keyboard.press('Tab');

    await page.keyboard.press('Enter');
    const mainNowValue2 = await checkAriaNowValue(scrollBar);
    expect(mainNowValue2).toEqual(0);
    const mainMaxValue2 = await checkAriaMaxValue(scrollBar);
    expect(mainMaxValue2).toEqual(340);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(scrollContainer).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    const mainNowValue3 = await checkAriaNowValue(scrollBar);
    expect(mainNowValue3).toBeGreaterThan(0);
    const mainMaxValue3 = await checkAriaMaxValue(scrollBar);
    expect(mainMaxValue3).toEqual(460);
  });

  test('Verify scroll bar changes and mouse scroll works ', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/docs/examples/dynamic_virtual_list.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const scrollContainer = page.getByRole('grid');
    const addItemBtn = page.getByRole('button', { name: 'Add item' });
    const removeItemBtn = page.getByRole('button', { name: 'Remove item' });

    await scrollContainer.hover();
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(1000);

    await addItemBtn.click();
    await addItemBtn.click();
    await addItemBtn.click();

    const nowValue = await checkAriaNowValue(scrollBar);
    expect(nowValue).toEqual(100);

    const maxValue = await checkAriaMaxValue(scrollBar);
    expect(maxValue).toEqual(580);

    await removeItemBtn.click();
    await removeItemBtn.click();
    await removeItemBtn.click();
    await removeItemBtn.click();
    await removeItemBtn.click();
    await removeItemBtn.click();
    await expect(page.locator('[data-ui-name="ScrollArea.Bar"]')).toHaveCount(0); //removes from DOM
  });
});

test.describe('ScrollArea - Horizontal scroll with Shadow and offset', () => {
  test('Verify horizontal scroll with shadow and offsets ', async ({ page }) => {
    const standPath =
      'stories/components/scroll-area/tests/examples/horizontal-scroll-with-shadow-and-offset.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const scrollArea = page.locator('[data-ui-name="ScrollArea"]');
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    await expect(scrollBar).toHaveAttribute('aria-orientation', 'horizontal');

    const styleValues = await scrollArea.evaluate((el) => {
      const computedStyles = window.getComputedStyle(el);
      const inlineStyle = el.getAttribute('style') || '';

      // search CSS-var without suffics
      function getCSSVarByPrefix(prefix: any) {
        const allVars = Array.from(computedStyles).filter((name) => name.startsWith(prefix));
        if (allVars.length > 0) return computedStyles.getPropertyValue(allVars[0]).trim();

        const regex = new RegExp(`${prefix}[^:]*:\\s*([^;]+);`);
        const match = inlineStyle.match(regex);
        return match ? match[1].trim() : null;
      }

      return {
        leftOffset: getCSSVarByPrefix('--leftOffset'),
        rightOffset: getCSSVarByPrefix('--rightOffset'),
        topOffset: getCSSVarByPrefix('--topOffset'),
        bottomOffset: getCSSVarByPrefix('--bottomOffset'),
      };
    });

    expect(styleValues.leftOffset).toBe('100');
    expect(styleValues.rightOffset).toBe('100');
    expect(styleValues.topOffset).toBe('100');
    expect(styleValues.bottomOffset).toBe('100');

    const mainNowValue = await checkAriaNowValue(scrollBar);
    expect(mainNowValue).toEqual(0);
    const mainMaxValue = await checkAriaMaxValue(scrollBar);
    expect(mainMaxValue).toBeGreaterThan(0);

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="ScrollArea.Container"]')).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const mainNowValue2 = await checkAriaNowValue(scrollBar);
    expect(mainNowValue2).toBeGreaterThan(0);
    const mainMaxValue2 = await checkAriaMaxValue(scrollBar);
    expect(mainMaxValue2).toEqual(mainMaxValue);
    await expect(page).toHaveScreenshot();
  });

  test('Verify vertical scroll with shadow and ring offsets', async ({ page }) => {
    const standPath =
      'stories/components/scroll-area/tests/examples/vertical-scroll-with-shadow-and-offset.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const scrollContainer = page.locator('[data-ui-name="ScrollArea.Container"]');

    const styleValues = await scrollContainer.evaluate((el) => {
      const computedStyles = window.getComputedStyle(el);
      const inlineStyle = el.getAttribute('style') || '';

      function getCSSVarByPrefix(prefix: any) {
        const allVars = Array.from(computedStyles).filter((name) => name.startsWith(prefix));
        if (allVars.length > 0) return computedStyles.getPropertyValue(allVars[0]).trim();

        const regex = new RegExp(`${prefix}[^:]*:\\s*([^;]+);`);
        const match = inlineStyle.match(regex);
        return match ? match[1].trim() : null;
      }

      return {
        topOffset: getCSSVarByPrefix('--focusRingTopOffset'),
        bottomOffset: getCSSVarByPrefix('--focusRingBottomOffset'),
        rightOffset: getCSSVarByPrefix('--focusRingRightOffset'),
        leftOffset: getCSSVarByPrefix('--focusRingLeftOffset'),
      };
    });

    expect(styleValues.topOffset).toBe('40px');
    expect(styleValues.bottomOffset).toBe('40px');
    expect(styleValues.rightOffset).toBe('40px');
    expect(styleValues.leftOffset).toBe('40px');

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="ScrollArea.Container"]')).toBeFocused();
    await scrollContainer.hover();
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify observe parent size', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/tests/examples/with-observe-parent-size.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const increaseButton = page.getByRole('button', { name: 'Increase size' });

    const mainNowValue = await checkAriaNowValue(scrollBar);
    expect(mainNowValue).toEqual(0);
    const mainMaxValue = await checkAriaMaxValue(scrollBar);
    expect(mainMaxValue).toBeGreaterThan(0);

    await increaseButton.click();
    await increaseButton.click();

    const mainMaxValue2 = await checkAriaMaxValue(scrollBar);
    expect(mainMaxValue2).toEqual(mainMaxValue);
  });
});
