import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { Box, BoxProps } from '@semcore/flex-box';
import type { NodeByRef } from '@semcore/utils/lib/ref';

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

  /**
   * Flag to enable resizing if the parent of ScrollArea is resized
   * @default false
   */
  observeParentSize?: boolean;

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

export type ScrollAreaContainerProps = BoxProps & {
  focusRingTopOffset?: string;
  focusRingRightOffset?: string;
  focusRingBottomOffset?: string;
  focusRingLeftOffset?: string;
};

declare const ScrollBar: Intergalactic.Component<'div', ScrollBarProps, ScrollBarContext> & {
  Slider: typeof Box;
};

declare const ScrollArea: Intergalactic.Component<'div', ScrollAreaProps, ScrollAreaContext> & {
  Container: Intergalactic.Component<'div', ScrollAreaContainerProps>;
  Bar: typeof ScrollBar;
};

declare const eventCalculate: any;

declare const hideScrollBarsFromScreenReadersContext: React.Context<boolean>;

export { eventCalculate, hideScrollBarsFromScreenReadersContext };
export default ScrollArea;
