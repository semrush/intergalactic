import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import type { makeDataHintsContainer } from '../../a11y/hints';
import type { ChartMetaData } from '../../ChartMetaData';
import type { ListData } from '../Chart/AbstractChart.type';

export type HoverLineProps = {
  data: ListData;
  x: keyof HoverLineProps['data'][number];
  y: keyof HoverLineProps['data'][number];
  scale: [ScaleBand<any> | ScaleTime<any, any> | ScaleLinear<any, any>, ScaleBand<any> | ScaleTime<any, any> | ScaleLinear<any, any>];
  meta: ChartMetaData;
  xIndex: number | null;
  yIndex: number | null;
  hideTickHover?: boolean;
  dataHints: ReturnType<makeDataHintsContainer>;
  formatValue: (value: unknown) => string | [((value: unknown) => string), ((value: unknown) => string)];
};
