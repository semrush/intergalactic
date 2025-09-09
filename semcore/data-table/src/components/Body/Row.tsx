import { Box, Collapse } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import Checkbox from '@semcore/checkbox';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import { isInteractiveElement } from '@semcore/core/lib/utils/isInteractiveElement';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import * as React from 'react';

import { INDEX_OFFSET } from './Body';
import { Cell } from './Cell';
import type { DataTableCellProps, DataTableCellType } from './Cell.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import type { DataTableRowProps, DataTableRowType, DTRow, RowPropsInner } from './Row.types';
import style from './style.shadow.css';
import { ACCORDION, IS_EMPTY_DATA_ROW, ROW_GROUP, ROW_INDEX, SELECT_ALL, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import type { DataTableData, DTValue } from '../DataTable/DataTable.types';

type State = {
  expandedForAnimation: boolean;
};

export class RowRoot<Data extends DataTableData, UniqKeyType> extends Component<DataTableRowProps<Data, UniqKeyType>, {}, State, [], RowPropsInner<Data, UniqKeyType>> {
  static displayName = 'Row';
  static style = style;

  static defaultProps = {
    'aria-level': undefined,
  };

  private cellName: string = '';

  rowElementRef = React.createRef<HTMLDivElement>();

  state: State = {
    expandedForAnimation: false,
  };

  constructor(props: DataTableRowProps<Data, UniqKeyType>) {
    super(props);

    this.handleClickRow = this.handleClickRow.bind(this);
  }

  componentDidMount() {
    this.asProps.componentRef?.(this);
  }

  componentWillUnmount() {
    this.asProps.componentRef?.(null);
  }

  cellHasAccordion(cellValue?: DTValue | MergedColumnsCell | MergedRowsCell): cellValue is DTValue {
    return (
      !(cellValue instanceof MergedRowsCell || cellValue instanceof MergedColumnsCell) &&
      Boolean(cellValue?.[ACCORDION])
    );
  }

  handleSelectRow = (value: boolean, event?: React.SyntheticEvent<HTMLElement>) => {
    const { row, rowIndex, onSelectRow } = this.asProps;

    onSelectRow?.(value, rowIndex, row, event);
  };

  handleClickCheckbox = (value: boolean) => (event?: React.SyntheticEvent<HTMLElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    const { row, rowIndex, onSelectRow } = this.asProps;

    onSelectRow?.(value, rowIndex, row, event);
  };

  handleBackFromAccordion = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.asProps.onBackFromAccordion(this.cellName);
    }
  };

  handleExpandRow = (row: DTRow<UniqKeyType>, index: number) => {
    const { accordionDuration, accordionMode, expandedRows, onExpandRow, setRowHeight, rowsHeightMap } = this.asProps;
    const openDuration = Array.isArray(accordionDuration)
      ? accordionDuration[0]
      : accordionDuration ??
        (Array.isArray(row[ACCORDION]) ? Math.min(50 * row[ACCORDION].length, 200) : 200);
    const closeDuration = Array.isArray(accordionDuration)
      ? accordionDuration[1]
      : accordionDuration ??
        (Array.isArray(row[ACCORDION]) ? Math.min(50 * row[ACCORDION].length, 200) : 200);

    setTimeout(() => {
      setRowHeight(index, row);
      for (let i = index; i < rowsHeightMap.size; i++) {
        setRowHeight(i, row);
      }
    }, openDuration + 100); // we need to calculate after expanding animation

    if (expandedRows.has(row[UNIQ_ROW_KEY])) {
      this.closeAccordion(row, closeDuration);
    } else {
      if (accordionMode === 'toggle' && expandedRows.size > 0) {
        const previousRows = new Map<UniqKeyType, DTRow<UniqKeyType>>();

        this.asProps.flatRows.forEach((row, index) => {
          if (expandedRows.has(row[UNIQ_ROW_KEY])) {
            previousRows.set(row[UNIQ_ROW_KEY], row);
          }
        });

        if (previousRows.size > 0) {
          [...previousRows.entries()].forEach(([uniqKey, previousRow]) => {
            if (!this.state.expandedForAnimation) {
              setTimeout(() => {
                this.asProps.componentsMap.get(uniqKey)?.closeAccordion(previousRow, closeDuration);
              }, openDuration / 3);
            }
          });
        }
      }
      onExpandRow(row);
    }
    this.forceUpdate();

    setTimeout(() => {
      const { componentsMap, expandedRows } = this.asProps;
      const skip = new Set<UniqKeyType>();

      componentsMap.forEach((component, index) => {
        if (expandedRows.has(component.props.row[UNIQ_ROW_KEY]) && component.props.row[ROW_GROUP]) {
          component.props.row[ROW_GROUP].forEach((item) => {
            skip.add(item);
          });
        }

        if (skip.has(component.props.row[UNIQ_ROW_KEY])) {
          return;
        }

        component.recalculateAriaRowIndex();
      });
    }, closeDuration + 100);
  };

  closeAccordion = (row: DTRow<UniqKeyType>, closeDuration: number) => {
    const { onExpandRow } = this.asProps;

    this.setState({
      expandedForAnimation: true,
    });
    setTimeout(() => {
      onExpandRow(row);

      this.setState({
        expandedForAnimation: false,
      });
    }, closeDuration + 100); // we need to remove it from list of grid calculations after expanding animation
  };

  handleClickRow(row: DTRow<UniqKeyType>) {
    return (e: React.SyntheticEvent) => {
      const index = row[ROW_INDEX];
      if (!isInteractiveElement(e.target) && row[ACCORDION] && !this.asProps.mergedRow) {
        this.handleExpandRow(row, index);
      }
    };
  }

  handleClickCell = (e: React.SyntheticEvent<HTMLElement>, opt: { row: DTRow<UniqKeyType>; rowIndex: number }) => {
    if (!isInteractiveElement(e.target)) {
      this.handleExpandRow(opt.row, opt.rowIndex);
    }
  };

  recalculateAriaRowIndex = () => {
    const {
      expandedRows,
      flatRows,
      row,
    } = this.asProps;

    const index = row[ROW_INDEX];

    const ariaRowIndex = Array.from(expandedRows ?? []).reduce((acc, item) => {
      const rowIndex = flatRows.findIndex((row) => row[UNIQ_ROW_KEY] === item);

      if (rowIndex < index) {
        const expandedRow = flatRows[rowIndex] instanceof MergedRowsCell ? flatRows[rowIndex].accordion : flatRows[rowIndex]?.[ACCORDION];
        if (Array.isArray(expandedRow)) {
          acc = acc + expandedRow.length;
        } else {
          acc = acc + 1;
        }
      }

      return acc;
    }, index + INDEX_OFFSET); // 1 - for header, 1 - because start not from 0, but from 1

    const rowElement = this.rowElementRef.current;

    rowElement?.setAttribute('aria-rowindex', ariaRowIndex.toString());

    if (rowElement?.nextSibling instanceof HTMLElement && rowElement.nextSibling.dataset.uiName === 'Collapse') {
      let increment = 1;
      const value = row[this.cellName];

      if (value instanceof MergedRowsCell) {
        increment = value.rowsCount;
      }
      rowElement.nextSibling.setAttribute('aria-rowindex', (ariaRowIndex + increment).toString());
    }
  };

  getCellProps(props: DataTableCellProps<UniqKeyType>) {
    const {
      use,
      renderCell,
      expandedRows,
      styles,
      getI18nText,
      virtualScroll,
      tableRef,
      accordionDuration,
      onCellClick,
      rawData,
      shadowVertical,
    } = this.asProps;
    const SAccordionToggle = ButtonLink;

    let dataKey = props.column.name;
    const cellValue = props.row[dataKey];

    let value: DTValue | undefined = undefined;
    const isMergedRows = cellValue instanceof MergedRowsCell;
    const isMergedColumns = cellValue instanceof MergedColumnsCell;

    if (isMergedColumns || isMergedRows) {
      value = cellValue.value;
      if (isMergedColumns) {
        dataKey = cellValue.dataKey;
      }
    } else {
      value = cellValue;
    }

    const defaultRender = () => {
      return React.isValidElement(value) ? value : value?.toString();
    };

    const extraProps: Record<string, any> = {
      use,
      virtualScroll: Boolean(virtualScroll),
      tableRef,
      children: props?.children ?? defaultRender(),
      accordionDuration,
      onClick: onCellClick,
      flatRows: this.asProps.flatRows,
      shadowVertical,
    };

    if (renderCell) {
      let rowRawData = rawData[props.rowIndex];

      if (props.accordionRowIndex && rowRawData[ACCORDION] && Array.isArray(rowRawData[ACCORDION])) {
        rowRawData = rowRawData[ACCORDION][props.accordionRowIndex];
      }

      const external = renderCell({
        columnName: props.column.name,
        row: props.row,
        column: props.column,
        rowIndex: props.rowIndex,
        columnIndex: props.columnIndex,
        dataKey,
        defaultRender,
        value: React.isValidElement(value) ? value : value?.toString() ?? '',
        isMergedRows,
        isMergedColumns,
        rawData: rowRawData,
      });

      if (this.isReactNode(external) || Array.isArray(external)) {
        extraProps.children = external;
      } else {
        for (const key in external) {
          if (key === 'onClick') {
            extraProps[key] = callAllEventHandlers(external[key], extraProps[key]);
          } else {
            extraProps[key] = external[key];
          }
        }
      }
    }

    if (
      (props.columnIndex === 0 && props.row[ACCORDION]) ||
      value?.[ACCORDION] ||
      (cellValue instanceof MergedRowsCell && cellValue.accordion)
    ) {
      const expanded =
              expandedRows?.has(props.row[UNIQ_ROW_KEY]) &&
              !this.state.expandedForAnimation;

      extraProps.expanded = expanded;

      const row = props.row;
      const rowIndex = props.rowIndex;

      const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onCellClick(e, { colIndex: props.columnIndex, rowIndex, row });
        this.handleExpandRow(row, rowIndex);
      };

      if (value?.[ACCORDION] || (cellValue instanceof MergedRowsCell && cellValue.accordion)) {
        extraProps.onClick = callAllEventHandlers(
          extraProps.onClick,
          this.handleClickCell,
        );
      }

      extraProps.children = sstyled(styles)(
        <>
          <SAccordionToggle
            aria-label={getI18nText('DataTable.Cell.AccordionToggle.expand:aria-label')}
            // @ts-ignore
            expanded={expanded}
            onClick={handleClick}
            color='--intergalactic-icon-primary-neutral'
            aria-expanded={expanded}
            aria-describedby={props.id}
            aria-controls={expanded ? props.accordionId : undefined}
          >
            <SAccordionToggle.Addon tag={ChevronRightM} />
          </SAccordionToggle>
          {extraProps.children}
        </>,
      );
    }

    return extraProps;
  }

  render() {
    const SRow = Root;
    const SCollapseRow = Collapse;
    const SAccordionRows = Box;
    const SCell = Row.Cell;
    const SCheckboxCell = Row.Cell;
    const {
      columns,
      row,
      rows,
      styles,
      rowIndex,
      ariaRowIndex,
      gridRowIndex,
      'aria-level': ariaLevel = 1,
      selectedRows,
      expandedRows,
      uid,
      getFixedStyle,
      mergedRow,
      isAccordionRow,
      animationExpand,
      accordionRowIndex,
      accordionDuration,
      use,
    } = this.asProps;

    const expanded = expandedRows?.has(row[UNIQ_ROW_KEY]) && !this.state.expandedForAnimation;

    let accordion = row[ACCORDION];
    const accordionType = accordion && !mergedRow ? 'row' : undefined;

    if (!accordion) {
      const cells = Object.entries(row);
      const foundCell = cells.find(([key, value]) => {
        return this.cellHasAccordion(value) || (value instanceof MergedRowsCell && value.accordion);
      });

      if (foundCell) {
        this.cellName = foundCell[0];
        const value = foundCell[1];

        accordion = value instanceof MergedRowsCell
          ? value.accordion
          : this.cellHasAccordion(value)
            ? value[ACCORDION]
            : null;
      }
    }

    let accordionDataGridArea = '';

    const value = row[this.cellName];
    const accordionAriaIndex = value instanceof MergedRowsCell ? ariaRowIndex + value.rowsCount : ariaRowIndex + 1;

    if (accordion) {
      const rowIncrement = row[ROW_GROUP]?.size ? row[ROW_GROUP].size + 1 : 1;
      accordionDataGridArea = Array.isArray(accordion)
        ? `${gridRowIndex + rowIncrement} / 1 / ${gridRowIndex + rowIncrement + accordion.length} / ${
          columns.length + 1
        }`
        : `${gridRowIndex + rowIncrement} / 1 / ${gridRowIndex + rowIncrement} / ${columns.length + 1}`;
    }

    const accordionId = `${uid}_${ariaRowIndex + 1}`;
    const rowUniqKey = row[UNIQ_ROW_KEY];

    return sstyled(styles)(
      <>
        <SRow
          ref={this.rowElementRef}
          render={Box}
          role='row'
          aria-rowindex={ariaRowIndex}
          accordionType={accordionType}
          theme={selectedRows?.includes(rowUniqKey) ? 'info' : undefined}
          use:expanded={expanded && !mergedRow}
          onClick={this.handleClickRow(row)}
        >
          {columns.map((column, i) => {
            if (selectedRows && i === 0 && row[IS_EMPTY_DATA_ROW] !== true) {
              const checked = selectedRows.includes(rowUniqKey);
              return sstyled(styles)(
                <SCheckboxCell
                  key={i}
                  row={row}
                  rowIndex={rowIndex}
                  // @ts-ignore
                  column={{ name: SELECT_ALL.toString() }}
                  columnIndex={0}
                  gridRowIndex={gridRowIndex}
                  onClick={this.handleClickCheckbox(!checked)}
                >
                  <Checkbox
                    checked={checked}
                    aria-labelledby={`${uid}_${ariaRowIndex}_1`}
                    onChange={this.handleSelectRow}
                  >
                    <Checkbox.Value />
                  </Checkbox>
                </SCheckboxCell>,
              );
            }

            const index = i;
            const cellValue: DTValue | MergedRowsCell | MergedColumnsCell | undefined =
              row[column.name];

            if (cellValue === undefined) {
              return null;
            }

            const style: React.CSSProperties = {};

            if (column.fixed) {
              const [name, value] = getFixedStyle(column);

              if (name !== undefined && value !== undefined) {
                style[name] = value;
              }
            }

            return (
              <Row.Cell
                key={index}
                id={`${uid}_${ariaRowIndex}_${index}`}
                accordionId={accordionId}
                data-aria-level={index === 0 ? ariaLevel : undefined}
                row={row}
                rowIndex={rowIndex}
                gridRowIndex={gridRowIndex}
                columnIndex={index}
                style={style}
                column={column}
                withAccordion={
                  Boolean(cellValue instanceof MergedRowsCell && cellValue.accordion) ||
                  this.cellHasAccordion(cellValue)
                }
                isAccordionRow={isAccordionRow}
                animationExpand={animationExpand}
                accordionRowIndex={accordionRowIndex}
                rows={rows}
              />
            );
          })}
        </SRow>

        {React.isValidElement(accordion) && (
          <SCollapseRow
            key={rowIndex}
            role='row'
            aria-rowindex={accordionAriaIndex}
            id={accordionId}
            visible={expanded}
            interactive
            gridArea={accordionDataGridArea}
            duration={accordionDuration ?? 200}
          >
            <SCell
              aria-colindex={1}
              aria-level={ariaLevel + 1}
              aria-setsize={1}
              aria-posinset={1}
              row={row}
              rowIndex={rowIndex + 1}
              columnIndex={1}
              // @ts-ignore
              column={{ name: ACCORDION }}
              w='100%'
              onKeyDown={this.handleBackFromAccordion}
            >
              {accordion}
            </SCell>
          </SCollapseRow>
        )}

        {row[ACCORDION] && Array.isArray(row[ACCORDION]) && (
          <SAccordionRows id={accordionId} role='rowgroup'>
            {row[ACCORDION].map((subrow, i) => {
              return (
                <Row
                  key={i}
                  // @ts-ignore
                  row={subrow}
                  columns={columns}
                  rows={row[ACCORDION]}
                  rowIndex={rowIndex}
                  aria-hidden={!expanded}
                  aria-posinset={i + 1}
                  aria-level={ariaLevel + 1}
                  ariaRowIndex={accordionAriaIndex + i}
                  gridRowIndex={gridRowIndex + 1 + i}
                  isAccordionRow={true}
                  getFixedStyle={getFixedStyle}
                  animationExpand={expanded}
                  accordionRowIndex={i}
                  use={use}
                />
              );
            })}
          </SAccordionRows>
        )}
      </>,
    );
  }

  private isReactNode(obj: React.ReactNode | Record<string, any>): obj is React.ReactNode {
    return (
      typeof obj === 'string' ||
      typeof obj === 'number' ||
      React.isValidElement(obj) ||
      typeof obj === 'boolean' ||
      obj === undefined ||
      obj === null
    );
  }
}

export const Row = createComponent(RowRoot, {
  Cell,
}) as DataTableRowType & {
  Cell: DataTableCellType;
};
