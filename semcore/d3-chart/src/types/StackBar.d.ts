import type { UnknownProperties } from '@semcore/core';
import type { Context } from './context';
import type { BarContext, BarProps } from './Bar';
import type { HorizontalBarProps } from './HorizontalBar';
import type { IntergalacticD3Component } from './Plot';
import type { PatternsConfig } from './Pattern';

/** @deprecated */
export interface IStackBarProps extends StackBarProps, UnknownProperties {}
export type StackBarProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
  /** Stack generators
   * @default d3.stack() */
  /** @deprecated */
  stack?: any;
  /**
   * The maximum width of each Bar
   */
  maxBarSize?: number;

  /** Enables charts patterns that enhances charts accessibility */
  patterns?: PatternsConfig;
};

/** @deprecated */
export interface IStackBarContext extends StackBarContext, UnknownProperties {}
export type StackBarContext = {
  /** Series is an array of points, where each point corresponds to the element in the input data. */
  /** @deprecated */
  series: any[];
};

declare const StackBar: IntergalacticD3Component<'g', StackBarProps, StackBarContext> & {
  Bar: IntergalacticD3Component<'path', BarProps, BarContext>;
  HorizontalBar: IntergalacticD3Component<'path', HorizontalBarProps, BarContext>;
};

export default StackBar;
