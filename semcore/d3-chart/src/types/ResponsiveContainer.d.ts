import { BoxProps } from '@semcore/flex-box';
import { UnknownProperties, Intergalactic } from '@semcore/core';

/** @deprecated */
export interface IResponsiveContainerProps extends ResponsiveContainerProps, UnknownProperties {}
export type ResponsiveContainerProps = BoxProps & {
  /** Relation between height and width dimensions block */
  aspect?: number;
  /** Callback which will be called after changing the block size */
  onResize?: (size: [number, number], entries: ResizeObserverEntry[]) => void;
};

/** @deprecated */
export interface IResponsiveContainerContext
  extends ResponsiveContainerContext,
    UnknownProperties {}
export type ResponsiveContainerContext = {
  width?: number;
  height?: number;
};

declare const ResponsiveContainer: Intergalactic.Component<
  'div',
  ResponsiveContainerProps,
  ResponsiveContainerContext
>;

export default ResponsiveContainer;
