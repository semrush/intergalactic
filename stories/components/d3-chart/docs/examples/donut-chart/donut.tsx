import { Chart } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import DonutMockData from '../../../__mocks__/donut';

const pieNames: Record<string, string> = {
  a: 'Pie 1',
  b: 'Pie 2',
  c: 'Pie 3',
};

const formatTooltipTitle = (dataKey: any) => pieNames[dataKey] ?? dataKey;

const Demo = () => {
  return (
    <Chart.Donut
      data={data}
      plotWidth={300}
      plotHeight={300}
      showLegend={false}
      showTooltip
      tooltipTitleFormatter={formatTooltipTitle}
      innerLabel={(
        <Text tag='tspan' fill='text-primary' size={400}>
          Example
        </Text>
      )}
      aria-label='Donut chart'
    />
  );
};

const data = DonutMockData.Default;

export default Demo;
