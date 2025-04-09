import * as React from 'react';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { DataTableRowProps, RowPropsInner } from './Row.types';
import { Box, Collapse } from '@semcore/base-components';
import style from './style.shadow.css';
import { Body } from './Body';
import { getFixedStyle } from '../../utils';
import {ACCORDION, ROW_GROUP} from '../DataTable/DataTable';

class RowRoot extends Component<DataTableRowProps, {}, {}, [], RowPropsInner> {
  static displayName = 'Row';
  static style = style;

  static defaultProps = {
    'aria-level': undefined,
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
      expanded,
      accordionDataGridArea,
      expandedRows,
      onExpandRow,
      'aria-level': ariaLevel = 1,
    } = this.asProps;

    const ariaRowSpan = typeof row[ROW_GROUP] === 'number' ? row[ROW_GROUP] : undefined;
    const scope = ariaRowSpan ? 'rowgroup' : undefined;

    return sstyled(styles)(
      <>
        <SRow render={Box} role={'row'} aria-rowindex={ariaRowIndex} aria-rowspan={ariaRowSpan} scope={scope}>
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
                aria-expanded={index === 0 ? expanded : undefined}
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

        {row[ACCORDION] && React.isValidElement(row[ACCORDION]) && (
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
              // role={'gridcell'}
              // tabIndex={-1}
              // innerOutline
              aria-colindex={1}
              aria-level={ariaLevel + 1}
              aria-setsize={1}
              aria-posinset={1}
              row={row}
              // @ts-ignore
              name={ACCORDION}
            />
          </SCollapseRow>
        )}

        {row[ACCORDION] &&
          Array.isArray(row[ACCORDION]) &&
          expanded &&
          // <SCollapseRow
          //     key={rowIndex}
          //     visible={expanded}
          //     interactive
          //     gridArea={accordionDataGridArea}
          //     gridTemplateAreas={gridTemplateAreas}
          //     gridTemplateColumns={gridTemplateColumns}
          //     duration={200}
          //     // onAnimationStart={(e: React.AnimationEvent<HTMLDivElement>) => {
          //     //   const target = e.target;
          //     //   if (target instanceof HTMLElement && this.asProps.expanded) {
          //     //     target.style.setProperty('display', 'grid');
          //     //   }
          //     // }}
          //     // onAnimationEnd={(e: React.AnimationEvent<HTMLDivElement>) => {
          //     //   const target = e.target;
          //     //   if (target instanceof HTMLElement && this.asProps.expanded) {
          //     //     target.style.setProperty('display', 'contents');
          //     //   }
          //     // }}
          // >
          row[ACCORDION]?.map((subrow, i) => {
            // const gridArea = `${rowIndex + headerRows + 2} / 1 / ${
            //     rowIndex + headerRows + 2
            // } / ${columns.length + 2}`;
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
