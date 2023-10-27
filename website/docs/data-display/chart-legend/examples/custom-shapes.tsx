import React from 'react';
import { ChartLegend, LegendItem } from '@semcore/d3-chart';
import { useColorResolver } from '@semcore/utils/src/use/useColorResolver';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
  Line4: Math.random() * 10,
  Line5: Math.random() * 10,
}));

const Shape = (props) => {
  const colorResolver = useColorResolver();

  return (
    <div
      style={{
        width: '0',
        height: '0',
        borderTop: '8px solid transparent',
        borderLeft: `16px solid ${colorResolver(props.color)}`,
        borderBottom: '8px solid transparent',
        marginRight: '4px',
      }}
    />
  );
};

export default () => {
  const lines = Object.keys(data[0])
    .filter((name) => name !== 'x')
    .reduce<LegendItem[]>((res, item, index) => {
      res.push({
        id: item,
        label: item,
        checked: true,
        color: `--intergalactic-chart-palette-order-${index + 1}`,
      });

      return res;
    }, []);

  return (
    <div>
      <ChartLegend.Flex items={lines}>
        <ChartLegend.Flex.LegendItem>
          <ChartLegend.Flex.LegendItem.Shape style={{ background: 'transparent' }}>
            {(props) => {
              return <Shape {...props} />;
            }}
          </ChartLegend.Flex.LegendItem.Shape>
          <ChartLegend.Flex.LegendItem.Label />
        </ChartLegend.Flex.LegendItem>
      </ChartLegend.Flex>
    </div>
  );
};
