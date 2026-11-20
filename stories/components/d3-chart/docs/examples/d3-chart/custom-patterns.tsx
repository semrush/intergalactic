import type { Pattern } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import AreaMockData from '../../../__mocks__/area';

const treePath =
  'M10.2 0L11.1.5L17.1 9L17.2 9.6L16.8 10.1L15.1 10.3L19.3 15.8L19.5 16.4L18.9 17.1L16.4 17.2L20.6 22.7L20.6 23.5L20.1 23.9L.9 24L.1 23.5L.2 22.7L4.2 17.2L1.7 17.1L1.1 16.4L1.4 15.7L5.6 10.3L3.8 10.2L3.5 9.7L3.5 9.2L9.5.5Z';

const tree = () => <path d={treePath} />;

const customPattern: Pattern = {
  fill: {
    viewBox: '-16 -14 52 52',
    children: tree(),
  },
  symbol: {
    viewBox: '0 0 20.6 24',
    size: [14, 16],
    children: tree(),
  },
};

const Demo = () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey='x'
      xTicksCount={data.length / 2}
      patterns={customPattern}
      showDots
      showTooltip
      aria-label='Area chart'
    />
  );
};

const data = AreaMockData.CustomPattern;

export default Demo;
