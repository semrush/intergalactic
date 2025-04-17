import * as React from 'react';
import { Component, createComponent, lastInteraction, Root, sstyled } from '@semcore/core';
import { Box, ScrollArea } from '@semcore/base-components';

import {
  DataTableProps,
  ColIndex,
  RowIndex,
  DataTableData,
  DataTableType,
  ColumnGroupConfig,
  ColumnItemConfig,
} from './DataTable.types';
import { Head } from '../Head/Head';
import { Body } from '../Body/Body';
import { DataTableColumnProps, DTColumn } from '../Head/Column.types';

import style from './dataTable.shadow.css';
import { DTRow } from '../Body/Row.types';
import { isFocusInside, hasFocusableIn } from '@semcore/core/lib/utils/use/useFocusLock';

import { ReactElement } from 'react';
import { getScrollOffsetValue } from '../../utils';
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

export const ACCORDION = Symbol('accordion');
export const ROW_GROUP = Symbol('ROW_GROUP');
export const UNIQ_ROW_KEY = Symbol('UNIQ_ROW_KEY');

const SCROLL_BAR_HEIGHT = 12;

type State = {
  scrollTop: number;
  scrollDirection: 'down' | 'up';
};

class DataTableRoot<D extends DataTableData> extends Component<
  DataTableProps<D>,
  {},
  {},
  typeof DataTableRoot.enhance,
  { use: DTRow; expandedRows: number[] }
> {
  static displayName = 'DataTable';
  static style = style;

  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)] as const;

  static defaultProps = {
    use: 'primary',
    defaultGridTemplateColumnWidth: 'auto',
    defaultExpandedRows: [],
  };

  private columns: DTColumn[] = [];
  private treeColumns: DTColumn[] = [];
  private hasGroups = false;

  private focusedCell: [RowIndex, ColIndex] = [-1, -1];

  private tableContainerRef = React.createRef<HTMLDivElement>();
  private tableRef = React.createRef<HTMLDivElement>();
  private headerRef = React.createRef<HTMLDivElement>();
  private spinnerRef = React.createRef<HTMLDivElement>();

  private gridAreaGroupMap = new Map<number, string>();

  constructor(props: DataTableProps<D>) {
    super(props);

    if (props.children) {
      this.columns = this.calculateColumns();
    } else {
      const cols = this.calculateColumnsFromConfig();
      this.columns = cols[0];
      this.treeColumns = cols[1];
    }
  }

  state: State = {
    scrollTop: 0,
    scrollDirection: 'down',
  };

  uncontrolledProps() {
    return {
      expandedRows: [],
    };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  get totalRows() {
    const { totalRows, expandedRows, data } = this.asProps;

    const expandedRowsCount = expandedRows?.reduce((acc, rowIndex) => {
      const dtRow = data[rowIndex];
      const expandedRows = dtRow[ACCORDION];

      if (Array.isArray(expandedRows)) {
        acc = acc + expandedRows.length;
      } else {
        acc = acc + 1;
      }

      return acc;
    }, 0);

    if (totalRows !== undefined) {
      return totalRows + expandedRowsCount;
    }

    const rows = data.reduce((acc, item) => {
      acc = acc + 1;

      if (item[ROW_GROUP]) {
        acc = acc + item[ROW_GROUP].length;
      }

      return acc;
    }, 0);

    return rows + expandedRowsCount;
  }

  get gridSettings() {
    const columns = this.columns;

    const gridTemplateColumns = columns.map((c) => c.gridColumnWidth);
    const gridTemplateAreas = columns.map((c) => c.name);

    return {
      gridTemplateColumns,
      gridTemplateAreas,
    };
  }

  getHeadProps(): HeadPropsInner<D> {
    const { use, compact, sort, onSortChange, getI18nText, uid, headerProps } = this.asProps;
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
      ...headerProps,
    };
  }

  getBodyProps(): BodyPropsInner<D> {
    const {
      use,
      compact,
      loading,
      getI18nText,
      expandedRows,
      virtualScroll,
      data,
      uid,
      renderCell,
    } = this.asProps;
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;

    return {
      columns: this.columns,
      data,
      use,
      compact: Boolean(compact),
      gridTemplateColumns,
      gridTemplateAreas,
      loading,
      headerHeight: this.getTopScrollOffset(),
      getI18nText,
      expandedRows,
      onExpandRow: this.onExpandRow,
      spinnerRef: this.spinnerRef,
      scrollTop: this.state.scrollTop,
      scrollDirection: this.state.scrollDirection,
      tableContainerRef: this.tableContainerRef,
      tableRef: this.tableRef,
      virtualScroll,
      hasGroups: this.hasGroups,
      uid,
      renderCell,
    };
  }

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
    return this.tableRef.current?.querySelector(`[aria-rowindex="${index + 1}"]`);
  };

  hasFocusableInHeader = () => {
    const hasFocusable = this.columns.some((column) => {
      const columnElement = column.ref.current;

      return columnElement && hasFocusableIn(columnElement);
    });

    return hasFocusable;
  };

  onExpandRow = (expandedRowIndex: number) => {
    const { expandedRows } = this.asProps;
    if (expandedRows?.includes(expandedRowIndex)) {
      this.handlers.expandedRows(expandedRows.filter((row) => row !== expandedRowIndex));
    } else {
      this.handlers.expandedRows([...expandedRows!, expandedRowIndex]);
    }
  };

  changeFocusCell = (
    rowIndex: RowIndex,
    colIndex: ColIndex,
    direction?: 'up' | 'down' | 'left' | 'right',
  ) => {
    const hasFocusable = this.hasFocusableInHeader();

    const maxCol = this.columns.length - 1;
    const maxRow = this.totalRows;

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
      `[role=gridcell][aria-colindex="${newCol + 1}"], [role=columnheader][aria-colindex="${
        newCol + 1
      }"]`,
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
        // left/right
        if (
          currentCell.dataset.groupedBy === 'colgroup' ||
          Number(currentCell.parentElement?.getAttribute('aria-rowindex')) === 2
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
        const firstAvailableRow = firstAvailableCell?.parentElement;
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

  render() {
    const SDataTable = Root;
    const { Children, styles, w, wMax, wMin, h, hMax, hMin, virtualScroll, children, headerProps } =
      this.asProps;

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(this.columns);
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;

    const Head = findComponent<DataTableHeadProps>(Children, ['DataTable.Head']);
    const headerPropsToCheck = headerProps ?? Head?.props;

    const topOffset =
      headerPropsToCheck?.sticky || headerPropsToCheck?.withScrollBar
        ? this.getTopScrollOffset()
        : undefined;

    const width =
      w ??
      (this.columns.some((c) => c.gridColumnWidth === 'auto' || c.gridColumnWidth === '1fr')
        ? '100%'
        : undefined);

    let gridTemplateRows: string | undefined = undefined;

    if (virtualScroll && typeof virtualScroll !== 'boolean' && 'rowHeight' in virtualScroll) {
      gridTemplateRows = `auto auto repeat(${this.totalRows}, minmax(${virtualScroll.rowHeight}px, auto)`;
    }

    let scrollDirection: 'both' | 'horizontal' | 'vertical' | undefined = undefined;
    const hasWidthSettings = Boolean(w ?? wMax ?? wMin);
    const hasHeightSettings = Boolean(h ?? hMax ?? hMin);

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
        container={this.tableContainerRef}
        styles={scrollStyles}
        onScroll={this.handleScroll}
        disableAutofocusToContent={true}
      >
        <ScrollArea.Container
          tabIndex={-1}
          // @ts-ignore
          scrollDirection={scrollDirection}
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
                <DataTable.Head />
                <DataTable.Body />
              </>
            )}
          </SDataTable>
        </ScrollArea.Container>

        {headerPropsToCheck?.withScrollBar && topOffset && (
          <ScrollArea.Bar orientation='horizontal' top={topOffset - SCROLL_BAR_HEIGHT} zIndex={3} />
        )}

        <ScrollArea.Bar orientation='horizontal' zIndex={2} />
        <ScrollArea.Bar orientation='vertical' zIndex={2} />
      </ScrollArea>,
    );
  }

  private calculateColumns(): DTColumn[] {
    const { children, data } = this.props;

    const HeadComponent = findComponent(children, ['Head']) as ReactElement<DataTableHeadProps> & {
      props: {
        children: Array<ReactElement<DataTableColumnProps> | ReactElement<DataTableGroupProps>>;
      };
    };

    this.hasGroups = findComponent(HeadComponent.props.children, ['Head.Group']) !== undefined;

    let columnIndex = 0;
    let groupIndex = 0;
    let gridColumnIndex = 1;

    const calculateGridTemplateColumn = this.calculateGridTemplateColumn.bind(this);

    const columns: DTColumn[] = [];

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
        // @ts-ignore
        ref: function (node: HTMLElement | null) {
          if (node) {
            const calculatedWidth = node.getBoundingClientRect().width;
            const calculatedHeight = node.getBoundingClientRect().height;
            column.calculatedWidth = calculatedWidth;
            column.calculatedHeight = calculatedHeight;
          }

          this.ref.current = node;
        },
        gridColumnWidth: calculateGridTemplateColumn(columnElement),
        fixed: columnElement.props.fixed ?? parent?.props.fixed,
        calculatedWidth: 0,
        calculatedHeight: 0,
        borders: columnElement.props.borders ?? leftBordersFromParent ?? rightBordersFromParent,
        parent,

        flexWrap: columnElement.props.flexWrap,
        alignItems: columnElement.props.alignItems,
        alignContent: columnElement.props.alignContent,
        justifyContent: columnElement.props.justifyContent,
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
    const { columns, data } = this.props;

    this.hasGroups = columns.some((column) => 'columns' in column);

    let columnIndex = 0;
    let groupIndex = 0;
    let gridColumnIndex = 1;

    const calculateGridTemplateColumn = this.calculateGridTemplateColumn.bind(this);

    const calculatedColumns: DTColumn[] = [];
    const treeColumns: DTColumn[] = [];

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

      const column: DTColumn = {
        name: childIsColumn(columnElement) ? columnElement.name : '',
        // @ts-ignore
        ref: function (node: HTMLElement | null) {
          if (node) {
            const calculatedWidth = node.getBoundingClientRect().width;
            const calculatedHeight = node.getBoundingClientRect().height;
            column.calculatedWidth = calculatedWidth;
            column.calculatedHeight = calculatedHeight;
          }

          if (this) {
            this.ref.current = node;
          }
        },
        gridColumnWidth: childIsColumn(columnElement)
          ? calculateGridTemplateColumn(columnElement)
          : '',
        fixed: columnElement.fixed ?? parent?.fixed,
        calculatedWidth: 0,
        calculatedHeight: 0,
        borders: columnElement.borders ?? leftBordersFromParent ?? rightBordersFromParent,
        parent,

        ...columnElement,
      };

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

  private calculateGridTemplateColumn(
    c: ReactElement<DataTableColumnProps> | ColumnItemConfig,
  ): string {
    return (
      (React.isValidElement(c) ? c.props.gtcWidth : c.gtcWidth) ??
      (this.props.defaultGridTemplateColumnWidth as string)
    );
  }

  private getTopScrollOffset() {
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
}) as DataTableType & {
  Head: typeof Head;
  Body: typeof Body;
};
