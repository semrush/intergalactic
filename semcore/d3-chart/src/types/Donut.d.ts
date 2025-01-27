import type { UnknownProperties } from '@semcore/core';
import type { Context } from './context';
import type { TooltipType } from './Tooltip';
import type { IntergalacticD3Component } from './Plot';
import type { PatternsConfig } from './Pattern';

/** @deprecated */
export interface IDonutProps extends DonutProps, UnknownProperties {}
export type DonutProps = Context & {
  /** Inner radius
   * @default 0
   * */
  innerRadius?: number;
  /** Outer radius
   * @default calculated by the formula from width, height
   * */
  outerRadius?: number;
  /** Semi donut */
  halfsize?: boolean;
  /** Animation duration in ms. Set `0` to disable animation.
   * @default 500
   */
  duration?: number;
  /** Additional padding between segments in radians.
   * @default 0
   */
  paddingAngle?: number;
  /** Enables charts patterns that enhances charts accessibility */
  patterns?: PatternsConfig;
};

/** @deprecated */
export interface IPieProps extends PieProps, UnknownProperties {}
export type PieProps = Context & {
  /**
   * Name of the field in the data
   * */
  dataKey: string;
  /**
   * Human readable name of the segment
   * */
  name: string;
  /** Color pie **/
  color?: string;
  /**
   * Active sector
   * */
  active?: boolean;
  /** Enables element transparency */
  transparent?: boolean;
};

/** @deprecated */
export interface IEmptyDataProps extends EmptyDataProps, UnknownProperties {}
export type EmptyDataProps = Context & {};

/** @deprecated */
export interface ILabelProps extends LabelProps, UnknownProperties {}
export type LabelProps = Context & {
  label?: string;
};

declare const Donut: IntergalacticD3Component<'g', DonutProps> & {
  Pie: IntergalacticD3Component<'path', PieProps>;
  EmptyData: IntergalacticD3Component<'path', EmptyDataProps>;
  Label: IntergalacticD3Component<'text', LabelProps>;
  Tooltip: TooltipType<PieProps>;
};

export default Donut;
