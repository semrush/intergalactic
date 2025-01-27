import type { UnknownProperties, Intergalactic } from '@semcore/core';
import type { RefObject } from 'react';
import type { Box, BoxProps } from '@semcore/flex-box';
import type Tooltip from '@semcore/tooltip';
import type { TooltipProps } from '@semcore/tooltip';

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

declare const Ellipsis: Intergalactic.Component<'div', EllipsisProps> & {
  Content: typeof Box;
  Popper: typeof Tooltip.Popper;
};

export { useResizeObserver };
export default Ellipsis;
