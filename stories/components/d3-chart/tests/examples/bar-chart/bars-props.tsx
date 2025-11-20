import { Plot, YAxis, XAxis, Bar } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

interface BarsPropsStoryProps {
  barColor?: string;
  barRadius?: number;
  barHMin?: number;
  barHide?: boolean;
  barTransparent?: boolean;
  maxBarSize?: number;
  duration?: number;
}

const Demo = (props: BarsPropsStoryProps = {}) => {
  const {
    barColor,
    barRadius,
    barHMin,
    barHide = false,
    barTransparent = false,
    maxBarSize,
    duration = 0,
  } = props;

  const MARGIN = 40;
  const width = 400;
  const height = 200;

  const data = [
    { time: 0, stack1: 1, stack2: 4, stack3: 3 },
    { time: 1, stack1: 2, stack2: 3, stack3: 4 },
    { time: 2, stack1: 1, stack2: 4, stack3: 5 },
    { time: 3, stack1: 3, stack2: 2, stack3: 6 },
    { time: 4, stack1: 2, stack2: 4, stack3: 4 },
    { time: 5, stack1: 3, stack2: 4, stack3: 3 },
    { time: 6, stack1: 4, stack2: 1, stack3: 5 },
    { time: 7, stack1: 2, stack2: 5, stack3: 3 },
    { time: 8, stack1: 2, stack2: 6, stack3: 5 },
    { time: 9, stack1: 5, stack2: 5, stack3: 3 },
  ];

  const xScale = scaleBand<number>()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.time))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Bar
        x='time'
        y='stack1'
        duration={duration}
        color={barColor}
        r={barRadius}
        hMin={barHMin}
        hide={barHide}
        transparent={barTransparent}
        maxBarSize={maxBarSize}
      />
    </Plot>
  );
};

export const defaultProps: BarsPropsStoryProps = {
  duration: 0,
};

Demo.defaultProps = defaultProps;

export default Demo;
