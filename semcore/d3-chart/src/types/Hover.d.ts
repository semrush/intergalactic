import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IHoverProps extends IContext {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
}

declare const HoverLine: <T>(props: CProps<IHoverProps & T>) => ReturnEl;

declare const HoverRect: <T>(props: CProps<IHoverProps & T>) => ReturnEl;

export { HoverLine, HoverRect };
