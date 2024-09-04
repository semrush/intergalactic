import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';
import { getFixedStyle, getScrollOffsetValue } from './utils';
import { RowData, Column, NestedCells, PropsLayer, Cell } from './types';
import assignProps, { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import syncScroll from '@semcore/utils/lib/syncScroll';
import trottle from '@semcore/utils/lib/rafTrottle';
import { forkRef } from '@semcore/utils/lib/ref';
import canUseDOM from '@semcore/utils/lib/canUseDOM';
import { SORT_ICON_WIDTH } from './Head';
import scrollStyles from './style/scroll-shadows.shadow.css';

const testEnv = process.env.NODE_ENV === 'test';

const getCellsByColumn = (cells: NestedCells): RowData => {
  const flattenCells = cells.flat(20) as Cell[];
  return Object.fromEntries(flattenCells.map((cell) => [cell.name, cell.data]));
};
const displayContents = { display: 'contents' };

type AsProps = {
  rows: NestedCells[][];
  columns: Column[];
  $scrollRef: ReturnType<ReturnType<typeof syncScroll>>;
  onResize: ResizeObserverCallback;
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;
  rowPropsLayers: PropsLayer[];
  use: 'primary' | 'secondary';
  uniqueKey: string;
  virtualScroll?: boolean | { tollerance?: number; rowHeight?: number };
  renderRows?: (props: {
    rows: NestedCells[][];
    columns: Column[];
    renderRow: (row: Cell[], details: { dataIndex: number; nested: boolean }) => React.ReactNode;
  }) => React.ReactNode;
  disabledScroll?: boolean;
  uid?: string;
  animationsDisabled?: boolean;
  scrollContainerRef: React.Ref<HTMLDivElement>;
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

  scrollContainerRef = React.createRef<HTMLDivElement>();
  firstRowRef = React.createRef<HTMLDivElement>();
  firstRowResizeObserver: ResizeObserver | null = null;

  getRowHeight = () => {
    const { virtualScroll } = this.asProps;
    const rowHeightFromProps = typeof virtualScroll === 'object' && virtualScroll?.rowHeight;
    return rowHeightFromProps || this.state.rowHeight;
  };

  renderCells(cells: NestedCells, rowData: RowData, dataIndex: number) {
    const SCell = Flex;
    const { styles, columns, use, uid } = this.asProps;
    return cells.map((cell, cellIndex) => {
      if (Array.isArray(cell)) {
        const SGroupCell = 'div';
        return sstyled(styles)(
          <SGroupCell key={`${cellIndex}`} data-ui-name='group-cell'>
            {this.renderRows(cell as NestedCells[], true)}
          </SGroupCell>,
        );
      } else {
        const nameParts = cell.name.split('/');
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        const firstColumn = columns.find((c) => c.name === firstName);
        const lastColumn = columns.find((c) => c.name === lastName);
        const column = columns.find((c) => c.name === cell.name);
        const [name, value] = getFixedStyle(cell, columns);
        const parentColumnNames = column?.parentColumns.map((column) => column.name) ?? [];
        const vars = (Array.isArray(cell.cssVar) ? cell.cssVar : [cell.cssVar]).map(
          (name) => `var(${name})`,
        );
        type CellProps = any & {
          name: string;
          children: React.ReactNode;
          style: React.CSSProperties;
        };

        const columnWMin = column?.props?.ref.current?.style.getPropertyValue('min-width');
        const columnWMax = column?.props?.ref.current?.style.getPropertyValue('max-width');

        let props: CellProps = {
          name: cell.name,
          children: <>{cell.data}</>,
          justifyContent: column?.props?.justifyContent,
          alignItems: column?.props?.alignItems,
          borderLeft: firstColumn?.borderLeft,
          borderRight: lastColumn?.borderRight,
          style: {
            width: vars.length === 1 ? vars[0] : `calc(${vars.join(' + ')})`,
            minWidth: columnWMin,
            maxWidth:
              columnWMax && column?.sortable
                ? `calc(${SORT_ICON_WIDTH}px + ${columnWMax})`
                : columnWMax,
          },
        };
        if (name !== undefined && value !== undefined) {
          props.style[name] = value;
        }

        for (const cellPropLayer of cell.cellPropsLayers || []) {
          const { childrenPropsGetter = (p) => p, ...other } = cellPropLayer;
          const propsCell = assignProps(other, props);
          props = assignProps(childrenPropsGetter(propsCell, rowData, dataIndex), propsCell);
        }

        const headerIds = [cell.name, ...parentColumnNames]
          .filter(Boolean)
          .map((name) => `igc-table-${uid}-${name}`);

        return sstyled(styles)(
          <SCell
            key={cell.name}
            role='cell'
            headers={headerIds.join(' ')}
            __excludeProps={['data']}
            {...props}
            fixed={cell.fixed}
            theme={props.theme}
            use={use}
            borderLeft={props.borderLeft}
            borderRight={props.borderRight}
          />,
        ) as React.ReactElement;
      }
    }, [] as React.ReactElement[]);
  }

  renderRow(
    cells: NestedCells,
    {
      dataIndex,
      topOffset,
      nested = false,
    }: { dataIndex: number; topOffset?: number; nested: boolean },
  ) {
    const SRow = Box;
    const { styles, rowPropsLayers, uniqueKey, virtualScroll } = this.asProps;
    const rowHeightFromProps = typeof virtualScroll === 'object' && virtualScroll?.rowHeight;

    const rowData = cells.flatRowData || getCellsByColumn(cells);
    const key = rowData[uniqueKey] ? String(rowData[uniqueKey]) : `row_${dataIndex}`;
    const needToMeasureHeight = dataIndex === 0 && !rowHeightFromProps;

    let props = {
      children: this.renderCells(cells, rowData, dataIndex),
      theme: undefined,
      active: undefined,
      positioned: topOffset !== undefined,
      top: topOffset,
      ref: needToMeasureHeight ? this.firstRowRef : undefined,
      key,
      'aria-rowindex': !nested ? dataIndex + 2 : undefined,
    };

    for (const rowPropsLayer of rowPropsLayers) {
      const { childrenPropsGetter = (p) => p, ...other } = rowPropsLayer;
      const propsRow = assignProps(other, props);
      props = assignProps(childrenPropsGetter(propsRow, rowData, dataIndex), propsRow);
    }

    return sstyled(styles)(
      <SRow
        data-nested={nested.toString()}
        role={!nested ? 'row' : undefined}
        __excludeProps={['data']}
        {...props}
      />,
    );
  }

  renderRows(rows: NestedCells[], nested = false) {
    return rows.map((cells, dataIndex) => this.renderRow(cells, { dataIndex, nested }));
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
    if (canUseDOM()) {
      this.firstRowResizeObserver = new ResizeObserver(this.handleFirstRowResize);
      this.firstRowResizeObserver.observe(this.firstRowRef.current);
    }
  };

  handleBodyTransitionEnd = trottle(() => {
    /**
     * We need this to recalculate ScrollArea sizes after end of transition
     */
    this.forceUpdate();
  });

  componentWillUnmount() {
    this.firstRowResizeObserver?.disconnect();
  }

  render() {
    const SBody = Root;
    const SBodyWrapper = Box;
    const SHeightHold = Box;
    const {
      Children,
      styles,
      rows,
      columns,
      $scrollRef,
      virtualScroll,
      onResize,
      onScroll,
      disabledScroll,
      renderRows,
      animationsDisabled,
      scrollContainerRef,
    } = this.asProps;

    const columnsInitialized = columns.reduce((sum, { width }) => sum + width, 0) > 0 || testEnv;

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(columns);

    const rowHeight = this.getRowHeight();
    const holdHeight =
      rowHeight !== undefined && virtualScroll ? rowHeight * rows.length : undefined;

    if (virtualScroll && columnsInitialized && !rowHeight) {
      requestAnimationFrame(this.setupRowSizeObserver);
    }

    const body = sstyled(styles)(
      <SBody
        render={Box}
        animationsDisabled={animationsDisabled}
        onTransitionEnd={this.handleBodyTransitionEnd}
      >
        {renderRows ? (
          renderRows({ rows, columns, renderRow: this.renderRow.bind(this) }) || null
        ) : (
          <>
            {holdHeight ? <SHeightHold hMin={holdHeight} aria-hidden={true} /> : null}
            {virtualScroll ? this.renderVirtualizedRows(rows) : this.renderRows(rows)}
          </>
        )}
      </SBody>,
    );

    if (disabledScroll) {
      return <SBodyWrapper>{body}</SBodyWrapper>;
    }

    const scrollContainerRefs = [$scrollRef, this.scrollContainerRef];
    if (scrollContainerRef) {
      scrollContainerRefs.push(scrollContainerRef);
    }

    return (
      <SBodyWrapper>
        <ScrollArea
          shadow
          leftOffset={offsetLeftSum}
          rightOffset={offsetRightSum}
          onResize={callAllEventHandlers(onResize, this.handleScrollAreaResize)}
          onScroll={callAllEventHandlers(onScroll, this.handleScrollAreaScroll)}
          styles={scrollStyles}
        >
          <ScrollArea.Container
            ref={forkRef(...scrollContainerRefs)}
            role='rowgroup'
            focusRingTopOffset={'3px'}
          >
            {body}
          </ScrollArea.Container>
          <div style={displayContents} role='rowgroup'>
            <div style={displayContents} role='row'>
              <div style={displayContents} role='cell'>
                <ScrollArea.Bar
                  orientation='horizontal'
                  bottom={0}
                  container={this.scrollContainerRef}
                />
                <ScrollArea.Bar orientation='vertical' w={'12px'} zIndex={2} />
              </div>
            </div>
          </div>
        </ScrollArea>
        {Children.origin}
      </SBodyWrapper>
    );
  }
}

export default Body;
