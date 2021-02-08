import React, { ComponentProps } from 'react';
import { Stack, Line } from 'd3-shape';
import { PropGetterFn, CProps, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import Popper, { IPopperProps, IPopperTriggerProps } from '@semcore/popper';

interface ContextRoot {
  /** Data for graphic */
  data?: any[];
  /** Scale for svg element */
  scale?: any[];
  /** @ignore */
  eventEmitter?: EventEmitter;
  /** @ignore */
  rootRef?: React.createRef<SVGElement>;
}

interface IAxisProps extends ContextRoot {
  /** Element hide property */
  hide?: boolean;
  /** Values to ticks axis */
  ticks?: any[];
  indexScale?: 0 | 1;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export interface IXAxisProps extends IAxisProps {
  /** Index scale Element
   * @default 0 */
  indexScale?: 0 | 1;
  /** Position Element
   * @default 'button' */
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export interface IAxisContext extends IAxisProps {
  getTicksProps: PropGetterFn;
  getGridProps: PropGetterFn;
}

export declare const XAxis: (<T>(props: CProps<IXAxisProps & T, IAxisContext>) => ReturnEl) & {
  Ticks: <T>(props: IXAxisProps & T) => ReturnEl;
  Grid: <T>(props: IXAxisProps & T) => ReturnEl;
};

export interface IYAxisProps extends IAxisProps {
  /** Index scale Element
   * @default 1 */
  indexScale?: 0 | 1;
  /** Position Element
   * @default 'left' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Element hide property
   * @default true */
  hide?: true;
}

export declare const YAxis: (<T>(props: CProps<IYAxisProps & T, IAxisContext>) => ReturnEl) & {
  Ticks: <T>(props: IYAxisProps & T) => ReturnEl;
  Grid: <T>(props: IYAxisProps & T) => ReturnEl;
};

export interface IResponsiveContainerProps extends IBoxProps {
  /** Relation between height and width dimensions block */
  aspect?: number;
  /** Callback which will called after change size block */
  onResize?: (size: [number, number], entries: ResizeObserverEntry[]) => void;
}

//ResponsiveContainer
export interface IResponsiveContainerContext {
  width?: number;
  height?: number;
}

export declare const ResponsiveContainer: <T>(
  props: CProps<IResponsiveContainerProps & T, IResponsiveContainerContext>,
) => ReturnEl;

//XYPlot
export interface IXYPlotProps extends IBoxProps {
  /** Data for graphic */
  data?: any[];
  /** Scale for svg element */
  scale?: any[];
  /** Width svg element
   * @default 0*/
  width?: number;
  /** Height svg element
   * @default 0*/
  height?: number;
  /** @ignore  */
  eventEmitter?: EventEmitter;
}

export interface IXYPlotContext {
  $rootProps: ContextRoot;
}

export declare const XYPlot: <T>(props: CProps<IXYPlotProps & T, IXYPlotContext>) => ReturnEl;

// Utils
export declare function eventToPoint(
  event: React.SyntheticEvent,
  svgRoot: HTMLElement,
): [number, number];

export declare function invert(scale: any[], value: number): any;

export declare function definedData(x: number, y: number): (p: [number, number]) => boolean;

export declare function scaleOfBandwidth(scale: any[], value: number): any;

export declare function minMax(data: any, key: string | number): any;

//Tooltip
export interface ITooltipProps extends IPopperProps, IPopperTriggerProps, ContextRoot {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
}

export interface ITooltipState {
  xIndex?: number | null;
  yIndex?: number | null;
}

export interface ITooltipContext extends ITooltipProps {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
}

export declare const Tooltip: (<T>(
  props: CProps<ITooltipProps & ITooltipState & T, ITooltipContext, ITooltipState>,
) => ReturnEl) & {
  Trigger: <T>(props: IPopperTriggerProps & T) => null;
  Popper: <T>(props: ComponentProps<typeof Popper.Popper> & T) => null;
  Title: <T>(props: IBoxProps & T) => null;
  Dot: <T>(props: IBoxProps & T) => null;
  Footer: <T>(props: T) => null;
};

//Line
export interface ILineProps extends ContextRoot {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Line generators
   * @default d3.line() */
  d3?: Line<Datum>;
  /** Color line
   * @default '#50aef4'*/
  color?: string;
  /** Element hide property */
  hide?: boolean;
}

export interface ILineContext extends ILineProps {
  getDotsProps: PropGetterFn;
  getNullProps: PropGetterFn;
}

export declare const Line: (<T>(props: CProps<ILineProps & T, ILineContext>) => ReturnEl) & {
  Dots: <T>(props: ILineProps & T) => ReturnEl;
  Null: <T>(props: ILineProps & T) => ReturnEl;
};

//Bar
export interface IBarProps extends ContextRoot {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Bar offset
   * @default [0, 0]*/
  offset?: [number, number];
  /** Color line
   * @default '#50aef4'*/
  color?: string;
  /** Element hide property */
  hide?: boolean;
  /** @ignore */
  y0?: string;
}

export declare const Bar: <T>(props: CProps<IBarProps & T, {}>) => ReturnEl;

//Hover
export interface IHoverProps {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
}

export interface IHoverState {
  xIndex?: number | null;
  yIndex?: number | null;
}

export declare const HoverLine: <T>(
  props: CProps<IHoverProps & T, ContextRoot, IHoverState>,
) => ReturnEl;

export declare const HoverRect: <T>(
  props: CProps<IHoverProps & T, ContextRoot, IHoverState>,
) => ReturnEl;

//HorizontalBar
export interface IHorizontalBarProps extends ContextRoot {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Color line
   * @default '#50aef4'*/
  color?: string;
  /** Bar offset
   * @default [0, 0]*/
  offset?: [number, number];
  /** @ignore */
  x0?: number;
}

export declare const HorizontalBar: <T>(props: CProps<IHorizontalBarProps & T>) => ReturnEl;

//StackBar
export interface IStackBarProps {
  /** Data for graphic */
  data?: any[];
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Stack generators
   * @default d3.stack() */
  stack?: Stack<
    any,
    {
      [key: string]: number;
    },
    string
  >;
}

export interface IStackBarContext extends IStackBarProps {
  getBarProps: PropGetterFn;
  getHorizontalBarProps: PropGetterFn;
}

export declare const StackBar: (<T>(
  props: CProps<IStackBarProps & T, IStackBarContext>,
) => ReturnEl) & {
  Bar: <T>(props: IBoxProps & T) => null;
  HorizontalBar: <T>(props: IHorizontalBarProps & T) => null;
};

//GroupBar
export interface IGroupBarProps extends ContextRoot {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Scale for group bars */
  scaleGroup?: any;
}

export interface IGroupBarContext extends IGroupBarProps {
  getBarProps: PropGetterFn;
  getHorizontalBarProps: PropGetterFn;
}

export declare const GroupBar: (<T>(
  props: CProps<IGroupBarProps & T, IGroupBarContext>,
) => ReturnEl) & {
  Bar: <T>(props: IBarProps & T) => null;
  HorizontalBar: <T>(props: IHorizontalBarProps & T) => null;
};
