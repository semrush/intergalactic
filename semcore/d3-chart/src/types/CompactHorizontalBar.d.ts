import React from 'react';
import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { BackgroundProps } from './Bar';
import { IntergalacticD3Component } from './Plot';
import { PatternsConfig } from './Pattern';
import { BoxProps } from '@semcore/flex-box';
import { TooltipType } from './Tooltip';

export type CompactHorizontalBarProps = Context & {
  /** Field name from `data` array item for the XAxis */
  x?: string;
  /** Field name from `data` array item for the YAxis */
  y?: string;
  /** Line color */
  color?: string;
  /**
   * Bars rounded corners
   * @default 2
   */
  radius?: number;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Enables element transparency */
  transparent?: boolean;
  /** Enables charts patterns that enhances charts accessibility */
  patterns?: PatternsConfig;
};

export type BarContext = {
  /** Index in `data` array of the current items */
  index: number;
};

export type CompactHorizontalBarHoverProps = BoxProps;
type Hover = IntergalacticD3Component<'rect', CompactHorizontalBarHoverProps, Context>;
export type CompactHorizontalBarAnnotationProps = BoxProps;
type Annotation = IntergalacticD3Component<
  'foreignObject',
  CompactHorizontalBarAnnotationProps,
  Context & BarContext
>;
export type CompactHorizontalBarLabelProps = BoxProps;
type Label = IntergalacticD3Component<'div', CompactHorizontalBarLabelProps, Context & BarContext>;
export type CompactHorizontalBarPercentProps = BoxProps;
export type CompactHorizontalBarPercentContext = {
  formatted: string;
  percent: number;
} & BarContext;
type Percent = IntergalacticD3Component<
  'div',
  CompactHorizontalBarPercentProps,
  Context & CompactHorizontalBarPercentContext
>;
export type CompactHorizontalBarValueProps = BoxProps;
export type CompactHorizontalBarValueContext = { formatted: string; value: number } & BarContext;
type Value = IntergalacticD3Component<
  'div',
  CompactHorizontalBarValueProps,
  Context & CompactHorizontalBarValueContext
>;
export type CompactHorizontalBarBarProps = {};
type Bar = IntergalacticD3Component<'g', CompactHorizontalBarBarProps, Context & BarContext>;
export type CompactHorizontalBarBackgroundProps = BoxProps;
type Background = IntergalacticD3Component<'rect', BackgroundProps, Context & BarContext>;
export type CompactHorizontalBarFillProps = BoxProps & {
  patterns?: PatternsConfig;
  color?: string;
  transparent?: boolean;
  hide?: boolean;
};
type Fill = IntergalacticD3Component<'rect', CompactHorizontalBarFillProps, Context & BarContext>;

declare const CompactHorizontalBar: IntergalacticD3Component<
  'g',
  CompactHorizontalBarProps,
  BarContext
> & {
  Hover: Hover;
  Annotation: Annotation;
  Label: Label;
  Percent: Percent;
  Value: Value;
  Bar: Bar & {
    Background: Background;
    Fill: Fill;
  };
  Tooltip: TooltipType<BarContext>;
};

export default CompactHorizontalBar;
