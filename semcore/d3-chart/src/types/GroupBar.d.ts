import type { UnknownProperties } from '@semcore/core';
import type { BarContext, BarProps } from './Bar';
import type { HorizontalBarProps } from './HorizontalBar';
import type { Context } from './context';
import type { IntergalacticD3Component } from './Plot';
import { PatternsConfig } from './Pattern';

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
