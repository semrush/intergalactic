import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { DataTableRowProps, RowPropsInner } from './Row.types';
import { Box, Collapse } from '@semcore/base-components';
import style from './style.shadow.css';
import { Body } from './Body';
import { ACCORDION, SELECT_ALL } from '../DataTable/DataTable';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { DTValue } from '../DataTable/DataTable.types';
import Checkbox from '@semcore/checkbox';

class RowRoot extends Component<DataTableRowProps, {}, {}, [], RowPropsInner> {
  static displayName = 'Row';
  static style = style;

  static defaultProps = {
    'aria-level': undefined,
  };

  private cellIndex = -1;

  cellHasAccordion(cellValue?: DTValue | MergedColumnsCell | MergedRowsCell): cellValue is DTValue {
    return (
      !(cellValue instanceof MergedRowsCell || cellValue instanceof MergedColumnsCell) &&
      Boolean(cellValue?.[ACCORDION])
    );
  }

  handleSelectRow = (value: boolean, event?: React.SyntheticEvent<HTMLElement>) => {
    const { row, rowIndex, onSelectRow } = this.asProps;

    onSelectRow?.(value, rowIndex, row, event);
  };

  handleClickCheckbox = (value: boolean) => (event?: React.SyntheticEvent<HTMLElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    const { row, rowIndex, onSelectRow } = this.asProps;

    onSelectRow?.(value, rowIndex, row, event);
  };

  handleBackFromAccordion = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.asProps.onBackFromAccordion(this.cellIndex);
    }
  };

  render() {
    const SRow = Root;
    const SCollapseRow = Collapse;
    const SAccordionRows = Box;
    const SCell = Body.Cell;
    const SCheckboxCell = Body.Cell;
    const {
      columns,
      row,
      rows,
      styles,
      rowIndex,
      ariaRowIndex,
      gridRowIndex,
      expanded,
      accordionDataGridArea,
      'aria-level': ariaLevel = 1,
      scrollAreaRef,
      selectedRows,
      uid,
      getFixedStyle,
      mergedRow,
      isAccordionRow,
      animationExpand,
      accordionRowIndex,
      accordionDuration,
    } = this.asProps;

    let accordion = row[ACCORDION];
    const accordionType = accordion && !mergedRow ? 'row' : undefined;

    if (!accordion) {
      const cells = Object.values(row);
      const cellWithAccordionIndex = cells.findIndex((value) => {
        return this.cellHasAccordion(value);
      });

      this.cellIndex = cellWithAccordionIndex;

      const cellWithAccordion = cells[cellWithAccordionIndex] as DTValue | undefined;

      accordion = cellWithAccordion?.[ACCORDION];
    }

    const accordionId = `${uid}_${ariaRowIndex + 1}`;

    return sstyled(styles)(
      <>
        <SRow
          render={Box}
          role={'row'}
          aria-rowindex={ariaRowIndex}
          accordionType={accordionType}
          theme={selectedRows?.includes(rowIndex) ? 'info' : undefined}
          use:expanded={expanded && !mergedRow}
        >
          {columns.map((column, i) => {
            if (selectedRows && i === 0) {
              const checked = selectedRows.includes(rowIndex);
              return sstyled(styles)(
                <SCheckboxCell
                  key={i}
                  row={row}
                  rowIndex={rowIndex}
                  // @ts-ignore
                  column={{ name: SELECT_ALL.toString() }}
                  columnIndex={0}
                  gridRowIndex={gridRowIndex}
                  onClick={this.handleClickCheckbox(!checked)}
                >
                  <Checkbox
                    checked={checked}
                    aria-labelledby={`${uid}_${ariaRowIndex}_1`}
                    onChange={this.handleSelectRow}
                  />
                </SCheckboxCell>,
              );
            }

            const index = i;
            const cellValue: DTValue | MergedRowsCell | MergedColumnsCell | undefined =
              row[column.name];

            if (cellValue === undefined) {
              return null;
            }

            const style: React.CSSProperties = {};

            if (column.fixed) {
              const [name, value] = getFixedStyle(column);

              if (name !== undefined && value !== undefined) {
                style[name] = value;
              }
            }

            return (
              <Body.Cell
                key={index}
                id={`${uid}_${ariaRowIndex}_${index}`}
                accordionId={accordionId}
                data-aria-level={index === 0 ? ariaLevel : undefined}
                row={row}
                rowIndex={rowIndex}
                gridRowIndex={gridRowIndex}
                columnIndex={index}
                style={style}
                column={column}
                withAccordion={
                  Boolean(cellValue instanceof MergedRowsCell && cellValue.accordion) ||
                  this.cellHasAccordion(cellValue)
                }
                isAccordionRow={isAccordionRow}
                animationExpand={animationExpand}
                accordionRowIndex={accordionRowIndex}
                rows={rows}
              />
            );
          })}
        </SRow>

        {React.isValidElement(accordion) && (
          <SCollapseRow
            key={rowIndex}
            role={'row'}
            aria-rowindex={ariaRowIndex + 1}
            id={accordionId}
            visible={expanded}
            interactive
            gridArea={accordionDataGridArea}
            duration={accordionDuration ?? 200}
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
              onKeyDown={this.handleBackFromAccordion}
            >
              {accordion}
            </SCell>
          </SCollapseRow>
        )}

        {row[ACCORDION] && Array.isArray(row[ACCORDION]) && (
          <SAccordionRows id={accordionId} role='rowgroup'>
            {row[ACCORDION].map((subrow, i) => {
              return (
                <Row
                  key={i}
                  row={subrow}
                  columns={columns}
                  rows={row[ACCORDION]}
                  rowIndex={rowIndex}
                  aria-hidden={!expanded}
                  aria-posinset={i + 1}
                  aria-level={ariaLevel + 1}
                  ariaRowIndex={ariaRowIndex + 1 + i}
                  gridRowIndex={gridRowIndex + 1 + i}
                  isAccordionRow={true}
                  getFixedStyle={getFixedStyle}
                  animationExpand={expanded}
                  accordionRowIndex={i}
                />
              );
            })}
          </SAccordionRows>
        )}
      </>,
    );
  }
}

// @ts-ignore
export const Row = createComponent(RowRoot, {}, { parent: Body });
