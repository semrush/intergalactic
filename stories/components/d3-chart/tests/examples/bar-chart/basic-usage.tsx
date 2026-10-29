import { Box } from '@semcore/ui/base-components';
import type { BarChartProps } from '@semcore/ui/d3-chart';
import { Chart, DATA_TYPE, FORECAST, GOOD, HIGHLIGHT_DOT, interpolateValue, POTENTIAL, INSIGHTFUL } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

const Demo = (props: BarChartProps) => {
  const {
    plotWidth, plotHeight,
    withReferenceLine,
    withReferenceArea,
    referenceLineValue,
    referenceLineArea,
    referenceLineCount,
    referenceLinesOverlap,
    referenceAreaStart,
    referenceAreaEnd,
    referenceAreaUse,
    referenceAreaTitle,
    referenceAreaSubTitle,
    ...chartProps
  } = getPropsToChart(props);

  const barProps = {
    ...chartProps,
  };

  if (withReferenceLine) {
    const firstValue = referenceLineValue ?? 3;
    const step = referenceLinesOverlap ? 0 : 5;

    barProps.referenceLine = referenceLineCount
      ? Array.from({ length: referenceLineCount }, (_, i) => ({ value: firstValue + i * step, area: referenceLineArea }))
      : { value: firstValue, area: referenceLineArea };
  }

  if (withReferenceArea) {
    const use = referenceAreaUse ?? 'insight' as const;

    barProps.referenceArea = {
      value: [referenceAreaStart ?? 12, referenceAreaEnd ?? 16],
      use,
      title: referenceAreaTitle || undefined,
      subTitle: referenceAreaSubTitle || undefined,
    };
  }

  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={plotWidth}
      h={plotHeight}
      overflow='auto'
    >
      <Chart.Bar
        {...barProps}
        aria-label='Bar chart'
      />
    </Box>
  );
};

const data = [
  { category: 'Category 0', bar: 2 },
  { category: 'Category 1', bar: 5 },
  { category: 'Category 2', bar: 7 },
  { category: 'Category 3', bar: 7, [DATA_TYPE]: FORECAST },
  { category: 'Category 4', bar: 9, [DATA_TYPE]: POTENTIAL },
];

export const defaultProps = getChartProps<BarChartProps>({
  groupKey: 'category',
  type: 'group',
  data,
  maxBarSize: 12,
  trend: {
    bar: [
      { x: 'Category 0' as string, y: 2 as number },
      { x: 'Category 1' as string, y: 5 as number },
      { x: 'Category 2' as string, y: 7 as number },
      { x: 'Category 3' as string, y: 4 as number },
      { x: 'Category 4' as string, y: 8 as number },
    ],
  },
  withReferenceLine: false,
  withReferenceArea: false,
  referenceLineValue: 'Category 1',
  referenceLinesOverlap: false,
  referenceAreaStart: 'Category 2',
  referenceAreaEnd: 'Category 4',
  referenceAreaTitle: '',
  referenceAreaSubTitle: '',
} as any);

Demo.defaultProps = defaultProps;

export default Demo;
