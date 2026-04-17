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

  componentDidMount() {
    const { selectedRows } = this.asProps;

    if (selectedRows && !Array.isArray(selectedRows)) {
      this.unsubscribeSelectAll = selectedRows.on(SelectableRows.SELECT_ALL_EVENT, () => {
        this.forceUpdate();
      });

      this.unsubscribeSetIndeterminate = selectedRows.on(SelectableRows.SET_INDETERMINATE_EVENT, () => {
        this.forceUpdate();
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribeSelectAll?.();
    this.unsubscribeSetIndeterminate?.();
  }

  sortableColumnDescribeId() {
    const { uid } = this.asProps;
    return `${uid}-column-sortable-describer`;
  }

  getGroupProps(props: any, index: number) {
    const { fixed, columns } = props;
    const { use, gridAreaGroupMap, children, getFixedStyle, shadowVertical, top, scrollDirection } = this.asProps;
    const groupColumns = columns ?? [];

    const firstColumn = groupColumns[0];
    const lastColumn = groupColumns[groupColumns.length - 1];

    const style: any = {};

    if (fixed === 'left' && firstColumn) {
      const [name, value] = getFixedStyle({ name: firstColumn.name, fixed: 'left' });
      if (name !== undefined && value !== undefined) {
        style[name] = value;
      }
    }
    if (fixed === 'right' && lastColumn) {
      const [name, value] = getFixedStyle({ name: lastColumn.name, fixed: 'right' });
      if (name !== undefined && value !== undefined) {
        style[name] = value;
      }
    }
    if (top && scrollDirection !== 'horizontal') {
      style.top = `${top}px`;
    }

    return {
      use,
      gridArea: gridAreaGroupMap.get(index),
      withConfig: children === undefined,
      getFixedStyle,
      shadowVertical: (firstColumn.showShadowVertical || lastColumn.showShadowVertical) ? shadowVertical : undefined,
      style,
      scrollDirection,
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
      getFixedStyle,
      onCellClick,
      shadowVertical,
      scrollDirection,
    } = this.asProps;
    const column = columns[index];

    if (index === 0 && selectedRows && columns[index + 1].fixed) {
      column.fixed = 'left';
    }

    const [name, value] = getFixedStyle(column);
    const style: any = {};

    if (top && scrollDirection !== 'horizontal') {
      style.top = `${top}px`;
    }

    if (name !== undefined && value !== undefined) {
      style[name] = value;
    }

    return {
      use,
      'aria-colindex': index + 1,
      style,
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
      'shadowVertical': column.showShadowVertical ? shadowVertical : undefined,
      scrollDirection,
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
              name={SELECT_ALL.description ?? ''}
              onClick={this.handleClickSelectAll(!areAllRowsSelected)}
            >
              <Checkbox
                checked={areAllRowsSelected}
                indeterminate={indeterminate}
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
