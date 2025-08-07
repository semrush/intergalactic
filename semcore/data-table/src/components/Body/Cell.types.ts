import type { Intergalactic } from '@semcore/core';
import type * as React from 'react';

import type { BodyPropsInner } from './Body.types';
import type { DTRow, DTRows } from './Row.types';
import type { DTUse } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type Theme = 'muted' | 'info' | 'success' | 'warning' | 'danger';

export type DataTableCellProps<UniqKeyType> = {
  id: string;
  accordionId: string;
  row: DTRow<UniqKeyType>;
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
  rows: DTRows<UniqKeyType>;
};

export type CellPropsInner<UniqKeyType> = {
  use: DTUse;

  virtualScroll: boolean;
  tableRef: React.RefObject<HTMLDivElement>;
  accordionDuration?: number | [number, number];
  onClick: (e: React.SyntheticEvent, opt: { rowIndex: number; colIndex: number; row?: DTRow<UniqKeyType> }) => void;
  flatRows: DTRow<UniqKeyType>[];
  shadowVertical?: BodyPropsInner<UniqKeyType>;
  lastLeftFixedIndex: number;
  firstRightFixedIndex: number;
};

export type DataTableCellType = (<UniqKeyType, Tag extends Intergalactic.Tag = 'div'>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableCellProps<UniqKeyType>>
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableCellProps<any>>;
