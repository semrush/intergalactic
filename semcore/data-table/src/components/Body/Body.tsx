import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { BodyPropsInner, DataTableBodyProps } from './Body.types';
import { Box } from '@semcore/base-components';
import { Row } from './Row';

import style from './style.shadow.css';
import { Cell } from './Cell';
import { DataTableRowProps, DTRow, RowPropsInner, UniqRowKey } from './Row.types';
import { DataTableCellProps } from './Cell.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { ACCORDION, ROW_GROUP, ROW_INDEX, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import { ButtonLink } from '@semcore/button';
import { DTValue } from '../DataTable/DataTable.types';
import Spin from '@semcore/spin';
import { isInteractiveElement } from '@semcore/core/lib/utils/isInteractiveElement';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';

const ROWS_BUFFER = 20;
const APROX_ROWS_ON_PAGE = 20;

type State = {
  expandedForAnimation: Set<UniqRowKey>;
};

class BodyRoot extends Component<DataTableBodyProps, {}, State, [], BodyPropsInner> {
  static displayName = 'Body';
  static style = style;

  rowsHeightMap = new Map<number, [number, number, HTMLElement]>();

  indexForDownIterate = 0;
  indexForUpIterate = 0;

  state: State = {
    expandedForAnimation: new Set(),
  };

  handleRef = (index: number, row: DTRow) => (node: HTMLElement | null) => {
    if (!this.rowsHeightMap.has(index) && node) {
      this.rowsHeightMap.set(index, [0, 0, node]);
      this.setRowHeight(index, row);
    }
  };

  handleExpandRow = (row: DTRow, index: number) => {
    const { accordionDuration } = this.asProps;
    const openDuration = Array.isArray(accordionDuration)
      ? accordionDuration[0]
      : accordionDuration ??
        (Array.isArray(row[ACCORDION]) ? Math.min(50 * row[ACCORDION].length, 200) : 200);
    const closeDuration = Array.isArray(accordionDuration)
      ? accordionDuration[1]
      : accordionDuration ??
        (Array.isArray(row[ACCORDION]) ? Math.min(50 * row[ACCORDION].length, 200) : 200);

    setTimeout(() => {
      this.setRowHeight(index, row);
      for (let i = index; i < this.rowsHeightMap.size; i++) {
        this.setRowHeight(i, row);
      }
    }, openDuration + 100); // we need to calculate after expanding animation

    if (this.asProps.expandedRows.has(row[UNIQ_ROW_KEY])) {
      this.setState((prevState) => {
        prevState.expandedForAnimation.add(row[UNIQ_ROW_KEY]);
        return {
          expandedForAnimation: new Set([...prevState.expandedForAnimation]),
        };
      });
      setTimeout(() => {
        this.asProps.onExpandRow(row);

        this.setState((prevState) => {
          prevState.expandedForAnimation.delete(row[UNIQ_ROW_KEY]);
          return {
            expandedForAnimation: new Set([...prevState.expandedForAnimation]),
          };
        });
      }, closeDuration + 100); // we need to remove it from list of grid calculations after expanding animation
    } else {
      this.asProps.onExpandRow(row);
    }
  };

  handleClickRow = (row: DTRow, index: number) => (e: React.SyntheticEvent<HTMLElement>) => {
    if (!isInteractiveElement(e.target)) {
      this.handleExpandRow(row, index);
    }
  };
  handleClickCell = (row: DTRow, index: number) => (e: React.SyntheticEvent<HTMLElement>) => {
    if (!isInteractiveElement(e.target)) {
      this.handleExpandRow(row, index);
    }
  };

  getRowProps(props: { row: DTRow; mergedRow?: boolean }): RowPropsInner {
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
      rows,
      flatRows,
      sideIndents,
      selectedRows,
      onSelectRow,
      getFixedStyle,
      accordionDuration,
    } = this.asProps;
    const row = props.row;
    const index = row[ROW_INDEX];

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
      onClick: row[ACCORDION] && !props.mergedRow ? this.handleClickRow(row, index) : undefined,
      ...rowProps?.(row, index),
      use,
      uid,
      gridTemplateAreas,
      gridTemplateColumns,
      expanded:
        expandedRows?.has(row[UNIQ_ROW_KEY]) &&
        !this.state.expandedForAnimation.has(row[UNIQ_ROW_KEY]),
      accordionDataGridArea,
      columns,
      rowIndex: index,
      ariaRowIndex,
      gridRowIndex,
      rows,
      onBackFromAccordion,
      row,
      expandedRows,
      onExpandRow,
      selectedRows,
      onSelectRow,
      inert: loading ? '' : undefined,
      scrollAreaRef,
      sideIndents,
      getFixedStyle,
      mergedRow: props.mergedRow,
      accordionDuration,
    };
  }

  getCellProps(props: DataTableCellProps) {
    const {
      use,
      renderCell,
      expandedRows,
      styles,
      getI18nText,
      virtualScroll,
      tableRef,
      flatRows,
      accordionDuration,
    } = this.asProps;
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
      accordionDuration,
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

    if (
      (props.columnIndex === 0 && props.row[ACCORDION]) ||
      value?.[ACCORDION] ||
      (cellValue instanceof MergedRowsCell && cellValue.accordion)
    ) {
      let expanded =
        expandedRows?.has(props.row[UNIQ_ROW_KEY]) &&
        !this.state.expandedForAnimation.has(props.row[UNIQ_ROW_KEY]);

      if (cellValue instanceof MergedRowsCell && cellValue.accordion && props.row[ROW_GROUP]) {
        const mergedKeysSet = props.row[ROW_GROUP];

        expanded = [...mergedKeysSet].some((key) => expandedRows?.has(key));
      }

      extraProps.expanded = expanded;

      let row = props.row;
      let rowIndex = props.rowIndex;

      if (cellValue instanceof MergedRowsCell && cellValue.accordion) {
        row = flatRows[props.rowIndex + cellValue.rowsCount - 1];
        rowIndex = props.rowIndex + cellValue.rowsCount - 1;
      }

      const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        this.handleExpandRow(row, rowIndex);
      };

      if (value?.[ACCORDION] || (cellValue instanceof MergedRowsCell && cellValue.accordion)) {
        extraProps.onClick = callAllEventHandlers(
          extraProps.onClick,
          this.handleClickCell(row, rowIndex),
        );
      }

      extraProps.children = sstyled(styles)(
        <>
          <SAccordionToggle
            aria-label={getI18nText('DataTable.Cell.AccordionToggle.expand:aria-label')}
            // @ts-ignore
            expanded={expanded}
            onClick={handleClick}
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
      rows,
    } = this.asProps;

    let rowsToRender = rows;
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
              lastIndex = Math.min(key + nextPrepared, rows.length);
            }

            if (startIndex !== -1 && lastIndex !== -1) {
              break;
            }
          }

          if (scrollTop + offsetHeight < (this.rowsHeightMap.get(lastIndex ?? 0)?.[1] ?? 0)) {
            lastIndex = lastIndex + aproxRowsOnPage;
          }
        } else if (scrollDirection === 'up') {
          for (let i = this.indexForUpIterate; i >= 0; i--) {
            const value = this.rowsHeightMap.get(i);
            if (!value) continue;
            const key = i;
            const valueFromToCompare = value[1];
            const valueToToCompare = value[0];

            if (lastIndex === -1 && scrollTop + offsetHeight > valueToToCompare) {
              lastIndex = Math.min(key + nextPrepared, rows.length);
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
          startIndex = scrollTop === 0 ? 0 : Math.max(rows.length - aproxRowsOnPage, 0);
        }

        if (lastIndex === -1) {
          lastIndex = scrollTop === 0 ? aproxRowsOnPage : rows.length;
        }

        this.indexForDownIterate = startIndex;
        this.indexForUpIterate = lastIndex;

        rowsToRender = rows.slice(startIndex, lastIndex);
      } else if ('rowHeight' in virtualScroll) {
        const rowHeight = virtualScroll.rowHeight;

        startIndex = Math.max(Math.floor(scrollTop / rowHeight) - prevPrepared, 0);

        const lastIndex = Math.min(
          Math.ceil((scrollTop + offsetHeight) / rowHeight) + nextPrepared,
          rows.length,
        );

        rowsToRender = rows.slice(startIndex, lastIndex);
      }
    }

    startIndex = startIndex === -1 ? 0 : startIndex;
    const rowMarginTop = this.rowsHeightMap.get(startIndex - 1)?.[1];

    let emptyRow: DTRow | null = null;

    if (rowsToRender.length === 0) {
      emptyRow = {
        [UNIQ_ROW_KEY]: `${uid}_empty_data`,
        [ROW_INDEX]: 0,
        [columns[0].name]: new MergedColumnsCell(renderEmptyData(), {
          dataKey: columns[0].name,
          size: columns.length,
        }),
      };
    }

    return sstyled(styles)(
      <SBody render={Box} __excludeProps={['data']}>
        {emptyRow && <Body.Row row={emptyRow} />}
        {typeof virtualScroll === 'boolean' && rowMarginTop && <Box h={rowMarginTop} />}
        {rowsToRender.map((row, index) => {
          if (Array.isArray(row)) {
            return sstyled(styles)(
              <SRowGroup
                role={'rowgroup'}
                key={`gg_${row[0][UNIQ_ROW_KEY]}`}
                ref={this.handleRef(startIndex + index, row[0])}
              >
                {row.map((item, i) => {
                  return (
                    <Body.Row
                      key={item[UNIQ_ROW_KEY]}
                      row={item}
                      mergedRow={i > 0 ? true : false}
                    />
                  );
                })}
              </SRowGroup>,
            );
          }
          return (
            <Body.Row
              key={row[UNIQ_ROW_KEY]}
              row={row}
              ref={virtualScroll ? this.handleRef(startIndex + index, row) : undefined}
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

  private setRowHeight(index: number, row: DTRow) {
    const { expandedRows } = this.asProps;
    const node = this.rowsHeightMap.get(index)?.[2];
    const firstChild =
      node?.role === 'rowgroup' ? node?.children.item(0)?.children.item(0) : node?.children.item(0);
    if (node && firstChild instanceof HTMLElement) {
      const offset = firstChild.offsetTop - this.asProps.headerHeight;
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
