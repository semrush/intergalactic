import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import { IBarContext, IBarProps } from './Bar';
import { IHorizontalBarProps } from './HorizontalBar';
import IContext from './context';

export interface IGroupBarProps extends IContext {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
  /** Scale for group bars */
  scaleGroup?: any;
}

declare const GroupBar: (<T>(props: MapProps<IGroupBarProps & T>) => ReturnEl) & {
  Bar: <T>(props: MapProps<IBarProps & T, IBarContext>) => ReturnEl;
  HorizontalBar: <T>(props: MapProps<IHorizontalBarProps & T, IBarContext>) => ReturnEl;
};

export default GroupBar;
