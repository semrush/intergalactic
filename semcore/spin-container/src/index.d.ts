import { PropGetterFn, ReturnEl, CProps } from '@semcore/core';
import { ISpinProps } from '@semcore/spin';
import { Box, IBoxProps } from '@semcore/flex-box';

export interface ISpinContainerProps extends IBoxProps, ISpinProps {
  /**
   * Color of container spinner; you can use your own color
   */
  background?: string;
  /** Duration of animation displaying in ms
   * @default 200
   */
  duration?: number;
  /**
   * Property responsible for displaying the spinner
   * */
  loading?: boolean;
}

export interface ISpinContainerContext {
  getOverlayProps: PropGetterFn;
}

export interface ISpinContainerOverlayProps extends IBoxProps {
  /**
   * Css background; you can use your own color
   */
  background?: string;
}

declare const SpinContainer: (<T>(
  props: CProps<ISpinContainerProps & T, ISpinContainerContext>,
) => ReturnEl) & {
  Content: typeof Box;
  Overlay: <T>(props: ISpinContainerOverlayProps & T) => ReturnEl;
};

export default SpinContainer;
