import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { DataTableRowProps, RowPropsInner } from './Row.types';
import { Box } from '@semcore/base-components';

import style from './style.shadow.css';
import { Body } from './Body';
import { getFixedStyle } from '../../utils';

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

          const gridArea = Array.isArray(cellValue)
            ? `${rowIndex + headerRows + 1} / ${index + 1} / ${rowIndex + headerRows + 2} / ${
                index + 1 + cellValue[1]
              }`
            : undefined;

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
