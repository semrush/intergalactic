import { Plot, Radar, ChartLegend } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import RadarMockData from '../../../__mocks__/radar';

type DataKey = keyof typeof data;

const getDefaultLegendItems = () => {
  return (Object.keys(data) as DataKey[])
    .filter((name) => name !== 'categories')
    .map((item, index) => {
      return {
        id: item,
        label: `Category ${index + 1}`,
        data: data[item],
        checked: true,
        color: lineColors[item],
      };
    });
};

const Demo = () => {
  const [legendItems, setLegendItems] = React.useState(getDefaultLegendItems);

  const handleChangeVisible = React.useCallback((id: string, isVisible: boolean) => {
    setLegendItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: isVisible } : item,
      ),
    );
  }, []);

  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <>
      <ChartLegend
        items={legendItems}
        patterns
        aria-label='Radar chart legend'
        onChangeVisibleItem={handleChangeVisible}
      />
      <Plot data={data} width={width} height={height} patterns>
        <Radar scale={scale}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>

          {legendItems.map(
            (item) =>
              item.checked && (
                <Radar.Polygon key={item.id} dataKey={item.id} color={item.color}>
                  <Radar.Polygon.Line />
                  <Radar.Polygon.Dots />
                </Radar.Polygon>
              ),
          )}
        </Radar>
      </Plot>
    </>
  );
};

const data = RadarMockData.Default;

const lineColors: Record<keyof typeof data, string> = {
  categories: '',
  data_1: '--intergalactic-chart-palette-order-1',
  data_2: '--intergalactic-chart-palette-order-2',
};

export default Demo;
