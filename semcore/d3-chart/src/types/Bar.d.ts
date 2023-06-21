import { Intergalactic } from '@semcore/core';
import { Context } from './context';

/** @deprecated */
export interface IBarProps extends BarProps, UnknownProperties {}
export type BarProps = Context & {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
  /** Line color
   * @default '#50aef4'*/
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
};

/** @deprecated */
export interface IBarContext extends BarContext, UnknownProperties {}
export type BarContext = {
  /** Value element of data */
  value: any;
  /** Index element of data */
  index: number;
};

/** @deprecated */
export interface IBackgroundProps extends BackgroundProps, UnknownProperties {}
export type BackgroundProps = Context & {
  /** Coordinate x */
  x?: number | string;
  /** Coordinate y */
  y?: number | string;
  /** Value element of data */
  value?: any;
  /** Width rect */
  width?: number | string;
  /** Height rect */
  height?: number | string;
};

declare const Bar: Intergalactic.Component<'rect', BarProps, BarContext> & {
  Background: Intergalactic.Component<'rect', BackgroundProps>;
};

export default Bar;
