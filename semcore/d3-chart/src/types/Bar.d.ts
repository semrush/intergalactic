import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { IntergalacticD3Component } from './Plot';
import { ScaleBand, ScaleLinear } from 'd3-scale';

/** @deprecated */
export interface IBarProps extends BarProps, UnknownProperties {}
export type BarProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
  /** Line color */
  color?: string;
  /** Element hide property */
  hide?: boolean;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Radius of curvature
   * @default 2
   */
  r?: number | number[];
  /** Minimal height
   * @default 2
   */
  hMin?: number;
  /**
   * Bar click handler
   */
  onClick?: (data: { [key: string]: string | number }, event: Event) => void;
  /** Enables element transparency */
  transparent?: boolean;
  /**
   * The maximum width of each Bar
   */
  maxBarSize?: number;
};

/** @deprecated */
export interface IBarContext extends BarContext, UnknownProperties {}
export type BarContext = {
  scale: [ScaleBand<any>, ScaleLinear<any, any>];
  /** @deprecated */
  value: unknown;
  /** Index in `data` array */
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

/** @deprecated */
export interface IBackgroundProps extends BackgroundProps, UnknownProperties {}
export type BackgroundProps = Context & {
  /** Coordinate x */
  x?: number | string;
  /** Coordinate y */
  y?: number | string;
  /** Value element of data */
  /** @deprecated */
  value?: any;
  /** Width rect */
  width?: number | string;
  /** Height rect */
  height?: number | string;
};

type BackgroundContext = Context & {
  /** Index in `data` array */
  index: number;
};

declare const Bar: IntergalacticD3Component<'rect', BarProps, BarContext> & {
  Background: IntergalacticD3Component<'rect', BackgroundProps, BackgroundContext>;
};

export default Bar;
