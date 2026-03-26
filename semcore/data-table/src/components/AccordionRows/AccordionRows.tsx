import { Box } from '@semcore/base-components';
import { sstyled } from '@semcore/core';
import React from 'react';

import type { CellRenderProps } from '../Body/Body.types';
import type { DataTableCellProps } from '../Body/Cell.types';
import { Row } from '../Body/Row';
import type { DTRow, DTRows } from '../Body/Row.types';
import styles from '../Body/style.shadow.css';
import type { DataTableData, DataTableProps, DataRowItem, DTUse } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

type AccordionRowsProps<Data extends DataTableData, UniqKeyType> = {
  accordionId: string;
  expanded: boolean;
  expandedForAnimation: boolean;

  use: DTUse;
  columns: DTColumn[];
  row: DTRow<UniqKeyType> | DTRow<UniqKeyType>[];
  rows: DTRows<UniqKeyType>;
  flatRows: DTRow<UniqKeyType>[];
  rowIndex: number; // from 0
  gridRowIndex: number; // from 1 + 1 (or 2 if it has group) header
  accordionDuration: number | [number, number];
  accordionAnimationRows: number;
  sideIndents: 'wide' | undefined;
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];

  onCellClick: DataTableCellProps<Data, UniqKeyType>['onClick'];
  renderCell: ((props: CellRenderProps<Data[number], UniqKeyType>) => React.ReactNode | Record<string, any>) | undefined;
  rawData: DataRowItem[];
  shadowVertical: '' | 'end' | 'start' | 'median' | undefined;
  variant: DataTableProps<any, any, any>['variant'];
  limit: DataTableProps<any, any, any>['limit'];
} & {
  'aria-level': number;
};

type State = {
  maxHeight: number;
};

export class AccordionRows<Data extends DataTableData, UniqKeyType> extends React.PureComponent<AccordionRowsProps<Data, UniqKeyType>, State> {
  accordionRowsRef = React.createRef<HTMLDivElement>();

  state: State = {
    maxHeight: 0,
  };

  componentDidUpdate(prevProps: Readonly<AccordionRowsProps<Data, UniqKeyType>>): void {
    const { expanded, rows, expandedForAnimation } = this.props;

    if (prevProps.expanded !== expanded && expanded) {
      this.setState({
        maxHeight: 2000, // some value, more than real window height
      });
    }
    if (prevProps.rows !== rows && this.accordionRowsRef.current) {
      this.setState({
        maxHeight: this.accordionRowsRef.current.scrollHeight,
      });
    }
    if (prevProps.expandedForAnimation !== expandedForAnimation && expandedForAnimation && !expanded) {
      this.setState({ maxHeight: 0 });
    }
  }

  render(): React.ReactNode {
    const SAccordionRows = Box;

    const {
      accordionId,
      rows,
      expanded,
      expandedForAnimation,
      getFixedStyle,
      columns,
      rowIndex,
      'aria-level': ariaLevel,
      gridRowIndex,
      use,
      shadowVertical,
      accordionDuration,
      accordionAnimationRows,
      variant,
      flatRows,
      sideIndents,
      renderCell,
      rawData,
      limit,
      onCellClick,
    } = this.props;

    return sstyled(styles)(
      <SAccordionRows
        id={accordionId}
        role='rowgroup'
        aria-hidden={!expanded}
        ref={this.accordionRowsRef}
        hMax={`${this.state.maxHeight}px`}
        // @ts-ignore
        duration={`${accordionDuration}ms`}
        gridRow={`${gridRowIndex + 1} / ${gridRowIndex + 1 + rows.length}`}
      >
        {(expanded || expandedForAnimation) && rows.map((subrow, i) => {
          return (
            <Row
              key={i}
              // @ts-ignore
              row={subrow}
              columns={columns}
              rows={rows}
              rowIndex={rowIndex}
              aria-hidden={!expanded}
              aria-posinset={i + 1}
              aria-level={ariaLevel + 1}
              gridRowIndex={gridRowIndex + 1 + i}
              isAccordionRow={true}
              accordionIndex={i}
              getFixedStyle={getFixedStyle}
              animationExpand={expanded}
              accordionRowIndex={i}
              use={use}
              shadowVertical={shadowVertical}
              accordionDuration={accordionDuration}
              accordionAnimationRows={accordionAnimationRows}
              variant={variant}
              flatRows={flatRows}
              sideIndents={sideIndents}
              renderCell={renderCell}
              rawData={rawData}
              limit={limit}
              onCellClick={onCellClick}
            />
          );
        })}
      </SAccordionRows>,
    );
  }
}
