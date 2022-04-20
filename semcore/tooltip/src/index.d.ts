import React from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import Popper, { IPopperContext, IPopperProps, IPopperTriggerProps } from '@semcore/popper';

export interface ITooltipProps extends IPopperProps, IPopperTriggerProps {
  /**
   * Tooltip text
   */
  title?: React.ReactNode;
  /**
   * Tooltip theme. You can use the default themes or create your own
   * @default default
   */
  theme?: 'default' | 'warning' | 'invert';
}

export interface ITooltipContext extends IPopperContext {}

declare const Tooltip: ((props: CProps<ITooltipProps, ITooltipContext>) => ReturnEl) & {
  Trigger: typeof Popper.Trigger;
  Popper: typeof Popper.Popper;
};

export default Tooltip;
