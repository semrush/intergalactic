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

export type DTKey = string;
export type DTValue = string | number;
export type DataTableData = Array<Record<DTKey, any>>;

export type DTUse = 'primary' | 'secondary';

type Sizes = Extract<BoxProps, 'w' | 'wMax' | 'wMin' | 'h' | 'hMax' | 'hMin'>;

export type DataTableProps = DataTableAriaProps & {
  data: DataTableData;
  totalRows?: number;

  /**
   * @default 'primary'
   */
  use?: DTUse;

  /**
   *
   * @default auto
   */
  defaultGridTemplateColumnWidth?: 'auto' | '1fr';

  /**
   * Flag for compact view (less paddings)
   */
  compact?: boolean;
};

export type RowIndex = number;
export type ColIndex = number;
