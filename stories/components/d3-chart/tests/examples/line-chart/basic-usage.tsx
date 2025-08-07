import { Chart } from '@semcore/d3-chart';
import React from 'react';

type BaseExampleProps = {
  showLegend?: boolean;
};
const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  const onClickHandler = () => {
    console.log('Clicked line chart');
  };

  return (
    <>
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}

      <Chart.Line
        data={data}
        plotWidth={500}
        plotHeight={200}
        groupKey='x'
        showLegend={showLegend}
        xTicksCount={data.length / 2}
        aria-label='Line chart'
        onClickLine={onClickHandler}

      />
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}

      <Chart.Line
        showLegend={showLegend}
        alignItems='center'
        data={data}
        showDots
        plotWidth={500}
        plotHeight={200}
        groupKey='x'
        xTicksCount={data.length / 2}
        aria-label='Line chart with showDots prop'
        showTotalInTooltip
        onClickLine={onClickHandler}
        legendProps={{
          direction: 'column',
          disableHoverItems: true,
          disableSelectItems: true,
          shape: 'Checkbox',
          size: 'l',
        }}
      />
    </>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    line1: Math.abs(Math.sin(Math.exp(i))) * 10,
    line2: Math.abs(Math.cos(Math.exp(i))) * 10,
  }));

export const defaultProps: BaseExampleProps = {
  showLegend: undefined,

};

export default Demo;
