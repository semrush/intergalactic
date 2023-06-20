import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';
import { TooltipType } from './Tooltip';

export interface IBubbleProps extends IContext {
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
}

export interface IBubbleContext {
  /** Index element of data */
  index: number;
}

declare const Bubble: (<T>(props: MapProps<IBubbleProps & T, IBubbleContext>) => ReturnEl) & {
  Tooltip: TooltipType<
    IBubbleProps & {
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
