import type { Intergalactic } from '@semcore/core';

import type { NSSkeleton } from '../../Skeleton.type';

declare namespace NSSkeletonLineChart {
    type Props = NSSkeleton.Props & {
      /** Controls the line interpolation style for the skeleton pattern */
      type?: 'linear' | 'monotone';
    };
    type Component = Intergalactic.Component<'svg', Props>;
}

/** @deprecated It will be removed in v18. */
export type LineChartSkeletonProps = NSSkeletonLineChart.Props;

export type { NSSkeletonLineChart };
