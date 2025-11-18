import { Plot, Line, XAxis, YAxis, HoverLine, minMax, PlotEventEmitter } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

function formatDate(value: any, options: any) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const eventEmitter = new PlotEventEmitter();

const data = [
  { time: new Date('2025-05-01'), line: 3 },
  { time: new Date('2025-05-06'), line: 5 },
  { time: new Date('2025-05-11'), line: 7 },
  { time: new Date('2025-05-16'), line: 6 },
  { time: new Date('2025-05-21'), line: 8 },
  { time: new Date('2025-05-26'), line: 4 },
  { time: new Date('2025-05-31'), line: 7 },
  { time: new Date('2025-06-05'), line: 9 },
  { time: new Date('2025-06-10'), line: 5 },
  { time: new Date('2025-06-15'), line: 6 },
];

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
      <Line x='time' y='line'>
        <Line.Dots display />
      </Line>
      <HoverLine.Tooltip x='time' wMin={100}>
        {({ xIndex }) => ({
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
        })}
      </HoverLine.Tooltip>
    </Plot>
  );
};

export default Demo;
