import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';
import { IFadeInOutProps } from '@semcore/animation';

export interface IVennProps extends IContext, IFadeInOutProps {
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
}

export interface ICircleProps extends IContext {
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
  /** Element opacity property */
  transparent?: boolean;
}

export interface IIntersectionProps extends IContext, IFadeInOutProps {
  /**
   * Name of the field in the data
   * */
  dataKey: string;
  /** Element opacity property */
  transparent?: boolean;
}

declare const Venn: (<T>(props: MapProps<IVennProps & T>) => ReturnEl) & {
  Circle: <T>(props: MapProps<ICircleProps & T>) => ReturnEl;
  Intersection: <T>(props: MapProps<IIntersectionProps & T>) => ReturnEl;
};

export default Venn;
