import React from 'react';
import { Plot, Radar, colors, LegendItem, ChartLegend } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

const lineColors: Record<string, string> = {
  data_1: colors['orange-04'],
  data_2: colors['violet-04'],
};

const getDefaultLegendItems = () => {
  return Object.keys(data)
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
    setLegendItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });

      return newItems;
    });
  }, []);

  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <>
      <ChartLegend
        items={legendItems}
        patterns
        aria-label={'Radar chart legend'}
        onChangeVisibleItem={handleChangeVisible}
      />
      <Plot data={data} width={width} height={height} patterns>
        <Radar scale={scale}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>

          {legendItems.map((item) => {
            return (
              item.checked && (
                <Radar.Polygon dataKey={item.id} color={item.color}>
                  <Radar.Polygon.Line />
                  <Radar.Polygon.Dots />
                </Radar.Polygon>
              )
            );
          })}
        </Radar>
      </Plot>
    </>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};

export default Demo;
