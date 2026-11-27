import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

const formatXAxisValue = (value: unknown) => {
  if (value instanceof Date) {
    const index = data.findIndex((d) => d.date_chart === value);

    return index % 4 === 0 ? 'n/a' : formatDate(value);
  }

  return '';
};

const Demo = () => {
  return (
    <Chart.Bar
      groupKey='date_chart'
      data={data}
      plotHeight={300}
      yTicksCount={4}
      axisXValueFormatter={formatXAxisValue}
      showTooltip={false}
      aria-label='Bar chart'
    />
  );
};

const data = BarMockData.Date;

export default Demo;
