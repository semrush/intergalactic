import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { DataTableHeadProps, HeadPropsInner } from './Head.types';
import { Box, ScreenReaderOnly } from '@semcore/base-components';
import Tooltip from '@semcore/tooltip';

import style from './style.shadow.css';
import { Column } from './Column';
import { Group } from './Group';
import { DataTableColumnProps } from './Column.types';
import { getFixedStyle } from '../../utils';
import { DataTableGroupProps } from './Group.type';
import { DataTableData } from '../DataTable/DataTable.types';
import { DataTable } from '../DataTable/DataTable';

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
      top,
    } = this.asProps;
    const column = columns[index];
    const [name, value] = getFixedStyle(column, columns);
    const style: any = {};

    if (top) {
      style.top = `${top}px`;
    }

    if (name !== undefined && value !== undefined) {
      style[name] = value;

      this.fixedColumnsMap.set(column.name, value);
    }

    return {
      use,
      'aria-colindex': index + 1,
      ref: (node: HTMLElement | null) => column.ref?.(node),
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
    const { Children, styles, getI18nText, children, treeColumns } = this.asProps;

    return sstyled(styles)(
      <>
        <SHead render={Box} role='row' aria-rowindex={1}>
          {children ? (
            <Children />
          ) : (
            <>
              {treeColumns.map((column, i) => {
                if ('columns' in column) {
                  return (
                    <DataTable.Head.Group
                      key={column.name}
                      {...column}
                      name={column.columns?.map((c) => c.name).join('/')}
                      title={''}
                    />
                  );
                }

                return <DataTable.Head.Column key={column.name} {...column} />;
              })}
            </>
          )}
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
  Column: <Tag extends 'div' | typeof Tooltip = 'div'>(
    props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableColumnProps, {}, []>,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults;
  Group: <Tag extends 'div' | typeof Tooltip = 'div'>(
    props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableGroupProps, {}, []>,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults;
};
