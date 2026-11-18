import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type EventEmitter from '@semcore/core/lib/utils/eventEmitter';

import type { ScoreBarChartDataItem, ScoreBarChartProps, ScoreBarEvents } from './ScoreBarChart.type';

export type ScoreBarItemTypeProps = {
  uid: string;
  index: number;
  item: ScoreBarChartDataItem;
  totalValue: number;
  mode: ScoreBarChartProps['mode'];
  duration: number;
  color: string;
  locale: ScoreBarChartProps['locale'];

  valueFormatter: (value?: unknown) => string;
  titleFormatter?: (title?: string) => string;
  onClick: ScoreBarChartProps['onClickItem'];
  eventEmitter: EventEmitter<ScoreBarEvents>;
};

export type ScoreBarItemType = Intergalactic.Component<typeof Flex, ScoreBarItemTypeProps>;
