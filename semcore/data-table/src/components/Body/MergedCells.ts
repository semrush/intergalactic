export class MergedRowsCell {
  public readonly value: any;
  public readonly fromRow: number;
  public readonly toRow: number;

  constructor(value: any, rows: [number, number]) {
    this.value = value;
    this.fromRow = rows[0];
    this.toRow = rows[1];
  }
}

export class MergedColumnsCell {
  public readonly value: any;
  public readonly columnsCount: number;
  public readonly columnName: string;

  constructor(value: any, options: {size: number; columnName: string}) {
    this.value = value;
    this.columnsCount = options.size;
    this.columnName = options.columnName;
  }
}
