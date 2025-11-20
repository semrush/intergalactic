import type { LegendFlexProps } from '@semcore/ui/d3-chart';
import { ChartLegend } from '@semcore/ui/d3-chart';
import React from 'react';

import { baseLegendProps } from '../stories_props_helper';

const Demo = (props: LegendFlexProps) => {
  return (
    <ChartLegend {...props} />
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  bar: `Bar ${i + 1}`,
  1: Math.random() * 5,
  2: Math.random() * 5,
  3: Math.random() * 5,
}));

export const defaultProps: LegendFlexProps = {
  ...baseLegendProps,
  items: Array.from(data).map((item, index) => {
    return {
      id: item.bar,
      label: `Category ${item.bar}`,
      checked: true,
      color: `chart-palette-order-${index + 1}`,
      additionalInfo: { count: index },
    };
  }),
};

Demo.defaultProps = defaultProps;

export default Demo;
