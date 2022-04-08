import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box, Flex, IBoxProps } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';
import { getFixedStyle, getScrollOffsetValue } from './utils';
import { RowData, Column, NestedCells, PropsLayer, Cell } from './types';
import assignProps, { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import ResizeObserver from 'resize-observer-polyfill';
import scrollStyles from './style/scroll-area.shadow.css';
import syncScroll from '@semcore/utils/lib/syncScroll';
import trottle from '@semcore/utils/lib/rafTrottle';

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
  dataKey: string;
  virtualScroll?: boolean | { tollerance?: number; rowHeight?: number };
};

type State = {
  rowHeight: number | undefined;
  scrollAreaHeight: undefined | number;
  scrollOffset: number;
};

class Body extends Component<AsProps, State> {
  state: State = {
    rowHeight: undefined,
    scrollAreaHeight: undefined,
    scrollOffset: 0,
  };

  firstRowRef = React.createRef<HTMLElement>();
  firstRowResizeObserver: ResizeObserver | null = null;

  getRowHeight = () => {
    const { virtualScroll } = this.asProps;
    const rowHeightFromProps = typeof virtualScroll === 'object' && virtualScroll?.rowHeight;
    return rowHeightFromProps || this.state.rowHeight;
  };

  renderCells(cells: NestedCells, rowData: RowData, index: number) {
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
          props = assignProps(childrenPropsGetter(propsCell, rowData, index), propsCell);
        }

        return sstyled(styles)(
          <SCell key={cell.name} {...props} fixed={cell.fixed} theme={props.theme} use={use} />,
        ) as React.ReactElement;
      }
    }, [] as React.ReactElement[]);
  }

  renderRow(
    cells: NestedCells,
    { dataIndex, topOffset, nested }: { dataIndex: number; topOffset?: number; nested: boolean },
  ) {
    const SRow = Box;
    const { styles, rowPropsLayers, dataKey, virtualScroll } = this.asProps;
    const rowHeightFromProps = typeof virtualScroll === 'object' && virtualScroll?.rowHeight;

    const rowData = cells.flatRowData || getCellsByColumn(cells);
    const key = rowData[dataKey] ? String(rowData[dataKey]) : `row_${dataIndex}`;
    const needToMeasureHeight = dataIndex === 0 && !nested && !rowHeightFromProps;

    let props = {
      children: this.renderCells(cells, rowData, dataIndex),
      theme: undefined,
      active: undefined,
      positioned: topOffset !== undefined,
      top: topOffset,
      ref: needToMeasureHeight ? this.firstRowRef : undefined,
      key,
    };

    for (const rowPropsLayer of rowPropsLayers) {
      const { childrenPropsGetter = (p) => p, ...other } = rowPropsLayer;
      const propsRow = assignProps(other, props);
      props = assignProps(childrenPropsGetter(propsRow, rowData, dataIndex), propsRow);
    }

    return sstyled(styles)(<SRow {...props} />);
  }

  renderRows(rows: NestedCells[]) {
    return rows.map((cells, dataIndex) => this.renderRow(cells, { dataIndex, nested: false }));
  }

  renderVirtualizedRows(rows: NestedCells[]) {
    if (rows.length === 0) return [];

    const { virtualScroll } = this.asProps;
    const { scrollOffset, scrollAreaHeight } = this.state;
    const rowHeight = this.getRowHeight();

    const tollerance = (typeof virtualScroll === 'object' ? virtualScroll?.tollerance : 2) ?? 2;
    const startIndex = Math.max(Math.floor(scrollOffset / rowHeight!) - tollerance, 0);
    const lastIndex = Math.min(
      Math.ceil((scrollOffset + scrollAreaHeight!) / rowHeight!) + tollerance,
      rows.length,
    );

    const rowHeightFromProps = typeof virtualScroll === 'object' && virtualScroll?.rowHeight;
    const needToMeasureFirstRowHeight = !rowHeightFromProps;

    const firstRow = { cells: rows[0], dataIndex: 0, topOffset: 0 };
    const visibleRows = rowHeight !== undefined ? rows.slice(startIndex, lastIndex) : [];
    const processedVisibleRows = visibleRows.map((cells, index) => ({
      cells,
      dataIndex: startIndex + index,
      topOffset: rowHeight! * (startIndex + index),
    }));
    if (needToMeasureFirstRowHeight && startIndex !== 0) {
      processedVisibleRows.unshift(firstRow);
    }

    return processedVisibleRows.map(({ cells, dataIndex, topOffset }) =>
      this.renderRow(cells, { dataIndex, topOffset, nested: false }),
    );
  }

  handleFirstRowResize = trottle((entries: ResizeObserverEntry[]) => {
    const { contentRect } = entries[0];
    const { height } = contentRect;
    this.setState((oldState: State) => {
      if (oldState.rowHeight === height) return oldState;
      return { rowHeight: height };
    });
  });

  handleScrollAreaResize = trottle((entries: ResizeObserverEntry[]) => {
    const { virtualScroll } = this.asProps;
    if (!virtualScroll) return;
    const { contentRect } = entries[0];
    const { height } = contentRect;
    this.setState((oldState: State) => {
      if (oldState.scrollAreaHeight === height) return oldState;
      return { scrollAreaHeight: height };
    });
  });

  handleScrollAreaScroll = (event: React.SyntheticEvent<HTMLElement>) => {
    const { scrollTop } = event.target as HTMLElement;
    const { virtualScroll } = this.asProps;
    if (virtualScroll) {
      this.setState((oldState: State) => {
        if (oldState.scrollOffset === scrollTop) return oldState;
        return { scrollOffset: scrollTop };
      });
    }
  };

  setupRowSizeObserver = () => {
    if (!this.firstRowRef.current) return;
    if (!this.asProps.virtualScroll) return;
    this.firstRowResizeObserver = new ResizeObserver(this.handleFirstRowResize);
    this.firstRowResizeObserver.observe(this.firstRowRef.current);
  };

  componentWillUnmount() {
    this.firstRowResizeObserver?.disconnect();
  }

  render() {
    const SBody = Root;
    const SBodyWrapper = Box;
    const SScrollAreaBar = ScrollArea.Bar;
    const SHeightHold = Box;
    const { Children, styles, rows, columns, $scrollRef, virtualScroll, onResize } = this.asProps;

    const columnsInitialized = columns.reduce((sum, { width }) => sum + width, 0) > 0 || testEnv;

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(columns);
    const offsetSum = offsetLeftSum + offsetRightSum;

    const rowHeight = this.getRowHeight();
    const holdHeight =
      rowHeight !== undefined && virtualScroll ? rowHeight * rows.length : undefined;

    if (virtualScroll && columnsInitialized && !rowHeight) {
      new Promise(() => this.setupRowSizeObserver());
    }

    return sstyled(styles)(
      <SBodyWrapper>
        <ScrollArea
          shadow
          styles={scrollStyles}
          use:left={`${offsetLeftSum}px`}
          use:right={`${offsetRightSum}px`}
          onResize={callAllEventHandlers(onResize, this.handleScrollAreaResize)}
          onScroll={this.handleScrollAreaScroll}
        >
          <ScrollArea.Container ref={$scrollRef}>
            <SBody render={Box}>
              {holdHeight && <SHeightHold hMin={holdHeight} aria-hidden={true} />}
              {columnsInitialized && !virtualScroll ? this.renderRows(rows) : null}
              {columnsInitialized && virtualScroll ? this.renderVirtualizedRows(rows) : null}
            </SBody>
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
