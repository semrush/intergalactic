import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import { MergedRowsCell } from '@semcore/ui/data-table';

import type { DTRow } from '../components/Body/Row.types';
import { UNIQ_ROW_KEY } from '../components/DataTable/DataTable';

export interface ISelectedRows<UniqKeyType> {
  /** Flag for multiple rows selection */
  isPressedShift: boolean;
  /** Method for set keys from data. Call it in DataTable, on data changes */
  setAvailableKeys(keys: UniqKeyType[]): void;

  /** Get the list of keys */
  get(): UniqKeyType[];

  /** Check if the row is selected */
  isChecked(key: UniqKeyType): boolean;

  /** Replace the list of keys.  */
  replace(value: UniqKeyType[]): void;

  /** Check if the key exists in selected rows */
  has(value: UniqKeyType): boolean;

  /** Select all handler */
  selectAll(): void;

  /** Clear all handler */
  clearAll(): void;

  /** Toggle selection of row */
  toggle(selected: boolean, row: DTRow<UniqKeyType>): void;

  /** Check if all rows selected */
  isAllSelected(): boolean;

  /** Check if at least one row selected */
  isIndeterminate(): boolean;

  /** Subscribe to changes */
  subscribe: EventEmitter['subscribe'];
}

export class SelectableRows<UniqRowKeyType> extends EventEmitter implements ISelectedRows<UniqRowKeyType> {
  private readonly values: Set<UniqRowKeyType>;

  private availableKeys = new Set<UniqRowKeyType>();

  private lastSelectedRow: UniqRowKeyType | null = null;

  public static TOGGLE_EVENT = 'toggle_selected_row';
  public static SELECT_ALL_EVENT = 'select_all_selected_rows';

  public isPressedShift: boolean = false;

  constructor(initValues: UniqRowKeyType[] = []) {
    super();

    this.values = new Set<UniqRowKeyType>(initValues);
  }

  public setAvailableKeys(value: UniqRowKeyType[]): void {
    this.availableKeys = new Set(value);
  }

  public get() {
    return Array.from(this.values.keys());
  }

  public isChecked(key: UniqRowKeyType): boolean {
    return this.values.has(key);
  }

  public replace(value: UniqRowKeyType[]): void {
    this.clearAll();

    value.forEach((val) => {
      this.values.add(val);

      this.emit(SelectableRows.TOGGLE_EVENT, val);
    });
  }

  public has(value: UniqRowKeyType): boolean {
    return this.values.has(value);
  }

  public isAllSelected(): boolean {
    let isAllSelected = true;

    if (this.availableKeys.size === 0 || this.values.size === 0) {
      return false;
    }

    for (const key of this.availableKeys.values()) {
      if (!this.values.has(key)) {
        isAllSelected = false;
        break;
      }
    }

    return isAllSelected;
  }

  public isIndeterminate(): boolean {
    let isIndeterminate = false;

    for (const key of this.availableKeys.values()) {
      if (this.values.has(key)) {
        isIndeterminate = true;
        break;
      }
    }

    return isIndeterminate;
  }

  public selectAll(): void {
    for (const key of this.availableKeys.values()) {
      this.values.add(key);
      this.emit(SelectableRows.TOGGLE_EVENT, key);
    }

    this.emit(SelectableRows.SELECT_ALL_EVENT);
  }

  public clearAll(): void {
    for (const key of this.availableKeys.values()) {
      this.values.delete(key);
      this.emit(SelectableRows.TOGGLE_EVENT, key);
    }

    this.emit(SelectableRows.SELECT_ALL_EVENT);
  }

  public toggle(selected: boolean, row: DTRow<UniqRowKeyType>): void {
    if (this.isPressedShift && this.values.size > 0 && this.lastSelectedRow && (selected ? this.values.has(this.lastSelectedRow) : true)) {
      let select = false;

      for (const item of this.availableKeys.values()) {
        if (!select && (item === row[UNIQ_ROW_KEY] || item === this.lastSelectedRow)) {
          select = true;
          this.toggleOneRow(selected, item);
          continue;
        }

        if (select) {
          this.toggleOneRow(selected, item);
        }

        if (select && (item === row[UNIQ_ROW_KEY] || item === this.lastSelectedRow)) {
          break;
        }
      }
    } else {
      this.toggleOneRow(selected, row[UNIQ_ROW_KEY]);
    }

    this.lastSelectedRow = row[UNIQ_ROW_KEY];
  }

  private toggleOneRow(isSelected: boolean, key: UniqRowKeyType): void {
    if (isSelected) {
      if (this.values.size === 0) {
        this.emit(SelectableRows.SELECT_ALL_EVENT);
      }

      this.values.add(key);

      if (this.values.size === this.availableKeys.size) {
        this.emit(SelectableRows.SELECT_ALL_EVENT);
      }
    } else {
      if (this.values.size === this.availableKeys.size) {
        this.emit(SelectableRows.SELECT_ALL_EVENT);
      }

      this.values.delete(key);

      if (this.values.size === 0) {
        this.emit(SelectableRows.SELECT_ALL_EVENT);
      }
    }

    this.emit(SelectableRows.TOGGLE_EVENT, key);
  }
}
