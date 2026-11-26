import { Flex } from '@semcore/ui/base-components';
import { Chart, PlotEventEmitter, minMax } from '@semcore/ui/d3-chart';
import { scaleTime } from 'd3-scale';
import React from 'react';

import BarMockData from '../../../__mocks__/bar';

const eventEmitter = new PlotEventEmitter();

const Demo = () => {
  const [width, height] = [600, 300];

  const xScale = scaleTime()
    .domain(minMax(data, 'date_chart'))
    .range([30, width - 64]); // custom range for nice view of charts

  const getDate = (date: unknown) => {
    if (date instanceof Date) {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    }

    return '';
  };

  return (
    <Flex direction='column' gap={8}>
      <Chart.Line
        data={data}
        groupKey='date_chart'
        aria-label='Line chart'
        eventEmitter={eventEmitter}
        axisXValueFormatter={getDate}
        w={width}
        h={height}
        // @ts-ignore
        xScale={xScale}
      />

      <Chart.Bar
        groupKey='date_chart'
        data={data}
        w={width}
        h={height}
        aria-label='Bar chart'
        eventEmitter={eventEmitter}
        axisXValueFormatter={getDate}
      />
    </Flex>
  );
};

const data = BarMockData.Date;

export default Demo;
