import { Box } from '@semcore/base-components';
import { sstyled } from '@semcore/core';
import * as React from 'react';

import style from './style.shadow.css';
import type { ISelectedRows } from '../../store/SelectableRows';
import { SelectableRows } from '../../store/SelectableRows';
import { Body } from '../Body/Body';
import { MergedRowsCell } from '../Body/MergedCells';
import type { RowRoot } from '../Body/Row';
import type { DTRow, DataTableRowProps } from '../Body/Row.types';
import { SELECT_ALL, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import type { DataTableData } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

type RowGroupProps<Data extends DataTableData, UniqKeyType> = {
  rows: DTRow<UniqKeyType>[];
  selectedRows?: UniqKeyType[] | ISelectedRows<UniqKeyType>;
  columns: DTColumn[];
  startIndex: number;
  rowIndex: number;
  handleRef: (index: number, row: DTRow<UniqKeyType>) => (node: HTMLElement | null) => void;
  handleComponentRef: (row: DTRow<UniqKeyType>) => (component: RowRoot<Data, UniqKeyType> | null) => void;

};

export class RowGroup<Data extends DataTableData, UniqKeyType> extends React.PureComponent<RowGroupProps<Data, UniqKeyType>> {
  // private unsubscribeToggle: undefined | (() => void) = undefined;
  //
  // componentDidMount() {
  //   const { selectedRows, rows } = this.props;
  //
  //   if (selectedRows && !Array.isArray(selectedRows)) {
  //     this.unsubscribeToggle = selectedRows.subscribe(SelectableRows.TOGGLE_EVENT, (key: UniqKeyType) => {
  //       if (rows[0][UNIQ_ROW_KEY] === key) {
  //         this.forceUpdate();
  //       }
  //     });
  //   }
  // }
  //
  // componentWillUnmount() {
  //   this.unsubscribeToggle?.();
  // }

  render() {
    const SRowGroup = Box;
    const { rows, selectedRows, columns, startIndex, rowIndex } = this.props;

    const groupUniqKey = rows[0][UNIQ_ROW_KEY];

    let isFirstCellAreMergedRows = false;
    // const theme: 'info' | undefined = undefined;

    if (selectedRows) {
      const nextColumnName = columns[1].name;
      const firstCell = rows[0][nextColumnName];

      if (firstCell instanceof MergedRowsCell) {
        rows[0][SELECT_ALL.toString()] = new MergedRowsCell('', firstCell.rowsCount);

        isFirstCellAreMergedRows = true;
      }
    }

    return sstyled(style)(
      <SRowGroup
        role='rowgroup'
        key={`gg_${groupUniqKey}`}
        ref={this.props.handleRef(startIndex + rowIndex, rows[0])}
      >
        {rows.map((item, i) => {
          const rowProps: DataTableRowProps<any, any> = {
            row: item,
            mergedRow: i > 0 ? true : false,
            componentRef: this.props.handleComponentRef(item),
          };

          // if (isFirstCellAreMergedRows && (Array.isArray(selectedRows) ? selectedRows.includes(groupUniqKey) : selectedRows?.isChecked(groupUniqKey))) {
          //   rowProps.theme = 'info';
          // }

          return (
            <Body.Row
              key={item[UNIQ_ROW_KEY]?.toString() ?? `gg_${groupUniqKey}_row_${i}`}
              {...rowProps}
            />
          );
        })}
      </SRowGroup>,
    );
  }
}
