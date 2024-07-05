import React from 'react';
import { UnknownProperties } from '@semcore/core';
import { Context } from './context';
import { BarContext, BackgroundProps } from './Bar';
import { IntergalacticD3Component } from './Plot';
import { PatternsConfig } from './Pattern';
import { BoxProps } from '@semcore/flex-box';
import { TooltipType } from './Tooltip';

export type CigarettePackProps = Context & {
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

export type CigarettePackHoverProps = BoxProps;
type Hover = IntergalacticD3Component<'rect', CigarettePackHoverProps, Context>;
export type CigarettePackAnnotationProps = BoxProps;
type Annotation = IntergalacticD3Component<'foreignObject', CigarettePackAnnotationProps, Context>;
export type CigarettePackLabelProps = BoxProps;
type Label = IntergalacticD3Component<'div', CigarettePackLabelProps, Context>;
export type CigarettePackPercentProps = BoxProps;
export type CigarettePackPercentContext = { formatted: string; percent: number };
type Percent = IntergalacticD3Component<
  'div',
  CigarettePackPercentProps,
  Context & CigarettePackPercentContext
>;
export type CigarettePackValueProps = BoxProps;
export type CigarettePackValueContext = { formatted: string; value: number };
type Value = IntergalacticD3Component<
  'div',
  CigarettePackValueProps,
  Context & CigarettePackValueContext
>;
export type CigarettePackBarProps = {};
type Bar = IntergalacticD3Component<'g', CigarettePackBarProps, Context>;
export type CigarettePackBackgroundProps = BoxProps;
type Background = IntergalacticD3Component<'rect', BackgroundProps, Context>;
export type CigarettePackFillProps = BoxProps & {
  patterns?: PatternsConfig;
  color?: string;
  transparent?: boolean;
  hide?: boolean;
};
type Fill = IntergalacticD3Component<'rect', CigarettePackFillProps, Context>;

declare const CigarettePack: IntergalacticD3Component<'g', CigarettePackProps, BarContext> & {
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

export default CigarettePack;
