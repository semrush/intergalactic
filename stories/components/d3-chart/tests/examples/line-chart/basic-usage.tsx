import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <>
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey={'x'}
      xTicksCount={data.length / 2}
      aria-label={'Line chart'}
    />
    <Chart.Line
     alignItems="center"
    data={data}
    showDots
    plotWidth={500}
    plotHeight={200}
    groupKey={'x'}
    xTicksCount={data.length / 2}
    aria-label={'Line chart with showDots prop'}
    showTotalInTooltip
    legendProps={{
      direction: 'column',
      disableHoverItems: true,
      disableSelectItems: true,
      shape: 'Checkbox',
      size: 'm'
    }}
  />
  </>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    line1:  Math.abs(Math.sin(Math.exp(i))) * 10,
    line2:  Math.abs(Math.cos(Math.exp(i))) * 10,
  }));

export default Demo;