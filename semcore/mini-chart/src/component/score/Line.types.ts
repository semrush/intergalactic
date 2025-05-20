import { Intergalactic, ComponentType } from '@semcore/core';
import { CommonScoreProps } from './Score';
import React from 'react';
import { BoxProps, Box } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type SegmentColor = `chart-palette-order-${Range<1, 24>}`;

export type SegmentProps = {
  value: number;
  /**
   * Color of value
   */
  color: SegmentColor;
};

type SegmentComponent = React.FC<SegmentProps>;

export type InnerSegmentProps = SegmentProps & {
  styles: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
};

type ValuedScoreProps = {
  /**
   * Value of score (in percents from 0 to 100) or count of selected segments (for Line with segments)
   */
  value: number;
  /**
   * Color of value
   */
  color?: SegmentColor;
  /**
   * Count of line segments
   */
  segments?: number;
  /**
   * We don't accept children in this way
   */
  children?: never;
};

type CustomRenderScoreProps = {
  children: SegmentComponent[];
};

export type ScoreLineGaugeProps = BoxProps &
  Intergalactic.InternalTypings.EfficientOmit<CommonScoreProps, 'value' | 'color'> &
  (ValuedScoreProps | CustomRenderScoreProps);

export type Enhances = {
  resolveColor: ReturnType<typeof resolveColorEnhance>;
};

export type ScoreLineComponent = ComponentType<ScoreLineGaugeProps, {}, {}, Enhances> & {
  Segment: Intergalactic.Component<typeof Box, SegmentProps>;
};
