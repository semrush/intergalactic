import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import logger from '@semcore/core/lib/utils/logger';

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

  /**
   * Check is exceeded max available selectable rows.
   */
  isExceeded(): boolean;

  /** Replace the list of keys.  */
  replace(value: UniqKeyType[]): void;

  /** Check if the key exists in selected rows */
  has(value: UniqKeyType): boolean;

  /** Select all handler */
  selectAll(): void;

  /** Clear all handler */
  clearAll(): void;

  /** Clear all available values (rows on current page) handler */
  clearAllAvailable(): void;

  /** Toggle selection of row */
  toggle(selected: boolean, row: DTRow<UniqKeyType>): void;

  /** Check if all rows selected */
  isAllSelected(): boolean;

  /** Check if at least one row selected */
  isIndeterminate(): boolean;

  /** Subscribe to changes */
  on: EventEmitter<Events<UniqKeyType>>['on'];
  /** Unsubscribe to changes */
  off: EventEmitter<Events<UniqKeyType>>['off'];
}

type Events<UniqRowKeyType> = {
  [SelectableRows.TOGGLE_EVENT]: (val: UniqRowKeyType) => void;
  [SelectableRows.SELECT_ALL_EVENT]: () => void;
  [SelectableRows.SET_INDETERMINATE_EVENT]: () => void;
  [SelectableRows.MAX_LIMIT_REACHED_CHANGE_EVENT]: (isExceeded: boolean) => void;
};

type Options = {
  /**
   * Max available rows to select. Once exceeded, unselected checkboxes will be disabled.
   * @default -1 - unlimited.
   */
  maxAvailableCount?: number;
};

export class SelectableRows<UniqRowKeyType> extends EventEmitter<Events<UniqRowKeyType>> implements ISelectedRows<UniqRowKeyType> {
  private readonly values: Set<UniqRowKeyType>;

  private availableKeys = new Set<UniqRowKeyType>();

  private maxAvailableCount = -1;

  private lastSelectedRow: UniqRowKeyType | null = null;

  public static TOGGLE_EVENT = 'toggle_selected_row' as const;
  public static SELECT_ALL_EVENT = 'select_all_selected_rows' as const;
  public static SET_INDETERMINATE_EVENT = 'set_indeterminate' as const;
  public static MAX_LIMIT_REACHED_CHANGE_EVENT = 'set_exceeded_max_limit' as const;

  public isPressedShift: boolean = false;

  constructor(initValues: UniqRowKeyType[] = [], options: Options = {}) {
    super();

    this.values = new Set<UniqRowKeyType>(initValues);

    if (options.maxAvailableCount !== undefined) {
      this.maxAvailableCount = options.maxAvailableCount;
    }
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

  public isExceeded(): boolean {
    return this.maxAvailableCount >= 0 && this.values.size >= this.maxAvailableCount;
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
      if (this.maxAvailableCount === -1 || this.values.size < this.maxAvailableCount) {
        this.values.add(key);
        this.emit(SelectableRows.TOGGLE_EVENT, key);
      }
    }

    if (this.values.size === this.maxAvailableCount) {
      this.emit(SelectableRows.MAX_LIMIT_REACHED_CHANGE_EVENT, true);
    }
    this.emit(SelectableRows.SELECT_ALL_EVENT);
  }

  public clearAll(): void {
    const keys = Array.from(this.values.values());
    this.values.clear();
    for (const key of keys) {
      this.emit(SelectableRows.TOGGLE_EVENT, key);
    }

    if (this.maxAvailableCount > -1) {
      this.emit(SelectableRows.MAX_LIMIT_REACHED_CHANGE_EVENT, false);
    }
    this.emit(SelectableRows.SELECT_ALL_EVENT);
  }

  public clearAllAvailable(): void {
    for (const key of this.availableKeys.values()) {
      this.values.delete(key);
      this.emit(SelectableRows.TOGGLE_EVENT, key);
    }

    if (this.maxAvailableCount > -1 && this.availableKeys.size > 0) {
      this.emit(SelectableRows.MAX_LIMIT_REACHED_CHANGE_EVENT, false);
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
      if (this.maxAvailableCount === -1 || this.values.size < this.maxAvailableCount) {
        if (!this.isIndeterminate()) {
          this.emit(SelectableRows.SET_INDETERMINATE_EVENT);
        }

        this.values.add(key);

        if (this.isAllSelected()) {
          this.emit(SelectableRows.SELECT_ALL_EVENT);
        }
        if (this.values.size === this.maxAvailableCount) {
          this.emit(SelectableRows.MAX_LIMIT_REACHED_CHANGE_EVENT, true);
        }
      } else {
        logger.warn(true, 'The maximum number of rows to select has been exceeded', 'DataTable.SelectableRowsStore');
      }
    } else {
      if (this.isAllSelected()) {
        this.emit(SelectableRows.SET_INDETERMINATE_EVENT);
      }

      const isExceeded = this.isExceeded();

      this.values.delete(key);

      if (isExceeded && !this.isExceeded()) {
        this.emit(SelectableRows.MAX_LIMIT_REACHED_CHANGE_EVENT, false);
      }

      if (this.values.size === 0) {
        this.emit(SelectableRows.SELECT_ALL_EVENT);
      }
    }

    this.emit(SelectableRows.TOGGLE_EVENT, key);
  }
}
