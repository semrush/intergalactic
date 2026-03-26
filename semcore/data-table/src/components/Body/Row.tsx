import { Box, Collapse } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
import Checkbox from '@semcore/checkbox';
import { Component, Root, sstyled, createComponent } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import { isInteractiveElement } from '@semcore/core/lib/utils/isInteractiveElement';
import ChevronRightM from '@semcore/icon/ChevronRight/m';
import * as React from 'react';

import { Cell } from './Cell';
import type { DataTableCellProps } from './Cell.types';
import { LimitOverlay } from './LimitOverlay';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import type { DataTableRowProps, DataTableRowType, DTRow, DTRows, RowPropsInner } from './Row.types';
import style from './style.shadow.css';
import { AccordionRows } from '../AccordionRows/AccordionRows';
import { ACCORDION, IS_EMPTY_DATA_ROW, ROW_GROUP, ROW_INDEX, SELECT_ALL, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import type { DataTableData, DTValue } from '../DataTable/DataTable.types';

type State<UniqKeyType> = {
  expandedForAnimation: boolean;
  accordionRows?: DTRows<UniqKeyType>;
  accordionComponent?: React.ReactNode;
};

export class RowRoot<Data extends DataTableData, UniqKeyType> extends Component<DataTableRowProps<Data, UniqKeyType>, {}, State<UniqKeyType>, [], RowPropsInner<Data, UniqKeyType>> {
  static displayName = 'Row';
  static style = style;

  static defaultProps = {
    'aria-level': undefined,
  };

  private cellName: string = '';
  private closeAccordionTimeout = 0;
  private openAccordionTimeout = 0;

  rowElementRef = React.createRef<HTMLDivElement>();

  state: State<UniqKeyType> = {
    expandedForAnimation: false,
    accordionRows: undefined,
    accordionComponent: undefined,
  };

  constructor(props: DataTableRowProps<Data, UniqKeyType>) {
    super(props);

    this.handleClickRow = this.handleClickRow.bind(this);
  }

  componentDidMount() {
    this.asProps.componentRef?.(this);

    this.setAccordion();
  }

  componentDidUpdate(prevProps: DataTableRowProps<Data, UniqKeyType>) {
    const { row } = this.asProps;

    if (prevProps.row !== row) {
      this.setAccordion();
    }
  }

  componentWillUnmount() {
    this.asProps.componentRef?.(null);
  }

  setAccordion() {
    const { row } = this.asProps;

    let accordionRows = Array.isArray(row[ACCORDION]) ? row[ACCORDION] : undefined;
    let accordionComponent: React.ReactNode = React.isValidElement(row[ACCORDION]) ? row[ACCORDION] : undefined;

    if (!accordionRows && !accordionComponent) {
      const cells = Object.entries(row);
      const foundCell = cells.find(([key, value]) => {
        return this.cellHasAccordion(value) || (value instanceof MergedRowsCell && value.accordion);
      });

      if (foundCell) {
        this.cellName = foundCell[0];
        const value = foundCell[1];

        if (value instanceof MergedRowsCell && value.accordion) {
          if (Array.isArray(value.accordion)) {
            accordionRows = value.accordion;
          } else {
            accordionComponent = value.accordion;
          }
        } else if (this.cellHasAccordion(value)) {
          accordionComponent = value[ACCORDION];
        }
      }
    }

    this.setState({
      accordionRows,
      accordionComponent,
    });
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
    const {
      accordionDuration,
      accordionMode,
      expandedRows,
      onExpandRow,
      setRowHeight,
      rowsHeightMap,
      calculateAriaRowIndex,
      accordionAnimationRows,
    } = this.asProps;
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

      if (this.state.accordionRows !== undefined) {
        const accordionRows = Array.isArray(row[ACCORDION]) ? row[ACCORDION] : [];

        let i = 0;

        const changeAccordionRows = () => {
          if (this.openAccordionTimeout) {
            clearTimeout(this.openAccordionTimeout);
          }

          const chunk = i === 0 ? accordionAnimationRows : 100;

          this.setState({ accordionRows: accordionRows.slice(0, i + chunk) }, () => {
            i = i + chunk;
            if (i < accordionRows.length) {
              this.openAccordionTimeout = window.setTimeout(() => {
                changeAccordionRows();
              }, openDuration);
            } else {
              this.asProps.calculateAriaRowIndex();
            }
          });
        };

        changeAccordionRows();
      }
    }
  };

  closeAccordion = (row: DTRow<UniqKeyType>, closeDuration: number) => {
    const { onExpandRow, calculateAriaRowIndex, accordionAnimationRows } = this.asProps;

    if (this.openAccordionTimeout) {
      clearTimeout(this.openAccordionTimeout);
    }

    this.setState((prevState) => {
      return {
        expandedForAnimation: true,
        accordionRows: prevState.accordionRows?.slice(0, accordionAnimationRows),
      };
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

  getCellProps(props: DataTableCellProps<Data, UniqKeyType>) {
    const {
      use,
      renderCell,
      expandedRows,
      styles,
      getI18nText,
      virtualScroll,
      gridContainerRef,
      onCellClick,
      rawData,
      shadowVertical,
      flatRows,
      variant,
      isAccordionRow,
      accordionRowIndex,
      selectedRows,
      theme,
    } = this.asProps;
    const SAccordionToggle = ButtonLink;

    let dataKey = props.column.name;
    const cellValue = props.row[dataKey];

    let value: DTValue | undefined = undefined;
    const isMergedRows = cellValue instanceof MergedRowsCell;
    const isMergedColumns = cellValue instanceof MergedColumnsCell;

    if (isMergedColumns || isMergedRows) {
      value = cellValue.value instanceof MergedRowsCell ? cellValue.value.value : cellValue.value;
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
      gridContainerRef,
      children: props?.children ?? defaultRender(),
      onClick: onCellClick,
      flatRows: this.asProps.flatRows,
      shadowVertical,
      withoutBorder,
      theme,
    };

    if (renderCell) {
      let rowRawData = rawData[props.rowIndex];

      if (props.accordionRowIndex !== undefined && rowRawData[ACCORDION] && Array.isArray(rowRawData[ACCORDION])) {
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
        isAccordionRow: Boolean(isAccordionRow),
        accordionRowIndex,
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

    const firstColumnIndex = selectedRows ? 1 : 0;

    if (
      (props.columnIndex === firstColumnIndex && props.row[ACCORDION]) ||
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
      accordionRowIndex,
      accordionDuration,
      use,
      shadowVertical,
      variant,
      flatRows,
      sideIndents,
      renderCell,
      rawData,
      limit,
      hasGroups,
      gridContainerRef,
      scrollAreaRef,
      accordionAnimationRows,
      onCellClick,
      theme,
    } = this.asProps;

    const { expandedForAnimation, accordionRows, accordionComponent } = this.state;
    const expanded = expandedRows?.has(row[UNIQ_ROW_KEY]) && !expandedForAnimation;
    const accordionType = row[ACCORDION] && !mergedRow ? 'row' : undefined;

    let accordionDataGridArea = '';

    if (accordionRows || accordionComponent) {
      const rowIncrement = row[ROW_GROUP]?.size ? row[ROW_GROUP].size + 1 : 1;
      accordionDataGridArea = accordionRows
        ? `${gridRowIndex + rowIncrement} / 1 / ${gridRowIndex + rowIncrement + accordionRows.length} / ${
          columns.length + 1
        }`
        : `${gridRowIndex + rowIncrement} / 1 / ${gridRowIndex + rowIncrement} / ${columns.length + 1}`;
    }

    const rowUniqKey = row[UNIQ_ROW_KEY];
    const accordionId = `${uid}_${rowUniqKey}`;

    const rowsLimit = limit?.fromRow;
    const columnsLimit = limit?.fromColumn;

    const filledColumns = columns.reduce((acc, column) => {
      const cellValue: DTValue | MergedRowsCell | MergedColumnsCell | undefined = row[column.name];

      if (cellValue instanceof MergedColumnsCell) {
        acc = acc + cellValue.columnsCount;
      } else if (cellValue !== undefined) {
        acc++;
      }

      return acc;
    }, 0);

    return sstyled(styles)(
      <>
        <SRow
          ref={this.rowElementRef}
          render={Box}
          role='row'
          accordionType={accordionType}
          use:expanded={expanded && !mergedRow}
          onClick={this.handleClickRow(row)}
          aria-hidden={this.isRowHidden}
          data-filled-columns={filledColumns}
        >
          {columns.map((column, i) => {
            const index = i;
            const cellValue: DTValue | MergedRowsCell | MergedColumnsCell | undefined =
                    row[column.name];

            const withAccordion = Boolean(cellValue instanceof MergedRowsCell && cellValue.accordion) ||
              this.cellHasAccordion(cellValue) || accordionType === 'row';

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

              const nextColumnName = columns[i + 1].name;

              if (!(nextColumnName in row)) {
                return null;
              }

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
                  expanded={expanded}
                  isAccordionRow={isAccordionRow}
                  aria-hidden={isCellHidden}
                  withAccordion={withAccordion}
                  theme={theme}
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
                key={`${uid}_${rowUniqKey}_${index}`}
                id={`${uid}_${rowUniqKey}_${index}`}
                accordionId={accordionId}
                row={row}
                rowIndex={rowIndex}
                gridRowIndex={gridRowIndex}
                columnIndex={index}
                column={column}
                expanded={expanded}
                withAccordion={withAccordion}
                accordionRowIndex={accordionRowIndex}
                rows={rows}
                aria-hidden={isCellHidden}
                style={style}
                data-aria-level={index === 0 ? ariaLevel : undefined}
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
              gridContainerRef={gridContainerRef}
              scrollAreaRef={scrollAreaRef}
            />
          )}
        </SRow>

        {React.isValidElement(accordionComponent) && (
          <SCollapseRow
            key={rowIndex}
            role='row'
            id={accordionId}
            visible={expanded}
            aria-hidden={!expanded}
            interactive
            gridArea={accordionDataGridArea}
            duration={accordionDuration ?? 200}
            sideIndents={sideIndents}
            data-filled-columns={filledColumns}
          >
            <SCell
              aria-colindex={1}
              aria-level={ariaLevel + 1}
              data-aria-level={1}
              aria-setsize={1}
              aria-posinset={1}
              accordionRowIndex={0}
              rowIndex={rowIndex}
              rows={[row]}
              row={row}
              columnIndex={0}
              // @ts-ignore
              column={{ name: ACCORDION }}
              w='100%'
              onKeyDown={this.handleBackFromAccordion}
            >
              {accordionComponent}
            </SCell>
          </SCollapseRow>
        )}

        {Array.isArray(accordionRows) && (
          <AccordionRows
            accordionId={accordionId}
            expanded={expanded}
            expandedForAnimation={expandedForAnimation}
            use={use}
            columns={columns}
            row={row}
            rows={accordionRows}
            flatRows={flatRows}
            rowIndex={rowIndex}
            gridRowIndex={gridRowIndex}
            accordionDuration={accordionDuration}
            accordionAnimationRows={accordionAnimationRows}
            getFixedStyle={getFixedStyle}
            rawData={rawData}
            aria-level={ariaLevel}
            shadowVertical={shadowVertical}
            variant={variant}
            limit={limit}
            renderCell={renderCell}
            sideIndents={sideIndents}
            onCellClick={onCellClick}
          />
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
  Cell: any;
};
