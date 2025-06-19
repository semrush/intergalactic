import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Tooltip from '@semcore/tooltip';

import type { ACCORDION, ROW_GROUP, UNIQ_ROW_KEY } from './DataTable';
import type { DataTableBodyProps } from '../Body/Body.types';
import type { DTRow } from '../Body/Row.types';
import type { DataTableColumnProps } from '../Head/Column.types';

/**
 * Datatable must have an accessible name (aria-table-name).
 * It should describe table content.
 */
export type DataTableAriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'title'?: string;
}>;

export type SortDirection = 'asc' | 'desc';
export type DataTableSort<Column> = [sortBy: Column, sortDirection: SortDirection];

export type DataTableChangeSort<Column> = (
  sort: [sortBy: Column, sortDirection: SortDirection],
  e?: React.SyntheticEvent,
) => void;

export type DataRowItem = {
  [key: string]: DTValue | undefined | null;
  [ACCORDION]?: React.ReactNode | DataTableData;
  [ROW_GROUP]?: DataTableData;
  [UNIQ_ROW_KEY]?: string;
};
export interface DTValue {
  toString(): string;
  [ACCORDION]?: React.ReactNode | DataTableData;
}
export type DataTableData = DataRowItem[];

export type DTUse = 'primary' | 'secondary';

export type Sizes = Pick<BoxProps, 'w' | 'wMax' | 'wMin' | 'h' | 'hMax' | 'hMin'>;

export type DataTableProps<D extends DataTableData> = DataTableAriaProps &
  Sizes & {
    /** Data for table */
    data: D;
    /** Count of total rows if table using virtual scroll. Needs for accessibility */
    totalRows?: number;

    /** Table theme according to visual hierarchy on the page
     * @default primary
     * */
    use?: DTUse;

    /** Active sort object */
    sort?: DataTableSort<keyof D[0]>;
    /** Handler call when request will change sort */
    onSortChange?: DataTableChangeSort<keyof D[0]>;

    /**
     * Value to describe width for each column. Could be overridden in the column.gtcWidth property.
     * Use `auto` to automatically fit the table to the content,
     * `1fr` for equal-width columns or any other value for the grid-template-column css property.
     * @default auto
     */
    defaultGridTemplateColumnWidth?: string;

    /**
     * Flag for compact view (fewer paddings)
     */
    compact?: boolean;

    /**
     * Size of paddings for the first and last columns in the table
     */
    sideIndents?: 'wide';

    /**
     * Flag for showing spinner on table body
     */
    loading?: boolean;

    children?: never;

    /**
     * Set of expanded rows (uniq id from them)
     */
    expandedRows?: Set<string>;

    virtualScroll?: VirtualScroll;

    columns: ColumnsConfig;

    headerProps?: {
      /**
       * Sticky header
       * @default false
       */
      sticky?: boolean;

      /**
       * Height of header in px. It's better to set it to improve performance with sticky header.
       */
      h?: number;

      /**
       * offset for sticky header
       */
      top?: number;

      /** Enable scroll bar element in header */
      withScrollBar?: boolean;
    };

    rowProps?: DataTableBodyProps['rowProps'];

    renderCell?: DataTableBodyProps['renderCell'];

    /**
     * List of selected rows (indexes from data array)
     */
    selectedRows?: number[];

    onSelectedRowsChange?: (
      selectedRows: number[],
      event?: React.SyntheticEvent<HTMLElement>,
      opts?: {
        selectedRowIndex: number;
        isSelected: boolean;
        row: DTRow;
      },
    ) => void;

    /**
     * For custom empty data widget.
     */
    renderEmptyData?: () => React.ReactNode;

    /**
     * Duration for collapse/expand accordion rows in tables in ms.
     * @default 200
     */
    accordionDuration?: number | [number, number];
  };

export type ColumnItemConfig = Intergalactic.InternalTypings.EfficientOmit<
  Intergalactic.InternalTypings.ComponentProps<
    'div' | typeof Tooltip,
    'div',
    DataTableColumnProps,
    {},
    []
  >,
  'children'
> & {
  children: React.ReactNode | React.FC;
};

export type ColumnGroupConfig = {
  /**
   * Necessary to set a unique name for a group. (It will use as a React key).
   */
  name: string;

  borders?: 'both' | 'left' | 'right';

  fixed?: 'left' | 'right';

  children: React.ReactNode;

  columns: ColumnItemConfig[];
};

type ColumnsConfig = Array<ColumnItemConfig | ColumnGroupConfig>;

export type VirtualScroll =
  | boolean
  | { rowsBuffer?: number; aproxRowsOnPage?: number }
  | { rowHeight: number; rowsBuffer?: number };

export type RowIndex = number;
export type ColIndex = number;

export type DataTableType = (<Data extends DataTableData, Tag extends Intergalactic.Tag = 'div'>(
  props: Intergalactic.InternalTypings.EfficientOmit<
    Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableProps<Data>>,
    'tag' | 'children'
  >,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableProps<any>>;
