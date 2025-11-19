import { Plot, YAxis, XAxis, StackBar } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

interface StackBarPropsStoryProps {
  barColor1?: string;
  barColor2?: string;
  barColor3?: string;
  barRadius?: number;
  barHMin?: number;
  barTransparent?: boolean;
  maxBarSize?: number;
  duration?: number;
}

const Demo = (props: StackBarPropsStoryProps = {}) => {
  const {
    barColor1,
    barColor2,
    barColor3,
    barRadius,
    barHMin,
    barTransparent = false,
    maxBarSize,
    duration = 0,
  } = props;

  const MARGIN = 40;
  const width = 500;
  const height = 300;

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

  const xScale = scaleBand()
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
      <StackBar x='time' maxBarSize={maxBarSize}>
        <StackBar.Bar
          y='stack1'
          color={barColor1}
          duration={duration}
          r={barRadius}
          hMin={barHMin}
          transparent={barTransparent}
        />
        <StackBar.Bar
          y='stack2'
          color={barColor2}
          duration={duration}
          r={barRadius}
          hMin={barHMin}
          transparent={barTransparent}
        />
        <StackBar.Bar
          y='stack3'
          color={barColor3}
          duration={duration}
          r={barRadius}
          hMin={barHMin}
          transparent={barTransparent}
        />
      </StackBar>
    </Plot>
  );
};

export const defaultProps: StackBarPropsStoryProps = {
  duration: 0,
};

Demo.defaultProps = defaultProps;

export default Demo;
