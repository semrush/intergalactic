import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import { NodeByRef } from '@semcore/utils/lib/ref';

/** @deprecated */
export interface IScrollAreaProps extends ScrollAreaProps, UnknownProperties {}
export type ScrollAreaProps = BoxProps & {
  /** Shadow display on container */
  shadow?: boolean;
  /** Scroll direction */
  orientation?: 'horizontal' | 'vertical';
  /** Link to the dom element, which will be a container with overflow */
  container?: NodeByRef;
  /** Link to the dom element that will be stretched along with the content */
  inner?: NodeByRef;
  /** Callback executed when container change size  */
  onResize?: ResizeObserverCallback;
  /** Called every time user scrolls area  */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /** Tab index that is being bypassed to the scroll container. */
  tabIndex?: number | null;

  topOffset?: number;
  rightOffset?: number;
  bottomOffset?: number;
  leftOffset?: number;
};

/** @deprecated */
export interface IScrollAreaContext extends ScrollAreaContext, UnknownProperties {}
export type ScrollAreaContext = ScrollAreaProps & {
  getContainerProps: PropGetterFn;
  getBarProps: PropGetterFn;
};

/** @deprecated */
export interface IScrollBarProps extends ScrollBarProps, UnknownProperties {}
export type ScrollBarProps = BoxProps & {
  /** The direction of the scroll that can be calculated automatically  */
  orientation?: 'horizontal' | 'vertical';
  /** Link to the dom element, which will be a container with overflow */
  container?: NodeByRef;
};

/** @deprecated */
export interface IScrollBarContext extends ScrollBarContext, UnknownProperties {}
export type ScrollBarContext = ScrollBarProps & {
  getSliderProps: PropGetterFn;
};

declare const ScrollBar: Intergalactic.Component<'div', ScrollBarProps, ScrollBarContext> & {
  Slider: typeof Box;
};

declare const ScrollArea: Intergalactic.Component<'div', ScrollAreaProps, ScrollAreaContext> & {
  Container: typeof Box;
  Bar: typeof ScrollBar;
};

declare const eventCalculate: any;

export { eventCalculate };
export default ScrollArea;
