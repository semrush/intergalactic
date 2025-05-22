import * as React from 'react';
import { Component, Intergalactic, lastInteraction, Root, sstyled } from '@semcore/core';
import { ColumnPropsInner, DataTableColumnProps } from './Column.types';
import { Flex } from '@semcore/base-components';
import SortDesc from '@semcore/icon/SortDesc/m';
import SortAsc from '@semcore/icon/SortAsc/m';
import { IconProps } from '@semcore/icon';

import style from './style.shadow.css';
import { ButtonLink } from '@semcore/button';
import type { DataTableData, SortDirection } from '../DataTable/DataTable.types';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { isFocusInside } from '@semcore/core/lib/utils/focus-lock/isFocusInside';

const SORTING_ICON: { [key in SortDirection]: Intergalactic.Component<'svg', IconProps> } = {
  desc: SortDesc,
  asc: SortAsc,
} as const;

const ARIA_SORT = {
  desc: 'descending',
  asc: 'ascending',
} as const;

const SORT_ICON_WIDTH = 20;

const DEFAULT_DIRECTION = 'desc';

const reversedSortDirection: { [direction in SortDirection]: SortDirection } = {
  desc: 'asc',
  asc: 'desc',
};

type State = {
  sortVisible: boolean;
};

export class Column<D extends DataTableData> extends Component<
  DataTableColumnProps,
  {},
  {},
  [],
  ColumnPropsInner<D>
> {
  static displayName = 'Column';
  static style = style;

  lockedCell: [HTMLElement | null, boolean] = [null, false];

  columnRef = React.createRef<HTMLDivElement>();
  sortWrapperRef = React.createRef<HTMLDivElement>();

  state: State = {
    sortVisible: false,
  };

  componentDidMount() {
    const { parent, sticky, changeSortSize, name, sort } = this.asProps;

    if (parent && sticky) {
      const columnElement = this.columnRef.current;
      const groupElement = columnElement?.parentElement?.children.item(0);

      const groupHeight = groupElement?.getBoundingClientRect().height;

      if (groupHeight) {
        columnElement?.style.setProperty('top', `${groupHeight}px`);
      }
    }

    if (canUseDOM() && changeSortSize && sort?.[0] === name) {
      this.changeTemplateColumnBySort();
    }
  }

  componentDidUpdate(prevProps: DataTableColumnProps & ColumnPropsInner<D>): void {
    if (
      this.asProps.changeSortSize &&
      canUseDOM() &&
      prevProps.sort?.[0] !== this.asProps.sort?.[0]
    ) {
      this.changeTemplateColumnBySort();
    }
  }

  changeTemplateColumnBySort() {
    const { tableRef, gridTemplateColumns, columnIndex, sort, name } = this.asProps;

    if (sort?.[0] === name) {
      const newWidth = this.calculateActiveColumnMinWidth();

      setTimeout(() => {
        if (tableRef.current && newWidth !== null) {
          tableRef.current.style.setProperty(
            'grid-template-columns',
            gridTemplateColumns
              .map((gtcWidth, index) => {
                if (index === columnIndex) {
                  return `${newWidth}px`;
                }
                return gtcWidth;
              })
              .join(' '),
          );
        }
      });
    } else if (sort?.[0] !== name) {
      setTimeout(() => {
        if (tableRef.current) {
          tableRef.current.style.setProperty(
            'grid-template-columns',
            gridTemplateColumns.join(' '),
          );
        }
      });
    }
  }

  calculateActiveColumnMinWidth = (): number | null => {
    const node = this.columnRef.current;

    if (node) {
      const clonedColumn = document.createElement('div');
      const computedStyle = window.getComputedStyle(node);

      node.childNodes.forEach((node) => {
        if (this.sortWrapperRef.current !== node) {
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

      const defaultNodeWidth = this.columnRef.current?.clientWidth ?? 0;

      if (computedWidth >= defaultNodeWidth) {
        return defaultNodeWidth + SORT_ICON_WIDTH;
      } else {
        const freeSpace = defaultNodeWidth - computedWidth;

        if (freeSpace < SORT_ICON_WIDTH) {
          return computedWidth + SORT_ICON_WIDTH;
        }
      }
    }

    return null;
  };

  get defaultDirection() {
    const { sortable } = this.asProps;

    if (typeof sortable === 'string') {
      return sortable;
    }

    return DEFAULT_DIRECTION;
  }

  handleMouseEnter = () => {
    this.setState({ sortVisible: true });
  };

  handleMouseLeave = () => {
    this.setState({ sortVisible: false });
  };

  handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement | undefined;
    if (!isFocusInside(e.currentTarget, relatedTarget) && lastInteraction.isKeyboard()) {
      this.setState({ sortVisible: false });
    }
  };

  handleSortClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { sort, onSortChange, name } = this.asProps;

    if (
      lastInteraction.isMouse() ||
      (lastInteraction.isKeyboard() && e.target === e.currentTarget)
    ) {
      if (sort && onSortChange) {
        const sortDirection =
          sort[0] === name ? reversedSortDirection[sort[1]] : this.defaultDirection;

        onSortChange([name, sortDirection], e);
      }
    }
  };

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

          e.stopPropagation();
        }
      } else if (e.key === 'Enter') {
        this.lockedCell[1] = true;
        focusableChildren[0]?.focus();
      } else if (e.key === 'Tab') {
        this.lockedCell[0]?.setAttribute('inert', '');
      }
    }
  };

  handleFocusCell = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    const cellElement = e.currentTarget;
    const target = e.target;

    this.setState({ sortVisible: true }, () => {
      if (target === cellElement) {
        const focusableChildren = Array.from(cellElement.children).flatMap((node) =>
          getFocusableIn(node as HTMLElement),
        );

        if (focusableChildren.length === 1) {
          focusableChildren[0].focus();
        } else if (focusableChildren.length > 1) {
          this.lockedCell = [cellElement, false];
        }
      }
    });
  };

  render() {
    const SColumn = Root;
    const SSortWrapper = 'div';
    const SSortButton = ButtonLink;
    const { styles, sortable, sort, uid, name, parent, sortableColumnDescribeId, Children } =
      this.asProps;

    const SSortIcon =
      sort && sort[0] === name ? SORTING_ICON[sort[1]] : SORTING_ICON[this.defaultDirection];
    const isSorted = sort?.[0] === name;
    const visibleSort = Boolean(sortable) && (this.state.sortVisible || isSorted);

    const ariaDescribedBy = [];
    if (isSorted) {
      ariaDescribedBy.push(sortableColumnDescribeId);
    }
    if (parent) {
      ariaDescribedBy.push(`igc-table-${uid}-${parent.name}-group`);
    }

    const ariaSortValue = sort?.[1] ? ARIA_SORT[sort[1]] : undefined;

    return sstyled(styles)(
      <SColumn
        render={Flex}
        ref={this.columnRef}
        role={'columnheader'}
        tabIndex={-1}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocusCell}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        visibleSort={visibleSort}
        isSorted={isSorted}
        innerOutline
        aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
        aria-sort={ariaSortValue}
        onClick={sortable ? this.handleSortClick : undefined}
      >
        <Children />

        {sortable && (
          <SSortWrapper ref={this.sortWrapperRef}>
            <SSortButton
              onClick={this.handleSortClick}
              aria-label={ariaSortValue}
              color={'--intergalactic-icon-primary-neutral'}
            >
              <SSortButton.Addon tag={SSortIcon} />
            </SSortButton>
          </SSortWrapper>
        )}
      </SColumn>,
    );
  }
}
