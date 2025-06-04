import React from 'react';
import { Chart, Plot, YAxis, XAxis, Bar } from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => {


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

  const yScale1 = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-5, 5]);

  return (
    <Flex direction='column'>
      <Flex >
        <Flex direction='column'>
          <Text>With color</Text>
          <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            <Bar x='time' y='stack1' duration={0} color='red' />
          </Plot>
        </Flex>

        <Flex direction='column'>
          <Text>With radius</Text>
          <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            <Bar x='time' y='stack1' duration={0} r={15} />
          </Plot>
        </Flex>

        <Flex direction='column'>
          <Text>With hMin</Text>
          <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            <Bar x='time' y='stack1' duration={0} hMin={200} />
          </Plot>
        </Flex>
      </Flex>

      <Flex>
        <Flex>
          <Flex direction='column'>
            <Text>With hide='true'</Text>
            <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
              <YAxis>
                <YAxis.Ticks />
                <YAxis.Grid />
              </YAxis>
              <XAxis>
                <XAxis.Ticks />
              </XAxis>
              <Bar x='time' y='stack1' duration={0} hide={true} />
            </Plot>
          </Flex>
        </Flex>


        <Flex direction='column'>
          <Text>With transparent='true'</Text>
          <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            <Bar x='time' y='stack1' duration={0} transparent={true} />
          </Plot>
        </Flex>
        <Flex direction='column'>
          <Text>Without data</Text>
          <Plot data={data1} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            <Bar x='time' y='stack1' duration={0} />
          </Plot>
        </Flex>

      </Flex>

      <Flex>
        <Flex direction='column'>
          <Text>maxBarSize={6}</Text>
          <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            <Bar x='time' y='stack1' duration={0} maxBarSize={6} />
          </Plot>
        </Flex>
        <Flex direction='column'>
          <Text>Bars with a height close to zero</Text>
          <Plot data={data2} scale={[xScale, yScale1]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            <Bar x='time' y='stack1' duration={0} />
          </Plot>
        </Flex>
      </Flex>
    </Flex>


  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar: Math.random() * 10,
  }));

const data2 = [
  { time: 0, stack1: 0 },
  { time: 1, stack1: 0.05 },
  { time: 2, stack1: 0.5 },
  { time: 3, stack1: 1 },
  { time: 4, stack1: -4 },
  { time: 5, stack1: -0.05 },
  { time: 6, stack1: -0 },
  { time: 7, stack1: -0.5 },
];

const data1 = [
  { time: 0, stack1: 0 },
  { time: 1, stack1: null },
  { time: 2, stack1: 10 },
  { time: 3, stack1: null },
  { time: 4, stack1: -0 },
];


export default Demo;
