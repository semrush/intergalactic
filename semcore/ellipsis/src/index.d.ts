import { CProps } from '@semcore/core';
import { RefObject } from 'react';

export interface IEllipsisProps {
  /**
   * Row count in multiline Ellipsis
   * @default 1
   */
  maxline?: number;
  /**
   * Trimming type
   * @default right
   */
  trim?: 'end' | 'middle';
  /**
   * Shows tooltip
   * @default visible
   */
  tooltip?: string;
  /**
   * ref to the item that will be observed by ResizeObserver
   */
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  containerRef?: RefObject<HTMLElement | null>;
  /**
   * Subscribes elements to ResizeObserver
   */
  resizeObserver?: { width: number };
}

declare const useResizeObserver: (
  ref: RefObject<HTMLElement>,
  hookOverride?: { width: number },
) => { width: number };

declare const Ellipsis: <T>(props: CProps<IEllipsisProps & T>) => ReturnEl;

export { useResizeObserver };
export default Ellipsis;
