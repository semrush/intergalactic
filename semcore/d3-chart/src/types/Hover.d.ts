import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IHoverProps extends IContext {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
}

declare const HoverLine: <T>(props: CProps<IHoverProps & T>) => ReturnEl;

declare const HoverRect: <T>(props: CProps<IHoverProps & T>) => ReturnEl;

export { HoverLine, HoverRect };
