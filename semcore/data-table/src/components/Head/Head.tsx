import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { DataTableHeadProps, HeadPropsInner } from './Head.types';
import { Box, ScreenReaderOnly } from '@semcore/base-components';

import style from './style.shadow.css';
import { Column } from './Column';
import { Group } from './Group';
import { DataTableColumnProps } from './Column.types';
import { getFixedStyle } from '../../utils';
import { DataTableGroupProps } from './Group.type';
import { DataTableData } from '../DataTable/DataTable.types';

class HeadRoot<D extends DataTableData> extends Component<
  DataTableHeadProps,
  {},
  {},
  [],
  HeadPropsInner<D>
> {
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
    const {
      use,
      columns,
      sort,
      onSortChange,
      tableRef,
      gridTemplateColumns,
      gridTemplateAreas,
      sticky,
    } = this.asProps;
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
      sticky,
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
    const { Children, styles, getI18nText } = this.asProps;

    return sstyled(styles)(
      <>
        <SHead render={Box} role='row' aria-rowindex={1}>
          <Children />
        </SHead>

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
  Column: (
      props: Intergalactic.InternalTypings.EfficientOmit<
          Intergalactic.InternalTypings.ComponentProps<'div', 'div', DataTableColumnProps, {}, []>,
          'tag'
      >,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults;
  Group: (
      props: Intergalactic.InternalTypings.EfficientOmit<
          Intergalactic.InternalTypings.ComponentProps<'div', 'div', DataTableGroupProps, {}, []>,
          'tag'
      >,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults;
};
