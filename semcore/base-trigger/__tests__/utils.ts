import type { Page } from 'playwright';

export const selectOption = async (page: Page): Promise<void> => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.waitForSelector('[data-ui-name="Select.Menu"]');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
};
