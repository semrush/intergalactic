import { Box, ScreenReaderOnly } from '@semcore/base-components';
import Checkbox from '@semcore/checkbox';
import { Component, createComponent, type Intergalactic, Root, sstyled } from '@semcore/core';
import type Tooltip from '@semcore/tooltip';
import React from 'react';

import { Column } from './Column';
import type { DataTableColumnProps } from './Column.types';
import { Group } from './Group';
import type { DataTableGroupProps } from './Group.type';
import type { DataTableHeadProps, HeadPropsInner } from './Head.types';
import style from './style.shadow.css';
import { SelectableRows } from '../../store/SelectableRows';
import type { DTRow } from '../Body/Row.types';
import { DataTable, type ROW_GROUP, SELECT_ALL, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import type { DataTableData } from '../DataTable/DataTable.types';

class HeadRoot<
  Data extends DataTableData,
  UniqKey extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? keyof Data[number][typeof ROW_GROUP][number] : keyof Data[number]),
  UniqKeyType extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? Data[number][typeof ROW_GROUP][number][UniqKey] : Data[number][UniqKey]),
> extends Component<
    DataTableHeadProps,
    [],
    {},
    HeadPropsInner<Data, UniqKey, UniqKeyType>
  > {
  static displayName = 'Head';
  static style = style;

  private unsubscribeSelectAll: undefined | (() => void) = undefined;
  private unsubscribeSetIndeterminate: undefined | (() => void) = undefined;
  private unsubscribeMaxLimitReached: undefined | (() => void) = undefined;

  componentDidMount() {
    const { selectedRows } = this.asProps;

    if (selectedRows && !Array.isArray(selectedRows)) {
      this.unsubscribeSelectAll = selectedRows.on(SelectableRows.SELECT_ALL_EVENT, () => {
        this.forceUpdate();
      });

      this.unsubscribeSetIndeterminate = selectedRows.on(SelectableRows.SET_INDETERMINATE_EVENT, () => {
        this.forceUpdate();
      });

      this.unsubscribeMaxLimitReached = selectedRows.on(SelectableRows.MAX_LIMIT_REACHED_CHANGE_EVENT, () => {
        this.forceUpdate();
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribeSelectAll?.();
    this.unsubscribeSetIndeterminate?.();
    this.unsubscribeMaxLimitReached?.();
  }

  sortableColumnDescribeId() {
    const { uid } = this.asProps;
    return `${uid}-column-sortable-describer`;
  }

  getGroupProps(_: any, index: number) {
    const { use, gridAreaGroupMap, children, top, scrollDirection, sort } = this.asProps;

    return {
      use,
      gridArea: gridAreaGroupMap.get(index),
      withConfig: children === undefined,
      scrollDirection,
      top: top && scrollDirection !== 'horizontal' ? `${top}px` : undefined,
      sort,
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
      selectedRows,
      h,
      onCellClick,
      scrollDirection,
      headerNodesMap,
    } = this.asProps;
    const column = columns[index];

    if (index === 0 && selectedRows && columns[index + 1].fixed) {
      column.fixed = 'left';
    }

    return {
      use,
      'aria-colindex': index + 1,
      'gridArea': column.gridArea,
      'fixed': column.fixed,
      sticky,
      'borders': column.borders,
      sort,
      onSortChange,
      'parent': column.parent,
      'sortableColumnDescribeId': this.sortableColumnDescribeId(),
      'columnIndex': index,
      tableRef,
      gridTemplateColumns,
      gridTemplateAreas,
      h,
      'onClick': onCellClick,
      scrollDirection,
      headerNodesMap,
      'top': top && scrollDirection !== 'horizontal' ? `${top}px` : undefined,
    };
  }

  handleSelectAll = (value: boolean, event?: React.SyntheticEvent<HTMLElement>) => {
    const { selectedRows } = this.asProps;

    if (Array.isArray(selectedRows)) {
      const idsSet = new Set<UniqKeyType>(selectedRows);

      if (value) {
        this.selectableRows.forEach((row) => {
          idsSet.add(row[UNIQ_ROW_KEY]);
        });
      } else {
        this.selectableRows.forEach((row) => {
          idsSet.delete(row[UNIQ_ROW_KEY]);
        });
      }

      this.asProps.onChangeSelectAll?.(Array.from(idsSet), event);
    } else if (selectedRows) {
      if (value) {
        selectedRows.selectAll();
      } else {
        selectedRows.clearAllAvailable();
      }
    }
  };

  handleClickSelectAll = (value: boolean) => (event?: React.SyntheticEvent<HTMLElement>) => {
    event?.preventDefault();
    event?.stopPropagation();

    this.handleSelectAll(value, event);
  };

  get areAllRowsSelected() {
    const { selectedRows } = this.asProps;

    if (Array.isArray(selectedRows)) {
      return selectedRows.length > 0 && this.selectableRows.every((row) => selectedRows?.includes(row[UNIQ_ROW_KEY]));
    } else if (selectedRows) {
      return selectedRows.isAllSelected();
    }
  }

  get isIndeterminate() {
    const { selectedRows } = this.asProps;

    if (Array.isArray(selectedRows)) {
      return this.selectableRows.some((row) => selectedRows?.includes(row[UNIQ_ROW_KEY]));
    } else if (selectedRows) {
      return selectedRows.isIndeterminate();
    }
  }

  get isDisabledCheckbox() {
    const { selectedRows } = this.asProps;

    if (selectedRows && !Array.isArray(selectedRows)) {
      return selectedRows.isExceeded();
    }

    return false;
  }

  get selectableRows(): DTRow<UniqKeyType>[] {
    const { columns, flatRows } = this.asProps;
    const mappedFlatRows = flatRows
      .filter((r) => {
        const nextColumnName = columns[1]?.name;
        return r[nextColumnName] !== undefined;
      });

    return mappedFlatRows;
  }

  render() {
    const SHead = Root;
    const SHeadCheckboxCol = Head.Column;
    const { Children, styles, getI18nText, children, treeColumns, selectedRows, sticky, animationDuration, isDataEmpty, gridTemplateColumns } = this.asProps;

    const areAllRowsSelected = this.areAllRowsSelected;
    const indeterminate = this.isIndeterminate && !areAllRowsSelected;
    const isDisabledCheckbox = this.isDisabledCheckbox && (indeterminate || !areAllRowsSelected);

    return sstyled(styles)(
      <>
        <SHead
          render={Box}
          role='row'
          aria-rowindex={1}
          sticky={sticky}
          use:animationDuration={animationDuration ? `${animationDuration}ms` : undefined}
          isDataEmpty={isDataEmpty}
          use:gridTemplateColumns={gridTemplateColumns.join(' ')}
          tabIndex={isDataEmpty ? 0 : undefined}
        >
          {selectedRows && (
            <SHeadCheckboxCol
              name={SELECT_ALL}
              onClick={!isDisabledCheckbox ? this.handleClickSelectAll(!areAllRowsSelected) : undefined}
              // @ts-expect-error use it for css only
              disabled={isDisabledCheckbox}
            >
              <Checkbox
                checked={areAllRowsSelected}
                indeterminate={indeterminate}
                disabled={isDisabledCheckbox}
                aria-label={getI18nText('DataTable.Header.selectAllCheckbox:aria-label')}
                onChange={this.handleSelectAll}
              >
                <Checkbox.Value>
                  <Checkbox.Value.Control />
                  <Checkbox.Value.CheckMark mt={0} />
                </Checkbox.Value>
              </Checkbox>
            </SHeadCheckboxCol>
          )}

          {children
            ? (
                <Children />
              )
            : (
                <>
                  {treeColumns.map((column, _i) => {
                    if ('columns' in column) {
                      const columnsName = column.columns?.map((c) => c.name).join('/');
                      return (
                        <DataTable.Head.Group
                          key={columnsName}
                          {...column}
                          name={columnsName}
                          title=''
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

type HeadComponent = Intergalactic.Component<
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

export const Head = createComponent<
  HeadComponent,
  typeof HeadRoot
>(HeadRoot, { Column, Group });
