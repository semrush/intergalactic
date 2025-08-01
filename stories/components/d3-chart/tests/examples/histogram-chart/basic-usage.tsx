import { Chart } from '@semcore/d3-chart';
import React from 'react';
type BaseExampleProps = {
  showLegend?: boolean;
};
const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  return (
    <>
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}
      <Chart.Histogram
        data={data}
        alignItems='flex-start'
        direction='column'
        groupKey='x'
        showLegend={showLegend}
        patterns={false}
        plotHeight={200}
        plotWidth={300}
        showTooltip={true}
        showTotalInTooltip={false}
        showXAxis={true}
        showYAxis={true}
      />

    </>
  );
};

const data = [
  { category: 2, bar: 2.5 },
];

export const defaultProps: BaseExampleProps = {
  showLegend: undefined,

};

export default Demo;
