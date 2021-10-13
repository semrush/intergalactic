import React, { useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';

import { CellHead, CellRow } from './Cell';
import Row from './Row';
import Head from './Head';
import StickyHead from './StickyHead';
import Body from './Body';
import { Provider } from './context';
import { Box } from '@semcore/flex-box';
import { Component, create, sstyled, styled } from '@semcore/core';
import { useForkRef } from '@semcore/utils/lib/ref';

import styles from './style/table.shadow.css';

const Table = React.forwardRef((props, ref) => {
  const STable = Box;
  const refTable = useRef(null);
  const { use = 'primary', style: styleProps = {}, className: classNameProps, ...other } = props;
  const sstyles = sstyled(styles);
  const { className, style } = sstyles.cn('STable', styleProps);

  return (
    <Provider value={{ use, styles, self: { ref: refTable, props } }}>
      <STable
        ref={useForkRef(refTable, ref)}
        tag="table"
        data-ui-name="Table"
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
