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
import { SELECT_ALL } from '../DataTable/DataTable';
import Checkbox from '@semcore/checkbox';

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
      selectedRows,
    } = this.asProps;
    const column = columns[index];

    if (index === 0 && selectedRows && columns[index + 1].fixed) {
      column.fixed = 'left';
    }

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
    const { Children, styles, getI18nText, selectedRows, onChangeSelectAll, totalRows } =
      this.asProps;

    const checked = selectedRows && selectedRows.length === totalRows && totalRows > 0;
    const indeterminate = selectedRows && selectedRows.length > 0 && !checked;

    return sstyled(styles)(
      <>
        <SHead render={Box} role='row' aria-rowindex={1}>
          {selectedRows && (
            <Head.Column name={SELECT_ALL.toString()}>
              <Checkbox
                checked={checked}
                indeterminate={indeterminate}
                onChange={onChangeSelectAll}
              >
                <Checkbox.Value>
                  <Checkbox.Value.Control />
                  <Checkbox.Value.CheckMark mt={0} />
                </Checkbox.Value>
              </Checkbox>
            </Head.Column>
          )}
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
    props: Intergalactic.InternalTypings.ComponentProps<
      'div' | typeof Tooltip,
      'div',
      DataTableColumnProps,
      {},
      []
    >,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults;
  Group: (
    props: Intergalactic.InternalTypings.ComponentProps<
      'div' | typeof Tooltip,
      'div',
      DataTableGroupProps,
      {},
      []
    >,
  ) => Intergalactic.InternalTypings.ComponentRenderingResults;
};
