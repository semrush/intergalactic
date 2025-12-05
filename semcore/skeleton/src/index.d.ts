import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { UniqueIDProps } from '@semcore/core/lib/utils/uniqueID';

export type SkeletonProps = BoxProps &
  UniqueIDProps & {
    /**
     *  Skeleton visibility control property
     */
    hidden?: boolean;
    /**
     * Animation speed in ms
     * @default 2000
     */
    duration?: string | number;
    /**
     * Skeleton theme
     * @default invert
     */
    theme?: 'dark' | 'invert';
    /** Specifies the locale for i18n support */
    locale?: string;
    /**
     * Enable ResizeObserver for parent Element to recalculate skeleton size.
     * @default false
     */
    observeParentSize?: boolean;
  };

export type SkeletonCtx = {
  gradientUrl: 'string';
};

export type SkeletonTextProps = BoxProps & {
  /**
   * Number of items to be returned
   * @default 1
   */
  amount?: string | number;
};

export type AreaChartSkeletonProps = SkeletonProps & {
  /** Controls the area curve interpolation style for the skeleton pattern */
  type?: 'linear' | 'monotone';
};

export type BarChartSkeletonProps = SkeletonProps & {
  /** Controls the orientation of the bar chart skeleton */
  layout?: 'horizontal' | 'vertical';
};

export type HistogramChartSkeletonProps = SkeletonProps & {
  /** Controls the orientation of the histogram chart skeleton */
  layout?: 'horizontal' | 'vertical';
};

export type LineChartSkeletonProps = SkeletonProps & {
  /** Controls the line interpolation style for the skeleton pattern */
  type?: 'linear' | 'monotone';
};

export type DonutChartSkeletonProps = SkeletonProps & {
  /** Semi donut */
  halfsize?: boolean;
};

declare const Skeleton: Intergalactic.Component<'svg', SkeletonProps, SkeletonCtx> & {
  Text: Intergalactic.Component<'rect', SkeletonTextProps>;
};
declare const AreaChartSkeleton: Intergalactic.Component<'svg', AreaChartSkeletonProps>;
declare const BarChartSkeleton: Intergalactic.Component<'svg', BarChartSkeletonProps>;
declare const HistogramChartSkeleton: Intergalactic.Component<'svg', HistogramChartSkeletonProps>;
declare const LineChartSkeleton: Intergalactic.Component<'svg', LineChartSkeletonProps>;
declare const DonutChartSkeleton: Intergalactic.Component<'svg', DonutChartSkeletonProps>;
declare const VennChartSkeleton: typeof Skeleton;
declare const BubbleChartSkeleton: typeof Skeleton;
declare const ScatterPlotChartSkeleton: typeof Skeleton;
declare const RadialTreeChartSkeleton: typeof Skeleton;
declare const CompactHorizontalBarChartSkeleton: typeof Skeleton;

export default Skeleton;
export {
  AreaChartSkeleton,
  BarChartSkeleton,
  HistogramChartSkeleton,
  LineChartSkeleton,
  DonutChartSkeleton,
  VennChartSkeleton,
  BubbleChartSkeleton,
  ScatterPlotChartSkeleton,
  RadialTreeChartSkeleton,
  CompactHorizontalBarChartSkeleton,
};
