import type { Intergalactic } from '@semcore/core';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import type { makeDataHintsHandlers } from '../../a11y/hints';

declare namespace NSGrid {
  type Props = {
    scale: [ScaleBand<any> | ScaleLinear<any, any> | ScaleTime<any, any>, ScaleBand<any> | ScaleLinear<any, any> | ScaleTime<any, any>];
    orientation: 'vertical' | 'horizontal';
    dataHintsHandler: ReturnType<typeof makeDataHintsHandlers>;
    ticksCount?: number;
  };

  type Component = Intergalactic.Component<'line', Props>;
}

export {
  type NSGrid,
};
