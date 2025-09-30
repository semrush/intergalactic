import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

type BaseExampleProps = {
  showLegend?: boolean;
};
const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  const onClickHandler = () => {
    console.log('Clicked scatterplot item');
  };
  return (
    <>
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}

      <Chart.ScatterPlot
        data={data}
        showLegend={showLegend}
        plotWidth={500}
        plotHeight={300}
        groupKey='x'
        aria-label='ScatterPlot chart'
        onClickScatterItem={onClickHandler}
      />
    </>
  );
};

const data = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  y: (i % 5) + 1,
}));
export const defaultProps: BaseExampleProps = {
  showLegend: undefined,

};

export default Demo;
