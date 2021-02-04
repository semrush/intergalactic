import React from 'react';
import { Stack, Line } from 'd3-shape';
import { PropGetterFn, CProps, ReturnEl, ComponentType, Component } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import Popper, { IPopperProps } from '@semcore/popper';

export declare function createXYElement<
  ComponentProps,
  ChildComponentProps = {},
  ContextType = {},
  FNType = null
>(
  OriginComponent,
  childComponents = {},
  options: {
    context?: React.Context<ContextType>;
    parent?: ComponentType<unknown> | ComponentType<unknown>[];
    enhancements?: [any];
  } = {},
): ComponentType<
  ComponentProps extends Component<infer Props> ? Props : ComponentProps,
  ChildComponentProps,
  ContextType,
  ComponentProps extends ClassWithUncontrolledProps<any>
    ? ReturnType<ComponentProps['uncontrolledProps']>
    : { [key: string]: (arg: unknown) => void },
  FNType
>;

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
  Ticks: <T>(props: T) => ReturnEl;
  Grid: <T>(props: T) => ReturnEl;
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
  Ticks: <T>(props: T) => ReturnEl;
  Grid: <T>(props: T) => ReturnEl;
};

export interface IResponsiveContainerProps extends IBoxProps {
  /** Relation between height and width dimensions block */
  aspect?: number;
  /** Callback which will called after change size block */
  onResize?: (size: [number, number], entries: ResizeObserverEntry[]) => void;
}

//ResponsiveContainer
export interface IResponsiveContainerContext {
  width: number;
  height: number;
}

type ChildRenderFn<Props> = Props & {
  children?: ({ width, height }: { width: number; height: number }) => React.ReactElement;
};

export declare const ResponsiveContainer: <T>(
  props: CProps<
    IResponsiveContainerProps & T,
    IResponsiveContainerContext & ChildRenderFn<IResponsiveContainerProps & T>
  >,
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
export interface ITooltipProps extends IPopperProps, ContextRoot {
  /** Field from data for Axis x */
  x?: 'x' | 'y';
  /** Field from data for Axis y */
  y?: 'x' | 'y';
}

export interface ITooltipState {
  xIndex: number | null;
  yIndex: number | null;
}

export interface ITooltipContext extends ITooltipProps {
  getTriggerProps: PropGetterFn;
  getPopperProps: PropGetterFn;
}

type TooltipChildRenderFn<Props> = Props & {
  children?: ({ xIndex }: { xIndex: number }) => React.ReactElement;
};

export declare const Tooltip: (<T>(
  props: CProps<
    ITooltipProps & T,
    ITooltipContext & TooltipChildRenderFn<ITooltipProps & T>,
    ITooltipState
  >,
) => ReturnEl) & {
  Trigger: ComponentProps<typeof Popper.Trigger>;
  Popper: ComponentProps<typeof Popper.Popper>;
  Title: ComponentProps<typeof Box>;
  Dot: ComponentProps<typeof Box>;
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
  Dots: <T>(props: T) => ReturnEl;
  Null: <T>(props: T) => ReturnEl;
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
  x?: 'x' | 'y';
  /** Field from data for Axis y */
  y?: 'x' | 'y';
}

export interface IHoverState {
  xIndex: number | null;
  yIndex: number | null;
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
  x?: 'x' | 'y';
  /** Field from data for Axis y */
  y?: 'x' | 'y';
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
  Bar: ComponentProps<typeof Bar>;
  HorizontalBar: ComponentProps<typeof HorizontalBar>;
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

type GroupBarChildRenderFn<Props> = Props & {
  children?: ({ scaleGroup }: { scaleGroup: any }) => React.ReactElement;
};

export declare const GroupBar: (<T>(
  props: CProps<IGroupBarProps & T, IGroupBarContext & GroupBarChildRenderFn<IGroupBarProps & T>>,
) => ReturnEl) & {
  Bar: ComponentProps<typeof Bar>;
  HorizontalBar: ComponentProps<typeof HorizontalBar>;
};
