import { Box } from '@semcore/ui/base-components';
import type { ScoreBarChartProps } from '@semcore/ui/d3-chart';
import { Chart } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { getPropsToChart } from '../stories_props_helper';

type ValueFormat = 'default' | 'currency' | 'thousands';
type TitleFormat = 'default' | 'uppercase';

type StoryProps = ScoreBarChartProps & {
  colorMapVariant?: 'none' | 'custom';
  valueFormat?: ValueFormat;
  titleFormat?: TitleFormat;
  withLinks?: boolean;
  clickable?: boolean;
};

const colorMap = {
  'Schema.org (Microdata)': 'chart-palette-order-1',
  'Open graph': 'chart-palette-order-2',
  'Twitter cards': 'chart-palette-order-3',
  'Microformats': 'chart-palette-order-4',
  'Schema.org (JSON-LD)': 'chart-palette-order-5',
};

const valueFormatters: Record<ValueFormat, ((value: number) => string) | undefined> = {
  default: undefined,
  currency: (value) => `$${value.toFixed(2)}`,
  thousands: (value) => `${(value / 1000).toFixed(1)}k`,
};

const titleFormatters: Record<TitleFormat, ((title?: string) => string) | undefined> = {
  default: undefined,
  uppercase: (title) => (title ?? '').toUpperCase(),
};

const Demo = (props: StoryProps) => {
  const {
    colorMapVariant,
    valueFormat = 'default',
    titleFormat = 'default',
    withLinks,
    clickable,
    ...chartProps
  } = getPropsToChart(props);
  const [clicked, setClicked] = React.useState<string>('');

  return (
    <Box>
      <Chart.ScoreBar
        {...chartProps}
        data={withLinks ? data.map((item) => ({ ...item, href: '#' })) : data}
        colorMap={colorMapVariant === 'custom' ? colorMap : undefined}
        valueFormatter={valueFormatters[valueFormat]}
        tooltipValueFormatter={valueFormatters[valueFormat]}
        titleFormatter={titleFormatters[titleFormat]}
        tooltipTitleFormatter={titleFormatters[titleFormat]}
        onClickItem={clickable ? (item) => setClicked(`${item.category}, index ${item.index}`) : undefined}
        aria-label='ScoreBar chart'
      />
      {clickable && <Text tag='p' mt={4}>Clicked: {clicked || '—'}</Text>}
    </Box>
  );
};

const data = [
  {
    category: 'Schema.org (Microdata)',
    value: 0,
  },
  {
    category: 'Open graph',
    value: 9650,
  },
  {
    category: 'Twitter cards',
    value: 7650,
  },
  {
    category: 'Microformats',
    value: 14650,
  },
  {
    category: 'Schema.org (JSON-LD)',
    value: 135650,
  },
];

export const defaultProps = {
  mode: 'default',
  showTooltip: true,
  locale: 'en',
  colorMapVariant: 'none',
  valueFormat: 'default',
  titleFormat: 'default',
  withLinks: false,
  clickable: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
