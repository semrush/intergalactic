import React from 'react';
import { createComponent, sstyled, Root, IRootComponentProps } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { LegendTableType, LegendTableProps, LegendColumnProps } from './LegendTable.type';
import style from './legend-table.shadow.css';
import { LegendItemComponent } from '../LegendItem/LegendItem';
import { BaseLegend } from '../BaseLegend';

class LegendTableRoot extends BaseLegend<LegendTableProps> {
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
      <SLegendTable render={Box} columns-count={columnsCount + 1} role={'group'}>
        {items.map(({ id, columns = [] }, index) => {
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

export const LegendTable: LegendTableType = createComponent(LegendTableRoot, {
  LegendItem: LegendItemComponent,
  Column: ColumnComponent,
});
