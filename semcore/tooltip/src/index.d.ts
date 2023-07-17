import React from 'react';
import { Intergalactic, UnknownProperties } from '@semcore/core';
import Popper, { PopperContext, PopperProps, PopperTriggerProps } from '@semcore/popper';

/** @deprecated */
export interface ITooltipProps extends TooltipProps, UnknownProperties {}
export type TooltipProps = PopperProps &
  PopperTriggerProps & {
    /**
     * Tooltip text
     */
    title?: React.ReactNode;
    /**
     * Tooltip theme. You can use the default themes or create your own
     * @default default
     */
    theme?: 'default' | 'warning' | 'invert';
  };

/** @deprecated */
export interface ITooltipContext extends TooltipContext, UnknownProperties {}
export type TooltipContext = PopperContext & {};

declare const Tooltip: Intergalactic.Component<'div', TooltipProps, TooltipContext> & {
  Trigger: typeof Popper.Trigger;
  Popper: Intergalactic.Component<'div', TooltipProps, TooltipContext>;
};

export default Tooltip;
