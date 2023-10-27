import React from 'react';
import { ChartLegend, LegendTableProps } from '@semcore/d3-chart';
import { Text } from '@semcore/typography';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
  Line4: Math.random() * 10,
  Line5: Math.random() * 10,
}));

export default () => {
  const lines = Object.keys(data[0])
    .filter((key) => key !== 'x')
    .reduce<LegendTableProps['items']>((res, item, index) => {
      res.push({
        id: item,
        label: `Item ${index + 1}`,
        checked: true,
        color: `--intergalactic-chart-palette-order-${index + 1}`,
        columns: [
          <Text use={'secondary'}>{(42 * (index + 3)) / 10}%</Text>,
          <Text use={'primary'}>{42 * (index + 3)}</Text>,
        ],
      });

      return res;
    }, []);

  return (
    <div style={{ width: '300px' }}>
      <ChartLegend.Table items={lines} />
    </div>
  );
};
