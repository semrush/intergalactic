import DiffDown from '@semcore/icon/DiffDown/m';
import DiffUp from '@semcore/icon/DiffUp/m';
import { Chart, Metric, type LegendItem } from '@semcore/ui/d3-chart';
import React from 'react';

import LineChartMockData from '../../../__mocks__/line';

const data = LineChartMockData.ThreeLines;
const legendItems = Object.keys(data[0])
  .filter((key) => key !== 'x')
  .reduce<Record<string, LegendItem & { rows: React.ReactNode[] }>>((acc, item, index) => {
    acc[item] = {
      id: item,
      label: `Item ${index + 1}`,
      checked: true,
      color: `chart-palette-order-${index + 1}`,
      rows: [
        <Metric
          key={1}
          value={`${(42 * (index + 3)) / 10}%`}
          diffValue='12'
          href={index === 1 ? '/some-report' : undefined}
          diffIcon={index === 2 ? DiffDown : index === 1 ? DiffUp : undefined}
          diffUse={index === 1 ? 'good' : index === 2 ? 'bad' : 'neutral'}
        />,
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
    />
  );
};

export default Demo;
