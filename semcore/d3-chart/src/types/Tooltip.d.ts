import Popper, { PopperProps, PopperTriggerProps } from '@semcore/popper';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import { Context } from './context';

/** @deprecated */
export interface ITooltipChartProps extends TooltipChartProps, UnknownProperties {}
export type TooltipChartProps = PopperProps &
  PopperTriggerProps &
  Context & {
    /** Field name from `data` array item for the XAxis */
    x?: string;
    /** Field name from `data` array item for the YAxis */
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

// declare const Tooltip: Intergalactic.Component<'div', TooltipChartProps, TooltipChartContext> & {
//   Trigger: Popper.Trigger;
//   Popper: typeof Popper.Popper;
//   Title: typeof Box;
//   Dot: Intergalactic.Component<'div', BoxProps & { color?: string }, TooltipChartContext>;
//   Footer: typeof Box;
export type TooltipTypeBase = {
  Trigger: <T>(props: MapProps<ComponentProps<typeof Popper.Trigger> & T>) => ReturnEl;
  Popper: <T>(props: MapProps<ComponentProps<typeof Popper.Popper> & T>) => ReturnEl;
  Title: <T>(props: MapProps<IBoxProps & T>) => ReturnEl;
  Dot: <T>(props: MapProps<IBoxProps & { color?: string } & T>) => ReturnEl;
  Footer: <T>(props: MapProps<IBoxProps & T>) => ReturnEl;
  Tooltip: TooltipType<IScatterPlotProps & { xIndex: number }>;
};

export type TooltipType<ChildrenRenderProps = {}, TooltipProps = {}> = (<T = ChildrenRenderProps>(
  props: {
    children: (props: ITooltipChartProps & T) => { children: ReturnEl };
  } & IBoxProps &
    TooltipProps,
) => ReturnEl) &
  TooltipTypeBase;

/**
 * @deprecated Consider migration to better typed Bubble.Tooltip, HoverLine.Tooltip,
 * HoverRect.Tooltip, Donut.Tooltip, Radar.Tooltip,
 * ScatterPlot.Tooltip or Venn.Tooltip.
 *
 * Migration examples:
 * 1. `<Tooltip tag={HoverLine}>...</Tooltip>` => `<HoverLine.Tooltip>...</HoverLine.Tooltip>`
 * 2. `<Tooltip tag={HoverRect}>...</Tooltip>` => `<HoverRect.Tooltip>...</HoverRect.Tooltip>`
 * 3. `<Tooltip tag={Radar.Hover}>...</Tooltip>` => `<Radar.Tooltip>...</Radar.Tooltip>`
 * 4. `<Tooltip>...</Tooltip>` => `<Bubble.Tooltip>...</Bubble.Tooltip>`
 * 5. `<Tooltip>...</Tooltip>` => `<Donut.Tooltip>...</Donut.Tooltip>`
 * 6. `<Tooltip>...</Tooltip>` => `<ScatterPlot.Tooltip>...</ScatterPlot.Tooltip>`
 * 7. `<Tooltip>...</Tooltip>` => `<Venn.Tooltip>...</Venn.Tooltip>`
 */
declare const Tooltip: TooltipType;

export default Tooltip;
