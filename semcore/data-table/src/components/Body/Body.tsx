import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { BodyPropsInner, DataTableBodyProps } from './Body.types';
import { Box } from '@semcore/base-components';
import { Row } from './Row';

import style from './style.shadow.css';
import { Cell } from './Cell';
import { DataTableRowProps, DTRow, RowPropsInner } from './Row.types';
import { DataTableCellProps } from './Cell.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { ACCORDION } from '../DataTable/DataTable';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import { ButtonLink } from '@semcore/button';
import { DTValue } from '../DataTable/DataTable.types';
import Spin from '@semcore/spin';

class BodyRoot extends Component<DataTableBodyProps, {}, {}, [], BodyPropsInner> {
  static displayName = 'Body';
  static style = style;

  getRowProps(props: { row: DTRow }, index: number): RowPropsInner {
    const {
      rows,
      flatRows,
      use,
      gridTemplateAreas,
      gridTemplateColumns,
      expandedRows,
      columns,
      onExpandRow,
    } = this.asProps;
    const row = props.row;

    const rowIndex = (expandedRows ?? []).reduce((acc, item) => {
      if (item < index) {
        const expandedRow = flatRows[item][ACCORDION];
        if (Array.isArray(expandedRow)) {
          acc = acc + expandedRow.length;
        } else {
          acc = acc + 1;
        }
      }

      return acc;
    }, index);
    const ariaRowIndex = rowIndex + 2; // 1 - for header, 1 - because start not from 0, but from 1

    const accordionDataGridArea = Array.isArray(row[ACCORDION])
      ? `${ariaRowIndex + 1} / 1 / ${ariaRowIndex + 1 + row[ACCORDION].length} / ${
          columns.length + 1
        }`
      : `${ariaRowIndex + 1} / 1 / ${ariaRowIndex + 1} / ${columns.length + 1}`;

    return {
      use,
      gridTemplateAreas,
      gridTemplateColumns,
      expanded: expandedRows?.includes(index),
      accordionDataGridArea,
      columns,
      rowIndex: index,
      ariaRowIndex,
      rows,
      flatRows,
      row,
      expandedRows,
      onExpandRow,
    };
  }

  getCellProps(props: DataTableCellProps) {
    const { use, renderCell, expandedRows, styles, getI18nText, onExpandRow } = this.asProps;
    const SAccordionToggle = ButtonLink;

    let dataKey = props.column.name;
    const cellValue = props.row[dataKey];

    let value: DTValue = '';
    const isMergedRows = cellValue instanceof MergedRowsCell;
    const isMergedColumns = cellValue instanceof MergedColumnsCell;

    if (isMergedColumns || isMergedRows) {
      value = cellValue.value;
      if (isMergedColumns) {
        dataKey = cellValue.dataKey;
      }
    } else {
      value = cellValue;
    }

    const defaultRender = () => {
      if (props.columnIndex === 0 && props.row[ACCORDION]) {
        return sstyled(styles)(
          <>
            <SAccordionToggle
              aria-label={getI18nText('DataTable.Cell.AccordionToggle.expand:aria-label')}
              // @ts-ignore
              expanded={expandedRows?.includes(props.rowIndex)}
              onClick={() => onExpandRow(props.rowIndex)}
              color={'--intergalactic-icon-primary-neutral'}
            >
              <SAccordionToggle.Addon tag={ChevronRightM} />
            </SAccordionToggle>
            {value}
          </>,
        );
      }

      return value;
    };

    return {
      use,
      children: renderCell
        ? renderCell({
            columnName: props.column.name,
            row: props.row,
            column: props.column,
            rowIndex: props.rowIndex,
            columnIndex: props.columnIndex,
            dataKey,
            defaultRender: defaultRender,
            value,
            isMergedRows,
            isMergedColumns,
          })
        : defaultRender(),
    };
  }

  render() {
    const SBody = Root;
    const SRowGroup = Box;
    const SSpinContainer = Box;
    const { rows, styles, loading, headerHeight } = this.asProps;

    return sstyled(styles)(
      <SBody render={Box}>
        {rows.map((row, index) => {
          if (Array.isArray(row)) {
            return sstyled(styles)(
              <SRowGroup role={'rowgroup'} key={index}>
                {row.map((item, index) => {
                  return <Body.Row key={index} row={item} />;
                })}
              </SRowGroup>,
            );
          }
          return <Body.Row key={index} row={row} />;
        })}
        {loading && (
          // @ts-ignore
          <SSpinContainer aria-hidden headerHeight={`${headerHeight}px`}>
            <Spin size={'xxl'} />
          </SSpinContainer>
        )}
      </SBody>,
    );
  }
}

export const Body = createComponent(BodyRoot, {
  Row,
  Cell,
}) as Intergalactic.Component<'div', DataTableBodyProps> & {
  Row: Intergalactic.Component<'div', DataTableRowProps>;
  Cell: Intergalactic.Component<'div', DataTableCellProps>;
};
