import type { Intergalactic } from '@semcore/core';
import type { Box } from '@semcore/flex-box';
import type { LegendItem, LegendItemType } from '../LegendItem/LegendItem.type';
import type React from 'react';
import type { LegendProps, LSize } from '../BaseLegend.type';

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
