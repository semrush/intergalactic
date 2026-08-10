import type { NSBox } from '@semcore/base-components';
import type { UnknownProperties, Intergalactic } from '@semcore/core';
import type { TooltipProps } from '@semcore/tooltip';
import type Tooltip from '@semcore/tooltip';
import type { RefObject } from 'react';

export type EllipsisProps = NSBox.Props &
  Partial<TooltipProps> & {
    /**
     * Rows count in multiline Ellipsis.
     * Applies only for `trim = end`
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
/**
 * @deprecated. Use Text with ellipsis property for @semcore/typography.
 */
declare const Ellipsis: Intergalactic.Component<'div', EllipsisProps> & {
  Content: NSBox.Component;
  Popper: typeof Tooltip.Popper;
};

export default Ellipsis;

export { useResizeObserver };
