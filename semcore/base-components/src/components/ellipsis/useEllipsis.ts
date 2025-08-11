import React from 'react';

import { useResizeObserver } from './useResizeObserver';
import {
  isTextOverflowing,
  truncateMiddleToFit,
} from './utils';

export type EllipsisSettings = {
  /**
   * Trimming type
   * @default end
   */
  trim?: 'end' | 'middle';
  /**
   * Lines count in multiline Ellipsis.
   * Applies only for `trim = end`
   * @default 1
   */
  maxLine?: number;
};

export function useEllipsis(ref: React.RefObject<HTMLElement>, props: EllipsisSettings | false): boolean {
  const [textContent, setTextContent] = React.useState('');
  const [isEllipsized, setIsEllipsized] = React.useState(false);

  const maxLine = props === false ? undefined : (props.maxLine ?? 1);
  const trim = props === false ? undefined : (props.trim ?? 'end');
  const blockWidth = useResizeObserver(ref).width;

  React.useEffect(() => {
    setTextContent(ref.current?.textContent ?? '');
  }, [ref.current]);

  React.useEffect(() => {
    if (!ref.current) return;
    if (trim === undefined || maxLine === undefined) {
      setIsEllipsized(false);
      return;
    };
    ref.current.style.setProperty('overflow', 'hidden');
    ref.current.style.setProperty('text-overflow', 'hidden');
    ref.current.style.setProperty('white-space', 'pre');

    const isEllipsized = isTextOverflowing(ref.current, maxLine > 1, textContent);
    setIsEllipsized(isEllipsized);
  }, [ref.current, trim, maxLine, blockWidth, textContent]);

  React.useEffect(() => {
    if (!ref.current || !isEllipsized) return;
    if (trim === undefined || maxLine === undefined) {
      return;
    }

    if (trim === 'end') {
      ref.current.style.setProperty('display', 'inline-block');
      ref.current.style.setProperty('text-overflow', 'ellipsis');
      ref.current.textContent = textContent;

      if (maxLine > 1) {
        ref.current.style.setProperty('display', '-webkit-box');
        ref.current.style.setProperty('-webkit-line-clamp', maxLine.toString());
        ref.current.style.setProperty('-webkit-box-orient', 'vertical');
        ref.current.style.setProperty('white-space', 'normal');
        ref.current.style.setProperty('overflow-wrap', 'break-word');
      }
    }

    if (trim === 'middle') {
      ref.current.style.setProperty('display', 'flex');

      const styleElement = window.getComputedStyle(ref.current);
      const font = `${styleElement.fontWeight} ${styleElement.fontSize} ${styleElement.fontFamily}`;

      ref.current.textContent = truncateMiddleToFit(textContent, ref.current, font);
    }
  }, [ref.current, trim, maxLine, isEllipsized, blockWidth, textContent]);

  return isEllipsized;
}
