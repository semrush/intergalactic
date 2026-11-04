import { Box } from '@semcore/ui/base-components';
import type { DonutChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { getChartProps, getPropsToChart } from '../stories_props_helper';

type BasicUsageProps = Omit<DonutChartProps, 'innerLabel' | 'patterns'> & {
  patterns?: DonutChartProps['patterns'] | false;
  /** First line of `innerLabel`. An empty value together with `innerDescription` hides the label. */
  innerLabel?: string;
  /** Second line of `innerLabel`. */
  innerDescription?: string;
  /** `onClickPie` is a function, so the story passes one that logs the clicked key to the console. */
  logClickPie?: boolean;
};

const logClickedPie = (key: string) => {
  console.log(`I call onClickPie with key: ${key}`);
};

const Demo = (props: BasicUsageProps) => {
  const { plotWidth, plotHeight, innerLabel, innerDescription, logClickPie, patterns, ...chartProps } =
    getPropsToChart<BasicUsageProps>(props);

  return (
    <Box
      border='1px solid #ddd'
      borderRadius='surface-rounded'
      resize='both'
      w={plotWidth}
      h={plotHeight}
      overflow='auto'
    >
      <Chart.Donut
        {...(chartProps as DonutChartProps)}
        {...(patterns ? { patterns } : {})}
        {...(innerLabel || innerDescription ? { innerLabel: [innerLabel ?? '', innerDescription ?? ''] } : {})}
        {...(logClickPie ? { onClickPie: logClickedPie } : {})}
        aria-label='Donut chart'
      />
    </Box>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};

// showLegend is left out of the defaults so that DonutChart's own logic works
// (the legend is hidden automatically when data has only 1 item)
const { showLegend: _showLegend, ...defaultProps } = getChartProps<BasicUsageProps>({
  data,
  halfsize: false,
  innerLabel: '71,240',
  innerDescription: 'Description',
  logClickPie: false,
});

export { defaultProps };

Demo.defaultProps = defaultProps;

export default Demo;
