import { Flex } from '@semcore/ui/base-components';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax, PlotEventEmitter } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

import LineMockData from '../../../__mocks__/line';

function formatDate(value: any, options: any) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const eventEmitter = new PlotEventEmitter();

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const plotRef = React.useRef<SVGSVGElement | null>(null);

  const xScale = scaleTime()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  React.useEffect(() => {
    const plotElement = plotRef.current;

    if (!plotElement) return;

    const plotId = plotElement.dataset.plotId!;
    const unsubscribe = eventEmitter.subscribe(`setTooltipPosition_${plotId}`, (x, y) => {
      const plotRect = plotElement.getBoundingClientRect();

      if (x - plotRect.x < 150) {
        eventEmitter.emit(`setTooltipPosition_${plotId}`, plotRect.x + 150, y);
      }
      if (x - plotRect.x > 200) {
        eventEmitter.emit(`setTooltipPosition_${plotId}`, plotRect.x + 200, y);
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
      <Line x='time' y='line'>
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = LineMockData.Time;

export default Demo;
