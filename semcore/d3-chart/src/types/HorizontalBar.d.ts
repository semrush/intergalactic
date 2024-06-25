import React from 'react';
import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { BarContext, BackgroundProps } from './Bar';
import { IntergalacticD3Component } from './Plot';
import { PatternsConfig } from './Pattern';

/** @deprecated */
export interface IHorizontalBarProps extends HorizontalBarProps, UnknownProperties {}
export type HorizontalBarProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
  /** Line color */
  color?: string;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Radius of curvature
   * @default 2
   */
  r?: number | number[];
  /**
   * Bar click handler
   */
  onClick?: (
    data: { [key: string]: string | number | Date },
    event: React.SyntheticEvent,
    barIndex: number,
    barKey: string,
  ) => void;
  /** Enables element transparency */
  transparent?: boolean;
  /**
   * The maximum width of each Bar
   */
  maxBarSize?: number;
  /** Enables charts patterns that enhances charts accessibility */
  patterns?: PatternsConfig;
};

declare const HorizontalBar: IntergalacticD3Component<'path', HorizontalBarProps, BarContext> & {
  Background: IntergalacticD3Component<'rect', BackgroundProps, Context>;
};

export default HorizontalBar;
