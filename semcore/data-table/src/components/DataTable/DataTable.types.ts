import { Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/base-components';
import { ACCORDION, ROW_GROUP } from './DataTable';
import { DTRow } from '../Body/Row.types';

/**
 * Datatable must have an accessible name (aria-table-name).
 * It should describe table content.
 */
type DataTableAriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  title?: string;
}>;

export type SortDirection = 'asc' | 'desc';
export type DataTableSort<Column> = [sortBy: Column, sortDirection: SortDirection];

export type DataTableChangeSort<Column> = (
  sort: [sortBy: Column, sortDirection: SortDirection],
  e?: React.SyntheticEvent,
) => void;

export type DataRowItem = {
  [key: string]: DTValue | undefined;
  [ACCORDION]?: React.ReactNode | DataTableData;
  [ROW_GROUP]?: DataTableData;
};
export interface DTValue {
  toString(): string;
  [ACCORDION]?: React.ReactNode | DataTableData;
}
export type DataTableData = DataRowItem[];

export type DTUse = 'primary' | 'secondary';

type Sizes = Pick<BoxProps, 'w' | 'wMax' | 'wMin' | 'h' | 'hMax' | 'hMin'>;

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
     *
     * @default auto
     */
    defaultGridTemplateColumnWidth?: 'auto' | '1fr';

    /**
     * Flag for compact view (fewer paddings)
     */
    compact?: boolean;

    /**
     * Flag for showing spinner on table body
     */
    loading?: boolean;

    children?: any;

    /**
     *
     */
    expandedRows?: number[];

    /**
     * List of selected rows (indexes from data array)
     */
    selectedRows?: number[];

    onSelectedRowsChange?: (
      selectedRows: number[],
      event?: React.SyntheticEvent<HTMLInputElement>,
      opts?: {
        selectedRowIndex: number;
        isSelected: boolean;
        row: DTRow;
      },
    ) => void;
  };

export type RowIndex = number;
export type ColIndex = number;

export type DataTableType = (<Data extends DataTableData, Tag extends Intergalactic.Tag = 'div'>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableProps<Data>>,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableProps<any>>;
