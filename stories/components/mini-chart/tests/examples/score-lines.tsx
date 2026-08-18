import { Box } from '@semcore/ui/base-components';
import type { NSMiniChart } from '@semcore/ui/mini-chart';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

type ScoreLinesProps = NSMiniChart.Score.Line.Props;

const Demo = ({
  value = 4,
  loading,
  segments,
  color,
  baseBgColor,
  animate,
}: ScoreLinesProps) => {
  return (
    <Box w='700px'>
      <MiniChart.ScoreLine value={value} w='250px' segments={segments} loading={loading} animate={animate} color={color} baseBgColor={baseBgColor} />
    </Box>
  );
};
export type { ScoreLinesProps };
export default Demo;
