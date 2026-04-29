import type { Intergalactic } from '@semcore/core';

import type { NSSkeleton } from '../../Skeleton.type';

declare namespace NSSkeletonBarChart {
    type Props = NSSkeleton.Props & {
      /** Controls the orientation of the bar chart skeleton */
      layout?: 'horizontal' | 'vertical';
    };
    type Component = Intergalactic.Component<'svg', Props>;
}

/** @deprecated It will be removed in v18. */
export type BarChartSkeletonProps = NSSkeletonBarChart.Props;

export type { NSSkeletonBarChart };
