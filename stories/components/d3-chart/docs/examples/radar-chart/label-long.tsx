import { Flex } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadarMockData from '../../../__mocks__/radar';

const Demo = () => {
  const scale = scaleLinear().domain([0, 10]);

  return (
    <Flex>
      <Chart.Radar
        data={data}
        groupKey='categories'
        plotWidth={250}
        plotHeight={250}
        scale={scale}
        showDots
        showTooltip={false}
        aria-label='Radar chart'
      />
    </Flex>
  );
};

const data = RadarMockData.LongLabel;

export default Demo;
