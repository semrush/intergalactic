import { Box, ScrollArea } from '@semcore/base-components';
import { Component, createComponent, lastInteraction, Root, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import { forkRef } from '@semcore/core/lib/utils/ref';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { isFocusInside, hasFocusableIn } from '@semcore/core/lib/utils/use/useFocusLock';
import { NoData } from '@semcore/widget-empty';
import type { ReactElement } from 'react';
import * as React from 'react';

import style from './dataTable.shadow.css';
import type {
  DataTableProps,
  ColIndex,
  RowIndex,
  DataTableData,
  DataTableType,
  ColumnGroupConfig,
  ColumnItemConfig,
  DataRowItem,
} from './DataTable.types';
import { ScrollBars } from './ScrollBars';
import type { ISelectedRows } from '../../store/SelectableRows';
import { SelectableRows } from '../../store/SelectableRows';
import scrollStyles from '../../style/scroll-shadows.shadow.css';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import { Body } from '../Body/Body';
import type { BodyPropsInner } from '../Body/Body.types';
import { MergedColumnsCell, MergedRowsCell } from '../Body/MergedCells';
import type { DTRow } from '../Body/Row.types';
import type { DataTableColumnProps, DTColumn } from '../Head/Column.types';
import { Head } from '../Head/Head';
import type { HeadPropsInner } from '../Head/Head.types';
import { SRAnnouncer } from '../RowSelector/SRAnnouncer';
import { SRReactiveAnnouncer } from '../RowSelector/SRReactiveAnnouncer';

export const ACCORDION = Symbol('accordion');
export const ROW_GROUP = Symbol('ROW_GROUP');
export const UNIQ_ROW_KEY = Symbol('UNIQ_ROW_KEY');
export const IS_EMPTY_DATA_ROW = Symbol('IS_EMPTY_DATA_ROW');
export const SELECT_ALL = 'SELECT_ALL_ROWS';
export const ROW_INDEX = Symbol('ROW_INDEX');
export const GRID_ROW_INDEX = Symbol('GRID_ROW_INDEX');

type State<
  Data extends DataTableData,
  UniqKey extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? keyof Data[number][typeof ROW_GROUP][number] : keyof Data[number]),
  UniqKeyType extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? Data[number][typeof ROW_GROUP][number][UniqKey] : Data[number][UniqKey]),
> = {
  scrollTop: number;
  scrollDirection: 'down' | 'up';
  selectAllMessage: string;
  shadowVertical: BodyPropsInner<Data, UniqKeyType>['shadowVertical'];
  expandedRows: Set<UniqKeyType>;
};

type DefaultProps = {
  use: 'primary';
  defaultGridTemplateColumnWidth: 'auto';
  defaultSelectedRows: undefined;
  h: 'fit-content';
  renderEmptyData: () => React.JSX.Element;
  variant: 'default';
  accordionAnimationRows: 40;
  accordionDuration: 200;
};

class DataTableRoot<
  Data extends DataTableData,
  UniqKey extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? keyof Data[number][typeof ROW_GROUP][number] : keyof Data[number]),
  UniqKeyType extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? Data[number][typeof ROW_GROUP][number][UniqKey] : Data[number][UniqKey]),
> extends Component<
    DataTableProps<Data, UniqKey, UniqKeyType>,
  typeof DataTableRoot.enhance,
  {},
  {},
  State<Data, UniqKey, UniqKeyType>,
  DefaultProps
  > {
  static displayName = 'DataTable';
  static style = style;

  static enhance = [
    uniqueIDEnhancement(),
    i18nEnhance(localizedMessages),
  ] as const;

  static defaultProps = {
    use: 'primary',
    defaultGridTemplateColumnWidth: 'auto',
    defaultSelectedRows: undefined,
    h: 'fit-content',
    renderEmptyData: () => <NoData py={10} type='nothing-found' description='' w='100%' />,
    variant: 'default',
    accordionAnimationRows: 40,
    accordionDuration: 200,
  } as const;

  static getDerivedStateFromProps(props: DataTableProps<any, any, any>, state: State<any, any, any>) {
    if (props.expandedRows === state.expandedRows || props.expandedRows === undefined) {
      return null;
    }
    return {
      expandedRows: props.expandedRows,
    };
  }

  private columns: DTColumn[] = [];
  private treeColumns: DTColumn[] = [];
  private hasGroups = false;
  private hasFixedColumn = false;

  private focusedCell: [RowIndex, ColIndex] = [-1, -1];

  private scrollAreaRef = React.createRef<HTMLDivElement>();

  private tableContainerRef = React.createRef<HTMLDivElement>();
  private tableRef = React.createRef<HTMLDivElement>();
  private headerRef = React.createRef<HTMLDivElement>();
  private spinnerRef = React.createRef<HTMLDivElement>();
  private containerResizeEndTimeoutId: ReturnType<typeof setTimeout> | null = null;

  private gridAreaGroupMap = new Map<number, string>();

  private columnsSplitter = '/';
  private tmpData: Data;
  private calculatedRows: Array<DTRow<UniqKeyType> | DTRow<UniqKeyType>[]>;
  private flatRows: DTRow<UniqKeyType>[];
  private gridSettings: {
    gridTemplateColumns: string[];
    gridTemplateAreas: string[];
  } = {
    gridTemplateColumns: [],
    gridTemplateAreas: [],
  };

  private headerNodesMap = new Map<string, HTMLElement>();

  private selectedRowsContainer: ISelectedRows<UniqKeyType>;
  private lastSelectedRowKey: UniqKeyType | undefined;

  constructor(props: DataTableProps<Data, UniqKey, UniqKeyType>) {
    super(props);

    const cols = this.calculateColumnsFromConfig();
    this.columns = cols[0];
    this.treeColumns = cols[1];

    this.calculatedRows = this.getRows();
    this.flatRows = this.calculatedRows.flat();
    this.tmpData = props.data;

    if (Array.isArray(props.selectedRows) || !props.selectedRows) {
      this.selectedRowsContainer = new SelectableRows<UniqKeyType>();
    } else {
      this.selectedRowsContainer = props.selectedRows;
    }
  }

  state: State<Data, UniqKey, UniqKeyType> = {
    scrollTop: 0,
    scrollDirection: 'down',
    selectAllMessage: '',
    shadowVertical: '',
    expandedRows: new Set<UniqKeyType>(),
  };

  componentDidMount() {
    const { headerProps, loading } = this.asProps;
    if ((headerProps?.sticky && !headerProps.h) || loading || this.hasFixedColumn) {
      requestAnimationFrame(() => {
        this.forceUpdate();
        this.calculateVerticalShadow();
        this.calculateContainerHeight();
      });
    }

    if (headerProps?.sticky && canUseDOM() && this.scrollDirection === 'horizontal') {
      if (!this.withAnimation) {
        document.addEventListener('scroll', this.handleDocumentScroll, { passive: true });
      } else {
        this.calculateStickyHeaderAnimation();
      }
    }
  }

  componentDidUpdate(prevProps: any) {
    const { data, selectedRows, columns } = this.asProps;
    if (prevProps.columns !== columns) {
      const cols = this.calculateColumnsFromConfig();
      this.columns = cols[0];
      this.treeColumns = cols[1];

      this.forceUpdate();
    }
    if (prevProps.data !== data || prevProps.columns !== columns) {
      if (this.hasFixedColumn) {
        this.calculateVerticalShadow();
      }
    }
    if (prevProps.selectedRows !== selectedRows && selectedRows !== undefined && !Array.isArray(selectedRows)) {
      this.selectedRowsContainer = selectedRows;
    }
  }

  componentWillUnmount() {
    if (canUseDOM()) {
      document.removeEventListener('scroll', this.handleDocumentScroll);
    }

    this.state.expandedRows?.clear();
  }

  calculateStickyHeaderAnimation() {
    const { headerProps } = this.asProps;
    const scrollArea = this.scrollAreaRef.current;
    const table = this.tableContainerRef.current;
    if (scrollArea && table) {
      const currentHeaderHeight = scrollArea.style.getPropertyValue('--global-header-height');
      const newHeaderHeight = `${this.getHeaderHeight()}px`;

      scrollArea.style.setProperty('--global-scroll-to', `${table.offsetHeight}px`);
      scrollArea.style.setProperty('--global-header-top', `${headerProps?.top ?? 0}px`);
      scrollArea.style.setProperty('--global-header-height', newHeaderHeight);

      if (currentHeaderHeight && currentHeaderHeight !== newHeaderHeight) {
        this.forceUpdate();
      }
    }
  }

  calculateContainerHeight() {
    const scrollArea = this.scrollAreaRef.current;
    const table = this.tableContainerRef.current;
    if (scrollArea && table) {
      scrollArea.style.setProperty('--global-table-height', `${table.offsetHeight}px`);
    }
  }

  get withAnimation() {
    if (canUseDOM()) {
      return CSS.supports('(animation-timeline: view()) and (animation-range: normal)');
    }
    return false;
  }

  get totalRows() {
    const { totalRows } = this.asProps;
    const flatRows = this.getFlatRows();
    const expandedRows = this.state.expandedRows;

    const expandedRowsCount = Array.from(expandedRows).reduce<number>((acc, rowKey) => {
      const dtRow = flatRows.find((el) => el[UNIQ_ROW_KEY] === rowKey);
      if (dtRow) {
        const expandedRows = dtRow[ACCORDION];

        if (Array.isArray(expandedRows)) {
          acc = acc + expandedRows.length;
        } else {
          acc = acc + 1;
        }
      }

      return acc;
    }, 0);

    if (totalRows !== undefined) {
      return totalRows + expandedRowsCount;
    }

    const rows = this.getRows().reduce((acc, item) => {
      if (Array.isArray(item)) {
        acc = acc + item.length;
      } else {
        acc = acc + 1;
      }

      return acc;
    }, 0);

    return rows + expandedRowsCount;
  }

  get scrollDirection() {
    const { w, wMax, h, hMax } = this.asProps;

    let scrollDirection: 'both' | 'horizontal' | 'vertical' | undefined = undefined;
    const hasWidthSettings = Boolean(w) || Boolean(wMax);
    const hasHeightSettings = (Boolean(h) && h !== 'fit-content') || Boolean(hMax);

    if (hasWidthSettings && !hasHeightSettings) {
      scrollDirection = 'horizontal';
    } else if (hasHeightSettings && !hasWidthSettings) {
      scrollDirection = 'vertical';
    } else if (hasWidthSettings && hasHeightSettings) {
      scrollDirection = 'both';
    }

    return scrollDirection;
  }

  get isDataEmpty() {
    return this.asProps.data.length === 0;
  }

  getHeadProps(): HeadPropsInner<Data, UniqKey, UniqKeyType> {
    const {
      use,
      compact,
      sort,
      onSortChange,
      getI18nText,
      uid,
      headerProps,
      selectedRows,
      sideIndents,
      variant,
    } = this.asProps;
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;
    const { shadowVertical } = this.state;

    const sideIndentsValue = variant === 'card' ? 'wide' : sideIndents;

    return {
      ...headerProps,
      columns: this.columns,
      treeColumns: this.treeColumns,
      use,
      tableRef: this.tableRef,
      compact: Boolean(compact),
      sort,
      onSortChange,
      getI18nText,
      uid,
      ref: headerProps?.ref ? forkRef(this.headerRef, headerProps.ref) : this.headerRef,
      gridAreaGroupMap: this.gridAreaGroupMap,
      gridTemplateColumns,
      gridTemplateAreas,
      sideIndents: sideIndentsValue,
      totalRows: this.totalRows,
      selectedRows,
      flatRows: this.getFlatRows(),
      onChangeSelectAll: Array.isArray(selectedRows) ? this.handleSelectAllRows : undefined,
      getFixedStyle: this.getFixedStyle,
      onCellClick: this.handleCellClick,
      shadowVertical,
      scrollDirection: this.scrollDirection,
      isDataEmpty: this.isDataEmpty,
      withAnimation: this.withAnimation && this.scrollDirection === 'horizontal' && !this.isDataEmpty,
      headerNodesMap: this.headerNodesMap,
    };
  }

  getBodyProps(): BodyPropsInner<Data, UniqKeyType> {
    const {
      use,
      compact,
      loading,
      getI18nText,
      virtualScroll,
      uid,
      rowProps,
      renderCell,
      headerProps,
      renderEmptyData,
      sideIndents,
      selectedRows,
      accordionDuration,
      accordionMode,
      data: rawData,
      renderCellOverlay,
      limit,
      variant,
      totalRows,
      accordionAnimationRows,
    } = this.asProps;
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;
    const { shadowVertical } = this.state;

    return {
      accordionDuration,
      accordionAnimationRows,
      accordionMode,
      columns: this.columns,
      rows: this.getRows(),
      flatRows: this.getFlatRows(),
      use,
      compact: Boolean(compact),
      gridTemplateColumns,
      gridTemplateAreas,
      loading,
      headerHeight: this.getHeaderHeight(),
      stickyHeader: headerProps?.sticky,
      getI18nText,
      expandedRows: this.state.expandedRows,
      onExpandRow: this.onExpandRow,
      spinnerRef: this.spinnerRef,
      scrollTop: this.state.scrollTop,
      scrollDirection: this.state.scrollDirection,
      tableContainerRef: this.tableContainerRef,
      tableRef: this.tableRef,
      scrollAreaRef: this.scrollAreaRef,
      onBackFromAccordion: this.handleBackFromAccordion,
      virtualScroll,
      hasGroups: this.hasGroups,
      uid,
      rowProps: this.getRows().length > 0 ? rowProps : undefined,
      renderCell: this.getRows().length > 0 ? renderCell : undefined,
      renderEmptyData,
      sideIndents,
      selectedRows,
      onSelectRow: Array.isArray(selectedRows) ? this.handleSelectRow : undefined,
      getFixedStyle: this.getFixedStyle,
      onCellClick: this.handleCellClick,
      rawData,
      shadowVertical,
      renderCellOverlay,
      limit,
      variant,
      totalRows,
    };
  }

  handleDocumentScroll = trottle(() => {
    const tableContainer = this.tableContainerRef.current;
    if (!tableContainer) return;

    const tableRect = tableContainer.getBoundingClientRect();
    const tableContainerTop = tableRect.top;
    const { headerProps } = this.asProps;
    const headerContainer = this.headerRef.current;
    const top = tableContainerTop - (headerProps?.top ?? 0);
    const headerScrollBar = headerProps?.withScrollBar
      ? this.scrollAreaRef.current?.querySelector(`[role=scrollbar][aria-orientation=horizontal]`)
      : undefined;

    if (top && top < 0 && Math.abs(top) <= tableContainer.clientHeight) {
      let translate = `translateY(${Math.abs(top)}px)`;

      if (tableRect.bottom <= this.getHeaderHeight()) {
        translate = `translateY(${Math.abs(top) - this.getHeaderHeight() - tableRect.bottom}px)`;
      }

      if (headerContainer instanceof HTMLElement) {
        headerContainer.style.setProperty('--global-scroll-translate', `${Math.abs(top)}px`);
      }

      if (headerScrollBar instanceof HTMLElement) {
        headerScrollBar.style.setProperty('transform', translate);
      }
    } else {
      if (headerContainer instanceof HTMLElement) {
        headerContainer.style.removeProperty('--global-scroll-translate');
      }

      if (headerScrollBar instanceof HTMLElement) {
        headerScrollBar.style.removeProperty('transform');
      }
    }
  });

  handleCellClick = (e: React.SyntheticEvent<HTMLElement>, opt: { rowIndex: number; colIndex: number; row?: DTRow<UniqKeyType> }) => {
    if (lastInteraction.isMouse()) {
      this.initFocusableCell([this.hasFocusableInHeader() ? opt.rowIndex + 1 : opt.rowIndex, opt.colIndex]);
    }
  };

  handleSelectAllRows = (selectedRows: UniqKeyType[], event?: React.SyntheticEvent<HTMLElement>) => {
    if (!('onSelectedRowsChange' in this.asProps) || !this.asProps.onSelectedRowsChange || !Array.isArray(selectedRows)) return;

    this.asProps.onSelectedRowsChange(selectedRows, event);
  };

  handleSelectRow = (
    isSelected: boolean,
    selectedRowIndex: number,
    row: DTRow<UniqKeyType>,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => {
    const { selectedRows } = this.asProps;

    if (!selectedRows || !('onSelectedRowsChange' in this.asProps) || !this.asProps.onSelectedRowsChange || !Array.isArray(selectedRows)) return;

    const { onSelectedRowsChange } = this.asProps;

    const selectedRowsSet = new Set(selectedRows);

    if (this.selectedRowsContainer.isPressedShift && selectedRowsSet.size > 0 && this.lastSelectedRowKey && (isSelected ? selectedRowsSet.has(this.lastSelectedRowKey) : true)) {
      let select = false;
      const firstColumnKey = this.columns[0].name;
      const isMerged = this.flatRows.some((item) => item[firstColumnKey] instanceof MergedRowsCell);

      for (const item of this.flatRows) {
        if (isMerged && !item[firstColumnKey]) continue;

        if (!select && (item[UNIQ_ROW_KEY] === row[UNIQ_ROW_KEY] || item[UNIQ_ROW_KEY] === this.lastSelectedRowKey)) {
          select = true;
          if (isSelected) {
            selectedRowsSet.add(item[UNIQ_ROW_KEY]);
          } else {
            selectedRowsSet.delete(item[UNIQ_ROW_KEY]);
          }
          continue;
        }

        if (select) {
          if (isSelected) {
            selectedRowsSet.add(item[UNIQ_ROW_KEY]);
          } else {
            selectedRowsSet.delete(item[UNIQ_ROW_KEY]);
          }
        }

        if (select && (item[UNIQ_ROW_KEY] === row[UNIQ_ROW_KEY] || item[UNIQ_ROW_KEY] === this.lastSelectedRowKey)) {
          break;
        }
      }
    } else {
      if (selectedRowsSet.has(row[UNIQ_ROW_KEY])) {
        selectedRowsSet.delete(row[UNIQ_ROW_KEY]);
      } else {
        selectedRowsSet.add(row[UNIQ_ROW_KEY]);
      }
    }

    this.lastSelectedRowKey = row[UNIQ_ROW_KEY];

    onSelectedRowsChange(Array.from(selectedRowsSet), event, { selectedRowIndex, isSelected, row });
  };

  setInert(value: boolean) {
    const cells = this.tableRef.current?.querySelectorAll<HTMLDivElement>(
      '[role=gridcell], [role=columnheader]',
    );

    cells?.forEach((cell) => {
      if (value === true) {
        cell.setAttribute('inert', '');
      } else {
        cell.removeAttribute('inert');
      }
    });
  }

  getRow = (index: number) => {
    return this.tableRef.current?.querySelector(
      `:scope [aria-rowindex="${index + 1}"]:not([aria-hidden="true"]):not(:scope [data-ui-name="DataTable"] [aria-rowindex="${index + 1}"]:not([aria-hidden="true"])`,
    );
  };

  hasFocusableInHeader = () => {
    return (this.headerRef.current && hasFocusableIn(this.headerRef.current)) ||
      this.columns.some((column) => column.sortable);
  };

  onExpandRow = (expandedRow: DTRow<UniqKeyType>) => {
    const { onAccordionToggle, accordionMode } = this.asProps;
    const expandedRows = this.state.expandedRows;
    if (expandedRows.has(expandedRow[UNIQ_ROW_KEY])) {
      expandedRows.delete(expandedRow[UNIQ_ROW_KEY]);

      onAccordionToggle?.('close', expandedRow[UNIQ_ROW_KEY], expandedRow[ROW_INDEX]);
    } else {
      expandedRows.add(expandedRow[UNIQ_ROW_KEY]);

      onAccordionToggle?.('open', expandedRow[UNIQ_ROW_KEY], expandedRow[ROW_INDEX]);

      if (accordionMode === 'toggle') {
        const rowIndex = expandedRow[ROW_INDEX];
        const colIndex = this.focusedCell[1];
        this.initFocusableCell([this.hasFocusableInHeader() ? rowIndex + 1 : rowIndex, colIndex]);
      }
    }
  };

  changeFocusCell = (
    rowIndex: RowIndex,
    colIndex: ColIndex,
    direction?: 'up' | 'down' | 'left' | 'right',
  ) => {
    const { limit } = this.asProps;
    const hasFocusable = this.hasFocusableInHeader();

    const maxCol = this.columns.length - 1;
    const maxRow = this.totalRows || 1;

    const currentRow = this.tableRef.current?.querySelector(
      `[aria-rowindex="${this.focusedCell[0] + 1}"]`,
    );

    const headerCells = this.tableRef.current?.querySelectorAll('[role=columnheader]');
    const currentCell = currentRow?.querySelector(
      `[role=gridcell][aria-colindex='${this.focusedCell[1] + 1}']`,
    );
    const currentHeaderCell = headerCells?.item(this.focusedCell[1]);

    let changed = true;
    const newRow = this.focusedCell[0] + rowIndex;
    const newCol = this.focusedCell[1] + colIndex;

    if (
      ((hasFocusable && newRow < 0) || (!hasFocusable && newRow < 1) || newRow > maxRow) &&
      newRow !== this.focusedCell[0]
    ) {
      changed = false;
    }
    if ((newCol < 0 || newCol > maxCol) && newCol !== this.focusedCell[1]) {
      changed = false;
    }

    if (!changed) return;

    const row = this.getRow(newRow);
    const cell = row?.querySelector(
      `:scope > div > [role=gridcell][aria-colindex="${
        newCol + 1
      }"]:not([aria-hidden="true"]), :scope > [role=columnheader][aria-colindex="${
        newCol + 1
      }"]:not([aria-hidden="true"]), :scope > div > [role=columnheader][aria-colindex="${
        newCol + 1
      }"]:not([aria-hidden="true"])`,
    );

    if (cell instanceof HTMLElement && currentCell !== cell) {
      this.focusedCell = [newRow, newCol];

      currentCell?.setAttribute('inert', '');

      if (currentCell !== currentHeaderCell) {
        currentCell?.removeAttribute('aria-describedby');
      }

      const headerCell = headerCells?.item(newCol);
      const describedBy = headerCell?.getAttribute('aria-describedby');

      cell.removeAttribute('inert');
      if (headerCell !== cell && describedBy) {
        cell.setAttribute('aria-describedby', describedBy);
      }

      cell?.focus({ focusVisible: true });

      if (newRow !== 0) {
        currentHeaderCell?.setAttribute('inert', '');
        const headerCell = headerCells?.item(newCol);

        headerCell?.removeAttribute('inert');
      }
    } else if (cell === null && currentCell instanceof HTMLElement) {
      let rowI = rowIndex;
      let colI = colIndex;

      const colspan = Number(currentCell.getAttribute('aria-colspan'));
      const rowspan = Number(currentCell.getAttribute('aria-rowspan'));

      if (direction === 'left' || direction === 'right') {
        // we need to skip Collapse Element with one big component from keyboard left/right pressing
        if (currentCell.parentElement?.parentElement?.dataset.uiName === 'Collapse') {
          return;
        }
        // skipping x-axis movement of the focus within limit overlay and there is only limit by rows
        if (limit?.fromRow !== undefined && limit.fromColumn === undefined && newCol === limit.fromRow) {
          return;
        }

        const hasRowSpanUpper = row instanceof HTMLElement && Number(row.dataset.filledColumns) < this.columns.length;

        if (colspan > 0) {
          if (direction === 'right' && limit?.fromColumn !== undefined && newCol === limit.fromColumn) {
            rowI = rowI - 1;
          } else {
            colI = direction === 'left' ? colI - colspan + 1 : colI + colspan - 1;
          }
        } else if (hasRowSpanUpper || (direction === 'right' && (limit?.fromColumn !== undefined || limit?.fromRow !== undefined))) {
          rowI = rowI - 1;
        } else {
          colI = direction === 'left' ? colI - 1 : colI + 1;
        }
      } else if (direction === 'up' || direction === 'down') {
        // top/bottom
        if (rowspan > 0) {
          rowI = direction === 'up' ? rowI - rowspan + 1 : rowI + rowspan - 1;
        } else if (Number(currentCell.getAttribute('aria-colindex')) === 1) {
          rowI = direction === 'up' ? rowI - 1 : rowI + 1;
        } else {
          const areLimitsDefined = limit?.fromRow !== undefined || limit?.fromColumn !== undefined;
          if (areLimitsDefined && newRow > (limit?.fromRow ?? 0) + 1) {
            return;
          }

          const hasRowSpanUpper = row instanceof HTMLElement && currentRow instanceof HTMLElement && row.dataset.filledColumns !== currentRow.dataset.filledColumns;

          if (direction === 'up' && hasRowSpanUpper) {
            rowI = rowI - 1;
          } else {
            colI = colI - 1;
          }
        }
      }
      this.changeFocusCell(rowI, colI, direction);
    } else if (cell === null && currentHeaderCell instanceof HTMLElement && direction === 'down') {
      const colI = colIndex - 1;
      this.changeFocusCell(rowIndex, colI, direction);
    } else if (
      row === null &&
      this.focusedCell[0] === 0 &&
      direction === 'down' &&
      this.asProps.virtualScroll
    ) {
      this.changeFocusCell(rowIndex + 1, colIndex, direction);
    }
  };

  handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Tab': {
        this.setInert(true);
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        this.changeFocusCell(0, -1, 'left');
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        this.changeFocusCell(0, 1, 'right');
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        this.changeFocusCell(-1, 0, 'up');
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        this.changeFocusCell(1, 0, 'down');
        break;
      }
      case 'Shift': {
        this.selectedRowsContainer.isPressedShift = true;
      }
    }
  };

  handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Shift') {
      this.selectedRowsContainer.isPressedShift = false;
    }
  };

  initFocusableCell(): void;
  initFocusableCell(initCell: [row: number, cell: number]): void;
  initFocusableCell(initCell?: [row: number, cell: number]) {
    const hasFocusable = this.hasFocusableInHeader();

    const initRow = initCell?.[0] ?? 0;
    const initCol = initCell?.[1] ?? 0;

    if (hasFocusable) {
      this.focusedCell = [initRow, initCol];
    } else {
      this.focusedCell = [initRow + 1, initCol];
    }
  };

  handleScroll = trottle((e) => {
    if (this.asProps.virtualScroll) {
      const scrollTop = e.target.scrollTop;
      const scrollDirection = scrollTop > this.state.scrollTop ? 'down' : 'up';
      this.setState({ scrollTop, scrollDirection });
    }

    if (this.hasFixedColumn) {
      this.calculateVerticalShadow();
    }
  });

  calculateVerticalShadow = () => {
    if (!this.tableContainerRef.current) return;

    const { scrollWidth, clientWidth, scrollLeft } =
            this.tableContainerRef.current;
    const maxScrollRight = scrollWidth - clientWidth;

    const roundedScroll = Math.round(scrollLeft);
    const roundedMaxScroll = Math.round(maxScrollRight);
    let shadow: BodyPropsInner<Data, UniqKeyType>['shadowVertical'] = '';
    // not scroll
    if (roundedMaxScroll <= 0) {
      // start scroll
    } else if (roundedScroll <= 0) {
      shadow = 'end';
      // end scroll
    } else if (roundedScroll >= roundedMaxScroll) {
      shadow = 'start';
      // median scroll
    } else if (roundedScroll > 0) {
      shadow = 'median';
    }

    this.setState({ shadowVertical: shadow });
  };

  handleFocus = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    if (this.asProps.loading) {
      this.spinnerRef.current?.focus();
      e.currentTarget.setAttribute('tabIndex', '-1');

      if (this.isDataEmpty) {
        this.headerRef.current?.setAttribute('tabIndex', '-1');
      }
    } else if (
      (!e.relatedTarget || !isFocusInside(e.currentTarget, e.relatedTarget)) &&
      lastInteraction.isKeyboard()
    ) {
      if (this.focusedCell[0] === -1 && this.focusedCell[1] === -1) {
        this.initFocusableCell();
      }

      this.setInert(true);

      let row = this.getRow(this.focusedCell[0]);

      if (!row) {
        this.initFocusableCell();
        row = this.getRow(this.focusedCell[0]);
      }

      if (!row && this.asProps.virtualScroll) {
        const firstAvailableCell = this.tableRef.current?.querySelector(`[role="gridcell"]`);
        const firstAvailableRow = firstAvailableCell?.parentElement?.parentElement;
        if (firstAvailableCell && firstAvailableRow) {
          const colIndex = Number(firstAvailableCell.getAttribute('aria-colindex') ?? 1) - 1;
          const rowIndex = Number(firstAvailableRow.getAttribute('aria-rowindex') ?? 1) - 1;

          this.focusedCell[0] = rowIndex;
          this.focusedCell[1] = colIndex;
          row = firstAvailableRow;
        }
      }

      const colindex = this.focusedCell[1];
      const cell = colindex > -1
        ? row?.querySelector(`[role=gridcell][aria-colindex="${colindex + 1}"]:not([aria-hidden="true"]), [role=columnheader][aria-colindex="${colindex + 1}"]:not([aria-hidden="true"])`)
        : undefined;

      cell?.removeAttribute('inert');

      if (cell instanceof HTMLElement) {
        if (hasParent(e.target, cell) && !e.target.dataset.skipTargetFocus) {
          e.target.focus({ focusVisible: true });
        } else {
          cell.focus({ focusVisible: true });
        }
      }

      if (this.isDataEmpty) {
        this.headerRef.current?.setAttribute('tabIndex', '-1');
      }

      e.currentTarget.setAttribute('tabIndex', '-1');
    }
  };

  handleBlur = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    const relatedTarget = e.relatedTarget;
    const tableElement = this.tableRef.current;

    if (
      tableElement &&
      (!relatedTarget ||
        !isFocusInside(tableElement, relatedTarget) ||
        !lastInteraction.isKeyboard())
    ) {
      this.setInert(false);
      tableElement.setAttribute('tabIndex', '0');

      if (this.isDataEmpty) {
        this.headerRef.current?.setAttribute('tabIndex', '0');
      }
    }
  };

  handleMouseMove = () => {
    this.setInert(false);
  };

  handleBackFromAccordion = (key: string) => {
    const cellIndex = this.columns.findIndex((c) => c.name === key);
    this.changeFocusCell(-1, cellIndex === -1 ? 0 : cellIndex, 'up');
  };

  handleContainerResizeEnd = (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
    if (this.containerResizeEndTimeoutId) {
      clearTimeout(this.containerResizeEndTimeoutId);
    }

    this.containerResizeEndTimeoutId = setTimeout(() => {
      this.calculateVerticalShadow();
      this.calculateStickyHeaderAnimation();
      this.calculateContainerHeight();
    }, 0);

    this.asProps.onResize?.(entries, observer);
  };

  render() {
    const SDataTable = Root;
    const {
      Children,
      styles,
      w,
      wMax,
      wMin,
      h,
      hMax,
      hMin,
      virtualScroll,
      children,
      headerProps,
      loading,
      selectedRows,
      getI18nText,
      data,
    } = this.asProps;

    const [offsetLeftSum, offsetRightSum] = this.getScrollOffsetValue();
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;

    const headerHeight = headerProps?.h || this.getHeaderHeight();
    const topOffset =
      headerProps?.sticky || headerProps?.withScrollBar ? headerHeight : undefined;

    const width =
      w ??
      (this.columns.some((c) => c.gtcWidth === 'auto' || c.gtcWidth === '1fr')
        ? '100%'
        : undefined);

    let gridTemplateRows: string | undefined = undefined;

    if (virtualScroll && typeof virtualScroll !== 'boolean' && 'rowHeight' in virtualScroll) {
      gridTemplateRows = `auto auto repeat(${this.totalRows}, minmax(${virtualScroll.rowHeight}px, auto))`;
    }

    return sstyled(styles)(
      <ScrollArea
        leftOffset={offsetLeftSum}
        rightOffset={offsetRightSum}
        topOffset={topOffset}
        w={width}
        wMax={wMax}
        wMin={wMin}
        h={h}
        hMax={hMax}
        hMin={hMin}
        shadow={true}
        ref={this.scrollAreaRef}
        container={this.tableContainerRef}
        styles={scrollStyles}
        onScroll={this.handleScroll}
        disableAutofocusToContent={true}
        onResize={this.handleContainerResizeEnd}
      >
        <ScrollArea.Container
          tabIndex={-1}
          // @ts-ignore
          scrollDirection={this.scrollDirection}
          // @ts-ignore
          loading={loading}
          headerHeight={`${headerHeight}px`}
          leftScrollPadding={`${offsetLeftSum}px`}
          rightScrollPadding={`${offsetRightSum}px`}
        >
          <SDataTable
            render={Box}
            ref={forkRef(this.tableRef, this.tableContainerRef)}
            role='grid'
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onMouseMove={this.handleMouseMove}
            tabIndex={0}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            isDataEmpty={this.isDataEmpty}
            aria-rowcount={this.totalRows}
            aria-colcount={this.columns.length}
            gridTemplateColumns={gridTemplateColumns.join(' ')}
            gridTemplateAreas={gridTemplateAreas.join(' ')}
            gridTemplateRows={gridTemplateRows}
            w='100%'
            use:data={undefined}
            use:w={undefined}
            use:wMax={undefined}
            use:wMin={undefined}
            use:h={undefined}
            use:hMax={undefined}
            use:hMin={undefined}
          >
            {children
              ? (
                  <Children />
                )
              : (
                  <>
                    <DataTable.Head />
                    <DataTable.Body />
                  </>
                )}
          </SDataTable>
        </ScrollArea.Container>

        <ScrollBars
          loading={loading}
          topOffset={topOffset}
          withHeaderScrollBar={headerProps?.withScrollBar}
          withAnimation={this.withAnimation}
        />

        {selectedRows !== undefined && !Array.isArray(selectedRows) && (
          <SRReactiveAnnouncer selectedRows={selectedRows} getI18nText={getI18nText} />
        )}
        {selectedRows !== undefined && Array.isArray(selectedRows) && (
          <SRAnnouncer selectedRows={selectedRows} getI18nText={getI18nText} data={data} flatRows={this.flatRows} />
        )}
      </ScrollArea>,
    );
  }

  private getScrollOffsetValue = () => {
    if (!this.headerRef.current) {
      return [0, 0];
    }

    return this.columns.reduce(
      (acc, column) => {
        if (column.fixed === 'left') {
          acc[0] += this.headerNodesMap.get(column.name)?.getBoundingClientRect().width ?? 0;
        }
        if (column.fixed === 'right') {
          acc[1] += this.headerNodesMap.get(column.name)?.getBoundingClientRect().width ?? 0;
        }
        return acc;
      },
      [0, 0] as [leftOffset: number, rightOffset: number],
    );
  };

  private getFixedStyle = (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ): [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined] => {
    const side = cell.fixed;
    if (!side) return [undefined, undefined];
    const names = cell.name.split('/');
    const nameSideMap = {
      left: names[0],
      right: names[names.length - 1],
    };
    const name = nameSideMap[side];
    const index = this.columns.findIndex((column) => column.name === name);

    if (index === -1) return [undefined, undefined];

    const startIndexSideMap = {
      left: 0,
      right: index + 1,
    };
    const endIndexSideMap = {
      left: index,
      right: this.columns.length,
    };
    const columnsFixed = this.columns.slice(startIndexSideMap[side], endIndexSideMap[side]);

    if (columnsFixed.length < 1) return [side, 0];

    const sum = columnsFixed.reduce(
      (acc, column) => acc + this.headerNodesMap.get(column.name)?.getBoundingClientRect().width,
      0,
    );
    return [side, `${sum}px`];
  };

  private calculateColumnsFromConfig(): [DTColumn[], DTColumn[]] {
    const { columns, data, selectedRows } = this.props;

    this.hasGroups = columns.some((column) => {
      return 'columns' in column && column.columns.some((col) => {
        return col.children !== null;
      });
    });

    let groupIndex = 0;
    let gridColumnIndex = selectedRows ? 2 : 1;

    const calculateGridTemplateColumn = this.calculateGridTemplateColumn.bind(this);

    const calculatedColumns: DTColumn[] = [];
    const treeColumns: DTColumn[] = [];

    if (selectedRows) {
      const column: DTColumn = {
        name: SELECT_ALL,
        gtcWidth: 'min-content',
        alignItems: 'flex-start',
        children: '',
      };

      calculatedColumns.push(column);
    }

    const makeColumn = (
      columnElement: ColumnItemConfig | ColumnGroupConfig,
      parent?: DTColumn,
      isFirst?: boolean,
      isLast?: boolean,
      hasGroups?: boolean,
    ): DTColumn => {
      const leftBordersFromParent =
        isFirst && (parent?.borders === 'both' || parent?.borders === 'left') ? 'left' : undefined;
      const rightBordersFromParent =
        isLast && (parent?.borders === 'both' || parent?.borders === 'right') ? 'right' : undefined;

      const column = {
        ...columnElement,

        name: childIsColumn(columnElement) ? columnElement.name : '',
        gtcWidth: childIsColumn(columnElement) ? calculateGridTemplateColumn(columnElement) : '',
        fixed: columnElement.fixed ?? (hasGroups ? parent?.fixed : undefined),
        borders: columnElement.borders ?? leftBordersFromParent ?? rightBordersFromParent,
        parent,
      } as DTColumn;

      if (column.fixed) {
        this.hasFixedColumn = true;
      }

      return column;
    };

    const childIsColumn = (
      child: ColumnItemConfig | ColumnGroupConfig,
    ): child is ColumnItemConfig => {
      return !('columns' in child);
    };
    const childIsGroup = (
      child: ColumnItemConfig | ColumnGroupConfig,
    ): child is ColumnGroupConfig => {
      return 'columns' in child;
    };

    const setShowShadows = (col: DTColumn, i: number): void => {
      let prevCol = treeColumns[i - 1];
      if ('columns' in prevCol && prevCol.columns) {
        prevCol = prevCol.columns[prevCol.columns.length - 1];
      }

      if (prevCol.fixed && !col.fixed) {
        prevCol.showShadowVertical = true;
      } else if (!prevCol.fixed && col.fixed) {
        col.showShadowVertical = true;
      }
    };

    columns.forEach((child, i) => {
      if (childIsColumn(child)) {
        const col = makeColumn(child);

        col.gridArea = `1 / ${gridColumnIndex} / ${this.hasGroups ? '3' : '2'} / ${
          gridColumnIndex + 1
        }`;

        gridColumnIndex++;

        calculatedColumns.push(col);
        treeColumns.push(col);

        if (i > 0) {
          setShowShadows(col, i);
        }
      } else if (childIsGroup(child)) {
        const Group = makeColumn(child);
        const childCount = child.columns.length;

        const initGridColumn = gridColumnIndex;

        const groupedRow = this.hasGroups ? 2 : 1;

        Group.columns = [];
        Group.children = child.children;
        child.columns.forEach((child, j) => {
          const isFirst = j === 0;
          const isLast = j === childCount - 1;
          const col = makeColumn(child, Group, isFirst, isLast, this.hasGroups);

          if (i === 0 && j === 0 && data.some((d) => d[ACCORDION])) {
            gridColumnIndex++;
            col.gridArea = `${groupedRow} / ${gridColumnIndex - 1} / ${groupedRow + 1} / ${gridColumnIndex + 1}`;
          } else {
            col.gridArea = `${groupedRow} / ${gridColumnIndex} / ${groupedRow + 1} / ${gridColumnIndex + 1}`;
          }

          col.gridArea = `${groupedRow} / ${gridColumnIndex} / ${groupedRow + 1} / ${gridColumnIndex + 1}`;
          gridColumnIndex++;

          calculatedColumns.push(col);

          if (isFirst && i > 0) {
            setShowShadows(col, i);
          }

          Group.columns?.push(col);
        });

        treeColumns.push(Group);

        this.gridAreaGroupMap.set(groupIndex, `1 / ${initGridColumn} / 2 / ${gridColumnIndex}`);
        groupIndex++;
      }
    });

    const gridTemplateColumns = calculatedColumns.map((c) => c.gtcWidth);
    const gridTemplateAreas = calculatedColumns.map((c) => c.name);

    this.gridSettings = {
      gridTemplateColumns,
      gridTemplateAreas,
    };

    return [calculatedColumns, treeColumns];
  }

  private getFlatRows(): DTRow<UniqKeyType>[] {
    const { data } = this.props;

    if (this.tmpData === data && this.flatRows) {
      return this.flatRows;
    }

    this.flatRows = this.getRows().flat();

    return this.flatRows;
  }

  private getRows(): Array<DTRow<UniqKeyType>[] | DTRow<UniqKeyType>> {
    const columns = this.columns;
    // @ts-ignore
    const { data, uid, uniqueRowKey, selectedRows } = this.props;

    if (this.tmpData === data) {
      return this.calculatedRows;
    }

    this.tmpData = data;

    const availableRowKeys: UniqKeyType[] = [];

    const rows: Array<DTRow<UniqKeyType>[] | DTRow<UniqKeyType>> = [];
    const columnNames = columns.map((column: DTColumn) => column.name);

    let rowIndex = 0;
    let gridRowIndex = 0;

    const id = 100000000; // need this for gen keys by toString(36)

    const makeDtRow = (row: DataRowItem, excludeColumns?: string[]) => {
      const columns = new Set(columnNames);

      let accordionInCell = null as null | React.ReactNode | DataTableData;

      let rowKey = row[UNIQ_ROW_KEY];

      if (!rowKey) {
        if (uniqueRowKey) {
          // @ts-ignore
          const keyValue = row[uniqueRowKey];
          if (keyValue instanceof MergedRowsCell) {
            rowKey = keyValue.value;
          } else {
            rowKey = keyValue;
          }
        } else {
          rowKey = `${uid}_${(rowIndex + id).toString(36)}`;
        }
      }

      const initData: DTRow<UniqKeyType> = {
        /*
          row -> DataRowItem
          uniqueRowKey is a `keyof Data[number]` -> `keyof DataRowItem`
        */
        // @ts-ignore
        [UNIQ_ROW_KEY]: rowKey,
        [ROW_INDEX]: rowIndex,
        [GRID_ROW_INDEX]: gridRowIndex,
      };

      const dtRow = Object.entries(row).reduce<DTRow<UniqKeyType>>(
        (acc, [key, value]) => {
          const columnsToRow = key.split(this.columnsSplitter);

          if (columnsToRow.length === 1) {
            acc[key] = value ?? '';
            columns.delete(key);
          } else {
            acc[columnsToRow[0]] = new MergedColumnsCell(value, {
              dataKey: key,
              size: columnsToRow.length,
            });
            columnsToRow.forEach((value) => {
              columns.delete(value);
            });
          }

          if (value?.[ACCORDION]) {
            accordionInCell = value[ACCORDION];
          }

          return acc;
        },
        initData,
      );

      gridRowIndex++;

      if (row[ACCORDION]) {
        if (Array.isArray(row[ACCORDION])) {
          dtRow[ACCORDION] = row[ACCORDION].map((item) => makeDtRow(item));
        } else if (React.isValidElement(row[ACCORDION])) {
          dtRow[ACCORDION] = row[ACCORDION];
          gridRowIndex++;
        }
      } else if (accordionInCell) {
        gridRowIndex++;
      }

      excludeColumns?.forEach((value) => {
        columns.delete(value);
      });

      if (columns.size > 0) {
        columns.forEach((value) => {
          dtRow[value] = '';
        });
      }

      if (!excludeColumns) { // we should add only the main row in mergedRows or default rows
        availableRowKeys.push(dtRow[UNIQ_ROW_KEY]);
      }

      return dtRow;
    };

    data.forEach((row) => {
      const groupedRows: DataTableData | undefined = row[ROW_GROUP];

      if (groupedRows && groupedRows.length > 1) {
        const innerRows: DTRow<UniqKeyType>[] & { [ACCORDION]?: React.ReactElement } = [];

        const groupedKeys: string[] = [];
        const groupedRowData = Object.entries(row).reduce<Omit<DTRow<UniqKeyType>, symbol>>(
          (acc, [key, value]) => {
            const accordion = Array.isArray(row[ACCORDION])
              ? row[ACCORDION].map((item) => makeDtRow(item))
              : row[ACCORDION];

            acc[key] = new MergedRowsCell(value, groupedRows.length, accordion);
            const columnsToRow = key.split(this.columnsSplitter);
            if (columnsToRow.length === 1) {
              groupedKeys.push(key);
            } else {
              groupedKeys.push(...columnsToRow);
            }

            return acc;
          },
          {
            [UNIQ_ROW_KEY]: '', // will fill in makeDtRow
            [ROW_INDEX]: -1,
          },
        );

        groupedRows.forEach((childRow, index) => {
          let dtRow: DTRow<UniqKeyType>;
          if (index === 0) {
            const rowData = {
              ...childRow,
              ...groupedRowData,
            };
            dtRow = makeDtRow(rowData);
            dtRow[ROW_GROUP] = new Set();
          } else {
            dtRow = makeDtRow(childRow, groupedKeys);

            innerRows[0]?.[ROW_GROUP]?.add(dtRow[UNIQ_ROW_KEY]);
          }

          innerRows.push(dtRow);

          if (index === groupedRows.length - 1 && row[ACCORDION]) {
            gridRowIndex = Array.isArray(row[ACCORDION]) ? gridRowIndex + row[ACCORDION].length : gridRowIndex + 1;
          }

          rowIndex++;
        });

        rows.push(innerRows);
      } else if (groupedRows?.length === 1) {
        const dtRow = makeDtRow({
          ...groupedRows[0],
          ...row,
        });

        rows.push(dtRow);
        rowIndex++;
      } else {
        const dtRow = makeDtRow(row);

        rows.push(dtRow);
        rowIndex++;
      }
    });

    this.calculatedRows = rows;

    if (selectedRows && !Array.isArray(selectedRows)) {
      selectedRows.setAvailableKeys(availableRowKeys);
    }

    return rows;
  }

  private calculateGridTemplateColumn(
    c: ReactElement<DataTableColumnProps> | ColumnItemConfig,
  ): string {
    return (
      (React.isValidElement(c) ? c.props.gtcWidth : c.gtcWidth) ??
      (this.props.defaultGridTemplateColumnWidth as string)
    );
  }

  private getHeaderHeight() {
    const header = this.headerRef.current?.children;

    let height = 0;

    for (let i = 0; i < (header?.length ?? 0); i++) {
      const item = header?.item(i);
      let columnHeight = item?.getBoundingClientRect().height;

      if (item instanceof HTMLElement && item.dataset.groupContainer) {
        const groupHeight = item.children.item(0)?.getBoundingClientRect().height ?? 0;
        const cellHeight = item.children.item(1)?.getBoundingClientRect().height ?? 0;

        columnHeight = groupHeight + cellHeight;
      }

      if (columnHeight) {
        height = columnHeight;
        break;
      }
    }

    return height;
  }
}

type DataTableComponent = DataTableType & {
  Head: typeof Head;
  Body: typeof Body;
};

/**
 * DataTable
 *
 * {@link https://developer.semrush.com/intergalactic/table-group/data-table/data-table-api|API} | {@link https://developer.semrush.com/intergalactic/table-group/data-table/data-table-code|Examples}
 */
export const DataTable = createComponent<
  DataTableComponent,
  typeof DataTableRoot
>(DataTableRoot, {
  Head,
  Body,
});
