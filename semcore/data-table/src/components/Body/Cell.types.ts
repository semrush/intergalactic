import type { Intergalactic } from '@semcore/core';
import type { CSSProperties, HTMLAttributes } from 'react';

import type { BodyPropsInner } from './Body.types';
import type { DTRow, DTRows } from './Row.types';
import type { DataTableData, DTUse } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type Theme = 'muted' | 'info' | 'success' | 'warning' | 'danger';

export type DataTableCellProps<Data extends DataTableData, UniqKeyType> = Intergalactic.InternalTypings.EfficientOmit<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
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

  accordionRowIndex?: number;
  rows: DTRows<UniqKeyType>;
  use: DTUse;

  style?: CSSProperties;

  virtualScroll: boolean;
  gridContainerRef: React.RefObject<HTMLDivElement>;
  accordionDuration?: number | [number, number];
  onClick: (e: React.SyntheticEvent<HTMLElement>, opt: { rowIndex: number; colIndex: number; row?: DTRow<UniqKeyType> }) => void;
  flatRows: DTRow<UniqKeyType>[];
  shadowVertical?: BodyPropsInner<Data, UniqKeyType>;
  withoutBorder?: boolean;
} & {
  'data-aria-level'?: number;
};
