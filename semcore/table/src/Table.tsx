import React, { HTMLAttributes, ComponentProps, useRef } from 'react';
import { CellHead, CellRow } from './Cell';
import Row from './Row';
import Head, { StickyHead } from './Head';
import Body from './Body';
import { Provider, ITableCtx } from './context';
import { Box, IBoxProps } from '@semcore/flex-box';
// @ts-ignore
import { ComponentType, Merge, styled, create } from '@semcore/core';
import { useForkRef } from '@semcore/utils/lib/ref';

import style from './style/table.shadow.css';

export interface ITableProps extends IBoxProps {
  /**
   * @default primary
   */
  use?: ITableCtx['use'];
}

const Table = React.forwardRef((props, ref) => {
  const refTable = useRef(null);
  const STable = Box;
  const { use = 'primary', styles: stylesProps = {}, ...other } = props;
  const styles = create([style, stylesProps]);

  return (
    <Provider value={{ use, styles, self: { ref: refTable, props } }}>
      {styled(styles)(<STable ref={useForkRef(refTable, ref)} tag="table" {...other} />)}
    </Provider>
  );
}) as ComponentType<
  Merge<ITableProps, HTMLAttributes<HTMLDivElement>>,
  {
    Head: ComponentProps<typeof Head>;
    StickyHead: ComponentProps<typeof StickyHead>;
    Body: ComponentProps<typeof Body>;
    Row: ComponentProps<typeof Row>;
    Cell: ComponentProps<typeof CellRow>;
    CellHead: ComponentProps<typeof CellHead>;
  }
>;

Table.displayName = 'Table';
Table.Head = Head;
Table.StickyHead = StickyHead;
Table.Body = Body;
Table.Row = Row;
Table.Cell = CellRow;
Table.CellHead = CellHead;

export default Table;
