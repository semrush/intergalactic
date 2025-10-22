import { Box } from '@semcore/base-components';
import { sstyled } from '@semcore/core';
import trottle from '@semcore/core/lib/utils/rafTrottle';
import type { DataTableData, DataTableProps } from '@semcore/ui/data-table';
import React from 'react';

import styles from './style.shadow.css';
import type { CellRenderProps } from '../Body/Body.types';
import { Row } from '../Body/Row';
import type { DTRow, DTRows } from '../Body/Row.types';
import type { DataRowItem, DTUse } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

type AccordionRowsProps<Data extends DataTableData, UniqKeyType> = {
  accordionId: string;
  expanded: boolean;
  expandedForAnimation: boolean;

  tableRef: React.RefObject<HTMLDivElement>;

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

  tableObserver: ResizeObserver;
  tableWidth: number = 0;

  state: State = {
    maxHeight: 0,
  };

  // static getDerivedStateFromProps(props: AccordionRowsProps<any, any>, state: State) {
  //
  //
  // }

  constructor(props: AccordionRowsProps<Data, UniqKeyType>) {
    super(props);

    this.tableObserver = new ResizeObserver(this.handleTableResize);
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.calculateGridSettings();
    }, 500);

    if (this.props.tableRef.current) {
      this.tableWidth = this.props.tableRef.current.getBoundingClientRect().width;
      this.tableObserver.observe(this.props.tableRef.current);
    }
  }

  componentWillUnmount(): void {
    this.tableObserver.disconnect();
  }

  componentDidUpdate(prevProps: Readonly<AccordionRowsProps<Data, UniqKeyType>>): void {
    const { expanded, rows, expandedForAnimation, accordionDuration } = this.props;

    if (prevProps.expanded !== expanded && expanded) {
      this.setState({
        maxHeight: 2000,
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
            />
          );
        })}
      </SAccordionRows>,
    );
  }

  private handleTableResize = trottle(() => {
    this.calculateGridSettings();
  });

  private calculateGridSettings() {
    const { tableRef } = this.props;
    const tableElement = tableRef.current;
    const currentWidth = tableElement?.getBoundingClientRect().width;

    if (currentWidth === this.tableWidth) {
      return;
    }

    this.tableWidth = currentWidth ?? 0;
    const tableStyles = tableElement?.style;
    const header = tableElement?.querySelector('[data-ui-name="DataTable.Head"]');
    const accordionRows = this.accordionRowsRef.current;

    if (tableStyles && header && accordionRows) {
      let gridTemplateAreas = '';

      for (let i = 0; i < tableStyles.length; i++) {
        const key = tableStyles[i];
        if (key.startsWith('--gridTemplateAreas')) {
          gridTemplateAreas = tableStyles.getPropertyValue(key);
          accordionRows.style.setProperty(key, gridTemplateAreas);
        }
      }

      const gridTemplateColumns: string[] = [];
      gridTemplateAreas.split(' ').forEach((templateArea) => {
        const headerCell = header.querySelector(`[role="columnheader"][name="${templateArea}"]`);
        const width = headerCell?.getBoundingClientRect().width;

        if (width === undefined) {
          gridTemplateColumns.push('auto');
        } else {
          gridTemplateColumns.push(`${width}px`);
        }
      });

      accordionRows.style.setProperty('grid-template-columns', gridTemplateColumns.join(' '));
    }
  }
}
