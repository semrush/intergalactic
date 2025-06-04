import React from 'react';
import {
  Plot,
  StackBar,
  YAxis,
  XAxis,
  ChartLegend,
  makeDataHintsContainer,
} from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import Card from '@semcore/card';

const dataHints = makeDataHintsContainer();

const data = [
  { bar: 'Bar 1', 1: 1, 2: 2, 3: 3 },
  { bar: 'Bar 2', 1: 2, 2: 3, 3: 1 },
  { bar: 'Bar 3', 1: 3, 2: 1, 3: 2 },
  { bar: 'Bar 4', 1: 4, 2: 2, 3: 1 },
  { bar: 'Bar 5', 1: 5, 2: 1, 3: 2 },
];

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([0, 20]);

  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.bar))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'bar')
      .map((item, index) => {
        return {
          id: item,
          label: `Category ${item}`,
          checked: true,
          color: `chart-palette-order-${index + 1}`,
        };
      }),
  );

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
    <Card w={'550px'}>
      <Card.Header pt={4}>
        <Card.Title tag={'h4'} m={0} inline={true}>
          Chart legend
        </Card.Title>
      </Card.Header>
      <Card.Body tag={Flex} direction='column'>
        <ChartLegend
          items={legendItems}
          onChangeVisibleItem={handleChangeVisible}
          onMouseEnterItem={handleMouseEnter}
          onMouseLeaveItem={handleMouseLeave}
          dataHints={dataHints}
          patterns
          aria-label={'Stacked horizontal bar chart legend'}
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
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <StackBar y='bar'>
            {legendItems.map((stack, index) =>
              stack.checked ? (
                <StackBar.HorizontalBar
                  key={stack.id}
                  x={stack.id}
                  color={stack.color}
                  transparent={highlightedLine !== -1 && highlightedLine !== index}
                />
              ) : null,
            )}
          </StackBar>
        </Plot>
      </Card.Body>
    </Card>
  );
};

export default Demo;
