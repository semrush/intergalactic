import React from 'react';
import type Popper from '@semcore/popper';
import type { PopperProps, PopperTriggerProps } from '@semcore/popper';
import type { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import type { Box, BoxProps } from '@semcore/flex-box';
import type { Context } from './context';
import type { IntergalacticD3Component } from './Plot';

/** @deprecated */
export interface ITooltipChartProps extends TooltipChartProps, UnknownProperties {}
export type TooltipChartProps = PopperProps &
  PopperTriggerProps &
  Context & {
    /** Field name from `data` array item for the XAxis */
    x?: string;
    /** Field name from `data` array item for the YAxis */
    y?: string;
    /** Handle click by trigger has an index - it is an index of the data array. */
    onClick?: (index: number, e: React.SyntheticEvent) => void;
  };

/** @deprecated */
export interface ITooltipChartContext extends TooltipChartContext, UnknownProperties {
  /** Index active value for Axis x */
  xIndex: number | null;
  /** Index active value for Axis y */
  yIndex: number | null;
}
export type TooltipChartContext = {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
};

export type TooltipTypeBase = {
  Trigger: typeof Popper.Trigger;
  Popper: typeof Popper.Popper;
  Title: typeof Box;
  Dot: IntergalacticD3Component<'div', BoxProps & { color?: string }, TooltipChartContext>;
  Footer: typeof Box;
};

export type TooltipType<ChildrenRenderProps = {}, TooltipProps = {}> = (<
  Tag extends Intergalactic.Tag = typeof Box,
>(
  props: Intergalactic.InternalTypings.PropsRenderingResultComponentProps<
    Tag,
    TooltipProps,
    ChildrenRenderProps & TooltipChartContext
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<
    Intergalactic.Tag,
    Intergalactic.Tag,
    TooltipProps
  > &
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
