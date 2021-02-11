import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IXAxisProps extends IContext {
  /** The position of the axis relative chart
   * @default 'button' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Element hide property
   * @default false */
  hide?: boolean;
  /** Values to ticks axis */
  ticks?: any[];
}

export interface IYAxisProps extends IContext {
  /** The position of the axis relative chart
   * @default 'left' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Element hide property
   * @default true */
  hide?: boolean;
  /** Values to ticks axis */
  ticks?: any[];
}

export interface IAxisTicksProps extends IContext {
  /** The position of the axis relative chart */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Element hide property */
  hide?: boolean;
  /** Values to ticks axis */
  ticks?: any[];
}

export interface IAxisGridProps extends IContext {
  /** Values to ticks axis */
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

declare const XAxis: (<T>(props: CProps<IXAxisProps & T>) => ReturnEl) & {
  Ticks: <T>(props: CProps<IAxisTicksProps & T, IAxisTicksContext>) => ReturnEl;
  Grid: <T>(props: CProps<IAxisGridProps & T>) => ReturnEl;
  Title: <T>(props: CProps<IAxisTitleProps & T>) => ReturnEl;
};

declare const YAxis: (<T>(props: CProps<IYAxisProps & T>) => ReturnEl) & {
  Ticks: <T>(props: CProps<IAxisTicksProps & T, IAxisTicksContext>) => ReturnEl;
  Grid: <T>(props: CProps<IAxisGridProps & T>) => ReturnEl;
  Title: <T>(props: CProps<IAxisTitleProps & T>) => ReturnEl;
};

export { XAxis, YAxis };
