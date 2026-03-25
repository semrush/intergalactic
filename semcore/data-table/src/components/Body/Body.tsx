import { Box } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { hasParent } from '@semcore/core/lib/utils/hasParent';
import Spin from '@semcore/spin';
import * as React from 'react';

import type { BodyPropsInner, DataTableBodyProps, DataTableBodyType } from './Body.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import type { RowRoot } from './Row';
import { Row } from './Row';
import type { DataTableRowProps, DataTableRowType, DTRow, RowPropsInner } from './Row.types';
import style from './style.shadow.css';
import {
  GRID_ROW_INDEX,
  IS_EMPTY_DATA_ROW,
  ROW_INDEX, SELECT_ALL,
  UNIQ_ROW_KEY,
} from '../DataTable/DataTable';
import type { DataTableData } from '../DataTable/DataTable.types';

const ROWS_BUFFER = 20;
const APROX_ROWS_ON_PAGE = 20;
export const INDEX_OFFSET = 2; // 1 - for header, 1 - because start not from 0, but from 1

class BodyRoot<Data extends DataTableData, UniqKeyType> extends Component<DataTableBodyProps<Data, UniqKeyType>, {}, {}, [], BodyPropsInner<Data, UniqKeyType>> {
  static displayName = 'Body';
  static style = style;

  rowsHeightMap = new Map<number, [number, number, HTMLElement]>();
  rowsComponentsMap = new Map<UniqKeyType, RowRoot<Data, UniqKeyType>>();

  indexForDownIterate = 0;
  indexForUpIterate = 0;

  startIndex = -1;

  bodyRef = React.createRef<HTMLDivElement>();
  spinContainerIsFocused = false;

  constructor(props: DataTableBodyProps<Data, UniqKeyType>) {
    super(props);
    this.setRowHeight = this.setRowHeight.bind(this);
  }

  componentDidUpdate(prevProps: DataTableBodyProps<Data, UniqKeyType> & BodyPropsInner<Data, UniqKeyType>) {
    const { loading, gridContainerRef } = this.asProps;
    if (prevProps.loading !== loading) {
      if (loading) {
        const activeElement = document.activeElement; // need to define it here because of FF
        setTimeout(() => {
          if ((gridContainerRef.current && hasParent(activeElement, gridContainerRef.current))) {
            gridContainerRef.current?.focus();
          }
        });
      } else if (!loading && this.spinContainerIsFocused) {
        setTimeout(() => {
          gridContainerRef.current?.focus();
        });
        this.spinContainerIsFocused = false;
      }
    }
  }

  calculateAriaRowIndex = () => {
    requestAnimationFrame(() => {
      const collapsedElements = this.bodyRef.current?.querySelectorAll('[role=row][data-ui-name="Collapse"]:not([aria-hidden=true]):not(:scope [data-ui-name="DataTable"] [role=row]:not([aria-hidden=true]))');

      collapsedElements?.forEach((collapsedElement) => {
        const parent = collapsedElement.parentElement;
        if (parent?.getAttribute('role') === 'rowgroup') {
          parent?.appendChild(collapsedElement);
        }
      });

      const visibleRows = this.bodyRef.current?.querySelectorAll('[role=row]:not([aria-hidden=true]):not(:scope [data-ui-name="DataTable"] [role=row]:not([aria-hidden=true]))');

      visibleRows?.forEach((row, index) => {
        if (row instanceof HTMLElement) {
          row.setAttribute('aria-rowindex', (index + 2 + this.startIndex).toString());
        }
      });

      if (!this.asProps.totalRows) {
        this.asProps.gridContainerRef.current?.setAttribute('aria-rowcount', (visibleRows?.length ?? 0).toString());
      }
    });
  };

  handleRef = (index: number, row: DTRow<UniqKeyType>) => (node: HTMLElement | null) => {
    if (!this.rowsHeightMap.has(index) && node) {
      this.rowsHeightMap.set(index, [0, 0, node]);
      this.setRowHeight(index, row);
    }
  };

  handleComponentRef = (row: DTRow<UniqKeyType>) => (component: RowRoot<Data, UniqKeyType> | null) => {
    requestAnimationFrame(() => {
      if (component) {
        this.rowsComponentsMap.set(row[UNIQ_ROW_KEY], component);
      } else {
        this.rowsComponentsMap.delete(row[UNIQ_ROW_KEY]);
      }
    });
  };

  getRowProps(props: { row: DTRow<UniqKeyType>; mergedRow?: boolean }): RowPropsInner<Data, UniqKeyType> {
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
      accordionAnimationRows,
      getI18nText,
      renderCell,
      tableRef,
      gridContainerRef,
      onCellClick,
      rawData,
      shadowVertical,
      accordionMode,
      virtualScroll,
      limit,
      variant,
    } = this.asProps;
    const row = props.row;
    const index = row[ROW_INDEX];
    const gridRowIndex = row[GRID_ROW_INDEX] + (hasGroups ? INDEX_OFFSET + 1 : INDEX_OFFSET); // 1 - for header, 1 - because start not from 0, but from 1

    const sideIndentsValue = variant === 'card' ? 'wide' : sideIndents;

    const calculatedRowProps = rowProps?.(row, index) ?? {};

    const rowUniqKey = row[UNIQ_ROW_KEY];
    if (selectedRows?.includes(rowUniqKey)) {
      calculatedRowProps.theme = 'info';
    }

    return {
      ...calculatedRowProps,
      use,
      uid,
      gridTemplateAreas,
      gridTemplateColumns,
      columns,
      rowIndex: index,
      gridRowIndex,
      rows,
      onBackFromAccordion,
      row,
      onExpandRow,
      selectedRows,
      onSelectRow,
      inert: loading ? '' : undefined,
      scrollAreaRef,
      sideIndents: sideIndentsValue,
      getFixedStyle,
      mergedRow: props.mergedRow,
      accordionDuration,
      accordionAnimationRows,
      flatRows,
      getI18nText,
      renderCell,
      tableRef,
      gridContainerRef,
      onCellClick,
      rawData,
      expandedRows,
      rowsHeightMap: this.rowsHeightMap,
      setRowHeight: this.setRowHeight,
      shadowVertical,
      accordionMode,
      componentsMap: this.rowsComponentsMap,
      calculateAriaRowIndex: this.calculateAriaRowIndex,
      virtualScroll,
      variant,
      limit,
      hasGroups,
    };
  }

  getSpinnerTopOffset = () => {
    const { headerHeight: propsHeaderHeight, tableRef, stickyHeader } = this.asProps;

    let headerHeight = propsHeaderHeight;

    if (stickyHeader) {
      return headerHeight;
    }

    if (tableRef.current) {
      if (tableRef.current.scrollTop > headerHeight) {
        headerHeight = 0;
      } else {
        headerHeight = headerHeight - tableRef.current.scrollTop;
      }
    }

    return headerHeight;
  };

  handleFocusSpinContainer = () => {
    this.spinContainerIsFocused = true;
  };

  handleBlurSpinContainer = () => {
    this.spinContainerIsFocused = false;
  };

  render() {
    const SBody = Root;
    const SRowGroup = Box;
    const SSpinContainer = Box;
    const {
      styles,
      loading,
      spinnerRef,
      virtualScroll,
      scrollDirection,
      tableContainerRef,
      scrollTop,
      renderEmptyData,
      columns,
      uid,
      rows,
      renderCellOverlay,
      selectedRows,
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

    this.startIndex = startIndex === -1 ? 0 : startIndex;
    const rowMarginTop = this.rowsHeightMap.get(this.startIndex - 1)?.[1];

    let emptyRow: DTRow<string> | null = null;

    if (rowsToRender.length === 0) {
      emptyRow = {
        [UNIQ_ROW_KEY]: `${uid}_empty_data`,
        [IS_EMPTY_DATA_ROW]: true,
        [ROW_INDEX]: 0,
        [GRID_ROW_INDEX]: 0,
        [columns[0].name]: new MergedColumnsCell(renderEmptyData(), {
          dataKey: columns[0].name,
          size: columns.length,
        }),
      };
    }

    if (canUseDOM()) {
      this.calculateAriaRowIndex();
    }

    return sstyled(styles)(
      <SBody render={Box} __excludeProps={['data']} ref={this.bodyRef}>
        {emptyRow && <Body.Row row={emptyRow} isNonInteractive />}
        {typeof virtualScroll === 'boolean' && rowMarginTop && <Box h={rowMarginTop} />}
        {rowsToRender.map((row, index) => {
          if (Array.isArray(row)) {
            const groupUniqKey = row[0][UNIQ_ROW_KEY];

            let isFirstCellAreMergedRows = false;
            const theme: 'info' | undefined = undefined;

            if (selectedRows) {
              const nextColumnName = columns[1].name;
              const firstCell = row[0][nextColumnName];

              if (firstCell instanceof MergedRowsCell) {
                row[0][SELECT_ALL.toString()] = new MergedRowsCell('', firstCell.rowsCount);

                isFirstCellAreMergedRows = true;
              }
            }

            return sstyled(styles)(
              <SRowGroup
                role='rowgroup'
                key={`gg_${groupUniqKey}`}
                ref={this.handleRef(this.startIndex + index, row[0])}
              >
                {row.map((item, i) => {
                  const rowProps: DataTableRowProps<any, any> = {
                    row: item,
                    mergedRow: i > 0 ? true : false,
                    componentRef: this.handleComponentRef(item),
                  };

                  if ((isFirstCellAreMergedRows && selectedRows?.includes(groupUniqKey))) {
                    rowProps.theme = 'info';
                  }

                  return (
                    <Body.Row
                      key={item[UNIQ_ROW_KEY]?.toString() ?? `gg_${groupUniqKey}_row_${i}`}
                      {...rowProps}
                    />
                  );
                })}
              </SRowGroup>,
            );
          }

          return (
            <Body.Row
              key={row[UNIQ_ROW_KEY]?.toString()}
              row={row}
              ref={virtualScroll ? this.handleRef(this.startIndex + index, row) : undefined}
              componentRef={this.handleComponentRef(row)}
            />
          );
        })}
        {renderCellOverlay?.()}
        {loading && (
          <SSpinContainer
            innerOutline
            // @ts-ignore
            headerHeight={`${this.getSpinnerTopOffset()}px`}
            tabIndex={-1}
            ref={spinnerRef}
            role='row'
            onFocus={this.handleFocusSpinContainer}
            onBlur={this.handleBlurSpinContainer}
          >
            <Spin size='xxl' role='gridcell' />
          </SSpinContainer>
        )}
      </SBody>,
    );
  }

  private setRowHeight(index: number, row: DTRow<UniqKeyType>) {
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
}) as DataTableBodyType & {
  Row: DataTableRowType;
};
