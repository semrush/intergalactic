import { Chart } from '@semcore/ui/d3-chart';
import { curveCardinal } from 'd3-shape';
import React from 'react';

type BaseExampleProps = {
  showLegend?: boolean;
};

const formatDate = (type: 'axis' | 'tooltip') => (value: any) => {
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

  return new Intl.DateTimeFormat('en', options).format(value);
};

const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  return (
    <>
      {' '}
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}
      <Chart.Area
        data={data}
        plotWidth={500}
        plotHeight={200}
        groupKey='time'
        tooltipValueFormatter={formatDate('tooltip')}
        axisXValueFormatter={formatDate('axis')}
        stacked={true}
        curve={curveCardinal}
        aria-label='Stacked area chart'
        showLegend={showLegend}
      />
    </>
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));

export const defaultProps: BaseExampleProps = {
  showLegend: undefined,

};

export default Demo;
