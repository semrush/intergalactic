import type { Intergalactic } from '@semcore/core';

import type { NSSkeleton } from '../../Skeleton.type';

declare namespace NSSkeletonDonutChart {
    type Props = NSSkeleton.Props & {
      /** Semi donut */
      halfsize?: boolean;
    };
    type Component = Intergalactic.Component<'svg', Props>;
}

/** @deprecated It will be removed in v19. */
export type DonutChartSkeletonProps = NSSkeletonDonutChart.Props;

export type { NSSkeletonDonutChart };
