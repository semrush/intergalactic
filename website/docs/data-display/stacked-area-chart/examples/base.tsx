import React from 'react';
import { Chart } from '@semcore/ui/d3-chart';
import resolveColor from '@semcore/utils/src/color';
import { curveCardinal } from 'd3-shape';

const formatDate = (type: 'axis' | 'tooltip') => (value) => {
  const options =
    type === 'axis'
      ? {
          month: 'short',
          day: 'numeric',
        }
      : {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

  return new Intl.DateTimeFormat('en', options).format(value);
};

export default () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={500}
      plotHeight={300}
      groupKey={'time'}
      formatTooltip={formatDate('tooltip')}
      axisXValueFormatter={formatDate('axis')}
      colorMap={colorMap}
      stacked={true}
      curve={curveCardinal}
    />
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));

const colorMap = {
  stack1: resolveColor('blue-300'),
  stack2: resolveColor('green-200'),
  stack3: resolveColor('orange-400'),
};
