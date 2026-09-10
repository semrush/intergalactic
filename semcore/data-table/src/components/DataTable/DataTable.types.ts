import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Tooltip from '@semcore/tooltip';
import type * as React from 'react';

import type { ACCORDION, ROW_GROUP, UNIQ_ROW_KEY } from './DataTable';
import type { ISelectedRows } from '../../store/SelectableRows';
import type { DataTableBodyProps } from '../Body/Body.types';
import type { DTRow, DataTableRowProps } from '../Body/Row.types';
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
  [ACCORDION]?: React.ReactNode;
}
export type DataTableData = DataRowItem[];

export type DTUse = 'primary' | 'secondary';

export type Sizes = Partial<Pick<NSBox.Props, 'w' | 'wMax' | 'wMin' | 'h' | 'hMax' | 'hMin'>>;

export type DataTableProps<
  Data extends DataTableData,
  UniqKey extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? keyof Data[number][typeof ROW_GROUP][number] : keyof Data[number]),
  UniqKeyType extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? Data[number][typeof ROW_GROUP][number][UniqKey] : Data[number][UniqKey]),
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
     * This is mutable! variable because of table performance. Don't change the link on it.
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
     * List of animated rows in accordion.
     * @default 20
     */
    accordionAnimationRows?: DataTableRowProps<Data, UniqKeyType>['accordionAnimationRows'];

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

    /** Defines a limit configuration */
    limit?: {
      /**
       * Start limit from this row
       * @default 0
       */
      fromRow?: number;
      /**
       * Start limit from this column
       * @default 0
       */
      fromColumn?: number;
      /** Limit overlay */
      renderOverlay: () => React.ReactNode;
    };

    /**
     * Visual variant that adapts the table styling to different usage contexts
     * @default 'default'
     */
    variant?: 'default' | 'card';

    /**
     * Handle change expanded rows
     */
    onExpandedRowsChange?: (expandedRows: Set<UniqKeyType>) => void;

    /**
   * Handling table container resizing.
   */
    onResize?: ResizeObserverCallback;
  } & ({
    /**
     * List of selected rows (uniqIds from a data array)
     * @deprecated use ISelectedRows for this property instead of an array.
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
      }
    ) => void;
  } | {
    /**
     * Entity of selected rows (uniq id from them)
     * This is mutable! variable because of table performance. Don't change the link on it.
     */
    selectedRows?: ISelectedRows<UniqKeyType>;
  });

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
   * Name of column for mapping with data.
   *
   * Necessary to set a unique name for a group. (It will use as a React key).
   *
   * Note: Column names cannot contain the "/" character as it is reserved
   * as a separator for merged columns. Column names are also used to generate
   * CSS variable names for grid layout, so they must be valid CSS identifiers.
   * Use letters, numbers, hyphens, and underscores only.
   */
  name: string;

  borders?: 'both' | 'left' | 'right';

  fixed?: 'left' | 'right';

  children: React.ReactNode;

  columns: ColumnItemConfig[];
};

export type ColumnsConfig = Array<ColumnItemConfig | ColumnGroupConfig>;

export type VirtualScroll =
  | boolean
  | { rowsBuffer?: number; aproxRowsOnPage?: number }
  | { rowHeight: number; rowsBuffer?: number };

export type RowIndex = number;
export type ColIndex = number;

export type DataTableType = (<
  Data extends DataTableData,
  UniqKey extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? keyof Data[number][typeof ROW_GROUP][number] : keyof Data[number]),
  UniqKeyType extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? Data[number][typeof ROW_GROUP][number][UniqKey] : Data[number][UniqKey]),
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.EfficientOmit<
    Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableProps<Data, UniqKey, UniqKeyType>>,
    'tag' | 'children'
  >
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableProps<any, any, any>>;
