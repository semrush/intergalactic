import { Plot, YAxis, XAxis, HorizontalBar } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

interface HorizontalBarPropsStoryProps {
  barColor?: string;
  barRadius?: number | number[];
  barTransparent?: boolean;
  maxBarSize?: number;
  duration?: number;
  primaryText?: boolean;
  dataSet?: DataSet;
}

type DataSet = 'positive' | 'edge';

const dataSets: Record<DataSet, Array<{ category: string; value: number | null }>> = {
  positive: [
    { category: 'Alpha', value: 10 },
    { category: 'Beta', value: 5 },
    { category: 'Gamma', value: 8 },
    { category: 'Delta', value: 3 },
    { category: 'Epsilon', value: 12 },
  ],
  // Tiny, zero, empty and negative values next to regular ones.
  edge: [
    { category: 'Alpha', value: -0.05 },
    { category: 'Beta', value: 0 },
    { category: 'Gamma', value: 5 },
    { category: 'Delta', value: 0.05 },
    { category: 'Epsilon', value: null },
    { category: 'Zeta', value: -5 },
  ],
};

const Demo = (props: HorizontalBarPropsStoryProps = {}) => {
  const {
    barColor,
    barRadius,
    barTransparent = false,
    maxBarSize,
    duration = 0,
    primaryText = true,
    dataSet = 'positive',
  } = props;

  const MARGIN = 40;
  const width = 400;
  const height = 200;

  const data = dataSets[dataSet];

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(dataSet === 'edge' ? [-7, 7] : [0, 15]);

  const yScale = scaleBand<string>()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks primaryText={primaryText} />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Grid />
      </XAxis>
      {dataSet === 'edge' && <YAxis position={0} />}
      <HorizontalBar
        x='value'
        y='category'
        duration={duration}
        color={barColor}
        r={barRadius}
        transparent={barTransparent}
        maxBarSize={maxBarSize}
      />
    </Plot>
  );
};

export const defaultProps: HorizontalBarPropsStoryProps = {
  duration: 0,
  primaryText: true,
  dataSet: 'positive',
};

Demo.defaultProps = defaultProps;

export default Demo;
