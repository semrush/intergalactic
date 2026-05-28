import type { PropGetterFn, Intergalactic } from '@semcore/core';

import type { Box, BoxProps } from '../flex-box';

export type ShadowTheme = 'dark' | 'light';

export type ScrollAreaProps = BoxProps & {
  /** Shadow display on container */
  shadow?: boolean;
  /** Scroll direction */
  orientation?: 'horizontal' | 'vertical';
  /** Link to the dom element, which will be a container with overflow */
  container?: React.RefObject<HTMLElement | null>;
  /** Link to the dom element that will be stretched along with the content */
  inner?: React.RefObject<HTMLElement | null>;
  /** Callback executed when container change size  */
  onResize?: ResizeObserverCallback;
  /** Called every time user scrolls area  */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /** Tab index that is being bypassed to the scroll container. */
  tabIndex?: number;
  /**
   * Flag to enable resizing if the parent of ScrollArea is resized
   * @default false
   */
  observeParentSize?: boolean;

  /**
   * Flag to disable autoscroll to focused content.
   * @default false
   */
  disableAutofocusToContent?: boolean;

  /** Top offset for scroll positioning */
  topOffset?: number;
  /** Right offset for scroll positioning */
  rightOffset?: number;
  /** Bottom offset for scroll positioning */
  bottomOffset?: number;
  /** Left offset for scroll positioning */
  leftOffset?: number;

  /**
   * Size for shadows in px.
   * @default 5
   */
  shadowSize?: number | { horizontal: number; vertical: number };
  /**
   * Style for shadows (black or white).
   * @default dark
   */
  shadowTheme?: ShadowTheme | { horizontalTop?: ShadowTheme; horizontalBottom?: ShadowTheme; verticalLeft?: ShadowTheme; verticalRight?: ShadowTheme };
};

export type ScrollAreaDefaultProps = {
  container: React.RefObject<HTMLElement | null>;
  inner: React.RefObject<HTMLElement | null>;
  tabIndex: 0;
  observeParentSize: false;
  disableAutofocusToContent: false;
  shadowSize: 5;
  shadowTheme: 'dark';
};

export type ScrollAreaContext = ScrollAreaProps & {
  getContainerProps: PropGetterFn;
  getBarProps: PropGetterFn;
};

export type ScrollBarProps = BoxProps & {
  /** The direction of the scroll that can be calculated automatically  */
  orientation?: 'horizontal' | 'vertical';
  /** Reference to the scrollable container element */
  container?: React.RefObject<HTMLElement | null>;
};

export type ScrollBarDefaultProps = {
  container: React.RefObject<HTMLElement | null>;
  children: React.JSX.Element;
};

export type ScrollBarContext = ScrollBarProps & {
  getSliderProps: PropGetterFn;
};

export type ScrollAreaContainerProps = BoxProps & {
  /** Inner prop */
  $refInner?: React.RefObject<any>;

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

declare const eventCalculate: Event;

declare const hideScrollBarsFromScreenReadersContext: React.Context<boolean>;

export { eventCalculate, hideScrollBarsFromScreenReadersContext, ScrollBar, ScrollArea };
