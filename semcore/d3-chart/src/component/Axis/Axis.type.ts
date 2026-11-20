import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import type * as React from 'react';

import type { ElementRect } from '../../utils/ElementRect';
import type { ChartEvents, ListData } from '../Chart/AbstractChart/AbstractChart.type';

declare namespace NSAxis {

  type Props = NSBox.Props & {
    uid: string;
    eventEmitter: EventEmitter<ChartEvents>;
    scale: ScaleBand<any> | ScaleLinear<any, any> | ScaleTime<any, any>;
    valueFormatter: (value: unknown) => React.ReactNode;
    data: ListData;
    dataKey: keyof Props['data'][number];
    plotBoundaryRect: ElementRect;
    /**
     * @default true
     */
    hideTickHover?: boolean;
    /**
     * @default undefined'
     */
    ticksCount?: number;
    /**
     * @default false
     */
    primaryText?: boolean;
    /**
     * @default 'left'
     */
    yAxisPosition?: 'left' | 'right';
  };

  type DefaultProps = {
    yAxisPosition: 'left';
  };

  type State = {
    dataIndex: number;
  };

  type Component = Intergalactic.Component<'div', Props>;
}

export type {
  NSAxis,
};
