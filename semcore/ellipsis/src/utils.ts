export const setFontSettings = (element: HTMLElement, styleElement: CSSStyleDeclaration): void => {
  element.style.fontFamily = styleElement.getPropertyValue('font-family');
  element.style.fontSize = styleElement.getPropertyValue('font-size');
  element.style.fontWeight = styleElement.getPropertyValue('font-weight');
  element.style.lineHeight = styleElement.getPropertyValue('line-height');
  element.style.fontFeatureSettings =
    styleElement.getPropertyValue('font-feature-settings');
  element.style.fontVariantNumeric = styleElement.getPropertyValue('font-variant-numeric');
};

export function isTextOverflowing(element: HTMLElement | null, multiline: boolean, text: string): boolean {
  if (!element) return false;

  element.textContent = text;

  const { height: currentHeight, width: currentWidth } = element.getBoundingClientRect();
  const measuringElement = createMeasurerElement(element, text);
  let isOverflowing = false;

  document.body.appendChild(measuringElement);
  if (multiline) {
    measuringElement.style.width = `${currentWidth}px`;

    const width = measuringElement.scrollWidth;
    const height = measuringElement.getBoundingClientRect().height;

    if (Math.ceil(currentHeight) < height || Math.ceil(currentWidth) < width) {
      isOverflowing = true;
    }
  } else {
    measuringElement.style.whiteSpace = 'nowrap';
    isOverflowing = Math.ceil(currentWidth) < measuringElement.getBoundingClientRect().width;
  }

  document.body.removeChild(measuringElement);

  return isOverflowing;
}

export function truncateMiddleToFit(text: string, containerWidth: number, font: string): { text: string; positions: [number, number] } {
  let left = 0;
  let right = text.length;
  let truncated = text;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const keep = Math.max(1, Math.floor((mid - 3) / 2));
    const testText = text.slice(0, keep) + '...' + text.slice(-keep);
    const testWidth = getTextWidth(testText, font);

    if (testWidth >= containerWidth) {
      right = mid;
    } else {
      truncated = testText;
      left = mid + 1;
    }
  }

  return {
    text: truncated,
    positions: [left, right],
  };
}

function getTextWidth(text: string, font: string) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  context.font = font;
  return context.measureText(text).width;
}

function createMeasurerElement(element: HTMLElement, text?: string) {
  const styleElement = window.getComputedStyle(element, null);
  const temporaryElement = document.createElement('temporary-block');
  temporaryElement.style.display = styleElement.getPropertyValue('display');
  temporaryElement.style.padding = styleElement.getPropertyValue('padding');
  temporaryElement.style.position = 'absolute';
  temporaryElement.style.right = '0%';
  temporaryElement.style.bottom = '0%';
  temporaryElement.style.visibility = 'hidden';
  temporaryElement.style.whiteSpace = styleElement.getPropertyValue('white-space');
  temporaryElement.style.wordWrap = styleElement.getPropertyValue('word-wrap');

  setFontSettings(temporaryElement, styleElement);

  temporaryElement.textContent = text ?? element.textContent;
  return temporaryElement;
}
