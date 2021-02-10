import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';
import { IBarContext } from './Bar';

export interface IHorizontalBarProps {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Color line
   * @default '#50aef4'*/
  color?: string;
  /** Bar offset
   * @default [0, 0]*/
  offset?: [number, number];
}

declare const HorizontalBar: <T>(
  props: CProps<IHorizontalBarProps & T, IBarContext & IContext>,
) => ReturnEl;

export default HorizontalBar;
