import { Box } from '@semcore/ui/base-components';
import type { NSMiniChart } from '@semcore/ui/mini-chart';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

type ScoreLinesProps = NSMiniChart.Score.Line.Props;

type DemoComponent = ((props: ScoreLinesProps) => React.ReactElement) & {
  defaultProps: ScoreLinesProps;
};

const Demo: DemoComponent = (props: ScoreLinesProps) => {
  return (
    <Box w='700px'>
      <MiniChart.ScoreLine {...props} w='250px' aria-hidden />
    </Box>
  );
};

export const defaultScoreLinesProps: ScoreLinesProps = {
  value: 4,
  loading: false,
  animate: true,
};

Demo.defaultProps = defaultScoreLinesProps;

export type { ScoreLinesProps };
export default Demo;
