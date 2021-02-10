import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface AxisMainProps extends IContext {
  /** Element hide property */
  hide?: boolean;
  /** Values to ticks axis */
  ticks?: any[];
}

export interface IXAxisProps extends AxisMainProps {
  /** The position of the axis relative chart
   * @default 'button' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Element hide property
   * @default false */
  hide?: boolean;
}

export interface IYAxisProps extends AxisMainProps {
  /** The position of the axis relative chart
   * @default 'left' */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Element hide property
   * @default true */
  hide?: boolean;
}

export interface IAxisTicksProps extends AxisMainProps {
  /** The position of the axis relative chart */
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export interface IAxisGridProps extends AxisMainProps {}

export interface IAxisTicksContext {
  /** Value element of data */
  value: any;
  /** Index element of data */
  index: number;
}

declare const XAxis: (<T>(props: CProps<IXAxisProps & T>) => ReturnEl) & {
  Ticks: <T>(props: CProps<IAxisTicksProps & T, IAxisTicksContext>) => ReturnEl;
  Grid: <T>(props: CProps<IAxisGridProps & T>) => ReturnEl;
};

declare const YAxis: (<T>(props: CProps<IYAxisProps & T>) => ReturnEl) & {
  Ticks: <T>(props: CProps<IAxisTicksProps & T, IAxisTicksContext>) => ReturnEl;
  Grid: <T>(props: CProps<IAxisGridProps & T>) => ReturnEl;
};

export { XAxis, YAxis };
