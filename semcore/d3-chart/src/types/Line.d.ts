import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { curveCardinal, CurveFactory } from 'd3-shape';
import { FadeInOutProps } from '@semcore/animation';
import { IntergalacticD3Component } from './Plot';

/** @deprecated */
export interface ILineProps extends LineProps, UnknownProperties {}
export type LineProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
  /** Line color */
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
  Omit<FadeInOutProps, 'display'> & {
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

export type LineAreaProps = Omit<LineProps, 'transparent'> & {
  /**
   * Field name from `data` (or from `area`, if passed) array for y0 point by the YAxis for the Area
   */
  y0: string;
  /**
   * Field name from `data` (or from `area`, if passed) array for y1 point by the YAxis for the Area
   */
  y1: string;

  /**
   * Optional data for render area
   */
  area?: Array<{ [key: string]: number }>;
};

declare const Line: IntergalacticD3Component<'line', LineProps, Context> & {
  Dots: IntergalacticD3Component<'circle', LineDotsProps, LineDotsContext>;
  Null: IntergalacticD3Component<'path', LineNullProps>;
  Area: IntergalacticD3Component<'path', LineAreaProps>;
};

export default Line;
