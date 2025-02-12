import React from 'react';

import cn from 'classnames';

import { CellHead, CellRow } from './Cell';
import Row from './Row';
import Head from './Head';
import StickyHead from './StickyHead';
import Body from './Body';
import { Provider } from './context';
import { Box } from '@semcore/flex-box';
import { sstyled } from '@semcore/core';
import { useForkRef } from '@semcore/core/lib/utils/ref';

import styles from './style/table.shadow.css';

const Table = React.forwardRef((props, ref) => {
  const STable = Box;
  const refTable = React.useRef(null);
  const {
    use = 'primary',
    style: styleProps = {},
    className: classNameProps,
    compact,
    ...other
  } = props;
  const sstyles = sstyled(sstyled.merge(styles, other.styles));
  const { className, style } = sstyles.cn('STable', styleProps);

  return (
    <Provider value={{ use, styles, self: { ref: refTable, props }, compact }}>
      <STable
        ref={useForkRef(refTable, ref)}
        tag='table'
        data-ui-name='Table'
        style={Object.assign({}, style, styleProps)}
        className={cn(className, classNameProps) || undefined}
        {...other}
      />
    </Provider>
  );
});

Table.displayName = 'Table';
Table.Head = Head;
Table.StickyHead = StickyHead;
Table.Body = Body;
Table.Row = Row;
Table.Cell = CellRow;
Table.CellHead = CellHead;

export default Table;
