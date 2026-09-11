import { Box } from '@semcore/base-components';
import { sstyled } from '@semcore/core';
import * as React from 'react';

import { Row } from './Row';
import style from './style.shadow.css';
import type { ISelectedRows } from '../../store/SelectableRows';
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
  shadowVertical?: '' | 'end' | 'start' | 'median';
  handleRef: (index: number, row: DTRow<UniqKeyType>) => (node: HTMLElement | null) => void;
  handleComponentRef: (row: DTRow<UniqKeyType>) => (component: RowRoot<Data, UniqKeyType> | null) => void;
  getPropsToRow: (props: { row: DTRow<UniqKeyType>; mergedRow?: boolean }) => DataTableRowProps<Data, UniqKeyType>;
};

export class RowGroup<Data extends DataTableData, UniqKeyType> extends React.PureComponent<RowGroupProps<Data, UniqKeyType>> {
  render() {
    const SRowGroup = Box;
    const { rows, selectedRows, columns, startIndex, rowIndex, getPropsToRow, shadowVertical } = this.props;

    const groupUniqKey = rows[0][UNIQ_ROW_KEY];

    if (selectedRows) {
      const nextColumnName = columns[1].name;
      const firstCell = rows[0][nextColumnName];

      if (firstCell instanceof MergedRowsCell) {
        rows[0][SELECT_ALL] = new MergedRowsCell('', firstCell.rowsCount);
      }
    }

    return sstyled(style)(
      <SRowGroup
        role='rowgroup'
        key={`gg_${groupUniqKey}`}
        ref={this.props.handleRef(startIndex + rowIndex, rows[0])}
      >
        {rows.map((item, i) => {
          return (
            <Row
              key={item[UNIQ_ROW_KEY]?.toString() ?? `gg_${groupUniqKey}_row_${i}`}
              componentRef={this.props.handleComponentRef(item)}
              {...getPropsToRow({ row: item, mergedRow: i > 0 ? true : false })}
              shadowVertical={shadowVertical}
            />
          );
        })}
      </SRowGroup>,
    );
  }
}
