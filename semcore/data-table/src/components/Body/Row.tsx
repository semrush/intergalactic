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
    const { columns, row, rows, styles } = this.asProps;

    return sstyled(styles)(
      <SRow render={Box}>
        {columns.map((column, index) => {
          const [name, value] = getFixedStyle(column, columns);

          return (
            <Body.Cell
              key={index}
              role={'gridcell'}
              aria-colindex={index + 1}
              row={row}
              columnIndex={index}
              fixed={column.fixed}
            >
              {row[column.name]}
            </Body.Cell>
          );
        })}
      </SRow>,
    );
  }
}

export const Row = createComponent(RowRoot, {}, { parent: Body });
