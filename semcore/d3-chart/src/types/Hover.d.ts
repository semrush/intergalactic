import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';

export interface IHoverProps extends IContext {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
}

declare const HoverLine: <T>(props: MapProps<IHoverProps & T>) => ReturnEl;

declare const HoverRect: <T>(props: MapProps<IHoverProps & T>) => ReturnEl;

export { HoverLine, HoverRect };
