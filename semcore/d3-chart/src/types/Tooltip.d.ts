import Popper, { PopperProps, PopperTriggerProps } from '@semcore/popper';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import { Context } from './context';

/** @deprecated */
export interface ITooltipChartProps extends TooltipChartProps, UnknownProperties {}
export type TooltipChartProps = PopperProps &
  PopperTriggerProps &
  Context & {
    /** Field from data for XAxis */
    x?: string;
    /** Field from data for YAxis */
    y?: string;
  };

/** @deprecated */
export interface ITooltipChartContext extends TooltipChartContext, UnknownProperties {}
export type TooltipChartContext = {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  /** Index active value for Axis x */
  xIndex: number | null;
  /** Index active value for Axis y */
  yIndex: number | null;
};

declare const Tooltip: Intergalactic.Component<'div', TooltipChartProps, TooltipChartContext> & {
  Trigger: Popper.Trigger;
  Popper: typeof Popper.Popper;
  Title: typeof Box;
  Dot: Intergalactic.Component<'div', BoxProps & { color?: string }, TooltipChartContext>;
  Footer: typeof Box;
};

export default Tooltip;
