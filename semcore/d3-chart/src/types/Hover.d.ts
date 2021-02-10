import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IHoverProps {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
}

export interface IHoverLineContext extends IContext {
  /** Index element of data */
  index: number;
  /** Start value coordinate of x */
  x1: number;
  /** Start value coordinate of y */
  y1: number;
  /** Finish value coordinate of x */
  x2: number;
  /** Finish value coordinate of y */
  y2: number;
}

export interface IHoverRectContext extends IContext {
  /** Index element of data */
  index: number;
  /** Width of Rect */
  width: number;
  /** Height of Rect */
  height: number;
  /** Value coordinate of x */
  x?: string;
  /** Value coordinate of y */
  y?: string;
}

declare const HoverLine: <T>(props: CProps<IHoverProps & T, IHoverLineContext>) => ReturnEl;

declare const HoverRect: <T>(props: CProps<IHoverProps & T, IHoverRectContext>) => ReturnEl;

export { HoverLine, HoverRect };
