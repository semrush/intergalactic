import type { DTRows } from './Row.types';

export class MergedRowsCell {
  public readonly value: any;
  public readonly rowsCount: number;
  public readonly accordion?: React.ReactNode | DTRows<any>;

  constructor(value: any, rowsCount: number, accordion?: React.ReactNode | DTRows<any>) {
    this.value = value;
    this.rowsCount = rowsCount;
    this.accordion = accordion;
  }
}

export class MergedColumnsCell {
  public readonly value: any;
  public readonly columnsCount: number;
  public readonly dataKey: string;
  public readonly accordion?: React.ReactNode | DTRows<any>;

  constructor(
    value: any,
    options: { size: number; dataKey: string },
    accordion?: React.ReactNode | DTRows<any>,
  ) {
    this.value = value;
    this.columnsCount = options.size;
    this.dataKey = options.dataKey;
    this.accordion = accordion;
  }
}
