import { Box } from '@semcore/base-components';
import { createComponent, sstyled, Root, type IRootComponentProps } from '@semcore/core';
import React from 'react';

import style from './legend-table.shadow.css';
import type { LegendTableType, LegendTableProps, LegendColumnProps, LegendTableDefaultProps } from './LegendTable.type';
import { BaseLegend } from '../BaseLegend';
import { LegendItemComponent } from '../LegendItem/LegendItem';

class LegendTableRoot extends BaseLegend<LegendTableProps, [], LegendTableDefaultProps> {
  static displayName = 'LegendTable';
  static style = style;

  static defaultProps = () => ({
    children: <LegendTable.LegendItem />,
  });

  render() {
    const SLegendTable = Root;
    const { styles, Children, size = 'm', items } = this.asProps;
    const columnsCount = items[0]?.columns.length;

    return sstyled(styles)(
      <SLegendTable render={Box} columns-count={columnsCount + 1} role='group'>
        {items.map(({ id, columns = [] }, _index) => {
          return (
            <React.Fragment key={id}>
              <Children />
              {columns.map((item, index) => {
                return (
                  <React.Fragment key={`${id}__${index}`}>
                    <LegendTable.Column index={index} size={size} styles={styles}>
                      {item}
                    </LegendTable.Column>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </SLegendTable>,
    );
  }
}

function ColumnComponent(props: LegendColumnProps & IRootComponentProps) {
  const SColumnItem = Root;
  const { styles, index, size, Children } = props;

  return sstyled(styles)(
    <SColumnItem
      style={{ gridColumnStart: `${index + 2}`, gridColumnEnd: `${index + 3}` }}
      render={Box}
      size={size}
    >
      <Children />
    </SColumnItem>,
  );
}

export const LegendTable = createComponent<
  LegendTableType,
  typeof LegendTableRoot
>(LegendTableRoot, {
  LegendItem: LegendItemComponent,
  Column: ColumnComponent,
});
