import { Chart } from '@semcore/d3-chart';
import React from 'react';

type ExampleDonutShowLegendProps = {
  showLegend?: boolean;
  data: { [key: string]: number };
};

const Demo = (props: ExampleDonutShowLegendProps) => {
  const { showLegend, data } = props;

  return (
    <div style={{ width: '450px' }}>
      {/* @ts-ignore: the value is not statically known, but it's valid at runtime */}
      <Chart.Donut
        plotWidth={300}
        plotHeight={300}
        data={data}
        aria-label='Donut chart'
        showLegend={showLegend}
      />
    </div>
  );
};

export const defaultProps: ExampleDonutShowLegendProps = {
  showLegend: undefined,
  data: {
    a: 3,
    b: 2,
  },
};

export default Demo;
