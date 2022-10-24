import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
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
  r?: number | number[];
}

declare const HorizontalBar: (<T>(
  props: MapProps<IHorizontalBarProps & T, IBarContext>,
) => ReturnEl) & {
  Background: <T>(props: MapProps<IBackgroundProps & T>) => ReturnEl;
};

export default HorizontalBar;
