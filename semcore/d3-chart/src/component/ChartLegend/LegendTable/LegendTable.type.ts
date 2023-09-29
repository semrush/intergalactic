import { Intergalactic } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import {
  LegendItem,
  LegendItemKey,
  LegendItemProps,
  LegendItemType,
} from '../LegendItem/LegendItem.type';
import React from 'react';
import { LegendProps, LSize } from '../BaseLegend.type';

export type LegendTableProps = LegendProps & {
  /**
   * Legend items
   */
  items: Record<LegendItemKey, Omit<LegendItem, 'id'> & { columns: Array<React.ReactNode> }>;
};

export type LegendColumnProps = {
  index: number;
  size: LSize;
};

export type LegendTableType = Intergalactic.Component<typeof Box, LegendTableProps> & {
  LegendItem: LegendItemType;
  Column: Intergalactic.Component<typeof Box, LegendColumnProps>;
};
