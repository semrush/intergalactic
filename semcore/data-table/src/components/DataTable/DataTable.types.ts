import { Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/base-components';

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

export type DTKey = string | symbol;
export type DTValue = string | number | boolean;
export type DataTableData = Array<Record<DTKey, any>>;

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
     * Flag for compact view (less paddings)
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
  };

export type RowIndex = number;
export type ColIndex = number;

export type DataTableType = (<Data extends DataTableData, Tag extends Intergalactic.Tag = 'div'>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableProps<Data>>,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
  Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableProps<any>>;
