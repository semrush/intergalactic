import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { DataTableRowProps, RowPropsInner } from './Row.types';
import { Box, Collapse } from '@semcore/base-components';
import style from './style.shadow.css';
import { Body } from './Body';
import { getFixedStyle } from '../../utils';
import { ACCORDION, UNIQ_ROW_KEY, SELECT_ALL } from '../DataTable/DataTable';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { DTValue } from '../DataTable/DataTable.types';
import Checkbox from '@semcore/checkbox';

class RowRoot extends Component<DataTableRowProps, {}, {}, [], RowPropsInner> {
  static displayName = 'Row';
  static style = style;

  static defaultProps = {
    'aria-level': undefined,
  };

  cellHasAccordion(cellValue?: DTValue | MergedColumnsCell | MergedRowsCell): cellValue is DTValue {
    return (
      !(cellValue instanceof MergedRowsCell || cellValue instanceof MergedColumnsCell) &&
      Boolean(cellValue?.[ACCORDION])
    );
  }

  handleSelectRow = (value: boolean) => (event: React.SyntheticEvent<HTMLElement>) => {
    const { row, rowIndex, onSelectRow } = this.asProps;

    onSelectRow?.(value, rowIndex, row, event);
  };

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
      gridRowIndex,
      expanded,
      accordionDataGridArea,
      expandedRows,
      onExpandRow,
      'aria-level': ariaLevel = 1,
      rowMarginTop,
      scrollAreaRef,
      selectedRows,
      uid,
    } = this.asProps;

    let accordion = row[ACCORDION];
    let accordionType = accordion ? 'row' : undefined;

    if (!accordion) {
      const cellWithAccordion = Object.values(row).find((value) => {
        return this.cellHasAccordion(value);
      }) as DTValue | undefined;

      accordion = cellWithAccordion?.[ACCORDION];
      accordionType = 'cell';
    }

    const firstCellId = `${row[UNIQ_ROW_KEY]}_first_cell`;

    return sstyled(styles)(
      <>
        <SRow
          render={Box}
          role={'row'}
          aria-rowindex={ariaRowIndex}
          accordionType={accordionType}
          theme={selectedRows?.includes(rowIndex) ? 'info' : undefined}
        >
          {columns.map((column, i) => {
            if (selectedRows && i === 0) {
              const checked = selectedRows.includes(rowIndex);
              return (
                <Body.Cell
                  key={i}
                  row={row}
                  rowIndex={rowIndex}
                  // @ts-ignore
                  column={{ name: SELECT_ALL.toString() }}
                  columnIndex={0}
                  gridRowIndex={gridRowIndex}
                  onClick={this.handleSelectRow(!checked)}
                >
                  <Checkbox checked={checked} aria-labelledby={firstCellId} />
                </Body.Cell>
              );
            }

            const index = i;
            const cellValue = row[column.name];

            if (cellValue === undefined) {
              return null;
            }

            const style: React.CSSProperties = {};

            if (column.fixed) {
              const [name, value] = getFixedStyle(column, columns);

              if (name !== undefined && value !== undefined) {
                style[name] = value;
              }
            }
            if (rowMarginTop) {
              style.marginTop = rowMarginTop;
            }

            return (
              <Body.Cell
                key={index}
                aria-expanded={
                  (row[ACCORDION] && index === 0) || this.cellHasAccordion(cellValue)
                    ? expanded
                    : undefined
                }
                id={selectedRows && index === 1 ? firstCellId : undefined}
                data-aria-level={index === 0 ? ariaLevel : undefined}
                row={row}
                rowIndex={rowIndex}
                gridRowIndex={gridRowIndex}
                columnIndex={index}
                style={style}
                column={column}
                // @ts-ignore
                withAccordion={this.cellHasAccordion(cellValue)}
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
            zIndex={5}
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
              position={'sticky'}
              left={0}
              w={scrollAreaRef.current?.clientWidth}
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
                rows={row[ACCORDION]}
                rowIndex={rowIndex}
                aria-posinset={i + 1}
                aria-level={ariaLevel + 1}
                ariaRowIndex={ariaRowIndex + 1 + i}
                gridRowIndex={gridRowIndex + 1 + i}
                // expanded={false}
                // onExpandRow={() => onExpandRow(subrow)}
                theme={'muted'}
              />
            );
          })}
      </>,
    );
  }
}

// @ts-ignore
export const Row = createComponent(RowRoot, {}, { parent: Body });
