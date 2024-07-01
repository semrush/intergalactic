import React from 'react';
import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { BarContext, BackgroundProps } from './Bar';
import { IntergalacticD3Component } from './Plot';
import { PatternsConfig } from './Pattern';
import { BoxProps } from '@semcore/flex-box';
import { TooltipType } from './Tooltip';

export type DistributionBarProps = Context & {
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
  /** Enables element transparency */
  transparent?: boolean;
  /** Enables charts patterns that enhances charts accessibility */
  patterns?: PatternsConfig;
};

export type DistributionHoverProps = BoxProps;
type Hover = IntergalacticD3Component<'rect', DistributionHoverProps, Context>;
export type DistributionAnnotationProps = BoxProps;
type Annotation = IntergalacticD3Component<'foreignObject', DistributionAnnotationProps, Context>;
export type DistributionLabelProps = BoxProps;
type Label = IntergalacticD3Component<'div', DistributionLabelProps, Context>;
export type DistributionPercentProps = BoxProps;
export type DistributionPercentContext = { formatted: string; percent: number };
type Percent = IntergalacticD3Component<
  'div',
  DistributionPercentProps,
  Context & DistributionPercentContext
>;
export type DistributionValueProps = BoxProps;
export type DistributionValueContext = { formatted: string; value: number };
type Value = IntergalacticD3Component<
  'div',
  DistributionValueProps,
  Context & DistributionValueContext
>;
export type DistributionBarBarProps = {};
type Bar = IntergalacticD3Component<'g', DistributionBarBarProps, Context>;
export type DistributionBarBackgroundProps = BoxProps;
type Background = IntergalacticD3Component<'rect', BackgroundProps, Context>;
export type DistributionBarFillProps = BoxProps & {
  patterns?: PatternsConfig;
  color?: string;
  transparent?: boolean;
  hide?: boolean;
};
type Fill = IntergalacticD3Component<'rect', DistributionBarFillProps, Context>;

declare const DistributionBar: IntergalacticD3Component<'g', DistributionBarProps, BarContext> & {
  Hover: Hover;
  Annotation: Annotation;
  Label: Label;
  Percent: Percent;
  Value: Value;
  Bar: Bar & {
    Background: Background;
    Fill: Fill;
  };
  Tooltip: TooltipType<{
    /** Index in `data` array of the current items */
    index: number;
  }>;
};

export default DistributionBar;
