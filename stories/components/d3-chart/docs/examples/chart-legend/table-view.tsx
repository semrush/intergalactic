import { ChartLegendTable } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
  Line4: Math.random() * 10,
  Line5: Math.random() * 10,
}));

const Demo = () => {
  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((key) => key !== 'x')
      .map((item, index) => {
        return {
          id: item,
          label: `Item ${index + 1}`,
          checked: true,
          color: `chart-palette-order-${index + 1}`,
          columns: [
            <Text use='secondary' key={1}>
              {(42 * (index + 3)) / 10}
              %
            </Text>,
            <Text use='primary' key={2}>{42 * (index + 3)}</Text>,
          ],
        };
      }),
  );

  const onChangeVisibleItem = (id: string, isVisible: boolean) => {
    setLegendItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });
    });
  };

  return (
    <div style={{ width: '200px' }}>
      <ChartLegendTable onChangeVisibleItem={onChangeVisibleItem} items={legendItems} aria-label='Chart legend aria label' />
    </div>
  );
};

export default Demo;
