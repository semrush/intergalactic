import { Intergalactic } from '@semcore/core';
import { Context } from './context';
import { BarContext, BackgroundProps } from './Bar';

/** @deprecated */
export interface IHorizontalBarProps extends HorizontalBarProps, UnknownProperties {}
export type HorizontalBarProps = Context & {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
  /** Line color
   * @default '#50aef4'*/
  color?: string;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Radius of curvature
   * @default 2
   */
  r?: number | number[];
  /** Enables element transparency */
  transparent?: boolean;
};

declare const HorizontalBar: Intergalactic.Component<'path', HorizontalBarProps, BarContext> & {
  Background: Intergalactic.Component<'rect', BackgroundProps, Context>;
};

export default HorizontalBar;
