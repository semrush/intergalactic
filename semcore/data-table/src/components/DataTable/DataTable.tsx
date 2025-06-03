import * as React from 'react';
import { Component, createComponent, lastInteraction, Root, sstyled } from '@semcore/core';
import { Box, ScreenReaderOnly, ScrollArea } from '@semcore/base-components';

import {
  DataTableProps,
  ColIndex,
  RowIndex,
  DataTableData,
  DataTableType,
  ColumnGroupConfig,
  ColumnItemConfig,
  DataRowItem,
} from './DataTable.types';
import { Head } from '../Head/Head';
import { Body } from '../Body/Body';
import { DataTableColumnProps, DTColumn } from '../Head/Column.types';

import style from './dataTable.shadow.css';
import { DTRow, UniqRowKey } from '../Body/Row.types';
import { isFocusInside, hasFocusableIn } from '@semcore/core/lib/utils/use/useFocusLock';

import { ReactElement } from 'react';
import findComponent from '@semcore/core/lib/utils/findComponent';
import { DataTableHeadProps, HeadPropsInner } from '../Head/Head.types';
import { BodyPropsInner } from '../Body/Body.types';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { forkRef } from '@semcore/core/lib/utils/ref';
import scrollStyles from '../../style/scroll-shadows.shadow.css';
import { DataTableGroupProps } from '../Head/Group.type';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import { MergedColumnsCell, MergedRowsCell } from '../Body/MergedCells';
import { NoData } from '@semcore/widget-empty';

export const ACCORDION = Symbol('accordion');
export const ROW_GROUP = Symbol('ROW_GROUP');
export const UNIQ_ROW_KEY = Symbol('UNIQ_ROW_KEY');
export const SELECT_ALL = Symbol('SELECT_ALL');
export const ROW_INDEX = Symbol('ROW_INDEX');

const SCROLL_BAR_HEIGHT = 12;

type State = {
  scrollTop: number;
  scrollDirection: 'down' | 'up';
  selectAllMessage: string;
};

class DataTableRoot<D extends DataTableData> extends Component<
  DataTableProps<D>,
  {},
  {},
  typeof DataTableRoot.enhance,
  { use: DTRow; expandedRows: Set<string>; renderEmptyData: () => React.ReactNode }
> {
  static displayName = 'DataTable';
  static style = style;

  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)] as const;

  static defaultProps = {
    use: 'primary',
    defaultGridTemplateColumnWidth: 'auto',
    defaultExpandedRows: new Set<string>(),
    defaultSelectedRows: undefined,
    h: 'fit-content',
    renderEmptyData: () => <NoData py={10} type={'nothing-found'} description={''} w={'100%'} />,
  };

  private columns: DTColumn[] = [];
  private treeColumns: DTColumn[] = [];
  private hasGroups = false;

  private focusedCell: [RowIndex, ColIndex] = [-1, -1];

  private scrollAreaRef = React.createRef<HTMLDivElement>();

  private tableContainerRef = React.createRef<HTMLDivElement>();
  private tableRef = React.createRef<HTMLDivElement>();
  private headerRef = React.createRef<HTMLDivElement>();
  private spinnerRef = React.createRef<HTMLDivElement>();

  private gridAreaGroupMap = new Map<number, string>();

  private columnsSplitter = '/';
  private rows: Array<DTRow | DTRow[]> = [];
  private flatRows: DTRow[] = [];

  private selectAllMessageTimer = 0;

  private headerNodesMap = new Map();

  constructor(props: DataTableProps<D>) {
    super(props);

    if (props.children) {
      this.columns = this.calculateColumns();
    } else {
      const cols = this.calculateColumnsFromConfig();
      this.columns = cols[0];
      this.treeColumns = cols[1];
    }

    this.rows = this.calculateRows();
    this.flatRows = this.rows.flat();
  }

  state: State = {
    scrollTop: 0,
    scrollDirection: 'down',
    selectAllMessage: '',
  };

  uncontrolledProps() {
    return {
      expandedRows: new Set<string>(),
    };
  }

  componentDidMount() {
    const { headerProps, loading } = this.asProps;
    if ((headerProps?.sticky && !headerProps.h) || loading || this.columns.some((c) => c.fixed)) {
      requestAnimationFrame(() => {
        this.forceUpdate();
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    const { data, selectedRows, columns } = this.asProps;
    if (prevProps.columns !== columns) {
      const cols = this.calculateColumnsFromConfig();
      this.columns = cols[0];
      this.treeColumns = cols[1];
    }
    if (prevProps.data !== data || prevProps.columns !== columns) {
      this.rows = this.calculateRows();
      this.flatRows = this.rows.flat();

      this.forceUpdate();
    }
    if (prevProps.selectedRows !== selectedRows && selectedRows !== undefined) {
      if (prevProps.selectedRows.length < data.length && selectedRows.length === data.length) {
        this.setSelectAllMessage(true);
      } else if (prevProps.selectedRows.length > 0 && selectedRows.length === 0) {
        this.setSelectAllMessage(false);
      }
    }
  }

  get totalRows() {
    const { totalRows, expandedRows } = this.asProps;
    const flatRows = this.rows.flat();

    const expandedRowsCount = Array.from(expandedRows ?? []).reduce((acc, rowKey) => {
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

    const rows = this.rows.reduce((acc, item) => {
      acc = acc + 1;

      if (Array.isArray(item)) {
        acc = acc + item.length;
      }

      return acc;
    }, 0);

    return rows + expandedRowsCount;
  }

  get gridSettings() {
    const columns = this.columns;

    const gridTemplateColumns = columns.map((c) => c.gtcWidth);
    const gridTemplateAreas = columns.map((c) => c.name);

    return {
      gridTemplateColumns,
      gridTemplateAreas,
    };
  }

  getHeadProps(): HeadPropsInner<D> {
    const {
      use,
      compact,
      sort,
      onSortChange,
      getI18nText,
      uid,
      headerProps,
      onSelectedRowsChange,
      selectedRows,
      sideIndents,
    } = this.asProps;
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;

    return {
      columns: this.columns,
      treeColumns: this.treeColumns,
      use,
      tableRef: this.tableRef,
      compact: Boolean(compact),
      sort,
      onSortChange,
      getI18nText,
      uid,
      ref: this.headerRef,
      gridAreaGroupMap: this.gridAreaGroupMap,
      gridTemplateColumns,
      gridTemplateAreas,
      sideIndents,
      totalRows: this.totalRows,
      selectedRows: selectedRows,
      onChangeSelectAll: (value, e) => {
        const selectedRowsIndexes = value
          ? new Array(this.totalRows).fill(undefined).map((_, i) => i)
          : [];
        onSelectedRowsChange?.(selectedRowsIndexes, e);
      },
      getFixedStyle: this.getFixedStyle,
      ...headerProps,
    };
  }

  getBodyProps(): BodyPropsInner {
    const {
      use,
      compact,
      loading,
      getI18nText,
      expandedRows,
      virtualScroll,
      uid,
      rowProps,
      renderCell,
      headerProps,
      renderEmptyData,
      sideIndents,
      selectedRows,
      accordionDuration,
    } = this.asProps;
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;
    return {
      accordionDuration,
      columns: this.columns,
      rows: this.rows,
      flatRows: this.flatRows,
      use,
      compact: Boolean(compact),
      gridTemplateColumns,
      gridTemplateAreas,
      loading,
      headerHeight: this.getHeaderHeight(),
      stickyHeader: headerProps?.sticky,
      getI18nText,
      expandedRows,
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
      rowProps,
      renderCell,
      renderEmptyData,
      sideIndents,
      selectedRows,
      onSelectRow: this.handleSelectRow,
      getFixedStyle: this.getFixedStyle,
    };
  }

  handleSelectRow = (
    isSelected: boolean,
    selectedRowIndex: number,
    row: DTRow,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => {
    const { selectedRows, onSelectedRowsChange, data } = this.asProps;

    if (selectedRows && onSelectedRowsChange) {
      const newSelectedRows = new Set(selectedRows);

      if (isSelected && !newSelectedRows.has(selectedRowIndex)) {
        newSelectedRows.add(selectedRowIndex);
      } else if (!isSelected && newSelectedRows.has(selectedRowIndex)) {
        newSelectedRows.delete(selectedRowIndex);
      }

      onSelectedRowsChange([...newSelectedRows], event, {
        selectedRowIndex,
        isSelected,
        row,
      });
    }
  };

  setSelectAllMessage = (selectedAll: boolean) => {
    if (this.selectAllMessageTimer) {
      clearTimeout(this.selectAllMessageTimer);
    }

    const { getI18nText } = this.asProps;
    const message = getI18nText(
      selectedAll
        ? 'DataTable.allItemsSelected:aria-live'
        : 'DataTable.allItemsDeselected:aria-live',
    );
    this.setState({ selectAllMessage: message });

    this.selectAllMessageTimer = window.setTimeout(() => {
      this.setState({ selectAllMessage: '' });
    }, 5000);
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
      `[aria-rowindex="${index + 1}"]:not([aria-hidden="true"])`,
    );
  };

  hasFocusableInHeader = () => {
    return this.headerRef.current && hasFocusableIn(this.headerRef.current);
  };

  onExpandRow = (expandedRow: DTRow) => {
    const { expandedRows } = this.asProps;
    if (expandedRows.has(expandedRow[UNIQ_ROW_KEY])) {
      expandedRows.delete(expandedRow[UNIQ_ROW_KEY]);

      setTimeout(() => {
        this.handlers.expandedRows(new Set([...expandedRows]));
      }, 300);
    } else {
      expandedRows.add(expandedRow[UNIQ_ROW_KEY]);
      this.handlers.expandedRows(new Set([...expandedRows]));
    }
  };

  changeFocusCell = (
    rowIndex: RowIndex,
    colIndex: ColIndex,
    direction?: 'up' | 'down' | 'left' | 'right',
  ) => {
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
      }"], :scope > [role=columnheader][aria-colindex="${
        newCol + 1
      }"], :scope > div > [role=columnheader][aria-colindex="${newCol + 1}"]`,
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

      cell?.focus();

      if (newRow !== 0) {
        currentHeaderCell?.setAttribute('inert', '');
        const headerCell = headerCells?.item(newCol);

        headerCell?.removeAttribute('inert');
      }
    } else if (cell === null && currentCell instanceof HTMLElement) {
      let rowI = rowIndex;
      let colI = colIndex;

      if (direction === 'left' || direction === 'right') {
        // we need to skip Collapse Element with one big component from keyboard left/right pressing
        if (currentCell.parentElement?.parentElement?.dataset.uiName === 'Collapse') {
          return;
        }

        // left/right
        if (
          currentCell.dataset.groupedBy === 'colgroup' ||
          Number(currentCell.parentElement?.parentElement?.getAttribute('aria-rowindex')) === 2 ||
          (currentCell.parentElement &&
            Array.from(row?.children ?? []).indexOf(currentCell.parentElement) > 0)
        ) {
          colI = direction === 'left' ? colI - 1 : colI + 1;
        } else {
          rowI = rowI - 1;
        }
      } else if (direction === 'up' || direction === 'down') {
        // top/bottom
        if (
          currentCell.dataset.groupedBy === 'rowgroup' ||
          Number(currentCell.getAttribute('aria-colindex')) === 1
        ) {
          rowI = direction === 'up' ? rowI - 1 : rowI + 1;
        } else {
          colI = colI - 1;
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
    }
  };

  initFocusableCell = () => {
    const hasFocusable = this.hasFocusableInHeader();

    if (hasFocusable) {
      this.focusedCell = [0, 0];
    } else {
      this.focusedCell = [1, 0];
    }
  };

  handleScroll = trottle((e) => {
    const scrollTop = e.target.scrollTop;
    const scrollDirection = scrollTop > this.state.scrollTop ? 'down' : 'up';
    this.setState({ scrollTop, scrollDirection });
  });

  handleFocus = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    if (this.asProps.loading) {
      this.spinnerRef.current?.focus();
      e.currentTarget.setAttribute('tabIndex', '-1');
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
          const colIndex = (Number(firstAvailableCell.getAttribute('aria-colindex')) ?? 1) - 1;
          const rowIndex = (Number(firstAvailableRow.getAttribute('aria-rowindex')) ?? 1) - 1;

          this.focusedCell[0] = rowIndex;
          this.focusedCell[1] = colIndex;
          row = firstAvailableRow;
        }
      }

      const cell = row
        ?.querySelectorAll('[role=gridcell], [role=columnheader]')
        .item(this.focusedCell[1]);

      cell?.removeAttribute('inert');

      if (cell instanceof HTMLElement) {
        if (hasParent(e.target, cell)) {
          e.target.focus();
        } else {
          cell.focus();
        }
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
    }
  };

  handleMouseMove = () => {
    this.setInert(false);
  };

  handleBackFromAccordion = (cellIndex: number) => {
    this.changeFocusCell(-1, cellIndex === -1 ? 0 : cellIndex, 'up');
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
    } = this.asProps;

    const [offsetLeftSum, offsetRightSum] = this.getScrollOffsetValue();
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;

    const Head = findComponent<DataTableHeadProps>(Children, ['DataTable.Head']);
    const headerPropsToCheck = headerProps ?? Head?.props;
    const headerHeight = headerProps?.h || this.getHeaderHeight();
    const topOffset =
      headerPropsToCheck?.sticky || headerPropsToCheck?.withScrollBar ? headerHeight : undefined;

    const width =
      w ??
      (this.columns.some((c) => c.gtcWidth === 'auto' || c.gtcWidth === '1fr')
        ? '100%'
        : undefined);

    let gridTemplateRows: string | undefined = undefined;

    if (virtualScroll && typeof virtualScroll !== 'boolean' && 'rowHeight' in virtualScroll) {
      gridTemplateRows = `auto auto repeat(${this.totalRows}, minmax(${virtualScroll.rowHeight}px, auto)`;
    }

    let scrollDirection: 'both' | 'horizontal' | 'vertical' | undefined = undefined;
    const hasWidthSettings = (Boolean(w) && w !== '100%') || Boolean(wMax);
    const hasHeightSettings = (Boolean(h) && h !== 'fit-content') || Boolean(hMax);

    if (hasWidthSettings && !hasHeightSettings) {
      scrollDirection = 'horizontal';
    } else if (hasHeightSettings && !hasWidthSettings) {
      scrollDirection = 'vertical';
    } else if (hasWidthSettings && hasHeightSettings) {
      scrollDirection = 'both';
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
        onScroll={virtualScroll ? this.handleScroll : undefined}
        disableAutofocusToContent={true}
      >
        <ScrollArea.Container
          tabIndex={-1}
          // @ts-ignore
          scrollDirection={scrollDirection}
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
            onMouseMove={this.handleMouseMove}
            tabIndex={0}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            aria-rowcount={this.totalRows}
            aria-colcount={this.columns.length}
            gridTemplateColumns={gridTemplateColumns.join(' ')}
            gridTemplateAreas={gridTemplateAreas.join(' ')}
            gridTemplateRows={gridTemplateRows}
            w={'100%'}
            use:data={undefined}
            use:w={undefined}
            use:wMax={undefined}
            use:wMin={undefined}
            use:h={undefined}
            use:hMax={undefined}
            use:hMin={undefined}
          >
            {children ? (
              <Children />
            ) : (
              <>
                <DataTableInternal.Head />
                <DataTableInternal.Body />
              </>
            )}
          </SDataTable>
        </ScrollArea.Container>

        {headerPropsToCheck?.withScrollBar && topOffset && !loading && (
          <ScrollArea.Bar
            orientation='horizontal'
            top={topOffset - SCROLL_BAR_HEIGHT}
            zIndex={10}
          />
        )}

        {!loading && (
          <>
            <ScrollArea.Bar orientation='horizontal' zIndex={10} />
            <ScrollArea.Bar orientation='vertical' zIndex={10} />
          </>
        )}

        {selectedRows !== undefined && (
          <ScreenReaderOnly aria-live='polite' role='status'>
            {this.state.selectAllMessage}
          </ScreenReaderOnly>
        )}
      </ScrollArea>,
    );
  }

  private getScrollOffsetValue = () => {
    if (!this.headerRef.current) {
      return [0, 0];
    }

    const setToMap = (element: HTMLElement) => {
      if (element.getAttribute('name') && element.dataset.uiName === 'Head.Column') {
        const name = element.getAttribute('name');
        if (name) {
          this.headerNodesMap.set(name, element);
        }
      }
    };

    this.headerRef.current.childNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.classList.value.includes('SGroupContainer')) {
          node.childNodes.forEach((columnNode) => {
            if (columnNode instanceof HTMLElement) {
              setToMap(columnNode);
            }
          });
        } else {
          setToMap(node);
        }
      }
    });

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

  private calculateColumns(): DTColumn[] {
    const { children, data, selectedRows } = this.props;

    const HeadComponent = findComponent(children, ['Head']) as ReactElement<DataTableHeadProps> & {
      props: {
        children: Array<ReactElement<DataTableColumnProps> | ReactElement<DataTableGroupProps>>;
      };
    };

    this.hasGroups = findComponent(HeadComponent.props.children, ['Head.Group']) !== undefined;

    let columnIndex = 0;
    let groupIndex = 0;
    let gridColumnIndex = selectedRows ? 2 : 1;

    const calculateGridTemplateColumn = this.calculateGridTemplateColumn.bind(this);

    const columns: DTColumn[] = [];

    if (selectedRows) {
      const column: DTColumn = {
        name: SELECT_ALL.toString(),
        gtcWidth: '40px',
        alignItems: 'flex-start',
        children: '',
      };

      columns.push(column);
    }

    const makeColumn = (
      columnElement: ReactElement<DataTableColumnProps>,
      parent?: any,
      isFirst?: boolean,
      isLast?: boolean,
    ): DTColumn => {
      const leftBordersFromParent =
        isFirst && (parent?.props.borders === 'both' || parent?.props.borders === 'left')
          ? 'left'
          : undefined;
      const rightBordersFromParent =
        isLast && (parent?.props.borders === 'both' || parent?.props.borders === 'right')
          ? 'right'
          : undefined;

      const column: DTColumn = {
        name: columnElement.props.name,
        gtcWidth: calculateGridTemplateColumn(columnElement),
        fixed: columnElement.props.fixed ?? parent?.props.fixed,
        borders: columnElement.props.borders ?? leftBordersFromParent ?? rightBordersFromParent,
        parent,

        flexWrap: columnElement.props.flexWrap,
        alignItems: columnElement.props.alignItems,
        alignContent: columnElement.props.alignContent,
        justifyContent: columnElement.props.justifyContent,
        children: '',
      };

      return column;
    };

    const childIsColumn = (
      child: ReactElement<DataTableColumnProps> | ReactElement<DataTableGroupProps>,
    ): child is ReactElement<DataTableColumnProps> => {
      return child.type === Head.Column;
    };
    const childIsGroup = (
      child: ReactElement<DataTableColumnProps> | ReactElement<DataTableGroupProps>,
    ): child is ReactElement<DataTableGroupProps> => {
      return child.type === Head.Group;
    };

    React.Children.forEach(HeadComponent.props.children, (child, i) => {
      if (!React.isValidElement(child)) return;

      if (childIsColumn(child)) {
        const col = makeColumn(child);

        col.gridArea = `1 / ${gridColumnIndex} / ${this.hasGroups ? '3' : '2'} / ${
          gridColumnIndex + 1
        }`;

        columnIndex++;
        gridColumnIndex++;

        columns.push(col);
      } else if (childIsGroup(child)) {
        const Group = child;
        const childCount = React.Children.count(child.props.children);

        const initGridColumn = gridColumnIndex;

        React.Children.forEach(child.props.children, (child, j) => {
          if (child?.type === Head.Column) {
            const isFirst = j === 0;
            const isLast = j === childCount - 1;
            const col = makeColumn(child, Group, isFirst, isLast);

            if (i === 0 && j === 0 && data.some((d) => d[ACCORDION])) {
              gridColumnIndex++;
              col.gridArea = `2 / ${gridColumnIndex - 1} / 3 / ${gridColumnIndex + 1}`;
            } else {
              col.gridArea = `2 / ${gridColumnIndex} / 3 / ${gridColumnIndex + 1}`;
            }

            col.gridArea = `2 / ${gridColumnIndex} / 3 / ${gridColumnIndex + 1}`;
            columnIndex++;
            gridColumnIndex++;

            columns.push(col);
          }
        });

        this.gridAreaGroupMap.set(groupIndex, `1 / ${initGridColumn} / 2 / ${gridColumnIndex}`);
        groupIndex++;
      }
    });

    return columns.filter(Boolean);
  }

  private calculateColumnsFromConfig(): [DTColumn[], DTColumn[]] {
    const { columns, data, selectedRows } = this.props;

    this.hasGroups = columns.some((column) => 'columns' in column);

    let columnIndex = 0;
    let groupIndex = 0;
    let gridColumnIndex = selectedRows ? 2 : 1;

    const calculateGridTemplateColumn = this.calculateGridTemplateColumn.bind(this);

    const calculatedColumns: DTColumn[] = [];
    const treeColumns: DTColumn[] = [];

    if (selectedRows) {
      const column: DTColumn = {
        name: SELECT_ALL.toString(),
        gtcWidth: '40px',
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
    ): DTColumn => {
      const leftBordersFromParent =
        isFirst && (parent?.borders === 'both' || parent?.borders === 'left') ? 'left' : undefined;
      const rightBordersFromParent =
        isLast && (parent?.borders === 'both' || parent?.borders === 'right') ? 'right' : undefined;

      const column = {
        ...columnElement,

        name: childIsColumn(columnElement) ? columnElement.name : '',
        gtcWidth: childIsColumn(columnElement) ? calculateGridTemplateColumn(columnElement) : '',
        fixed: columnElement.fixed ?? parent?.fixed,
        borders: columnElement.borders ?? leftBordersFromParent ?? rightBordersFromParent,
        parent,
      } as DTColumn;

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

    columns.forEach((child, i) => {
      if (childIsColumn(child)) {
        const col = makeColumn(child);

        col.gridArea = `1 / ${gridColumnIndex} / ${this.hasGroups ? '3' : '2'} / ${
          gridColumnIndex + 1
        }`;

        columnIndex++;
        gridColumnIndex++;

        calculatedColumns.push(col);
        treeColumns.push(col);
      } else if (childIsGroup(child)) {
        const Group = makeColumn(child);
        const childCount = child.columns.length;

        const initGridColumn = gridColumnIndex;

        Group.columns = [];
        Group.children = child.children;
        child.columns.forEach((child, j) => {
          const isFirst = j === 0;
          const isLast = j === childCount - 1;
          const col = makeColumn(child, Group, isFirst, isLast);

          if (i === 0 && j === 0 && data.some((d) => d[ACCORDION])) {
            gridColumnIndex++;
            col.gridArea = `2 / ${gridColumnIndex - 1} / 3 / ${gridColumnIndex + 1}`;
          } else {
            col.gridArea = `2 / ${gridColumnIndex} / 3 / ${gridColumnIndex + 1}`;
          }

          col.gridArea = `2 / ${gridColumnIndex} / 3 / ${gridColumnIndex + 1}`;
          columnIndex++;
          gridColumnIndex++;

          calculatedColumns.push(col);

          Group.columns?.push(col);
        });

        treeColumns.push(Group);

        this.gridAreaGroupMap.set(groupIndex, `1 / ${initGridColumn} / 2 / ${gridColumnIndex}`);
        groupIndex++;
      }
    });

    return [calculatedColumns, treeColumns];
  }

  private calculateRows(): Array<DTRow[] | DTRow> {
    const columns = this.columns;
    // @ts-ignore
    const { data, uid } = this.props;

    const rows: Array<DTRow[] | DTRow> = [];
    const columnNames = columns.map((column: DTColumn) => column.name);

    let rowIndex = 0;

    const id = 100000000; // need this for gen keys by toString(36)

    const makeDtRow = (row: DataRowItem, excludeColumns?: string[]) => {
      const columns = new Set(columnNames);
      const dtRow = Object.entries(row).reduce<DTRow>(
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

          if (row[ACCORDION]) {
            acc[ACCORDION] = row[ACCORDION];
          }

          return acc;
        },
        {
          [UNIQ_ROW_KEY]:
            row[UNIQ_ROW_KEY] || (`${uid}_${(rowIndex + id).toString(36)}` as UniqRowKey),
          [ROW_INDEX]: rowIndex,
        },
      );

      excludeColumns?.forEach((value) => {
        columns.delete(value);
      });

      if (columns.size > 0) {
        columns.forEach((value) => {
          dtRow[value] = '';
        });
      }

      return dtRow;
    };

    data.forEach((row) => {
      const groupedRows: DataTableData | undefined = row[ROW_GROUP];

      if (groupedRows) {
        const innerRows: DTRow[] & { [ACCORDION]?: React.ReactElement } = [];

        const groupedKeys: string[] = [];
        const groupedRowData = Object.entries(row).reduce<Omit<DTRow, symbol>>(
          (acc, [key, value]) => {
            acc[key] = new MergedRowsCell(value, groupedRows.length, row[ACCORDION]);
            groupedKeys.push(key);
            return acc;
          },
          {
            [UNIQ_ROW_KEY]: '', // will fill in makeDtRow
            [ROW_INDEX]: -1,
          },
        );

        groupedRows.forEach((childRow, index) => {
          let dtRow: DTRow;
          if (index === 0) {
            const rowData = {
              ...childRow,
              ...groupedRowData,
            };
            dtRow = makeDtRow(rowData);
            dtRow[ROW_GROUP] = new Set();
          } else {
            if (index === groupedRows.length - 1 && row[ACCORDION]) {
              childRow[ACCORDION] = row[ACCORDION];
            }

            dtRow = makeDtRow(childRow, groupedKeys);

            innerRows[0]?.[ROW_GROUP]?.add(dtRow[UNIQ_ROW_KEY]);
          }

          innerRows.push(dtRow);
          rowIndex++;
        });

        rows.push(innerRows);
      } else {
        const dtRow = makeDtRow(row);

        rows.push(dtRow);
        rowIndex++;
      }
    });

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
      const columnHeight = header?.item(i)?.getBoundingClientRect().height;
      if (columnHeight) {
        height = columnHeight;
        break;
      }
    }

    return height;
  }
}

export const DataTable = createComponent(DataTableRoot, {
  Head,
  Body,
}) as DataTableType;

export const DataTableInternal = DataTable as DataTableType & {
  Head: typeof Head;
  Body: typeof Body;
};
