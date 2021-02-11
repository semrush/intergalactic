import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';
import { IBarContext, IBarProps } from './Bar';
import { IHorizontalBarProps } from './HorizontalBar';

export interface IStackBarProps extends IContext {
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

export interface IStackBarContext {
  /** Series is an array of points, where each point corresponds to the element in the input data. */
  series: any[];
}

declare const StackBar: (<T>(props: CProps<IStackBarProps & T, IStackBarContext>) => ReturnEl) & {
  Bar: <T>(props: CProps<IBarProps & T, IBarContext>) => ReturnEl;
  HorizontalBar: <T>(props: CProps<IHorizontalBarProps & T, IBarContext>) => ReturnEl;
};

export default StackBar;
