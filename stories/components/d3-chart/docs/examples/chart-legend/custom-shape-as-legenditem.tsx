import { useColorResolver } from '@semcore/ui/core/lib/utils/use/useColorResolver';
import type { LegendItem } from '@semcore/ui/d3-chart';
import { ChartLegend } from '@semcore/ui/d3-chart';
import React from 'react';

import ChartLegendMockData from '../../../__mocks__/chart-legend';

const Shape = (props: any) => {
  const colorResolver = useColorResolver();

  return (
    <div
      style={{
        width: '0',
        height: '0',
        borderTop: '8px solid transparent',
        borderLeft: `16px solid ${colorResolver(props.color)}`,
        borderBottom: '8px solid transparent',
        marginRight: 'var(--intergalactic-spacing-1x)',
      }}
    />
  );
};

const Demo = () => {
  const lines = Object.keys(data[0])
    .filter((name) => name !== 'x')
    .reduce<LegendItem[]>((res, item, index) => {
      res.push({
        id: item,
        label: item,
        checked: true,
        color: `chart-palette-order-${index + 1}`,
      });

      return res;
    }, []);

  return (
    <div>
      <ChartLegend items={lines} aria-label='Chart legend aria label'>
        <ChartLegend.LegendItem shape={undefined}>
          <ChartLegend.LegendItem.Shape style={{ background: 'transparent' }}>
            {(props: any) => {
              return <Shape {...props} />;
            }}
          </ChartLegend.LegendItem.Shape>
          <ChartLegend.LegendItem.Label />
        </ChartLegend.LegendItem>
      </ChartLegend>
    </div>
  );
};

const data = ChartLegendMockData.Default;

export default Demo;
