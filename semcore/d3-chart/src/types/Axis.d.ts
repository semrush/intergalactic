import type { IntergalacticD3Component } from './Plot';
import type { Context } from './context';
import type { UnknownProperties } from '@semcore/core';

/** @deprecated */
export interface IXAxisProps extends XAxisProps, UnknownProperties {}
export type XAxisProps = Context & {
  /** The position of the axis relative chart
   * @default 'button' */
  position?: 'top' | 'right' | 'bottom' | 'left' | number;
  /** Element hide property
   * @default false */
  hide?: boolean;
  /** Values for axis ticks */
  ticks?: any[];
};

/** @deprecated */
export interface IYAxisProps extends YAxisProps, UnknownProperties {}
export type YAxisProps = Context & {
  /** The position of the axis relative chart
   * @default 'left' */
  position?: 'top' | 'right' | 'bottom' | 'left' | number;
  /** Element hide property
   * @default true */
  hide?: boolean;
  /** Values for axis ticks */
  ticks?: any[];
};

/** @deprecated */
export interface IAxisTicksProps extends AxisTicksProps, UnknownProperties {}
export type AxisTicksProps = Context & {
  /** The position of the axis relative chart */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Element hide property */
  hide?: boolean;
  /** Values for axis ticks */
  ticks?: any[];
};

/** @deprecated */
export interface IAxisGridProps extends AxisGridProps, UnknownProperties {}
export type AxisGridProps = Context & {
  /** Values for axis ticks */
  ticks?: any[];
};

/** @deprecated */
export interface IAxisTitleProps extends AxisTitleProps, UnknownProperties {}
export type AxisTitleProps = Context & {
  /** The position of the axis relative chart */
  position?: 'top' | 'right' | 'bottom' | 'left';

  /** For vertical titles disables characters rotation while puts
   * characters into the vertical column for better reading in some languages.
   * @default true for `zh` and `ja` locales and false for all others.
   */
  verticalWritingMode?: boolean;
};

/** @deprecated */
export interface IAxisTicksContext extends AxisTicksContext, UnknownProperties {}
export type AxisTicksContext = {
  /** Value element of data */
  /** @deprecated */
  value: any;
  /** Index element of data */
  index: number;
  /** Horizontal coordinate of tick */
  x: number;
  /** Vertical coordinate of tick */
  y: number;
  /** Size of plot */
  size: [width: number, height: number];
};

declare const XAxis: IntergalacticD3Component<'path', XAxisProps> & {
  Ticks: IntergalacticD3Component<'path', AxisTicksProps, AxisTicksContext>;
  Grid: IntergalacticD3Component<'path', AxisGridProps>;
  Title: IntergalacticD3Component<'text', AxisTitleProps>;
};

declare const YAxis: IntergalacticD3Component<'path', YAxisProps> & {
  Ticks: IntergalacticD3Component<'path', AxisTicksProps, AxisTicksContext>;
  Grid: IntergalacticD3Component<'path', AxisGridProps>;
  Title: IntergalacticD3Component<'text', AxisTitleProps>;
};

export { XAxis, YAxis };
