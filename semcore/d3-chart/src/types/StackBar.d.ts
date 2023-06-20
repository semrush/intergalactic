import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';
import { IBarContext, IBarProps } from './Bar';
import { IHorizontalBarProps } from './HorizontalBar';

export interface IStackBarProps extends IContext {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
  /** Stack generators
   * @default d3.stack() */
  stack?: any;
}

export interface IStackBarContext {
  /** Series is an array of points, where each point corresponds to the element in the input data. */
  series: any[];
}

declare const StackBar: (<T>(props: MapProps<IStackBarProps & T, IStackBarContext>) => ReturnEl) & {
  Bar: <T>(props: MapProps<IBarProps & T, IBarContext>) => ReturnEl;
  HorizontalBar: <T>(props: MapProps<IHorizontalBarProps & T, IBarContext>) => ReturnEl;
};

export default StackBar;
