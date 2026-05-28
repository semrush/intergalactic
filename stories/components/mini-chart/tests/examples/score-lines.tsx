import { Box } from '@semcore/ui/base-components';
import MiniChart, { type SegmentColor } from '@semcore/ui/mini-chart';
import React from 'react';
type scoreLinesProps = { value: number; loading?: boolean; color?: SegmentColor; baseBgColor?: string; animate?: boolean; segments?: number };

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
