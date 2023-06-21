import { Intergalactic } from '@semcore/core';
import { Context } from './context';
import { BarContext, BarProps } from './Bar';
import { HorizontalBarProps } from './HorizontalBar';

/** @deprecated */
export interface IStackBarProps extends StackBarProps, UnknownProperties {}
export type StackBarProps = Context & {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
  /** Stack generators
   * @default d3.stack() */
  stack?: any;
};

/** @deprecated */
export interface IStackBarContext extends StackBarContext, UnknownProperties {}
export type StackBarContext = {
  /** Series is an array of points, where each point corresponds to the element in the input data. */
  series: any[];
};

declare const StackBar: Intergalactic.Component<'g', StackBarProps, StackBarContext> & {
  Bar: Intergalactic.Component<'path', BarProps, BarContext>;
  HorizontalBar: Intergalactic.Component<'path', HorizontalBarProps, BarContext>;
};

export default StackBar;
