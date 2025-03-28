import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { BodyPropsInner, DataTableBodyProps } from './Body.types';
import { Box } from '@semcore/base-components';
import { Row } from './Row';

import style from './style.shadow.css';
import { Cell } from './Cell';
import { DataTableRowProps } from './Row.types';
import { DataTableCellProps } from './Cell.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { ACCORDION } from '@semcore/data-table';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import { ButtonLink } from '@semcore/button';
import { DTValue } from '../DataTable/DataTable.types';
import Spin from '@semcore/spin';

class BodyRoot extends Component<DataTableBodyProps, {}, {}, [], BodyPropsInner> {
  static displayName = 'Body';
  static style = style;

  static defaultProps = {
    defaultExpandedRows: [],
  };

  uncontrolledProps() {
    return {
      expandedRows: [],
    };
  }

  onExpandRow = (expandedRowIndex: number) => {
    const { expandedRows } = this.asProps;
    if (expandedRows?.includes(expandedRowIndex)) {
      this.handlers.expandedRows(expandedRows.filter((row) => row !== expandedRowIndex));
    } else {
      this.handlers.expandedRows([...expandedRows!, expandedRowIndex]);
    }
  };

  getRowProps(_: any, index: number) {
    const { rows, use, gridTemplateAreas, gridTemplateColumns, expandedRows, columns, headerRows } =
      this.asProps;
    const row = rows[index];

    const rowIndex = (expandedRows ?? []).reduce((acc, item) => {
      if (item < index) {
        acc = acc + 1;
      }

      return acc;
    }, index);

    const accordionDataGridArea = Array.isArray(row[ACCORDION])
      ? `${rowIndex + headerRows + 2} / 1 / ${
          rowIndex + headerRows + 2 + row[ACCORDION].length
        } / ${columns.length + 1}`
      : `${rowIndex + headerRows + 2} / 1 / ${rowIndex + headerRows + 2} / ${columns.length + 1}`;

    return {
      use,
      gridTemplateAreas,
      gridTemplateColumns,
      expanded: expandedRows?.includes(index),
      accordionDataGridArea,
      columns,
      headerRows,
      rowIndex: index,
      rows,
    };
  }

  getCellProps(props: DataTableCellProps) {
    const { use, renderCell, expandedRows, styles } = this.asProps;
    const SAccordionToggle = ButtonLink;

    const defaultRender = () => {
      const cellValue = props.row[props.name];

      let value: DTValue = '';

      if (cellValue instanceof MergedRowsCell || cellValue instanceof MergedColumnsCell) {
        value = cellValue.value;
      } else {
        value = cellValue;
      }

      if (props.columnIndex === 0 && props.row[ACCORDION]) {
        return sstyled(styles)(
          <>
            <SAccordionToggle
              expanded={expandedRows?.includes(props.rowIndex)}
              onClick={() => this.onExpandRow(props.rowIndex)}
              color={'--intergalactic-icon-primary-neutral'}
            >
              <SAccordionToggle.Addon tag={ChevronRightM} />
            </SAccordionToggle>
            {value}
          </>,
        );
      }

      return value;
    };

    return {
      use,
      children: renderCell
        ? renderCell({
            name: props.name,
            row: props.row,
            column: props.column,
            rowIndex: props.rowIndex,
            columnIndex: props.columnIndex,
            defaultRender: defaultRender,
          })
        : defaultRender(),
    };
  }

  render() {
    const SBody = Root;
    const SSpinContainer = Box;
    const { rows, columns, styles, headerRows, loading, headerHeight } = this.asProps;

    return sstyled(styles)(
      <SBody render={Box}>
        {rows.map((row, index) => {
          return (
            <Body.Row
              key={index}
              role={'row'}
              aria-rowindex={index + 2}
              // columns={columns}
              row={row}
              // rows={rows}
              // rowIndex={index}
              // headerRows={headerRows}
            />
          );
        })}
        {loading && (
          <SSpinContainer aria-hidden headerHeight={`${headerHeight}px`}>
            <Spin size={'xxl'} />
          </SSpinContainer>
        )}
      </SBody>,
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
