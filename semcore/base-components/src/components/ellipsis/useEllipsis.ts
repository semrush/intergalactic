import React from 'react';

import { useResizeObserver } from './useResizeObserver';

export type EllipsisSettings = {
  /**
   * Trimming type
   * @default end
   */
  trim?: 'end' | 'middle';
  /**
   * Rows count in multiline Ellipsis
   * Acceptable only for `trim = end`
   * @default 1
   */
  maxLine?: number;
};

export const setFontSettings = (element: HTMLElement, styleElement: CSSStyleDeclaration): void => {
  element.style.fontFamily = styleElement.getPropertyValue('font-family');
  element.style.fontSize = styleElement.getPropertyValue('font-size');
  element.style.fontWeight = styleElement.getPropertyValue('font-weight');
  element.style.lineHeight = styleElement.getPropertyValue('line-height');
  element.style.fontFeatureSettings =
    styleElement.getPropertyValue('font-feature-settings');
  element.style.fontVariantNumeric = styleElement.getPropertyValue('font-variant-numeric');
};

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

  temporaryElement.innerHTML = text ?? element.innerHTML;
  return temporaryElement;
}

export function isTextOverflowing(element: HTMLElement | null, multiline: boolean, text?: string): boolean {
  if (!element) return false;

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

export function useEllipsis(ref: React.RefObject<HTMLElement>, props: EllipsisSettings | false): boolean {
  const [isEllipsized, setIsEllipsized] = React.useState(false);

  const maxLine = props === false ? undefined : (props.maxLine ?? 1);
  const trim = props === false ? undefined : (props.trim ?? 'end');

  React.useEffect(() => {
    if (!ref.current) return;
    if (trim === undefined || maxLine === undefined) {
      setIsEllipsized(false);
      return;
    };
    ref.current.style.setProperty('overflow', 'hidden');
    ref.current.style.setProperty('text-overflow', 'hidden');
    ref.current.style.setProperty('white-space', 'pre');

    const isEllipsized = isTextOverflowing(ref.current, maxLine > 1);
    setIsEllipsized(isEllipsized);
  }, [ref.current, trim, maxLine]);

  const blockWidth = useResizeObserver(ref, isEllipsized ? undefined : { width: 0 }).width;

  React.useEffect(() => {
    if (!ref.current || !isEllipsized) return;
    if (trim === undefined || maxLine === undefined) {
      return;
    }

    if (trim === 'end') {
      ref.current.style.setProperty('text-overflow', 'ellipsis');
    }

    if (trim === 'middle') {
      ref.current.style.setProperty('display', 'flex');

      const styleElement = window.getComputedStyle(ref.current);
      const dateSpan = document.createElement('temporary-block');
      dateSpan.style.setProperty('font-size', styleElement.getPropertyValue('font-size'));
      dateSpan.innerHTML = 'a';
      document.body.appendChild(dateSpan);
      const symbolWidth = dateSpan.getBoundingClientRect().width;
      dateSpan.remove();

      const displayedSymbols = Math.round(blockWidth / symbolWidth);
      const evenDisplayedSymbols = displayedSymbols % 2 === 0 ? displayedSymbols : displayedSymbols - 1;

      const text = ref.current.textContent ?? '';

      const begining = text.substring(0, text.length - evenDisplayedSymbols / 2 - 1);
      const tail = text.substring(text.length - evenDisplayedSymbols / 2 - 1);

      ref.current.innerHTML = `<span style="overflow: hidden; text-overflow: ellipsis">${begining}</span><span>${tail}</span>`;
    }
  }, [ref.current, trim, maxLine, isEllipsized, blockWidth]);

  return isEllipsized;
}
