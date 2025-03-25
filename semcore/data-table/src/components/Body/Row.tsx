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

  static defaultProps = {
    'aria-level': 1,
    defaultExpandedRows: [],
  };

  uncontrolledProps() {
    return {
      expandedRows: [],
    };
  }

  onExpandRow = (expandedRowIndex: number) => {
    const { expandedRows } = this.asProps;
    if (expandedRows?.includes(expandedRowIndex)) {
      this.handlers.expandedRows(expandedRows.filter((row) => row !== expandedRowIndex));
    } else {
      this.handlers.expandedRows([...expandedRows!, expandedRowIndex]);
    }
  };

  render() {
    const SRow = Root;
    const SCollapseRow = Collapse;
    // const SAccordionRow = Row;
    const {
      columns,
      row,
      rows,
      styles,
      rowIndex,
      headerRows,
      expanded,
      onExpandRow,
      gridTemplateAreas,
      gridTemplateColumns,
      accordionDataGridArea,
    } = this.asProps;

    // const accordionDataGridArea = Array.isArray(row[ACCORDION])
    //     ? `${rowIndex + headerRows + 2} / 1 / ${
    //         rowIndex + headerRows + 2 + row[ACCORDION].length
    //     } / ${columns.length + 1}`
    //     : `${rowIndex + headerRows + 2} / 1 / ${
    //   rowIndex + headerRows + 2
    // } / ${columns.length + 1}`;

    // const accordionColumn = columns[0];
    // const SAccordionToggleContainer = Body.Cell;
    // const SAccordionToggle = ButtonLink;

    return sstyled(styles)(
      <>
        <SRow render={Box}>
          {/*{this.asProps['aria-level']! > 1 && new Array(this.asProps['aria-level']! - 1).fill(null).map(() => {*/}
          {/*  return (<Box/>);*/}
          {/*})}*/}
          {/*{row[ACCORDION] && (*/}
          {/*  <SAccordionToggleContainer*/}
          {/*    role={'gridcell'}*/}
          {/*    aria-colindex={'1'}*/}
          {/*    row={row}*/}
          {/*    rowIndex={rowIndex}*/}
          {/*    columnIndex={0}*/}
          {/*    fixed={accordionColumn.fixed}*/}
          {/*    style={style}*/}
          {/*    name={ACCORDION}*/}
          {/*    column={accordionColumn}*/}
          {/*    borders={accordionColumn.borders}*/}
          {/*    flexWrap={accordionColumn.flexWrap}*/}
          {/*    alignItems={accordionColumn.alignItems}*/}
          {/*    alignContent={accordionColumn.alignContent}*/}
          {/*    justifyContent={accordionColumn.justifyContent}*/}
          {/*    aria-expanded={expanded}*/}
          {/*    aria-level={this.asProps['aria-level']}*/}
          {/*    // gridArea={gridArea}*/}
          {/*  >*/}
          {/*    <SAccordionToggle*/}
          {/*      expanded={expanded}*/}
          {/*      onClick={() => onExpandRow?.(rowIndex)}*/}
          {/*      color={'--intergalactic-icon-primary-neutral'}*/}
          {/*    >*/}
          {/*      <SAccordionToggle.Addon tag={ChevronRightM} />*/}
          {/*    </SAccordionToggle>*/}
          {/*  </SAccordionToggleContainer>*/}
          {/*)}*/}
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

            let gridArea: string | undefined = undefined;

            if (cellValue instanceof MergedColumnsCell) {
              gridArea = `${rowIndex + headerRows + 1} / ${index + 1} / ${
                rowIndex + headerRows + 2
              } / ${index + 1 + cellValue.columnsCount}`;
            } else if (cellValue instanceof MergedRowsCell) {
              gridArea = `${rowIndex + headerRows + 1} / ${index + 1} / ${
                rowIndex + headerRows + 1 + cellValue.rowsCount
              } / ${index + 2}`;
              // } else if (this.asProps['aria-level'] > 1) {
              //   gridArea = `${rowIndex + headerRows + 1 + this.asProps['aria-posinset']!} / ${index + this.asProps['aria-level']} / ${
              //       rowIndex + headerRows + 2 + this.asProps['aria-posinset']!
              //   } / ${index + this.asProps['aria-level'] + 1}`;
            }

            return (
              <Body.Cell
                key={index}
                role={'gridcell'}
                aria-colindex={index + 1}
                data-aria-level={index === 0 ? this.asProps['aria-level'] : undefined}
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
            aria-level={this.asProps['aria-level']! + 1}
            aria-setsize={1}
            aria-posinset={1}
          >
            {row[ACCORDION]}
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
                visible={expanded}
                rows={row[ACCORDION]}
                rowIndex={rowIndex}
                aria-posinset={i + 1}
                aria-level={this.asProps['aria-level']! + 1}
                headerRows={headerRows}
                expanded={this.asProps.expandedRows?.includes(i)}
                onExpandRow={this.onExpandRow}
              />
            );
          })}
      </>,
    );
  }
}

export const Row = createComponent(RowRoot, {}, { parent: Body });
