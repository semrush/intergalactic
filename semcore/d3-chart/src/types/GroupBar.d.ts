import { UnknownProperties } from '@semcore/core';
import { BarContext, BarProps } from './Bar';
import { HorizontalBarProps } from './HorizontalBar';
import { Context } from './context';
import { IntergalacticD3Component } from './Plot';

/** @deprecated */
export interface IGroupBarProps extends GroupBarProps, UnknownProperties {}
export type GroupBarProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
  /** Scale for group bars */
  /** @deprecated */
  scaleGroup?: any;

  /**
   * The maximum width of each Bar
   */
  maxBarSize?: number;
};

declare const GroupBar: IntergalacticD3Component<'g', GroupBarProps> & {
  Bar: IntergalacticD3Component<'path', BarProps>;
  HorizontalBar: IntergalacticD3Component<'path', HorizontalBarProps, BarContext>;
};

export default GroupBar;
