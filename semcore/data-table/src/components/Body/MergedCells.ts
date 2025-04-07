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

  constructor(value: any, size: number) {
    this.value = value;
    this.columnsCount = size;
  }
}
