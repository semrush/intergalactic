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
  marginX: 40,
  marginY: 40,
  invertAxis: false,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showTotalInTooltip: true,
  xTicksCount: 10,
  yTicksCount: 10,
  multilineXTicks: false,
  multilineYTicks: false,
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

export function getPropsToChart<F>(props: StoryChartProps<F>): F {
  const result: any = {
    legendProps: {},
  };

  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('legendProps.')) {
      const legendKey = key.slice('legendProps.'.length);
      result.legendProps[legendKey] = value;
    } else {
      result[key] = value;
    }
  });

  return result;
}

export const getChartArgTypes = (additionalControls?: any) => {
  return {
    'plotWidth': { control: { type: 'number' } },
    'plotHeight': { control: { type: 'number' } },
    'patterns': { control: { type: 'boolean' } },
    'marginX': { control: { type: 'number' } },
    'marginY': { control: { type: 'number' } },
    'invertAxis': { control: { type: 'boolean' } },
    'showXAxis': { control: { type: 'boolean' } },
    'showYAxis': { control: { type: 'boolean' } },

    'showLegend': { control: { type: 'boolean' } },

    'legendProps.size': { control: 'select', options: ['m', 'l'] },
    'legendProps.shape': { control: 'select', options: ['Checkbox', 'Circle', 'Line', 'Square', 'Pattern'] },
    'legendProps.disableHoverItems': { control: 'boolean' },
    'legendProps.disableSelectItems': { control: 'boolean' },
    'legendProps.legendType': { control: 'select', options: ['Flex', 'Table'] },
    'legendProps.title': { control: 'text' },

    'showTooltip': { control: { type: 'boolean' } },
    'showTotalInTooltip': { control: { type: 'boolean' } },
    'showPercentValueInTooltip': { control: { type: 'boolean' } },
    'tooltipViewType': { control: 'select', options: ['all', 'single'] },
    'xTicksCount': { control: { type: 'number' } },
    'yTicksCount': { control: { type: 'number' } },
    'multilineXTicks': { control: { type: 'boolean' } },
    'multilineYTicks': { control: { type: 'boolean' } },
    'duration': { control: { type: 'number' } },
    ...additionalControls,
  } as const;
};
