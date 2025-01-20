import React from 'react';
import { Chart } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

function Demo() {
  return (
    <Flex gap={15} flexWrap={true}>
      <Chart.Cigarette
        data={data}
        plotWidth={280}
        plotHeight={28}
        header={
          <Text size={500} bold mb={2}>
            Total value
          </Text>
        }
        showLegend={true}
        tooltipTitle='Some title for tooltip'
        showTotalInTooltip={true}
        aria-label={'Cigarette chart'}
      />

      <Chart.Cigarette
        data={data}
        plotWidth={44}
        plotHeight={200}
        invertAxis={false}
        header={
          <Text size={500} bold>
            Total value
          </Text>
        }
        showLegend={true}
        aria-label={'Cigarette chart'}
      />
    </Flex>
  );
}

const data = {
  Cats: 3524,
  Dogs: 1344,
  Capybaras: 6135,
  Hamsters: 1456,
  Birds: 1823,
};

export default Demo;
