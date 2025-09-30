import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';
type ScoreLineColor =
  | 'chart-palette-order-2'
  | 'chart-palette-order-3'
  | 'chart-palette-order-4'
  | 'chart-palette-order-5'
  | 'chart-palette-order-6'
  | 'chart-palette-order-7'
  | 'chart-palette-order-8'
  | 'chart-palette-order-9'
  | 'chart-palette-order-10'
  | 'chart-palette-order-11'
  | 'chart-palette-order-12'
  | 'chart-palette-order-13'
  | 'chart-palette-order-14'
  | 'chart-palette-order-15'
  | 'chart-palette-order-16';

type scoreLineProps = { value1: number; value2: number; loading?: boolean; color1?: ScoreLineColor; color2?: ScoreLineColor; animate?: boolean; baseBgColor?: ScoreLineColor };

const Demo = ({
  value1 = 70,
  value2 = 30,
  loading,
  animate,
  baseBgColor,
  color1 = 'chart-palette-order-7',
  color2 = 'chart-palette-order-10',

}: scoreLineProps) => {
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
export type { scoreLineProps };
export default Demo;
