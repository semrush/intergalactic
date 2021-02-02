import React from 'react';
import { Component, styled } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';
import { getFixedStyle, getScrollOffsetValue } from './utils';
import assignProps from '@semcore/utils/lib/assignProps';

function getCellsByColumn(row) {
  return row.reduce((acc, cell) => {
    acc[cell.name] = acc[cell.name]
      ? Array.isArray(acc[cell.name])
        ? acc[cell.name].concat(cell.data)
        : [acc[cell.name], cell.data]
      : cell.data;
    return acc;
  }, {});
}

class Body extends Component {
  renderRows(rows) {
    const SRow = Box;
    const { styles, $propsRow } = this.asProps;

    return rows.map((row, index) => {
      const cellsByColumn = row._row || getCellsByColumn(row);
      const props = $propsRow.reduce(
        (acc, { getRowProps = (p) => p, ...other }) => {
          const propsRow = assignProps(other, acc);
          return assignProps(getRowProps(propsRow, cellsByColumn, index), propsRow);
        },
        {
          children: this.renderCells(row, cellsByColumn, index),
        },
      );
      return styled(styles)(
        <SRow key={index} theme={props.theme} active={props.active} {...props} />,
      );
    });
  }

  renderCells(row, cellsByColumn, index) {
    const SCell = Flex;
    const { styles, columns, use } = this.asProps;
    return row.reduce((acc, cell) => {
      if (Array.isArray(cell)) {
        acc = acc.concat(<div>{this.renderRows(cell)}</div>);
      } else {
        const column = columns.find((c) => c.name === cell.name);
        const [name, value] = getFixedStyle(cell, columns);
        const vars = (Array.isArray(cell.cssVar) ? cell.cssVar : [cell.cssVar]).map(
          (n) => `var(${n})`,
        );
        const props = (cell.rendersCell || []).reduce(
          (acc, { getCellProps = (p) => p, ...other }) => {
            const propsCell = assignProps(other, acc);
            return assignProps(getCellProps(propsCell, cellsByColumn, index), propsCell);
          },
          {
            name: cell.name,
            children: cell.data,
            justifyContent: column?.props?.justifyContent,
            style: {
              [name]: value,
              width: vars.length === 1 ? vars[0] : `calc(${vars.join(' + ')})`,
            },
          },
        );

        acc.push(
          styled(styles)(
            <SCell key={cell.name} {...props} fixed={cell.fixed} theme={props.theme} use={use} />,
          ),
        );
      }
      return acc;
    }, []);
  }

  render() {
    const SBody = this.Root;
    const SBodyWrapper = Box;
    const { Children, styles, rows, columns, $scrollRef } = this.asProps;
    const SScrollAreaBar = ScrollArea.Bar;

    const initializeColumns = !!columns.reduce((acc, c) => acc + c.width, 0);

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(columns);
    const offsetSum = offsetLeftSum + offsetRightSum;

    const offsetSumVar = offsetSum + 'px';
    const leftVar = offsetLeftSum + 'px';
    const rightVar = offsetRightSum + 'px';

    return styled(styles)`
      SShadowHorizontal:before {
        left: ${leftVar}!important;
      }
      SShadowHorizontal:after {
        right: ${rightVar}!important;
      }
      SScrollAreaBar[orientation='horizontal'] {
        margin-left: calc(${leftVar} + 4px);
        margin-right: calc(${rightVar} + 4px);
        width: calc(100% - ${offsetSumVar} - 8px);
      }
    `(
      <SBodyWrapper>
        <ScrollArea shadow styles={styled.styles}>
          <ScrollArea.Container ref={$scrollRef}>
            <SBody render={Box}>
              {initializeColumns ? this.renderRows(rows) : null}
            </SBody>
          </ScrollArea.Container>
          <SScrollAreaBar orientation="horizontal" />
          <SScrollAreaBar orientation="vertical" />
        </ScrollArea>
        {Children.origin}
      </SBodyWrapper>,
    );
  }
}

export default Body;
