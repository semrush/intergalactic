import { Flex, Box } from '@semcore/ui/flex-box';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';
type scoreLinesProps = { value: number; loading?: boolean; color?: string; baseBgColor?: string; animate?: boolean; segments?: boolean };

const Demo = ({
  value = 4,
  loading,
  segments,
  color,
  baseBgColor,
  animate,
}: scoreLinesProps) => {
  return (
    <Box w='700px'>
      <MiniChart.ScoreLine value={value} w='250px' segments={segments} loading={loading} animate={animate} color={color} baseBgColor={baseBgColor} />
    </Box>
  );
};
export type { scoreLinesProps };
export default Demo;
