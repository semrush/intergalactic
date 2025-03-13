import { Intergalactic } from '@semcore/core';

/**
 * Datatable must have an accessible name (aria-table-name).
 * It should describe table content.
 */
type DataTableAriaProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  title?: string;
}>;

export type DTKey = string;
export type DTValue = string | number;
export type DataTableData = Array<Record<DTKey, any>>;

export type DataTableProps = DataTableAriaProps & {
  data: DataTableData;
  totalRows?: number;
};

export type RowIndex = number;
export type ColIndex = number;
