import type { CigaretteChartProps } from '@semcore/ui/d3-chart';
import { Chart, interpolateValue } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps } from '../stories_props_helper';

const data: Record<string, number | typeof interpolateValue> = {
  Cats: 3524,
  Dogs: interpolateValue,
  Capybaras: 6135,
  // @ts-ignore
  Hamsters: null,
  Birds: 1823,
};

// One tiny value among large should be invisible at minimalBarWidth=0, visible at 2+
export const dataTinyValue = {
  Large: 100,
  Medium: 50,
  Tiny: 1,
};

// Multiple tiny values all should get minimalBarWidth proportionally
export const dataMultipleTiny = {
  Giant: 10,
  Small1: 5,
  Small2: 3,
  Small3: 1,
};

// All equal
export const dataEqual = {
  A: 100,
  B: 100,
  C: 100,
  D: 100,
};

// Zero value should NOT get minimalBarWidth (only value > 0 triggers it)
export const dataWithZero = {
  Present: 10000,
  Zero: 0,
  AlsoPresent: 5000,
};

// All tiny
export const dataAllTiny = {
  A: 1,
  B: 1,
  C: 1,
  D: 1,
  E: 1,
};

// Large minimalBarWidth
export const dataOverflow = {
  X: 1,
  Y: 2,
  Z: 3,
};

const Demo = ({ enableMinimalBarWidth = true, ...props }: CigaretteChartProps & { enableMinimalBarWidth?: boolean }) => {
  return (
    <Chart.Cigarette
      {...props}
      minimalBarWidth={enableMinimalBarWidth ? props.minimalBarWidth : undefined}
      aria-label='Cigarette chart'
    />
  );
};

export const defaultProps = getChartProps<CigaretteChartProps>({
  data,
  plotHeight: 28,
  showLegend: true,
  invertAxis: true,
  showPercentValueInTooltip: true,
  minimalBarWidth: 2,
  tooltipTitle: '',
  tooltipViewType: 'all',
  duration: 200,
});

Demo.defaultProps = defaultProps;

export default Demo;
