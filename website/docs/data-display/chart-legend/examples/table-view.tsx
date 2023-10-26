import React from 'react';
import { ChartLegend, LegendTableProps } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';
import { Text } from '@semcore/typography';

const lineColors = {
  Line1: resolveColor('blue-300'),
  Line2: resolveColor('green-200'),
  Line3: resolveColor('orange-400'),
  Line4: resolveColor('pink-300'),
  Line5: resolveColor('yellow-200'),
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
  Line4: Math.random() * 10,
  Line5: Math.random() * 10,
}));

export default () => {
  const lines = Object.keys(data[0]).reduce<LegendTableProps['items']>((res, item, index) => {
    if (item === 'x') {
      return res;
    }

    res.push({
      id: item,
      label: `Item ${index + 1}`,
      checked: true,
      color: lineColors[item],
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
