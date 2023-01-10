import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';

export interface IBubbleProps extends IContext {
  /** Field from data for XAxis */
  x: string;
  /** Field from data for YAxis */
  y: string;
  /** Field from data for circle radius */
  value: string;
  /** Field from data for circle label */
  label?: string;
  /** Circle color */
  color?: string;
  /** Cross in the center of the bubble
   * @default true
   */
  markedCross?: boolean;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Element opacity property */
  transparent?: boolean;
}

export interface IBubbleContext {
  /** Index element of data */
  index: number;
}

declare const Bubble: <T>(props: MapProps<IBubbleProps & T, IBubbleContext>) => ReturnEl;

export default Bubble;
