import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';
import SortDesc from '@semcore/icon/SortDesc/m';
import SortAsc from '@semcore/icon/SortAsc/m';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import { flattenColumns, getFixedStyle, getScrollOffsetValue } from './utils';
import type { Column } from './types';
import logger from '@semcore/utils/lib/logger';
import 'resize-observer-polyfill';

import scrollStyles from './style/scroll-area.shadow.css';

const SORTING_ICON = {
  desc: SortDesc,
  asc: SortAsc,
} as const;

type AsProps = {
  $onSortClick: (name: string, event: React.MouseEvent | React.KeyboardEvent) => void;
  $scrollRef: (instance: unknown) => void;
  use: 'primary' | 'secondary';
  columnsChildren: Column[];
  onResize: ResizeObserverCallback;
  sticky: boolean;
  ['data-ui-name']: string;
};

class Head extends Component<AsProps> {
  columns: Column[] = [];

  static displayName: string;

  bindHandlerSortClick = (name: string) => (event: React.MouseEvent) => {
    this.asProps.$onSortClick(name, event);
  };

  bindHandlerKeyDown = (name: string) => (event: React.KeyboardEvent) => {
    if (event.code === 'Enter') {
      this.asProps.$onSortClick(name, event);
    }
  };

  renderColumns(columns: Column[], width: number) {
    return columns.map((column) => this.renderColumn(column, width));
  }

  renderColumn(column: Column, width: number) {
    const { styles, use, hidden } = this.asProps;
    const SColumn = Flex;
    const SHead = Box;
    const SSortIcon = SORTING_ICON[column.sortDirection];
    const isGroup = column.columns?.length > 0;
    const cSize = isGroup ? flattenColumns(column.columns).length : 1;
    const [name, value] = getFixedStyle(column, this.columns);

    const style = {
      flexBasis: column.props.flex === undefined && `${width * cSize}%`,
      ...column.props.style,
    };

    if (name !== undefined && value !== undefined) {
      style[name] = value;
    }

    return sstyled(styles)(
      <SColumn
        key={column.name}
        use={use}
        fixed={column.fixed}
        resizable={column.resizable}
        sortable={column.sortable}
        active={column.active}
        group={isGroup}
        tabIndex={column.sortable && 0}
        {...column.props}
        onClick={callAllEventHandlers(
          column.props.onClick,
          column.sortable ? this.bindHandlerSortClick(column.name) : undefined,
        )}
        onKeyDown={callAllEventHandlers(
          column.props.onKeyDown,
          column.sortable ? this.bindHandlerKeyDown(column.name) : undefined,
        )}
        style={style}
        hidden={hidden}
      >
        {isGroup ? (
          <>
            <SColumn groupHead use={use}>
              <div>{column.props.children}</div>
            </SColumn>
            <SHead>{this.renderColumns(column.columns, 100 / cSize)}</SHead>
          </>
        ) : (
          <>
            <div>{column.props.children}</div>
            {column.sortable ? <SSortIcon active={column.active} /> : null}
          </>
        )}
      </SColumn>,
    );
  }

  render() {
    const SHead = Root;
    const { Children, styles, columnsChildren, onResize, $scrollRef, sticky } = this.asProps;
    const SHeadWrapper = Box;

    this.columns = flattenColumns(columnsChildren);

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(this.columns);

    logger.warn(
      sticky,
      "'sticky' property is deprecated, use '<Sticky/>' wrapper",
      this.asProps['data-ui-name'] || Head.displayName,
    );

    return sstyled(styles)(
      <SHeadWrapper sticky={sticky}>
        <ScrollArea
          styles={scrollStyles}
          use:left={`${offsetLeftSum}px`}
          use:right={`${offsetRightSum}px`}
          shadow
          onResize={onResize}
        >
          <ScrollArea.Container ref={$scrollRef}>
            <SHead render={Box}>
              {this.renderColumns(columnsChildren, 100 / this.columns.length)}
            </SHead>
          </ScrollArea.Container>
        </ScrollArea>
        {Children.origin}
      </SHeadWrapper>,
    );
  }
}

export default Head;
