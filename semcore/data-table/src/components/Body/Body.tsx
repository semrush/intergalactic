import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { BodyPropsInner, DataTableBodyProps } from './Body.types';
import { Box } from '@semcore/base-components';
import { Row } from './Row';

import style from './style.shadow.css';
import { Cell } from './Cell';
import { DataTableRowProps, DTRow, RowPropsInner } from './Row.types';
import { DataTableCellProps } from './Cell.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { ACCORDION, ROW_GROUP, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import { ButtonLink } from '@semcore/button';
import { DataRowItem, DataTableData, DTValue } from '../DataTable/DataTable.types';
import Spin from '@semcore/spin';
import { DTColumn } from '../Head/Column.types';

const ROWS_BUFFER = 20;
const APROX_ROWS_ON_PAGE = 20;

class BodyRoot<D extends DataTableData> extends Component<
  DataTableBodyProps,
  {},
  {},
  [],
  BodyPropsInner<D>
> {
  static displayName = 'Body';
  static style = style;

  private columnsSplitter = '/';
  private rows: Array<DTRow | DTRow[]> = [];

  rowsHeightMap = new Map<number, [number, number, HTMLElement]>();

  indexForDownIterate = 0;
  indexForUpIterate = 0;

  componentDidMount() {
    this.rows = this.calculateRows();

    this.forceUpdate();
  }

  componentDidUpdate(prevProps: DataTableBodyProps & BodyPropsInner<D>) {
    if (prevProps.data !== this.asProps.data) {
      this.rows = this.calculateRows();

      this.forceUpdate();
    }
  }

  handleRef = (index: number, row: DTRow) => (node: HTMLElement | null) => {
    if (!this.rowsHeightMap.has(index) && node) {
      this.rowsHeightMap.set(index, [0, 0, node]);
      this.setRowHeight(index, row);
    }
  };

  handleExpandRow = (row: DTRow, index: number) => {
    setTimeout(() => {
      this.setRowHeight(index, row);
      for (let i = index; i < this.rowsHeightMap.size; i++) {
        this.setRowHeight(i, row);
      }
    }, 300); // we need to calculate after expanding animation

    this.asProps.onExpandRow(row);
  };

  getRowProps(props: { row: DTRow; offset: number }, i: number): RowPropsInner {
    const {
      use,
      gridTemplateAreas,
      gridTemplateColumns,
      expandedRows,
      columns,
      onExpandRow,
      loading,
      hasGroups,
      scrollAreaRef,
      uid,
      onBackFromAccordion,
      rowProps,
    } = this.asProps;
    const row = props.row;
    const index = props.offset + i;
    const flatRows = this.rows.flat();

    const rowIndex = Array.from(expandedRows ?? []).reduce((acc, item) => {
      const rowIndex = flatRows.findIndex((row) => row[UNIQ_ROW_KEY] === item);
      if (rowIndex < index) {
        const expandedRow = flatRows[rowIndex]?.[ACCORDION];
        if (Array.isArray(expandedRow)) {
          acc = acc + expandedRow.length;
        } else {
          acc = acc + 1;
        }
      }

      return acc;
    }, index);

    const gridRowIndex = rowIndex + (hasGroups ? 3 : 2); // 1 - for header, 1 - because start not from 0, but from 1
    const ariaRowIndex = rowIndex + 2; // 1 - for header, 1 - because start not from 0, but from 1

    const accordionDataGridArea = Array.isArray(row[ACCORDION])
      ? `${gridRowIndex + 1} / 1 / ${gridRowIndex + 1 + row[ACCORDION].length} / ${
          columns.length + 1
        }`
      : `${gridRowIndex + 1} / 1 / ${gridRowIndex + 1} / ${columns.length + 1}`;

    return {
      ...rowProps?.(row, index),
      use,
      gridTemplateAreas,
      gridTemplateColumns,
      expanded: expandedRows?.has(row[UNIQ_ROW_KEY]),
      accordionDataGridArea,
      columns,
      rowIndex: index,
      ariaRowIndex,
      gridRowIndex,
      rows: this.rows,
      onBackFromAccordion,
      row,
      expandedRows,
      onExpandRow,
      inert: loading ? '' : undefined,
      scrollAreaRef,
      uid,
    };
  }

  getCellProps(props: DataTableCellProps) {
    const { use, renderCell, expandedRows, styles, getI18nText, virtualScroll, tableRef } =
      this.asProps;
    const SAccordionToggle = ButtonLink;

    let dataKey = props.column.name;
    const cellValue = props.row[dataKey];

    let value: DTValue | undefined = undefined;
    const isMergedRows = cellValue instanceof MergedRowsCell;
    const isMergedColumns = cellValue instanceof MergedColumnsCell;

    if (isMergedColumns || isMergedRows) {
      value = cellValue.value;
      if (isMergedColumns) {
        dataKey = cellValue.dataKey;
      }
    } else {
      value = cellValue;
    }

    const defaultRender = () => {
      return React.isValidElement(value) ? value : value?.toString();
    };

    const extraProps: Record<string, any> = {
      use,
      virtualScroll: Boolean(virtualScroll),
      tableRef,
      children: props.children ?? defaultRender(),
    };

    if (renderCell) {
      const external = renderCell({
        columnName: props.column.name,
        row: props.row,
        column: props.column,
        rowIndex: props.rowIndex,
        columnIndex: props.columnIndex,
        dataKey,
        defaultRender,
        value: React.isValidElement(value) ? value : value?.toString() ?? '',
        isMergedRows,
        isMergedColumns,
      });

      if (this.isReactNode(external) || Array.isArray(external)) {
        extraProps.children = external;
      } else {
        for (const key in external) {
          extraProps[key] = external[key];
        }
      }
    }

    if ((props.columnIndex === 0 && props.row[ACCORDION]) || value?.[ACCORDION]) {
      const expanded = expandedRows?.has(props.row[UNIQ_ROW_KEY]);
      extraProps.children = sstyled(styles)(
        <>
          <SAccordionToggle
            aria-label={getI18nText('DataTable.Cell.AccordionToggle.expand:aria-label')}
            // @ts-ignore
            expanded={expanded}
            onClick={() => this.handleExpandRow(props.row, props.rowIndex)}
            color={'--intergalactic-icon-primary-neutral'}
            aria-expanded={expanded}
            aria-describedby={props.id}
            aria-controls={props.accordionId}
          >
            <SAccordionToggle.Addon tag={ChevronRightM} />
          </SAccordionToggle>
          {extraProps.children}
        </>,
      );
    }

    return extraProps;
  }

  render() {
    const SBody = Root;
    const SRowGroup = Box;
    const SSpinContainer = Box;
    const {
      styles,
      loading,
      headerHeight,
      spinnerRef,
      virtualScroll,
      scrollDirection,
      tableContainerRef,
      scrollTop,
      renderEmptyData,
      columns,
      uid,
    } = this.asProps;

    let rowsToRender = this.rows;
    let startIndex = -1;
    let lastIndex = -1;

    if (virtualScroll) {
      const rowsBuffer =
        typeof virtualScroll !== 'boolean' && 'rowsBuffer' in virtualScroll
          ? virtualScroll.rowsBuffer ?? ROWS_BUFFER
          : ROWS_BUFFER;
      const offsetHeight = tableContainerRef.current?.offsetHeight ?? 0;
      const prevPrepared = scrollDirection === 'up' ? rowsBuffer : 4;
      const nextPrepared = scrollDirection === 'up' ? 4 : rowsBuffer;

      if (typeof virtualScroll === 'boolean' || 'aproxRowsOnPage' in virtualScroll) {
        const aproxRowsOnPage =
          typeof virtualScroll !== 'boolean'
            ? virtualScroll.aproxRowsOnPage ?? APROX_ROWS_ON_PAGE
            : APROX_ROWS_ON_PAGE;
        if (scrollDirection === 'down') {
          for (let i = this.indexForDownIterate; i < this.rowsHeightMap.size - 1; i++) {
            const value = this.rowsHeightMap.get(i);
            if (!value) continue;
            const key = i;
            const valueFromToCompare = value[1];
            const valueToToCompare = value[0];

            if (startIndex === -1 && scrollTop < valueFromToCompare) {
              startIndex = Math.max(key - prevPrepared, 0);
            }

            if (startIndex !== -1 && scrollTop + offsetHeight < valueToToCompare) {
              lastIndex = Math.min(key + nextPrepared, this.rows.length);
            }

            if (startIndex !== -1 && lastIndex !== -1) {
              break;
            }
          }

          if (scrollTop + offsetHeight < (this.rowsHeightMap.get(lastIndex ?? 0)?.[1] ?? 0)) {
            lastIndex = lastIndex + aproxRowsOnPage;
          }
        } else if (scrollDirection === 'up') {
          for (let i = this.indexForUpIterate; i > 0; i--) {
            const value = this.rowsHeightMap.get(i);
            if (!value) continue;
            const key = i;
            const valueFromToCompare = value[1];
            const valueToToCompare = value[0];

            if (lastIndex === -1 && scrollTop + offsetHeight > valueToToCompare) {
              lastIndex = Math.min(key + nextPrepared, this.rows.length);
            }

            if (lastIndex !== -1 && scrollTop < valueFromToCompare) {
              startIndex = Math.max(key - prevPrepared, 0);
            }

            if (startIndex !== -1 && lastIndex !== -1) {
              break;
            }
          }

          if (scrollTop < (this.rowsHeightMap.get(startIndex ?? 0)?.[0] ?? 0)) {
            startIndex = Math.max(startIndex - aproxRowsOnPage, 0);
          }
        }

        if (startIndex === -1) {
          startIndex = scrollTop === 0 ? 0 : Math.max(this.rows.length - aproxRowsOnPage, 0);
        }

        if (lastIndex === -1) {
          lastIndex = scrollTop === 0 ? aproxRowsOnPage : this.rows.length;
        }

        this.indexForDownIterate = startIndex;
        this.indexForUpIterate = lastIndex;

        rowsToRender = this.rows.slice(startIndex, lastIndex);
      } else if ('rowHeight' in virtualScroll) {
        const rowHeight = virtualScroll.rowHeight;

        startIndex = Math.max(Math.floor(scrollTop / rowHeight) - prevPrepared, 0);

        const lastIndex = Math.min(
          Math.ceil((scrollTop + offsetHeight) / rowHeight) + nextPrepared,
          this.rows.length,
        );

        rowsToRender = this.rows.slice(startIndex, lastIndex);
      }
    }

    startIndex = startIndex === -1 ? 0 : startIndex;

    let emptyRow: DTRow | null = null;

    if (rowsToRender.length === 0) {
      emptyRow = {
        [UNIQ_ROW_KEY]: `${uid}_empty_data`,
        [columns[0].name]: new MergedColumnsCell(renderEmptyData(), {
          dataKey: columns[0].name,
          size: columns.length,
        }),
      };
    }

    return sstyled(styles)(
      <SBody render={Box} __excludeProps={['data']}>
        {emptyRow && <Body.Row row={emptyRow} offset={0} />}
        {rowsToRender.map((row, index) => {
          let rowMarginTop: number | undefined = undefined;

          if (index === 0 && typeof virtualScroll === 'boolean') {
            rowMarginTop = this.rowsHeightMap.get(startIndex - 1)?.[1];
          }

          if (Array.isArray(row)) {
            return sstyled(styles)(
              <SRowGroup role={'rowgroup'} key={index}>
                {row.map((item, i) => {
                  return <Body.Row key={item[UNIQ_ROW_KEY]} row={item} offset={startIndex} />;
                })}
              </SRowGroup>,
            );
          }
          return (
            <Body.Row
              key={row[UNIQ_ROW_KEY]}
              row={row}
              offset={startIndex}
              ref={this.handleRef(startIndex + index, row)}
              rowMarginTop={rowMarginTop}
            />
          );
        })}
        {loading && (
          <SSpinContainer
            innerOutline
            // @ts-ignore
            headerHeight={`${headerHeight}px`}
            tabIndex={-1}
            ref={spinnerRef}
            role={'row'}
          >
            <Spin size={'xxl'} role={'gridcell'} />
          </SSpinContainer>
        )}
      </SBody>,
    );
  }

  private isReactNode(obj: React.ReactNode | Record<string, any>): obj is React.ReactNode {
    return (
      typeof obj === 'string' ||
      typeof obj === 'number' ||
      React.isValidElement(obj) ||
      typeof obj === 'boolean' ||
      obj === undefined ||
      obj === null
    );
  }

  private calculateRows(): Array<DTRow[] | DTRow> {
    const { data, uid, columns } = this.asProps;

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
          [UNIQ_ROW_KEY]: row[UNIQ_ROW_KEY] ?? `${uid}_${(rowIndex + id).toString(36)}`,
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

      const fromRow = rowIndex + 2; // 1 - for header, 1 - because start not from 0, but from 1

      if (groupedRows) {
        const toRow = fromRow + groupedRows.length;
        const innerRows: DTRow[] = [];

        const groupedKeys: string[] = [];
        const groupedRowData = Object.entries(row).reduce<DTRow>(
          (acc, [key, value]) => {
            acc[key] = new MergedRowsCell(value, [fromRow, toRow]);
            groupedKeys.push(key);
            return acc;
          },
          {
            [UNIQ_ROW_KEY]: '', // will fill in makeDtRow
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
          } else {
            dtRow = makeDtRow(childRow, groupedKeys);
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

  private setRowHeight(index: number, row: DTRow) {
    const { expandedRows, stickyHeader, headerHeight } = this.asProps;
    const node = this.rowsHeightMap.get(index)?.[2];
    const firstChild = node?.children.item(0);
    if (node && firstChild instanceof HTMLElement) {
      const offset = firstChild.offsetTop - (stickyHeader ? headerHeight : 0);
      let height = firstChild.getBoundingClientRect().height;

      if (expandedRows.has(row[UNIQ_ROW_KEY]) && node.nextSibling instanceof HTMLElement) {
        height = height + node.nextSibling.getBoundingClientRect().height;
      }

      this.rowsHeightMap.set(index, [offset, offset + height, node]);
    }
  }
}

export const Body = createComponent(BodyRoot, {
  Row,
  Cell,
}) as Intergalactic.Component<'div', DataTableBodyProps> & {
  Row: Intergalactic.Component<'div', DataTableRowProps>;
  Cell: Intergalactic.Component<'div', DataTableCellProps>;
};
