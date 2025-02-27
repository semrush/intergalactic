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
  test('Verifty keyboard scroll and ', async ({ page }) => {
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

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.03 });
  });


  test('Verify mouse scroll works inside container', async ({ page }) => {
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
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.03 });


  });
});

test.describe('ScrollArea - Reverse amd synch scrolls', () => {
  test('Reverse - Verifty keyboard scroll and ', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/docs/examples/synchronized_reverse_scroll_on_two_different_screens.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const mainDiv = page.locator('#main-reverse-title').locator('..'); // Родительский контейнер
    const scrollBarMain = mainDiv.locator('[data-ui-name="ScrollArea.Bar"]');
    const containerMain = mainDiv.locator('[data-ui-name="ScrollArea.Container"]');
    
    const reverseDiv = page.locator('#control-reverse-title').locator('..'); // Родительский контейнер
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

  // check that aria-valuemax not changed
  const reverseValueNow = await checkAriaNowValue(scrollBarReverse);

expect(reverseValueNow).toBeLessThan(reverseMaxValue);

await page.keyboard.press('Tab');
await expect(containerReverse).toBeFocused();
await page.keyboard.press('ArrowDown');

const nowMainNumber2 = await checkScrollNowIncreased(scrollBarMain);
    expect(nowMainNumber2).toEqual(nowMainNumber);

  });

  test('Synch - Verifty mouse scroll and ', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/docs/examples/synchronized_scroll_on_two_different_screens.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const mainDiv = page.locator('#main-title').locator('..'); // Родительский контейнер
    const scrollBarMain = mainDiv.locator('[data-ui-name="ScrollArea.Bar"]');
    const containerMain = mainDiv.locator('[data-ui-name="ScrollArea.Container"]');
    
    const reverseDiv = page.locator('#control-title').locator('..'); // Родительский контейнер
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
  test('Dynamic Scroll - Verifty keyboard scroll ', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/docs/examples/dynamic_virtual_list.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

   
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    const scrollContainer = page.getByRole('grid');
 const addItemBtn = page.getByRole('button', { name: 'Add item' });
    
  
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

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    const mainNowValue3 = await checkAriaNowValue(scrollBar);
    expect(mainNowValue3).toBeGreaterThan(0);
    const mainMaxValue3 = await checkAriaMaxValue(scrollBar);
    expect(mainMaxValue3).toEqual(460);


  });

  test('Synch - Verifty mouse scroll and ', async ({ page }) => {
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
    await expect(page.locator('[data-ui-name="ScrollArea.Bar"]')).toHaveCount(0); // Если удаляется из DOM

  });
});

test.describe('ScrollArea - Horizontal scroll with Shadow and offset', () => {
  test('Verify horizontal scrooll with shadow and offsets ', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/tests/examples/horizontal-scroll-with-shadow-and-offset.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await new Promise((resolve) => setTimeout(resolve, 100));

   
    const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
    await expect(scrollBar).toHaveAttribute('aria-orientation', 'horizontal');

    const slider = page.locator('[data-ui-name="Bar.Slider"]');

  
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

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    const mainNowValue3 = await checkAriaNowValue(scrollBar);
    expect(mainNowValue3).toBeGreaterThan(0);
    const mainMaxValue3 = await checkAriaMaxValue(scrollBar);
    expect(mainMaxValue3).toEqual(460);


  });

  test('Synch - Verifty mouse scroll and ', async ({ page }) => {
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
    await expect(page.locator('[data-ui-name="ScrollArea.Bar"]')).toHaveCount(0); // Если удаляется из DOM

  });
});
