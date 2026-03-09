import MiniChart from '@semcore/ui/mini-chart';
import React from 'react';

import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

const MiniCharts = [
  'scoreLine',
  'scoreSegmentLine',
  'scoreDonut',
  'scoreSemiDonut',
  'trendArea',
  'trendLine',
  'trendBar',
  'trendHistogram',
] as const;

type MiniChartProps = {
  type: typeof MiniCharts[number];
};

const TypeToMiniChartComponent: { [key in MiniChartProps['type']]: React.JSX.Element } = {
  scoreLine: (
    <MiniChart.ScoreLine
      value={30}
      w='100px'
    />
  ),
  scoreSegmentLine: (
    <MiniChart.ScoreLine
      segments={5}
      value={3}
      w='100px'
    />
  ),
  scoreDonut: (
    <MiniChart.ScoreDonut
      value={30}
      w='40px'
    />
  ),
  scoreSemiDonut: (
    <MiniChart.ScoreSemiDonut
      value={30}
      w='40px'
    />
  ),
  trendArea: (
    <MiniChart.TrendArea
      w='220px'
      h='50px'
      data={[20, 50, 80, 65, 33, 12, 15, 18]}
    />
  ),
  trendLine: (
    <MiniChart.TrendLine
      data={[20, 50, 33, 80, 70, 35, 10, 40, 90, 50]}
      w='140px'
      h='40px'
    />
  ),
  trendBar: (
    <MiniChart.TrendBar
      data={[
        { value: 10 },
        { value: 20 },
        { value: 50 },
        { value: 80, color: 'chart-palette-order-1' },
        { value: 45 },
        { value: 66 },
      ]}
      w='140px'
      h='40px'
    />
  ),
  trendHistogram: (
    <MiniChart.TrendHistogram
      data={[
        { value: 10 },
        { value: 20 },
        { value: 50 },
        { value: 80, color: 'chart-palette-order-3' },
        { value: 45 },
        { value: 66, color: 'chart-palette-order-6' },
      ]}
      w='140px'
      h='40px'
    />
  ),
};

export type MiniChartJSXProps = JSXProps<MiniChartProps>;

function getJSX(props: MiniChartJSXProps) {
  return TypeToMiniChartComponent[props.type];
}

const entry: PlaygroundEntry<MiniChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    type: {
      type: 'select',
      value: 'scoreLine',
      options: [...MiniCharts],
      displayName: 'Type',
    },
  },
  link: createGithubLink('mini-chart'),
  filterProps: ['data', 'value', 'w', 'h'],
};

export default entry;
