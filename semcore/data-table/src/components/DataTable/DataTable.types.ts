import { Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/base-components';
import type { Column } from '../../types';

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
export type DataTableSort<Column = string> = [sortBy: Column, sortDirection: SortDirection];

export type DTKey = string;
export type DTValue = string | number;
export type DataTableData = Array<Record<DTKey, any>>;

export type DTUse = 'primary' | 'secondary';

type Sizes = Pick<BoxProps, 'w' | 'wMax' | 'wMin' | 'h' | 'hMax' | 'hMin'>;

export type DataTableProps = DataTableAriaProps &
  Sizes & {
    /** Data for table */
    data: DataTableData;
    /** Count of total rows if table using virtual scroll. Needs for accessibility */
    totalRows?: number;

    /** Table theme according to visual hierarchy on the page
     * @default primary
     * */
    use?: DTUse;

    /** Active sort object */
    sort?: DataTableSort;
    /** Handler call when request will change sort */
    onSortChange?: (sort: DataTableSort, e?: React.SyntheticEvent) => void;

    /**
     *
     * @default auto
     */
    defaultGridTemplateColumnWidth?: 'auto' | '1fr';

    /**
     * Flag for compact view (less paddings)
     */
    compact?: boolean;

    /**
     * Flag for showing spinner on table body
     */
    loading?: boolean;
  };

export type RowIndex = number;
export type ColIndex = number;
