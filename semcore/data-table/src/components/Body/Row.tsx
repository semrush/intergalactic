import { Box, Collapse, Flex } from '@semcore/base-components';
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
import { LimitOverlay } from './LimitOverlay';
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
  private closeAccordionTimeout = 0;

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
    const { accordionDuration, accordionMode, expandedRows, onExpandRow, setRowHeight, rowsHeightMap, calculateAriaRowIndex } = this.asProps;
    const { expandedForAnimation } = this.state;
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

    if (expandedRows.has(row[UNIQ_ROW_KEY]) && expandedForAnimation === false) {
      this.closeAccordion(row, closeDuration);
    } else {
      if (expandedForAnimation === true && this.closeAccordionTimeout) {
        clearTimeout(this.closeAccordionTimeout);
        onExpandRow(row);

        this.setState({
          expandedForAnimation: false,
        }, calculateAriaRowIndex);
      }

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

      this.forceUpdate(this.asProps.calculateAriaRowIndex);
    }
  };

  closeAccordion = (row: DTRow<UniqKeyType>, closeDuration: number) => {
    const { onExpandRow, calculateAriaRowIndex } = this.asProps;

    this.setState({
      expandedForAnimation: true,
    }, calculateAriaRowIndex);
    this.closeAccordionTimeout = window.setTimeout(() => {
      onExpandRow(row);

      this.setState({
        expandedForAnimation: false,
      }, calculateAriaRowIndex);
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
      flatRows,
      variant,
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

    let withoutBorder = props.row[IS_EMPTY_DATA_ROW];

    if (variant === 'card') {
      const isLastRow = flatRows.length === props.rowIndex + 1;
      const isLastAccordionRow = props.accordionRowIndex !== undefined ? props.accordionRowIndex + 1 === props.rows.length : true;

      withoutBorder = isLastRow && isLastAccordionRow;
    }

    const extraProps: Record<string, any> = {
      use,
      virtualScroll: Boolean(virtualScroll),
      tableRef,
      children: props?.children ?? defaultRender(),
      accordionDuration,
      onClick: onCellClick,
      flatRows: this.asProps.flatRows,
      shadowVertical,
      withoutBorder,
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

      if (expanded) {
        extraProps.withoutBorder = false;
      }

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
            expanded={expanded && !this.state.expandedForAnimation}
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

  get isRowHidden() {
    const { rowIndex, limit } = this.asProps;
    const rowsLimit = limit?.fromRow;
    const columnsLimit = limit?.fromColumn;

    return rowsLimit !== undefined && !columnsLimit && rowIndex > rowsLimit
      ? true
      : undefined;
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
      shadowVertical,
      variant,
      flatRows,
      limit,
      hasGroups,
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

    if (accordion) {
      const rowIncrement = row[ROW_GROUP]?.size ? row[ROW_GROUP].size + 1 : 1;
      accordionDataGridArea = Array.isArray(accordion)
        ? `${gridRowIndex + rowIncrement} / 1 / ${gridRowIndex + rowIncrement + accordion.length} / ${
          columns.length + 1
        }`
        : `${gridRowIndex + rowIncrement} / 1 / ${gridRowIndex + rowIncrement} / ${columns.length + 1}`;
    }

    const rowUniqKey = row[UNIQ_ROW_KEY];
    const accordionId = `${uid}_${rowUniqKey}`;

    const rowsLimit = limit?.fromRow;
    const columnsLimit = limit?.fromColumn;

    return sstyled(styles)(
      <>
        <SRow
          ref={this.rowElementRef}
          render={Box}
          role='row'
          accordionType={accordionType}
          theme={selectedRows?.includes(rowUniqKey) ? 'info' : undefined}
          use:expanded={expanded && !mergedRow}
          onClick={this.handleClickRow(row)}
          aria-hidden={this.isRowHidden}
        >
          {columns.map((column, i) => {
            let isCellHidden: true | undefined = undefined;

            if (limit) {
              if (rowsLimit !== undefined && columnsLimit !== undefined) {
                isCellHidden = rowIndex >= rowsLimit && i >= columnsLimit ? true : undefined;
              } else if (rowsLimit === undefined && columnsLimit !== undefined) {
                isCellHidden = rowIndex >= 0 && i >= columnsLimit ? true : undefined;
              } else if (rowsLimit !== undefined && columnsLimit === undefined) {
                isCellHidden = rowIndex >= rowsLimit ? true : undefined;
              }
            }

            if (selectedRows && i === 0 && row[IS_EMPTY_DATA_ROW] !== true) {
              const checked = selectedRows.includes(rowUniqKey);
              return (
                <SCheckboxCell
                  key={i}
                  row={row}
                  rowIndex={rowIndex}
                  // @ts-ignore
                  column={{ name: SELECT_ALL.toString() }}
                  columnIndex={0}
                  gridRowIndex={gridRowIndex}
                  onClick={this.handleClickCheckbox(!checked)}
                  aria-hidden={isCellHidden}
                >
                  <Checkbox
                    checked={checked}
                    aria-labelledby={`${uid}_${rowUniqKey}_1`}
                    onChange={this.handleSelectRow}
                  >
                    <Checkbox.Value />
                  </Checkbox>
                </SCheckboxCell>
              );
            }

            const index = i;
            const cellValue: DTValue | MergedRowsCell | MergedColumnsCell | undefined = row[column.name];

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
                id={`${uid}_${rowUniqKey}_${index}`}
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
                aria-hidden={isCellHidden}
              />
            );
          })}
          {limit && (limit.fromRow ?? 0) === rowIndex && !isAccordionRow && (
            <LimitOverlay
              columns={columns}
              rows={rows}
              limit={limit}
              flatRows={flatRows}
              hasGroups={hasGroups}
            />
          )}
        </SRow>

        {React.isValidElement(accordion) && (
          <SCollapseRow
            key={rowIndex}
            role='row'
            id={accordionId}
            visible={expanded}
            aria-hidden={!expanded}
            interactive
            gridArea={accordionDataGridArea}
            duration={accordionDuration ?? 200}
          >
            <SCell
              aria-colindex={1}
              aria-level={ariaLevel + 1}
              aria-setsize={1}
              aria-posinset={1}
              accordionRowIndex={0}
              rowIndex={rowIndex}
              rows={[row]}
              row={row}
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
          <SAccordionRows id={accordionId} role='rowgroup' aria-hidden={!expanded}>
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
                  gridRowIndex={gridRowIndex + 1 + i}
                  isAccordionRow={true}
                  getFixedStyle={getFixedStyle}
                  animationExpand={expanded}
                  accordionRowIndex={i}
                  use={use}
                  shadowVertical={shadowVertical}
                  accordionDuration={accordionDuration}
                  variant={variant}
                  flatRows={flatRows}
                  limit={limit}
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
