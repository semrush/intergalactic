import { Intergalactic } from '@semcore/core';
import { Context } from './context';
import { FadeInOutProps } from '@semcore/animation';

/** @deprecated */
export interface IVennProps extends VennProps, UnknownProperties {}
export type VennProps = Context &
  FadeInOutProps & {
    /**
     * Rotate sets in the chart
     * @default Math.PI / 2
     */
    orientation?: number;
    /**
     * The function for sorting sets inside the chart
     * @default (circle1, circle2) => circle2.radius - circle1.radius
     */
    orientationOrder?: (c1: number, c2: number) => number;
  };

/** @deprecated */
export interface ICircleProps extends CircleProps, UnknownProperties {}
export type CircleProps = Context & {
  /**
   * Name of the field in the data
   * */
  dataKey: string;
  /** Color circle
   @default #3AB011
   **/
  color?: string;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Enables element transparency */
  transparent?: boolean;
};

/** @deprecated */
export interface IIntersectionProps extends IntersectionProps, UnknownProperties {}
export type IntersectionProps = Context &
  FadeInOutProps & {
    /**
     * Name of the field in the data
     * */
    dataKey: string;
    /** Enables element transparency */
    transparent?: boolean;
  };

declare const Venn: Intergalactic.Component<'g', VennProps, Context> & {
  Circle: Intergalactic.Component<'circle', CircleProps, Context>;
  Intersection: Intergalactic.Component<'path', IntersectionProps, Context>;
};

export default Venn;
