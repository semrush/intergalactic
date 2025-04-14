import * as React from 'react';
import {
  Component,
  createComponent,
  Intergalactic,
  lastInteraction,
  Root,
  sstyled,
} from '@semcore/core';
import { BodyPropsInner, DataTableBodyProps } from './Body.types';
import { Box } from '@semcore/base-components';
import { Row } from './Row';

import style from './style.shadow.css';
import { Cell } from './Cell';
import { DataTableRowProps, DTRow, RowPropsInner } from './Row.types';
import { DataTableCellProps } from './Cell.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { ACCORDION } from '../DataTable/DataTable';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import { ButtonLink } from '@semcore/button';
import { DTValue } from '../DataTable/DataTable.types';
import Spin from '@semcore/spin';

class BodyRoot extends Component<DataTableBodyProps, {}, {}, [], BodyPropsInner> {
  static displayName = 'Body';
  static style = style;

  rowsHeightMap = new Map<number, [number, number]>();

  handleRef = (index: number) => (node: HTMLElement | null) => {
    if (!this.rowsHeightMap.has(index)) {
      const firstChild = node?.children.item(0);
      if (firstChild instanceof HTMLElement) {
        const offset =
          firstChild.offsetTop - this.asProps.headerRef.current?.getBoundingClientRect().height ??
          0;
        const height = firstChild.getBoundingClientRect().height;

        this.rowsHeightMap.set(index, [offset, offset + height]);

        // setTimeout(() => {
        //   const tableGridElement = this.asProps.tableRef.current;
        //   if (tableGridElement) {
        //     const rowsTemplateVariableName = tableGridElement.style[2];
        //     this.gridTemplateRows.push(`${firstChild.getBoundingClientRect().height}px`);
        //
        //     tableGridElement.style.setProperty(
        //       rowsTemplateVariableName,
        //       `${this.gridTemplateRows.join(' ')} repeat(${
        //         this.asProps.rows.length - (this.gridTemplateRows.length - 2)
        //       }, minmax(45px, auto))`,
        //     );
        //   }
        // }, 0);
      }
    }
  };

  getRowProps(props: { row: DTRow; offset: number }, i: number): RowPropsInner {
    const {
      rows,
      flatRows,
      use,
      gridTemplateAreas,
      gridTemplateColumns,
      expandedRows,
      columns,
      onExpandRow,
      loading,
    } = this.asProps;
    const row = props.row;
    const index = props.offset + i;

    const rowIndex = (expandedRows ?? []).reduce((acc, item) => {
      if (item < index) {
        const expandedRow = flatRows[item][ACCORDION];
        if (Array.isArray(expandedRow)) {
          acc = acc + expandedRow.length;
        } else {
          acc = acc + 1;
        }
      }

      return acc;
    }, index);
    const ariaRowIndex = rowIndex + 2; // 1 - for header, 1 - because start not from 0, but from 1

    const accordionDataGridArea = Array.isArray(row[ACCORDION])
      ? `${ariaRowIndex + 1} / 1 / ${ariaRowIndex + 1 + row[ACCORDION].length} / ${
          columns.length + 1
        }`
      : `${ariaRowIndex + 1} / 1 / ${ariaRowIndex + 1} / ${columns.length + 1}`;

    return {
      use,
      gridTemplateAreas,
      gridTemplateColumns,
      expanded: expandedRows?.includes(index),
      accordionDataGridArea,
      columns,
      rowIndex: index,
      ariaRowIndex,
      rows,
      flatRows,
      row,
      expandedRows,
      onExpandRow,
      inert: loading ? '' : undefined,
    };
  }

  getCellProps(props: DataTableCellProps) {
    const { use, renderCell, expandedRows, styles, getI18nText, onExpandRow } = this.asProps;
    const SAccordionToggle = ButtonLink;

    let dataKey = props.column.name;
    const cellValue = props.row[dataKey];

    let value: DTValue = '';
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
      if ((props.columnIndex === 0 && props.row[ACCORDION]) || value[ACCORDION]) {
        return sstyled(styles)(
          <>
            <SAccordionToggle
              aria-label={getI18nText('DataTable.Cell.AccordionToggle.expand:aria-label')}
              // @ts-ignore
              expanded={expandedRows?.includes(props.rowIndex)}
              onClick={() => onExpandRow(props.rowIndex)}
              color={'--intergalactic-icon-primary-neutral'}
            >
              <SAccordionToggle.Addon tag={ChevronRightM} />
            </SAccordionToggle>
            {value.toString()}
          </>,
        );
      }

      return value.toString();
    };

    const extraProps: Record<string, any> = {
      use,
      children: props.children ?? defaultRender,
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
        value: value.toString(),
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

    return extraProps;
  }

  // componentDidUpdate(prevProps: DataTableBodyProps & BodyPropsInner) {
  //   if (this.asProps.virtualScroll && prevProps.scrollTop !== this.asProps.scrollTop) {
  //     console.log('???');
  //     const { scrollDirection, virtualScroll, tableContainerRef, scrollTop, rows } = this.asProps;
  //
  //     if (scrollDirection === 'down') {
  //       this.setState((prevState) => {
  //         return {
  //           lastIndex: Math.min(prevState.lastIndex + 20, this.asProps.rows.length),
  //         };
  //       });
  //     } else if (scrollDirection === 'up') {
  //       this.setState((prevState) => {
  //         return {
  //           startIndex: Math.max(prevState.startIndex - 20, 0),
  //         };
  //       });
  //     }
  //
  //     const offsetHeight = tableContainerRef.current?.offsetHeight ?? 0;
  //     const tollerance = 6;
  //
  //     let startIndex = this.state.startIndex;
  //
  //     if (typeof virtualScroll === 'boolean') {
  //       for (const [key, value] of this.rowsHeightMap) {
  //         const valueToCompare = scrollDirection === 'down' ? value[1] : value[0];
  //         if (scrollTop < valueToCompare) {
  //           startIndex = Math.max(key - tollerance, 0);
  //           break;
  //         }
  //       }
  //
  //       const lastIndex = Math.min(
  //           Math.ceil((scrollTop + offsetHeight) / 45) + tollerance,
  //           rows.length,
  //       );
  //
  //       this.setState({startIndex, lastIndex});
  //     } else {
  //       const rowHeight = 45; // virtualScroll.rowHeight;
  //
  //       startIndex = Math.max(Math.floor(scrollTop / rowHeight) - tollerance, 0);
  //
  //       const lastIndex = Math.min(
  //           Math.ceil((scrollTop + offsetHeight) / rowHeight) + tollerance,
  //           rows.length,
  //       );
  //
  //       this.setState({startIndex, lastIndex});
  //     }
  //   }
  // }

  render() {
    const SBody = Root;
    const SRowGroup = Box;
    const SSpinContainer = Box;
    const {
      rows,
      styles,
      loading,
      headerHeight,
      spinnerRef,
      virtualScroll,
      scrollDirection,
      tableContainerRef,
      scrollTop,
    } = this.asProps;

    let rowsToRender = rows;
    let startIndex = 0;
    let lastIndex = 20;

    if (virtualScroll) {
      const offsetHeight = tableContainerRef.current?.offsetHeight ?? 0;
      const tollerance = 2;

      if (typeof virtualScroll === 'boolean') {
        let from;
        let to;
        for (const [key, value] of this.rowsHeightMap) {
          const valueFromToCompare = scrollDirection === 'up' ? value[0] : value[1];
          const valueToToCompare = scrollDirection === 'up' ? value[1] : value[0];
          if (from === undefined && scrollTop < valueFromToCompare) {
            startIndex = Math.max(key - tollerance, 0);
            from = startIndex;
          }

          if (from !== undefined && scrollTop + offsetHeight < valueToToCompare) {
            lastIndex = Math.min(key + tollerance, rows.length);
            to = lastIndex;
          }

          if (from !== undefined && to !== undefined) {
            break;
          }
        }

        if (scrollTop + offsetHeight < (this.rowsHeightMap.get(to ?? 0)?.[1] ?? 0)) {
          lastIndex = lastIndex + 20;
        }

        rowsToRender = rows.slice(startIndex, lastIndex);
      } else {
        const rowHeight = virtualScroll.rowHeight ?? 45;

        startIndex = Math.max(Math.floor(scrollTop / rowHeight) - tollerance, 0);

        const lastIndex = Math.min(
          Math.ceil((scrollTop + offsetHeight) / rowHeight) + tollerance,
          rows.length,
        );

        rowsToRender = rows.slice(startIndex, lastIndex);
      }
    }

    return sstyled(styles)(
      <SBody render={Box}>
        {rowsToRender.map((row, index) => {
          let rowMarginStyle = undefined;

          if (index === 0 && typeof virtualScroll === 'boolean') {
            const height = this.rowsHeightMap.get(startIndex - 1);
            const marginTop = height ? height[1] - height[0] : undefined;

            rowMarginStyle = { marginTop };
          }

          if (Array.isArray(row)) {
            return sstyled(styles)(
              <SRowGroup role={'rowgroup'} key={index}>
                {row.map((item, i) => {
                  return (
                    <Body.Row key={`${startIndex}_${index}_${i}`} row={item} offset={startIndex} />
                  );
                })}
              </SRowGroup>,
            );
          }
          return (
            <Body.Row
              key={`${startIndex}_${index}`}
              row={row}
              offset={startIndex}
              ref={this.handleRef(startIndex + index)}
              rowMarginStyle={rowMarginStyle}
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
          >
            <Spin size={'xxl'} />
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
}

export const Body = createComponent(BodyRoot, {
  Row,
  Cell,
}) as Intergalactic.Component<'div', DataTableBodyProps> & {
  Row: Intergalactic.Component<'div', DataTableRowProps>;
  Cell: Intergalactic.Component<'div', DataTableCellProps>;
};
