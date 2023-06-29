import { BoxProps } from '@semcore/flex-box';
import { Intergalactic, UnknownProperties } from '@semcore/core';
import { UniqueIDProps } from '@semcore/utils/lib/uniqueID';

/** @deprecated */
export interface ISkeletonProps extends SkeletonProps, UnknownProperties {}
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
  };

/** @deprecated */
export interface ISkeletonCtx extends SkeletonCtx, UnknownProperties {}
export type SkeletonCtx = {
  gradientUrl: 'string';
};

/** @deprecated */
export interface ISkeletonTextProps extends SkeletonTextProps, UnknownProperties {}
export type SkeletonTextProps = BoxProps & {
  /**
   * Number of items to be returned
   * @default 1
   */
  amount?: string | number;
};

export interface AreaChartSkeletonProps extends ISkeletonProps {
  type?: 'linear' | 'monotone';
}

export interface BarChartSkeletonProps extends ISkeletonProps {
  layout?: 'horizontal' | 'vertical';
}

export interface HistogramChartSkeletonProps extends ISkeletonProps {
  layout?: 'horizontal' | 'vertical';
}

export interface LineChartSkeletonProps extends ISkeletonProps {
  type?: 'linear' | 'monotone';
}

declare const Skeleton: Intergalactic.Component<'svg', SkeletonProps, SkeletonCtx> & {
  Text: Intergalactic.Component<'rect', SkeletonTextProps>;
};
declare const AreaChartSkeleton: Intergalactic.Component<'svg', AreaChartSkeletonProps>;
declare const BarChartSkeleton: Intergalactic.Component<'svg', BarChartSkeletonProps>;
declare const HistogramChartSkeleton: Intergalactic.Component<'svg', HistogramChartSkeletonProps>;
declare const LineChartSkeleton: Intergalactic.Component<'svg', LineChartSkeletonProps>;
declare const PieChartSkeleton: typeof Skeleton;
declare const VennChartSkeleton: typeof Skeleton;
declare const BubbleChartSkeleton: typeof Skeleton;
declare const ScatterPlotChartSkeleton: typeof Skeleton;
declare const RadialTreeChartSkeleton: typeof Skeleton;

export default Skeleton;
export {
  AreaChartSkeleton,
  BarChartSkeleton,
  HistogramChartSkeleton,
  LineChartSkeleton,
  PieChartSkeleton,
  VennChartSkeleton,
  BubbleChartSkeleton,
  ScatterPlotChartSkeleton,
  RadialTreeChartSkeleton,
};
