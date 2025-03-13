import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { DataTableRowProps } from './Row.types';
import { Box } from '@semcore/base-components';

import style from './style.shadow.css';
import { Cell } from './Cell';

class RowRoot extends Component<DataTableRowProps> {
  static displayName = 'Row';
  static style = style;

  render() {
    const SRow = Root;
    const { columns, row, rows, styles } = this.asProps;

    return sstyled(styles)(
      <SRow render={Box}>
        {columns.map((column, index) => {
          return (
            <Cell
              key={index}
              role={'gridcell'}
              aria-colindex={index + 1}
              row={row}
              columnIndex={index}
            >
              {row[column.name]}
            </Cell>
          );
        })}
      </SRow>,
    );
  }
}

export const Row = createComponent(RowRoot);
