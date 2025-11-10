import type { BaseChartProps, BaseLegendProps } from '@semcore/ui/d3-chart';

export const baseLegendProps: BaseLegendProps = {
  size: 'm',
  shape: 'Checkbox',
  disableHoverItems: true,
  disableSelectItems: false,
  legendType: 'Flex',
  title: 'Legend',
  withTrend: true,
  trendIsVisible: false,
  onTrendIsVisibleChange: () => {},
};

export const baseChartProps: BaseChartProps<any> = {
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
  showLegend: false,
};

export function getChartProps<F>(chartProps: Partial<F>): F {
  return {
    ...baseChartProps,
    ...chartProps,
  } as F;
}

export const getChartArgTypes = (additionalControls?: any) => {
  return {
    plotWidth: { control: { type: 'number' } },
    plotHeight: { control: { type: 'number' } },
    patterns: { control: { type: 'boolean' } },
    marginX: { control: { type: 'number' } },
    marginY: { control: { type: 'number' } },
    invertAxis: { control: { type: 'boolean' } },
    showXAxis: { control: { type: 'boolean' } },
    showYAxis: { control: { type: 'boolean' } },

    showLegend: { control: { type: 'boolean' } },

    showTooltip: { control: { type: 'boolean' } },
    showTotalInTooltip: { control: { type: 'boolean' } },
    xTicksCount: { control: { type: 'number' } },
    yTicksCount: { control: { type: 'number' } },
    multilineXTicks: { control: { type: 'boolean' } },
    multilineYTicks: { control: { type: 'boolean' } },
    duration: { control: { type: 'number' } },
    ...additionalControls,
  } as const;
};
