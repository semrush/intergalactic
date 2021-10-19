import { IBoxProps } from '@semcore/flex-box';
import { IUniqueIDProps } from '@semcore/utils/lib/uniqueID';
import { CProps, ReturnEl } from '@semcore/core';

export interface ISkeletonProps extends IBoxProps, IUniqueIDProps {
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
}

export interface ISkeletonCtx {
  gradientUrl: 'string';
}

export interface ISkeletonTextProps extends IBoxProps {
  /**
   * Number of items to be returned
   * @default 1
   */
  amount?: string | number;
}

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

declare const Skeleton: (<T>(props: CProps<ISkeletonProps & T, ISkeletonCtx>) => ReturnEl) & {
  Text: <T>(props: ISkeletonTextProps & T) => ReturnEl;
};
declare const AreaChartSkeleton: <T>(props: AreaChartSkeletonProps & T) => ReturnEl;
declare const BarChartSkeleton: <T>(props: BarChartSkeletonProps & T) => ReturnEl;
declare const HistogramChartSkeleton: <T>(props: HistogramChartSkeletonProps & T) => ReturnEl;
declare const LineChartSkeleton: <T>(props: LineChartSkeletonProps & T) => ReturnEl;
declare const PieChartSkeleton: typeof Skeleton;
declare const VennChartSkeleton: typeof Skeleton;

export default Skeleton;
export {
  AreaChartSkeleton,
  BarChartSkeleton,
  HistogramChartSkeleton,
  LineChartSkeleton,
  PieChartSkeleton,
  VennChartSkeleton,
};
