import React from 'react';
import { Plot, ScatterPlot, XAxis, YAxis, minMax, ChartLegend } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

const getDegaultLegendItems = () => {
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
  const [legendItems, setLegendItems] = React.useState(getDegaultLegendItems);

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
        shape={'Checkbox'}
        patterns
        onChangeVisibleItem={handleChangeVisible}
        aria-label={'Scatterplot legend'}
      />
      <Plot scale={[xScale, yScale]} width={width} height={height} data={data} patterns={true}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        {legendItems
          .filter((item) => item.checked)
          .map((item) => {
            return (
              <ScatterPlot key={item.id} x={'x'} y={item.id} value={'value'} color={item.color} />
            );
          })}
      </Plot>
    </>
  );
};

const data = Array(10)
  .fill({})
  .map((d, i) => ({
    x: i,
    1: Math.random() * 10,
    2: Math.random() * 10,
    3: Math.random() * 10,
    value: i,
  }));

export default Demo;
