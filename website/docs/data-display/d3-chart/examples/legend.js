import React, { useState } from 'react';
import { Line, minMax, XAxis, Plot, YAxis } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Box } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';

export default () => {
  const [dataLegend, updateDataLegend] = useState(
    Object.keys(data[0])
      .filter((name) => name !== 'x')
      .map((name) => ({ name, checked: true, opacity: false })),
  );

  const MAP_THEME = {
    y: 'orange',
    y2: 'green',
  };
  const width = 500;
  const height = 300;
  const MARGIN = 40;
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(dataLegend.find((item) => item.checked) ? [0, 10] : []);

  const handleChange = (name) => (checked) => {
    const newDataLegend = dataLegend.map((item) => {
      if (item.name === name) {
        return { ...item, checked };
      }
      return { ...item, opacity: checked };
    });

    updateDataLegend(newDataLegend);
  };

  const handleMouseEnter = (name) => () => {
    const activeItem = dataLegend.find((item) => item.name === name);
    if (!activeItem.checked) return;
    updateDataLegend((data) =>
      data.map((item) => {
        if (item.name !== name) return { ...item, opacity: true };
        return item;
      }),
    );
  };
  const handleMouseLeave = () => {
    updateDataLegend(dataLegend.map((item) => ({ ...item, opacity: false })));
  };

  return (
    <>
      <Box>
        {dataLegend.map((item) => {
          return (
            <Checkbox
              key={item.name}
              onMouseEnter={handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Checkbox.Value
                theme={MAP_THEME[item.name]}
                checked={item.checked}
                onChange={handleChange(item.name)}
              />
              <Checkbox.Text pr={3}>{item.name}</Checkbox.Text>
            </Checkbox>
          );
        })}
      </Box>
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks()}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis ticks={xScale.ticks()}>
          <XAxis.Ticks />
        </XAxis>
        {dataLegend.map(
          (item) =>
            item.checked && (
              <Line
                key={item.name}
                x="x"
                y={item.name}
                color={MAP_THEME[item.name]}
                opacity={item.opacity ? 0.3 : 1}
              />
            ),
        )}
      </Plot>
    </>
  );
};

const data = [...Array(10).keys()].map((d, i) => ({
  x: i,
  y: Math.random().toFixed(1) * i,
  y2: Math.random().toFixed(1) * (i + 2),
}));
