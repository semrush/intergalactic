import React from 'react';
import { Line, minMax, XAxis, Plot, YAxis, ChartLegend } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Box } from '@semcore/flex-box';

const MAP_THEME = {
  line1: 'orange',
  line2: 'green',
};

const Demo = () => {
  const width = 500;
  const height = 300;
  const MARGIN = 40;

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'x')
      .map((item) => ({
        id: item as keyof typeof MAP_THEME,
        label: item,
        checked: true,
        color: MAP_THEME[item as keyof typeof MAP_THEME],
      })),
  );

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(legendItems.find((item) => item.checked) ? [0, 10] : []);

  const [highlightedLine, setHighlightedLine] = React.useState(-1);

  const handleChangeVisible = React.useCallback((id: string, isVisible: boolean) => {
    setLegendItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: isVisible } : item,
      ),
    );
  }, []);

  const handleMouseEnter = React.useCallback((id: string) => {
    setHighlightedLine(legendItems.findIndex((line) => line.id === id));
  }, [legendItems]);

  const handleMouseLeave = React.useCallback(() => {
    setHighlightedLine(-1);
  }, []);

  return (
    <>
      <Box>
        <ChartLegend
          items={legendItems}
          onChangeVisibleItem={handleChangeVisible}
          onMouseEnterItem={handleMouseEnter}
          onMouseLeaveItem={handleMouseLeave}
          aria-label={'Chart legend aria label'}
        />
      </Box>
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        {legendItems.map((item, index) =>
          item.checked ? (
            <Line
              key={item.id}
              x="x"
              y={item.id}
              color={MAP_THEME[item.id]}
              transparent={highlightedLine !== -1 && highlightedLine !== index}
            />
          ) : null,
        )}
      </Plot>
    </>
  );
};

const data = [...Array(10).keys()].map((d, i) => ({
  x: i,
  line1: Math.random() * i,
  line2: Math.random() * (i + 2),
}));

export default Demo;
