import React from 'react';
import {
  Line,
  minMax,
  Plot,
  XAxis,
  YAxis,
  ChartLegend,
  makeDataHintsContainer,
} from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import { scaleLinear } from 'd3-scale';

const dataHints = makeDataHintsContainer();

const Demo = () => {
  const MARGIN = 30;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'x')
      .map((item, index) => {
        return {
          id: item,
          label: `Line${item}`,
          checked: true,
          color: `chart-palette-order-${index + 1}`,
        };
      }),
  );

  const [highlightedLine, setHighlightedLine] = React.useState(-1);

  const handleChangeVisible = React.useCallback((id: string, isVisible: boolean) => {
    setLegendItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });
    });
  }, []);

  const handleMouseEnter = React.useCallback((id: string) => {
    setHighlightedLine(legendItems.findIndex((line) => line.id === id));
  }, []);
  const handleMouseLeave = React.useCallback(() => {
    setHighlightedLine(-1);
  }, []);

  return (
    <Flex direction='column'>
      <ChartLegend
        dataHints={dataHints}
        items={legendItems}
        onChangeVisibleItem={handleChangeVisible}
        onMouseEnterItem={handleMouseEnter}
        onMouseLeaveItem={handleMouseLeave}
        patterns
        aria-label={'Patterned chart legend'}
      />
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        dataHints={dataHints}
        patterns
      >
        <YAxis>
          <YAxis.Ticks ticks={yScale.ticks(4)} />
          <YAxis.Grid ticks={yScale.ticks(4)} />
        </YAxis>
        <XAxis>
          <XAxis.Ticks ticks={xScale.ticks(5)} />
        </XAxis>
        {legendItems.map((item, index) => {
          return (
            item.checked && (
              <Line
                x='x'
                y={item.id}
                key={item.id}
                color={item.color}
                transparent={highlightedLine !== -1 && highlightedLine !== index}
              >
                <Line.Dots display />
              </Line>
            )
          );
        })}
      </Plot>
    </Flex>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  1: Math.random() * 10,
  2: Math.random() * 10,
  3: Math.random() * 10,
}));

export default Demo;
