import type { BaseChartProps, BaseLegendProps } from '@semcore/ui/d3-chart';

type StoryChartProps<T, LP = BaseLegendProps> = T & {
  [key in keyof LP as `legendProps.${key & string}`]?: LP[key];
};

export const baseLegendProps: Omit<BaseLegendProps, 'withTrend' | 'trendIsVisible' | 'onTrendIsVisibleChange'> = {
  size: 'm',
  shape: 'Checkbox',
  disableHoverItems: false,
  disableSelectItems: false,
  legendType: 'Flex',
  title: 'Legend',
};

export const baseChartProps: StoryChartProps<BaseChartProps<any>> = {
  plotWidth: 500,
  plotHeight: 300,
  marginX: 0,
  marginY: 0,
  yAxisPosition: 'left',
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showTotalInTooltip: true,
  showDeltaPercentInTooltip: false,
  // `good` is the component default: growth is green, decline is red. Switching the
  // control to `good` swaps the two, for metrics where growing is the bad outcome.
  deltaPercentGrowthColor: 'good',
  locale: 'en',
  xTicksCount: 10,
  yTicksCount: 10,
  duration: 200,
  data: [],
  showLegend: true,
};

Object.entries(baseLegendProps).forEach(([key, value]) => {
  // @ts-ignore
  baseChartProps[`legendProps.${key}`] = value;
});

export function getChartProps<F>(chartProps: Partial<F>): F {
  return {
    ...baseChartProps,
    ...chartProps,
  } as F;
}

/**
 * Axis props and margins have no effect on charts without axes (Donut, Radar, Venn, Cigarette,
 * ScoreDonut), so the stories of those charts neither pass nor show them.
 */
const axisPropNames = [
  'marginX',
  'marginY',
  'yAxisPosition',
  'showXAxis',
  'showYAxis',
  'xTicksCount',
  'yTicksCount',
  'axisXValueFormatter',
  'axisYValueFormatter',
] as const;

const omitAxisProps = <T extends Record<string, any>>(props: T): T => {
  const result: Record<string, any> = { ...props };
  axisPropNames.forEach((name) => delete result[name]);
  return result as T;
};

export function getNoAxisChartProps<F>(chartProps: Partial<F>): F {
  return omitAxisProps(getChartProps<F>(chartProps) as any);
}

export function getPropsToChart<F>(props: StoryChartProps<F>): F {
  const result: any = {
    legendProps: {},
  };

  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('legendProps.')) {
      const legendKey = key.slice('legendProps.'.length);
      result.legendProps[legendKey] = value;
    } else if (key !== 'legendProps') {
      result[key] = value;
    }
  });

  // A `legendProps` object passed explicitly (e.g. from a browser test) has to win over the
  // flattened `legendProps.*` defaults, which React merges in after the passed props.
  result.legendProps = { ...result.legendProps, ...(props as any).legendProps };

  return result;
}

/**
 * A Table legend is valid only when every item has `columns` or `rows`. The chart computes
 * them itself only for object data (Donut, Cigarette, Venn); for list data the story would
 * have to pass `legendMap` additions, and without them `LegendTable` throws. So the control
 * is hidden by default, and a story whose chart fills the columns opts in with this entry.
 */
export const legendTypeControl = {
  'legendProps.legendType': { control: 'select', options: ['Flex', 'Table'] },
} as const;

/**
 * Knobs that build the `referenceLine` / `referenceArea` objects passed to `LineChart`.
 */
const referenceKnob = { table: { category: 'Reference knobs' } } as const;

export const referenceControls = {
  withReferenceLine: { control: 'boolean', ...referenceKnob },
  referenceLineValue: { control: 'number', if: { arg: 'withReferenceLine' }, ...referenceKnob },
  referenceLineArea: { control: 'number', if: { arg: 'withReferenceLine' }, ...referenceKnob },
  referenceLineCount: { control: { type: 'number', min: 1, max: 3 }, if: { arg: 'withReferenceLine' }, ...referenceKnob },
  referenceLinesOverlap: { control: 'boolean', if: { arg: 'withReferenceLine' }, ...referenceKnob },
  withReferenceArea: { control: 'boolean', ...referenceKnob },
  referenceAreaStart: { control: 'number', if: { arg: 'withReferenceArea' }, ...referenceKnob },
  referenceAreaEnd: { control: 'number', if: { arg: 'withReferenceArea' }, ...referenceKnob },
  referenceAreaUse: {
    control: 'select',
    if: { arg: 'withReferenceArea' },
    options: ['neutral', 'good', 'bad', 'insight'],
    ...referenceKnob,
  },
  referenceAreaTitle: { control: 'text', if: { arg: 'withReferenceArea' }, ...referenceKnob },
  referenceAreaSubTitle: { control: 'text', if: { arg: 'withReferenceArea' }, ...referenceKnob },
};

/**
 * Groups of the Controls panel. Storybook shows the groups in the order their first control
 * appears, so the base controls are listed group by group and `Deprecated` goes last.
 */
const CATEGORY = {
  size: 'Size & animation',
  axes: 'Axes',
  legend: 'Legend',
  tooltip: 'Tooltip',
  a11y: 'Accessibility & locale',
  chart: 'Chart props',
  deprecated: 'Deprecated',
} as const;

const inCategory = (category: string, control: Record<string, any>) => ({
  ...control,
  table: { category, ...control.table },
});

/** Controls a story adds itself that still belong to a common group. */
const categoryOfStoryControl: Record<string, string> = {
  invertAxis: CATEGORY.axes,
};

export const getChartArgTypes = (additionalControls: Record<string, any> = {}) => {
  const baseControls: Record<string, any> = {
    'plotWidth': inCategory(CATEGORY.size, { control: { type: 'number' } }),
    'plotHeight': inCategory(CATEGORY.size, { control: { type: 'number' } }),
    'duration': inCategory(CATEGORY.size, { control: { type: 'number' } }),

    'showXAxis': inCategory(CATEGORY.axes, { control: { type: 'boolean' } }),
    'showYAxis': inCategory(CATEGORY.axes, { control: { type: 'boolean' } }),
    'yAxisPosition': inCategory(CATEGORY.axes, { control: 'select', options: ['left', 'right', 'both'] }),
    'xTicksCount': inCategory(CATEGORY.axes, { control: { type: 'number' } }),
    'yTicksCount': inCategory(CATEGORY.axes, { control: { type: 'number' } }),

    'showLegend': inCategory(CATEGORY.legend, { control: { type: 'boolean' } }),
    'legendProps.size': inCategory(CATEGORY.legend, { control: 'select', options: ['m', 'l'] }),
    'legendProps.shape': inCategory(CATEGORY.legend, { control: 'select', options: ['Checkbox', 'Circle', 'Pattern'] }),
    'legendProps.disableHoverItems': inCategory(CATEGORY.legend, { control: 'boolean' }),
    'legendProps.disableSelectItems': inCategory(CATEGORY.legend, { control: 'boolean' }),
    // Hidden on purpose, see `legendTypeControl`.
    'legendProps.legendType': inCategory(CATEGORY.legend, { table: { disable: true } }),
    'legendProps.title': inCategory(CATEGORY.legend, { control: 'text' }),

    'showTooltip': inCategory(CATEGORY.tooltip, { control: { type: 'boolean' } }),
    'showTotalInTooltip': inCategory(CATEGORY.tooltip, { control: { type: 'boolean' } }),
    'showPercentValueInTooltip': inCategory(CATEGORY.tooltip, { control: { type: 'boolean' } }),
    'showDeltaPercentInTooltip': inCategory(CATEGORY.tooltip, { control: { type: 'boolean' } }),
    'deltaPercentGrowthColor': inCategory(CATEGORY.tooltip, { control: 'select', options: ['good', 'bad'] }),
    'tooltipViewType': inCategory(CATEGORY.tooltip, { control: 'select', options: ['all', 'single'] }),

    'patterns': inCategory(CATEGORY.a11y, { control: { type: 'boolean' } }),
    'locale': inCategory(CATEGORY.a11y, {
      control: 'select',
      options: ['de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'sv', 'tr', 'vi', 'zh', 'uk'],
    }),
  };

  // Still read by Line, Area, Bubble, Scatter, Histogram and CompactHorizontalBar; kept until that is fixed.
  const deprecatedControls: Record<string, any> = {
    marginX: inCategory(CATEGORY.deprecated, { control: { type: 'number' } }),
    marginY: inCategory(CATEGORY.deprecated, { control: { type: 'number' } }),
  };

  const result: Record<string, any> = { ...baseControls };

  Object.entries(additionalControls).forEach(([name, control]) => {
    // A story overriding a common control keeps its group unless it sets its own.
    const baseCategory = (baseControls[name] ?? deprecatedControls[name])?.table?.category;
    const category = control?.table?.category ?? baseCategory ?? categoryOfStoryControl[name] ?? CATEGORY.chart;

    result[name] = inCategory(category, control ?? {});
  });

  Object.entries(deprecatedControls).forEach(([name, control]) => {
    if (!(name in additionalControls)) result[name] = control;
  });

  return result;
};

export const getNoAxisChartArgTypes = (additionalControls?: any) =>
  omitAxisProps(getChartArgTypes(additionalControls));
