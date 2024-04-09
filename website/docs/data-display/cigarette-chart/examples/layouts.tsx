import React from 'react';
import { Chart } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

class Demo extends React.PureComponent {
  render() {
    return (
      <Flex gap={8}>
        <Chart.Cigarette
          data={data}
          plotWidth={280}
          plotHeight={28}
          header={
            <Text size={700} bold>
              Total
            </Text>
          }
          showLegend={true}
          tooltipTitle='Some title for tooltip'
          showTotalInTooltip={true}
        />

        <Chart.Cigarette
          data={data}
          plotWidth={44}
          plotHeight={200}
          invertAxis={false}
          header={
            <Text size={700} bold>
              Total
            </Text>
          }
          showLegend={true}
          tooltipViewType='single'
        />
      </Flex>
    );
  }
}

const data = {
  a: 3524,
  b: 1344,
  c: 6135,
  d: 1456,
  e: 1823,
};

export default Demo;
