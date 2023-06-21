import { PropGetterFn } from '@semcore/core';
import Popper, { PopperContext, PopperPopperProps, PopperProps } from '@semcore/popper';
import { Box } from '@semcore/flex-box';

/** @deprecated */
export interface IFeaturePopoverPopperProps extends FeaturePopoverPopperProps, UnknownProperties {}
export type FeaturePopoverPopperProps = PopperPopperProps & {
  /**
   * The property responsible for the visibility of the closing icon
   * @default false
   */
  closeIcon?: boolean;
  /** Animation display duration in `ms`
   * @default 200
   */
  duration?: number;

  locale?: string;
};

/** @deprecated */
export interface IFeaturePopoverContext extends FeaturePopoverContext, UnknownProperties {}
export type FeaturePopoverContext = PopperContext & {
  getSpotProps: PropGetterFn;
};

declare const FeaturePopover: Intergalactic.Component<'div', PopperProps, FeaturePopoverContext> & {
  Trigger: typeof Popper.Trigger;
  Popper: Intergalactic.Component<'div', FeaturePopoverPopperProps>;
  Spot: typeof Box;
};

export default FeaturePopover;
