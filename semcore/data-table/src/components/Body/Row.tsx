import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { DataTableRowProps, RowPropsInner } from './Row.types';
import { Box, Collapse } from '@semcore/base-components';
import style from './style.shadow.css';
import { Body } from './Body';
import { getFixedStyle } from '../../utils';
import { ACCORDION } from '../DataTable/DataTable';
import {MergedColumnsCell, MergedRowsCell} from './MergedCells';
import {DTValue} from '../DataTable/DataTable.types';

class RowRoot extends Component<DataTableRowProps, {}, {}, [], RowPropsInner> {
  static displayName = 'Row';
  static style = style;

  static defaultProps = {
    'aria-level': undefined,
  };

  cellHasAccordion(cellValue: DTValue | MergedColumnsCell | MergedRowsCell): cellValue is DTValue {
    return !(cellValue instanceof MergedRowsCell || cellValue instanceof MergedColumnsCell) && Boolean(cellValue[ACCORDION]);
  }

  render() {
    const SRow = Root;
    const SCollapseRow = Collapse;
    const SCell = Body.Cell;
    const {
      columns,
      row,
      styles,
      rowIndex,
      ariaRowIndex,
      expanded,
      accordionDataGridArea,
      expandedRows,
      onExpandRow,
      'aria-level': ariaLevel = 1,
    } = this.asProps;

    let accordion = row[ACCORDION];

    if (!accordion) {
      const cellWithAccordion = Object.values(row).find((value) => {
        return this.cellHasAccordion(value);
      }) as DTValue | undefined;

      accordion = cellWithAccordion?.[ACCORDION];
    }

    return sstyled(styles)(
      <>
        <SRow render={Box} role={'row'} aria-rowindex={ariaRowIndex}>
          {columns.map((column, i) => {
            const index = i;
            const cellValue = row[column.name];

            if (cellValue === undefined) {
              return null;
            }

            const style: any = {};

            if (column.fixed) {
              const [name, value] = getFixedStyle(column, columns);

              if (name !== undefined && value !== undefined) {
                style[name] = value;
              }
            }

            return (
              <Body.Cell
                key={index}
                aria-expanded={(row[ACCORDION] && index === 0 || this.cellHasAccordion(cellValue)) ? expanded : undefined}
                data-aria-level={index === 0 ? ariaLevel : undefined}
                row={row}
                rowIndex={rowIndex}
                columnIndex={index}
                style={style}
                column={column}
              />
            );
          })}
        </SRow>

        {React.isValidElement(accordion) && (
          <SCollapseRow
            key={rowIndex}
            role={'row'}
            aria-rowindex={ariaRowIndex + 1}
            visible={expanded}
            interactive
            gridArea={accordionDataGridArea}
            duration={200}
          >
            <SCell
              aria-colindex={1}
              aria-level={ariaLevel + 1}
              aria-setsize={1}
              aria-posinset={1}
              row={row}
              rowIndex={rowIndex + 1}
              columnIndex={1}
              // @ts-ignore
              column={{ name: ACCORDION }}
            >
              {accordion}
            </SCell>
          </SCollapseRow>
        )}

        {row[ACCORDION] &&
          Array.isArray(row[ACCORDION]) &&
          expanded &&
          row[ACCORDION]?.map((subrow, i) => {
            return (
              <Row
                key={i}
                row={subrow}
                columns={columns}
                // visible={expanded}
                rows={row[ACCORDION]}
                rowIndex={rowIndex}
                aria-posinset={i + 1}
                aria-level={ariaLevel + 1}
                ariaRowIndex={ariaRowIndex + 1 + i}
                expanded={expandedRows?.includes(rowIndex + i)}
                onExpandRow={onExpandRow}
              />
            );
          })}
      </>,
    );
  }
}

// @ts-ignore
export const Row = createComponent(RowRoot, {}, { parent: Body });
