import { PropGetterFn, CProps, ReturnEl } from '@semcore/core';
import Popper, { IPopperContext, IPopperPopperProps, IPopperProps } from '@semcore/popper';
import { Box } from '@semcore/flex-box';

export interface IFeaturePopoverPopperProps extends IPopperPopperProps {
  /**
   * The property responsible for the visibility of the closing icon
   * @default false
   */
  closeIcon?: boolean;
  /** Animation display duration in `ms`
   * @default 200
   */
  duration?: number;
}

export interface IFeaturePopoverContext extends IPopperContext {
  getSpotProps: PropGetterFn;
}

declare const FeaturePopover: ((
  props: CProps<IPopperProps, IFeaturePopoverContext>,
) => ReturnEl) & {
  Trigger: typeof Popper.Trigger;
  Popper: <T>(props: IFeaturePopoverPopperProps & T) => ReturnEl;
  Spot: typeof Box;
};

export default FeaturePopover;
