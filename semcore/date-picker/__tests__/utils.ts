export const RealDate = global.Date;
import { expect } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';

// https://github.com/facebook/jest/issues/2234#issuecomment-384884729
export function mockDate(isoDate: any) {
  (global as any).Date = class extends RealDate {
    constructor(...theArgs: any[]) {
      super();
      if (theArgs.length) {
        return new (RealDate as any)(...theArgs);
      }
      return new RealDate(isoDate);
    }

    static now() {
      return new RealDate(isoDate).getTime();
    }
  };
}

export function formatAriaLabelToInputValue(ariaLabel: string | null): string {
  if (!ariaLabel) {
    throw new Error('aria-label is null');
  }

  let parsedDate = new Date(ariaLabel);
  let hasDay = true;

  if (isNaN(parsedDate.getTime())) {
    parsedDate = new Date(`${ariaLabel} 1`);
    hasDay = false;
  }

  if (isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid aria-label date: ${ariaLabel}`);
  }

  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const year = parsedDate.getFullYear().toString();

  return hasDay ? `${month}/${day}/${year}` : `${month}/${year}`;
}

export const checkStyle = async (element: any, expectedStyles: Record<string, string>) => {
  for (const [property, expectedValue] of Object.entries(expectedStyles)) {
    const actualValue = await element.evaluate(
      (el: any, property: any) => getComputedStyle(el)[property],
      property,
    );
    expect(actualValue).toBe(expectedValue);
  }
};

type ColorProperty = 'backgroundColor' | 'borderColor' | 'color';

// Matches the CSS fallback colors after the test bundle normalizes them.
const cssVarColorFallbacks: Record<string, string> = {
  '--intergalactic-control-primary-info': 'rgb(26, 30, 26)',
  '--intergalactic-date-picker-cell': 'rgb(255, 255, 255)',
  '--intergalactic-date-picker-cell-active': 'rgb(118, 128, 231)',
  '--intergalactic-text-primary': 'rgba(1, 5, 0, 0.899)',
  '--intergalactic-text-primary-invert': 'rgba(254, 255, 255, 0.949)',
};

export const getCssVarColor = async (
  page: Page,
  varName: string,
  property: ColorProperty = 'backgroundColor',
) => {
  return page.evaluate(({ name, property, fallback }) => {
    const probe = document.createElement('div');
    probe.style[property] = fallback ? `var(${name}, ${fallback})` : `var(${name})`;
    document.body.appendChild(probe);
    const color = window.getComputedStyle(probe)[property];
    probe.remove();
    return color;
  }, { name: varName, property, fallback: cssVarColorFallbacks[varName] });
};

export const getCalendarCellDefaultStyles = async (page: Page) => ({
  color: await getCssVarColor(page, '--intergalactic-text-primary', 'color'),
  backgroundColor: await getCssVarColor(page, '--intergalactic-date-picker-cell'),
});

export const getCalendarCellSelectedStyles = async (page: Page) => ({
  color: await getCssVarColor(page, '--intergalactic-text-primary-invert', 'color'),
  backgroundColor: await getCssVarColor(page, '--intergalactic-date-picker-cell-active'),
});

export const getPrimaryButtonStyles = async (page: Page) => ({
  color: await getCssVarColor(page, '--intergalactic-text-primary-invert', 'color'),
  backgroundColor: await getCssVarColor(page, '--intergalactic-control-primary-info'),
});
