import type { Intergalactic } from '@semcore/ui/core';
import type * as React from 'react';

import type { DTRow, DTRows } from './Row.types';
import type { DTUse } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type Theme = 'muted' | 'info' | 'success' | 'warning' | 'danger';

export type DataTableCellProps<DataKeyType> = {
  id: string;
  accordionId: string;
  row: DTRow<DataKeyType>;
  rowIndex: number;
  column: DTColumn;
  columnIndex: number;
  gridRowIndex: number;
  children?: React.ReactNode;

  expanded?: boolean;
  withAccordion?: boolean;

  isAccordionRow?: boolean;
  animationExpand?: boolean;
  accordionRowIndex?: number;
  rows: DTRows<DataKeyType>;
};

export type CellPropsInner<DataKeyType> = {
  use: DTUse;

  virtualScroll: boolean;
  tableRef: React.RefObject<HTMLDivElement>;
  accordionDuration?: number | [number, number];
  onClick: (e: React.SyntheticEvent, opt: { rowIndex: number; colIndex: number; row?: DTRow<DataKeyType> }) => void;
};

export type DataTableCellType = (<DataKeyType, Tag extends Intergalactic.Tag = 'div'>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableCellProps<DataKeyType>>
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableCellProps<any>>;
