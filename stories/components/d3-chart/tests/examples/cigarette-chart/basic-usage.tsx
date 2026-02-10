import type { CigaretteChartProps } from '@semcore/ui/d3-chart';
import { Chart, interpolateValue } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps } from '../stories_props_helper';

const Demo = (props: CigaretteChartProps) => {
  return (
    <Chart.Cigarette
      {...props}
      aria-label='Cigarette chart'
    />
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

export const defaultProps = getChartProps<CigaretteChartProps>({
  data,
  plotHeight: 28,
  showLegend: true,
  invertAxis: true,
  showPercentValueInTooltip: true,
});

Demo.defaultProps = defaultProps;

export default Demo;
