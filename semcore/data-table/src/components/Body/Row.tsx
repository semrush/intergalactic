import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { DataTableRowProps, RowPropsInner } from './Row.types';
import { Box, Collapse } from '@semcore/base-components';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import style from './style.shadow.css';
import { Body } from './Body';
import { getFixedStyle } from '../../utils';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { ACCORDION } from '@semcore/data-table';
import { ButtonLink } from '@semcore/button';

class RowRoot extends Component<DataTableRowProps, {}, {}, [], RowPropsInner> {
  static displayName = 'Row';
  static style = style;

  render() {
    const SRow = Root;
    const SCollapseRow = Collapse;
    const { columns, row, rows, styles, rowIndex, headerRows, expanded, onExpandRow } =
      this.asProps;

    const accordionDataGridArea = `${rowIndex + headerRows + 2} / 1 / ${
      rowIndex + headerRows + 2
    } / ${columns.length + 2}`;

    const accordionColumn = columns[0];
    const SAccordionToggleContainer = Body.Cell;
    const SAccordionToggle = ButtonLink;

    return sstyled(styles)(
      <>
        <SRow render={Box}>
          {row[ACCORDION] && (
            <SAccordionToggleContainer
              role={'gridcell'}
              aria-colindex={'1'}
              row={row}
              rowIndex={rowIndex}
              columnIndex={0}
              fixed={accordionColumn.fixed}
              style={style}
              name={ACCORDION}
              column={accordionColumn}
              borders={accordionColumn.borders}
              flexWrap={accordionColumn.flexWrap}
              alignItems={accordionColumn.alignItems}
              alignContent={accordionColumn.alignContent}
              justifyContent={accordionColumn.justifyContent}
              aria-expanded={expanded}
              aria-level={1}
              // gridArea={gridArea}
            >
              <SAccordionToggle
                expanded={expanded}
                onClick={() => onExpandRow?.(rowIndex)}
                color={'--intergalactic-icon-primary-neutral'}
              >
                <SAccordionToggle.Addon tag={ChevronRightM} />
              </SAccordionToggle>
            </SAccordionToggleContainer>
          )}
          {columns.map((column, i) => {
            const index = rows.hasAccordion ? i + 1 : i;
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

            let gridArea: string | undefined = undefined;

            if (cellValue instanceof MergedColumnsCell) {
              gridArea = `${rowIndex + headerRows + 1} / ${index + 1} / ${
                rowIndex + headerRows + 2
              } / ${index + 1 + cellValue.columnsCount}`;
            } else if (cellValue instanceof MergedRowsCell) {
              gridArea = `${rowIndex + headerRows + 1} / ${index + 1} / ${
                rowIndex + headerRows + 1 + cellValue.rowsCount
              } / ${index + 2}`;
            }

            return (
              <Body.Cell
                key={index}
                role={'gridcell'}
                aria-colindex={index + 1}
                aria-level={1}
                row={row}
                rowIndex={rowIndex}
                columnIndex={index}
                fixed={column.fixed}
                style={style}
                name={column.name}
                column={column}
                borders={column.borders}
                flexWrap={column.flexWrap}
                alignItems={column.alignItems}
                alignContent={column.alignContent}
                justifyContent={column.justifyContent}
                gridArea={gridArea}
              />
            );
          })}
        </SRow>

        {row[ACCORDION] && React.isValidElement(row[ACCORDION]) && (
          <SCollapseRow
            key={rowIndex}
            role={'row'}
            aria-rowindex={rowIndex + 2}
            visible={expanded}
            interactive
            gridArea={accordionDataGridArea}
            // style={{gridArea: gridArea}}
            // preserveNode
            duration={200}
            aria-level={2}
            aria-setsize={1}
            aria-posinset={1}
          >
            {row[ACCORDION]}
          </SCollapseRow>
        )}
      </>,
    );
  }
}

export const Row = createComponent(RowRoot, {}, { parent: Body });
