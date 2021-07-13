import { IBoxProps } from '@semcore/flex-box';
import { CProps, ReturnEl } from '@semcore/core';

export interface IResponsiveContainerProps extends IBoxProps {
  /** Relation between height and width dimensions block */
  aspect?: number;
  /** Callback which will be called after changing the block size */
  onResize?: (size: [number, number], entries: ResizeObserverEntry[]) => void;
}

export interface IResponsiveContainerContext {
  width?: number;
  height?: number;
}

declare const ResponsiveContainer: <T>(
  props: CProps<IResponsiveContainerProps & T, IResponsiveContainerContext>,
) => ReturnEl;

export default ResponsiveContainer;
