import { Flex, Box } from '@semcore/ui/base-components';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

const Demo = () => {
  const value = 30;

  return (
    <Flex gap={6} direction='column' alignItems='start'>

      <MiniChart.ScoreSemiDonut
        value={value}
        w={50}
        color='chart-data-success'
        baseBgColor='chart-data-critical'
        aria-hidden
      />

    </Flex>
  );
};

export default Demo;
