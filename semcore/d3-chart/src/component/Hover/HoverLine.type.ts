import type { Intergalactic } from '@semcore/core';
import type EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import type { ChartEvents, ListData } from '../Chart/AbstractChart/AbstractChart.type';

declare namespace NSHoverLine {
  type Props = {
    data: ListData;
    scale: [ScaleBand<any> | ScaleTime<any, any> | ScaleLinear<any, any>, ScaleBand<any> | ScaleTime<any, any> | ScaleLinear<any, any>];
    uid: string;
    eventEmitter: EventEmitter<ChartEvents>;
    keyX?: keyof Props['data'][number];
    keyY?: keyof Props['data'][number];
    index?: number;
  };

  type UncontrolledProps = {
    index: number;
  };

  type DefaultProps = {
    defaultIndex: -1;
  };

  type Component = Intergalactic.Component<'line', Props>;
}

export {
  type NSHoverLine,
};
