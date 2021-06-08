import React from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import Popper, { IPopperContext, IPopperProps, IPopperTriggerProps } from '@semcore/popper';

export interface ITooltipProps extends IPopperProps, IPopperTriggerProps {
  /**
   * Text in tooltip
   */
  title?: React.ReactNode;
  /**
   * Tooltip theme, there are several defaulted themes or you can use your own color
   * @default default
   */
  theme?: 'default' | 'warning' | 'invert' | string;
}

export interface ITooltipContext extends IPopperContext {}

declare const Tooltip: ((props: CProps<ITooltipProps, ITooltipContext>) => ReturnEl) & {
  Trigger: typeof Popper.Trigger;
  Popper: typeof Popper.Popper;
};

export default Tooltip;
