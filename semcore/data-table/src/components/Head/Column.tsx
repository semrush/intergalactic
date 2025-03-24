import * as React from 'react';
import { Component, Root, sstyled } from '@semcore/core';
import { ColumnPropsInner, DataTableColumnProps } from './Column.types';
import { Flex } from '@semcore/base-components';
import SortDesc from '@semcore/icon/SortDesc/m';
import SortAsc from '@semcore/icon/SortAsc/m';

import style from './style.shadow.css';
import Button from '@semcore/button';
import type { SortDirection } from '../DataTable/DataTable.types';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';

const SORTING_ICON = {
  desc: SortDesc,
  asc: SortAsc,
} as const;

const ARIA_SORT = {
  desc: 'descending',
  asc: 'ascending',
} as const;

const DEFAULT_DIRECTION = 'desc';

const reversedSortDirection: { [direction in SortDirection]: SortDirection } = {
  desc: 'asc',
  asc: 'desc',
};

export class Column extends Component<DataTableColumnProps, {}, {}, [], ColumnPropsInner> {
  static displayName = 'Column';
  static style = style;

  lockedCell: [HTMLElement | null, boolean] = [null, false];

  state = {
    sortVisible: false,
  };

  handleMouseEnter = () => {
    this.setState({ sortVisible: true });
  };

  handleMouseLeave = () => {
    this.setState({ sortVisible: false });
  };

  handleBlur = () => {
    this.setState({ sortVisible: false });
  };

  handleSortClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { sort, onSortChange, name } = this.asProps;

    if (sort && onSortChange) {
      const sortDirection = sort[0] === name ? reversedSortDirection[sort[1]] : DEFAULT_DIRECTION;

      onSortChange([name, sortDirection], e);
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
    const SSortButton = Button;
    const { styles, sortable, sort, uid, name, parent, sortableColumnDescribeId } = this.asProps;

    const SSortIcon = sort ? SORTING_ICON[sort[1]] : SORTING_ICON['asc'];
    const isSorted = sort?.[0] === name;
    const visibleSort = sortable && (this.state.sortVisible || isSorted);

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
        role={'columnheader'}
        tabIndex={-1}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocusCell}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        visibleSort={visibleSort}
        innerOutline
        aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
        aria-sort={ariaSortValue}
      >
        {this.asProps.children}

        {visibleSort && (
          <SSortButton
            onClick={this.handleSortClick}
            addonLeft={SSortIcon}
            use={'tertiary'}
            theme={'muted'}
            title={ariaSortValue}
          />
        )}
      </SColumn>,
    );
  }
}
