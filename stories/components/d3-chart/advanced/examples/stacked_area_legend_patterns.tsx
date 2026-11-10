import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

const SERIES_COUNT = 24;
const POINTS = 10;
const seriesKeys = Array.from({ length: SERIES_COUNT }, (_, index) => `line${index + 1}`);

const formatDate = (type: 'axis' | 'tooltip') => (value: unknown) => {
  const options =
    type === 'axis'
      ? {
          month: 'short' as const,
          day: 'numeric' as const,
        }
      : {
          year: 'numeric' as const,
          month: 'long' as const,
          day: 'numeric' as const,
        };

  return new Intl.DateTimeFormat('en', options).format(value as Date);
};

const Demo = () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={720}
      plotHeight={600}
      groupKey='time'
      stacked={true}
      patterns
      showLegend
      showDots={false}
      tooltipTitleFormatter={formatDate('tooltip')}
      axisXValueFormatter={formatDate('axis')}
      legendProps={legendProps}
      aria-label='Stacked area chart with 24 series'
    />
  );
};

const data = Array.from({ length: POINTS }, (_, pointIndex) => {
  const point: Record<string, Date | number> = {
    time: new Date(2025, 0, 1 + pointIndex * 3),
  };

  seriesKeys.forEach((key, seriesIndex) => {
    point[key] = ((seriesIndex % 5) + 1) * (1 + ((pointIndex + seriesIndex) % 4));
  });

  return point;
});

const legendProps = {
  legendMap: seriesKeys.reduce<Record<string, { label: string }>>((acc, key, index) => {
    acc[key] = { label: `Line ${index + 1}` };

    return acc;
  }, {}),
};

export default Demo;
