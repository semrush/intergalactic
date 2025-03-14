import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { BodyPropsInner, DataTableBodyProps } from './Body.types';
import { Box } from '@semcore/base-components';
import { Row } from './Row';

import style from './style.shadow.css';
import { Cell } from './Cell';
import { DataTableRowProps } from './Row.types';
import { DataTableCellProps } from './Cell.types';

class BodyRoot extends Component<DataTableBodyProps, {}, {}, [], BodyPropsInner> {
  static displayName = 'Body';
  static style = style;

  getRowProps() {
    const { use } = this.asProps;

    return {
      use,
    };
  }

  getCellProps() {
    const { use } = this.asProps;

    return {
      use,
    };
  }

  render() {
    const SBody = Root;
    const { rows, columns, styles } = this.asProps;

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
