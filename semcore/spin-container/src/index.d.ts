import { PropGetterFn, ReturnEl, CProps } from '@semcore/core';
import { ISpinProps } from '@semcore/spin';
import { IBoxProps } from '@semcore/flex-box';
import { IFadeInOutProps } from '@semcore/animation';

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

export interface ISpinOverlayProps extends IBoxProps, IFadeInOutProps {}

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
  Content: <T>(props: CProps<ISpinOverlayProps> & T) => ReturnEl;
  Overlay: <T>(props: ISpinContainerOverlayProps & T) => ReturnEl;
};

export default SpinContainer;
