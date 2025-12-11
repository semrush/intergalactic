import { ScrollArea as ScrollAreaComponent, Box } from '@semcore/base-components';
import { Root, AbstractComponent, createComponent, sstyled } from '@semcore/core';
import React from 'react';

import { ListBoxContextProvider } from './Context';
import style from '../style/dropdown-menu.shadow.css';

export type RenderRowProps<T, D> = {
  index: number;
  row: T;
  data: D;
};

type VirtualListProps<T, D extends object> = {
  /** List of all rows in ddMenu */
  rows: T[];
  /** Method for render row, it's better to wrap it via React.memo */
  renderRow: (props: RenderRowProps<T, D>) => React.ReactNode;
  /** The height of row. For now, you should calculate it on your side. */
  rowHeight: number;
  /** The buffer of rows out of visible rows
   * @default 10
   */
  rowsBuffer?: number;
  /** Some custom data for each renderRow function */
  customData: D;
};

type State = {
  scrollTop: number;
  scrollDirection: 'up' | 'down';
};

class VirtualListRoot<T = string, D extends object = {}> extends AbstractComponent<VirtualListProps<T, D>, [], never, { rowsBuffer: number; index: number }, State> {
  static displayName = 'VirtualList';
  static style = style;

  static defaultProps = {
    rowsBuffer: 10,
  };

  containerRef = React.createRef<HTMLDivElement>();
  listRef = React.createRef<HTMLDivElement>();

  state: State = {
    scrollTop: 0,
    scrollDirection: 'down',
  };

  componentDidMount() {
    const { index, rowHeight } = this.asProps;

    setTimeout(() => {
      const listHeight = (this.listRef.current?.getBoundingClientRect().height ?? 0) / 2;
      this.containerRef.current?.scrollTo({ top: index * rowHeight - listHeight + rowHeight / 2 });
    }, 10); // 10 for correct work in safari
  }

  handleScroll = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement) {
      const scrollDirection = e.target.scrollTop > this.state.scrollTop ? 'down' : 'up';

      this.setState({
        scrollDirection,
        scrollTop: e.target.scrollTop,
      });
    }
  };

  render() {
    const SDropdownMenuList = Root();
    const SBar = ScrollAreaComponent.Bar;

    const { scrollDirection, scrollTop } = this.state;
    const { rows, rowHeight, rowsBuffer, styles, renderRow: RenderRow, customData } = this.asProps;

    const offsetHeight = 0;
    const prevPrepared = scrollDirection === 'up' ? rowsBuffer : 6;
    const nextPrepared = scrollDirection === 'up' ? 6 : rowsBuffer;

    const startIndex = Math.max(Math.floor(scrollTop / rowHeight) - prevPrepared, 0);

    const lastIndex = scrollDirection === 'up' && scrollTop === 0
      ? rowsBuffer
      : Math.min(
          Math.ceil((scrollTop + offsetHeight) / rowHeight) + nextPrepared,
          rows.length,
        );

    const rowsToRender = rows.slice(startIndex, lastIndex);
    const rowMarginTop = rowHeight * startIndex;
    const rowMarginBottom = rowHeight * (rows.length - lastIndex);

    return sstyled(styles)(
      <ListBoxContextProvider>
        <SDropdownMenuList
          render={ScrollAreaComponent}
          shadow={true}
          shadowSize={16}
          shadowTheme='light'
          onScroll={this.handleScroll}
          data-is-virtual='true'
          ref={this.listRef}
        >
          <ScrollAreaComponent.Container ref={this.containerRef} tabIndex={undefined} h={rows.length * rowHeight}>
            <Box h={rowMarginTop} />
            {rowsToRender.map((item, index) => {
              return <RenderRow key={startIndex + index} row={item} index={startIndex + index} data={customData} />;
            })}
            <Box h={rowMarginBottom} />
          </ScrollAreaComponent.Container>
          <SBar orientation='horizontal' />
          <SBar orientation='vertical' />
        </SDropdownMenuList>
      </ListBoxContextProvider>,
    );
  }
}

export const VirtualList = createComponent(VirtualListRoot, {});
