import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface AxisMainProps {
  /** Element hide property */
  hide?: boolean;
  /** Values to ticks axis */
  ticks?: any[];
}

export interface IAxisProps extends AxisMainProps {
  /** The position of the axis relative chart */
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export interface IXAxisProps extends IAxisProps {
  /** The position of the axis relative chart
   * @default 'button' */
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export interface IYAxisProps extends IAxisProps, IContext {
  /** The position of the axis relative chart
   * @default 'left' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Element hide property
   * @default true */
  hide?: true;
}

export interface IAxisTicksProps extends AxisMainProps {
  /** The position of the axis relative chart */
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export interface IAxisGridProps extends AxisMainProps {}

export interface IAxisChildrenContext {
  /** Start value coordinate of x */
  x1: number;
  /** Start value coordinate of y */
  y1: number;
  /** Finish value coordinate of x */
  x2: number;
  /** Finish value coordinate of y */
  y2: number;
}

export interface IAxisTicksContext extends IAxisChildrenContext, IContext {
  /** Value element of data */
  value: any;
  /** Index element of data */
  index: number;
}
export interface IAxisGridContext extends IAxisChildrenContext, IContext {}

declare const XAxis: (<T>(props: CProps<IXAxisProps & T, IContext>) => ReturnEl) & {
  Ticks: <T>(props: CProps<IAxisTicksProps & T, IAxisTicksContext>) => ReturnEl;
  Grid: <T>(props: CProps<IAxisGridProps & T, IAxisGridContext>) => ReturnEl;
};

declare const YAxis: (<T>(props: CProps<IYAxisProps & T, IContext>) => ReturnEl) & {
  Ticks: <T>(props: CProps<IAxisTicksProps & T, IAxisTicksContext>) => ReturnEl;
  Grid: <T>(props: CProps<IAxisGridProps & T, IAxisGridContext>) => ReturnEl;
};

export { XAxis, YAxis };
