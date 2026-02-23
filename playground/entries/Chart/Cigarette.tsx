import type { CigaretteChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getDefaultChartControls } from './common/controls';
import type { CommonChartProps, LegendChartProps } from './common/controls';
import type { JSXProps } from '../../types/JSXProps';
import type { PlaygroundEntry } from '../../types/Playground';
import createGithubLink from '../../utils/createGHLink';

type CigaretteChartPlaygroundProps = {
  commonChartProps: CommonChartProps;
  legendProps: LegendChartProps & { withTrend: boolean };
  cigaretteProps: {
    tooltipViewType: CigaretteChartProps['tooltipViewType'];
    layout: 'vertical' | 'horizontal';
    showPercentValueInTooltip: boolean;
  };
};
export type CigaretteChartJSXProps = JSXProps<CigaretteChartPlaygroundProps>;

const data = {
  Cats: 524,
  Dogs: 44,
  Capybaras: 0,
  Hamsters: 1456,
  Birds: 123,
};

function getJSX(props: CigaretteChartJSXProps) {
  const { ...legendProps } = props.legendProps ?? {};

  return (
    <Chart.Cigarette
      data={data}
      plotWidth={props.cigaretteProps.layout === 'horizontal' ? 300 : 44}
      plotHeight={props.cigaretteProps.layout === 'horizontal' ? 28 : 200}
      aria-label='Cigarette chart'
      tooltipViewType={props.cigaretteProps.tooltipViewType}
      invertAxis={props.cigaretteProps.layout !== 'vertical'}
      showPercentValueInTooltip={props.cigaretteProps.showPercentValueInTooltip}
      {...props.commonChartProps}
      {...(props.legendProps && {
        legendProps,
        showLegend: props.commonChartProps.showLegend as true,
      })}
      {...(props.legendProps?.patterns && { patterns: props.legendProps.patterns })}
    />
  );
}

const entry: PlaygroundEntry<CigaretteChartJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    cigaretteProps: {
      type: 'group',
      groupName: 'Cigarette props',
      controls: {
        layout: {
          type: 'select',
          options: ['horizontal', 'vertical'],
          value: 'horizontal',
          displayName: 'Layout',
        },
        tooltipViewType: {
          type: 'select',
          options: ['all', 'single'],
          value: 'single',
          displayName: 'Tooltip type',
        },
        showPercentValueInTooltip: {
          type: 'boolean',
          value: false,
          displayName: 'Percent in tooltip',
        },
      },
    },
    ...getDefaultChartControls({
      skip: {
        commonChartProps: ['showXAxis', 'showYAxis', 'direction', 'alignItems'],
        legendProps: ['direction'],
      },
    }) },
  link: createGithubLink('d3-chart'),
  filterProps: (value: unknown, key: string) => {
    if (key === 'data') {
      return false;
    }

    if (key === 'invertAxis') {
      return value === false;
    }

    return true;
  },
  JSXDisplayName: 'Chart.Cigarette',
};

export default entry;
