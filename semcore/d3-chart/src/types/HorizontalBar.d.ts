import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';
import { IBarContext, IBackgroundProps } from './Bar';

export interface IHorizontalBarProps extends IContext {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
  /** Line color
   * @default '#50aef4'*/
  color?: string;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Radius of curvature
   * @default 2
   */
  r?: number;
}

declare const HorizontalBar: (<T>(
  props: CProps<IHorizontalBarProps & T, IBarContext>,
) => ReturnEl) & {
  Background: <T>(props: CProps<IBackgroundProps & T>) => ReturnEl;
};

export default HorizontalBar;
