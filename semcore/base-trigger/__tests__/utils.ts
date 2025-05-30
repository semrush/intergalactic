import type { Page } from 'playwright';
import { expect } from '@semcore/testing-utils/playwright';

export const selectOption = async (page: Page): Promise<void> => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.waitForSelector('[data-ui-name="Select.Menu"]');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
};

export async function checkBackgroundColor(page: any, selector: any, expectedColor: any) {
  const element = await page.locator(selector);
  const backgroundColor = await element.evaluate((el: any) => getComputedStyle(el).backgroundColor);
  expect(backgroundColor).toBe(expectedColor);
}

export async function checkBorderColor(page: any, selector: any, expectedColor: any) {
  const element = await page.locator(selector);
  const borderColor = await element.evaluate((el: any) => getComputedStyle(el).borderColor);
  expect(borderColor).toBe(expectedColor);
}

export async function checkKeyboardNavigation(page: any, elementsSelector: any) {
  const elements = page.locator(elementsSelector);
  const count = await elements.count();

  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    const isDisabled = (await element.getAttribute('disabled')) !== null;
    if (isDisabled) {
      await expect(element).not.toBeFocused({ timeout: 5000 });
    } else {
      await page.keyboard.press('Tab');
      await expect(elements.nth(i)).toBeFocused({ timeout: 5000 });
    }
  }
}
