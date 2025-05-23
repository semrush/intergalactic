import React from 'react';
import { Chart } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';

function Demo() {
  return (
    <Flex gap={10} flexWrap={true}>
      <Chart.Cigarette data={data} plotWidth={400} plotHeight={28} aria-label={'Cigarette chart'} />
      <Chart.Cigarette
        data={data}
        plotWidth={400}
        plotHeight={28}
        tooltipViewType='single'
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
