import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import Area from './Area';
import { IntergalacticD3Component } from './Plot';
import { PatternsConfig } from './Pattern';

/** @deprecated */
export interface IStackedAreaProps extends StackedAreaProps, UnknownProperties {}
export type StackedAreaProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
  /** Stack generators
   * @default d3.stack() */
  /** @deprecated */
  stack?: any;

  /** Enables charts patterns that enhances charts accessability */
  patterns?: PatternsConfig;
};

/** @deprecated */
export interface IStackedAreaContext extends StackedAreaContext, UnknownProperties {}
export type StackedAreaContext = {
  /** Series is an array of points, where each point corresponds to the element in the input data. */
  /** @deprecated */
  series: any[];
};

declare const StackedArea: IntergalacticD3Component<'g', StackedAreaProps, StackedAreaContext> & {
  Area: typeof Area;
};

export default StackedArea;
