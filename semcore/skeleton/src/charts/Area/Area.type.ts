import type { Intergalactic } from '@semcore/core';

import type { NSSkeleton } from '../../Skeleton.type';

declare namespace NSSkeletonAreaChart {
    type Props = NSSkeleton.Props & {
      /** Controls the area curve interpolation style for the skeleton pattern */
      type?: 'linear' | 'monotone';
    };
    type Component = Intergalactic.Component<'svg', Props>;
}

/** @deprecated It will be removed in v18. */
export type AreaChartSkeletonProps = NSSkeletonAreaChart.Props;

export type { NSSkeletonAreaChart };
