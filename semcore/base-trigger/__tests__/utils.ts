import type { Page } from 'playwright';
import { expect, test } from '@semcore/testing-utils/playwright';


export const selectOption = async (page: Page): Promise<void> => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.waitForSelector('[data-ui-name="Select.Menu"]');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
};

export async function checkBackgroundColor(page: any, selector:any, expectedColor:any) {
  const element = await page.locator(selector);
  const backgroundColor = await element.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(backgroundColor).toBe(expectedColor);
}

export async function checkBorderColor(page, selector, expectedColor) {
  const element = await page.locator(selector);
  const borderColor = await element.evaluate((el) => getComputedStyle(el).borderColor);
  expect(borderColor).toBe(expectedColor);
}
