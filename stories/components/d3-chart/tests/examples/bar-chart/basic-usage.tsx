import { Box } from '@semcore/ui/base-components';
import type { BarChartProps } from '@semcore/ui/d3-chart';
import { Chart, DATA_TYPE, FORECAST, GOOD, BAD, HIGHLIGHT_DOT, POTENTIAL, INSIGHTFUL } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

export const categories = ['Category 0', 'Category 1', 'Category 2', 'Category 3', 'Category 4'];

type HighlightDots = 'none' | 'good' | 'bad' | 'insightful' | 'mixed';
type DataTypeKnob = 'none' | 'forecast' | 'potential' | 'both';

const highlightsByKnob: Record<HighlightDots, Array<string | undefined>> = {
  none: [],
  good: [GOOD, GOOD, GOOD],
  bad: [BAD, BAD, BAD],
  insightful: [INSIGHTFUL, INSIGHTFUL, INSIGHTFUL],
  mixed: [GOOD, INSIGHTFUL, BAD],
};

// Applied to Category 3 and Category 4.
const dataTypesByKnob: Record<DataTypeKnob, Array<string | undefined>> = {
  none: [],
  forecast: [FORECAST, FORECAST],
  potential: [POTENTIAL, POTENTIAL],
  both: [FORECAST, POTENTIAL],
};

const values = [2, 5, 7, 7, 9];

const getData = (highlightDots: HighlightDots, dataType: DataTypeKnob, secondSeries = false) =>
  categories.map((category, i) => {
    const item: Record<string, unknown> = { category, bar: values[i] };
    if (secondSeries) item.bar2 = values[i] / 2;
    const highlight = highlightsByKnob[highlightDots][i];
    const type = dataTypesByKnob[dataType][i - 3];

    if (highlight) item[HIGHLIGHT_DOT] = highlight;
    if (type) item[DATA_TYPE] = type;

    return item;
  });

const Demo = (props: BarChartProps) => {
  const {
    plotWidth, plotHeight,
    highlightDots = 'mixed',
    dataType = 'both',
    secondSeries,
    withReferenceLine,
    withReferenceArea,
    referenceLineCategory,
    referenceLineValue,
    referenceLineArea,
    referenceLineCount,
    referenceLinesOverlap,
    referenceAreaStartCategory,
    referenceAreaEndCategory,
    referenceAreaStart,
    referenceAreaEnd,
    referenceAreaUse,
    referenceAreaTitle,
    referenceAreaSubTitle,
    ...chartProps
  } = getPropsToChart(props as any) as any;

  const barProps = {
    ...chartProps,
    // Tests pass their own `data`; the knobs build it only when none is given.
    data: chartProps.data ?? getData(highlightDots, dataType, secondSeries),
  };

  // The reference line is drawn along the x scale: categories when the chart is vertical,
  // values when `invertAxis` turns it horizontal.
  if (withReferenceLine) {
    const count = referenceLineCount ?? 1;
    const lineValues = chartProps.invertAxis
      ? Array.from({ length: count }, (_, i) => (referenceLineValue ?? 3) + (referenceLinesOverlap ? 0 : i * 2))
      : Array.from({ length: count }, (_, i) =>
          categories[categories.indexOf(referenceLineCategory) + (referenceLinesOverlap ? 0 : i)],
        ).filter(Boolean);
    const lines = lineValues.map((value) => ({ value, area: referenceLineArea }));

    barProps.referenceLine = referenceLineCount ? lines : lines[0];
  }

  if (withReferenceArea) {
    barProps.referenceArea = {
      value: chartProps.invertAxis
        ? [referenceAreaStart ?? 4, referenceAreaEnd ?? 6]
        : [referenceAreaStartCategory, referenceAreaEndCategory],
      use: referenceAreaUse ?? 'insight',
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

export const defaultProps = getChartProps<BarChartProps>({
  groupKey: 'category',
  type: 'group',
  data: undefined,
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
  highlightDots: 'mixed',
  dataType: 'both',
  secondSeries: false,
  withReferenceLine: false,
  withReferenceArea: false,
  referenceLineCategory: 'Category 1',
  referenceLineValue: 3,
  referenceLinesOverlap: false,
  referenceAreaStartCategory: 'Category 2',
  referenceAreaEndCategory: 'Category 4',
  referenceAreaStart: 4,
  referenceAreaEnd: 6,
  referenceAreaTitle: '',
  referenceAreaSubTitle: '',
} as any);

Demo.defaultProps = defaultProps;

export default Demo;
