import { CProps, ReturnEl } from '@semcore/core';
import { IBarContext, IBarProps } from './Bar';
import { IHorizontalBarProps } from './HorizontalBar';
import IContext from './context';

export interface IGroupBarProps {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Scale for group bars */
  scaleGroup?: any;
}

export interface IGroupBarContext extends IContext {
  /** Scale for group bars */
  scaleGroup: any;
}

declare const GroupBar: (<T>(props: CProps<IGroupBarProps & T, IGroupBarContext>) => ReturnEl) & {
  Bar: <T>(props: CProps<IBarProps & T, IBarContext>) => ReturnEl;
  HorizontalBar: <T>(props: CProps<IHorizontalBarProps & T, IBarContext>) => ReturnEl;
};

export default GroupBar;
