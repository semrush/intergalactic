import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';
import Area from './Area';

export interface IStackedAreaProps extends IContext {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
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
  props: CProps<IStackedAreaProps & T, IStackedAreaContext>,
) => ReturnEl) & {
  Area: typeof Area;
};

export default StackedArea;
