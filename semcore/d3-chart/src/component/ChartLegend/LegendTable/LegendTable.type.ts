import type { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type React from 'react';

import type { LegendProps, LSize } from '../BaseLegend.type';
import type { LegendItem, LegendItemType } from '../LegendItem/LegendItem.type';

export type LegendTableProps = Intergalactic.InternalTypings.EfficientOmit<LegendProps, 'items'> & {
  /**
   * Legend items
   */
  items: Array<LegendItem & { columns: Array<React.ReactNode> }>;
};

export type LegendTableDefaultProps = {
  children: React.JSX.Element;
};

export type LegendColumnProps = {
  index: number;
  size: LSize;
};

export type LegendTableType = Intergalactic.Component<typeof Box, LegendTableProps> & {
  LegendItem: LegendItemType;
  Column: Intergalactic.Component<typeof Box, Partial<LegendColumnProps>>;
};
