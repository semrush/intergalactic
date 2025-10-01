import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';
type BaseExampleProps = {
  showLegend?: boolean;
};
const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  return (
    <>
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}
      <Chart.Bar
        data={data}
        alignItems='flex-start'
        direction='column'
        groupKey='x'
        invertAxis={true}
        patterns={true}
        plotHeight={500}
        plotWidth={500}
        showTooltip={true}
        showTotalInTooltip={true}
        showXAxis={true}
        showYAxis={true}
        type='stack'
        showLegend={showLegend}
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
