import type { Intergalactic } from '@semcore/core';

import type { NSSkeleton } from '../../Skeleton.type';

declare namespace NSSkeletonHistogramChart {
    type Props = NSSkeleton.Props & {
      /** Controls the orientation of the histogram chart skeleton */
      layout?: 'horizontal' | 'vertical';
    };
    type Component = Intergalactic.Component<'svg', Props>;
}

/** @deprecated It will be removed in v19. */
export type HistogramChartSkeletonProps = NSSkeletonHistogramChart.Props;

export type { NSSkeletonHistogramChart };
