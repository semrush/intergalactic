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
}

const Demo = (props: HorizontalBarPropsStoryProps = {}) => {
  const {
    barColor,
    barRadius,
    barTransparent = false,
    maxBarSize,
    duration = 0,
    primaryText = true,
  } = props;

  const MARGIN = 40;
  const width = 400;
  const height = 200;

  const data = [
    { category: 'Alpha', value: 10 },
    { category: 'Beta', value: 5 },
    { category: 'Gamma', value: 8 },
    { category: 'Delta', value: 3 },
    { category: 'Epsilon', value: 12 },
  ];

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([0, 15]);

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
};

Demo.defaultProps = defaultProps;

export default Demo;
