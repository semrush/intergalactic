import 'resize-observer-polyfill';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import { NodeByRef } from '@semcore/utils/lib/ref';

export interface IScrollAreaProps extends IBoxProps {
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
}

export interface IScrollAreaContext extends IScrollAreaProps {
  getContainerProps: PropGetterFn;
  getBarProps: PropGetterFn;
}

export interface IScrollBarProps extends IBoxProps {
  /** The direction of the scroll that can be calculated automatically  */
  orientation?: 'horizontal' | 'vertical';
  /** Link to the dom element, which will be a container with overflow */
  container?: NodeByRef;
}

export interface IScrollBarContext extends IScrollBarProps {
  getSliderProps: PropGetterFn;
}

declare const ScrollBar: (<T>(
  props: CProps<IScrollBarProps & T, IScrollBarContext>,
) => ReturnEl) & {
  Slider: typeof Box;
};

declare const ScrollAreaComponent: (<T>(
  props: CProps<IScrollAreaProps & T, IScrollAreaContext>,
) => ReturnEl) & {
  Container: typeof Box;
  Bar: typeof ScrollBar;
};

declare const eventCalculate: any;

export { eventCalculate };
export default ScrollAreaComponent;
