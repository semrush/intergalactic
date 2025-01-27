import type { Intergalactic, PropGetterFn, UnknownProperties } from '@semcore/core';
import type Popper from '@semcore/popper';
import type { PopperContext, PopperPopperProps, PopperProps } from '@semcore/popper';
import type { Box } from '@semcore/flex-box';

/**
 * Popper must have an accessible names (aria-group-name).
 */
type AriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  title?: string;
}>;

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
  Popper: Intergalactic.Component<'div', FeaturePopoverPopperProps & AriaProps>;
  Spot: typeof Box;
};

export default FeaturePopover;
