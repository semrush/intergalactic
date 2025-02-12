import React from 'react';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax, PlotEventEmitter } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { scaleLinear, scaleTime } from 'd3-scale';

function formatDate(value, options) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const eventEmitter = new PlotEventEmitter();

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const plotRef = React.useRef(null);

  const xScale = scaleTime()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  React.useEffect(() => {
    const unsubscribe = eventEmitter.subscribe('setTooltipPosition', (x, y) => {
      const plotRect = plotRef.current?.getBoundingClientRect();
      if (x - plotRect.x < 150) {
        eventEmitter.emit('setTooltipPosition', plotRect.x + 150, y);
      }
      if (x - plotRect.x > 200) {
        eventEmitter.emit('setTooltipPosition', plotRect.x + 200, y);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Plot
      ref={plotRef}
      data={data}
      scale={[xScale, yScale]}
      width={width}
      height={height}
      eventEmitter={eventEmitter}
    >
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks>
          {({ value }) => ({
            children: formatDate(value, {
              month: 'short',
              day: 'numeric',
            }),
          })}
        </XAxis.Ticks>
      </XAxis>
      <Line x='time' y='line'>
        <Line.Dots display />
      </Line>
      <HoverLine.Tooltip x='time' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>
                  {formatDate(data[xIndex].time, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].line}</Text>
                </Flex>
                <HoverLine.Tooltip.Footer>
                  This tooltip is under your control!
                </HoverLine.Tooltip.Footer>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
    </Plot>
  );
};

const date = new Date();
const data = Array(10)
  .fill({})
  .map((d, i) => {
    return {
      time: new Date(date.setDate(date.getDate() + 5)),
      line: Math.random() * 10,
    };
  });

export default Demo;
