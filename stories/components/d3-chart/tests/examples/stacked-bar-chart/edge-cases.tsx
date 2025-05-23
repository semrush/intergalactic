import React from 'react';
import { Plot, YAxis, XAxis, StackBar } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';

const MARGIN = 40;
const width = 500;
const height = 300;

const Demo = () => {
  const data1 = [
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

  const data2 = [
    { time: 0, stack1: 0.01, stack2: 4, stack3: 3 },
    { time: 1, stack1: 2, stack2: 0.01, stack3: 4 },
    { time: 2, stack1: 1, stack2: 4, stack3: 0.01 },
    { time: 3, stack1: -3, stack2: -2, stack3: -0.02 },
    { time: 4, stack1: 0, stack2: 0.03, stack3: 0.01 },
    { time: 5, stack1: -0.01, stack2: -0.02, stack3: -0.03 },
    { time: 6, stack1: 3, stack2: 1, stack3: 4 },
    { time: 7, stack1: 0, stack2: 0, stack3: 0 },
    { time: 8, stack1: 0.03, stack2: 0.03, stack3: 0.03 },
    { time: 9, stack1: -3, stack2: -0.01, stack3: -4 },
  ];

  const data3 = [
    { time: 0, stack1: 1, stack2: 4, stack3: 3 },
    { time: 1, stack1: 2, stack2: 0, stack3: 4 },
    { time: 2, stack1: 1, stack2: 4, stack3: 0 },
    { time: 3, stack1: 3, stack2: 2, stack3: 6 },
    { time: 4, stack1: 0, stack2: 0, stack3: 4 },
    { time: 5, stack1: 3, stack2: 4, stack3: 3 },
    { time: 6, stack1: 4, stack2: 1, stack3: 5 },
    { time: 7, stack1: 0, stack2: 0, stack3: 0 },
    { time: 8, stack1: 2, stack2: 6, stack3: 5 },
    { time: 9, stack1: 5, stack2: 0, stack3: 3 },
  ];

  const buildScales = (data: any, yDomain = [0, 15]) => {
    const xScale = scaleBand()
      .range([MARGIN, width - MARGIN])
      .domain(data.map((d: any) => d.time))
      .paddingInner(0.4)
      .paddingOuter(0.2);

    const yScale = scaleLinear()
      .range([height - MARGIN, MARGIN])
      .domain(yDomain);

    return [xScale, yScale];
  };

  return (
    <>
      {/* Первый чарт — default hMin */}
      <Plot data={data1} scale={buildScales(data1)} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackBar x="time">
          <StackBar.Bar y="stack1" color='green' duration={0} />
          <StackBar.Bar y="stack2" color='blue' duration={0} />
          <StackBar.Bar y="stack3" color='yellow' duration={0} />
        </StackBar>
      </Plot>

      {/* Второй чарт — custom hMin */}
      <Plot data={data3} scale={buildScales(data3)} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackBar x="time">
          <StackBar.Bar y="stack1" duration={0} />
          <StackBar.Bar y="stack2" color='yellow' duration={0} />
          <StackBar.Bar y="stack3" color='blue' duration={0} hMin={5} />
        </StackBar>
      </Plot>

   
      <Plot data={data2} scale={buildScales(data2, [-4, 4])} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackBar x="time">
          <StackBar.Bar y="stack1" color='red' duration={0} />
          <StackBar.Bar y="stack2" color='blue'  duration={0} />
          <StackBar.Bar y="stack3" color='yellow'  duration={0} />
        </StackBar>
      </Plot>
    </>
  );
};

export default Demo;
