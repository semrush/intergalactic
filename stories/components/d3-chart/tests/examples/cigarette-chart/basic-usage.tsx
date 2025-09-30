import { Chart, interpolateValue } from '@semcore/ui/d3-chart';
import React from 'react';

type BaseExampleProps = {
  showLegend?: boolean;
};
const Demo = (props: BaseExampleProps) => {
  const { showLegend } = props;
  return (
    <>
      { /* @ts-ignore: the value is not statically known, but it's valid at runtime */}
      <Chart.Cigarette
        data={data}
        plotWidth={400}
        plotHeight={28}
        aria-label='Cigarette chart'
        showLegend={showLegend}
      />
    </>
  );
};

const data: Record<string, number | typeof interpolateValue> = {
  Cats: 3524,
  Dogs: interpolateValue,
  Capybaras: 6135,
  // @ts-ignore
  Hamsters: null,
  Birds: 1823,
};

export const defaultProps: BaseExampleProps = {
  showLegend: undefined,

};

export default Demo;
