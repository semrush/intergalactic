import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IVennProps extends IContext {
  /**
   * Used to rotate sets in the chart
   * @default Math.PI / 2
   */
  orientation?: number;
  /**
   * The function of sorting sets inside the graph
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
}

export interface IIntersectionProps extends IContext {
  /**
   * Name of the field in the data
   * */
  dataKey: string;
}

declare const Venn: (<T>(props: CProps<IVennProps & T>) => ReturnEl) & {
  Circle: <T>(props: CProps<ICircleProps & T>) => ReturnEl;
  Intersection: <T>(props: CProps<IIntersectionProps & T>) => ReturnEl;
};

export default Venn;
