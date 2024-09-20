import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import ScrollArea from '@semcore/scroll-area';
import SortDesc from '@semcore/icon/SortDesc/m';
import SortAsc from '@semcore/icon/SortAsc/m';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import { flattenColumns, getFixedStyle, getScrollOffsetValue } from './utils';
import { ColIndex, Column } from './types';
import logger from '@semcore/utils/lib/logger';
import { setRef } from '@semcore/utils/lib/ref';
import { getFocusableIn } from '@semcore/utils/lib/focus-lock/getFocusableIn';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';

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

function cssToIntDefault(value: string, defaultValue = 0) {
  let result = parseFloat(value);
  if (Number.isNaN(result)) {
    result = defaultValue;
  }

  return Math.round(result);
}

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
  getI18nText?: (str: string) => string;
};

class Head extends Component<AsProps> {
  columns: Column[] = [];

  static displayName: string;

  headCellMap = new Map<ColIndex, HTMLElement | null>();
  lockedCell: [HTMLElement | null, boolean] = [null, false];

  sortWrapperRefs = new Map<Node, boolean>();
  defaultWidths = new Map<
    HTMLElement,
    {
      minWidth: number;
      maxWidth: number | null;
      computedWidth: number;
      useForRecalculation: boolean;
    }
  >();

  sortableColumnDescribeId() {
    const { uid } = this.asProps;
    return `${uid}-column-sortable-describer`;
  }

  handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.currentTarget === this.lockedCell[0]) {
      const focusableChildren = Array.from(this.lockedCell[0].children).flatMap((node) =>
        getFocusableIn(node as HTMLElement),
      );

      if (this.lockedCell[1]) {
        if (e.key === 'Escape') {
          this.lockedCell[0]?.focus();
          this.lockedCell[1] = false;
        }
        if (e.key.startsWith('Arrow')) {
          e.stopPropagation();
        }
        if (e.key === 'Tab') {
          if (e.target === focusableChildren[0] && e.shiftKey) {
            focusableChildren[focusableChildren.length - 1]?.focus();
            e.preventDefault();
          } else if (e.target === focusableChildren[focusableChildren.length - 1] && !e.shiftKey) {
            focusableChildren[0]?.focus();
            e.preventDefault();
          }
        }
      } else if (e.key === 'Enter') {
        this.lockedCell[1] = true;
        focusableChildren[0]?.focus();
      } else if (e.key === 'Tab') {
        this.lockedCell[0]?.setAttribute('inert', '');
      }
    }
  };

  onFocusCell = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    if (e.target === e.currentTarget) {
      const focusableChildren = Array.from(e.currentTarget.children).flatMap((node) =>
        getFocusableIn(node as HTMLElement),
      );

      if (focusableChildren.length === 1) {
        focusableChildren[0].focus();
      } else if (focusableChildren.length > 1) {
        this.lockedCell = [e.currentTarget, false];
      }
    }
  };

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

  makeColumnRefHandler = (column: Column, index: number) => (ref: HTMLElement | null) => {
    setRef(column.props.ref, ref);
    this.headCellMap.set(index, ref);
    if (column.props.forwardRef) {
      setRef(column.props.forwardRef, ref);
    }

    if (ref && ref.getAttribute('scope') === 'col') {
      if (!this.defaultWidths.has(ref)) {
        const computedStyle = window.getComputedStyle(ref);

        this.defaultWidths.set(ref, {
          minWidth: cssToIntDefault(computedStyle.getPropertyValue('min-width')),
          computedWidth: cssToIntDefault(computedStyle.getPropertyValue('width')),
          maxWidth: cssToIntDefault(computedStyle.getPropertyValue('max-width')) || null,
          useForRecalculation: Boolean(column.props.sortSizeRecalculation),
        });
      }
    }
  };

  componentDidUpdate() {
    let activeColumn: HTMLElement | null = null;

    this.columns.forEach((column) => {
      const { changeSortSize, ref } = column.props;

      if (column.active && changeSortSize && ref.current) {
        activeColumn = ref.current;
      }

      if (ref.current) {
        this.backToColumnDefaults(ref.current);
      }
    });

    if (activeColumn) {
      this.calculateActiveColumnMinWidth(activeColumn);
    }
  }

  changeMaxNodeWidth = (diff: number, exceptNode: HTMLElement) => {
    let lastMaxWidth = 0;
    let node: HTMLElement | null = null;
    const recalculatedNodes: HTMLElement[] = [];

    this.defaultWidths.forEach((value, key) => {
      if (value.computedWidth > lastMaxWidth && key !== exceptNode) {
        node = key;
        lastMaxWidth = value.computedWidth;
      }
      if (value.useForRecalculation) {
        recalculatedNodes.push(key);
      }
    });

    const setNodeMinWidth = (node: HTMLElement, diff: number) => {
      const defaultNodeWidth = this.defaultWidths.get(node)?.computedWidth;
      const defaultNodeMinWidth = this.defaultWidths.get(node)?.minWidth;

      if (defaultNodeWidth) {
        const maxWidth = defaultNodeWidth - diff;
        node.style.setProperty('max-width', `${maxWidth}px`);

        if (defaultNodeMinWidth) {
          node.style.setProperty('min-width', `min(${maxWidth}px, ${defaultNodeMinWidth}px)`);
        }
      }
    };

    if (recalculatedNodes.length > 0) {
      const diffPart = diff / recalculatedNodes.length;

      recalculatedNodes.forEach((node) => {
        setNodeMinWidth(node, diffPart);
      });
    } else if (node !== null) {
      setNodeMinWidth(node, diff);
    }
  };

  backToColumnDefaults = (node: HTMLElement) => {
    const defaultNodeMinWidth = this.defaultWidths.get(node)?.minWidth;
    const defaultNodeMaxWidth = this.defaultWidths.get(node)?.maxWidth;

    node.style.setProperty('min-width', defaultNodeMinWidth + 'px');

    if (defaultNodeMaxWidth) {
      node.style.setProperty('max-width', defaultNodeMaxWidth + 'px');
    } else {
      node.style.removeProperty('max-width');
    }
  };

  calculateActiveColumnMinWidth = (node: HTMLElement) => {
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
      this.changeMaxNodeWidth(SORT_ICON_WIDTH, node);
    } else {
      const freeSpace = defaultNodeWidth - computedWidth;

      if (freeSpace < SORT_ICON_WIDTH) {
        node.style.setProperty('min-width', computedWidth + SORT_ICON_WIDTH + 'px');
        this.changeMaxNodeWidth(freeSpace, node);
      }
    }
  };

  renderColumns(columns: Column[], width: number) {
    return columns.map((column, index) => this.renderColumn(column, width, index));
  }

  renderColumn(column: Column, width: number, index: number) {
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
        tabIndex={-1}
        __excludeProps={['hidden']}
        {...column.props}
        ref={this.makeColumnRefHandler(column, index)}
        onClick={callAllEventHandlers(
          column.props.onClick,
          column.sortable ? this.bindHandlerSortClick(column.name) : undefined,
        )}
        onKeyDown={callAllEventHandlers(
          column.props.onKeyDown,
          column.sortable ? this.bindHandlerKeyDown(column.name) : undefined,
          this.handleKeyDown,
        )}
        style={style}
        hidden={hidden}
        aria-sort={ariaSortValue}
        aria-colindex={index + 1}
        onFocus={this.onFocusCell}
        aria-describedby={
          column.sortable && !column.active ? this.sortableColumnDescribeId() : undefined
        }
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
      getI18nText,
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
            <SHead render={Box} role='row' __excludeProps={['hidden']}>
              {this.renderColumns(columnsChildren, 100 / this.columns.length)}
            </SHead>
          </ScrollArea.Container>
          {Boolean(withScrollBar) && (
            <div style={displayContents}>
              <div style={displayContents}>
                <div style={displayContents}>
                  <ScrollArea.Bar orientation='horizontal' />
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
        {Children.origin}
        <ScreenReaderOnly aria-hidden={true} id={this.sortableColumnDescribeId()}>
          {getI18nText?.('sortableColumn')}
        </ScreenReaderOnly>
      </SHeadWrapper>,
    );
  }
}

export default Head;
