import { expect } from '@semcore/testing-utils/playwright';
import type { Page, Locator } from 'playwright';

export const selectOption = async (page: Page): Promise<void> => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.waitForSelector('[data-ui-name="Select.Menu"]');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
};

export async function checkBackgroundColor(page: any, selectorOrLocator: string | Locator, expectedColor: string) {
  const element = typeof selectorOrLocator === 'string'
    ? page.locator(selectorOrLocator)
    : selectorOrLocator;

  const backgroundColor = await element.evaluate(
    (el: HTMLElement) => getComputedStyle(el).backgroundColor,
  );

  expect(backgroundColor).toBe(expectedColor);
}

export async function checkBorderColor(page: any, selectorOrLocator: string | Locator, expectedColor: string) {
  const element = typeof selectorOrLocator === 'string'
    ? page.locator(selectorOrLocator)
    : selectorOrLocator;

  const borderColor = await element.evaluate(
    (el: HTMLElement) => getComputedStyle(el).borderColor,
  );

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
