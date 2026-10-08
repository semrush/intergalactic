import { Chart, type LegendDataMap } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import LineChartMockData from '../../../__mocks__/line';
const data = LineChartMockData.ThreeLines;
const legendItems = Object.keys(data[0])
  .filter((key) => key !== 'x')
  .reduce<LegendDataMap<'Table'>>((acc, item, index) => {
    acc[item] = {
      label: `Item ${index + 1}`,
      columns: [
        <Text use='secondary' key={1}>
          {(42 * (index + 3)) / 10}
          %
        </Text>,
        <Text use='primary' key={2}>{42 * (index + 3)}</Text>,
      ],
    };

    return acc;
  }, {});

const Demo = () => {
  return (
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey='x'
      xTicksCount={data.length / 2}
      aria-label='Line chart'
      showLegend={true}
      legendProps={{
        legendType: 'Table',
        legendMap: legendItems,
      }}
      direction='row'
    />
  );
};

export default Demo;
