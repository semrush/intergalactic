import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, ChartLegend } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

const data = Array.from({ length: 10 }, (_, i) => ({
  x: i,
  1: i + 1,       
  2: 10 - i,      
  3: (i % 3) * 3, 
  value: i,
}));

const getDefaultLegendItems = () => {
  return Object.keys(data[0])
    .filter((name) => name !== 'x' && name !== 'value')
    .map((item, index) => {
      return {
        id: item,
        label: `Dataset ${item}`,
        checked: true,
        color: `chart-palette-order-${index + 1}`,
      };
    });
};

const Demo = () => {
  const [legendItems, setLegendItems] = React.useState(getDefaultLegendItems);

  const handleChangeVisible = React.useCallback((id: string, isVisible: boolean) => {
    setLegendItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: isVisible } : item,
      )
    );
  }, []);

  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([-1, 11]);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-1, 11]);

  return (
    <>
      <ChartLegend
        items={legendItems}
        shape='Checkbox'
        patterns
        onChangeVisibleItem={handleChangeVisible}
        aria-label='Scatterplot legend'
      />
      <Plot scale={[xScale, yScale]} width={width} height={height} data={data} patterns>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        {legendItems
          .filter((item) => item.checked)
          .map((item) => (
            <ScatterPlot
              key={item.id}
              x='x'
              y={item.id}
              value='value'
              color={item.color}
            />
          ))}
      </Plot>
    </>
  );
};

export default Demo;
