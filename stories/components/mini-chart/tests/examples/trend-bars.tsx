import { Flex } from '@semcore/ui/base-components';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

type trendBarsProps = { loading?: boolean; animate?: boolean };
const Demo = ({
  loading,
  animate,
}: trendBarsProps) => {
  return (
    <Flex id='mylabel' direction='column'>
      <Flex id='mylabel'>
        <MiniChart.TrendBar
          data={[
            { value: 0.5 },
            { value: 20 },
            { value: 5 },
            { value: 80, color: 'chart-palette-order-1' },
            { value: 45 },
            { value: 66, color: 'chart-palette-order-5' },
            { value: 0, color: 'chart-palette-order-12' }]}
          aria-hidden
          loading={loading}
          animate={animate}
        />
      </Flex>
      <Flex id='mylabel'>
        <MiniChart.TrendHistogram
          data={[
            { value: 0 },
            { value: 21.5 },
            { value: 50 },
            { value: 80, color: 'chart-palette-order-1' },
            { value: 45 },
            { value: 66, color: 'chart-palette-order-5' }]}
          aria-label='mylabel1'
          loading={loading}
          animate={animate}
        />
      </Flex>
    </Flex>
  );
};
export type { trendBarsProps };

export default Demo;
