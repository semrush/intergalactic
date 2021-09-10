import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';
import SortDescXS from '@semcore/icon/lib/SortDesc/xs';
import SortAscXS from '@semcore/icon/lib/SortAsc/xs';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import { flattenColumns, getFixedStyle, getScrollOffsetValue } from './utils';
import logger from '@semcore/utils/lib/logger';

import scrollStyles from './style/scroll-area.shadow.css';

const SORTING_ICON = {
  desc: SortDescXS,
  asc: SortAscXS,
};

class Head extends Component {
  columns = [];

  bindHandlerSortClick = (name) => (e) => {
    this.asProps.$onSortClick(name, e);
  };

  bindHandlerKeyDown = (name) => (e) => {
    if (e.keyCode === 13) {
      this.asProps.$onSortClick(name, e);
    }
  };

  renderColumns(columns, width) {
    return columns.map((column) => this.renderColumn(column, width));
  }

  renderColumn(column, width) {
    const { styles, use, hidden } = this.asProps;
    const SColumn = Flex;
    const SHead = Box;
    const SSortIcon = SORTING_ICON[column.sortDirection];
    const isGroup = !!column.columns;
    const cSize = isGroup ? flattenColumns(column.columns).length : 1;
    const [name, value] = getFixedStyle(column, this.columns);
    const style = {
      [name]: value,
      flexBasis: column.props.flex === undefined && `${width * cSize}%`,
      ...column.props.style,
    };

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
