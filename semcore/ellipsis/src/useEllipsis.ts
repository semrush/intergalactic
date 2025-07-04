import React from 'react';

import { useResizeObserver } from './useResizeObserver';

type EllipsisSettings = {
  trim?: 'end' | 'middle';
  maxLine?: number;
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
  temporaryElement.style.fontFamily = styleElement.getPropertyValue('font-family');
  temporaryElement.style.fontSize = styleElement.getPropertyValue('font-size');
  temporaryElement.style.fontWeight = styleElement.getPropertyValue('font-weight');
  temporaryElement.style.lineHeight = styleElement.getPropertyValue('line-height');
  temporaryElement.style.whiteSpace = styleElement.getPropertyValue('white-space');
  temporaryElement.style.wordWrap = styleElement.getPropertyValue('word-wrap');

  temporaryElement.style.fontFeatureSettings =
    styleElement.getPropertyValue('font-feature-settings');
  temporaryElement.style.fontVariantNumeric = styleElement.getPropertyValue('font-variant-numeric');

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
  const [hasTooltip, setHasTooltip] = React.useState(false);

  const maxLine = props === false ? undefined : (props.maxLine ?? 1);
  const trim = props === false ? undefined : (props.trim ?? 'end');

  React.useEffect(() => {
    if (!ref.current) return;
    if (trim === undefined || maxLine === undefined) {
      setHasTooltip(false);
      return;
    };
    ref.current.style.setProperty('overflow', 'hidden');
    ref.current.style.setProperty('white-space', 'pre');
    ref.current.style.setProperty('display', 'inherit');
    ref.current.style.setProperty('width', '100%');

    const showTooltip = isTextOverflowing(ref.current, maxLine > 1);
    setHasTooltip(showTooltip);
  }, [ref.current, trim, maxLine]);

  const blockWidth = useResizeObserver(ref, hasTooltip ? undefined : { width: 0 }).width;

  React.useEffect(() => {
    if (!ref.current || !hasTooltip) return;
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
      const text = ref.current.textContent ?? '';

      const begining = text.substring(0, text.length - displayedSymbols / 2 - 1);
      const tail = text.substring(text.length - displayedSymbols / 2 - 1);

      ref.current.innerHTML = `<span style="overflow: hidden; text-overflow: ellipsis">${begining}</span><span>${tail}</span>`;
    }
  }, [ref.current, trim, maxLine, hasTooltip, blockWidth]);

  return hasTooltip;
}
