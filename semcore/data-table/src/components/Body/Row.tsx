import { Box, Collapse, Flex } from '@semcore/base-components';
import Checkbox from '@semcore/checkbox';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import * as React from 'react';

import { Body } from './Body';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import type { DataTableRowProps, RowPropsInner } from './Row.types';
import style from './style.shadow.css';
import { ACCORDION, IS_EMPTY_DATA_ROW, SELECT_ALL, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import type { DTValue } from '../DataTable/DataTable.types';

class RowRoot<UniqKeyType> extends Component<DataTableRowProps<UniqKeyType>, {}, {}, [], RowPropsInner<UniqKeyType>> {
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

  private createLimitConfig<T>(value: T | undefined):
    | { isDefined: true; value: T }
    | { isDefined: false; value: undefined } {
    return value !== undefined
      ? { isDefined: true, value }
      : { isDefined: false, value: undefined };
  }

  get limitConfiguration() {
    const { rows, columns, renderOverlay } = this.asProps.limit ?? {};

    return {
      rows: this.createLimitConfig(rows),
      columns: this.createLimitConfig(columns),
      renderOverlay,
    };
  }

  get isRowLimited() {
    const { rowIndex } = this.asProps;
    const { rows } = this.limitConfiguration;

    if (!rows.isDefined) return false;

    return rowIndex > rows.value;
  }

  get isRowHidden() {
    const limitConfig = this.limitConfiguration;
    return limitConfig.rows.isDefined && !limitConfig.columns.isDefined && this.isRowLimited ? true : undefined;
  }

  get limitOverlayGridArea() {
    const {
      columns,
      selectedRows,
      hasGroups,
      currentMaxGridIndex,
      currentRowLimitOffset,
    } = this.asProps;

    const { rows: rowsLimitConfig, columns: columnsLimitConfig } = this.limitConfiguration;

    const rowOffset = hasGroups ? 3 : 2;
    const columnOffset = selectedRows ? 1 : 0;

    const rowStart = rowsLimitConfig.isDefined
      ? rowsLimitConfig.value + rowOffset + currentRowLimitOffset
      : rowOffset;
    const columnStart = columnsLimitConfig.isDefined ? columnsLimitConfig.value + columnOffset + 1 : columnOffset + 1;
    const rowEnd = currentMaxGridIndex + rowOffset;
    const columnEnd = columns.length + 1;

    return `${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`;
  }

  renderLimitOverlay() {
    const SLimitOverlayCellWrapper = Flex;
    const { rowIndex, columns, rows, styles } = this.asProps;

    const { rows: rowsLimit, columns: columnsLimit, renderOverlay } = this.limitConfiguration;
    if (!rowsLimit.isDefined && !columnsLimit.isDefined) return null;
    if ((rowsLimit.value ?? 0) !== rowIndex) return null;

    const colIndex = columnsLimit.isDefined ? columnsLimit.value + 1 : 1;
    const colSpan = columns.length - (columnsLimit.value ?? 0);
    const rowsSpan = rows.length - (rowsLimit.value ?? 0);

    return sstyled(styles)(
      <SLimitOverlayCellWrapper
        // @ts-ignore
        gridArea={this.limitOverlayGridArea}
      >
        <Box
          role='gridcell'
          aria-colindex={colIndex}
          aria-colspan={colSpan}
          aria-rowspan={rowsSpan}
          tabIndex={-1}
        >
          {renderOverlay?.()}
        </Box>
      </SLimitOverlayCellWrapper>,
    );
  }

  renderLimitOverlayIf(condition: boolean) {
    return condition && this.renderLimitOverlay();
  }

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
      selectedRows,
      uid,
      getFixedStyle,
      mergedRow,
      isAccordionRow,
      animationExpand,
      accordionRowIndex,
      accordionDuration,
      limit,
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
    const rowUniqKey = row[UNIQ_ROW_KEY];

    const { rows: rowsLimit, columns: columnsLimit } = this.limitConfiguration;
    const shouldRenderLimitOverlayAsFirstCell =
      (rowsLimit.value === 0 && columnsLimit.value === 0) ||
      (rowsLimit.value === 0 && !columnsLimit.isDefined) ||
      (columnsLimit.value === 0 && !rowsLimit.isDefined);

    return sstyled(styles)(
      <>
        <SRow
          render={Box}
          role='row'
          aria-rowindex={ariaRowIndex}
          accordionType={accordionType}
          theme={selectedRows?.includes(rowUniqKey) ? 'info' : undefined}
          use:expanded={expanded && !mergedRow}
          aria-hidden={this.isRowHidden}
        >
          {this.renderLimitOverlayIf(shouldRenderLimitOverlayAsFirstCell)}
          {columns.map((column, i) => {
            let isCellHidden: true | undefined = undefined;

            if (limit) {
              if (rowsLimit.isDefined && columnsLimit.isDefined) {
                isCellHidden = rowIndex >= rowsLimit.value && i >= columnsLimit.value ? true : undefined;
              } else if (!rowsLimit.isDefined && columnsLimit.isDefined) {
                isCellHidden = rowIndex >= 0 && i >= columnsLimit.value ? true : undefined;
              } else if (rowsLimit.isDefined && !columnsLimit.isDefined) {
                isCellHidden = rowIndex >= rowsLimit.value ? true : undefined;
              }
            }

            if (selectedRows && i === 0 && row[IS_EMPTY_DATA_ROW] !== true) {
              const checked = selectedRows.includes(rowUniqKey);
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
                  aria-hidden={isCellHidden}
                >
                  <Checkbox
                    checked={checked}
                    aria-labelledby={`${uid}_${ariaRowIndex}_1`}
                    onChange={this.handleSelectRow}
                  >
                    <Checkbox.Value />
                  </Checkbox>
                </SCheckboxCell>,
              );
            }

            const index = i;
            const cellValue: DTValue | MergedRowsCell | MergedColumnsCell | undefined = row[column.name];

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
                aria-hidden={isCellHidden}
              />
            );
          })}
          {this.renderLimitOverlayIf(!shouldRenderLimitOverlayAsFirstCell)}
        </SRow>

        {React.isValidElement(accordion) && (
          <SCollapseRow
            key={rowIndex}
            role='row'
            aria-rowindex={ariaRowIndex + 1}
            id={accordionId}
            visible={expanded}
            interactive
            gridArea={accordionDataGridArea}
            duration={accordionDuration ?? 200}
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
              w='100%'
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
