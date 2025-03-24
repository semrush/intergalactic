import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { DataTableRowProps, RowPropsInner } from './Row.types';
import { Box } from '@semcore/base-components';

import style from './style.shadow.css';
import { Body } from './Body';
import { getFixedStyle } from '../../utils';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';

class RowRoot extends Component<DataTableRowProps, {}, {}, [], RowPropsInner> {
  static displayName = 'Row';
  static style = style;

  render() {
    const SRow = Root;
    const { columns, row, rows, styles, rowIndex, headerRows } = this.asProps;

    return sstyled(styles)(
      <SRow render={Box}>
        {columns.map((column, index) => {
          const cellValue = row[column.name];

          if (cellValue === undefined) {
            return null;
          }

          const style: any = {};

          if (column.fixed) {
            const [name, value] = getFixedStyle(column, columns);

            if (name !== undefined && value !== undefined) {
              style[name] = value;
            }
          }

          let gridArea: string | undefined = undefined;

          if (cellValue instanceof MergedColumnsCell) {
            gridArea = `${rowIndex + headerRows + 1} / ${index + 1} / ${
              rowIndex + headerRows + 2
            } / ${index + 1 + cellValue.columnsCount}`;
          } else if (cellValue instanceof MergedRowsCell) {
            gridArea = `${rowIndex + headerRows + 1} / ${index + 1} / ${
              rowIndex + headerRows + 1 + cellValue.rowsCount
            } / ${index + 2}`;
          }

          return (
            <Body.Cell
              key={index}
              role={'gridcell'}
              aria-colindex={index + 1}
              row={row}
              rowIndex={rowIndex}
              columnIndex={index}
              fixed={column.fixed}
              style={style}
              name={column.name}
              column={column}
              borders={column.borders}
              flexWrap={column.flexWrap}
              alignItems={column.alignItems}
              alignContent={column.alignContent}
              justifyContent={column.justifyContent}
              gridArea={gridArea}
            />
          );
        })}
      </SRow>,
    );
  }
}

export const Row = createComponent(RowRoot, {}, { parent: Body });
