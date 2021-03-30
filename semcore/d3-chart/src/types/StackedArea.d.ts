import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';
import { IAreaProps } from './Area';

export interface IStackedAreaProps extends IContext {
  /** Data for graphic */
  data?: any[];
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
}

export interface IStackedAreaContext {
  /** Series is an array of points, where each point corresponds to the element in the input data. */
  series: any[];
}

declare const StackedArea: (<T>(
  props: CProps<IStackedAreaProps & T, IStackedAreaContext>,
) => ReturnEl) & {
  Area: <T>(props: CProps<IAreaProps & T>) => ReturnEl;
};

export default StackedArea;
