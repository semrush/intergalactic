import { ComponentProps } from 'react';
import Popper, { IPopperProps, IPopperTriggerProps } from '@semcore/popper';
import { PropGetterFn, ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import { IBoxProps } from '@semcore/flex-box';
import IContext from './context';

export interface ITooltipChartProps extends IPopperProps, IPopperTriggerProps, IContext {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
}

export interface ITooltipChartContext {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
  /** Index active value for Axis x */
  xIndex: number | null;
  /** Index active value for Axis y */
  yIndex: number | null;
}

declare const Tooltip: (<T>(
  props: MapProps<ITooltipChartProps & T, ITooltipChartContext>,
) => ReturnEl) & {
  Trigger: <T>(props: MapProps<ComponentProps<typeof Popper.Trigger> & T>) => ReturnEl;
  Popper: <T>(props: MapProps<ComponentProps<typeof Popper.Popper> & T>) => ReturnEl;
  Title: <T>(props: MapProps<IBoxProps & T>) => ReturnEl;
  Dot: <T>(props: MapProps<IBoxProps & { color?: string } & T>) => ReturnEl;
  Footer: <T>(props: MapProps<T>) => null;
};

export default Tooltip;
