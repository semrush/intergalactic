export class MergedRowsCell {
  public readonly value: any;
  public readonly rowsCount: number;

  constructor(value: any, rowsCount: number) {
    this.value = value;
    this.rowsCount = rowsCount;
  }
}

export class MergedColumnsCell {
  public readonly value: any;
  public readonly columnsCount: number;
  public readonly dataKey: string;

  constructor(value: any, options: { size: number; dataKey: string }) {
    this.value = value;
    this.columnsCount = options.size;
    this.dataKey = options.dataKey;
  }
}
