import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';
import Area from './Area';

export interface IStackedAreaProps extends IContext {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
  /** Stack generators
   * @default d3.stack() */
  stack?: any;
}

export interface IStackedAreaContext {
  /** Series is an array of points, where each point corresponds to the element in the input data. */
  series: any[];
}

declare const StackedArea: (<T>(
  props: MapProps<IStackedAreaProps & T, IStackedAreaContext>,
) => ReturnEl) & {
  Area: typeof Area;
};

export default StackedArea;
