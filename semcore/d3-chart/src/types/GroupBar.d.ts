import { Intergalactic } from '@semcore/core';
import { BarContext, BarProps } from './Bar';
import { HorizontalBarProps } from './HorizontalBar';
import { Context } from './context';

/** @deprecated */
export interface IGroupBarProps extends GroupBarProps, UnknownProperties {}
export type GroupBarProps = Context & {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
  /** Scale for group bars */
  scaleGroup?: any;
};

declare const GroupBar: Intergalactic.Component<'g', GroupBarProps> & {
  Bar: Intergalactic.Component<'path', BarProps>;
  HorizontalBar: Intergalactic.Component<'path', HorizontalBarProps, BarContext>;
};

export default GroupBar;
