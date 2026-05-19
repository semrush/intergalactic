import { ScrollArea as ScrollAreaComponent, Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Root, Component, createComponent, sstyled } from '@semcore/core';
import React from 'react';

import { ListBoxContextProvider } from './Context';
import style from '../style/dropdown-menu.shadow.css';

export type RenderRowProps<T, D = never> = {
  index: number;
  row: T;
  data: [D] extends [never] ? undefined : D;
};

type VirtualListProps<T, D extends object = never> = {
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
  customData: [D] extends [never] ? undefined : D;
};

type VirtualListDefaultProps = {
  rowsBuffer: 6;
};

type State = {
  scrollTop: number;
  scrollDirection: 'up' | 'down';
};

class VirtualListRoot<T = string, D extends object = never> extends Component<
  VirtualListProps<T, D>,
  [],
  Readonly<{}>,
  { index: number },
  State,
  VirtualListDefaultProps
> {
  static displayName = 'VirtualList';
  static style = style;

  static defaultProps = {
    rowsBuffer: 6,
  } as const;

  containerRef = React.createRef<HTMLDivElement>();
  listRef = React.createRef<HTMLDivElement>();

  state: State = {
    scrollTop: 0,
    scrollDirection: 'down',
  };

  componentDidMount() {
    const { index, rowHeight, rowsBuffer } = this.asProps;

    setTimeout(() => {
      const listHeight = (this.listRef.current?.getBoundingClientRect().height ?? 0) / 2;
      this.containerRef.current?.scrollTo({ top: index * rowHeight - listHeight + rowHeight / 2 });

      if (index <= rowsBuffer) {
        this.forceUpdate(); // we need this for correct render all items with calculated container height
      }
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
    const SDropdownMenuList = Root;
    const SBar = ScrollAreaComponent.Bar;

    const { scrollDirection, scrollTop } = this.state;
    const { rows, rowHeight, rowsBuffer, styles, renderRow: RenderRow, customData } = this.asProps;

    const offsetHeight = this.listRef.current?.offsetHeight ?? 0;
    const prevPrepared = scrollDirection === 'down' ? rowsBuffer / 2 : rowsBuffer;
    const nextPrepared = scrollDirection === 'up' ? rowsBuffer / 2 : rowsBuffer;

    const startIndex = Math.max(Math.floor(scrollTop / rowHeight) - prevPrepared, 0);

    const lastIndex = Math.min(Math.ceil((scrollTop + offsetHeight) / rowHeight) + nextPrepared, rows.length);

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
              // @ts-ignore
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

export type VirtualListComponent = (<
  T = string,
  D extends object = never,
>(
  props: Intergalactic.InternalTypings.EfficientOmit<Intergalactic.InternalTypings.ComponentProps<typeof Box, 'div', VirtualListProps<T, D>>, 'tag' | 'children'>
) => Intergalactic.InternalTypings.ComponentRenderingResults) & Intergalactic.InternalTypings.ComponentAdditive<typeof Box, 'div', VirtualListProps<any, any>>;

export const VirtualList = createComponent<
  VirtualListComponent,
  typeof VirtualListRoot
>(VirtualListRoot);
