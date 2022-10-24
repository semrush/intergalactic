import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';

export interface IXAxisProps extends IContext {
  /** The position of the axis relative chart
   * @default 'button' */
  position?: 'top' | 'right' | 'bottom' | 'left' | number;
  /** Element hide property
   * @default false */
  hide?: boolean;
  /** Values for axis ticks */
  ticks?: any[];
}

export interface IYAxisProps extends IContext {
  /** The position of the axis relative chart
   * @default 'left' */
  position?: 'top' | 'right' | 'bottom' | 'left' | number;
  /** Element hide property
   * @default true */
  hide?: boolean;
  /** Values for axis ticks */
  ticks?: any[];
}

export interface IAxisTicksProps extends IContext {
  /** The position of the axis relative chart */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Element hide property */
  hide?: boolean;
  /** Values for axis ticks */
  ticks?: any[];
}

export interface IAxisGridProps extends IContext {
  /** Values for axis ticks */
  ticks?: any[];
}

export interface IAxisTitleProps extends IContext {
  /** The position of the axis relative chart */
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export interface IAxisTicksContext {
  /** Value element of data */
  value: any;
  /** Index element of data */
  index: number;
}

declare const XAxis: (<T>(props: MapProps<IXAxisProps & T>) => ReturnEl) & {
  Ticks: <T>(props: MapProps<IAxisTicksProps & T, IAxisTicksContext>) => ReturnEl;
  Grid: <T>(props: MapProps<IAxisGridProps & T>) => ReturnEl;
  Title: <T>(props: MapProps<IAxisTitleProps & T>) => ReturnEl;
};

declare const YAxis: (<T>(props: MapProps<IYAxisProps & T>) => ReturnEl) & {
  Ticks: <T>(props: MapProps<IAxisTicksProps & T, IAxisTicksContext>) => ReturnEl;
  Grid: <T>(props: MapProps<IAxisGridProps & T>) => ReturnEl;
  Title: <T>(props: MapProps<IAxisTitleProps & T>) => ReturnEl;
};

export { XAxis, YAxis };
