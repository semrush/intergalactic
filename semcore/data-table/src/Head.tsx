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
import cssToIntDefault from '@semcore/utils/lib/cssToIntDefault';

export const SORT_ICON_WIDTH = 20;

const SORTING_ICON = {
  desc: SortDesc,
  asc: SortAsc,
} as const;
const ariaSort = {
  desc: 'descending',
  asc: 'ascending',
} as const;
const displayContents = { display: 'contents' };

type AsProps = {
  $onSortClick: (name: string, event: React.MouseEvent | React.KeyboardEvent) => void;
  $scrollRef: (instance: unknown) => void;
  use: 'primary' | 'secondary';
  columnsChildren: Column[];
  onResize: ResizeObserverCallback;
  sticky: boolean;
  ['data-ui-name']: string;
  uid?: string;
  withScrollBar?: boolean;
  animationsDisabled?: boolean;
};

class Head extends Component<AsProps> {
  columns: Column[] = [];

  static displayName: string;

  sortWrapperRefs = new Map<Node, boolean>();
  defaultWidths = new Map<Node, { minWidth: number; computedWidth: number }>();

  bindHandlerSortClick = (name: string) => (event: React.MouseEvent) => {
    this.asProps.$onSortClick(name, event);
  };

  bindHandlerKeyDown = (name: string) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.asProps.$onSortClick(name, event);
    }
  };

  makeSortRefHandler = (active: boolean) => (ref: HTMLElement | null) => {
    if (ref) {
      this.sortWrapperRefs.set(ref, active);
    }
  };

  makeColumnRefHandler = (column: Column) => (ref: HTMLElement | null) => {
    setRef(column.props.ref, ref);
    if (column.props.forwardRef) {
      setRef(column.props.forwardRef, ref);
    }

    if (ref && ref.getAttribute('scope') === 'col') {
      this.calculateMinWidth(ref, column);
    }
  };

  calculateMinWidth = (node: HTMLElement, column: Column) => {
    if (
      !this.defaultWidths.has(node) &&
      (column.props.wMin || column.props.wMax || column.props.w)
    ) {
      const computedStyle = window.getComputedStyle(node);

      this.defaultWidths.set(node, {
        minWidth: cssToIntDefault(computedStyle.getPropertyValue('min-width')),
        computedWidth: cssToIntDefault(computedStyle.getPropertyValue('width')),
      });
    }

    if (column.active) {
      const clonedColumn = document.createElement('div');
      const computedStyle = window.getComputedStyle(node);

      node.childNodes.forEach((node) => {
        if (!this.sortWrapperRefs.get(node)) {
          clonedColumn.append(node.cloneNode(true));
        }
      });

      clonedColumn.style.setProperty('visibility', 'hidden', 'important');

      const styles = [
        'display',
        'flex',
        'margin',
        'padding',
        'background',
        'font-style',
        'font-width',
        'font-size',
        'font-weight',
      ];

      styles.forEach((key) => {
        clonedColumn.style.setProperty(
          key,
          computedStyle.getPropertyValue(key),
          computedStyle.getPropertyPriority(key),
        );
      });

      clonedColumn.style.setProperty('width', 'fit-content', 'important');

      document.body.appendChild(clonedColumn);

      const computedWidth = Math.ceil(clonedColumn.getBoundingClientRect().width);

      document.body.removeChild(clonedColumn);

      const defaultNodeWidth = this.defaultWidths.get(node)?.computedWidth ?? 0;

      if (computedWidth >= defaultNodeWidth) {
        node.style.setProperty('min-width', defaultNodeWidth + SORT_ICON_WIDTH + 'px');
      } else {
        const freeSpace = defaultNodeWidth - computedWidth;

        if (freeSpace < SORT_ICON_WIDTH) {
          node.style.setProperty('min-width', computedWidth + SORT_ICON_WIDTH + 'px');
        }
      }
    } else if (this.defaultWidths.has(node)) {
      const defaultNodeMinWidth = this.defaultWidths.get(node)?.minWidth;

      node.style.setProperty('min-width', defaultNodeMinWidth + 'px');
    }
  };

  renderColumns(columns: Column[], width: number) {
    return columns.map((column) => this.renderColumn(column, width));
  }

  renderColumn(column: Column, width: number) {
    const { styles, use, hidden, uid } = this.asProps;
    const SColumn = Flex as any;
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
        tabIndex={column.sortable ? 0 : undefined}
        __excludeProps={['hidden']}
        {...column.props}
        ref={this.makeColumnRefHandler(column)}
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
              role='columnheader'
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
              <SSortWrapper ref={this.makeSortRefHandler(column.active)}>
                <SSortIcon />
              </SSortWrapper>
            ) : null}
          </>
        )}
      </SColumn>,
    );
  }

  render() {
    const SHead = Root;
    const SHeadWrapper = Box as any;
    const {
      Children,
      styles,
      columnsChildren,
      onResize,
      $scrollRef,
      sticky,
      withScrollBar,
      animationsDisabled,
    } = this.asProps;

    this.columns = flattenColumns(columnsChildren);

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(this.columns);

    logger.warn(
      sticky,
      "'sticky' property is deprecated, use '<Sticky/>' wrapper",
      this.asProps['data-ui-name'] || Head.displayName,
    );

    return sstyled(styles)(
      <SHeadWrapper sticky={sticky} animationsDisabled={animationsDisabled}>
        <ScrollArea
          leftOffset={offsetLeftSum}
          rightOffset={offsetRightSum}
          shadow
          onResize={onResize}
        >
          <ScrollArea.Container ref={$scrollRef} role='rowgroup' tabIndex={-1} zIndex={2}>
            <SHead render={Box} role='row' aria-rowindex='1' __excludeProps={['hidden']}>
              {this.renderColumns(columnsChildren, 100 / this.columns.length)}
            </SHead>
          </ScrollArea.Container>
          {Boolean(withScrollBar) && (
            <div style={displayContents} role='rowgroup'>
              <div style={displayContents} role='row'>
                <div style={displayContents} role='cell'>
                  <ScrollArea.Bar orientation='horizontal' />
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
        {Children.origin}
      </SHeadWrapper>,
    );
  }
}

export default Head;
