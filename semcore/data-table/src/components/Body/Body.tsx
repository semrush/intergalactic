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

  getRowProps(_: any, index: number) {
    const { use, expandedRows } = this.asProps;

    return {
      use,
      expanded: expandedRows?.includes(index),
      onExpandRow: (expandedRowIndex: number) => {
        if (expandedRows?.includes(expandedRowIndex)) {
          this.handlers.expandedRows(expandedRows.filter((row) => row !== expandedRowIndex));
        } else {
          this.handlers.expandedRows([...expandedRows!, expandedRowIndex]);
        }
      },
    };
  }

  getCellProps(props: DataTableCellProps) {
    const { use, renderCell } = this.asProps;

    const defaultRender = () => {
      const cellValue = props.row[props.name];

      if (cellValue instanceof MergedRowsCell || cellValue instanceof MergedColumnsCell) {
        return cellValue.value;
      }

      return cellValue;
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
    const { rows, columns, styles, headerRows } = this.asProps;

    return sstyled(styles)(
      <SBody render={Box}>
        {rows.map((row, index) => {
          return (
            <Body.Row
              key={index}
              role={'row'}
              aria-rowindex={index + 2}
              columns={columns}
              row={row}
              rows={rows}
              rowIndex={index}
              headerRows={headerRows}
            />
          );
        })}
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
