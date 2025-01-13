import { Intergalactic } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { LegendItem, LegendItemType } from '../LegendItem/LegendItem.type';
import React from 'react';
import { LegendProps, LSize } from '../BaseLegend.type';

export type LegendTableProps = Intergalactic.InternalTypings.EfficientOmit<LegendProps, 'items'> & {
  /**
   * Legend items
   */
  items: Array<LegendItem & { columns: Array<React.ReactNode> }>;
};

export type LegendColumnProps = {
  index: number;
  size: LSize;
};

export type LegendTableType = Intergalactic.Component<typeof Box, LegendTableProps> & {
  LegendItem: LegendItemType;
  Column: Intergalactic.Component<typeof Box, Partial<LegendColumnProps>>;
};
