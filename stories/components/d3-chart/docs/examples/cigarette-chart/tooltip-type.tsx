import { Flex } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import CigaretteMockData from '../../../__mocks__/cigarette';

function Demo() {
  return (
    <Flex gap={10} flexWrap={true}>
      <Chart.Cigarette
        data={data}
        plotWidth={400}
        plotHeight={28}
        showPercentValueInTooltip
        aria-label='Cigarette chart'
      />
      <Chart.Cigarette
        data={data}
        plotWidth={400}
        plotHeight={28}
        tooltipViewType='single'
        showPercentValueInTooltip
        aria-label='Cigarette chart'
      />
    </Flex>
  );
}

const data = CigaretteMockData.Default;

export default Demo;
