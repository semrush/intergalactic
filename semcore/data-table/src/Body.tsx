import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box, Flex, IBoxProps } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';
import { getFixedStyle, getScrollOffsetValue } from './utils';
import { RowData, Column, NestedCells, PropsLayer, Cell } from './types';
import assignProps from '@semcore/utils/lib/assignProps';
import type ResizeObserverCallback from 'resize-observer-polyfill';

import scrollStyles from './style/scroll-area.shadow.css';
import syncScroll from '@semcore/utils/lib/syncScroll';

const testEnv = process.env.NODE_ENV === 'test';

const getCellsByColumn = (cells: NestedCells): RowData => {
  const flattenCells = cells.flat(20) as Cell[];
  return Object.fromEntries(flattenCells.map((cell) => [cell.name, cell.data]));
};

type AsProps = {
  rows: NestedCells[];
  columns: Column[];
  $scrollRef: ReturnType<ReturnType<typeof syncScroll>>;
  onResize: ResizeObserverCallback;
  rowPropsLayers: PropsLayer[];
  use: 'primary' | 'secondary';
};

class Body extends Component<AsProps> {
  renderRow(cells: NestedCells, index: number) {
    const SRow = Box;
    const { styles, rowPropsLayers } = this.asProps;

    const cellsByColumn = cells.flatRowData || getCellsByColumn(cells);

    let props = {
      children: this.renderCells(cells, cellsByColumn, index),
      theme: undefined,
      active: undefined,
    };

    for (const rowPropsLayer of rowPropsLayers) {
      const { childrenPropsGetter = (p) => p, ...other } = rowPropsLayer;
      const propsRow = assignProps(other, props);
      props = assignProps(childrenPropsGetter(propsRow, cellsByColumn, index), propsRow);
    }

    return sstyled(styles)(<SRow key={index} {...props} />);
  }

  renderRows(rows: NestedCells[]) {
    return rows.map((cells, index) => this.renderRow(cells, index));
  }

  renderCells(cells: NestedCells, cellsByColumn: RowData, index: number) {
    const SCell = Flex;
    const { styles, columns, use } = this.asProps;
    return cells.map((cell) => {
      if (Array.isArray(cell)) {
        return <div>{this.renderRows(cell as NestedCells[])}</div>;
      } else {
        const column = columns.find((c) => c.name === cell.name);
        const [name, value] = getFixedStyle(cell, columns);
        const vars = (Array.isArray(cell.cssVar) ? cell.cssVar : [cell.cssVar]).map(
          (name) => `var(${name})`,
        );
        type CellProps = IBoxProps & {
          name: string;
          children: React.ReactNode;
          style: React.CSSProperties;
        };

        let props: CellProps = {
          name: cell.name,
          children: <>{cell.data}</>,
          ['data-data']: JSON.stringify(cell.data),
          justifyContent: column?.props?.justifyContent,
          style: {
            width: vars.length === 1 ? vars[0] : `calc(${vars.join(' + ')})`,
          },
        };
        if (name !== undefined && value !== undefined) {
          props.style[name] = value;
        }

        for (const cellPropLayer of cell.cellPropsLayers || []) {
          const { childrenPropsGetter = (p) => p, ...other } = cellPropLayer;
          const propsCell = assignProps(other, props);
          props = assignProps(childrenPropsGetter(propsCell, cellsByColumn, index), propsCell);
        }

        return sstyled(styles)(
          <SCell key={cell.name} {...props} fixed={cell.fixed} theme={props.theme} use={use} />,
        ) as React.ReactElement;
      }
    }, [] as React.ReactElement[]);
  }

  render() {
    const SBody = Root;
    const SBodyWrapper = Box;
    const SScrollAreaBar = ScrollArea.Bar;
    const { Children, styles, rows, columns, onResize, $scrollRef } = this.asProps;

    const columnsInitialized = columns.reduce((sum, { width }) => sum + width, 0) > 0 || testEnv;

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(columns);
    const offsetSum = offsetLeftSum + offsetRightSum;

    return sstyled(styles)(
      <SBodyWrapper>
        <ScrollArea
          shadow
          styles={scrollStyles}
          use:left={`${offsetLeftSum}px`}
          use:right={`${offsetRightSum}px`}
          onResize={onResize}
        >
          <ScrollArea.Container ref={$scrollRef}>
            <SBody render={Box}>{columnsInitialized ? this.renderRows(rows) : null}</SBody>
          </ScrollArea.Container>
          <SScrollAreaBar
            orientation="horizontal"
            left={`${offsetLeftSum}px`}
            right={`${offsetRightSum}px`}
            offsetSum={`${offsetSum}px`}
          />
          <SScrollAreaBar orientation="vertical" />
        </ScrollArea>
        {Children.origin}
      </SBodyWrapper>,
    );
  }
}

export default Body;
