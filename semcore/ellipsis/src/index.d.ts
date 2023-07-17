import { UnknownProperties, Intergalactic } from '@semcore/core';
import { RefObject } from 'react';
import { BoxProps } from '@semcore/flex-box';
import { TooltipProps } from '@semcore/tooltip';

/** @deprecated */
export interface IEllipsisProps extends EllipsisProps, UnknownProperties {}
export type EllipsisProps = BoxProps &
  Partial<TooltipProps> & {
    /**
     * Rows count in multiline Ellipsis
     * @default 1
     */
    maxLine?: number;
    /**
     * Trimming type
     * @default end
     */
    trim?: 'end' | 'middle';
    /**
     * Show tooltip
     * @default true
     */
    tooltip?: boolean;
    /**
     * Ref to the item that will be observed by ResizeObserver
     */
    // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
    containerRef?: RefObject<HTMLElement | null>;
    /**
     * Explicit sizes of container text should be trimmed in
     **/
    containerRect?: { width: number };
    /** List of props that will be passed to tooltip
     * @default ['title', 'theme', 'strategy', 'modifiers', 'placement', 'interaction', 'timeout', 'visible', 'defaultVisible', 'onVisibleChange', 'offset', 'preventOverflow', 'arrow', 'flip', 'computeStyles', 'eventListeners', 'onFirstUpdate']
     */
    includeTooltipProps?: string[];
  };

declare const useResizeObserver: (
  ref: RefObject<HTMLElement>,
  hookOverride?: { width: number },
) => { width: number };

declare const Ellipsis: Intergalactic.Component<'div', EllipsisProps>;

export { useResizeObserver };
export default Ellipsis;
