import * as React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { DataTableBodyProps } from './Body.types';
import { Box } from '@semcore/base-components';
import { Row } from './Row';

import style from './style.shadow.css';

export class Body extends Component<DataTableBodyProps> {
  static displayName = 'Body';
  static style = style;

  render() {
    const SBody = Root;
    const { rows, columns, styles } = this.asProps;

    return sstyled(styles)(
      <SBody render={Box}>
        {rows.map((row, index) => {
          return (
            <Row
              key={index}
              role={'row'}
              aria-rowindex={index + 2}
              columns={columns}
              row={row}
              rows={rows}
              rowIndex={index}
            />
          );
        })}
      </SBody>,
    );
  }
}
