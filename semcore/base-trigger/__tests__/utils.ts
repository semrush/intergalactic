import { expect } from '@semcore/testing-utils/playwright';
import type { Page, Locator } from 'playwright';

export const selectOption = async (page: Page): Promise<void> => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await locators.options(page).first().waitFor({ state: 'visible' });
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
};

export const locators = {
  button: (page: Page): Locator => page.getByRole('button'),
  trigger: (page: Page): Locator => page.getByRole('combobox'),
  options: (page: Page, name?: string, index?: number): Locator => {
    const base = page.getByRole('option', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  clearButton: (page: Page): Locator => page.locator(
    'button[data-ui-name="FilterTrigger.ClearButton"]',
  ),
  dialog: (page: Page): Locator => page.getByRole('dialog'),

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
