import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { CurveFactory } from 'd3-shape';
import { FadeInOutProps } from '@semcore/animation';
import { IntergalacticD3Component } from './Plot';

/** @deprecated */
export interface ILineProps extends LineProps, UnknownProperties {}
export type LineProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
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
export interface ILineDotsProps extends LineDotsProps, UnknownProperties {}
export type LineDotsProps = Context &
  FadeInOutProps & {
    /** Show all Dot */
    display?: boolean;
    /** Hide property */
    hide?: boolean;
    /** Index active of element */
    activeIndex?: number;
    /** Dot radius, radius of active dot is 4/3 times larger
     * @default 6
     */
    radius?: number;
  };

/** @deprecated */
export interface ILineDotsContext extends LineDotsContext, UnknownProperties {}
export type LineDotsContext = {
  /** Value element of data */
  /** @deprecated */
  value?: any;
  /** Index element of data */
  index?: number;
};

/** @deprecated */
export interface ILineNullProps extends LineNullProps, UnknownProperties {}
export type LineNullProps = Context & {
  /** Hide property */
  hide?: boolean;
};

declare const Line: IntergalacticD3Component<'line', LineProps, Context> & {
  Dots: IntergalacticD3Component<'circle', LineDotsProps, LineDotsContext>;
  Null: IntergalacticD3Component<'path', LineNullProps>;
};

export default Line;
