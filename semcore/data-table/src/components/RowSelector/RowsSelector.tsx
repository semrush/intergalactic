import Checkbox from '@semcore/checkbox';
import type { CSSProperties } from 'react';
import React from 'react';

import type { ISelectedRows } from '../../store/SelectableRows';
import { SelectableRows } from '../../store/SelectableRows';
import type { Theme } from '../Body/Cell.types';
import { Row } from '../Body/Row';
import type { DTRow } from '../Body/Row.types';
import { UNIQ_ROW_KEY, SELECT_ALL } from '../DataTable/DataTable';

type RowSelectorProps<UniqKeyType> = {
  row: DTRow<UniqKeyType>;
  rowIndex: number;
  gridRowIndex: number;
  expanded: boolean;
  withAccordion: boolean;

  uid: string;
  theme?: Theme;
  isCellHidden?: boolean;
  isAccordionRow?: boolean;
  selectedRows?: UniqKeyType[] | ISelectedRows<UniqKeyType>;
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow<UniqKeyType>,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;
  fixed?: boolean;
  withoutBorder?: boolean;
};

type State = {
  checked: boolean;
};

export class RowSelector<UniqKeyType> extends React.PureComponent<RowSelectorProps<UniqKeyType>, State> {
  state: State = {
    checked: false,
  };

  private unsubscribeToggle: undefined | (() => void) = undefined;

  constructor(props: RowSelectorProps<UniqKeyType>) {
    super(props);

    const { row, selectedRows } = props;
    if (selectedRows && !Array.isArray(selectedRows)) {
      this.state.checked = selectedRows.has(row[UNIQ_ROW_KEY]);
    }
  }

  componentDidMount(): void {
    const { row, selectedRows } = this.props;
    if (selectedRows && !Array.isArray(selectedRows)) {
      this.unsubscribeToggle = selectedRows.on(SelectableRows.TOGGLE_EVENT, (key: UniqKeyType) => {
        if (row[UNIQ_ROW_KEY] === key) {
          this.setState({ checked: selectedRows.has(row[UNIQ_ROW_KEY]) });
        }
      });
    }
  }

  componentWillUnmount(): void {
    this.unsubscribeToggle?.();
  }

  handleSelectRow = (value: boolean, event?: React.SyntheticEvent<HTMLElement>) => {
    const { row, rowIndex, onSelectRow, selectedRows } = this.props;

    onSelectRow?.(value, rowIndex, row, event);

    if (selectedRows && !Array.isArray(selectedRows)) {
      selectedRows.toggle(value, row);
    }
  };

  handleClickCheckbox = (value: boolean) => (event?: React.SyntheticEvent<HTMLElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    const { row, rowIndex, onSelectRow, selectedRows } = this.props;

    onSelectRow?.(value, rowIndex, row, event);

    if (selectedRows && !Array.isArray(selectedRows)) {
      selectedRows.toggle(value, row);
    }
  };

  render() {
    const SCheckboxCell = Row.Cell;

    const {
      row,
      rowIndex,
      gridRowIndex,
      expanded,
      withAccordion,
      isAccordionRow,
      isCellHidden,
      theme,
      uid,
      selectedRows,
      fixed,
      withoutBorder,
    } = this.props;
    const rowUniqKey = row[UNIQ_ROW_KEY];

    const checked = Array.isArray(selectedRows) ? selectedRows.includes(rowUniqKey) : this.state.checked;
    const style: CSSProperties = {};

    if (fixed) {
      style.left = 0;
    }

    return (
      <SCheckboxCell
        row={row}
        rowIndex={rowIndex}
        column={{ name: SELECT_ALL, fixed }}
        columnIndex={0}
        gridRowIndex={gridRowIndex}
        onClick={this.handleClickCheckbox(!checked)}
        expanded={expanded}
        isAccordionRow={isAccordionRow}
        aria-hidden={isCellHidden}
        withAccordion={withAccordion}
        theme={theme}
        data-row-selector
        fixed={fixed}
        style={style}
        withoutBorder={withoutBorder}
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
}
