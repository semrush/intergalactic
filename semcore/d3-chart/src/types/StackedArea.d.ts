import type { UnknownProperties } from '@semcore/core';

import type Area from './Area';
import type { Context } from './context';
import type { PatternsConfig } from './Pattern';
import type { IntergalacticD3Component } from './Plot';

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

  /** Enables charts patterns that enhances charts accessibility */
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
