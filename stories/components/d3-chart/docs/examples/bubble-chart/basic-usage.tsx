import { Box } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import BubbleMockData from '../../../__mocks__/bubble';

const Demo = () => {
  return <Chart.Bubble data={data} plotWidth={500} plotHeight={200} aria-label='Bubble chart' />;
};

const data = BubbleMockData.Label;

export default Demo;
