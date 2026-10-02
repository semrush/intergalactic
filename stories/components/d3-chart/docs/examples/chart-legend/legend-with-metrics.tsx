import DiffDown from '@semcore/icon/DiffDown/m';
import DiffUp from '@semcore/icon/DiffUp/m';
import { ChartLegendTable, Metric } from '@semcore/ui/d3-chart';
import React from 'react';

import ChartLegendMockData from '../../../__mocks__/chart-legend';

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
          rows: [
            <Metric
              key={1}
              value={`${(42 * (index + 3)) / 10}%`}
              diffValue='+12'
              href={index === 1 ? '/some-report' : undefined}
              diffIcon={index === 2 ? DiffDown : index === 1 ? DiffUp : undefined}
              diffUse={index === 1 ? 'good' : index === 2 ? 'bad' : 'neutral'}
            />,
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
    <ChartLegendTable onChangeVisibleItem={onChangeVisibleItem} items={legendItems} aria-label='Chart legend aria label' />
  );
};

const data = ChartLegendMockData.Default;

export default Demo;
