import type { NSMiniChart } from '@semcore/ui/mini-chart';
import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

type ScoreLineProps = Pick<NSMiniChart.Score.Line.Props, 'loading' | 'animate' | 'baseBgColor'> & {
  value1: NSMiniChart.Score.Line.Segment.Props['value'];
  value2: NSMiniChart.Score.Line.Segment.Props['value'];
  color1: NSMiniChart.Score.Line.Segment.Color;
  color2: NSMiniChart.Score.Line.Segment.Color;
};

const Demo = ({
  value1,
  value2,
  loading,
  animate,
  baseBgColor,
  color1,
  color2,
}: ScoreLineProps) => {
  return (
    <>
      <MiniChart.ScoreLine w='100px' animate={animate} loading={loading} baseBgColor={baseBgColor}>
        <MiniChart.ScoreLine.Segment value={value1} color={color1} />
        <MiniChart.ScoreLine.Segment value={value2} color={color2} />
      </MiniChart.ScoreLine>
      <br />
      <MiniChart.ScoreLine w='220px' animate={false}>
        <MiniChart.ScoreLine.Segment value={20} color='chart-palette-order-3' />
        <MiniChart.ScoreLine.Segment value={80} color='chart-palette-order-6' />
        <MiniChart.ScoreLine.Segment value={90} color='chart-palette-order-4' />
        <MiniChart.ScoreLine.Segment value={50} color='chart-palette-order-2' />
      </MiniChart.ScoreLine>
      <br />
    </>
  );
};

export const defaultScoreLineSegmentsProps: ScoreLineProps = {
  value1: 70,
  value2: 30,
  color1: 'chart-palette-order-7',
  color2: 'chart-palette-order-10',
  loading: false,
  animate: true,
};

Demo.defaultProps = defaultScoreLineSegmentsProps;

export type { ScoreLineProps };
export default Demo;
