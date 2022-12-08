import React from 'react';
import { Plot, StackBar, YAxis, XAxis, HoverRect, Tooltip } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import resolveColor from '@semcore/ui/utils/lib/color';
import Card from '@semcore/ui/card';
import Checkbox from '@semcore/ui/checkbox';

const barColors = {
  stack1: resolveColor('blue-300'),
  stack2: resolveColor('orange-400'),
  stack3: resolveColor('green-200'),
};

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  const checkboxesList = ['stack1', 'stack2', 'stack3'];
  const [displayedBars, setDisplayedBars] = React.useState({
    stack1: true,
    stack2: true,
    stack3: true,
  });
  const displayedLinesList = React.useMemo(
    () =>
      Object.entries(displayedBars)
        .filter(([, displayed]) => displayed)
        .map(([stack]) => stack),
    [displayedBars],
  );

  return (
    <Card w={'550px'}>
      <Card.Header pt={4}> Chart legend</Card.Header>
      <Card.Body tag={Flex} direction="column">
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
                    <Tooltip.Title>data</Tooltip.Title>
                    {displayedLinesList.map((stack) => {
                      return (
                        <Flex key={stack} justifyContent="space-between">
                          <Tooltip.Dot mr={4} color={barColors[stack]}>
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
          <StackBar x="category">
            {displayedLinesList.map((stack) => (
              <StackBar.Bar y={stack} key={stack} color={barColors[stack]} />
            ))}
          </StackBar>
        </Plot>
        <Flex flexWrap w={width}>
          {checkboxesList.map((stack) => {
            return (
              <Checkbox key={stack} theme={barColors[stack]} mr={4} mb={2}>
                <Checkbox.Value
                  checked={displayedBars[stack]}
                  onChange={(checked) =>
                    setDisplayedBars((prevDisplayedBar) => ({
                      ...prevDisplayedBar,
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
  category: `Category ${i}`,
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));
