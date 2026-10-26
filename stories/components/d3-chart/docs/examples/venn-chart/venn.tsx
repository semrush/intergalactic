import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import VennMockData from '../../../__mocks__/venn';

const labels: Record<string, string> = {
  G: 'Good',
  F: 'Fast',
  C: 'Cheap',
};

const formatTooltipTitle = (name: any) =>
  String(name)
    .split(' & ')
    .map((key) => labels[key] ?? key)
    .join(' & ');

const colorMap = {
  G: 'chart-palette-order-2',
  F: 'chart-palette-order-3',
  C: 'chart-palette-order-4',
};

const Demo = () => {
  return (
    <Chart.Venn
      data={data}
      plotWidth={400}
      plotHeight={300}
      colorMap={colorMap}
      showLegend={false}
      showTooltip
      tooltipTitleFormatter={formatTooltipTitle}
      aria-label='Venn chart'
    />
  );
};

const data = VennMockData.Default;

export default Demo;
