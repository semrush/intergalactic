import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { DataTableHeadProps, HeadPropsInner } from './Head.types';
import { Box, ScreenReaderOnly, ScrollArea } from '@semcore/base-components';

import style from './style.shadow.css';
import { Column } from './Column';
import { Group } from './Group';
import { DataTableColumnProps } from './Column.types';
import { getFixedStyle, getScrollOffsetValue } from '../../utils';
import { DataTableGroupProps } from './Group.type';

class HeadRoot extends Component<DataTableHeadProps, {}, {}, [], HeadPropsInner> {
  static displayName = 'Head';
  static style = style;

  fixedColumnsMap = new Map<string, any>();

  sortableColumnDescribeId() {
    const { uid } = this.asProps;
    return `${uid}-column-sortable-describer`;
  }

  getGroupProps(_: any, index: number) {
    const { use, gridAreaGroupMap } = this.asProps;

    return {
      use,
      gridArea: gridAreaGroupMap.get(index),
      fixedColumnsMap: this.fixedColumnsMap,
    };
  }

  getColumnProps(_: any, index: number) {
    const { use, columns, sort, onSortChange, tableRef, gridTemplateColumns, gridTemplateAreas } =
      this.asProps;
    const column = columns[index];
    const [name, value] = getFixedStyle(column, columns);
    const style: any = {};

    if (name !== undefined && value !== undefined) {
      style[name] = value;

      this.fixedColumnsMap.set(column.name, value);
    }

    return {
      use,
      'aria-colindex': index + 1,
      ref: (node: HTMLElement | null) => column.ref(node),
      style,
      gridArea: column.gridArea,
      fixed: column.fixed,
      borders: column.borders,
      sort,
      onSortChange,
      parent: column.parent,
      sortableColumnDescribeId: this.sortableColumnDescribeId(),
      columnIndex: index,
      tableRef,
      gridTemplateColumns,
      gridTemplateAreas,
    };
  }

  render() {
    const SHead = Root;
    const { Children, styles, columns, tableRef, withScrollBar, getI18nText } = this.asProps;
    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(columns);

    return sstyled(styles)(
      <>
        <SHead render={Box} role='row' aria-rowindex={1}>
          <Children />
        </SHead>

        {/*{Boolean(withScrollBar) && tableRef.current && (*/}
        {/*  <Box display={'contents'}>*/}
        {/*    <ScrollArea.Bar*/}
        {/*      orientation='horizontal'*/}
        {/*      container={tableRef}*/}
        {/*      top={'25px'}*/}
        {/*      leftOffset={offsetLeftSum}*/}
        {/*      rightOffset={offsetRightSum}*/}
        {/*    />*/}
        {/*  </Box>*/}
        {/*)}*/}

        <ScreenReaderOnly aria-hidden={true} id={this.sortableColumnDescribeId()}>
          {getI18nText('sortableColumn')}
        </ScreenReaderOnly>
      </>,
    );
  }
}

export const Head = createComponent(HeadRoot, { Column, Group }) as Intergalactic.Component<
  'div',
  DataTableHeadProps
> & {
  Column: Intergalactic.Component<'div', DataTableColumnProps>;
  Group: Intergalactic.Component<'div', DataTableGroupProps>;
};
