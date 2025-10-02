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
        groupKey='category'
        data={data}
        plotWidth={500}
        plotHeight={300}
        aria-label='Bar chart'
        showLegend={showLegend}
      />
    </>
  );
};

const data = [
  { category: 'Category 0', bar: 2 },
  { category: 'Category 1', bar: 5 },
  { category: 'Category 2', bar: 7 },
  { category: 'Category 3', bar: 4 },
  { category: 'Category 4', bar: 8 },
];

export const defaultProps: BaseExampleProps = {
  showLegend: undefined,

};

export default Demo;
