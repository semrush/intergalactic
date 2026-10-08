import DiffDown from '@semcore/icon/DiffDown/m';
import DiffUp from '@semcore/icon/DiffUp/m';
import { Chart, Metric, type LegendDataMap } from '@semcore/ui/d3-chart';
import React from 'react';

import LineChartMockData from '../../../__mocks__/line';

const metricData = [
  {
    value: '15%',
    diffValue: '1%',
    diffUse: 'good',
    diffIcon: DiffUp,
    href: '/some-report',
  },
  {
    value: '3.5K',
    diffValue: '0.5',
    diffUse: 'bad',
    diffIcon: DiffDown,
  },
  {
    value: '12.3',
    diffValue: 'no change',
    diffUse: 'neutral',
    href: '/some-report',
  },
];

const data = LineChartMockData.ThreeLines;
const legendItems = Object.keys(data[0])
  .filter((key) => key !== 'x')
  .reduce<LegendDataMap<'Table'>>((acc, item, index) => {
    acc[item] = {
      label: `Item ${index + 1}`,
      rows: [
        <Metric
          key={1}
          value={metricData[index].value}
          diffValue={metricData[index].diffValue}
          href={metricData[index].href}
          diffIcon={metricData[index].diffIcon}
          diffUse={metricData[index].diffUse}
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
