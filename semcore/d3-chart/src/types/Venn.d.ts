import type { UnknownProperties } from '@semcore/core';
import type { Context } from './context';
import type { FadeInOutProps } from '@semcore/animation';
import type { TooltipType } from './Tooltip';
import type { IntergalacticD3Component } from './Plot';
import type { PatternsConfig } from './Pattern';

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
    /** Enables charts patterns that enhances charts accessibility */
    patterns?: PatternsConfig;
    /**
     * Fallback for minimum value radius
     * @default 6
     * */
    minRadius?: number;
  };

/** @deprecated */
export interface ICircleProps extends CircleProps, UnknownProperties {}
export type CircleProps = Context & {
  /**
   * Name of the field in the data
   * */
  dataKey: string;
  /**
   * Human readable name of the circle
   * */
  name: string;
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
    /**
     * Human readable name of the intersection
     * */
    name: string;
    /** Enables element transparency */
    transparent?: boolean;
  };

declare const Venn: IntergalacticD3Component<'g', VennProps, Context> & {
  Circle: IntergalacticD3Component<'circle', CircleProps, Context>;
  Intersection: IntergalacticD3Component<'path', IntersectionProps, Context>;
  Tooltip: TooltipType<CircleProps>;
};

export default Venn;
