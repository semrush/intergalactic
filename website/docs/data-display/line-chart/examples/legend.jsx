import React from 'react';
import Card from '@semcore/ui/card';
import { HoverLine, Line, minMax, Plot, Tooltip, XAxis, YAxis } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import resolveColor from '@semcore/ui/utils/lib/color';
import { scaleLinear } from 'd3-scale';
import Checkbox from '@semcore/ui/checkbox';

const lineColors = {
  stack1: resolveColor('blue-300'),
  stack2: resolveColor('orange-400'),
  stack3: resolveColor('green-200'),
};

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const checkboxesList = ['stack1', 'stack2', 'stack3'];
  const [displayLines, setDisplayLines] = React.useState({
    stack1: true,
    stack2: true,
    stack3: true,
  });
  const displayedLinesList = React.useMemo(
    () =>
      Object.entries(displayLines)
        .filter(([, displayed]) => displayed)
        .map(([line]) => line),
    [displayLines],
  );

  return (
    <Card w={'550px'}>
      <Card.Header pt={4}> Chart legend</Card.Header>
      <Card.Body tag={Flex} direction="column">
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks ticks={yScale.ticks(4)} />
            <YAxis.Grid ticks={yScale.ticks(4)} />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={xScale.ticks(5)}>
              {({ value }) => ({
                value,
                children: value,
              })}
            </XAxis.Ticks>
          </XAxis>
          <Tooltip tag={HoverLine} x="time" wMin={100}>
            {({ xIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>data</Tooltip.Title>
                    {displayedLinesList.map((stack) => {
                      return (
                        <Flex key={stack} justifyContent="space-between">
                          <Tooltip.Dot mr={4} color={lineColors[stack]}>
                            {data[xIndex][stack]}
                          </Tooltip.Dot>
                          <Text bold>{data[xIndex][stack]}</Text>
                        </Flex>
                      );
                    })}
                  </>
                ),
              };
            }}
          </Tooltip>
          {displayedLinesList.map((stack) => (
            <Line x="time" y={stack} key={stack} color={lineColors[stack]}>
              <Line.Dots />
            </Line>
          ))}
        </Plot>
        <Flex flexWrap w={width}>
          {checkboxesList.map((stack) => {
            return (
              <Checkbox key={stack} theme={lineColors[stack]} mr={4} mb={2}>
                <Checkbox.Value
                  checked={displayLines[stack]}
                  onChange={(checked) =>
                    setDisplayLines((prevDisplayedLines) => ({
                      ...prevDisplayedLines,
                      [stack]: checked,
                    }))
                  }
                />
                <Checkbox.Text>{stack}</Checkbox.Text>
              </Checkbox>
            );
          })}
        </Flex>
      </Card.Body>
    </Card>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  time: i,
  stack1: Math.random() * 10,
  stack2: Math.random() * 10,
  stack3: Math.random() * 10,
}));
