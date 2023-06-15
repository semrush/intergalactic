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
import { setRef } from '@semcore/utils/lib/ref';
import 'resize-observer-polyfill';

import scrollStyles from './style/scroll-area.shadow.css';

const SORTING_ICON = {
  desc: SortDesc,
  asc: SortAsc,
} as const;
const ariaSort = {
  desc: 'descending',
  asc: 'ascending',
} as const;

type AsProps = {
  $onSortClick: (name: string, event: React.MouseEvent | React.KeyboardEvent) => void;
  $scrollRef: (instance: unknown) => void;
  use: 'primary' | 'secondary';
  columnsChildren: Column[];
  onResize: ResizeObserverCallback;
  sticky: boolean;
  disabledScroll?: boolean;
  ['data-ui-name']: string;
  uid?: string;
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

  refColumn = (props: Column['props']) => (ref: HTMLElement) => {
    setRef(props.ref, ref);
    if (props.forwardRef) {
      setRef(props.forwardRef, ref);
    }
  };

  renderColumns(columns: Column[], width: number) {
    return columns.map((column) => this.renderColumn(column, width));
  }

  renderColumn(column: Column, width: number) {
    const { styles, use, hidden, uid } = this.asProps;
    const SColumn = Flex;
    const SHead = Box;
    const SSortWrapper = 'div';
    const SSortIcon = SORTING_ICON[column.sortDirection];
    const ariaSortValue =
      column.sortable && column.active ? ariaSort[column.sortDirection] : undefined;
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

    if (!column.setVar) {
      style['flexBasis'] = `var(${column.varWidth})`;
    }

    return sstyled(styles)(
      <SColumn
        role={isGroup ? undefined : 'columnheader'}
        scope={isGroup ? 'colgroup' : 'col'}
        key={column.name}
        id={`igc-table-${uid}-${column.name}`}
        use={use}
        fixed={column.fixed}
        resizable={column.resizable}
        sortable={column.sortable}
        borderLeft={isGroup ? false : column.borderLeft}
        borderRight={isGroup ? false : column.borderRight}
        active={isGroup ? false : column.active}
        group={isGroup}
        tabIndex={column.sortable && 0}
        {...column.props}
        ref={this.refColumn(column.props)}
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
        aria-sort={ariaSortValue}
      >
        {isGroup ? (
          <>
            <SColumn
              role="columnheader"
              groupHead
              use={use}
              active={column.active}
              borderLeft={column.borderLeft}
              borderRight={column.borderRight}
            >
              <div>{column.props.children}</div>
            </SColumn>
            <SHead>{this.renderColumns(column.columns, 100 / cSize)}</SHead>
          </>
        ) : (
          <>
            {column.props.children}
            {column.sortable ? (
              <SSortWrapper>
                <SSortIcon active={column.active} />
              </SSortWrapper>
            ) : null}
          </>
        )}
      </SColumn>,
    );
  }

  render() {
    const SHead = Root;
    const SHeadWrapper = Box;
    const { Children, styles, columnsChildren, onResize, $scrollRef, sticky, disabledScroll } =
      this.asProps;

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
          <ScrollArea.Container ref={$scrollRef} disabledScroll={disabledScroll} role="rowgroup">
            <SHead render={Box} role="row" aria-rowindex="1">
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
