import { Flex } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import { Component, lastInteraction, Root, sstyled } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import cssToIntDefault from '@semcore/core/lib/utils/cssToIntDefault';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import { isFocusInside } from '@semcore/core/lib/utils/focus-lock/isFocusInside';
import { isInteractiveElement } from '@semcore/core/lib/utils/isInteractiveElement';
import SortAsc from '@semcore/icon/SortAsc/m';
import SortDesc from '@semcore/icon/SortDesc/m';
import * as React from 'react';

import type { ColumnPropsInner, DataTableColumnProps } from './Column.types';
import style from './style.shadow.css';
import type { IFocusableCell, LockedCell } from '../../enhancers/focusableCell';
import { handleFocusCell, handleKeydownFocusCell } from '../../enhancers/focusableCell';
import type { ROW_GROUP } from '../DataTable/DataTable';
import type { DataTableData, SortDirection } from '../DataTable/DataTable.types';

const SORTING_ICON: { [key in SortDirection]: typeof SortAsc | typeof SortDesc } = {
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

export class Column<
  Data extends DataTableData,
  UniqKey extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? keyof Data[number][typeof ROW_GROUP][number] : keyof Data[number]),
  UniqKeyType extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? Data[number][typeof ROW_GROUP][number][UniqKey] : Data[number][UniqKey]),
> extends Component<
    DataTableColumnProps,
    [],
    {},
    ColumnPropsInner<Data, UniqKey, UniqKeyType>,
    State
  > implements IFocusableCell {
  lockedCell: LockedCell = [null, false];

  static displayName = 'Column';
  static style = style;

  columnRef = React.createRef<HTMLDivElement>();
  sortWrapperRef = React.createRef<HTMLDivElement>();

  state: State = {
    sortVisible: false,
  };

  componentDidMount() {
    const { parent, sticky, changeSortSize, name, sort, scrollDirection, headerNodesMap } = this.asProps;
    const columnElement = this.columnRef.current;
    const columnName = columnElement?.getAttribute('name');

    if (columnElement && columnName) {
      headerNodesMap.set(columnName, this.columnRef);
    }

    if (parent && sticky && scrollDirection !== 'horizontal') {
      const columnElement = this.columnRef.current;
      const groupElement = columnElement?.parentElement?.children.item(0);

      const groupRectHeight = groupElement?.getBoundingClientRect().height ?? 0;
      const topOffset = (groupElement instanceof HTMLElement) ? cssToIntDefault(groupElement.style.top) : 0;

      columnElement?.style.setProperty('top', `${groupRectHeight + topOffset}px`);
    }

    if (canUseDOM() && changeSortSize && sort?.[0] === name) {
      this.changeTemplateColumnBySort();
    }
  }

  componentDidUpdate(prevProps: DataTableColumnProps & ColumnPropsInner<Data, UniqKey, UniqKeyType>): void {
    if (
      this.asProps.changeSortSize &&
      canUseDOM() &&
      prevProps.sort?.[0] !== this.asProps.sort?.[0]
    ) {
      this.changeTemplateColumnBySort();
    }
  }

  componentWillUnmount(): void {
    const columnElement = this.columnRef.current;
    const columnName = columnElement?.getAttribute('name');

    if (columnName) {
      this.asProps.headerNodesMap.delete(columnName);
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
          const currentGridTemplateColumns = tableRef.current.style.getPropertyValue('grid-template-columns');

          if (currentGridTemplateColumns) {
            tableRef.current.style.setProperty(
              'grid-template-columns',
              currentGridTemplateColumns.split(' ')
                .map((gtcWidth, index) => {
                  if (index === columnIndex) {
                    return gridTemplateColumns[index];
                  }
                  return gtcWidth;
                })
                .join(' '),
            );
          }
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
    const sortButtonWrapper = this.sortWrapperRef.current;
    const sortButton = sortButtonWrapper?.children.item(0);

    if (sortButton !== document.activeElement) {
      this.setState({ sortVisible: false });
    }
  };

  handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement | undefined;
    if (!isFocusInside(e.currentTarget, relatedTarget)) {
      this.setState({ sortVisible: false });
    }
  };

  handleSort = (e: React.SyntheticEvent<HTMLElement>) => {
    const { sort, onSortChange, name, sortable } = this.asProps;

    if (sortable && onSortChange) {
      const sortDirection =
          sort?.[0] === name ? reversedSortDirection[sort[1]] : this.defaultDirection;

      onSortChange([name, sortDirection], e);
    }
  };

  handleSortClick = (e: React.SyntheticEvent<HTMLElement>) => {
    if (lastInteraction.isKeyboard()) {
      e.stopPropagation();
      this.handleSort(e);
    }
  };

  handleFocusableCellKeyDown = (e: React.KeyboardEvent) => {
    handleKeydownFocusCell(this.lockedCell, e);
  };

  handleFocusableCellFocus = (e: React.FocusEvent<HTMLElement, HTMLElement>) => {
    const cellElement = e.currentTarget;
    const target = e.target;

    if (lastInteraction.isKeyboard()) {
      this.setState({ sortVisible: true }, () => {
        handleFocusCell(this.lockedCell, target, cellElement);
      });
    } else {
      const focusableChildren = Array.from(this.columnRef.current?.children ?? []).flatMap((node) =>
        getFocusableIn(node as HTMLElement),
      );

      if (isInteractiveElement(e.target) && this.columnRef.current && focusableChildren.length > 1) {
        this.lockedCell[0] = this.columnRef.current;
        this.lockedCell[1] = true;
      }
    }
  };

  handleClick = (e: React.SyntheticEvent<HTMLElement>) => {
    const { sortable, onClick, columnIndex } = this.asProps;
    if (sortable) {
      this.handleSort(e);
    }

    const focusableChildren = Array.from(this.columnRef.current?.children ?? []).flatMap((node) =>
      getFocusableIn(node as HTMLElement),
    );

    if (isInteractiveElement(e.target) && this.columnRef.current && focusableChildren.length > 1) {
      this.lockedCell[0] = this.columnRef.current;
      this.lockedCell[1] = true;
    }

    onClick?.(e, { rowIndex: -1, colIndex: columnIndex });
  };

  render() {
    const SColumn = Root;
    const SSortWrapper = 'div';
    const SSortButton = ButtonLink;
    const { styles, sortable, sort, uid, name, parent, sortableColumnDescribeId, Children } =
      this.asProps;

    const [sortBy, sortDirection] = sort ?? [undefined, undefined];
    const isSorted = sortBy === name && !!sortDirection;

    const SSortIcon = isSorted ? SORTING_ICON[sortDirection] : SORTING_ICON[this.defaultDirection];

    const visibleSort = Boolean(sortable) && (this.state.sortVisible || isSorted);

    const ariaDescribedBy = [];
    if (sortable) {
      ariaDescribedBy.push(sortableColumnDescribeId);
    }
    if (parent) {
      ariaDescribedBy.push(`igc-table-${uid}-${parent.name}-group`);
    }

    const ariaSortValue = isSorted ? ARIA_SORT[sortDirection] : undefined;

    return sstyled(styles)(
      <SColumn
        render={Flex}
        ref={this.columnRef}
        role='columnheader'
        tabIndex={-1}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocusableCellFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleFocusableCellKeyDown}
        visibleSort={visibleSort}
        isSorted={isSorted}
        innerOutline
        aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
        aria-sort={ariaSortValue}
        use:onClick={this.handleClick}
      >
        <Children />

        {sortable && (
          <SSortWrapper ref={this.sortWrapperRef}>
            <SSortButton
              aria-label={ariaSortValue}
              size={100}
              color='--intergalactic-icon-primary-neutral'
              onClick={this.handleSortClick}
            >
              <SSortButton.Addon tag={SSortIcon} />
            </SSortButton>
          </SSortWrapper>
        )}
      </SColumn>,
    );
  }
}
