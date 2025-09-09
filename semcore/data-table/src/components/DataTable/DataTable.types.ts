import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Tooltip from '@semcore/tooltip';
import type * as React from 'react';

import type { ACCORDION, ROW_GROUP, UNIQ_ROW_KEY } from './DataTable';
import type { DataTableBodyProps, BodyPropsInner } from '../Body/Body.types';
import type { DTRow } from '../Body/Row.types';
import type { DataTableColumnProps } from '../Head/Column.types';
import type { DataTableHeadProps } from '../Head/Head.types';

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

export type DataTableProps<
  Data extends DataTableData,
  UniqKey extends keyof Data[number],
  UniqKeyType extends Data[number][UniqKey],
> = DataTableAriaProps &
  Sizes & {
    /** Data for table */
    data: Data;
    /** Count of total rows if table using virtual scroll. Needs for accessibility */
    totalRows?: number;

    /** Table theme according to visual hierarchy on the page
     * @default primary
     * */
    use?: DTUse;

    /** Active sort object */
    sort?: DataTableSort<keyof Data[0]>;
    /** Handler call when request will change sort */
    onSortChange?: DataTableChangeSort<keyof Data[0]>;

    /**
     * Value to describe width for each column. Could be overridden in the column.gtcWidth property.
     * Use `auto` to automatically fit the table to the content,
     * `1fr` for equal-width columns or any other value for the grid-template-column css property.
     * @default auto
     */
    defaultGridTemplateColumnWidth?: string;

    /**
     * Flag for compact view (smaller horizontal paddings)
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
    expandedRows?: Set<UniqKeyType>;

    /** Configuration for virtual scroll */
    virtualScroll?: VirtualScroll;

    /** Configuration for table columns including headers, sorting, and layout */
    columns: ColumnsConfig;

    /** Configuration for sticky headers, height, scroll bars, etc. */
    headerProps?: DataTableHeadProps;

    /** Function to add custom props to rows */
    rowProps?: DataTableBodyProps<Data, UniqKeyType>['rowProps'];

    /** Custom cell renderer function */
    renderCell?: DataTableBodyProps<Data, UniqKeyType>['renderCell'];

    /**
     * Name of a unique key for each row data item
     */
    uniqueRowKey?: UniqKey;

    /**
     * List of selected rows (uniqIds from a data array)
     */
    selectedRows?: UniqKeyType[];

    /** Callback when row selection changes */
    onSelectedRowsChange?: (
      selectedRows: UniqKeyType[],
      event?: React.SyntheticEvent<HTMLElement>,
      opts?: {
        selectedRowIndex: number;
        isSelected: boolean;
        row: DTRow<UniqKeyType>;
      },
    ) => void;

    /**
     * For custom empty data widget.
     */
    renderEmptyData?: () => React.ReactNode;

    /**
     * For adding an overlay over table cells.
     */
    renderCellOverlay?: () => React.ReactNode;

    /**
     * Duration for collapse/expand accordion rows in tables in ms.
     * @default 200
     */
    accordionDuration?: number | [number, number];

    /**
     * Whether multiple accordion items can be open at a time, or only one.
     * @default 'independent'
     */
    accordionMode?: 'toggle' | 'independent';

    /**
     * Handle open/close accordion.
     * Work only with table-in-table accordions. In accordions with custom components use mount/unmount hooks in components.
     */
    onAccordionToggle?: (type: 'open' | 'close', uniqRowKey: UniqKeyType, rowIndex: number) => void;

    /**
     * Visual variant that adapts the table styling to different usage contexts
     * @default 'default'
     */
    variant?: 'default' | 'card';
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

export type DataTableType = (<
  Data extends DataTableData,
  UniqKey extends keyof Data[number] = keyof Data[number],
  UniqKeyType extends Data[number][UniqKey] = Data[number][UniqKey],
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.EfficientOmit<
    Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableProps<Data, UniqKey, UniqKeyType>>,
    'tag' | 'children'
  >
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableProps<any, any, any>>;
