import { Intergalactic } from '@semcore/core';
import { Context } from './context';

/** @deprecated */
export interface IBubbleProps extends BubbleProps, UnknownProperties {}
export type BubbleProps = Context & {
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
  /** Enables element transparency */
  transparent?: boolean;
};

/** @deprecated */
export interface IBubbleContext extends BubbleContext, UnknownProperties {}
export type BubbleContext = {
  /** Index element of data */
  index: number;
};

declare const Bubble: Intergalactic.Component<string, BubbleProps, BubbleContext>;

export default Bubble;
