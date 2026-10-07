import { Box } from '@semcore/ui/base-components';
import { ChartLegendTable } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type LegendTableStoryProps = {
  size?: 'm' | 'l';
  /** Width of the legend, 185px in the design. */
  w?: number;
  /** Index of the highlighted row, every other row is dimmed. `-1` highlights nothing. */
  highlightedItem?: number;
  /** How many value columns to render: 1 renders the value, 2 adds the percent before it. */
  columnsCount?: 1 | 2;
};

/**
 * Data from the design: five palette colours plus the muted "Other data" row.
 * Percentages are derived from the values, so they stay consistent if the data changes
 * (6.3 + 8.6 + 27.5 + 11.1 + 2.4 + 22.8 = 78.7K, which yields 8/11/35/14/3/29%).
 */
const rows = [
  { id: 'item-1', label: 'Label', color: 'chart-palette-order-1', value: 6300 },
  { id: 'item-2', label: 'Label', color: 'chart-palette-order-2', value: 8600 },
  { id: 'item-3', label: 'Label', color: 'chart-palette-order-3', value: 27500 },
  { id: 'item-4', label: 'Label', color: 'chart-palette-order-4', value: 11100 },
  { id: 'item-5', label: 'Label', color: 'chart-palette-order-5', value: 2400 },
  { id: 'other-data', label: 'Other data', color: 'chart-palette-order-other-data', value: 22800 },
];

const total = rows.reduce((sum, row) => sum + row.value, 0);

const formatValue = (value: number) => `${(value / 1000).toFixed(1)}K`;
const formatPercent = (value: number) => `${Math.round((value / total) * 100)}%`;

const Demo = (props: LegendTableStoryProps) => {
  const { size = 'm', w = 185, highlightedItem = -1, columnsCount = 2 } = props;
  const [checked, setChecked] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(rows.map((row) => [row.id, true])),
  );

  const onChangeVisibleItem = (id: string, isVisible: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: isVisible }));
  };

  const items = rows.map((row) => ({
    id: row.id,
    label: row.label,
    color: row.color,
    checked: checked[row.id],
    columns: columnsCount === 1
      ? [<Text use='primary' key='value'>{formatValue(row.value)}</Text>]
      : [
          <Text use='secondary' key='percent'>{formatPercent(row.value)}</Text>,
          <Text use='primary' key='value'>{formatValue(row.value)}</Text>,
        ],
  }));

  return (
    <Box w={w}>
      <ChartLegendTable
        items={items}
        size={size}
        onChangeVisibleItem={onChangeVisibleItem}
        aria-label='Chart legend'
        // @ts-ignore internal prop, exposed here to inspect the dimmed state
        highlightedItem={highlightedItem}
      />
    </Box>
  );
};

export const defaultProps: LegendTableStoryProps = {
  size: 'm',
  w: 185,
  highlightedItem: -1,
  columnsCount: 2,
};

Demo.defaultProps = defaultProps;

export default Demo;
