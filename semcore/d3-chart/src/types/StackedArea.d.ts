import { Intergalactic } from '@semcore/core';
import { Context } from './context';
import Area from './Area';

/** @deprecated */
export interface IStackedAreaProps extends StackedAreaProps, UnknownProperties {}
export type StackedAreaProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
  /** Stack generators
   * @default d3.stack() */
  stack?: any;
};

/** @deprecated */
export interface IStackedAreaContext extends StackedAreaContext, UnknownProperties {}
export type StackedAreaContext = {
  /** Series is an array of points, where each point corresponds to the element in the input data. */
  series: any[];
};

declare const StackedArea: Intergalactic.Component<'g', StackedAreaProps, StackedAreaContext> & {
  Area: typeof Area;
};

export default StackedArea;
