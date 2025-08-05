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

      <Chart.Bar
        groupKey='category'
        data={data}
        plotWidth={500}
        plotHeight={300}
        invertAxis={true}
        aria-label='CompactHorizontalBar chart'
        showLegend={showLegend}
      />
    </>
  );
};

const data = [
  { category: 'Category 0', bar: 2.5 },
  { category: 'Category 1', bar: 4.7 },
  { category: 'Category 2', bar: 1.2 },
  { category: 'Category 3', bar: 6.9 },
  { category: 'Category 4', bar: 3.3 },
];

export const defaultProps: BaseExampleProps = {
  showLegend: undefined,

};

export default Demo;
