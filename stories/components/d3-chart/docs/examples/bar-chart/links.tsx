import { Chart } from '@semcore/ui/d3-chart';
import Link from '@semcore/ui/link';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const links: Record<string, string> = {
  'Category 1': 'https://www.semrush.com',
  'Category 2': '#legend-and-pattern-fill',
  'Category 3': '/intergalactic/data-display/area-chart/area-chart',
};

const Demo = () => {
  return (
    <Chart.Bar
      groupKey='category'
      data={data}
      plotWidth={500}
      plotHeight={300}
      aria-label='Bar chart'
      axisXValueFormatter={(value) => {
        if (typeof value === 'string') {
          const href = links[value];
          return href ? <Link position='static' href={href}>{value}</Link> : value;
        }
      }}
    />
  );
};

const data = BarMockData.Default;

export default Demo;
