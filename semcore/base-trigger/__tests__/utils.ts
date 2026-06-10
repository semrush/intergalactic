import { expect } from '@semcore/testing-utils/playwright';
import type { Page, Locator } from '@semcore/testing-utils/playwright';

export const selectOption = async (page: Page): Promise<void> => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await locators.options(page).first().waitFor({ state: 'visible' });
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await locators.options(page).first().waitFor({ state: 'hidden' });
};

export const locators = {
  button: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  trigger: (page: Page): Locator => page.getByRole('combobox'),
  options: (page: Page, name?: string, index?: number): Locator => {
    const base = page.getByRole('option', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  clearButton: (page: Page): Locator => page.locator(
    'button[data-ui-name="FilterTrigger.ClearButton"]',
  ),
  dialog: (page: Page): Locator => page.getByRole('dialog'),
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
};

// Hint can stay mounted while fading out, so wait for a fully opaque instance.
export const waitForHint = async (page: Page): Promise<void> => {
  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll('[data-ui-name="Hint"]')).some(
      (el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && getComputedStyle(el).opacity === '1';
      },
    );
  });
};

export const expectVisibleHintsCount = async (page: Page, count: number): Promise<void> => {
  await expect.poll(async () => {
    return locators.hint(page).evaluateAll((hints) => {
      return hints.filter((hint) => getComputedStyle(hint).opacity === '1').length;
    });
  }).toBe(count);
};

// Matches the CSS fallback colors after the test bundle normalizes them.
const cssVarColorFallbacks: Record<string, string> = {
  '--intergalactic-bg-primary-neutral': 'rgb(255, 255, 255)',
  '--intergalactic-border-primary': 'rgba(0, 12, 8, 0.161)',
  '--intergalactic-border-info-active': 'rgb(135, 150, 239)',
  '--intergalactic-border-success-active': 'rgb(0, 185, 145)',
  '--intergalactic-border-critical-active': 'rgb(255, 99, 100)',
};

export const getCssVarColor = async (page: Page, varName: string) => {
  return page.evaluate(({ name, fallback }) => {
    const probe = document.createElement('div');
    probe.style.background = fallback ? `var(${name}, ${fallback})` : `var(${name})`;
    document.body.appendChild(probe);
    const color = window.getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  }, { name: varName, fallback: cssVarColorFallbacks[varName] });
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
