export class MergedRowsCell {
  public readonly value: any;
  public readonly rowsCount: number;

  constructor(value: any, size: number) {
    this.value = value;
    this.rowsCount = size;
  }
}

export class MergedColumnsCell {
  public readonly value: any;
  public readonly columnsCount: number;

  constructor(value: any, size: number) {
    this.value = value;
    this.columnsCount = size;
  }
}
