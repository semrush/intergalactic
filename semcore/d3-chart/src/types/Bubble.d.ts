import { Intergalactic } from '@semcore/core';
import { Context } from './context';
import { ReturnEl } from '@semcore/core';
import IContext from './context';
import { TooltipType } from './Tooltip';

/** @deprecated */
export interface IBubbleProps extends BubbleProps, UnknownProperties {}
export type BubbleProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x: string;
  /** Field name from `data` array item for the YAxis */
  y: string;
  /** Field name from `data` array item for the circle radius */
  value: string;
  /** Field name from `data` array item for the circle label */
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

declare const Bubble: Intergalactic.Component<string, BubbleProps, BubbleContext> & {
  Tooltip: TooltipType<
    BubbleProps & {
      /**
       * @deprecated Use `index` instead.
       */
      xIndex: number;
      /**
       * Index of item in the `data` array used to render related bubble.
       */
      index: number;
    }
  >;
};

export default Bubble;
