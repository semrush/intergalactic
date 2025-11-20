import { Flex } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import CigaretteMockData from '../../../__mocks__/cigarette';

function Demo() {
  return (
    <Flex gap={15} flexWrap={true}>
      <Chart.Cigarette
        data={data}
        plotWidth={280}
        plotHeight={28}
        header={(
          <Text size={500} bold mb={2}>
            Total value
          </Text>
        )}
        showLegend={true}
        tooltipTitle='Some title for tooltip'
        showTotalInTooltip={true}
        aria-label='Cigarette chart'
      />

      <Chart.Cigarette
        data={data}
        plotWidth={44}
        plotHeight={200}
        invertAxis={false}
        header={(
          <Text size={500} bold>
            Total value
          </Text>
        )}
        showLegend={true}
        aria-label='Cigarette chart'
      />
    </Flex>
  );
}

const data = CigaretteMockData.Default;

export default Demo;
