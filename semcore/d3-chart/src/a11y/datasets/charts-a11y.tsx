import React from 'react';
import {
  Line,
  XAxis,
  Plot,
  YAxis,
  minMax,
  Tooltip,
  Bubble,
  Donut,
  colors,
  Bar,
  HorizontalBar,
  GroupBar,
  HoverRect,
  RadialTree,
  Plot,
  ScatterPlot,
  XAxis,
  YAxis,
  minMax,
  Tooltip,
  StackBar,
  Plot,
  XAxis,
  YAxis,
  minMax,
  colors,
  StackedArea,
  HoverLine,
  Tooltip,
  Venn,
} from '@semcore/d3-chart';
import { Flex, Box, Flex, Box } from '@semcore/flex-box';
import { Text, Text, Text } from '@semcore/typography';
import LikeM from '@semcore/icon/Like/m';
import resolveColor from '@semcore/utils/src/color';
import { scaleLinear, scaleBand, scaleLinear, scaleLinear } from 'd3-scale';
import goldData from '../../../semcore/d3-chart/src/a11y/datasets/gold.json';
import imbdmData from '../../../semcore/d3-chart/src/a11y/datasets/imdb.json';
import titanicData from '../../../semcore/d3-chart/src/a11y/datasets/titanic.json';
const Stonks = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const data = goldData
    .map((row) => {
      const [d, m, y] = row.Date.split('-');
      return {
        ...row,
        Date: new Date(`${m}-${d}-${y}`),
      };
    })
    .filter((_, index) => index % 10 === 0);
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'Date'));
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(minMax(data, 'United States(USD)'));
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
        <YAxis.Title>Price</YAxis.Title>
      </YAxis>
      <XAxis>
        <XAxis.Title>Year</XAxis.Title>
        <XAxis.Ticks ticks={xScale.ticks(6)}>
          {({ value }) => ({
            children: formatDate(value, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          })}
        </XAxis.Ticks>
      </XAxis>
      <Line x="Date" y="United States(USD)">
        <Line.Dots display />
      </Line>
      <Line x="Date" y="Europe(EUR)">
        <Line.Dots display />
      </Line>
      <Line x="Date" y="Australia(AUD)">
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const FilmBubbles = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const data = imbdmData
    .map((row) => ({ ...row, label: row.Title }))
    .filter((_, index) => index % 70 === 0);
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([1950, 2020]);
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Bubble x="ReleaseYear" y="IMDb-Rating" value="IMDb-Rating" />
    </Plot>
  );
};

const SurvivedTitanicClassesPie = () => {
  const data: Record<string, number> = {};
  for (const row of titanicData) {
    const className = String(row.Pclass);
    data[className] = data[className] ? data[className] + 1 : 1;
  }
  return (
    <Plot width={300} height={300} data={data}>
      <Donut innerRadius={100}>
        <Donut.Pie dataKey="1" name="Class 1" />
        <Donut.Pie dataKey="2" color={colors['green-02']} name="Class 2" />
        <Donut.Pie dataKey="3" color={colors['violet-04']} name="Class 3" />
        <Donut.Label>Survived classes</Donut.Label>
      </Donut>
      <Tooltip>
        {({ dataKey, name }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{name}</Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Text bold>{data[dataKey]}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
    </Plot>
  );
};

const SurvivedTitanicClassesBars = () => {
  const pieData: Record<string, number> = {};
  for (const row of titanicData) {
    const className = String(row.Pclass);
    pieData[className] = pieData[className] ? pieData[className] + 1 : 1;
  }
  const data = Object.entries(pieData).map(([className, survived]) => ({
    className: `Class ${className}`,
    survived,
  }));

  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.className))
    .paddingInner(0.4)
    .paddingOuter(0.2);
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 260]);
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Title>Survived passengers</XAxis.Title>
      </XAxis>
      <Bar x="className" y="survived" />
    </Plot>
  );
};

const HorizaontalBars = () => {
  const data = [...Array(5).keys()].map((d, i) => ({
    category: `Category ${i}`,
    bar: i + (Math.random() * 10).toFixed('2'),
  }));

  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN * 2])
    .domain([0, Math.max(...data.map((d) => d.bar))]);
  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
      </YAxis>
      <HorizontalBar x="bar" y="category">
        {({ value, x, y, width, height }) => {
          return {
            children: (
              <text
                x={x + width + 16}
                y={y + height / 2}
                textAnchor="start"
                alignmentBaseline="middle"
                fill={resolveColor('gray60')}
              >
                $ {value.bar}
              </text>
            ),
          };
        }}
      </HorizontalBar>
    </Plot>
  );
};

const GroupBars = () => {
  const data = [...Array(5).keys()].map((d, i) => ({
    category: `Category ${i}`,
    bar1: Math.random() * 10,
    bar2: Math.random() * 10,
  }));
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([0, 10]);
  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis hide={false}>
        <YAxis.Ticks />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Grid />
      </XAxis>
      <Tooltip tag={HoverRect} y="category" wMin={100}>
        {({ yIndex }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{data[yIndex].category}</Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Tooltip.Dot mr={4}>Bar 1</Tooltip.Dot>
                  <Text bold>{data[yIndex].bar1}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Tooltip.Dot mr={4} color={colors['green-02']}>
                    Bar 2
                  </Tooltip.Dot>
                  <Text bold>{data[yIndex].bar2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
      <GroupBar y="category">
        <GroupBar.HorizontalBar x="bar1" />
        <GroupBar.HorizontalBar x="bar2" color={colors['green-02']} />
      </GroupBar>
    </Plot>
  );
};

const RadialTreeExample = () => {
  const width = 500;
  const height = 500;
  const data = Array(12)
    .fill({})
    .map((_, i) => ({
      label: `Sheep ${i + 1}`,
      icon: LikeM,
    }));
  return (
    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree color="#AB6CFE">
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <RadialTree.Title>Sleeping</RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};

const ScatterPlotChart = () => {
  const data = Array(20)
    .fill({})
    .map((d, i) => ({
      x: i,
      y: Math.random() * 10,
    }));

  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <ScatterPlot x="x" y="y" />
      <Tooltip>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <Tooltip.Title>Data</Tooltip.Title>
                <Text tag="div">X axis {data[xIndex].x}</Text>
                <Text tag="div">Y axis {data[xIndex].y}</Text>
              </>
            ),
          };
        }}
      </Tooltip>
    </Plot>
  );
};

const StackedBarChart = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const data = [...Array(5).keys()].map((d, i) => ({
    category: `Category ${i}`,
    stack1: Math.random() * 10,
    stack2: Math.random() * 10,
  }));
  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 20]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Tooltip tag={HoverRect} x="category" wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{data[xIndex].category}</Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Tooltip.Dot mr={4}>Stack 1</Tooltip.Dot>
                  <Text bold>{data[xIndex].stack1}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Tooltip.Dot mr={4} color={colors['blue-02']}>
                    Stack 2
                  </Tooltip.Dot>
                  <Text bold>{data[xIndex].stack2}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Box mr={4}>Total</Box>
                  <Text bold>{data[xIndex].stack1 + data[xIndex].stack2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
      <StackBar x="category">
        <StackBar.Bar y="stack1" />
        <StackBar.Bar y="stack2" color={colors['blue-02']} />
      </StackBar>
    </Plot>
  );
};

import { curveCardinal } from 'd3-shape';

function formatDate(value, options) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const StackedAreaChart = () => {
  const date = new Date();
  const data = [...Array(5).keys()].map((d, i) => ({
    time: new Date(date.setDate(date.getDate() + 5)),
    stack1: Math.random() * 5,
    stack2: Math.random() * 5,
    stack3: Math.random() * 5,
  }));

  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

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
        <XAxis.Ticks ticks={data.map((d) => +d.time)}>
          {({ value }) => ({
            children: formatDate(value, {
              month: 'short',
              day: 'numeric',
            }),
          })}
        </XAxis.Ticks>
      </XAxis>
      <Tooltip tag={HoverLine} x="time" wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <Tooltip.Title>
                  {formatDate(data[xIndex].time, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Tooltip.Dot mr={4}>Stack 1</Tooltip.Dot>
                  <Text bold>{data[xIndex].stack1}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Tooltip.Dot mr={4} color={colors['green-02']}>
                    Stack 2
                  </Tooltip.Dot>
                  <Text bold>{data[xIndex].stack2}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Tooltip.Dot mr={4} color={colors['orange-04']}>
                    Stack 3
                  </Tooltip.Dot>
                  <Text bold>{data[xIndex].stack3}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Box mr={4}>Total</Box>
                  <Text bold>
                    {data[xIndex].stack1 + data[xIndex].stack2 + data[xIndex].stack3}
                  </Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
      <StackedArea x="time">
        <StackedArea.Area y="stack1" curve={curveCardinal}>
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y="stack2" fill="#59DDAA50" color="#59DDAA" curve={curveCardinal}>
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y="stack3" fill="#FF622D50" color="#FF622D" curve={curveCardinal}>
          <StackedArea.Area.Dots />
        </StackedArea.Area>
      </StackedArea>
    </Plot>
  );
};

const VennChart = () => {
  const data = {
    G: 200,
    F: 200,
    C: 500,
    U: 1,
    'G/F': 100,
    'G/C': 100,
    'F/C': 100,
    'G/F/C': 100,
  };

  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle dataKey="G" name="Good" />
        <Venn.Circle dataKey="F" name="Fast" color={colors['blue-03']} />
        <Venn.Circle dataKey="C" name="Cheap" color={colors['orange-04']} />
        <Venn.Circle dataKey="U" name="Unknown" color={colors['pink-03']} />
        <Venn.Intersection dataKey="G/F" name="Good & Fast" />
        <Venn.Intersection dataKey="G/C" name="Good & Cheap" />
        <Venn.Intersection dataKey="F/C" name="Fast & Cheap" />
        <Venn.Intersection dataKey="G/F/C" name="Good & Fast & Cheap" />
      </Venn>
      <Tooltip>
        {({ name, dataKey }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{name}</Tooltip.Title>
                <Text bold>{data[dataKey]}</Text>
              </>
            ),
          };
        }}
      </Tooltip>
    </Plot>
  );
};

const MixedChart = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const data = goldData
    .map((row) => {
      const [d, m, y] = row.Date.split('-');
      return {
        ...row,
        Date: new Date(`${m}-${d}-${y}`),
      };
    })
    .filter((_, index) => index % 10 === 0);
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'Date'));
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(minMax(data, 'United States(USD)'));
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
        <YAxis.Title>Price</YAxis.Title>
      </YAxis>
      <XAxis>
        <XAxis.Title>Year</XAxis.Title>
        <XAxis.Ticks />
      </XAxis>
      <Line x="Date" y="United States(USD)">
        <Line.Dots display />
      </Line>
      <Line x="Date" y="Europe(EUR)">
        <Line.Dots display />
      </Line>
      <Line x="Date" y="Australia(AUD)">
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

export default () => {
  return (
    <div>
      <Stonks /> <br />
      <FilmBubbles /> <br />
      <SurvivedTitanicClassesPie /> <br />
      <SurvivedTitanicClassesBars /> <br />
      <HorizaontalBars /> <br />
      <GroupBars /> <br />
      <RadialTreeExample /> <br />
      <ScatterPlotChart /> <br />
      <StackedBarChart /> <br />
      <StackedAreaChart /> <br />
      <VennChart /> <br />
      <MixedChart /> <br />
    </div>
  );
};
