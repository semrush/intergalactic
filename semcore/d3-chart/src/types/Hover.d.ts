import { Intergalactic } from '@semcore/core';
import { Context } from './context';

/** @deprecated */
export interface IHoverProps extends HoverProps, UnknownProperties {}
export type HoverProps = Context & {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
};

declare const HoverLine: Intergalactic.Component<'line', HoverProps>;

declare const HoverRect: Intergalactic.Component<'rect', HoverProps>;

export { HoverLine, HoverRect };
