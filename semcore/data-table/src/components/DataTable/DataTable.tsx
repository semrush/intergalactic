import * as React from 'react';
import { Component, createComponent, lastInteraction, Root, sstyled } from '@semcore/core';
import { Box, ScrollArea } from '@semcore/base-components';

import {
  DataTableProps,
  ColIndex,
  RowIndex,
  DataTableData,
  DTKey,
  DataTableType,
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
import { MergedColumnsCell, MergedRowsCell } from '../Body/MergedCells';
import { forkRef } from '@semcore/core/lib/utils/ref';
import scrollStyles from '../../style/scroll-shadows.shadow.css';
import { DataTableGroupProps } from '../Head/Group.type';

export const ACCORDION = Symbol('accordion');
export const ROW_GROUP = Symbol('ROW_GROUP');

const SCROLL_BAR_HEIGHT = 12;

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
    h: 'auto',
    defaultExpandedRows: [],
  };

  private columnsSplitter = '/';

  private columns: DTColumn[] = [];

  private focusedCell: [RowIndex, ColIndex] = [-1, -1];

  private tableContainerRef = React.createRef<HTMLDivElement>();
  private tableRef = React.createRef<HTMLDivElement>();
  private headerRef = React.createRef<HTMLDivElement>();

  private gridAreaGroupMap = new Map<number, string>();

  constructor(props: DataTableProps<D>) {
    super(props);

    this.columns = this.calculateColumns();
  }

  uncontrolledProps() {
    return {
      expandedRows: [],
    };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  get totalRows() {
    const { totalRows, expandedRows } = this.asProps;

    const expandedRowsCount = expandedRows?.reduce((acc, rowIndex) => {
      const expandedRows = this.calculateRows()[rowIndex][ACCORDION];

      if (Array.isArray(expandedRows)) {
        acc = acc + expandedRows.length;
      } else {
        acc = acc + 1;
      }

      return acc;
    }, 0);

    return (totalRows ?? this.calculateRows().length) + expandedRowsCount;
  }

  get gridSettings() {
    const gridTemplateColumns = this.columns.map((c) => c.gridColumnWidth);
    const gridTemplateAreas = this.columns.map((c) => c.name);

    return {
      gridTemplateColumns,
      gridTemplateAreas,
    };
  }

  getHeadProps(): HeadPropsInner<D> {
    const { use, compact, sort, onSortChange, getI18nText, uid } = this.asProps;
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;

    return {
      columns: this.columns,
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
    };
  }

  getBodyProps(): BodyPropsInner {
    const { use, compact, loading, getI18nText, expandedRows } = this.asProps;
    const rows = this.calculateRows();

    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;
    const header = this.headerRef.current;
    const headerHeight = Array.from(header?.children ?? []).reduce((maxHeight, col) => {
      const rect = col.getBoundingClientRect();
      if (rect.height > maxHeight) {
        maxHeight = rect.height;
      }

      return maxHeight;
    }, 0);

    return {
      columns: this.columns,
      rows,
      use,
      compact: Boolean(compact),
      gridTemplateColumns,
      gridTemplateAreas,
      loading,
      headerHeight,
      getI18nText,
      expandedRows,
      onExpandRow: this.onExpandRow,
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
        if (currentCell.dataset.groupedBy === 'columns') {
          colI = direction === 'left' ? colI - 1 : colI + 1;
        } else {
          rowI = rowI - 1;
        }
      } else if (direction === 'up' || direction === 'down') {
        // top/bottom
        if (currentCell.dataset.groupedBy === 'rows') {
          rowI = direction === 'up' ? rowI - 1 : rowI + 1;
        } else {
          colI = colI - 1;
        }
      }
      this.changeFocusCell(rowI, colI, direction);
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

  handleFocus = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    if (
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

      const cell = row
        ?.querySelectorAll('[role=gridcell], [role=columnheader]')
        .item(this.focusedCell[1]);

      cell?.removeAttribute('inert');
      cell instanceof HTMLElement && cell.focus();

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
    const { Children, styles, w, wMax, wMin, h, hMax, hMin } = this.asProps;

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(this.columns);
    const { gridTemplateColumns, gridTemplateAreas } = this.gridSettings;

    const Head = findComponent<DataTableHeadProps>(Children, ['DataTable.Head']);

    const topOffset =
      Head?.props.sticky || Head?.props.withScrollBar ? this.getTopScrollOffset() : undefined;

    const width =
      w ??
      (this.columns.some((c) => c.gridColumnWidth === 'auto' || c.gridColumnWidth === '1fr')
        ? '100%'
        : undefined);

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
      >
        <ScrollArea.Container tabIndex={-1}>
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
            w={'100%'}
            use:data={undefined}
            use:w={undefined}
            use:wMax={undefined}
            use:wMin={undefined}
            use:h={undefined}
            use:hMax={undefined}
            use:hMin={undefined}
          >
            <Children />
          </SDataTable>
        </ScrollArea.Container>

        {Head?.props.withScrollBar && topOffset && (
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

    const hasGroup = findComponent(HeadComponent.props.children, ['Head.Group']) !== undefined;

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

        col.gridArea = `1 / ${gridColumnIndex} / ${hasGroup ? '3' : '2'} / ${gridColumnIndex + 1}`;

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

  private calculateRows(): DTRow[] {
    const { data } = this.asProps;

    const rows: DTRow[] = [];

    let rowIndex = 0;

    const addToRows = (row: Record<DTKey, any>) => {
      const dtRow = Object.entries(row).reduce<DTRow>((acc, [key, value]) => {
        const columnsToRow = key.split(this.columnsSplitter);

        if (columnsToRow.length === 1) {
          acc[key] = value;
        } else {
          acc[columnsToRow[0]] = new MergedColumnsCell(value, {
            dataKey: key,
            size: columnsToRow.length,
          });
        }

        if (row[ACCORDION]) {
          acc[ACCORDION] = row[ACCORDION];
        }

        return acc;
      }, {});

      rows.push(dtRow);
      rowIndex++;
    };

    data.forEach((row, rowIndex) => {
      const groupedRows: DataTableData | undefined = row[ROW_GROUP];

      const fromRow = rows.length + 2; // 1 - for header, 1 - because start not from 0, but from 1

      if (groupedRows) {
        const toRow = fromRow + groupedRows.length;
        groupedRows.forEach((childRow, index) => {
          // if (index === 0) {
          const rowData = {
            ...childRow,
            ...Object.entries(row).reduce<DTRow>((acc, [key, value]) => {
              acc[key] = new MergedRowsCell(value, [fromRow, toRow]);
              return acc;
            }, {}),
          };

          addToRows(rowData);
          // } else {
          //   addToRows(childRow);
          // }
        });
      } else {
        addToRows(row);
      }
    });

    return rows;
  }

  private calculateGridTemplateColumn(c: ReactElement<DataTableColumnProps>): string {
    return c.props.gtcWidth ?? (this.props.defaultGridTemplateColumnWidth as string);
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
