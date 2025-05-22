import { DataTableData } from '../DataTable/DataTable.types';
import { ACCORDION } from '@semcore/data-table';

export class MergedRowsCell {
  public readonly value: any;
  public readonly rowsCount: number;
  public readonly [ACCORDION]?: React.ReactNode | DataTableData;

  constructor(value: any, rowsCount: number, accordion?: React.ReactNode | DataTableData) {
    this.value = value;
    this.rowsCount = rowsCount;
    this[ACCORDION] = accordion;
  }
}

export class MergedColumnsCell {
  public readonly value: any;
  public readonly columnsCount: number;
  public readonly dataKey: string;
  public readonly [ACCORDION]?: React.ReactNode | DataTableData;

  constructor(
    value: any,
    options: { size: number; dataKey: string },
    accordion?: React.ReactNode | DataTableData,
  ) {
    this.value = value;
    this.columnsCount = options.size;
    this.dataKey = options.dataKey;
    this[ACCORDION] = accordion;
  }
}
