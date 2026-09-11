import { Box } from '@semcore/base-components';
import { sstyled } from '@semcore/core';
import React from 'react';

import { Row } from '../Body/Row';
import type { DataTableRowProps } from '../Body/Row.types';
import styles from '../Body/style.shadow.css';
import type { DataTableData } from '../DataTable/DataTable.types';

type AccordionRowsProps<Data extends DataTableData, UniqKeyType> = DataTableRowProps<Data, UniqKeyType> & {
  accordionId: string;
  expanded: boolean;
  expandedForAnimation: boolean;
  accordionDuration: number | [number, number];
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
      'aria-level': ariaLevel,
      gridRowIndex,
      accordionDuration,
      ...rowProps
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
          if (Array.isArray(subrow)) {
            return null;
          }

          return (
            <Row<Data, UniqKeyType>
              key={i}
              rows={rows}
              aria-hidden={!expanded}
              aria-posinset={i + 1}
              aria-level={ariaLevel + 1}
              gridRowIndex={gridRowIndex + 1 + i}
              isAccordionRow={true}
              accordionIndex={i}
              accordionRowIndex={i}
              accordionDuration={accordionDuration}
              {...rowProps}
              row={subrow}
            />
          );
        })}
      </SAccordionRows>,
    );
  }
}
