import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { CurveFactory } from 'd3-shape';
import { IntergalacticD3Component } from './Plot';

/** @deprecated */
export interface IAreaProps extends AreaProps, UnknownProperties {}
export type AreaProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis*/
  y?: string;
  /** Line color
   * @default '#50aef4'*/
  color?: string;
  /** Element hide property */
  hide?: boolean;
  /** Curve method */
  curve?: CurveFactory;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Enables element transparency */
  transparent?: boolean;
};

/** @deprecated */
export interface IAreaDotsProps extends AreaDotsProps, UnknownProperties {}
export type AreaDotsProps = Context & {
  /** Show all Dot */
  display?: boolean;
  /** Hide property */
  hide?: boolean;
  /** Enables element transparency */
  transparent?: boolean;
};

/** @deprecated */
export interface IAreaDotsContext extends AreaDotsContext, UnknownProperties {}
export type AreaDotsContext = {
  /** Value element of data */
  /** @deprecated */
  value?: any;
  /** Index element of data */
  index?: number;
};

/** @deprecated */
export interface IAreaNullProps extends AreaNullProps, UnknownProperties {}
export type AreaNullProps = Context & {
  /** Hide property */
  hide?: boolean;
};

declare const Area: IntergalacticD3Component<'path', AreaProps, Context> & {
  Dots: IntergalacticD3Component<'circle', AreaDotsProps, AreaDotsContext>;
  Null: IntergalacticD3Component<'path', AreaNullProps, Context>;
  Line: IntergalacticD3Component<'path', Context, Context>;
};

export default Area;
